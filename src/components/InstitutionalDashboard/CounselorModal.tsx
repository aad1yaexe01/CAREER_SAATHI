import React, { useState } from 'react';
import { X, Save, UserCheck, Sparkles, BookOpen } from 'lucide-react';
import { CohortStudent } from '../../types/career';
import { ProvenanceBadge } from '../common/ProvenanceBadge';

interface CounselorModalProps {
  student: CohortStudent;
  onSave: (notes: string) => void;
  onClose: () => void;
}

export const CounselorModal: React.FC<CounselorModalProps> = ({ student, onSave, onClose }) => {
  const [notes, setNotes] = useState(student.counselorNotes || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">
              {student.avatar}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{student.name}</h3>
              <p className="text-xs text-slate-400">
                {student.rollNo} · {student.cohort}
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

        {/* Student metrics snapshot */}
        <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-center text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Readiness</span>
            <span className="font-extrabold text-white text-base">{student.readinessScore}%</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Applications</span>
            <span className="font-extrabold text-white text-base">{student.applicationsCount}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Interviews</span>
            <span className="font-extrabold text-cyan-400 text-base">{student.interviewsCount}</span>
          </div>
        </div>

        {/* Flagged Weak Spots */}
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Identified Curricular Gaps:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {student.flaggedWeakSpots.map((spot, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
                ⚠ {spot}
              </span>
            ))}
          </div>
        </div>

        {/* Counselor Guidance Notes Area */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">
              Institutional Counselor Guidance Notes:
            </label>
            <ProvenanceBadge type="Verified Employer" size="sm" />
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Log personalized advice, placement drive recommendations, or remedial assignments..."
            className="w-full p-3.5 rounded-2xl bg-slate-950/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(notes);
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Guidance Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
