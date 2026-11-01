import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  ArrowRight,
  RotateCcw,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { StudentSubmission, Question, Quiz } from '../../types/quiz';
import { formatTimeSeconds } from '../../services/storageService';

interface QuizResultViewProps {
  submission: StudentSubmission;
  quiz: Quiz;
  questions: Question[];
  onRetake: () => void;
  onExit: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  submission,
  quiz,
  questions,
  onRetake,
  onExit,
}) => {
  const questionMap = new Map(questions.map(q => [q.id, q]));

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6">
      {/* Result Hero Banner */}
      <div className={`p-5 sm:p-8 rounded-2xl border ${
        submission.passed
          ? 'bg-emerald-50/70 border-emerald-200'
          : 'bg-rose-50/70 border-rose-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1">
              <span className={submission.passed ? 'text-emerald-700' : 'text-rose-700'}>
                {submission.passed ? 'Assessment Passed' : 'Assessment Result'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-600">{quiz.title}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {submission.passed ? 'Congratulations, ' : 'Completed, '}
              {submission.studentName}!
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 font-mono">
              <span>Reg No: <strong className="text-slate-900 font-bold">{submission.studentRegNo || submission.studentEmailOrId}</strong></span>
            </div>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {submission.passed
                ? `You reached the passing cutoff of ${quiz.passingScorePercent}%. Your submission has been recorded in the class diagnostic log.`
                : `You scored ${submission.scorePercent}%, which is below the passing cutoff of ${quiz.passingScorePercent}%. Review your missed questions below.`}
            </p>
          </div>

          <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/50">
            <div className={`text-4xl sm:text-5xl font-extrabold font-mono tabular-nums ${
              submission.passed ? 'text-emerald-700' : 'text-rose-700'
            }`}>
              {submission.scorePercent}%
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-0.5">
              {submission.correctCount} of {submission.totalQuestions} Correct
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-200/60 text-center">
          <div className="p-2 sm:p-0">
            <p className="text-xs text-slate-500">Correct Answers</p>
            <p className="text-lg font-bold text-emerald-700 tabular-nums">
              {submission.correctCount}
            </p>
          </div>
          <div className="p-2 sm:p-0 border-t sm:border-t-0 sm:border-x border-slate-200/60">
            <p className="text-xs text-slate-500">Missed / Skipped</p>
            <p className="text-lg font-bold text-rose-700 tabular-nums">
              {submission.incorrectCount}
            </p>
          </div>
          <div className="p-2 sm:p-0 border-t sm:border-t-0 border-slate-200/60">
            <p className="text-xs text-slate-500">Total Time Taken</p>
            <p className="text-lg font-bold text-slate-900 tabular-nums font-mono">
              {formatTimeSeconds(submission.totalTimeSpentSeconds)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900">
          Question Review & Solution Key
        </h2>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onRetake}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors min-h-[40px] sm:min-h-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Quiz</span>
          </button>
          <button
            onClick={onExit}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors min-h-[40px] sm:min-h-0"
          >
            <span>Exit to Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Question by Question Review */}
      <div className="space-y-4">
        {submission.attempts.map((attempt, index) => {
          const question = questionMap.get(attempt.questionId);
          if (!question) return null;

          return (
            <div
              key={question.id}
              className={`p-5 rounded-xl border bg-white ${
                attempt.isCorrect ? 'border-slate-200' : 'border-rose-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-start gap-2.5">
                  <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                    {index + 1}.
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {question.text}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>{question.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{question.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Time spent: {attempt.timeSpentSeconds}s
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {attempt.isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                      <XCircle className="w-3.5 h-3.5" /> Missed
                    </span>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="mt-4 space-y-1.5 pl-6">
                {question.options.map(option => {
                  const isUserPick = option.id === attempt.selectedOptionId;
                  const isCorrectAnswer = option.id === question.correctOptionId;

                  let style = 'border-slate-200 bg-slate-50 text-slate-600';
                  if (isUserPick && isCorrectAnswer) {
                    style = 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold';
                  } else if (isUserPick && !isCorrectAnswer) {
                    style = 'border-rose-400 bg-rose-50 text-rose-900 font-semibold';
                  } else if (!isUserPick && isCorrectAnswer) {
                    style = 'border-emerald-300 bg-emerald-50/50 text-emerald-800 font-medium';
                  }

                  return (
                    <div
                      key={option.id}
                      className={`px-3 py-2 rounded-lg border text-xs flex items-center justify-between ${style}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold w-4">{option.id}.</span>
                        <span>{option.text}</span>
                      </div>
                      <div className="text-2xs font-semibold uppercase tracking-wider">
                        {isUserPick && <span className="mr-2">Your Answer</span>}
                        {isCorrectAnswer && <span className="text-emerald-700">Correct Key</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {question.explanation && (
                <div className="mt-3 pl-6 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-600">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span>
                    <strong className="text-slate-800">Explanation: </strong>
                    {question.explanation}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
