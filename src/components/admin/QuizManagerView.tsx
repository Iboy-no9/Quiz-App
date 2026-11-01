import React, { useState } from 'react';
import {
  Plus,
  Clock,
  Award,
  Users,
  Copy,
  Check,
  Play,
  BarChart2,
  Trash2,
  Edit3,
  X,
  FileQuestion,
  Share2,
} from 'lucide-react';
import { Quiz, Question, StudentSubmission } from '../../types/quiz';
import { saveQuiz, deleteQuiz } from '../../services/storageService';

interface QuizManagerViewProps {
  quizzes: Quiz[];
  questions: Question[];
  submissions: StudentSubmission[];
  onSelectQuizForAnalytics: (quizId: string) => void;
  onLaunchStudentQuiz: (quizId: string) => void;
  onNavigateToBulkImporter: () => void;
  onShareQuiz?: (quiz: Quiz) => void;
}

export const QuizManagerView: React.FC<QuizManagerViewProps> = ({
  quizzes,
  questions,
  submissions,
  onSelectQuizForAnalytics,
  onLaunchStudentQuiz,
  onNavigateToBulkImporter,
  onShareQuiz,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('General');
  const [formAccessCode, setFormAccessCode] = useState('');
  const [formTimeMinutes, setFormTimeMinutes] = useState(10);
  const [formPassingPercent, setFormPassingPercent] = useState(70);
  const [formSelectedQuestionIds, setFormSelectedQuestionIds] = useState<string[]>([]);
  const [questionSearch, setQuestionSearch] = useState('');
  const [formError, setFormError] = useState('');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const openCreateModal = () => {
    setEditingQuiz(null);
    setFormError('');
    setFormTitle('All Questions Assessment');
    setFormDesc('Comprehensive examination covering all topics in the assessment repository.');
    setFormCategory('General');
    setFormAccessCode(`QUIZ-${Math.floor(100 + Math.random() * 900)}`);
    setFormTimeMinutes(15);
    setFormPassingPercent(70);
    setFormSelectedQuestionIds(questions.map(q => q.id));
    setIsModalOpen(true);
  };

  const openEditModal = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setFormError('');
    setFormTitle(quiz.title);
    setFormDesc(quiz.description);
    setFormCategory(quiz.category);
    setFormAccessCode(quiz.accessCode);
    setFormTimeMinutes(quiz.timeLimitMinutes || 0);
    setFormPassingPercent(quiz.passingScorePercent);
    setFormSelectedQuestionIds(quiz.questionIds);
    setIsModalOpen(true);
  };

  const handleToggleQuestionSelect = (qId: string) => {
    setFormSelectedQuestionIds(prev =>
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleSelectAllFilteredQuestions = (filtered: Question[]) => {
    const ids = filtered.map(q => q.id);
    const allSelected = ids.every(id => formSelectedQuestionIds.includes(id));
    if (allSelected) {
      setFormSelectedQuestionIds(prev => prev.filter(id => !ids.includes(id)));
    } else {
      setFormSelectedQuestionIds(prev => Array.from(new Set([...prev, ...ids])));
    }
  };

  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formTitle.trim()) {
      setFormError('Please enter a quiz title.');
      return;
    }
    if (formSelectedQuestionIds.length === 0) {
      setFormError('Please select at least 1 question for the quiz.');
      return;
    }

    const quizObj: Quiz = {
      id: editingQuiz ? editingQuiz.id : `quiz-${Date.now()}`,
      title: formTitle.trim(),
      description: formDesc.trim(),
      category: formCategory.trim() || 'General',
      accessCode: formAccessCode.trim().toUpperCase() || `QUIZ-${Math.floor(100 + Math.random() * 900)}`,
      questionIds: formSelectedQuestionIds,
      timeLimitMinutes: formTimeMinutes > 0 ? formTimeMinutes : undefined,
      passingScorePercent: formPassingPercent,
      shuffleQuestions: false,
      shuffleOptions: false,
      allowReview: true,
      status: 'active',
      createdAt: editingQuiz ? editingQuiz.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveQuiz(quizObj);
    setIsModalOpen(false);
  };

  const [quizToDelete, setQuizToDelete] = useState<Quiz | null>(null);

  const handleDelete = (quiz: Quiz) => {
    setQuizToDelete(quiz);
  };

  const confirmDeleteQuiz = () => {
    if (quizToDelete) {
      deleteQuiz(quizToDelete.id);
      setQuizToDelete(null);
    }
  };

  const filteredModalQuestions = questions.filter(q =>
    q.text.toLowerCase().includes(questionSearch.toLowerCase()) ||
    q.category.toLowerCase().includes(questionSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Quizzes & Assessment Tests</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure examination papers, assign time limits, set passing bars, and share test access codes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={() => {
              // Ensure an all-questions quiz exists and launch it
              const allQuiz = quizzes.find(q => q.id === 'quiz-all-questions');
              if (allQuiz) {
                onLaunchStudentQuiz(allQuiz.id);
              } else if (quizzes.length > 0) {
                onLaunchStudentQuiz(quizzes[0].id);
              }
            }}
            className="px-3 py-2 sm:py-1.5 text-xs font-bold text-slate-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shadow-xs flex items-center justify-center gap-1.5 min-h-[36px]"
          >
            <Play className="w-3.5 h-3.5 text-slate-800 fill-current shrink-0" />
            <span>Test Run All ({questions.length})</span>
          </button>
          <button
            onClick={onNavigateToBulkImporter}
            className="px-3 py-2 sm:py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap text-center min-h-[36px]"
          >
            Bulk Import Questions
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap min-h-[36px]"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Create New Quiz</span>
          </button>
        </div>
      </div>

      {/* Featured All-Questions Banner */}
      <div className="p-4 sm:p-5 rounded-xl border border-slate-900 bg-slate-900 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Comprehensive Assessment
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-xs text-slate-300">All Question Bank Items</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white">
            Full Paper Test Runner (All {questions.length} Questions)
          </h2>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            Students can enter their Student Name and Registration Number (Reg No) and complete all examination questions on a single page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto">
          <button
            onClick={() => {
              const allQuiz = quizzes.find(q => q.id === 'quiz-all-questions') || quizzes[0];
              if (allQuiz && onShareQuiz) {
                onShareQuiz(allQuiz);
              }
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:text-emerald-200 bg-slate-800 hover:bg-slate-700 border border-emerald-500/30 rounded-lg transition-colors min-h-[38px]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </button>
          <button
            onClick={() => {
              const allQuiz = quizzes.find(q => q.id === 'quiz-all-questions') || quizzes[0];
              if (allQuiz) {
                onSelectQuizForAnalytics(allQuiz.id);
              }
            }}
            className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors min-h-[38px]"
          >
            View All Results
          </button>
          <button
            onClick={() => {
              const allQuiz = quizzes.find(q => q.id === 'quiz-all-questions') || quizzes[0];
              if (allQuiz) {
                onLaunchStudentQuiz(allQuiz.id);
              }
            }}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors shadow-xs min-h-[38px]"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Test Run All Questions</span>
          </button>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {quizzes.map(quiz => {
          const subCount = submissions.filter(s => s.quizId === quiz.id).length;

          return (
            <div
              key={quiz.id}
              className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {quiz.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(quiz)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                      title="Edit Quiz"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(quiz)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete Quiz"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                  {quiz.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                  {quiz.description || 'No description provided.'}
                </p>

                {/* Metadata strip */}
                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <FileQuestion className="w-3.5 h-3.5" /> Questions
                    </span>
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {quiz.questionIds.length} items
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5" /> Time Allowed
                    </span>
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {quiz.timeLimitMinutes ? `${quiz.timeLimitMinutes} minutes` : 'Untimed'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Award className="w-3.5 h-3.5" /> Passing Cutoff
                    </span>
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {quiz.passingScorePercent}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <Users className="w-3.5 h-3.5" /> Submissions
                    </span>
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {subCount} completed
                    </span>
                  </div>
                </div>

                {/* Access Code Box */}
                <div className="mt-4 p-2.5 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-200">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                      Student Access Code
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-900 tracking-wider">
                      {quiz.accessCode}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(quiz.accessCode)}
                    className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors"
                    title="Copy access code"
                  >
                    {copiedCode === quiz.accessCode ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-3 gap-2 mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onShareQuiz?.(quiz)}
                  className="inline-flex items-center justify-center gap-1.5 px-2 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                  title="Send direct student link"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => onSelectQuizForAnalytics(quiz.id)}
                  className="inline-flex items-center justify-center gap-1 px-2 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Results</span>
                </button>
                <button
                  onClick={() => onLaunchStudentQuiz(quiz.id)}
                  className="inline-flex items-center justify-center gap-1 px-2 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Test</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create / Edit Quiz Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                {editingQuiz ? 'Edit Quiz Configuration' : 'Create New Assessment'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuiz} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chapter 4 Diagnostic Examination"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Category / Subject
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Student Access Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formAccessCode}
                    onChange={e => setFormAccessCode(e.target.value.toUpperCase())}
                    className="w-full text-xs font-mono font-bold p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 uppercase"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Time Limit (Minutes, 0 for untimed)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={180}
                    value={formTimeMinutes}
                    onChange={e => setFormTimeMinutes(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Passing Cutoff Score (%)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={formPassingPercent}
                    onChange={e => setFormPassingPercent(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Description & Instructions for Students
                  </label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={e => setFormDesc(e.target.value)}
                    placeholder="Instructions regarding permitted references, duration, and topics covered..."
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Select Questions from Bank */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Select Questions ({formSelectedQuestionIds.length} of {questions.length} Selected)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormSelectedQuestionIds(questions.map(q => q.id))}
                      className="text-xs text-slate-900 hover:text-slate-700 font-bold underline"
                    >
                      Select All ({questions.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormSelectedQuestionIds([])}
                      className="text-xs text-slate-500 hover:text-slate-700 underline"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Filter questions by keyword or topic..."
                  value={questionSearch}
                  onChange={e => setQuestionSearch(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg mb-2"
                />

                <div className="max-h-60 overflow-y-auto space-y-1.5 border border-slate-200 rounded-lg p-2 bg-slate-50/50">
                  {filteredModalQuestions.length === 0 ? (
                    <p className="text-xs text-slate-400 p-4 text-center">
                      No questions found. Add questions via Bulk Importer first.
                    </p>
                  ) : (
                    filteredModalQuestions.map(q => {
                      const isSelected = formSelectedQuestionIds.includes(q.id);
                      return (
                        <div
                          key={q.id}
                          onClick={() => handleToggleQuestionSelect(q.id)}
                          className={`p-2.5 rounded-md border text-xs cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                            isSelected
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // handled by parent onClick
                              className="rounded text-slate-900 focus:ring-0"
                            />
                            <span className="truncate">{q.text}</span>
                          </div>
                          <span className={`text-[10px] font-mono shrink-0 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                            {q.category} · {q.difficulty}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                  {formError}
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  {editingQuiz ? 'Update Quiz' : 'Publish Quiz'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Quiz In-App Confirmation Modal */}
      {quizToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Delete Assessment?</h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-slate-900">&quot;{quizToDelete.title}&quot;</strong>? This will permanently remove this assessment from the list.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setQuizToDelete(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteQuiz}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
              >
                Yes, Delete Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
