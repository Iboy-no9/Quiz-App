import { Question, QuestionOption, Difficulty } from '../types/quiz';

export interface ParsedQuestionResult {
  valid: boolean;
  question?: Question;
  rawText: string;
  errors: string[];
}

export interface BulkParseOutput {
  questions: Question[];
  totalParsed: number;
  validCount: number;
  invalidCount: number;
  results: ParsedQuestionResult[];
}

/**
 * Parses multi-line plain text or Aiken format questions.
 * Supports:
 * - Q: or 1. or direct text question
 * - A) or A. or [A] options
 * - Answer: A or Ans: A or Option ending in *
 * - Explanation: ...
 * - Category: ...
 * - Difficulty: easy/medium/hard
 */
export function parsePlainTextQuestions(text: string, defaultCategory = 'General'): BulkParseOutput {
  const blocks = text
    .split(/\n\s*\n+/) // split on blank lines
    .map(b => b.trim())
    .filter(b => b.length > 0);

  const results: ParsedQuestionResult[] = [];
  const validQuestions: Question[] = [];

  for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
    const block = blocks[blockIdx];
    const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const errors: string[] = [];

    if (lines.length < 3) {
      results.push({
        valid: false,
        rawText: block,
        errors: ['Question block must contain at least a question text, two options, and an answer.'],
      });
      continue;
    }

    let questionText = '';
    const options: QuestionOption[] = [];
    let correctOptionId = '';
    let explanation = '';
    let category = defaultCategory;
    let difficulty: Difficulty = 'medium';

    // Parse line by line
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for Question start
      if (i === 0 || (!questionText && !line.match(/^[A-Fa-f0-9][\.\)\:\-]/i) && !line.match(/^(ans|answer|explanation|category|diff)/i))) {
        // Strip leading "Q:", "Q1:", "1.", "1)"
        questionText = line.replace(/^(Q\d*[\:\.\-]?|\d+[\.\)\:\-])\s*/i, '').trim();
        continue;
      }

      // Check for Answer line (e.g. "Answer: B", "Ans: B", "Key: B", "Correct: B", "Correct Answer: B")
      const ansMatch = line.match(/^(?:ans|answer|correct(?:\s*answer)?|key)\s*[:=\-]\s*(.+)/i);
      if (ansMatch) {
        const rawAns = ansMatch[1].trim();
        // Check if single letter
        if (rawAns.length === 1 && /[A-Za-z0-9]/.test(rawAns)) {
          correctOptionId = rawAns.toUpperCase();
        } else {
          // Could be "Option B" or the option text itself e.g. "Venus"
          const optLetterMatch = rawAns.match(/^(?:option\s*)?([A-Za-z0-9])[\.\:\)]?$/i);
          if (optLetterMatch) {
            correctOptionId = optLetterMatch[1].toUpperCase();
          } else {
            // Store text for later resolution against options list
            correctOptionId = rawAns;
          }
        }
        continue;
      }

      // Check for Explanation line
      const expMatch = line.match(/^explanation\s*[:=\-]\s*(.+)/i);
      if (expMatch) {
        explanation = expMatch[1].trim();
        continue;
      }

      // Check for Category line
      const catMatch = line.match(/^category\s*[:=\-]\s*(.+)/i);
      if (catMatch) {
        category = catMatch[1].trim();
        continue;
      }

      // Check for Difficulty line
      const diffMatch = line.match(/^difficulty\s*[:=\-]\s*(easy|medium|hard)/i);
      if (diffMatch) {
        difficulty = diffMatch[1].toLowerCase() as Difficulty;
        continue;
      }

      // Check for Option line e.g. "A) option text", "A. option text", "(A) option text", "* B) option text", "[x] A) option text"
      const isStarredPrefix = line.startsWith('*') || line.startsWith('✓') || line.startsWith('[x]') || line.startsWith('(x)');
      const cleanOptLine = line.replace(/^[\*✓\[\]x\(\)\s]+/, '');

      const optMatch = cleanOptLine.match(/^(?:\(?([A-Za-z0-9])\)|\(?([A-Za-z0-9])[\.\:\-])\s*(.+)/i);
      if (optMatch) {
        let letter = (optMatch[1] || optMatch[2]).toUpperCase();
        // If numbered 1, 2, 3, 4 convert to A, B, C, D
        if (/^\d+$/.test(letter)) {
          const num = parseInt(letter, 10);
          if (num >= 1 && num <= 10) {
            letter = String.fromCharCode(64 + num);
          }
        }

        let optText = optMatch[3].trim();

        // Check if option text ends with * indicating correct answer
        if (optText.endsWith('*') || isStarredPrefix) {
          if (optText.endsWith('*')) optText = optText.slice(0, -1).trim();
          correctOptionId = letter;
        }

        options.push({
          id: letter,
          text: optText,
        });
        continue;
      }

      // If we haven't set question text yet or it's multi-line question text
      if (options.length === 0 && !questionText) {
        questionText = line;
      } else if (options.length === 0 && questionText) {
        questionText += ' ' + line;
      } else if (options.length > 0 && explanation) {
        explanation += ' ' + line;
      }
    }

    // If correctOptionId was stored as text (e.g. "Venus"), match it to option
    if (correctOptionId && correctOptionId.length > 1) {
      const matchOpt = options.find(o => o.text.toLowerCase() === correctOptionId.toLowerCase() || o.text.toLowerCase().includes(correctOptionId.toLowerCase()));
      if (matchOpt) {
        correctOptionId = matchOpt.id;
      }
    }

    if (!questionText) {
      errors.push('Question text could not be identified.');
    }
    if (options.length < 2) {
      errors.push(`Expected at least 2 options, found ${options.length}. Format options as "A) Option text".`);
    }
    if (!correctOptionId) {
      errors.push('Correct answer not found. Add "Answer: A" or mark the option with an asterisk (*).');
    } else {
      const optionExists = options.some(o => o.id === correctOptionId);
      if (!optionExists) {
        errors.push(`Specified answer "${correctOptionId}" does not match any parsed option label (${options.map(o => o.id).join(', ')}).`);
      }
    }

    const isValid = errors.length === 0;
    const questionObj: Question | undefined = isValid
      ? {
          id: `q-${Date.now()}-${blockIdx}-${Math.random().toString(36).substring(2, 6)}`,
          text: questionText,
          options,
          correctOptionId,
          explanation: explanation || undefined,
          category,
          difficulty,
          points: 1,
          createdAt: new Date().toISOString(),
        }
      : undefined;

    if (isValid && questionObj) {
      validQuestions.push(questionObj);
    }

    results.push({
      valid: isValid,
      question: questionObj,
      rawText: block,
      errors,
    });
  }

  return {
    questions: validQuestions,
    totalParsed: results.length,
    validCount: validQuestions.length,
    invalidCount: results.length - validQuestions.length,
    results,
  };
}

/**
 * Parses CSV/TSV input
 */
export function parseCSVQuestions(csvText: string, defaultCategory = 'General'): BulkParseOutput {
  const rows = parseCSVRows(csvText);
  if (rows.length === 0) {
    return { questions: [], totalParsed: 0, validCount: 0, invalidCount: 0, results: [] };
  }

  const results: ParsedQuestionResult[] = [];
  const validQuestions: Question[] = [];

  // Determine header mapping
  const firstRow = rows[0].map(h => h.trim().toLowerCase());
  const isHeader =
    firstRow.some(col => col.includes('question') || col.includes('prompt')) ||
    firstRow.some(col => col.includes('option') || col.includes('choice') || col.includes('answer'));

  const startIndex = isHeader ? 1 : 0;

  let qCol = -1;
  let optCols: { id: string; col: number }[] = [];
  let ansCol = -1;
  let expCol = -1;
  let catCol = -1;
  let diffCol = -1;

  if (isHeader) {
    firstRow.forEach((col, idx) => {
      if (col.includes('question') || col.includes('prompt')) qCol = idx;
      else if (col.includes('option a') || col === 'a' || col === 'opt_a' || col === 'option_1') optCols.push({ id: 'A', col: idx });
      else if (col.includes('option b') || col === 'b' || col === 'opt_b' || col === 'option_2') optCols.push({ id: 'B', col: idx });
      else if (col.includes('option c') || col === 'c' || col === 'opt_c' || col === 'option_3') optCols.push({ id: 'C', col: idx });
      else if (col.includes('option d') || col === 'd' || col === 'opt_d' || col === 'option_4') optCols.push({ id: 'D', col: idx });
      else if (col.includes('option e') || col === 'e' || col === 'opt_e' || col === 'option_5') optCols.push({ id: 'E', col: idx });
      else if (col.includes('answer') || col.includes('correct') || col === 'key') ansCol = idx;
      else if (col.includes('explanation') || col.includes('reason') || col.includes('rationale')) expCol = idx;
      else if (col.includes('category') || col.includes('subject') || col.includes('topic')) catCol = idx;
      else if (col.includes('difficulty') || col.includes('level')) diffCol = idx;
    });
  }

  // Fallback default column indices if headers weren't named standardly
  if (qCol === -1) qCol = 0;
  if (optCols.length === 0) {
    optCols = [
      { id: 'A', col: 1 },
      { id: 'B', col: 2 },
      { id: 'C', col: 3 },
      { id: 'D', col: 4 },
    ];
  }
  if (ansCol === -1) ansCol = 5;
  if (expCol === -1) expCol = 6;
  if (catCol === -1) catCol = 7;
  if (diffCol === -1) diffCol = 8;

  for (let r = startIndex; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 0 || (row.length === 1 && !row[0].trim())) continue;

    const errors: string[] = [];
    const questionText = (row[qCol] || '').trim();
    const options: QuestionOption[] = [];

    optCols.forEach(({ id, col }) => {
      const text = (row[col] || '').trim();
      if (text) {
        options.push({ id, text });
      }
    });

    let rawAnswer = (row[ansCol] || '').trim().toUpperCase();
    // If the answer is written as the full option text, find its corresponding ID
    if (rawAnswer.length > 1) {
      const matchedOpt = options.find(o => o.text.toLowerCase() === rawAnswer.toLowerCase());
      if (matchedOpt) {
        rawAnswer = matchedOpt.id;
      } else {
        // Check if starts with A, B, C, D
        const firstChar = rawAnswer[0];
        if (['A', 'B', 'C', 'D', 'E', 'F'].includes(firstChar)) {
          rawAnswer = firstChar;
        }
      }
    }

    const explanation = expCol !== -1 && row[expCol] ? row[expCol].trim() : undefined;
    const category = catCol !== -1 && row[catCol] && row[catCol].trim() ? row[catCol].trim() : defaultCategory;
    const rawDiff = diffCol !== -1 && row[diffCol] ? row[diffCol].trim().toLowerCase() : 'medium';
    const difficulty: Difficulty = ['easy', 'medium', 'hard'].includes(rawDiff) ? (rawDiff as Difficulty) : 'medium';

    if (!questionText) {
      errors.push(`Row ${r + 1}: Missing question text`);
    }
    if (options.length < 2) {
      errors.push(`Row ${r + 1}: Found only ${options.length} options, minimum 2 required`);
    }
    if (!rawAnswer) {
      errors.push(`Row ${r + 1}: Missing correct answer`);
    } else if (!options.some(o => o.id === rawAnswer)) {
      errors.push(`Row ${r + 1}: Correct answer '${rawAnswer}' does not match options (${options.map(o => o.id).join(', ')})`);
    }

    const isValid = errors.length === 0;
    const questionObj: Question | undefined = isValid
      ? {
          id: `q-${Date.now()}-${r}-${Math.random().toString(36).substring(2, 6)}`,
          text: questionText,
          options,
          correctOptionId: rawAnswer,
          explanation,
          category,
          difficulty,
          points: 1,
          createdAt: new Date().toISOString(),
        }
      : undefined;

    if (isValid && questionObj) {
      validQuestions.push(questionObj);
    }

    results.push({
      valid: isValid,
      question: questionObj,
      rawText: row.join(','),
      errors,
    });
  }

  return {
    questions: validQuestions,
    totalParsed: results.length,
    validCount: validQuestions.length,
    invalidCount: results.length - validQuestions.length,
    results,
  };
}

/**
 * Parses JSON format question array
 */
export function parseJSONQuestions(jsonText: string, defaultCategory = 'General'): BulkParseOutput {
  const results: ParsedQuestionResult[] = [];
  const validQuestions: Question[] = [];

  try {
    const parsed = JSON.parse(jsonText);
    const items = Array.isArray(parsed) ? parsed : parsed.questions && Array.isArray(parsed.questions) ? parsed.questions : [parsed];

    items.forEach((item: any, idx: number) => {
      const errors: string[] = [];
      const text = item.text || item.question || item.prompt;

      let options: QuestionOption[] = [];
      if (Array.isArray(item.options)) {
        if (typeof item.options[0] === 'string') {
          options = item.options.map((optStr: string, oIdx: number) => ({
            id: String.fromCharCode(65 + oIdx), // 'A', 'B', 'C', ...
            text: optStr.trim(),
          }));
        } else if (typeof item.options[0] === 'object') {
          options = item.options.map((optObj: any, oIdx: number) => ({
            id: (optObj.id || String.fromCharCode(65 + oIdx)).toUpperCase(),
            text: (optObj.text || optObj.value || '').trim(),
          }));
        }
      }

      let correctOptionId = (item.correctOptionId || item.answer || item.correctAnswer || '').toString().trim().toUpperCase();
      if (correctOptionId.length > 1) {
        const found = options.find(o => o.text.toLowerCase() === correctOptionId.toLowerCase());
        if (found) correctOptionId = found.id;
      }

      const explanation = item.explanation || item.reason;
      const category = item.category || defaultCategory;
      const difficulty: Difficulty = ['easy', 'medium', 'hard'].includes(item.difficulty?.toLowerCase())
        ? (item.difficulty.toLowerCase() as Difficulty)
        : 'medium';

      if (!text) errors.push('Missing question text.');
      if (options.length < 2) errors.push(`Minimum 2 options required, got ${options.length}.`);
      if (!correctOptionId) errors.push('Missing correctOptionId/answer.');
      else if (!options.some(o => o.id === correctOptionId)) {
        errors.push(`Answer '${correctOptionId}' is not among option ids (${options.map(o => o.id).join(', ')}).`);
      }

      const isValid = errors.length === 0;
      const questionObj: Question | undefined = isValid
        ? {
            id: item.id || `q-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
            text,
            options,
            correctOptionId,
            explanation,
            category,
            difficulty,
            points: item.points || 1,
            createdAt: item.createdAt || new Date().toISOString(),
          }
        : undefined;

      if (isValid && questionObj) {
        validQuestions.push(questionObj);
      }

      results.push({
        valid: isValid,
        question: questionObj,
        rawText: JSON.stringify(item),
        errors,
      });
    });
  } catch (err: any) {
    return {
      questions: [],
      totalParsed: 1,
      validCount: 0,
      invalidCount: 1,
      results: [
        {
          valid: false,
          rawText: jsonText.substring(0, 100) + '...',
          errors: [`JSON Parse Error: ${err?.message || 'Invalid JSON syntax'}`],
        },
      ],
    };
  }

  return {
    questions: validQuestions,
    totalParsed: results.length,
    validCount: validQuestions.length,
    invalidCount: results.length - validQuestions.length,
    results,
  };
}

/**
 * Robust CSV Line Parser supporting quotes, commas, tabs
 */
function parseCSVRows(text: string): string[][] {
  const delimiter = text.includes('\t') && !text.includes(',') ? '\t' : ',';
  const lines = text.split(/\r?\n/);
  const rows: string[][] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const row: string[] = [];
    let insideQuotes = false;
    let entry = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (insideQuotes && line[i + 1] === '"') {
          entry += '"';
          i++; // skip escaped quote
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === delimiter && !insideQuotes) {
        row.push(entry);
        entry = '';
      } else {
        entry += char;
      }
    }
    row.push(entry);
    rows.push(row);
  }

  return rows;
}
