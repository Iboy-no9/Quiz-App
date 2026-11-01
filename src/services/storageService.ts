import type { Question, Quiz, StudentSubmission, QuizAnalyticsSummary, QuestionDiagnostic, DistractorStats } from '../types/quiz.ts';
import { INITIAL_QUESTIONS, INITIAL_QUIZZES, INITIAL_SUBMISSIONS } from '../data/initialData.ts';

const STORAGE_KEYS = {
  QUESTIONS: 'qm_questions_v5',
  QUIZZES: 'qm_quizzes_v5',
  SUBMISSIONS: 'qm_submissions_v5',
  ACTIVE_QUIZ_ID: 'qm_active_quiz_id_v5',
};

const LEGACY_STORAGE_KEYS = [
  'qm_quizzes_v1',
  'qm_quizzes_v2',
  'qm_quizzes_v3',
  'qm_quizzes_v4',
  'assessment_quizzes_v1',
  'assessment_quizzes_v2',
];

const DISALLOWED_QUIZ_CODES = new Set(['ALL-100', 'WEB-101', 'SCI-200']);
const DISALLOWED_QUIZ_IDS = new Set(['quiz-all-questions', 'quiz-cs-fundamentals', 'quiz-science-essentials', 'quiz-ux35-geo']);
const DISALLOWED_TITLES = new Set([
  'COMPREHENSIVE EXAMINATION (ALL QUESTIONS)',
  'WEB & PROGRAMMING FUNDAMENTALS',
  'GENERAL SCIENCE & PHYSICAL PRINCIPLES'
]);

function purgeLegacyStorage() {
  if (typeof window === 'undefined') return;
  try {
    LEGACY_STORAGE_KEYS.forEach(k => {
      localStorage.removeItem(k);
    });
  } catch (e) {
    // ignore
  }
}

// Purge obsolete cache immediately on evaluation
purgeLegacyStorage();

export function filterAndDeduplicateQuizzes(quizzes: Quiz[]): Quiz[] {
  const seenCodes = new Set<string>();
  const seenTitles = new Set<string>();
  const result: Quiz[] = [];

  for (const q of quizzes) {
    if (!q || !q.id) continue;
    const code = (q.accessCode || '').toUpperCase().trim();
    const title = (q.title || '').toUpperCase().trim();
    const id = (q.id || '').trim();

    // Skip disallowed mock tests
    if (DISALLOWED_QUIZ_CODES.has(code)) continue;
    if (DISALLOWED_QUIZ_IDS.has(id)) continue;
    if (DISALLOWED_TITLES.has(title)) continue;

    // Deduplicate by code and title
    if (code && seenCodes.has(code)) continue;
    if (title && seenTitles.has(title)) continue;

    if (code) seenCodes.add(code);
    if (title) seenTitles.add(title);
    result.push(q);
  }

  // If list is empty, return initial quizzes (which contains solely UX35_GEO_GIANT)
  if (result.length === 0) {
    return [...INITIAL_QUIZZES];
  }

  return result;
}

// Custom event to sync changes across components
export const DATA_CHANGE_EVENT = 'qm_data_updated';

function triggerUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(DATA_CHANGE_EVENT));
  }
}

// Background API Sync helper
let isSyncing = false;
export async function syncWithServer(): Promise<void> {
  if (typeof window === 'undefined' || isSyncing) return;
  isSyncing = true;
  try {
    const res = await fetch('/api/sync');
    if (res.ok) {
      const serverData = await res.json();
      if (serverData.quizzes && Array.isArray(serverData.quizzes)) {
        const cleanQuizzes = filterAndDeduplicateQuizzes(serverData.quizzes);
        localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(cleanQuizzes));
      }
      if (serverData.questions && serverData.questions.length > 0) {
        localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(serverData.questions));
      }
      if (serverData.submissions) {
        localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(serverData.submissions));
      }
      triggerUpdate();
    }
  } catch (e) {
    // Graceful offline fallback
  } finally {
    isSyncing = false;
  }
}

// Initialize server sync in browser
if (typeof window !== 'undefined') {
  syncWithServer();
}


// Questions
export function getQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    }
    const parsed: Question[] = JSON.parse(raw);
    let changed = false;
    for (const initQ of INITIAL_QUESTIONS) {
      if (!parsed.some(q => q.id === initQ.id)) {
        parsed.push(initQ);
        changed = true;
      }
    }
    if (changed) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    return INITIAL_QUESTIONS;
  }
}

export function saveQuestions(questions: Question[]): void {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  triggerUpdate();

  fetch('/api/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questions }),
  }).catch(() => {});
}

export function addQuestions(newQuestions: Question[]): void {
  const current = getQuestions();
  // Prevent duplicate IDs
  const existingIds = new Set(current.map(q => q.id));
  const filtered = newQuestions.map(q => {
    if (existingIds.has(q.id)) {
      return { ...q, id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}` };
    }
    return q;
  });
  const updated = [...current, ...filtered];
  saveQuestions(updated);
}

export function updateQuestion(question: Question): void {
  const current = getQuestions();
  const index = current.findIndex(q => q.id === question.id);
  if (index !== -1) {
    current[index] = question;
    saveQuestions(current);
  }
}

export function deleteQuestion(questionId: string): void {
  const current = getQuestions();
  saveQuestions(current.filter(q => q.id !== questionId));

  fetch(`/api/questions/${questionId}`, { method: 'DELETE' }).catch(() => {});
}

// Quizzes
export function getQuizzes(): Quiz[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    if (!raw) {
      const initial = filterAndDeduplicateQuizzes(INITIAL_QUIZZES);
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(initial));
      return initial;
    }
    const parsed: Quiz[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = filterAndDeduplicateQuizzes(INITIAL_QUIZZES);
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(initial));
      return initial;
    }
    const cleanList = filterAndDeduplicateQuizzes(parsed);
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(cleanList));
    return cleanList;
  } catch (e) {
    return filterAndDeduplicateQuizzes(INITIAL_QUIZZES);
  }
}

export function saveQuizzes(quizzes: Quiz[]): void {
  const cleanList = filterAndDeduplicateQuizzes(quizzes);
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(cleanList));
  triggerUpdate();

  fetch('/api/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quizzes: cleanList }),
  }).catch(() => {});
}

export function saveQuiz(quiz: Quiz): void {
  const quizzes = getQuizzes();
  const index = quizzes.findIndex(q => q.id === quiz.id || (q.accessCode && q.accessCode.toUpperCase() === quiz.accessCode.toUpperCase()));
  if (index >= 0) {
    quizzes[index] = { ...quiz, updatedAt: new Date().toISOString() };
  } else {
    quizzes.unshift(quiz);
  }
  saveQuizzes(quizzes);

  fetch('/api/quizzes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quiz),
  }).catch(() => {});
}

export function deleteQuiz(quizId: string): void {
  const current = getQuizzes();
  const target = current.find(q => q.id === quizId);
  const targetCode = target ? target.accessCode.toUpperCase().trim() : null;
  const filtered = current.filter(q => q.id !== quizId && (!targetCode || q.accessCode.toUpperCase().trim() !== targetCode));
  saveQuizzes(filtered);

  fetch(`/api/quizzes/${quizId}`, { method: 'DELETE' }).catch(() => {});
}

// Submissions
export function getSubmissions(): StudentSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_SUBMISSIONS;
  }
}

export function saveSubmissions(submissions: StudentSubmission[]): void {
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  triggerUpdate();
}

export function addSubmission(submission: StudentSubmission): void {
  const submissions = getSubmissions();
  submissions.unshift(submission);
  saveSubmissions(submissions);

  fetch('/api/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  }).catch(() => {});
}

export function clearSubmissionsForQuiz(quizId: string): void {
  const submissions = getSubmissions().filter(s => s.quizId !== quizId);
  saveSubmissions(submissions);
}

// Reset all to sample factory data
export function resetToFactoryData(): void {
  localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
  localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(INITIAL_QUIZZES));
  localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(INITIAL_SUBMISSIONS));
  triggerUpdate();

  fetch('/api/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      initialQuestions: INITIAL_QUESTIONS,
      initialQuizzes: INITIAL_QUIZZES,
      initialSubmissions: INITIAL_SUBMISSIONS,
    }),
  }).catch(() => {});
}

// Compute Deep Diagnostics & Analytics
export function computeQuizAnalytics(quizId: string): QuizAnalyticsSummary | null {
  const quizzes = getQuizzes();
  const quiz = quizzes.find(q => q.id === quizId);
  if (!quiz) return null;

  const questions = getQuestions();
  const questionMap = new Map(questions.map(q => [q.id, q]));
  const quizQuestions = quiz.questionIds.map(id => questionMap.get(id)).filter(Boolean) as Question[];

  const allSubmissions = getSubmissions();
  const submissions = allSubmissions.filter(s => s.quizId === quizId);

  if (submissions.length === 0) {
    return {
      quizId: quiz.id,
      quizTitle: quiz.title,
      totalSubmissions: 0,
      avgScorePercent: 0,
      passRatePercent: 0,
      avgCompletionTimeSeconds: 0,
      fastestTimeSeconds: 0,
      slowestTimeSeconds: 0,
      totalCorrectAnswers: 0,
      totalIncorrectAnswers: 0,
      mostMissedQuestions: [],
      questionDiagnostics: quizQuestions.map(q => ({
        questionId: q.id,
        questionText: q.text,
        category: q.category,
        difficulty: q.difficulty,
        correctOptionId: q.correctOptionId,
        explanation: q.explanation,
        totalAttempts: 0,
        correctCount: 0,
        incorrectCount: 0,
        accuracyRate: 0,
        missRate: 0,
        avgTimeSpentSeconds: 0,
        minTimeSpentSeconds: 0,
        maxTimeSpentSeconds: 0,
        distractors: q.options.map(opt => ({
          optionId: opt.id,
          optionText: opt.text,
          isCorrect: opt.id === q.correctOptionId,
          count: 0,
          percentage: 0,
        })),
      })),
    };
  }

  const totalSubmissions = submissions.length;
  const avgScorePercent = Math.round(
    submissions.reduce((acc, s) => acc + s.scorePercent, 0) / totalSubmissions
  );
  const passCount = submissions.filter(s => s.passed).length;
  const passRatePercent = Math.round((passCount / totalSubmissions) * 100);

  const times = submissions.map(s => s.totalTimeSpentSeconds).filter(t => t > 0);
  const avgCompletionTimeSeconds = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const fastestTimeSeconds = times.length > 0 ? Math.min(...times) : 0;
  const slowestTimeSeconds = times.length > 0 ? Math.max(...times) : 0;

  let totalCorrectAnswers = 0;
  let totalIncorrectAnswers = 0;

  // Question diagnostics
  const questionDiagnostics: QuestionDiagnostic[] = quizQuestions.map(q => {
    let attemptsCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    const timeList: number[] = [];
    const optionCounts: Record<string, number> = {};

    q.options.forEach(opt => {
      optionCounts[opt.id] = 0;
    });

    submissions.forEach(sub => {
      const attempt = sub.attempts.find(a => a.questionId === q.id);
      if (attempt) {
        attemptsCount++;
        if (attempt.isCorrect) {
          correctCount++;
          totalCorrectAnswers++;
        } else {
          incorrectCount++;
          totalIncorrectAnswers++;
        }
        if (attempt.timeSpentSeconds) {
          timeList.push(attempt.timeSpentSeconds);
        }
        if (attempt.selectedOptionId && optionCounts[attempt.selectedOptionId] !== undefined) {
          optionCounts[attempt.selectedOptionId]++;
        }
      }
    });

    const accuracyRate = attemptsCount > 0 ? Math.round((correctCount / attemptsCount) * 100) : 0;
    const missRate = attemptsCount > 0 ? Math.round((incorrectCount / attemptsCount) * 100) : 0;

    const avgTime = timeList.length > 0 ? Math.round(timeList.reduce((a, b) => a + b, 0) / timeList.length) : 0;
    const minTime = timeList.length > 0 ? Math.min(...timeList) : 0;
    const maxTime = timeList.length > 0 ? Math.max(...timeList) : 0;

    const distractors: DistractorStats[] = q.options.map(opt => {
      const count = optionCounts[opt.id] || 0;
      const percentage = attemptsCount > 0 ? Math.round((count / attemptsCount) * 100) : 0;
      return {
        optionId: opt.id,
        optionText: opt.text,
        isCorrect: opt.id === q.correctOptionId,
        count,
        percentage,
      };
    });

    return {
      questionId: q.id,
      questionText: q.text,
      category: q.category,
      difficulty: q.difficulty,
      correctOptionId: q.correctOptionId,
      explanation: q.explanation,
      totalAttempts: attemptsCount,
      correctCount,
      incorrectCount,
      accuracyRate,
      missRate,
      avgTimeSpentSeconds: avgTime,
      minTimeSpentSeconds: minTime,
      maxTimeSpentSeconds: maxTime,
      distractors,
    };
  });

  // Most missed questions sorted descending by miss rate
  const mostMissedQuestions = [...questionDiagnostics]
    .filter(q => q.totalAttempts > 0)
    .sort((a, b) => b.missRate - a.missRate);

  return {
    quizId: quiz.id,
    quizTitle: quiz.title,
    totalSubmissions,
    avgScorePercent,
    passRatePercent,
    avgCompletionTimeSeconds,
    fastestTimeSeconds,
    slowestTimeSeconds,
    totalCorrectAnswers,
    totalIncorrectAnswers,
    mostMissedQuestions,
    questionDiagnostics,
  };
}

// Generate Realistic Simulated Class Batch
export function simulateClassSubmissions(quizId: string, count: number = 10): void {
  const quizzes = getQuizzes();
  const quiz = quizzes.find(q => q.id === quizId);
  if (!quiz) return;

  const questions = getQuestions();
  const questionMap = new Map(questions.map(q => [q.id, q]));
  const quizQuestions = quiz.questionIds.map(id => questionMap.get(id)).filter(Boolean) as Question[];
  if (quizQuestions.length === 0) return;

  const firstNames = ['Liam', 'Emma', 'Noah', 'Olivia', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William', 'Ava', 'James', 'Mia', 'Lucas', 'Charlotte', 'Henry'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];

  const newSubmissions: StudentSubmission[] = [];

  for (let i = 0; i < count; i++) {
    const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const studentName = `${fName} ${lName}`;
    const studentRegNo = `REG-2024-${String(101 + i).padStart(3, '0')}`;
    const studentEmailOrId = studentRegNo;

    // Student competency profile: strong (80-100%), average (50-80%), struggling (20-50%)
    const profile = Math.random();
    const targetPassProb = profile > 0.6 ? 0.85 : profile > 0.25 ? 0.65 : 0.4;

    const attempts = quizQuestions.map(q => {
      // Harder questions have higher miss chance
      let passChance = targetPassProb;
      if (q.difficulty === 'hard') passChance -= 0.2;
      if (q.difficulty === 'easy') passChance += 0.15;
      passChance = Math.max(0.1, Math.min(0.95, passChance));

      const isCorrect = Math.random() < passChance;
      let selectedOptionId = q.correctOptionId;

      if (!isCorrect) {
        // pick distractor
        const distractors = q.options.filter(o => o.id !== q.correctOptionId);
        if (distractors.length > 0) {
          selectedOptionId = distractors[Math.floor(Math.random() * distractors.length)].id;
        }
      }

      // Time spent on question between 15s and 90s
      const baseSec = q.difficulty === 'hard' ? 55 : q.difficulty === 'medium' ? 40 : 25;
      const variation = Math.floor((Math.random() - 0.5) * 30);
      const timeSpentSeconds = Math.max(10, baseSec + variation);

      return {
        questionId: q.id,
        selectedOptionId,
        isCorrect,
        timeSpentSeconds,
      };
    });

    const correctCount = attempts.filter(a => a.isCorrect).length;
    const incorrectCount = attempts.length - correctCount;
    const scorePercent = Math.round((correctCount / attempts.length) * 100);
    const passed = scorePercent >= quiz.passingScorePercent;
    const totalTimeSpentSeconds = attempts.reduce((acc, a) => acc + a.timeSpentSeconds, 0);

    const submissionTime = new Date(Date.now() - Math.floor(Math.random() * 86400000 * 3)).toISOString();

    newSubmissions.push({
      id: `sub-sim-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      studentName,
      studentRegNo,
      studentEmailOrId,
      totalQuestions: attempts.length,
      correctCount,
      incorrectCount,
      skippedCount: 0,
      scorePercent,
      passed,
      totalTimeSpentSeconds,
      submittedAt: submissionTime,
      attempts,
    });
  }

  const current = getSubmissions();
  saveSubmissions([...newSubmissions, ...current]);
}

// Format Seconds into mm:ss
export function formatTimeSeconds(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

// Export Analytics or Submissions to CSV
export function exportSubmissionsToCSV(submissions: StudentSubmission[], quizTitle: string): void {
  if (submissions.length === 0) return;

  const headers = ['Submission ID', 'Student Name', 'Registration Number (Reg No)', 'Quiz Title', 'Score %', 'Correct', 'Incorrect', 'Passed', 'Total Time (sec)', 'Total Time (formatted)', 'Submitted At'];
  const rows = submissions.map(s => [
    `"${s.id}"`,
    `"${s.studentName.replace(/"/g, '""')}"`,
    `"${(s.studentRegNo || s.studentEmailOrId || '').replace(/"/g, '""')}"`,
    `"${s.quizTitle.replace(/"/g, '""')}"`,
    s.scorePercent,
    s.correctCount,
    s.incorrectCount,
    s.passed ? 'PASS' : 'FAIL',
    s.totalTimeSpentSeconds,
    `"${formatTimeSeconds(s.totalTimeSpentSeconds)}"`,
    `"${s.submittedAt}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadBlob(csvContent, `quiz-results-${quizTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.csv`, 'text/csv');
}

export function exportQuestionDiagnosticsToCSV(diagnostics: QuestionDiagnostic[], quizTitle: string): void {
  if (diagnostics.length === 0) return;

  const headers = ['Question ID', 'Question Prompt', 'Category', 'Difficulty', 'Correct Answer', 'Total Attempts', 'Correct Count', 'Incorrect Count', 'Miss Rate %', 'Accuracy Rate %', 'Avg Time (sec)', 'Distractor Breakdown'];
  const rows = diagnostics.map(d => [
    `"${d.questionId}"`,
    `"${d.questionText.replace(/"/g, '""')}"`,
    `"${d.category}"`,
    d.difficulty,
    `"${d.correctOptionId}"`,
    d.totalAttempts,
    d.correctCount,
    d.incorrectCount,
    `${d.missRate}%`,
    `${d.accuracyRate}%`,
    d.avgTimeSpentSeconds,
    `"${d.distractors.map(dist => `${dist.optionId}: ${dist.percentage}% (${dist.count})`).join(' | ')}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadBlob(csvContent, `question-miss-analysis-${quizTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}.csv`, 'text/csv');
}

function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type: `${type};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
