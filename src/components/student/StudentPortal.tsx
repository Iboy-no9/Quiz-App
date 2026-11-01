import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  Play,
  KeyRound,
  FileQuestion,
  User,
  ArrowRight,
  AlertCircle,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Quiz, Question, StudentSubmission } from '../../types/quiz';
import { filterAndDeduplicateQuizzes } from '../../services/storageService';
import { QuizRunner } from './QuizRunner';
import { QuizResultView } from './QuizResultView';

interface StudentPortalProps {
  quizzes: Quiz[];
  questions: Question[];
  initialQuizId?: string | null;
  onClearInitialQuizId?: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  quizzes,
  questions,
  initialQuizId,
  onClearInitialQuizId,
}) => {
  // Candidate identity (start empty or from localStorage; never fake mock data)
  const [studentName, setStudentName] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('qm_student_name') || '';
    }
    return '';
  });
  const [studentRegNo, setStudentRegNo] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('qm_student_regno') || '';
    }
    return '';
  });

  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [accessCodeError, setAccessCodeError] = useState('');
  const [profileError, setProfileError] = useState('');

  // Active testing state (Only set AFTER student name & reg no are verified)
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<StudentSubmission | null>(null);

  // Candidate Entry Gate state: holds the quiz the student selected to enter
  const [pendingQuizToEnter, setPendingQuizToEnter] = useState<Quiz | null>(() => {
    if (initialQuizId) {
      return quizzes.find(q => q.id === initialQuizId) || null;
    }
    return null;
  });

  // Modal form states
  const [modalCandidateName, setModalCandidateName] = useState('');
  const [modalCandidateRegNo, setModalCandidateRegNo] = useState('');
  const [gateError, setGateError] = useState('');

  // When initialQuizId changes (e.g. from shared link or teacher launch), open verification gate
  useEffect(() => {
    if (initialQuizId) {
      const target = quizzes.find(q => q.id === initialQuizId);
      if (target) {
        setPendingQuizToEnter(target);
        setModalCandidateName(studentName);
        setModalCandidateRegNo(studentRegNo);
      }
    }
  }, [initialQuizId, quizzes]);

  const activeQuizzes = React.useMemo(() => {
    return filterAndDeduplicateQuizzes(quizzes.filter(q => q.status === 'active'));
  }, [quizzes]);
  const questionMap = new Map(questions.map(q => [q.id, q]));

  // Called when user clicks "Begin Assessment" on a quiz card
  const handleRequestEnterQuiz = (quiz: Quiz) => {
    setGateError('');
    setProfileError('');
    setModalCandidateName(studentName);
    setModalCandidateRegNo(studentRegNo);
    setPendingQuizToEnter(quiz);
  };

  // Called when entering access code
  const handleAccessCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAccessCodeError('');
    const code = accessCodeInput.trim().toUpperCase();
    if (!code) return;

    const matched = quizzes.find(q => q.accessCode.toUpperCase() === code);
    if (!matched) {
      setAccessCodeError(`No quiz found with code "${code}". Please verify with your teacher.`);
      return;
    }

    handleRequestEnterQuiz(matched);
  };

  // Called when student submits candidate verification modal to start the test
  const handleConfirmAndProceedToQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = modalCandidateName.trim();
    const trimmedRegNo = modalCandidateRegNo.trim();

    if (!trimmedName || !trimmedRegNo) {
      setGateError('Please enter both your Student Full Name and Registration Number (Reg No) before proceeding to the quiz.');
      return;
    }

    // Persist to state and storage
    setStudentName(trimmedName);
    setStudentRegNo(trimmedRegNo);
    if (typeof window !== 'undefined') {
      localStorage.setItem('qm_student_name', trimmedName);
      localStorage.setItem('qm_student_regno', trimmedRegNo);
    }

    setGateError('');
    setActiveQuiz(pendingQuizToEnter);
    setPendingQuizToEnter(null);
    setCurrentSubmission(null);
    if (onClearInitialQuizId) onClearInitialQuizId();
  };

  // If student is currently taking a quiz
  if (activeQuiz && !currentSubmission) {
    const quizQuestions = activeQuiz.questionIds
      .map(id => questionMap.get(id))
      .filter(Boolean) as Question[];

    if (quizQuestions.length === 0) {
      return (
        <div className="max-w-xl mx-auto px-4 py-16 text-center">
          <p className="text-sm font-semibold text-rose-600 mb-2">Quiz has no assigned questions.</p>
          <button
            onClick={() => setActiveQuiz(null)}
            className="text-xs font-semibold text-slate-900 underline"
          >
            Return to quiz list
          </button>
        </div>
      );
    }

    return (
      <QuizRunner
        quiz={activeQuiz}
        questions={quizQuestions}
        studentName={studentName}
        studentRegNo={studentRegNo}
        onFinishQuiz={sub => setCurrentSubmission(sub)}
        onCancel={() => {
          setActiveQuiz(null);
          if (onClearInitialQuizId) onClearInitialQuizId();
        }}
      />
    );
  }

  // If student just finished and viewing results
  if (currentSubmission && activeQuiz) {
    const quizQuestions = activeQuiz.questionIds
      .map(id => questionMap.get(id))
      .filter(Boolean) as Question[];

    return (
      <QuizResultView
        submission={currentSubmission}
        quiz={activeQuiz}
        questions={quizQuestions}
        onRetake={() => setCurrentSubmission(null)}
        onExit={() => {
          setActiveQuiz(null);
          setCurrentSubmission(null);
          if (onClearInitialQuizId) onClearInitialQuizId();
        }}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
      {/* Student Identification Strip */}
      <div className="p-4 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Student Examination Profile
              </h2>
              <p className="text-xs text-slate-500">
                Enter your full name and student registration number for the test report.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="w-full sm:w-48 lg:w-56">
              <label htmlFor="student-name" className="text-[11px] font-semibold text-slate-600 block mb-1">
                Student Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="student-name"
                type="text"
                required
                placeholder="Full Name"
                value={studentName}
                onChange={e => {
                  setStudentName(e.target.value);
                  if (typeof window !== 'undefined') localStorage.setItem('qm_student_name', e.target.value);
                }}
                className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
              />
            </div>
            <div className="w-full sm:w-48 lg:w-56">
              <label htmlFor="student-id" className="text-[11px] font-semibold text-slate-600 block mb-1">
                Registration No. (Reg No) <span className="text-rose-500">*</span>
              </label>
              <input
                id="student-id"
                type="text"
                required
                placeholder="e.g. REG-2024-001"
                value={studentRegNo}
                onChange={e => {
                  setStudentRegNo(e.target.value);
                  if (typeof window !== 'undefined') localStorage.setItem('qm_student_regno', e.target.value);
                }}
                className="text-xs font-mono font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>
        {profileError && (
          <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
            {profileError}
          </div>
        )}
      </div>

      {/* Access Code Quick Jump Box */}
      <div className="p-4 sm:p-6 rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-slate-700 shrink-0" />
              <span>Have a Quiz Access Code?</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter the access code provided by your instructor to launch the test directly.
            </p>
          </div>

          <form onSubmit={handleAccessCodeSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="e.g. QZ-355"
              value={accessCodeInput}
              onChange={e => setAccessCodeInput(e.target.value.toUpperCase())}
              className="text-xs font-mono font-bold uppercase px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg w-full sm:w-40 focus:outline-none focus:ring-1 focus:ring-slate-900 text-center sm:text-left"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap min-h-[40px]"
            >
              <span>Join Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {accessCodeError && (
          <p className="text-xs font-semibold text-rose-600 mt-2">
            {accessCodeError}
          </p>
        )}
      </div>

      {/* Available Quizzes Catalog */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Available Assessment Tests
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an assessment to start your timed test.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeQuizzes.map(quiz => {
            return (
              <div
                key={quiz.id}
                className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {quiz.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Code: {quiz.accessCode}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {quiz.description || 'Complete the examination before the time limit expires.'}
                  </p>

                  <div className="grid grid-cols-3 gap-1 sm:gap-2 py-3 border-y border-slate-100 text-xs text-center">
                    <div>
                      <p className="text-[11px] text-slate-400">Questions</p>
                      <p className="font-semibold text-slate-800 tabular-nums">
                        {quiz.questionIds.length} items
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400">Duration</p>
                      <p className="font-semibold text-slate-800 tabular-nums">
                        {quiz.timeLimitMinutes ? `${quiz.timeLimitMinutes} mins` : 'Untimed'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-400">Passing Bar</p>
                      <p className="font-semibold text-slate-800 tabular-nums">
                        {quiz.passingScorePercent}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => handleRequestEnterQuiz(quiz)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors min-h-[40px]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Begin Assessment</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CANDIDATE IDENTIFICATION & ENTRY GATE MODAL */}
      {pendingQuizToEnter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden flex flex-col animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Candidate Entry Verification
                  </h3>
                  <p className="text-xs text-slate-500">
                    Required before proceeding to the quiz
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPendingQuizToEnter(null);
                  if (onClearInitialQuizId) onClearInitialQuizId();
                }}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg transition-colors"
                title="Cancel and return"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Assessment Target Information Strip */}
            <div className="p-4 bg-slate-50 border-b border-slate-100 text-xs">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Assessment Examination
                  </span>
                  <span className="font-bold text-slate-900 text-sm">
                    {pendingQuizToEnter.title}
                  </span>
                </div>
                <span className="font-mono font-bold text-xs bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
                  {pendingQuizToEnter.accessCode}
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 mt-2 text-[11px] flex-wrap">
                <span className="flex items-center gap-1">
                  <FileQuestion className="w-3.5 h-3.5 text-slate-400" />
                  {pendingQuizToEnter.questionIds.length} Questions
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {pendingQuizToEnter.timeLimitMinutes ? `${pendingQuizToEnter.timeLimitMinutes} minutes` : 'Untimed'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-400" />
                  {pendingQuizToEnter.passingScorePercent}% Cutoff
                </span>
              </div>
            </div>

            {/* Candidate Identity Form */}
            <form onSubmit={handleConfirmAndProceedToQuiz} className="p-5 space-y-4">
              <div className="p-3 bg-blue-50/70 border border-blue-200/60 rounded-xl text-xs text-blue-900 leading-relaxed">
                Please enter your registered student full name and registration number. After entering both details, click <strong>Proceed to Quiz</strong> to open the examination.
              </div>

              <div>
                <label htmlFor="gate-candidate-name" className="text-xs font-semibold text-slate-700 block mb-1">
                  Student Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="gate-candidate-name"
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. John Doe"
                  value={modalCandidateName}
                  onChange={e => {
                    setModalCandidateName(e.target.value);
                    if (gateError) setGateError('');
                  }}
                  className={`w-full text-xs font-medium p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                    gateError && !modalCandidateName.trim()
                      ? 'border-rose-400 ring-1 ring-rose-300 bg-rose-50/20'
                      : 'border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="gate-candidate-regno" className="text-xs font-semibold text-slate-700 block mb-1">
                  Registration Number (Reg No) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="gate-candidate-regno"
                  type="text"
                  required
                  placeholder="e.g. REG-2024-042 or Roll Number"
                  value={modalCandidateRegNo}
                  onChange={e => {
                    setModalCandidateRegNo(e.target.value);
                    if (gateError) setGateError('');
                  }}
                  className={`w-full text-xs font-mono font-bold p-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 ${
                    gateError && !modalCandidateRegNo.trim()
                      ? 'border-rose-400 ring-1 ring-rose-300 bg-rose-50/20'
                      : 'border-slate-200'
                  }`}
                />
              </div>

              {gateError && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{gateError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setPendingQuizToEnter(null);
                    if (onClearInitialQuizId) onClearInitialQuizId();
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                >
                  <span>Proceed to Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
