import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Mail, Send } from 'lucide-react';
import { ApplicationItem } from '../../types/career';
import { ProvenanceBadge } from '../common/ProvenanceBadge';

interface FollowUpModalProps {
  application: ApplicationItem;
  onSave: (draft: string) => void;
  onClose: () => void;
}

export const FollowUpModal: React.FC<FollowUpModalProps> = ({ application, onSave, onClose }) => {
  const [draft, setDraft] = useState(
    application.followUpDraft || 
    `Hi Recruiting Team at ${application.company},\n\nI am writing to check in on the status of my application for the ${application.jobTitle} position submitted on ${application.appliedDate}. Since submitting, I have completed our team's system design benchmarks and updated my portfolio.\n\nWarm regards,\nAlex Chen`
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Follow-Up Outreach Assistant</h3>
              <p className="text-xs text-slate-400">
                Tailored for {application.company} · {application.daysElapsed} Days Since Submission
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <ProvenanceBadge type="AI Inferred" size="sm" />
          <span className="text-xs text-emerald-400 font-semibold">Stage: {application.stage}</span>
        </div>

        {/* Draft text area */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">
            Personalized Email Nudge:
          </label>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={7}
            className="w-full p-4 rounded-2xl bg-slate-950/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed font-sans"
          />
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Draft'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave(draft);
                onClose();
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Save & Mark Ready</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
