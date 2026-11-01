import React from 'react';
import { X, CheckCircle2, XCircle, Clock, Award, HelpCircle } from 'lucide-react';
import { StudentSubmission, Question } from '../../types/quiz';
import { formatTimeSeconds } from '../../services/storageService';

interface SubmissionDetailModalProps {
  submission: StudentSubmission | null;
  questions: Question[];
  onClose: () => void;
}

export const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  submission,
  questions,
  onClose,
}) => {
  if (!submission) return null;

  const questionMap = new Map(questions.map(q => [q.id, q]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {submission.studentName}
              </h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${
                submission.passed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {submission.passed ? 'PASSED' : 'NOT PASSED'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 mt-1 flex-wrap">
              <span className="font-mono font-semibold text-slate-800">Reg No: {submission.studentRegNo || submission.studentEmailOrId}</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">Quiz: {submission.quizTitle}</span>
              <span aria-hidden="true">·</span>
              <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Quick Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 text-center">
          <div>
            <p className="text-xs text-slate-500">Score</p>
            <p className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
              {submission.scorePercent}% ({submission.correctCount}/{submission.totalQuestions})
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Correct vs Wrong</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 tabular-nums mt-0.5">
              <span className="text-emerald-600">{submission.correctCount} Right</span> / <span className="text-rose-600">{submission.incorrectCount} Wrong</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Time</p>
            <p className="text-lg font-bold text-slate-900 tabular-nums">
              {formatTimeSeconds(submission.totalTimeSpentSeconds)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Avg Time / Question</p>
            <p className="text-lg font-bold text-slate-900 tabular-nums">
              {submission.totalQuestions > 0
                ? Math.round(submission.totalTimeSpentSeconds / submission.totalQuestions)
                : 0}s
            </p>
          </div>
        </div>

        {/* Question-by-Question Audit Sheet */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-xs">
              Item Response Audit ({submission.attempts.length} Items)
            </h3>
            <span className="text-xs text-slate-500">Detailed student choices & dwell times</span>
          </div>

          {submission.attempts.map((attempt, index) => {
            const question = questionMap.get(attempt.questionId);
            const selectedOpt = question?.options.find(o => o.id === attempt.selectedOptionId);
            const correctOpt = question?.options.find(o => o.id === question?.correctOptionId);

            return (
              <div
                key={attempt.questionId || index}
                className="p-4 rounded-lg border border-slate-200 bg-white"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <p className="text-sm font-medium text-slate-900">
                      {question?.text || `Question ID: ${attempt.questionId}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {attempt.timeSpentSeconds}s
                    </span>
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

                {/* Option listing */}
                {question && (
                  <div className="mt-3 space-y-1.5 pl-6">
                    {question.options.map(option => {
                      const isStudentPick = option.id === attempt.selectedOptionId;
                      const isCorrectChoice = option.id === question.correctOptionId;

                      let rowStyle = 'border-slate-100 text-slate-600 bg-slate-50/50';
                      if (isStudentPick && isCorrectChoice) {
                        rowStyle = 'border-emerald-300 bg-emerald-50/70 text-emerald-900 font-medium';
                      } else if (isStudentPick && !isCorrectChoice) {
                        rowStyle = 'border-rose-300 bg-rose-50/70 text-rose-900 font-medium';
                      } else if (!isStudentPick && isCorrectChoice) {
                        rowStyle = 'border-emerald-200 bg-emerald-50/30 text-emerald-800';
                      }

                      return (
                        <div
                          key={option.id}
                          className={`text-xs px-3 py-2 rounded border flex items-center justify-between ${rowStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold w-4">{option.id}.</span>
                            <span>{option.text}</span>
                          </div>
                          <div className="flex items-center gap-2 text-2xs">
                            {isStudentPick && (
                              <span className="font-semibold uppercase tracking-wider text-[10px] text-slate-600">
                                Student Answer
                              </span>
                            )}
                            {isCorrectChoice && (
                              <span className="font-semibold text-emerald-700 text-[10px] uppercase tracking-wider">
                                Key
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Explanation */}
                {question?.explanation && (
                  <div className="mt-3 pl-6 pt-2 text-xs text-slate-600 flex items-start gap-1.5 border-t border-slate-100">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-slate-700 font-semibold">Explanation: </strong>
                      {question.explanation}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
