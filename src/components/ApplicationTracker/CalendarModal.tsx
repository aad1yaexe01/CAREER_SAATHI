import React, { useState } from 'react';
import { X, Calendar, Clock, Check, Video, MapPin } from 'lucide-react';
import { ApplicationItem } from '../../types/career';

interface CalendarModalProps {
  application: ApplicationItem;
  onClose: () => void;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({ application, onClose }) => {
  const [synced, setSynced] = useState(false);

  const mockSlots = [
    { id: 1, date: "Thursday, Oct 8, 2026", time: "10:00 AM - 11:00 AM PST", interviewer: "Sarah Jenkins (Lead Tech Recruiter)", platform: "Google Meet" },
    { id: 2, date: "Friday, Oct 9, 2026", time: "2:00 PM - 3:00 PM PST", interviewer: "David Zhang (Principal Architect)", platform: "Zoom Audio/Video" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Interview Calendar Assistant</h3>
              <p className="text-xs text-slate-400">
                {application.company} · {application.jobTitle}
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

        <p className="text-xs text-slate-300">
          Parsed interview slot detected from recruiter correspondence. Select a slot to synchronize with your calendar.
        </p>

        <div className="space-y-3">
          {mockSlots.map((slot) => (
            <div key={slot.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  {slot.date}
                </span>
                <span className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1 bg-cyan-950/40 px-2 py-0.5 rounded-lg border border-cyan-500/30">
                  <Clock className="w-3 h-3" />
                  {slot.time}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>With: <strong className="text-slate-200">{slot.interviewer}</strong></span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Video className="w-3 h-3 text-slate-400" />
                  {slot.platform}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={() => {
              setSynced(true);
              setTimeout(() => {
                onClose();
              }, 1200);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{synced ? 'Calendar Synced! ✓' : 'Confirm & Sync Calendar'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
