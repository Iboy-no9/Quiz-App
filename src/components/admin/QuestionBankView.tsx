import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Edit, Trash2, CheckCircle2, HelpCircle, X } from 'lucide-react';
import { Question, QuestionOption, Difficulty, Quiz } from '../../types/quiz';
import { saveQuestions, updateQuestion, deleteQuestion, addQuestions } from '../../services/storageService';

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
  const [formCategory, setFormCategory] = useState('Computer Science');
  const [formDifficulty, setFormDifficulty] = useState<Difficulty>('medium');
  const [formExplanation, setFormExplanation] = useState('');
  const [formOptions, setFormOptions] = useState<QuestionOption[]>([
    { id: 'A', text: '' },
    { id: 'B', text: '' },
    { id: 'C', text: '' },
    { id: 'D', text: '' },
  ]);
  const [formCorrectId, setFormCorrectId] = useState('A');

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
      addQuestions([newQuestion]);
    }

    setIsModalOpen(false);
  };

  const confirmDeleteQuestion = () => {
    if (questionToDelete) {
      deleteQuestion(questionToDelete.id);
      setQuestionToDelete(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Question Bank</h1>
          <p className="text-xs text-slate-500 mt-1">
            Master repository of all {questions.length} assessment items available for tests and diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToBulkImporter}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
          >
            Bulk Import (CSV/Text)
          </button>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Create Single Question</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
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

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="filter-category" className="sr-only">Filter by Category</label>
          <select
            id="filter-category"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-700"
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
            className="text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 text-slate-700"
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
