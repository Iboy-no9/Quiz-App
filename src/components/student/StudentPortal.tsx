import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Award,
  Play,
  KeyRound,
  FileQuestion,
  User,
  ArrowRight,
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
  const [studentName, setStudentName] = useState('Alex Mercer');
  const [studentRegNo, setStudentRegNo] = useState('REG-2024-001');
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [accessCodeError, setAccessCodeError] = useState('');
  const [profileError, setProfileError] = useState('');

  // Active testing state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(() => {
    if (initialQuizId) {
      return quizzes.find(q => q.id === initialQuizId) || null;
    }
    return null;
  });
  const [currentSubmission, setCurrentSubmission] = useState<StudentSubmission | null>(null);

  const activeQuizzes = React.useMemo(() => {
    return filterAndDeduplicateQuizzes(quizzes.filter(q => q.status === 'active'));
  }, [quizzes]);
  const questionMap = new Map(questions.map(q => [q.id, q]));

  const handleStartQuiz = (quiz: Quiz) => {
    if (!studentName.trim() || !studentRegNo.trim()) {
      setProfileError('Please enter your full name and registration number (Reg No) before starting the quiz.');
      return;
    }
    setProfileError('');
    setActiveQuiz(quiz);
    setCurrentSubmission(null);
  };

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

    handleStartQuiz(matched);
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Identification Strip */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-full sm:w-auto">
              <label htmlFor="student-name" className="text-[11px] font-semibold text-slate-600 block mb-1">
                Student Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="student-name"
                type="text"
                required
                placeholder="Full Name"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-1 focus:ring-slate-900 font-medium"
              />
            </div>
            <div className="w-full sm:w-auto">
              <label htmlFor="student-id" className="text-[11px] font-semibold text-slate-600 block mb-1">
                Registration No. (Reg No) <span className="text-rose-500">*</span>
              </label>
              <input
                id="student-id"
                type="text"
                required
                placeholder="e.g. REG-2024-001"
                value={studentRegNo}
                onChange={e => setStudentRegNo(e.target.value)}
                className="text-xs font-mono font-bold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-1 focus:ring-slate-900"
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
      <div className="p-6 rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-slate-700" />
              <span>Have a Quiz Access Code?</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter the access code provided by your instructor to launch the test directly.
            </p>
          </div>

          <form onSubmit={handleAccessCodeSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. QZ-355"
              value={accessCodeInput}
              onChange={e => setAccessCodeInput(e.target.value.toUpperCase())}
              className="text-xs font-mono font-bold uppercase px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg w-36 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Join</span>
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
                className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold text-slate-500">
                      {quiz.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      Code: {quiz.accessCode}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {quiz.description || 'Complete the examination before the time limit expires.'}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-center">
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
                    onClick={() => handleStartQuiz(quiz)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Begin Assessment</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
