import React, { useState } from 'react';
import { UserCheck, ShieldAlert, Share2, KeyRound, X } from 'lucide-react';

interface NavbarProps {
  currentRole: 'admin' | 'student';
  onSwitchRole: (role: 'admin' | 'student') => void;
  adminTab: 'analytics' | 'importer' | 'questions' | 'quizzes';
  onSelectAdminTab: (tab: 'analytics' | 'importer' | 'questions' | 'quizzes') => void;
  onOpenShareModal: () => void;
  isStudentOnlyMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSwitchRole,
  adminTab,
  onSelectAdminTab,
  onOpenShareModal,
  isStudentOnlyMode,
}) => {
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const handleAdminAccess = () => {
    if (isStudentOnlyMode) {
      setPinInput('');
      setPinError('');
      setIsPinModalOpen(true);
    } else {
      onSwitchRole('admin');
    }
  };

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default teacher PIN is 1234 or admin
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsPinModalOpen(false);
      onSwitchRole('admin');
    } else {
      setPinError('Incorrect Teacher PIN. Default is 1234.');
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shrink-0">
            QM
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            QuizMaster
          </span>
        </div>

        {/* Zone 2: 4-5 clean single-line nav links */}
        {currentRole === 'admin' ? (
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectAdminTab('analytics')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                adminTab === 'analytics'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Results & Analytics
            </button>
            <button
              onClick={() => onSelectAdminTab('importer')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                adminTab === 'importer'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Bulk Add Questions
            </button>
            <button
              onClick={() => onSelectAdminTab('questions')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                adminTab === 'questions'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Question Bank
            </button>
            <button
              onClick={() => onSelectAdminTab('quizzes')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
                adminTab === 'quizzes'
                  ? 'text-slate-900 font-semibold border-b-2 border-slate-900'
                  : ''
              }`}
            >
              Quizzes & Tests
            </button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2.5 text-xs lg:text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Student Examination Portal</span>
            <span aria-hidden="true">·</span>
            <span>Name & Reg No Verified</span>
          </div>
        )}

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {currentRole === 'admin' ? (
            <>
              <button
                onClick={onOpenShareModal}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap"
                title="Send direct student link to your class"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span><span className="hidden sm:inline">Send to </span>Students</span>
              </button>

              <button
                onClick={() => onSwitchRole('student')}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span><span className="hidden sm:inline">Student </span>Preview</span>
              </button>
            </>
          ) : (
            <div>
              {isStudentOnlyMode ? (
                <button
                  onClick={handleAdminAccess}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-slate-700 p-1.5 rounded transition-colors whitespace-nowrap"
                  title="Teacher Administrator Access"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Teacher Access</span>
                </button>
              ) : (
                <button
                  onClick={() => onSwitchRole('admin')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span><span className="hidden sm:inline">Admin </span>Dashboard</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile subbar for Admin */}
      {currentRole === 'admin' && (
        <div className="md:hidden border-t border-slate-100 px-3 py-2 flex items-center gap-3 overflow-x-auto text-xs font-medium text-slate-600 touch-pan-x">
          <button
            onClick={() => onSelectAdminTab('analytics')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${adminTab === 'analytics' ? 'bg-slate-900 text-white font-bold' : 'hover:bg-slate-100'}`}
          >
            Analytics
          </button>
          <button
            onClick={() => onSelectAdminTab('importer')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${adminTab === 'importer' ? 'bg-slate-900 text-white font-bold' : 'hover:bg-slate-100'}`}
          >
            Bulk Import
          </button>
          <button
            onClick={() => onSelectAdminTab('questions')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${adminTab === 'questions' ? 'bg-slate-900 text-white font-bold' : 'hover:bg-slate-100'}`}
          >
            Questions
          </button>
          <button
            onClick={() => onSelectAdminTab('quizzes')}
            className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${adminTab === 'quizzes' ? 'bg-slate-900 text-white font-bold' : 'hover:bg-slate-100'}`}
          >
            Quizzes
          </button>
        </div>
      )}

      {/* Teacher PIN Access Modal (When students use the shared link) */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xs w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-slate-900" />
                <h3 className="text-sm font-bold text-slate-900">Teacher Login</h3>
              </div>
              <button
                onClick={() => setIsPinModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Enter Teacher Passcode to access grading and question management (Default PIN: <strong className="text-slate-900">1234</strong>).
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-3">
              <input
                type="password"
                autoFocus
                placeholder="Teacher PIN (1234)"
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                className="w-full text-center tracking-widest text-sm font-mono font-bold p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />

              {pinError && (
                <p className="text-xs font-semibold text-rose-600 text-center">{pinError}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPinModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Unlock Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
