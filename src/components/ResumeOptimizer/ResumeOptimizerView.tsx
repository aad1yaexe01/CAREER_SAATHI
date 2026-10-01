import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Sparkles, 
  Check, 
  X, 
  AlertCircle, 
  TrendingUp, 
  Download, 
  RefreshCw,
  Tag,
  Briefcase,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { BulletEditModal } from './BulletEditModal';
import { ResumeBullet } from '../../types/career';

export const ResumeOptimizerView: React.FC = () => {
  const { 
    resume, 
    jobs, 
    acceptResumeBullet, 
    rejectResumeBullet, 
    editResumeBullet,
    readinessScore
  } = useCandidateIntelligence();

  const [selectedJobId, setSelectedJobId] = useState<string>('job-techcorp');
  const [editingBulletInfo, setEditingBulletInfo] = useState<{
    expId: string;
    bullet: ResumeBullet;
  } | null>(null);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  const pendingBullets = resume.experiences.flatMap(exp => 
    exp.bullets.map(b => ({ expId: exp.id, company: exp.company, bullet: b }))
  );

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Samsung One UI Header Banner */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Resume ATS Audit & Optimizer</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Human-in-the-loop review for bullet impact and keyword alignment.
            </p>
          </div>

          {/* Job Target Selector Pill */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Target:</span>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#12131b] border border-white/[0.08] text-slate-200 focus:outline-none focus:border-[#2475f4] cursor-pointer"
            >
              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.company})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ATS Score & Metrics Bar (Samsung Device Care Style) */}
        <div className="mt-5 pt-5 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-full bg-[#2475f4] flex items-center justify-center text-white font-black text-xl shadow-[0_2px_12px_rgba(36,117,244,0.4)]">
              {resume.atsScore}%
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Target ATS Compatibility</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#00c288]/15 text-[#00c288] border border-[#00c288]/30">
                  Tier-1 Compatible
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Calibrated against {selectedJob.company} keyword indexing thresholds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs w-full sm:w-auto justify-end flex-wrap">
            <div className="px-4 py-2 rounded-full bg-[#12131b] border border-white/[0.05] text-slate-300">
              <span className="text-slate-500 mr-1.5">Keywords Found:</span>
              <span className="font-bold text-[#00c288]">
                {resume.keywords.filter(k => k.found).length} / {resume.keywords.length}
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#12131b] border border-white/[0.05] text-slate-300">
              <span className="text-slate-500 mr-1.5">Readiness Boost:</span>
              <span className="font-bold text-[#2475f4]">+{Math.round((resume.atsScore / 100) * 35)} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Parsed Resume Interactive Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2475f4]" />
                <h3 className="text-sm font-bold text-white font-sans">Parsed Resume Preview</h3>
              </div>
              <ProvenanceBadge type="Verified Employer" size="sm" />
            </div>

            {/* Candidate Header */}
            <div className="py-4 border-b border-white/[0.04]">
              <h2 className="text-base font-extrabold text-white font-sans">Alex Chen</h2>
              <p className="text-xs text-[#5ea2ff] font-semibold mt-0.5">
                B.S. in Computer Science & Engineering · GPA 3.88
              </p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {resume.summary}
              </p>
            </div>

            {/* Experiences */}
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                <span>Experience Items</span>
              </div>

              {resume.experiences.map((exp) => (
                <div key={exp.id} className="space-y-2 p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-sans">{exp.role}</span>
                    <span className="text-[11px] text-slate-400">{exp.duration}</span>
                  </div>
                  <div className="text-[11px] text-[#2475f4] font-semibold">{exp.company}</div>

                  <ul className="space-y-2 pt-1">
                    {exp.bullets.map((b) => (
                      <li key={b.id} className="text-xs leading-relaxed text-slate-300 relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-slate-600">
                        <span>{b.status === 'accepted' ? b.proposed : b.status === 'edited' ? b.proposed : b.original}</span>
                        {b.status === 'accepted' && (
                          <span className="inline-block ml-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00c288]/15 text-[#00c288] border border-[#00c288]/30">
                            ✓ Accepted AI Bullet
                          </span>
                        )}
                        {b.status === 'edited' && (
                          <span className="inline-block ml-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2475f4]/15 text-[#5ea2ff] border border-[#2475f4]/30">
                            ✎ Manually Edited
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>Education</span>
              </div>
              <div className="p-3.5 rounded-[18px] bg-[#12131b] border border-white/[0.04] text-xs text-slate-300">
                <div className="font-bold text-white">{resume.education.institution}</div>
                <div className="text-slate-400">{resume.education.degree} ({resume.education.gradYear})</div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Missing ATS Keywords & Human-in-the-Loop Bullet Review (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Missing ATS Keywords Checklist */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 text-[#2475f4]" />
                <h3 className="text-sm font-bold text-white font-sans">ATS Keyword Match Matrix</h3>
              </div>
              <span className="text-xs text-slate-400">
                Calibrated for: <strong className="text-white">{selectedJob.company}</strong>
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Enterprise parsing engines score applicant relevance based on these competencies.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {resume.keywords.map((kw, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-full text-xs border transition-all ${
                    kw.found
                      ? 'bg-[#00c288]/10 border-[#00c288]/20 text-[#00c288]'
                      : 'bg-[#ff5252]/10 border-[#ff5252]/20 text-[#ff7070]'
                  }`}
                >
                  <span className="font-semibold truncate mr-1 ml-1">{kw.keyword}</span>
                  {kw.found ? (
                    <CheckCircle2 className="w-4 h-4 text-[#00c288] flex-shrink-0 mr-0.5" />
                  ) : (
                    <span className="text-[10px] uppercase font-bold text-[#ff5252] flex-shrink-0 mr-1">
                      Missing
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Human-in-the-Loop Bullet Optimization Cards */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#2475f4]" />
                <h3 className="text-sm font-bold text-white font-sans">Human-in-the-Loop Bullet Rewriter</h3>
              </div>
              <ProvenanceBadge type="AI Inferred" size="sm" />
            </div>

            <p className="text-xs text-slate-400">
              Each proposal quantifies business impact and weaves in missing high-weight ATS keywords.
            </p>

            {pendingBullets.map(({ expId, company, bullet }) => (
              <div
                key={bullet.id}
                className="p-5 rounded-[26px] bg-[#12131b] border border-white/[0.05] space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{company}</span>
                  <span className={`px-3 py-1 rounded-full font-bold uppercase text-[10px] border ${
                    bullet.status === 'accepted' ? 'bg-[#00c288]/15 text-[#00c288] border-[#00c288]/30' :
                    bullet.status === 'rejected' ? 'bg-white/[0.06] text-slate-400 border-white/[0.06]' :
                    bullet.status === 'edited' ? 'bg-[#2475f4]/15 text-[#5ea2ff] border-[#2475f4]/30' :
                    'bg-[#ffaa00]/15 text-[#ffaa00] border-[#ffaa00]/30'
                  }`}>
                    {bullet.status === 'pending' ? 'Needs Review' : bullet.status}
                  </span>
                </div>

                {/* Original Bullet */}
                <div className="p-3.5 rounded-[18px] bg-[#181a24] border border-white/[0.04] text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Original Bullet Draft
                  </span>
                  <p className="text-slate-400 line-through decoration-[#ff5252]/50">
                    {bullet.original}
                  </p>
                </div>

                {/* AI Proposed Bullet */}
                <div className="p-4 rounded-[20px] bg-[#1a1f30] border border-[#2475f4]/30 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5ea2ff] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#2475f4]" />
                      Proposed Optimization
                    </span>
                    <span className="text-[10px] text-[#00c288] font-bold">+6% ATS Boost</span>
                  </div>
                  <p className="text-slate-100 font-semibold leading-relaxed">
                    {bullet.proposed}
                  </p>
                  
                  {/* Rationale & Keywords */}
                  <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px]">
                    <span className="text-slate-400 italic">
                      💡 {bullet.rationale}
                    </span>
                    <div className="flex items-center gap-1 flex-wrap">
                      {bullet.keywordsAdded.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full bg-[#2475f4]/20 text-[#5ea2ff] text-[10px] font-bold">
                          +{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Human-in-the-Loop Action Buttons (One UI rounded-full) */}
                <div className="flex items-center justify-end gap-2.5 pt-1 flex-wrap">
                  <button
                    onClick={() => rejectResumeBullet(expId, bullet.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => setEditingBulletInfo({ expId, bullet })}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#5ea2ff] bg-[#2475f4]/15 hover:bg-[#2475f4]/25 border border-[#2475f4]/30 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Manually</span>
                  </button>

                  <button
                    onClick={() => acceptResumeBullet(expId, bullet.id)}
                    disabled={bullet.status === 'accepted'}
                    className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
                      bullet.status === 'accepted'
                        ? 'bg-[#00c288]/20 text-[#00c288] border border-[#00c288]/30 cursor-default'
                        : 'bg-[#00c288] hover:bg-[#00ad7a] text-white'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{bullet.status === 'accepted' ? 'Accepted & Live' : 'Accept & Update Resume'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Manual Edit Modal */}
      {editingBulletInfo && (
        <BulletEditModal
          originalText={editingBulletInfo.bullet.original}
          currentText={editingBulletInfo.bullet.proposed}
          onSave={(newText) => {
            editResumeBullet(editingBulletInfo.expId, editingBulletInfo.bullet.id, newText);
            setEditingBulletInfo(null);
          }}
          onClose={() => setEditingBulletInfo(null)}
        />
      )}
    </div>
  );
};
