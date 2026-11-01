import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Users,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  RefreshCw,
  PlusCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Trash2,
} from 'lucide-react';
import { Quiz, Question, StudentSubmission, QuizAnalyticsSummary, QuestionDiagnostic } from '../../types/quiz';
import {
  computeQuizAnalytics,
  simulateClassSubmissions,
  exportSubmissionsToCSV,
  exportQuestionDiagnosticsToCSV,
  formatTimeSeconds,
  clearSubmissionsForQuiz,
} from '../../services/storageService';
import { SubmissionDetailModal } from './SubmissionDetailModal';

interface AnalyticsViewProps {
  quizzes: Quiz[];
  questions: Question[];
  submissions: StudentSubmission[];
  selectedQuizId: string;
  onSelectQuizId: (quizId: string) => void;
  onNavigateToImporter: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  quizzes,
  questions,
  submissions,
  selectedQuizId,
  onSelectQuizId,
  onNavigateToImporter,
}) => {
  const [searchStudent, setSearchStudent] = useState('');
  const [filterResult, setFilterResult] = useState<'all' | 'passed' | 'failed'>('all');
  const [selectedSubmissionForModal, setSelectedSubmissionForModal] = useState<StudentSubmission | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Compute analytics for the selected quiz
  const analytics: QuizAnalyticsSummary | null = useMemo(() => {
    return computeQuizAnalytics(selectedQuizId);
  }, [selectedQuizId, quizzes, questions, submissions]);

  const currentQuiz = quizzes.find(q => q.id === selectedQuizId);

  // Filter student submissions for table
  const filteredSubmissions = useMemo(() => {
    return submissions
      .filter(s => s.quizId === selectedQuizId)
      .filter(s => {
        if (!searchStudent) return true;
        const q = searchStudent.toLowerCase();
        return (
          s.studentName.toLowerCase().includes(q) ||
          (s.studentRegNo && s.studentRegNo.toLowerCase().includes(q)) ||
          (s.studentEmailOrId && s.studentEmailOrId.toLowerCase().includes(q))
        );
      })
      .filter(s => {
        if (filterResult === 'passed') return s.passed;
        if (filterResult === 'failed') return !s.passed;
        return true;
      });
  }, [submissions, selectedQuizId, searchStudent, filterResult]);

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleSimulate = () => {
    simulateClassSubmissions(selectedQuizId, 8);
  };

  const handleClearSubmissions = () => {
    setIsClearModalOpen(true);
  };

  const confirmClearSubmissions = () => {
    clearSubmissionsForQuiz(selectedQuizId);
    setIsClearModalOpen(false);
  };

  const handleExportResults = () => {
    const quizSubs = submissions.filter(s => s.quizId === selectedQuizId);
    exportSubmissionsToCSV(quizSubs, currentQuiz?.title || 'Quiz');
  };

  const handleExportDiagnostics = () => {
    if (analytics) {
      exportQuestionDiagnosticsToCSV(analytics.questionDiagnostics, currentQuiz?.title || 'Quiz');
    }
  };

  if (quizzes.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-1">No Quizzes Created Yet</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            Import your questions in bulk or build your first quiz to begin tracking student performance and missed questions.
          </p>
          <button
            onClick={onNavigateToImporter}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Bulk Add Questions</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
      {/* Top Toolbar: Quiz Selection & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Assessment Analytics</span>
            <span aria-hidden="true">·</span>
            <span>Diagnostic Breakdown</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <label htmlFor="quiz-select" className="sr-only">Select Quiz</label>
            <select
              id="quiz-select"
              value={selectedQuizId}
              onChange={e => onSelectQuizId(e.target.value)}
              className="text-lg sm:text-xl font-bold text-slate-900 bg-transparent border-0 border-b-2 border-slate-900 focus:ring-0 focus:border-slate-900 pr-8 py-0.5 cursor-pointer max-w-full truncate"
            >
              {quizzes.map(q => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
            {currentQuiz && (
              <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                Code: {currentQuiz.accessCode}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={handleSimulate}
            className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap min-h-[36px]"
            title="Generate 8 realistic student test submissions with various scores and times"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Simulate 8 Students</span>
          </button>

          <button
            onClick={handleExportResults}
            disabled={!analytics || analytics.totalSubmissions === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-h-[36px]"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleExportDiagnostics}
            disabled={!analytics || analytics.questionDiagnostics.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 sm:py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap min-h-[36px]"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span>Diagnostics CSV</span>
          </button>

          {analytics && analytics.totalSubmissions > 0 && (
            <button
              onClick={handleClearSubmissions}
              className="px-2.5 py-2 sm:py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors whitespace-nowrap min-h-[36px]"
            >
              Clear Records
            </button>
          )}
        </div>
      </div>

      {/* KPI Overview Cards Strip (Tabular Figures) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Submissions */}
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Submissions</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {analytics?.totalSubmissions || 0}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {currentQuiz?.questionIds.length || 0} Questions in Quiz
          </p>
        </div>

        {/* Correct vs Wrong Answers Count */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Correct vs Wrong</span>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums flex items-baseline gap-2">
            <span className="text-emerald-600">{analytics?.totalCorrectAnswers || 0}</span>
            <span className="text-slate-300">/</span>
            <span className="text-rose-600">{analytics?.totalIncorrectAnswers || 0}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Overall accuracy: {
              analytics && (analytics.totalCorrectAnswers + analytics.totalIncorrectAnswers > 0)
                ? Math.round(
                    (analytics.totalCorrectAnswers / (analytics.totalCorrectAnswers + analytics.totalIncorrectAnswers)) * 100
                  )
                : 0
            }%
          </p>
        </div>

        {/* Class Average Score & Pass Rate */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Pass Rate & Avg</span>
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {analytics?.passRatePercent || 0}%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Avg Score: <span className="font-semibold text-slate-700">{analytics?.avgScorePercent || 0}%</span> (Cutoff: {currentQuiz?.passingScorePercent || 70}%)
          </p>
        </div>

        {/* How Much Time Took */}
        <div className="p-5 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Time Spent</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {formatTimeSeconds(analytics?.avgCompletionTimeSeconds || 0)}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Fastest: {formatTimeSeconds(analytics?.fastestTimeSeconds || 0)} · Slowest: {formatTimeSeconds(analytics?.slowestTimeSeconds || 0)}
          </p>
        </div>
      </div>

      {/* SECTION 1: "Which questions were most frequently missed" Spotlight */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">
                Frequently Missed Questions & Distractor Analysis
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Rank-ordered by miss rate to pinpoint conceptual stumbling blocks and distractor traps.
            </p>
          </div>
          <span className="text-xs text-slate-500">
            {analytics?.mostMissedQuestions.length || 0} questions evaluated
          </span>
        </div>

        {(!analytics || analytics.totalSubmissions === 0) ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            <p className="font-medium text-slate-700 mb-1">No test submissions yet for this quiz.</p>
            <p className="text-xs text-slate-400 mb-4">
              Click &quot;Simulate 8 Students&quot; above to see instant diagnostic analytics and distractor distributions.
            </p>
            <button
              onClick={handleSimulate}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate Test Class Submissions</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {analytics.mostMissedQuestions.map((diag, index) => {
              const isExpanded = expandedQuestionId === diag.questionId;
              const isHighMiss = diag.missRate >= 50;

              return (
                <div key={diag.questionId} className="p-5 hover:bg-slate-50/50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Left: Question text & metadata */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          #{index + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {diag.category}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className={`text-xs capitalize font-medium ${
                          diag.difficulty === 'hard'
                            ? 'text-rose-600'
                            : diag.difficulty === 'medium'
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}>
                          {diag.difficulty}
                        </span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          avg {diag.avgTimeSpentSeconds}s
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-slate-900">
                        {diag.questionText}
                      </h3>

                      {diag.explanation && (
                        <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                          <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <span>
                            <strong className="text-slate-700">Key: </strong>
                            {diag.explanation}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Right: Miss Rate Metric & Ratio */}
                    <div className="flex items-center lg:flex-col lg:items-end justify-between gap-2 shrink-0">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className={`text-base font-bold tabular-nums ${
                            isHighMiss ? 'text-rose-600' : 'text-slate-800'
                          }`}>
                            {diag.missRate}% Missed
                          </span>
                          <span className="text-xs text-slate-400">
                            ({diag.incorrectCount} of {diag.totalAttempts} wrong)
                          </span>
                        </div>
                        <div className="w-36 h-2 bg-slate-100 rounded-full overflow-hidden mt-1 flex">
                          <div
                            className="bg-emerald-500 h-full transition-all"
                            style={{ width: `${diag.accuracyRate}%` }}
                            title={`Accuracy: ${diag.accuracyRate}%`}
                          />
                          <div
                            className="bg-rose-500 h-full transition-all"
                            style={{ width: `${diag.missRate}%` }}
                            title={`Miss Rate: ${diag.missRate}%`}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedQuestionId(isExpanded ? null : diag.questionId)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 mt-1 transition-colors"
                      >
                        <span>{isExpanded ? 'Hide Distractors' : 'Inspect Distractors'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Distractor Breakdown (Visual Bar Distribution) */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-5">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Student Choice Breakdown (Distractor Traps)
                      </h4>
                      <div className="space-y-2">
                        {diag.distractors.map(dist => (
                          <div key={dist.optionId} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2 truncate pr-2">
                                <span className={`font-mono font-bold w-4 ${
                                  dist.isCorrect ? 'text-emerald-700' : 'text-slate-600'
                                }`}>
                                  {dist.optionId}.
                                </span>
                                <span className={`truncate ${dist.isCorrect ? 'font-semibold text-emerald-900' : 'text-slate-700'}`}>
                                  {dist.optionText}
                                </span>
                                {dist.isCorrect && (
                                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded uppercase">
                                    Correct Answer
                                  </span>
                                )}
                              </div>
                              <span className="font-mono text-xs text-slate-600 tabular-nums shrink-0">
                                {dist.percentage}% ({dist.count} students)
                              </span>
                            </div>
                            {/* Horizontal distribution bar */}
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  dist.isCorrect
                                    ? 'bg-emerald-600'
                                    : dist.percentage > 30
                                    ? 'bg-rose-500' // highlights heavy misconception distractor
                                    : 'bg-slate-400'
                                }`}
                                style={{ width: `${dist.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 2: Comprehensive Question Matrix (Time Taken & Difficulty) */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">
            Full Question Performance & Time Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Detailed breakdown of correct/wrong counts, miss rates, and student dwell time for every question.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-medium">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Question Prompt</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Key</th>
                <th className="py-3 px-4 text-center">Attempts</th>
                <th className="py-3 px-4 text-center">Right / Wrong</th>
                <th className="py-3 px-4 text-center">Miss Rate</th>
                <th className="py-3 px-4 text-right">Avg Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {analytics?.questionDiagnostics.map((qd, idx) => (
                <tr key={qd.questionId} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 max-w-md">
                    <p className="line-clamp-2">{qd.questionText}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {qd.category}
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-emerald-700">
                    {qd.correctOptionId}
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-700">
                    {qd.totalAttempts}
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums whitespace-nowrap">
                    <span className="text-emerald-600 font-semibold">{qd.correctCount}</span>
                    <span className="text-slate-400"> / </span>
                    <span className="text-rose-600 font-semibold">{qd.incorrectCount}</span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums">
                    <span className={`font-semibold ${qd.missRate >= 50 ? 'text-rose-600' : 'text-slate-700'}`}>
                      {qd.missRate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700 whitespace-nowrap">
                    {qd.avgTimeSpentSeconds}s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Student Submissions Registry Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Individual Student Results Log
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every completed examination attempt with exact score, completion time, and item audit sheet.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
            <div className="relative w-full sm:w-52">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student..."
                value={searchStudent}
                onChange={e => setSearchStudent(e.target.value)}
                className="w-full pl-8 pr-3 py-2 sm:py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs overflow-x-auto justify-between sm:justify-start">
              <button
                onClick={() => setFilterResult('all')}
                className={`flex-1 sm:flex-initial px-2.5 py-1 rounded font-medium transition-colors text-center ${
                  filterResult === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({submissions.filter(s => s.quizId === selectedQuizId).length})
              </button>
              <button
                onClick={() => setFilterResult('passed')}
                className={`flex-1 sm:flex-initial px-2.5 py-1 rounded font-medium transition-colors text-center ${
                  filterResult === 'passed' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Passed
              </button>
              <button
                onClick={() => setFilterResult('failed')}
                className={`flex-1 sm:flex-initial px-2.5 py-1 rounded font-medium transition-colors text-center ${
                  filterResult === 'failed' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Failed
              </button>
            </div>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No student results match the filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-medium">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4 font-mono">Reg No</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Correct / Wrong</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Time Spent</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSubmissions.map(sub => (
                  <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {sub.studentName}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {sub.studentRegNo || sub.studentEmailOrId}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 tabular-nums">
                      {sub.scorePercent}%
                    </td>
                    <td className="py-3 px-4 text-center font-mono tabular-nums whitespace-nowrap">
                      <span className="text-emerald-600 font-medium">{sub.correctCount} Correct</span>
                      <span className="text-slate-400"> / </span>
                      <span className="text-rose-600 font-medium">{sub.incorrectCount} Wrong</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                        sub.passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {sub.passed ? 'Pass' : 'Fail'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono tabular-nums text-slate-700">
                      {formatTimeSeconds(sub.totalTimeSpentSeconds)}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(sub.submittedAt).toLocaleDateString()} {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedSubmissionForModal(sub)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors whitespace-nowrap"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Attempt Detail Modal */}
      <SubmissionDetailModal
        submission={selectedSubmissionForModal}
        questions={questions}
        onClose={() => setSelectedSubmissionForModal(null)}
      />

      {/* Clear Submissions In-App Confirmation Modal */}
      {isClearModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <Trash2 className="w-4 h-4 text-rose-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Clear All Results?</h3>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to clear all student submission records for this quiz? This cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsClearModalOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmClearSubmissions}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
              >
                Yes, Clear Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
