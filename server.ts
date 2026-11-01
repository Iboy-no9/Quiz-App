import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'assessment-db.json');

import { INITIAL_QUESTIONS, INITIAL_QUIZZES, INITIAL_SUBMISSIONS } from './src/data/initialData.ts';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface ServerData {
  questions: any[];
  quizzes: any[];
  submissions: any[];
  lastUpdated: string;
}

const DISALLOWED_QUIZ_CODES = new Set(['ALL-100', 'WEB-101', 'SCI-200']);
const DISALLOWED_QUIZ_IDS = new Set(['quiz-all-questions', 'quiz-cs-fundamentals', 'quiz-science-essentials', 'quiz-ux35-geo']);
const DISALLOWED_TITLES = new Set([
  'COMPREHENSIVE EXAMINATION (ALL QUESTIONS)',
  'WEB & PROGRAMMING FUNDAMENTALS',
  'GENERAL SCIENCE & PHYSICAL PRINCIPLES'
]);

function sanitizeServerQuizzes(quizzes: any[]): any[] {
  const seenCodes = new Set<string>();
  const seenTitles = new Set<string>();
  const result: any[] = [];

  for (const q of quizzes) {
    if (!q || !q.id) continue;
    const code = (q.accessCode || '').toUpperCase().trim();
    const title = (q.title || '').toUpperCase().trim();
    const id = (q.id || '').trim();

    if (DISALLOWED_QUIZ_CODES.has(code)) continue;
    if (DISALLOWED_QUIZ_IDS.has(id)) continue;
    if (DISALLOWED_TITLES.has(title)) continue;

    if (code && seenCodes.has(code)) continue;
    if (title && seenTitles.has(title)) continue;

    if (code) seenCodes.add(code);
    if (title) seenTitles.add(title);

    // Enforce 45 minutes for UX35_GEO_GIANT
    if (title === 'UX35_GEO_GIANT') {
      q.timeLimitMinutes = 45;
    }

    result.push(q);
  }

  if (result.length === 0) {
    return [...INITIAL_QUIZZES];
  }
  return result;
}

function loadDatabase(): ServerData {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (data && Array.isArray(data.quizzes)) {
        data.quizzes = sanitizeServerQuizzes(data.quizzes);
        return data;
      }
    }
  } catch (err) {
    console.error('Error reading assessment-db.json:', err);
  }

  // Initial seed data including UX35_GEO_GIANT
  const initialData: ServerData = {
    questions: INITIAL_QUESTIONS,
    quizzes: sanitizeServerQuizzes(INITIAL_QUIZZES),
    submissions: INITIAL_SUBMISSIONS,
    lastUpdated: new Date().toISOString(),
  };
  saveDatabase(initialData);
  return initialData;
}

const INITIAL_DATA_FILE = path.resolve(__dirname, 'src', 'data', 'initialData.ts');

function syncToCodebaseFile(data: ServerData): void {
  try {
    const codeContent = `/**
 * Pre-seeded Assessment Data & Repository
 * Automatically synchronized with assessment-db.json for Git and Vercel persistence
 */
import type { Question, Quiz, StudentSubmission } from '../types/quiz.ts';

export const INITIAL_QUESTIONS: Question[] = ${JSON.stringify(data.questions, null, 2)};

export const INITIAL_QUIZZES: Quiz[] = ${JSON.stringify(data.quizzes, null, 2)};

export const INITIAL_SUBMISSIONS: StudentSubmission[] = ${JSON.stringify(data.submissions, null, 2)};
`;
    fs.writeFileSync(INITIAL_DATA_FILE, codeContent, 'utf-8');
  } catch (err) {
    console.error('Error writing to initialData.ts:', err);
  }
}

function saveDatabase(data: ServerData): void {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    syncToCodebaseFile(data);
  } catch (err) {
    console.error('Error writing assessment-db.json:', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '50mb' }));

  // API Endpoints
  // 1. Health & Status
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 2. Full Sync (Get all questions, quizzes, submissions)
  app.get('/api/sync', (req, res) => {
    const db = loadDatabase();
    res.json(db);
  });

  // 3. Post Sync (Authoritative sync of quizzes and questions)
  app.post('/api/sync', (req, res) => {
    const { questions, quizzes, submissions } = req.body;
    const db = loadDatabase();

    // Set quizzes authoritatively if supplied
    if (Array.isArray(quizzes)) {
      const quizMap = new Map<string, any>();
      quizzes.forEach((q: any) => {
        const key = (q.accessCode || q.id || '').toUpperCase().trim();
        if (!quizMap.has(key)) {
          quizMap.set(key, q);
        }
      });
      db.quizzes = Array.from(quizMap.values());
    }

    // Merge questions
    if (Array.isArray(questions)) {
      const questionMap = new Map<string, any>(db.questions.map((q: any) => [q.id, q]));
      questions.forEach((q: any) => {
        questionMap.set(q.id, q);
      });
      db.questions = Array.from(questionMap.values());
    }

    // Merge submissions
    if (Array.isArray(submissions)) {
      const subMap = new Map<string, any>(db.submissions.map((s: any) => [s.id, s]));
      submissions.forEach((s: any) => {
        subMap.set(s.id, s);
      });
      db.submissions = Array.from(subMap.values());
    }

    saveDatabase(db);
    res.json({ success: true, count: { quizzes: db.quizzes.length, questions: db.questions.length, submissions: db.submissions.length } });
  });

  // 4. Quizzes
  app.get('/api/quizzes', (req, res) => {
    const db = loadDatabase();
    res.json(db.quizzes);
  });

  app.post('/api/quizzes', (req, res) => {
    const quiz = req.body;
    if (!quiz || !quiz.id) {
      return res.status(400).json({ error: 'Quiz must have an id' });
    }
    const db = loadDatabase();
    const idx = db.quizzes.findIndex((q: any) => q.id === quiz.id || (q.accessCode && q.accessCode.toUpperCase() === quiz.accessCode.toUpperCase()));
    if (idx >= 0) {
      db.quizzes[idx] = { ...quiz, updatedAt: new Date().toISOString() };
    } else {
      db.quizzes.unshift({ ...quiz, updatedAt: new Date().toISOString() });
    }
    saveDatabase(db);
    res.json({ success: true, quiz });
  });

  app.delete('/api/quizzes/:id', (req, res) => {
    const { id } = req.params;
    const db = loadDatabase();
    const target = db.quizzes.find((q: any) => q.id === id);
    const targetCode = target ? target.accessCode.toUpperCase().trim() : null;
    db.quizzes = db.quizzes.filter((q: any) => q.id !== id && (!targetCode || q.accessCode.toUpperCase().trim() !== targetCode));
    saveDatabase(db);
    res.json({ success: true, id });
  });

  // 5. Questions
  app.get('/api/questions', (req, res) => {
    const db = loadDatabase();
    res.json(db.questions);
  });

  app.post('/api/questions', (req, res) => {
    const question = req.body;
    if (!question || !question.id) {
      return res.status(400).json({ error: 'Question must have an id' });
    }
    const db = loadDatabase();
    const idx = db.questions.findIndex((q: any) => q.id === question.id);
    if (idx >= 0) {
      db.questions[idx] = question;
    } else {
      db.questions.push(question);
    }

    if (req.body.targetQuizId) {
      const targetQuiz = db.quizzes.find((q: any) => q.id === req.body.targetQuizId);
      if (targetQuiz && Array.isArray(targetQuiz.questionIds) && !targetQuiz.questionIds.includes(question.id)) {
        targetQuiz.questionIds.push(question.id);
      }
    }

    saveDatabase(db);
    res.json({ success: true, question });
  });

  app.post('/api/questions/bulk', (req, res) => {
    const newQuestions = req.body;
    if (!Array.isArray(newQuestions)) {
      return res.status(400).json({ error: 'Payload must be an array of questions' });
    }
    const db = loadDatabase();
    const qMap = new Map<string, any>(db.questions.map((q: any) => [q.id, q]));
    newQuestions.forEach((q: any) => {
      qMap.set(q.id, q);
    });
    db.questions = Array.from(qMap.values());
    saveDatabase(db);
    res.json({ success: true, total: db.questions.length });
  });

  app.delete('/api/questions/:id', (req, res) => {
    const { id } = req.params;
    const db = loadDatabase();
    db.questions = db.questions.filter((q: any) => q.id !== id);
    saveDatabase(db);
    res.json({ success: true, id });
  });

  // Direct persistence to codebase files for Git and Vercel
  app.post('/api/persist-to-code', (req, res) => {
    const { questions, quizzes, submissions } = req.body;
    const db = loadDatabase();

    if (Array.isArray(questions) && questions.length > 0) {
      const qMap = new Map<string, any>(db.questions.map((q: any) => [q.id, q]));
      questions.forEach((q: any) => qMap.set(q.id, q));
      db.questions = Array.from(qMap.values());
    }

    if (Array.isArray(quizzes) && quizzes.length > 0) {
      db.quizzes = sanitizeServerQuizzes(quizzes);
    }

    if (Array.isArray(submissions) && submissions.length > 0) {
      const sMap = new Map<string, any>(db.submissions.map((s: any) => [s.id, s]));
      submissions.forEach((s: any) => sMap.set(s.id, s));
      db.submissions = Array.from(sMap.values());
    }

    saveDatabase(db);
    res.json({
      success: true,
      message: 'Persisted to assessment-db.json and src/data/initialData.ts',
      counts: {
        questions: db.questions.length,
        quizzes: db.quizzes.length,
      },
    });
  });

  // 6. Submissions
  app.get('/api/submissions', (req, res) => {
    const db = loadDatabase();
    res.json(db.submissions);
  });

  app.post('/api/submissions', (req, res) => {
    const submission = req.body;
    if (!submission || !submission.id) {
      return res.status(400).json({ error: 'Submission must have an id' });
    }
    const db = loadDatabase();
    db.submissions.unshift(submission);
    saveDatabase(db);
    res.json({ success: true, submission });
  });

  // 7. Reset Data
  app.post('/api/reset', (req, res) => {
    const { initialQuestions = [], initialQuizzes = [], initialSubmissions = [] } = req.body;
    const db: ServerData = {
      questions: initialQuestions,
      quizzes: initialQuizzes,
      submissions: initialSubmissions,
      lastUpdated: new Date().toISOString(),
    };
    saveDatabase(db);
    res.json({ success: true });
  });

  // Vite Integration
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
