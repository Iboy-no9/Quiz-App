/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { AnalyticsView } from './components/admin/AnalyticsView';
import { BulkImporter } from './components/admin/BulkImporter';
import { QuestionBankView } from './components/admin/QuestionBankView';
import { QuizManagerView } from './components/admin/QuizManagerView';
import { ShareQuizModal } from './components/admin/ShareQuizModal';
import { StudentPortal } from './components/student/StudentPortal';
import {
  getQuestions,
  getQuizzes,
  getSubmissions,
  DATA_CHANGE_EVENT,
  resetToFactoryData,
} from './services/storageService';
import { Question, Quiz, StudentSubmission } from './types/quiz';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'admin' | 'student'>('admin');
  const [adminTab, setAdminTab] = useState<'analytics' | 'importer' | 'questions' | 'quizzes'>('analytics');
  const [isStudentOnlyMode, setIsStudentOnlyMode] = useState(false);
  
  // Data state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>('');
  
  // Directly launched student quiz ID if launched from QuizManager or shared link
  const [studentInitialQuizId, setStudentInitialQuizId] = useState<string | null>(null);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [quizToShare, setQuizToShare] = useState<Quiz | null>(null);

  // Check query parameters on load for direct student distribution (?mode=student&code=XYZ)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get('mode');
      const codeParam = params.get('code') || params.get('quiz');

      if (modeParam === 'student' || Boolean(codeParam)) {
        setIsStudentOnlyMode(true);
        setCurrentRole('student');
        if (codeParam) {
          const currentQuizzes = getQuizzes();
          const found = currentQuizzes.find(
            q => q.accessCode.toUpperCase() === codeParam.toUpperCase() || q.id === codeParam
          );
          if (found) {
            setStudentInitialQuizId(found.id);
          }
        }
      }
    }
  }, []);

  const loadData = useCallback(() => {
    const qList = getQuestions();
    const quizList = getQuizzes();
    const subList = getSubmissions();

    setQuestions(qList);
    setQuizzes(quizList);
    setSubmissions(subList);

    setSelectedQuizId(prev => {
      if (prev && quizList.some(q => q.id === prev)) {
        return prev;
      }
      return quizList.length > 0 ? quizList[0].id : '';
    });
  }, []);

  useEffect(() => {
    loadData();

    const handleDataUpdate = () => {
      loadData();
    };

    window.addEventListener(DATA_CHANGE_EVENT, handleDataUpdate);
    window.addEventListener('storage', handleDataUpdate);

    return () => {
      window.removeEventListener(DATA_CHANGE_EVENT, handleDataUpdate);
      window.removeEventListener('storage', handleDataUpdate);
    };
  }, [loadData]);

  const handleLaunchStudentQuizFromAdmin = (quizId: string) => {
    setStudentInitialQuizId(quizId);
    setCurrentRole('student');
  };

  const handleSelectQuizForAnalytics = (quizId: string) => {
    setSelectedQuizId(quizId);
    setAdminTab('analytics');
  };

  const handleOpenShare = (quiz?: Quiz) => {
    const target = quiz || quizzes.find(q => q.id === selectedQuizId) || quizzes[0] || null;
    setQuizToShare(target);
    setIsShareModalOpen(true);
  };

  const handleImportComplete = (targetQuizId?: string) => {
    loadData();
    if (targetQuizId) {
      setSelectedQuizId(targetQuizId);
      setAdminTab('analytics');
    } else {
      setAdminTab('questions');
    }
  };

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const confirmResetFactory = () => {
    resetToFactoryData();
    loadData();
    setIsResetModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Header Navbar adhering to Top Bar Contract */}
      <Navbar
        currentRole={currentRole}
        onSwitchRole={setCurrentRole}
        adminTab={adminTab}
        onSelectAdminTab={setAdminTab}
        onOpenShareModal={() => handleOpenShare()}
        isStudentOnlyMode={isStudentOnlyMode}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentRole === 'admin' ? (
          <div>
            {adminTab === 'analytics' && (
              <AnalyticsView
                quizzes={quizzes}
                questions={questions}
                submissions={submissions}
                selectedQuizId={selectedQuizId}
                onSelectQuizId={setSelectedQuizId}
                onNavigateToImporter={() => setAdminTab('importer')}
              />
            )}

            {adminTab === 'importer' && (
              <BulkImporter
                quizzes={quizzes}
                onImportComplete={handleImportComplete}
              />
            )}

            {adminTab === 'questions' && (
              <QuestionBankView
                questions={questions}
                quizzes={quizzes}
                onNavigateToBulkImporter={() => setAdminTab('importer')}
              />
            )}

            {adminTab === 'quizzes' && (
              <QuizManagerView
                quizzes={quizzes}
                questions={questions}
                submissions={submissions}
                onSelectQuizForAnalytics={handleSelectQuizForAnalytics}
                onLaunchStudentQuiz={handleLaunchStudentQuizFromAdmin}
                onNavigateToBulkImporter={() => setAdminTab('importer')}
                onShareQuiz={handleOpenShare}
              />
            )}
          </div>
        ) : (
          <StudentPortal
            quizzes={quizzes}
            questions={questions}
            initialQuizId={studentInitialQuizId}
            onClearInitialQuizId={() => setStudentInitialQuizId(null)}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">QuizMaster Assessment & Diagnostics</span>
            <span aria-hidden="true">·</span>
            <span>Item Response Analysis & Time Tracking</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="text-slate-500 hover:text-slate-900 underline transition-colors"
            >
              Reset Sample Demo Data
            </button>
            <span>v1.0</span>
          </div>
        </div>
      </footer>

      {/* In-App Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-sm w-full p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Reset Demo Data?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              This will restore questions, quizzes, and initial sample student submissions to the factory default state.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsResetModalOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmResetFactory}
                className="px-4 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
              >
                Yes, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Direct Student Link Modal */}
      {isShareModalOpen && (
        <ShareQuizModal
          quiz={quizToShare || quizzes.find(q => q.id === selectedQuizId) || quizzes[0] || null}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
}
