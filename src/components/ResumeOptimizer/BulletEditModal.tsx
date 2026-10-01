import React, { useState } from 'react';
import { X, Check, Edit3, Sparkles } from 'lucide-react';

interface BulletEditModalProps {
  originalText: string;
  currentText: string;
  onSave: (newText: string) => void;
  onClose: () => void;
}

export const BulletEditModal: React.FC<BulletEditModalProps> = ({
  originalText,
  currentText,
  onSave,
  onClose
}) => {
  const [editedText, setEditedText] = useState(currentText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Edit3 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Edit Resume Bullet Manually</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reference original */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
          <span className="font-semibold text-slate-400 block mb-1">Original Draft:</span>
          <p className="text-slate-300 italic">{originalText}</p>
        </div>

        {/* Editable input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Custom Optimized Bullet:
          </label>
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={4}
            className="w-full p-3.5 rounded-2xl bg-slate-950/80 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            placeholder="Type your refined bullet point..."
          />
          <p className="text-[11px] text-slate-400">
            Tip: Include quantified metrics (e.g., % improvement, latency drops, user volume) for high ATS scoring.
          </p>
        </div>

        {/* Modal actions */}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(editedText);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Custom Bullet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
