import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  ExternalLink,
  MessageSquare,
  Mail,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { Quiz } from '../../types/quiz';

interface ShareQuizModalProps {
  quiz: Quiz | null;
  onClose: () => void;
}

export const ShareQuizModal: React.FC<ShareQuizModalProps> = ({ quiz, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'direct' | 'portal'>('direct');

  if (!quiz) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const baseUrl = `${origin}${pathname}`;

  const directStudentUrl = `${baseUrl}?mode=student&code=${encodeURIComponent(quiz.accessCode)}`;
  const portalUrl = `${baseUrl}?mode=student`;

  const activeUrl = selectedFormat === 'direct' ? directStudentUrl : portalUrl;

  const invitationMessage = `📚 Assessment Examination: ${quiz.title}
🔑 Access Code: ${quiz.accessCode}
⏱️ Time Allowed: ${quiz.timeLimitMinutes ? `${quiz.timeLimitMinutes} minutes` : 'Untimed'}
📝 Questions: ${quiz.questionIds.length} items

👉 Direct Student Link:
${activeUrl}

Instructions: Click the link, enter your Full Name and Registration Number (Reg No), and complete all questions.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyInvitationText = () => {
    navigator.clipboard.writeText(invitationMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Send to Students
              </h2>
              <p className="text-xs text-slate-500">
                Share this direct student view link with your class
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
          {/* Target Assessment Details */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">{quiz.title}</p>
              <p className="text-slate-500 mt-0.5">
                {quiz.questionIds.length} Questions · {quiz.timeLimitMinutes ? `${quiz.timeLimitMinutes} mins` : 'Untimed'}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Access Code</span>
              <span className="font-mono text-sm font-extrabold text-slate-900">{quiz.accessCode}</span>
            </div>
          </div>

          {/* Link Format Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Student Link Destination:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedFormat('direct')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedFormat === 'direct'
                    ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="block font-bold">Direct Quiz Link</span>
                <span className={`text-[11px] block mt-0.5 ${selectedFormat === 'direct' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Opens this test immediately
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('portal')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedFormat === 'portal'
                    ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="block font-bold">General Student Portal</span>
                <span className={`text-[11px] block mt-0.5 ${selectedFormat === 'portal' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Shows all active quizzes
                </span>
              </button>
            </div>
          </div>

          {/* Student URL Box with 1-click Copy */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 block">
              Direct Student Link (No Admin Access):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={activeUrl}
                className="flex-1 text-xs font-mono p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Ready-to-Send Invitation Message (Email / WhatsApp / Google Classroom) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Ready-to-Paste Student Invitation Message:
              </label>
              <button
                type="button"
                onClick={handleCopyInvitationText}
                className="text-xs text-slate-900 hover:text-slate-700 font-bold underline flex items-center gap-1"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied Message!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Message</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              readOnly
              rows={6}
              value={invitationMessage}
              className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 select-all leading-relaxed"
            />
          </div>

          {/* Test Link in New Tab */}
          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
            <span>Students see only the test and enter their Name & Reg No</span>
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 hover:underline inline-flex items-center gap-1"
            >
              <span>Test Link in New Tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 bg-white border border-slate-300 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
