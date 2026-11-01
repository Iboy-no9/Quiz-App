import React, { useState, useMemo, useRef } from 'react';
import { Plus, Search, Filter, Edit, Trash2, CheckCircle2, HelpCircle, X, Save, Download, Upload, Check, RefreshCw } from 'lucide-react';
import { Question, QuestionOption, Difficulty, Quiz } from '../../types/quiz';
import {
  saveQuestions,
  updateQuestion,
  deleteQuestion,
  addQuestions,
  saveQuiz,
  persistAllToCodebase,
  downloadAssessmentBackup,
  importAssessmentBackup,
} from '../../services/storageService';

interface QuestionBankViewProps {
  questions: Question[];
  quizzes: Quiz[];
  onNavigateToBulkImporter: () => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  questions,
  quizzes,
  onNavigateToBulkImporter,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Single question modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // Form states
  const [formText, setFormText] = useState('');
  const [formCategory, setFormCategory] = useState('General');
  const [formDifficulty, setFormDifficulty] = useState<Difficulty>('medium');
  const [formExplanation, setFormExplanation] = useState('');
  const [formTargetQuizId, setFormTargetQuizId] = useState<string>(quizzes[0]?.id || '');
  const [formOptions, setFormOptions] = useState<QuestionOption[]>([
    { id: 'A', text: '' },
    { id: 'B', text: '' },
    { id: 'C', text: '' },
    { id: 'D', text: '' },
  ]);
  const [formCorrectId, setFormCorrectId] = useState('A');

  // Persistence & notification states
  const [isSavingToCode, setIsSavingToCode] = useState(false);
  const [saveBanner, setSaveBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const backupFileInputRef = useRef<HTMLInputElement>(null);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(questions.map(q => q.category));
    return Array.from(set);
  }, [questions]);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (search && !q.text.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [questions, search, selectedCategory, selectedDifficulty]);

  const openAddModal = () => {
    setEditingQuestion(null);
    setFormText('');
    setFormCategory('General');
    setFormDifficulty('medium');
    setFormExplanation('');
    setFormTargetQuizId(quizzes[0]?.id || '');
    setFormOptions([
      { id: 'A', text: '' },
      { id: 'B', text: '' },
      { id: 'C', text: '' },
      { id: 'D', text: '' },
    ]);
    setFormCorrectId('A');
    setIsModalOpen(true);
  };

  const openEditModal = (q: Question) => {
    setEditingQuestion(q);
    setFormText(q.text);
    setFormCategory(q.category);
    setFormDifficulty(q.difficulty);
    setFormExplanation(q.explanation || '');
    const foundQuiz = quizzes.find(qz => qz.questionIds.includes(q.id));
    setFormTargetQuizId(foundQuiz?.id || '');
    setFormOptions(q.options.length >= 2 ? q.options : [
      { id: 'A', text: '' },
      { id: 'B', text: '' },
    ]);
    setFormCorrectId(q.correctOptionId);
    setIsModalOpen(true);
  };

  const [formError, setFormError] = useState('');
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!formText.trim()) return;
    const validOptions = formOptions.filter(o => o.text.trim().length > 0);
    if (validOptions.length < 2) {
      setFormError('Please provide at least 2 non-empty options.');
      return;
    }

    if (editingQuestion) {
      updateQuestion({
        ...editingQuestion,
        text: formText.trim(),
        category: formCategory.trim() || 'General',
        difficulty: formDifficulty,
        explanation: formExplanation.trim() || undefined,
        options: validOptions,
        correctOptionId: formCorrectId,
      });

      if (formTargetQuizId) {
        const targetQz = quizzes.find(q => q.id === formTargetQuizId);
        if (targetQz && !targetQz.questionIds.includes(editingQuestion.id)) {
          saveQuiz({ ...targetQz, questionIds: [...targetQz.questionIds, editingQuestion.id] });
        }
      }
    } else {
      const newQuestion: Question = {
        id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        text: formText.trim(),
        category: formCategory.trim() || 'General',
        difficulty: formDifficulty,
        explanation: formExplanation.trim() || undefined,
        options: validOptions,
        correctOptionId: formCorrectId,
        points: 1,
        createdAt: new Date().toISOString(),
      };
      addQuestions([newQuestion], formTargetQuizId || undefined);
    }

    setIsModalOpen(false);
  };

  const confirmDeleteQuestion = () => {
    if (questionToDelete) {
      deleteQuestion(questionToDelete.id);
      setQuestionToDelete(null);
    }
  };

  const handleManualPersist = async () => {
    setIsSavingToCode(true);
    setSaveBanner(null);
    try {
      const result = await persistAllToCodebase();
      setSaveBanner({
        type: 'success',
        message: `${result.message} (${questions.length} questions now saved permanently in Git)`,
      });
      setTimeout(() => setSaveBanner(null), 6000);
    } catch (err: any) {
      setSaveBanner({
        type: 'error',
        message: 'Could not write to codebase file: ' + (err?.message || 'Server offline'),
      });
    } finally {
      setIsSavingToCode(false);
    }
  };

  const handleImportBackupFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      const res = importAssessmentBackup(text);
      if (res.success) {
        setSaveBanner({
          type: 'success',
          message: `Successfully imported backup with ${res.count} questions. Saved to Git codebase!`,
        });
        setTimeout(() => setSaveBanner(null), 5000);
      } else {
        setSaveBanner({
          type: 'error',
          message: `Failed to restore backup: ${res.error}`,
        });
      }
    };
    reader.readAsText(file);
    if (backupFileInputRef.current) {
      backupFileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6">
      {/* Permanent Save Notification Banner */}
      {saveBanner && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-medium flex items-center justify-between gap-3 ${
            saveBanner.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {saveBanner.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <X className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{saveBanner.message}</span>
          </div>
          <button
            onClick={() => setSaveBanner(null)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Question Bank</h1>
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {questions.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Questions are synchronized directly to your Git repository (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">src/data/initialData.ts</code>) so changes never disappear on git diff or deployment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Save to Codebase / Git button */}
          <button
            onClick={handleManualPersist}
            disabled={isSavingToCode}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            title="Permanently write questions to src/data/initialData.ts for Git commits and Vercel"
          >
            {isSavingToCode ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 text-emerald-700" />
            )}
            <span>{isSavingToCode ? 'Saving to Git...' : 'Save to Git Codebase'}</span>
          </button>

          {/* Backup Download */}
          <button
            onClick={downloadAssessmentBackup}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
            title="Download questions as JSON backup"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export JSON</span>
          </button>

          {/* Backup Upload (Hidden input) */}
          <input
            type="file"
            ref={backupFileInputRef}
            onChange={handleImportBackupFile}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={() => backupFileInputRef.current?.click()}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
            title="Restore questions from JSON backup"
          >
            <Upload className="w-3.5 h-3.5 text-slate-600" />
            <span>Import JSON</span>
          </button>

          <button
            onClick={onNavigateToBulkImporter}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap text-center"
          >
            Bulk Import (CSV/Text)
          </button>
          
          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Create Single Question</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions by keyword..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <label htmlFor="filter-category" className="sr-only">Filter by Category</label>
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto text-xs px-2.5 sm:px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-700"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label htmlFor="filter-difficulty" className="sr-only">Filter by Difficulty</label>
          <select
            id="filter-difficulty"
            value={selectedDifficulty}
            onChange={e => setSelectedDifficulty(e.target.value)}
            className="w-full sm:w-auto text-xs px-2.5 sm:px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-700"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 text-slate-400 text-sm">
            No questions found matching your search.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const usedInQuizzes = quizzes.filter(quiz => quiz.questionIds.includes(q.id));

            return (
              <div
                key={q.id}
                className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-bold text-slate-400">#{idx + 1}</span>
                      <span>{q.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className={`capitalize font-medium ${
                        q.difficulty === 'hard'
                          ? 'text-rose-600'
                          : q.difficulty === 'medium'
                          ? 'text-amber-600'
                          : 'text-emerald-600'
                      }`}>
                        {q.difficulty}
                      </span>
                      {usedInQuizzes.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500 font-mono">
                            Used in {usedInQuizzes.length} {usedInQuizzes.length === 1 ? 'Quiz' : 'Quizzes'}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900 leading-relaxed">
                      {q.text}
                    </h3>

                    {q.explanation && (
                      <p className="text-xs text-slate-500 flex items-start gap-1 pt-1">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                        <span>
                          <strong className="text-slate-700">Explanation: </strong>
                          {q.explanation}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0">
                    <button
                      onClick={() => openEditModal(q)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                      title="Edit question"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setQuestionToDelete(q)}
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      title="Delete question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Options List */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                  {q.options.map(opt => {
                    const isCorrect = opt.id === q.correctOptionId;
                    return (
                      <div
                        key={opt.id}
                        className={`px-3 py-2 rounded-lg border text-xs flex items-center justify-between ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 font-medium'
                            : 'bg-slate-50/60 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="font-mono font-bold w-4">{opt.id}.</span>
                          <span className="truncate">{opt.text}</span>
                        </div>
                        {isCorrect && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded uppercase shrink-0">
                            Correct Key
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Single Question Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                {editingQuestion ? 'Edit Question' : 'Create Single Question'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Question Prompt
                </label>
                <textarea
                  rows={3}
                  required
                  value={formText}
                  onChange={e => setFormText(e.target.value)}
                  placeholder="e.g. Which of the following is a prime number?"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Category
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
                    Difficulty
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={e => setFormDifficulty(e.target.value as Difficulty)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              {/* Assessment Attachment */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Assign to Assessment (Immediately available for students)
                </label>
                <select
                  value={formTargetQuizId}
                  onChange={e => setFormTargetQuizId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-800"
                >
                  <option value="">Master Question Bank only</option>
                  {quizzes.map(qz => (
                    <option key={qz.id} value={qz.id}>
                      {qz.title} (Code: {qz.accessCode})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Selecting an assessment ensures this question is immediately part of the test and appears in the student portal.
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Options & Correct Answer Key
                </label>
                {formOptions.map((opt, oIdx) => (
                  <div key={opt.id} className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 shrink-0 cursor-pointer">
                      <input
                        type="radio"
                        name="correct-opt"
                        checked={formCorrectId === opt.id}
                        onChange={() => setFormCorrectId(opt.id)}
                        className="text-slate-900 focus:ring-slate-900"
                      />
                      <span className="font-mono text-xs font-bold w-4 text-slate-700">{opt.id}.</span>
                    </label>
                    <input
                      type="text"
                      value={opt.text}
                      onChange={e => {
                        const updated = [...formOptions];
                        updated[oIdx].text = e.target.value;
                        setFormOptions(updated);
                      }}
                      placeholder={`Option ${opt.id} text...`}
                      className="flex-1 text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Explanation / Rational (shown to students in review and analytics)
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={e => setFormExplanation(e.target.value)}
                  placeholder="Explain why the correct answer is correct..."
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {formError && (
                <p className="text-xs font-semibold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  {formError}
                </p>
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
                  {editingQuestion ? 'Update Question' : 'Save Question'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Question In-App Confirmation Modal */}
      {questionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Delete Question?</h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete this question? It will be removed from the master bank.
            </p>
            <p className="text-xs font-medium text-slate-800 line-clamp-2 bg-slate-50 p-2 rounded border border-slate-200">
              {questionToDelete.text}
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setQuestionToDelete(null)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteQuestion}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
