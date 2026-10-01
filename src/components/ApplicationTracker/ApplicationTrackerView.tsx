import React, { useState } from 'react';
import { 
  KanbanSquare, 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar, 
  Mail, 
  ChevronRight, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Send
} from 'lucide-react';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';
import { ApplicationItem, ApplicationStage } from '../../types/career';
import { FollowUpModal } from './FollowUpModal';
import { CalendarModal } from './CalendarModal';

export const ApplicationTrackerView: React.FC = () => {
  const { 
    applications, 
    moveApplicationStage, 
    saveFollowUpDraft,
    setActiveTab 
  } = useCandidateIntelligence();

  const [activeFollowUpApp, setActiveFollowUpApp] = useState<ApplicationItem | null>(null);
  const [activeCalendarApp, setActiveCalendarApp] = useState<ApplicationItem | null>(null);

  const stages: { stage: ApplicationStage; label: string; color: string }[] = [
    { stage: 'Wishlist', label: 'Wishlist', color: 'bg-slate-500' },
    { stage: 'Applied', label: 'Applied', color: 'bg-[#38bdf8]' },
    { stage: 'In Review', label: 'In Review', color: 'bg-[#2475f4]' },
    { stage: 'Interview Scheduled', label: 'Interview Scheduled', color: 'bg-[#8c52ff]' },
    { stage: 'Offer', label: 'Offer Received', color: 'bg-[#00c288]' },
    { stage: 'Rejected', label: 'Archived', color: 'bg-[#ff5252]' }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Samsung One UI Header Banner */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Application Pipeline Automation</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated AI follow-up draft generation and interview calendar synchronization.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab('jobs')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2475f4] hover:bg-[#1e65db] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Browse Roles</span>
            </button>
          </div>
        </div>

        {/* Pipeline Metrics Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/[0.05]">
          <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
            <div className="text-xs text-slate-400 font-medium">Active Submissions</div>
            <div className="text-2xl font-black text-white mt-0.5 font-sans">{applications.length}</div>
          </div>
          <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
            <div className="text-xs text-slate-400 font-medium">Interviews Queued</div>
            <div className="text-2xl font-black text-[#8c52ff] mt-0.5 font-sans">
              {applications.filter(a => a.stage === 'Interview Scheduled').length}
            </div>
          </div>
          <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
            <div className="text-xs text-slate-400 font-medium">Under Review</div>
            <div className="text-2xl font-black text-[#2475f4] mt-0.5 font-sans">
              {applications.filter(a => a.stage === 'In Review').length}
            </div>
          </div>
          <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
            <div className="text-xs text-slate-400 font-medium">Interview Rate</div>
            <div className="text-2xl font-black text-[#00c288] mt-0.5 font-sans">40.0%</div>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-4">
        {stages.map(({ stage, label, color }) => {
          const stageApps = applications.filter(a => a.stage === stage);

          return (
            <div 
              key={stage}
              className="flex flex-col rounded-[28px] bg-[#161822] border border-white/[0.06] p-4 min-h-[460px] shadow-sm"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                  <span className="text-xs font-bold text-white tracking-tight">{label}</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#12131b] text-slate-300 font-bold">
                  {stageApps.length}
                </span>
              </div>

              {/* Application Cards in Stage */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[680px] pr-1">
                {stageApps.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs italic">
                    No active cards.
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04] hover:border-white/[0.1] transition-all space-y-3 shadow-md"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {app.company}
                        </span>
                        <h4 className="text-xs font-bold text-white leading-snug mt-0.5 font-sans">
                          {app.jobTitle}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 flex-wrap">
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {app.location.split('/')[0]}
                          </span>
                          <span>•</span>
                          <span className="text-[#00c288] font-bold">{app.salary.split(' - ')[0]}</span>
                        </div>
                      </div>

                      {/* Next Step Note */}
                      <div className="p-3 rounded-[16px] bg-[#181a24] border border-white/[0.04] text-[11px] text-slate-300">
                        <span className="text-[#5ea2ff] font-semibold block mb-0.5">Status:</span>
                        <span>{app.nextStep}</span>
                        {app.daysElapsed > 0 && (
                          <div className="text-[10px] text-slate-400 mt-1">
                            Applied: {app.appliedDate} ({app.daysElapsed}d ago)
                          </div>
                        )}
                      </div>

                      {/* Calendar Slot Button */}
                      {app.interviewSlot && (
                        <button
                          onClick={() => setActiveCalendarApp(app)}
                          className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-full bg-[#8c52ff]/15 hover:bg-[#8c52ff]/25 border border-[#8c52ff]/30 text-[#bb86fc] text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>View Calendar Slot</span>
                        </button>
                      )}

                      {/* AI Follow-up Nudge Button */}
                      <button
                        onClick={() => setActiveFollowUpApp(app)}
                        className="w-full flex items-center justify-center gap-1.5 p-2.5 rounded-full bg-[#2475f4]/15 hover:bg-[#2475f4]/25 border border-[#2475f4]/30 text-[#5ea2ff] text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI Follow-up Nudge</span>
                      </button>

                      {/* Stage Mover Selector */}
                      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Move:</span>
                        <select
                          value={app.stage}
                          onChange={(e) => moveApplicationStage(app.id, e.target.value as ApplicationStage)}
                          className="text-[11px] px-3 py-1 rounded-full bg-[#181a24] border border-white/[0.08] text-slate-200 focus:outline-none focus:border-[#2475f4] cursor-pointer"
                        >
                          {stages.map(s => (
                            <option key={s.stage} value={s.stage}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Follow-up Draft Modal */}
      {activeFollowUpApp && (
        <FollowUpModal
          application={activeFollowUpApp}
          onSave={(draft) => {
            saveFollowUpDraft(activeFollowUpApp.id, draft);
            setActiveFollowUpApp(null);
          }}
          onClose={() => setActiveFollowUpApp(null)}
        />
      )}

      {/* Calendar Slot Sync Modal */}
      {activeCalendarApp && (
        <CalendarModal
          application={activeCalendarApp}
          onClose={() => setActiveCalendarApp(null)}
        />
      )}
    </div>
  );
};
