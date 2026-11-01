export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D' etc.
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string; // matches id e.g. 'A' or 'B'
  explanation?: string;
  category: string;
  difficulty: Difficulty;
  timeLimitSec?: number; // optional question-specific time limit
  points: number;
  createdAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  accessCode: string; // e.g. "QUIZ-101"
  questionIds: string[];
  timeLimitMinutes?: number; // Total quiz time limit in minutes (0 or undefined = untimed)
  passingScorePercent: number; // e.g. 70
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  allowReview: boolean;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface QuestionAttempt {
  questionId: string;
  selectedOptionId: string | null; // null if skipped
  isCorrect: boolean;
  timeSpentSeconds: number; // time student spent on this question
}

export interface StudentSubmission {
  id: string;
  quizId: string;
  quizTitle: string;
  studentName: string;
  studentRegNo: string;
  studentEmailOrId?: string;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  skippedCount: number;
  scorePercent: number;
  passed: boolean;
  totalTimeSpentSeconds: number;
  submittedAt: string;
  attempts: QuestionAttempt[];
}

export interface DistractorStats {
  optionId: string;
  optionText: string;
  isCorrect: boolean;
  count: number;
  percentage: number;
}

export interface QuestionDiagnostic {
  questionId: string;
  questionText: string;
  category: string;
  difficulty: Difficulty;
  correctOptionId: string;
  explanation?: string;
  totalAttempts: number;
  correctCount: number;
  incorrectCount: number;
  accuracyRate: number; // 0 - 100
  missRate: number; // 0 - 100
  avgTimeSpentSeconds: number;
  minTimeSpentSeconds: number;
  maxTimeSpentSeconds: number;
  distractors: DistractorStats[];
}

export interface QuizAnalyticsSummary {
  quizId: string;
  quizTitle: string;
  totalSubmissions: number;
  avgScorePercent: number;
  passRatePercent: number;
  avgCompletionTimeSeconds: number;
  fastestTimeSeconds: number;
  slowestTimeSeconds: number;
  totalCorrectAnswers: number;
  totalIncorrectAnswers: number;
  mostMissedQuestions: QuestionDiagnostic[];
  questionDiagnostics: QuestionDiagnostic[];
}
