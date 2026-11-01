import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  X,
  User,
  Hash,
  ArrowUp,
  FileText,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Flag,
} from 'lucide-react';
import { Quiz, Question, QuestionAttempt, StudentSubmission } from '../../types/quiz';
import { addSubmission, formatTimeSeconds } from '../../services/storageService';

interface QuizRunnerProps {
  quiz: Quiz;
  questions: Question[];
  studentName: string;
  studentRegNo: string;
  onFinishQuiz: (submission: StudentSubmission) => void;
  onCancel: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  quiz,
  questions,
  studentName: initialName,
  studentRegNo: initialRegNo,
  onFinishQuiz,
  onCancel,
}) => {
  // Student candidate details
  const [name, setName] = useState(initialName || '');
  const [regNo, setRegNo] = useState(initialRegNo || '');
  const [showIdentityAlert, setShowIdentityAlert] = useState(!initialName || !initialRegNo);

  // View mode: 'all' = All questions on one page, 'stepper' = one by one
  const [viewMode, setViewMode] = useState<'all' | 'stepper'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Exam state
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> selectedOptionId
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [questionDwellTimes, setQuestionDwellTimes] = useState<Record<string, number>>({});
  const [totalSecondsElapsed, setTotalSecondsElapsed] = useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [lastInteractedQId, setLastInteractedQId] = useState<string>(questions[0]?.id || '');

  // Timers
  const totalAllowedSeconds = (quiz.timeLimitMinutes || 0) * 60;
  const isTimed = totalAllowedSeconds > 0;
  const remainingSeconds = isTimed ? Math.max(0, totalAllowedSeconds - totalSecondsElapsed) : 0;

  const lastInteractedQIdRef = useRef(lastInteractedQId);
  lastInteractedQIdRef.current = lastInteractedQId;

  // Question refs for smooth scrolling to specific question
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSecondsElapsed(prev => {
        const next = prev + 1;
        if (isTimed && next >= totalAllowedSeconds) {
          clearInterval(timer);
          handleSubmitAssessment();
        }
        return next;
      });

      // Track dwell time on the currently active / last interacted question
      const activeId = lastInteractedQIdRef.current;
      if (activeId) {
        setQuestionDwellTimes(prev => ({
          ...prev,
          [activeId]: (prev[activeId] || 0) + 1,
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimed, totalAllowedSeconds]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setLastInteractedQId(questionId);
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleToggleFlag = (questionId: string) => {
    setFlagged(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const scrollToQuestion = (questionId: string, index: number) => {
    if (viewMode === 'stepper') {
      setCurrentIndex(index);
    } else {
      setLastInteractedQId(questionId);
      questionRefs.current[questionId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmitAssessment = () => {
    if (!name.trim() || !regNo.trim()) {
      setShowIdentityAlert(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const attempts: QuestionAttempt[] = questions.map(q => {
      const selectedOptionId = answers[q.id] || null;
      const isCorrect = selectedOptionId === q.correctOptionId;

      if (!selectedOptionId) {
        skippedCount++;
        incorrectCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      return {
        questionId: q.id,
        selectedOptionId,
        isCorrect,
        timeSpentSeconds: questionDwellTimes[q.id] || 0,
      };
    });

    const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;
    const passed = scorePercent >= quiz.passingScorePercent;

    const submission: StudentSubmission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      studentName: name.trim(),
      studentRegNo: regNo.trim(),
      studentEmailOrId: regNo.trim(),
      totalQuestions: questions.length,
      correctCount,
      incorrectCount,
      skippedCount,
      scorePercent,
      passed,
      totalTimeSpentSeconds: totalSecondsElapsed,
      submittedAt: new Date().toISOString(),
      attempts,
    };

    addSubmission(submission);
    onFinishQuiz(submission);
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-16">
      {/* Sticky Top Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-500 truncate">
              <span className="font-bold text-slate-900 truncate">{quiz.title}</span>
              <span aria-hidden="true">·</span>
              <span className="shrink-0">{questions.length} Questions</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-slate-600 mt-0.5 truncate">
              <span className="truncate">Candidate: <strong className="text-slate-900">{name || '(Enter Name Below)'}</strong></span>
              <span aria-hidden="true" className="shrink-0">·</span>
              <span className="shrink-0">Reg No: <strong className="font-mono text-slate-900">{regNo || '(Enter Reg No)'}</strong></span>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
            {/* View Mode Toggle (Available on all devices) */}
            <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs shrink-0">
              <button
                onClick={() => setViewMode('all')}
                className={`px-2 sm:px-2.5 py-1 rounded font-medium transition-colors ${
                  viewMode === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="hidden sm:inline">All Questions</span>
                <span className="sm:hidden">Full</span>
              </button>
              <button
                onClick={() => setViewMode('stepper')}
                className={`px-2 sm:px-2.5 py-1 rounded font-medium transition-colors ${
                  viewMode === 'stepper' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="hidden sm:inline">One by One</span>
                <span className="sm:hidden">1-by-1</span>
              </button>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs font-mono font-bold tabular-nums shrink-0 ${
              isTimed && remainingSeconds < 120
                ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}>
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>
                {isTimed ? formatTimeSeconds(remainingSeconds) : formatTimeSeconds(totalSecondsElapsed)}
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-3 sm:px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs shrink-0 min-h-[34px]"
            >
              Submit ({answeredCount}/{questions.length})
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* STUDENT IDENTIFICATION HEADER BOX (Student Name and Reg No) */}
        <div className={`p-5 rounded-xl border bg-white shadow-xs space-y-3 ${
          showIdentityAlert && (!name.trim() || !regNo.trim())
            ? 'border-rose-400 ring-2 ring-rose-200 bg-rose-50/30'
            : 'border-slate-200'
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-700" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Student Identification Information
              </h2>
            </div>
            <span className="text-[11px] text-slate-500">Required on all examination papers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="student-name-input" className="text-xs font-semibold text-slate-700 block mb-1">
                Student Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="student-name-input"
                type="text"
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  if (e.target.value.trim() && regNo.trim()) setShowIdentityAlert(false);
                }}
                className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label htmlFor="student-regno-input" className="text-xs font-semibold text-slate-700 block mb-1">
                Registration Number (Reg No) <span className="text-rose-500">*</span>
              </label>
              <input
                id="student-regno-input"
                type="text"
                required
                placeholder="e.g. REG-2024-042 or Roll No."
                value={regNo}
                onChange={e => {
                  setRegNo(e.target.value);
                  if (e.target.value.trim() && name.trim()) setShowIdentityAlert(false);
                }}
                className="w-full text-xs font-mono font-semibold p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {showIdentityAlert && (!name.trim() || !regNo.trim()) && (
            <p className="text-xs font-semibold text-rose-600 flex items-center gap-1.5 pt-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Please enter both Student Name and Registration Number (Reg No) to submit your assessment.</span>
            </p>
          )}
        </div>

        {/* Quick Question Jump Strip */}
        <div className="p-3 sm:p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 overflow-hidden">
          <div className="flex items-center justify-between gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Quick Jump:
            </span>
            <span className="text-xs text-slate-500 font-mono sm:hidden">
              {answeredCount}/{questions.length} answered
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full touch-pan-x">
            {questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isFlag = !!flagged[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => scrollToQuestion(q.id, idx)}
                  className={`w-7 h-7 rounded-md font-mono text-xs font-bold shrink-0 transition-colors ${
                    isAnswered
                      ? 'bg-slate-900 text-white'
                      : isFlag
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <span className="hidden sm:inline text-xs text-slate-500 font-mono shrink-0">
            {answeredCount}/{questions.length} answered
          </span>
        </div>

        {/* MODE A: ALL QUESTIONS ON ONE PAGE (Full Paper) */}
        {viewMode === 'all' && (
          <div className="space-y-6">
            {questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isFlag = !!flagged[q.id];

              return (
                <div
                  key={q.id}
                  ref={el => { questionRefs.current[q.id] = el; }}
                  onClick={() => setLastInteractedQId(q.id)}
                  className={`p-6 sm:p-7 rounded-xl border bg-white transition-all shadow-xs ${
                    lastInteractedQId === q.id
                      ? 'border-slate-400 ring-1 ring-slate-400'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Question {idx + 1} of {questions.length}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500">
                        {q.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleToggleFlag(q.id);
                        }}
                        className={`text-xs px-2 py-1 rounded flex items-center gap-1 transition-colors ${
                          isFlag
                            ? 'bg-amber-100 text-amber-900 font-semibold'
                            : 'text-slate-400 hover:text-slate-700'
                        }`}
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>{isFlag ? 'Flagged' : 'Flag'}</span>
                      </button>

                      {isAnswered && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Answered
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="text-base font-semibold text-slate-900 mt-4 mb-4 leading-relaxed">
                    {q.text}
                  </div>

                  {/* Options List */}
                  <div className="space-y-2.5">
                    {q.options.map(opt => {
                      const isSelected = answers[q.id] === opt.id;

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                              : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-400 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-md font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-white text-slate-900' : 'bg-white border border-slate-200 text-slate-700'
                            }`}>
                              {opt.id}
                            </span>
                            <span className="text-xs sm:text-sm font-medium leading-relaxed">
                              {opt.text}
                            </span>
                          </div>

                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Bottom Finalize Bar */}
            <div className="p-6 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Ready to Submit Your Examination Paper?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  You have answered {answeredCount} of {questions.length} questions.
                  {unansweredCount > 0 && ` (${unansweredCount} remaining)`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to Top</span>
                </button>

                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                >
                  Submit Examination Paper
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODE B: STEPPER (Single Question) */}
        {viewMode === 'stepper' && (
          <div className="bg-white p-7 rounded-xl border border-slate-200 space-y-6">
            {questions[currentIndex] && (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                  <button
                    onClick={() => handleToggleFlag(questions[currentIndex].id)}
                    className="text-xs text-slate-500 hover:text-slate-900"
                  >
                    Flag Question
                  </button>
                </div>

                <div className="text-lg font-semibold text-slate-900 leading-relaxed">
                  {questions[currentIndex].text}
                </div>

                <div className="space-y-3">
                  {questions[currentIndex].options.map(opt => {
                    const isSelected = answers[questions[currentIndex].id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(questions[currentIndex].id, opt.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                          isSelected ? 'bg-slate-900 text-white' : 'bg-slate-50 hover:bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded font-mono text-xs font-bold flex items-center justify-center ${
                            isSelected ? 'bg-white text-slate-900' : 'bg-white text-slate-700'
                          }`}>
                            {opt.id}
                          </span>
                          <span className="text-sm font-medium">{opt.text}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 min-h-[44px] transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                    disabled={currentIndex === questions.length - 1}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg disabled:opacity-40 min-h-[44px] transition-colors"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Confirm Submission
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{name || '(Missing!)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Registration No (Reg No):</span>
                <span className="font-mono font-bold text-slate-900">{regNo || '(Missing!)'}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Total Questions:</span>
                <span className="font-semibold text-slate-900">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Answered:</span>
                <span className="font-semibold text-emerald-700">{answeredCount}</span>
              </div>
              {unansweredCount > 0 && (
                <div className="flex justify-between text-rose-600 font-semibold">
                  <span>Unanswered Questions:</span>
                  <span>{unansweredCount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Time Taken:</span>
                <span className="font-semibold text-slate-900 font-mono">{formatTimeSeconds(totalSecondsElapsed)}</span>
              </div>
            </div>

            {(!name.trim() || !regNo.trim()) && (
              <p className="text-xs font-bold text-rose-600">
                Error: You must provide your Student Name and Reg No before submitting.
              </p>
            )}

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Return to Test
              </button>
              <button
                onClick={handleSubmitAssessment}
                disabled={!name.trim() || !regNo.trim()}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-40"
              >
                Finalize & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
