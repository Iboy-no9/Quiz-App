import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Upload,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Trash2,
  Download,
  ArrowRight,
  PlusCircle,
  Check,
  Sparkles,
} from 'lucide-react';
import { Question, Quiz } from '../../types/quiz';
import { parsePlainTextQuestions, parseCSVQuestions, parseJSONQuestions, BulkParseOutput } from '../../services/bulkParser';
import { addQuestions, saveQuiz } from '../../services/storageService';

interface BulkImporterProps {
  quizzes: Quiz[];
  onImportComplete: (targetQuizId?: string) => void;
}

const SAMPLE_TEXT_TEMPLATE = `Q: What is the primary function of the CPU's Arithmetic Logic Unit (ALU)?
A) Storing long-term file records
B) Performing mathematical calculations and logical comparisons*
C) Managing network packet routing
D) Generating display graphics
Explanation: The ALU executes all mathematical operations (addition, subtraction) and logical decisions within the central processor.
Category: Computer Science
Difficulty: easy

Q: Which planet in our solar system has the highest surface temperature?
A) Mercury
B) Venus*
C) Mars
D) Jupiter
Explanation: Venus has an extreme greenhouse atmosphere of CO2, making it hotter than Mercury.
Category: Science
Difficulty: medium

Q: What does SQL stand for?
A) Structured Query Language*
B) Standard Question Lexicon
C) Simple Query Logic
D) Sequential Query List
Explanation: SQL is the standard relational query language.
Category: Computer Science
Difficulty: easy`;

const SAMPLE_CSV_TEMPLATE = `Question,Option A,Option B,Option C,Option D,Answer,Explanation,Category,Difficulty
"What is the chemical formula for table salt?","NaCl","KCl","CaCl2","NaOH","A","Sodium Chloride is NaCl","Chemistry","easy"
"Which organ filters metabolic waste from blood to form urine?","Liver","Kidney","Spleen","Pancreas","B","Kidneys filter blood and regulate electrolytes","Biology","medium"
"What is the speed of light in vacuum approximately?","300,000 km/s","150,000 km/s","500,000 km/s","1,000,000 km/s","A","Speed of light c is approximately 299,792 km/s","Physics","easy"`;

const CURATED_PACKS = [
  {
    title: 'Computer Science & Software Principles',
    category: 'Computer Science',
    count: 4,
    questionsText: `Q: What is the purpose of Git in software development?
A) Compiling C++ code
B) Distributed version control for tracking code changes*
C) Hosting relational databases
D) Running cloud virtual machines
Explanation: Git records changes to source code over time, enabling distributed collaboration among developers.
Category: Computer Science
Difficulty: easy

Q: Which HTTP method is specifically intended to be idempotent and safe for data retrieval?
A) POST
B) GET*
C) PATCH
D) DELETE
Explanation: GET requests should only retrieve data and have no other effect on the server state.
Category: Computer Science
Difficulty: easy

Q: In object-oriented programming, what is encapsulation?
A) The ability of a variable to take on multiple forms
B) Bundling data and methods that operate on that data within a single unit and restricting direct external access*
C) Inheriting features from a parent superclass
D) Converting code into machine language
Explanation: Encapsulation hides internal object state and enforces access via public interfaces.
Category: Computer Science
Difficulty: medium

Q: Which sorting algorithm has an average time complexity of O(n log n) and is commonly used in practice?
A) Bubble Sort
B) Insertion Sort
C) QuickSort*
D) Selection Sort
Explanation: QuickSort uses a divide-and-conquer partition approach with average performance of O(n log n).
Category: Computer Science
Difficulty: medium`,
  },
  {
    title: 'World Geography & Physical Sciences',
    category: 'Science',
    count: 3,
    questionsText: `Q: What is the deepest oceanic trench on Earth?
A) Java Trench
B) Puerto Rico Trench
C) Mariana Trench*
D) Tonga Trench
Explanation: The Mariana Trench in the western Pacific Ocean contains the Challenger Deep, reaching ~11,000 meters.
Category: Geography
Difficulty: easy

Q: Which layer of the atmosphere contains the ozone layer that absorbs ultraviolet light?
A) Troposphere
B) Stratosphere*
C) Mesosphere
D) Thermosphere
Explanation: The ozone layer is located in the lower portion of the stratosphere from approximately 15 to 35 km.
Category: Science
Difficulty: medium

Q: What force keeps planets in elliptical orbit around the Sun?
A) Magnetism
B) Gravity*
C) Atmospheric pressure
D) Solar wind
Explanation: Newton's universal gravitation and Einstein's general relativity explain orbital mechanics.
Category: Science
Difficulty: easy`,
  },
];

export const BulkImporter: React.FC<BulkImporterProps> = ({ quizzes, onImportComplete }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'csv' | 'packs'>('text');
  const [textInput, setTextInput] = useState(SAMPLE_TEXT_TEMPLATE);
  const [csvInput, setCsvInput] = useState('');
  const [defaultCategory, setDefaultCategory] = useState('General');
  const [targetDestination, setTargetDestination] = useState<'bank' | 'existing_quiz' | 'new_quiz'>('bank');
  const [selectedQuizId, setSelectedQuizId] = useState<string>(quizzes.length > 0 ? quizzes[0].id : '');
  const [newQuizTitle, setNewQuizTitle] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const [importError, setImportError] = useState('');

  // Live auto-parsing output
  const parsedData: BulkParseOutput = useMemo(() => {
    if (activeTab === 'text') {
      return parsePlainTextQuestions(textInput, defaultCategory);
    } else if (activeTab === 'csv') {
      return parseCSVQuestions(csvInput, defaultCategory);
    }
    return { questions: [], totalParsed: 0, validCount: 0, invalidCount: 0, results: [] };
  }, [activeTab, textInput, csvInput, defaultCategory]);

  const handleLoadSampleText = () => {
    setTextInput(SAMPLE_TEXT_TEMPLATE);
    setActiveTab('text');
  };

  const handleLoadSampleCSV = () => {
    setCsvInput(SAMPLE_CSV_TEMPLATE);
    setActiveTab('csv');
  };

  const handleLoadCuratedPack = (packQuestionsText: string, category: string) => {
    setDefaultCategory(category);
    setTextInput(packQuestionsText);
    setActiveTab('text');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      if (file.name.endsWith('.csv') || file.name.endsWith('.tsv')) {
        setCsvInput(content);
        setActiveTab('csv');
      } else if (file.name.endsWith('.json')) {
        const res = parseJSONQuestions(content, defaultCategory);
        // Convert to text blocks or set parsed
        setTextInput(res.questions.map(q => 
          `Q: ${q.text}\n${q.options.map(o => `${o.id}) ${o.text}${o.id === q.correctOptionId ? '*' : ''}`).join('\n')}\n${q.explanation ? `Explanation: ${q.explanation}\n` : ''}Category: ${q.category}\nDifficulty: ${q.difficulty}`
        ).join('\n\n'));
        setActiveTab('text');
      } else {
        setTextInput(content);
        setActiveTab('text');
      }
    };
    reader.readAsText(file);
  };

  const handleCommitImport = () => {
    setImportError('');
    if (!parsedData || parsedData.questions.length === 0) {
      setImportError('No valid questions parsed yet. Please check your questions format.');
      return;
    }

    const importedQuestions = parsedData.questions;
    // Save to master question bank
    addQuestions(importedQuestions);

    const questionIds = importedQuestions.map(q => q.id);
    let finalQuizId: string | undefined = undefined;

    if (targetDestination === 'existing_quiz' && selectedQuizId) {
      const quiz = quizzes.find(q => q.id === selectedQuizId);
      if (quiz) {
        saveQuiz({
          ...quiz,
          questionIds: Array.from(new Set([...quiz.questionIds, ...questionIds])),
        });
        finalQuizId = quiz.id;
      }
    } else if (targetDestination === 'new_quiz') {
      const title = newQuizTitle.trim() || `Assessment (${new Date().toLocaleDateString()})`;
      const newQuiz: Quiz = {
        id: `quiz-${Date.now()}`,
        title,
        description: `Assessment containing ${importedQuestions.length} questions.`,
        category: defaultCategory,
        accessCode: `QZ-${Math.floor(100 + Math.random() * 900)}`,
        questionIds,
        timeLimitMinutes: Math.max(5, importedQuestions.length * 2),
        passingScorePercent: 70,
        shuffleQuestions: false,
        shuffleOptions: false,
        allowReview: true,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      saveQuiz(newQuiz);
      finalQuizId = newQuiz.id;
    }

    setSuccessCount(importedQuestions.length);
    setIsSuccess(true);

    setTimeout(() => {
      onImportComplete(finalQuizId);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Bulk Question Importer</h1>
          <p className="text-xs text-slate-500 mt-1">
            Questions are automatically parsed in real time. Inspect the live preview below and import them in one click.
          </p>
        </div>

        {/* Format Selector segmented tabs */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs overflow-x-auto w-full md:w-auto touch-pan-x">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'text' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Text / Aiken Format</span>
          </button>
          <button
            onClick={() => setActiveTab('csv')}
            className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'csv' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>CSV / Spreadsheet</span>
          </button>
          <button
            onClick={() => setActiveTab('packs')}
            className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'packs' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Curated Packs</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-sm flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-bold">
              Successfully imported {successCount} questions!
            </span>
          </div>
          <span className="text-xs text-emerald-700 font-medium">Navigating to Question Bank...</span>
        </div>
      )}

      {/* Primary Input & Quick Action Box */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 shadow-xs">
        {activeTab === 'text' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="bulk-text" className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span>Enter Questions Below</span>
                <span className="text-slate-400 font-normal lowercase">(Aiken / Markdown format)</span>
              </label>
              <button
                onClick={handleLoadSampleText}
                className="text-xs text-slate-700 hover:text-slate-900 font-semibold underline"
              >
                Reset to Sample Format
              </button>
            </div>

            <textarea
              id="bulk-text"
              rows={10}
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              placeholder={`Q: What is the capital of Japan?\nA) Tokyo*\nB) Kyoto\nC) Osaka\nD) Nagoya\nExplanation: Tokyo is the capital of Japan.\nCategory: Geography\nDifficulty: easy`}
              className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed"
            />
          </div>
        )}

        {activeTab === 'csv' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="csv-input" className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Upload or Paste CSV / TSV File
              </label>
              <button
                onClick={handleLoadSampleCSV}
                className="text-xs text-slate-700 hover:text-slate-900 font-semibold underline"
              >
                Load Sample CSV
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 text-center hover:border-slate-400 transition-colors flex flex-col items-center justify-center">
                <Upload className="w-7 h-7 text-slate-400 mb-2" />
                <p className="text-xs font-semibold text-slate-700">Upload CSV / TSV file</p>
                <p className="text-[11px] text-slate-400 mt-0.5 mb-2">Columns: Question, Option A, Option B, Option C, Option D, Answer</p>
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept=".csv,.tsv,.txt,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <textarea
                  id="csv-input"
                  rows={6}
                  value={csvInput}
                  onChange={e => setCsvInput(e.target.value)}
                  placeholder={`Question,Option A,Option B,Option C,Option D,Answer,Explanation\n"What is 2+2?","3","4","5","6","B","Arithmetic"`}
                  className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 h-full"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'packs' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              One-Click Starter Packs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CURATED_PACKS.map(pack => (
                <div
                  key={pack.title}
                  className="p-4 rounded-lg border border-slate-200 hover:border-slate-400 transition-colors bg-slate-50 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{pack.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{pack.count} Verified Questions · {pack.category}</p>
                  </div>
                  <button
                    onClick={() => handleLoadCuratedPack(pack.questionsText, pack.category)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap"
                  >
                    <span>Load Pack</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOTTOM ACTION BAR: Instant Status, Destination & 1-Click Import Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-50/70 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6 p-4 sm:p-6 rounded-b-xl">
          {/* Left: Live status counter */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              parsedData.validCount > 0
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{parsedData.validCount} Questions Ready to Import</span>
            </div>

            {parsedData.invalidCount > 0 && (
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1.5 rounded-lg border border-rose-200">
                {parsedData.invalidCount} with formatting errors
              </span>
            )}
          </div>

          {/* Right: Destination selector + Primary Import Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="destination-select" className="text-xs text-slate-500 whitespace-nowrap shrink-0">Destination:</label>
              <select
                id="destination-select"
                value={targetDestination}
                onChange={e => setTargetDestination(e.target.value as any)}
                className="w-full sm:w-auto text-xs font-medium px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
              >
                <option value="bank">Save to Master Question Bank</option>
                {quizzes.length > 0 && (
                  <option value="existing_quiz">Assign to Existing Quiz</option>
                )}
                <option value="new_quiz">Create New Quiz with these</option>
              </select>
            </div>

            {targetDestination === 'existing_quiz' && quizzes.length > 0 && (
              <select
                value={selectedQuizId}
                onChange={e => setSelectedQuizId(e.target.value)}
                className="w-full sm:w-auto text-xs font-medium px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800"
              >
                {quizzes.map(q => (
                  <option key={q.id} value={q.id}>
                    {q.title} ({q.accessCode})
                  </option>
                ))}
              </select>
            )}

            {targetDestination === 'new_quiz' && (
              <input
                type="text"
                placeholder="New Quiz Title..."
                value={newQuizTitle}
                onChange={e => setNewQuizTitle(e.target.value)}
                className="w-full sm:w-40 text-xs px-2.5 py-2 bg-white border border-slate-200 rounded-lg text-slate-800"
              />
            )}

            <button
              onClick={handleCommitImport}
              disabled={parsedData.validCount === 0}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap min-h-[40px]"
            >
              <PlusCircle className="w-4 h-4 shrink-0" />
              <span>Import {parsedData.validCount} Questions Now</span>
            </button>
          </div>
        </div>
        {importError && (
          <div className="mt-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
            {importError}
          </div>
        )}
      </div>

      {/* Live Parsed Preview & Error Diagnostics Section */}
      <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Live Parsed Questions Preview ({parsedData.validCount} Verified)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              These questions will be added to your Question Bank when you click the Import button above.
            </p>
          </div>
        </div>

        {parsedData.results.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p>No questions detected. Paste your questions above or click &quot;Reset to Sample Format&quot;.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {parsedData.results.map((res, index) => {
              if (!res.valid || !res.question) {
                return (
                  <div key={index} className="p-4 rounded-lg border border-rose-200 bg-rose-50 text-xs space-y-2">
                    <div className="flex items-center gap-2 font-bold text-rose-800">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>Question Block #{index + 1} has errors:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-rose-700 pl-2">
                      {res.errors.map((err, eIdx) => (
                        <li key={eIdx}>{err}</li>
                      ))}
                    </ul>
                    <pre className="p-2 bg-rose-100/60 rounded text-[11px] font-mono text-rose-900 overflow-x-auto whitespace-pre-wrap">
                      {res.rawText}
                    </pre>
                  </div>
                );
              }

              const q = res.question;
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {q.text}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <span>{q.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{q.difficulty}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono font-bold text-emerald-700">
                            Key: Option {q.correctOptionId}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                    {q.options.map(opt => {
                      const isCorrect = opt.id === q.correctOptionId;
                      return (
                        <div
                          key={opt.id}
                          className={`px-3 py-2 rounded-lg border text-xs flex items-center justify-between ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                              : 'bg-white border-slate-200 text-slate-700'
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

                  {/* Explanation */}
                  {q.explanation && (
                    <div className="pl-6 pt-1 text-xs text-slate-600 flex items-start gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-slate-700">Explanation: </strong>
                        {q.explanation}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
