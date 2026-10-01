import React from 'react';
import { X, CheckCircle, AlertTriangle, Lightbulb, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { JobOpportunity } from '../../types/career';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';

interface MatchExplanationModalProps {
  job: JobOpportunity;
  onClose: () => void;
}

export const MatchExplanationModal: React.FC<MatchExplanationModalProps> = ({ job, onClose }) => {
  const { addSkillToRoadmap, setActiveTab, applyForJob } = useCandidateIntelligence();

  const getFitStyle = (fit: string) => {
    switch (fit) {
      case 'Safe Fit':
        return 'text-[#00c288] bg-[#00c288]/15 border-[#00c288]/30';
      case 'Stretch':
        return 'text-[#ffaa00] bg-[#ffaa00]/15 border-[#ffaa00]/30';
      case 'Reach':
        return 'text-[#ff5252] bg-[#ff5252]/15 border-[#ff5252]/30';
      default:
        return 'text-[#2475f4] bg-[#2475f4]/15 border-[#2475f4]/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#161822] border border-white/[0.08] rounded-[32px] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* One UI Handle Bar on top */}
        <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto mb-4 sm:hidden" />

        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-[22px] bg-[#1f2230] border border-white/[0.06] flex items-center justify-center text-3xl shadow-inner">
              {job.companyLogo}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold text-white tracking-tight font-sans">{job.title}</h3>
                <ProvenanceBadge type={job.provenance} />
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                <span className="text-slate-200 font-semibold">{job.company}</span>
                <span>•</span>
                <span>{job.location}</span>
                <span>•</span>
                <span className="text-[#00c288] font-bold">{job.salary}</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explainable Fit Score Section (Samsung Health Gauge Style) */}
        <div className="my-6 p-5 rounded-[24px] bg-[#12131b] border border-white/[0.05]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Candidate Fit Score
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-bold border ${getFitStyle(job.fitClassification)}`}>
                {job.fitClassification}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">{job.matchScore}%</span>
              <span className="text-xs text-slate-400 font-medium">Alignment</span>
            </div>
          </div>

          {/* One UI Smooth Progress Bar */}
          <div className="w-full h-3 rounded-full bg-[#1e2230] overflow-hidden p-0.5">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                job.matchScore >= 80 ? 'bg-[#00c288]' :
                job.matchScore >= 65 ? 'bg-[#ffaa00]' :
                'bg-[#ff5252]'
              }`}
              style={{ width: `${job.matchScore}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2.5">
            Calibrated across technical competency matrices, ATS resume keywords, and mock evaluation benchmarks.
          </p>
        </div>

        {/* Overlaps vs Gaps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Overlaps */}
          <div className="p-5 rounded-[24px] bg-[#12141d] border border-white/[0.05]">
            <div className="flex items-center gap-2 mb-3 text-[#00c288] font-bold text-xs uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              <span>Verified Skill Overlaps ({job.overlaps.length})</span>
            </div>
            <ul className="space-y-2.5">
              {job.overlaps.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-[#00c288] flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps */}
          <div className="p-5 rounded-[24px] bg-[#12141d] border border-white/[0.05]">
            <div className="flex items-center gap-2 mb-3 text-[#ffaa00] font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Identified Skill Gaps ({job.gaps.length})</span>
            </div>
            <ul className="space-y-2.5">
              {job.gaps.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-[#ffaa00] flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Recommendation Banner */}
        <div className="p-5 rounded-[24px] bg-[#1a1f30] border border-[#2475f4]/30 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-[#2475f4]/20 text-[#2475f4] mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#5ea2ff] uppercase tracking-wide">
                Targeted Action Recommendation
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {job.actionRecommendation}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (job.gaps.length > 0) {
                const primaryGap = job.gaps[0].includes('Docker') ? 'Docker & Container Orchestration' : job.gaps[0];
                addSkillToRoadmap(primaryGap);
              }
              onClose();
              setActiveTab('skills');
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2475f4] hover:bg-[#1e65db] text-white text-xs font-bold transition-all whitespace-nowrap shadow-md cursor-pointer self-stretch sm:self-auto justify-center"
          >
            <span>Add to Skill Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Breakdown
          </button>
          <button
            onClick={() => {
              applyForJob(job);
              onClose();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00c288] hover:bg-[#00ad7a] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <span>Apply & Track in Application Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
