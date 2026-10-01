import React, { useState } from 'react';
import { 
  Crosshair, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Check, 
  Play,
  RotateCcw,
  Layers,
  Award
} from 'lucide-react';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { SkillRadarChart } from './SkillRadarChart';

export const SkillGapView: React.FC = () => {
  const { 
    skills, 
    updateSkillStatus, 
    targetRole, 
    readinessScore, 
    cohortPercentile,
    setActiveTab
  } = useCandidateIntelligence();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = skills.filter(s => 
    activeCategory === 'all' || s.category === activeCategory
  );

  const mustHaves = skills.filter(s => s.importance === 'must_have');
  const niceToHaves = skills.filter(s => s.importance === 'nice_to_have');

  const completedCount = skills.filter(s => s.status === 'completed').length;
  const inProgressCount = skills.filter(s => s.status === 'in_progress').length;

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Samsung One UI Header Banner */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Competency Decomposition & Learning</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Closing gaps dynamically recalculates your match rating and unlocks senior interview questions.
            </p>
          </div>

          {/* Quick Metrics Pills */}
          <div className="flex items-center gap-2.5">
            <div className="px-4 py-2 rounded-full bg-[#12131b] border border-white/[0.06] text-center">
              <span className="text-xs text-slate-400 mr-2">Mastered:</span>
              <span className="text-sm font-bold text-[#00c288]">{completedCount} / {skills.length}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#12131b] border border-white/[0.06] text-center">
              <span className="text-xs text-slate-400 mr-2">In Progress:</span>
              <span className="text-sm font-bold text-[#2475f4]">{inProgressCount}</span>
            </div>
          </div>
        </div>

        {/* Peer / Cohort Benchmarking Bar (Samsung Health Style) */}
        <div className="mt-5 pt-5 border-t border-white/[0.05]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#2475f4]" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Cohort Percentile Benchmark
              </span>
              <ProvenanceBadge type="Aggregated Public Review" size="sm" />
            </div>
            <span className="text-xs font-bold text-[#00c288]">
              Top {100 - cohortPercentile}% of 50 Candidates
            </span>
          </div>

          <div className="relative w-full h-3 rounded-full bg-[#12131b] overflow-hidden p-0.5 border border-white/[0.05]">
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-slate-500 z-10" 
              style={{ left: '50%' }}
              title="Median Benchmark (50%)"
            />
            <div 
              className="h-full rounded-full bg-[#2475f4] transition-all duration-700"
              style={{ width: `${cohortPercentile}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
            <span>25th (Developing)</span>
            <span>50th (Median)</span>
            <span className="text-[#5ea2ff] font-bold">You: {cohortPercentile}th Percentile</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar Chart on Left & Learning Roadmap on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Radar Chart & Must-Have Breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Radar Chart Card */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-[#2475f4]" />
                <h3 className="text-sm font-bold text-white font-sans">Role Competency Radar</h3>
              </div>
              <ProvenanceBadge type="AI Inferred" size="sm" />
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Trajectory: <span className="text-slate-200 font-semibold">{targetRole.split('@')[0]}</span>
            </p>

            <SkillRadarChart skills={skills} />
          </div>

          {/* Must-Have vs Nice-to-Have Highlights */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-sans">Core Requirements Matrix</h3>
              <span className="text-xs text-slate-400">{mustHaves.length} Must-Have</span>
            </div>

            <div className="space-y-3">
              {mustHaves.map(skill => (
                <div key={skill.id} className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{skill.name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      skill.status === 'completed' ? 'bg-[#00c288]/15 text-[#00c288] border border-[#00c288]/30' :
                      skill.status === 'in_progress' ? 'bg-[#2475f4]/15 text-[#5ea2ff] border border-[#2475f4]/30' :
                      'bg-white/[0.06] text-slate-400'
                    }`}>
                      {skill.status === 'completed' ? 'Mastered' : skill.status === 'in_progress' ? 'In Progress' : 'Pending'}
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#1e2230] overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        skill.currentLevel >= skill.requiredLevel ? 'bg-[#00c288]' : 'bg-[#2475f4]'
                      }`}
                      style={{ width: `${skill.currentLevel}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Proficiency: {skill.currentLevel}%</span>
                    <span>Target: {skill.requiredLevel}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Personalized Learning Roadmap with Interactive Status Toggles (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#2475f4]" />
                  <h3 className="text-base font-bold text-white font-sans">Curated Learning Roadmap</h3>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ordered curriculum prioritizing interview fit impact.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {['all', 'Systems & DevOps', 'Frontend', 'Core CS & DSA'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[11px] px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#2475f4] text-white shadow-sm'
                        : 'bg-[#12131b] text-slate-400 hover:text-white border border-white/[0.05]'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Sync reminder banner */}
            <div className="my-4 p-4 rounded-[22px] bg-[#1a1f30] border border-[#2475f4]/30 flex items-center justify-between text-xs text-[#5ea2ff]">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#2475f4] flex-shrink-0" />
                <span>
                  <strong>Dynamic Recalibration:</strong> Marking a skill complete updates your match score and unlocks advanced interview mocks.
                </span>
              </div>
            </div>

            {/* Roadmap Timeline */}
            <div className="space-y-4">
              {filteredSkills.map((skill) => {
                const isComplete = skill.status === 'completed';
                const isInProgress = skill.status === 'in_progress';

                return (
                  <div
                    key={skill.id}
                    className={`p-5 rounded-[26px] border transition-all duration-200 ${
                      isComplete
                        ? 'bg-[#00c288]/[0.05] border-[#00c288]/25'
                        : isInProgress
                        ? 'bg-[#1a1f30] border-[#2475f4]/35'
                        : 'bg-[#12131b] border-white/[0.04]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white font-sans">{skill.name}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            skill.importance === 'must_have'
                              ? 'bg-[#ff5252]/15 text-[#ff7070] border border-[#ff5252]/25'
                              : 'bg-white/[0.06] text-slate-400 border border-white/[0.06]'
                          }`}>
                            {skill.importance === 'must_have' ? 'Critical' : 'Nice-to-Have'}
                          </span>
                          <span className="text-[10px] text-slate-400 bg-white/[0.06] px-2.5 py-0.5 rounded-full">
                            {skill.category}
                          </span>
                        </div>

                        {/* Learning Resource Card */}
                        <div className="p-3.5 rounded-[18px] bg-[#181a24] border border-white/[0.04] flex items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="font-semibold text-slate-200">
                              {skill.learningResource.title}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                              <span>{skill.learningResource.provider}</span>
                              <span>•</span>
                              <span>{skill.learningResource.type}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-slate-300 font-medium">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {skill.learningResource.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Gap Delta Bar */}
                        <div className="flex items-center gap-3 text-xs pt-1">
                          <span className="text-[11px] text-slate-400">Mastery:</span>
                          <div className="flex-1 h-2 rounded-full bg-[#1e2230] overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                isComplete ? 'bg-[#00c288]' : 'bg-[#2475f4]'
                              }`}
                              style={{ width: `${skill.currentLevel}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-300 text-[11px]">
                            {skill.currentLevel}% / {skill.requiredLevel}%
                          </span>
                        </div>
                      </div>

                      {/* Interactive Status Toggle Buttons (One UI rounded-full) */}
                      <div className="flex sm:flex-col items-center gap-2 flex-shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => updateSkillStatus(
                            skill.id, 
                            isComplete ? 'in_progress' : 'completed'
                          )}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap ${
                            isComplete
                              ? 'bg-[#00c288]/20 text-[#00c288] border border-[#00c288]/30 hover:bg-[#00c288]/30'
                              : 'bg-[#00c288] hover:bg-[#00ad7a] text-white'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isComplete ? 'Mastered ✓' : 'Mark Complete'}</span>
                        </button>

                        {!isComplete && (
                          <button
                            onClick={() => updateSkillStatus(skill.id, isInProgress ? 'not_started' : 'in_progress')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                              isInProgress
                                ? 'bg-[#2475f4]/20 text-[#5ea2ff] border border-[#2475f4]/30'
                                : 'text-slate-400 hover:text-white bg-white/[0.06]'
                            }`}
                          >
                            <Play className="w-3 h-3" />
                            <span>{isInProgress ? 'In Progress' : 'Start Lab'}</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
