import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Sparkles, 
  ArrowRight, 
  Check, 
  FileText, 
  MessageSquare,
  ShieldCheck,
  Building,
  Briefcase
} from 'lucide-react';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { CohortStudent } from '../../types/career';
import { CounselorModal } from './CounselorModal';

export const InstitutionalDashboardView: React.FC = () => {
  const { 
    cohortStudents, 
    cohortInsights, 
    assignRemedialRoadmap, 
    updateCounselorNotes 
  } = useCandidateIntelligence();

  const [selectedCohort, setSelectedCohort] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudentForNotes, setSelectedStudentForNotes] = useState<CohortStudent | null>(null);

  const filteredStudents = useMemo(() => {
    return cohortStudents.filter(student => {
      const matchesCohort = selectedCohort === 'all' || student.cohort === selectedCohort;
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesSearch = 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.flaggedWeakSpots.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCohort && matchesStatus && matchesSearch;
    });
  }, [cohortStudents, selectedCohort, statusFilter, searchQuery]);

  const avgReadiness = useMemo(() => {
    const sum = cohortStudents.reduce((acc, s) => acc + s.readinessScore, 0);
    return Math.round(sum / cohortStudents.length);
  }, [cohortStudents]);

  const totalApplications = useMemo(() => {
    return cohortStudents.reduce((acc, s) => acc + s.applicationsCount, 0);
  }, [cohortStudents]);

  const atRiskCount = useMemo(() => {
    return cohortStudents.filter(s => s.status === 'At Risk').length;
  }, [cohortStudents]);

  const readyCount = useMemo(() => {
    return cohortStudents.filter(s => s.status === 'Ready').length;
  }, [cohortStudents]);

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Samsung One UI Header Banner */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Institutional Employability Center</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Placement readiness analytics, systemic curriculum insights, and candidate supervision.
            </p>
          </div>

          {/* Interactive Cohort Filter Capsule */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Cohort:</span>
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#12131b] border border-white/[0.08] text-slate-200 focus:outline-none focus:border-[#00c288] cursor-pointer"
            >
              <option value="all">All Cohorts (50 Candidates)</option>
              <option value="Batch 2026 - CS">Batch 2026 - Computer Science</option>
              <option value="Batch 2026 - Data Science">Batch 2026 - Data Science</option>
            </select>
          </div>
        </div>

        {/* 4 Samsung Device Care Style Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/[0.05]">
          <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
            <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>Readiness Index</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#00c288]" />
            </div>
            <div className="text-2xl font-black text-white mt-1 font-sans">{avgReadiness}%</div>
            <div className="text-[11px] text-[#00c288] mt-0.5">+4.2% this quarter</div>
          </div>

          <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
            <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>Active Submissions</span>
              <Briefcase className="w-3.5 h-3.5 text-[#2475f4]" />
            </div>
            <div className="text-2xl font-black text-white mt-1 font-sans">{totalApplications}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Across 42 Tier-1/2 firms</div>
          </div>

          <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
            <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>Placement Ready</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00c288]" />
            </div>
            <div className="text-2xl font-black text-[#00c288] mt-1 font-sans">{readyCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Ready for Drives</div>
          </div>

          <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
            <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
              <span>At-Risk Students</span>
              <AlertTriangle className="w-3.5 h-3.5 text-[#ff5252]" />
            </div>
            <div className="text-2xl font-black text-[#ff5252] mt-1 font-sans">{atRiskCount}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Counselor alerts sent</div>
          </div>
        </div>
      </div>

      {/* AI-Generated Cohort Insights Box */}
      <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#00c288]/15 text-[#00c288] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-sans">Cohort Diagnostics & Recommendations</h3>
              <p className="text-xs text-slate-400">
                Pattern recognition across mock interviews and technical competency gaps.
              </p>
            </div>
          </div>
          <ProvenanceBadge type="AI Inferred" size="sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {cohortInsights.map((insight) => (
            <div 
              key={insight.id} 
              className={`p-5 rounded-[24px] border transition-all flex flex-col justify-between ${
                insight.actionTaken 
                  ? 'bg-[#00c288]/[0.06] border-[#00c288]/25' 
                  : 'bg-[#12131b] border-white/[0.04] hover:border-white/[0.1]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white truncate max-w-[180px] font-sans">{insight.title}</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/[0.06] text-slate-300">
                    {insight.impactMetric}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {insight.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-white/[0.04]">
                <button
                  onClick={() => assignRemedialRoadmap(insight.id)}
                  disabled={insight.actionTaken}
                  className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer ${
                    insight.actionTaken
                      ? 'bg-[#00c288]/20 text-[#00c288] border border-[#00c288]/30 cursor-default'
                      : 'bg-[#00c288] hover:bg-[#00ad7a] text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{insight.actionTaken ? 'Remedial Track Dispatched ✓' : 'Assign Remedial Roadmap'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Counselor Drill-Down View (Searchable Roster) */}
      <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
          <div>
            <h3 className="text-base font-bold text-white font-sans">Cohort Roster Drill-Down</h3>
            <p className="text-xs text-slate-400">
              Supervising {filteredStudents.length} candidate profiles in active placement cycles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {/* Search Capsule */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate name, roll no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-[#12131b] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00c288] w-full sm:w-64"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-[#12131b] border border-white/[0.06] text-xs">
              {['all', 'Ready', 'In Progress', 'At Risk'].map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#00c288] text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st === 'all' ? 'All' : st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Student Table with One UI rounded rows */}
        <div className="overflow-x-auto rounded-[24px] border border-white/[0.06]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#12131b] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-white/[0.06]">
              <tr>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Roll No / Cohort</th>
                <th className="py-3.5 px-4">Readiness</th>
                <th className="py-3.5 px-4">Pipeline</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Gaps</th>
                <th className="py-3.5 px-4 text-right">Guidance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredStudents.slice(0, 15).map((student) => (
                <tr key={student.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1f2230] border border-white/[0.06] text-[#00c288] font-bold flex items-center justify-center text-xs">
                        {student.avatar}
                      </div>
                      <span className="font-bold text-white font-sans">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    <div>{student.rollNo}</div>
                    <div className="text-[10px] text-slate-500">{student.cohort}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white">{student.readinessScore}%</span>
                      <div className="w-16 h-2 rounded-full bg-[#1e2230] overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            student.readinessScore >= 80 ? 'bg-[#00c288]' :
                            student.readinessScore >= 65 ? 'bg-[#2475f4]' : 'bg-[#ff5252]'
                          }`}
                          style={{ width: `${student.readinessScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    <div>{student.applicationsCount} Apps</div>
                    <div className="text-[10px] text-[#00c288]">{student.interviewsCount} Interviews</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                      student.status === 'Ready' ? 'bg-[#00c288]/15 text-[#00c288] border-[#00c288]/30' :
                      student.status === 'In Progress' ? 'bg-[#2475f4]/15 text-[#5ea2ff] border-[#2475f4]/30' :
                      'bg-[#ff5252]/15 text-[#ff7070] border-[#ff5252]/30'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap max-w-xs">
                      {student.flaggedWeakSpots.map((spot, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-[#12131b] text-slate-300 border border-white/[0.04]">
                          {spot}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedStudentForNotes(student)}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-[#00c288]/20 hover:text-[#00c288] border border-white/[0.08] text-xs font-semibold text-slate-300 transition-all cursor-pointer"
                    >
                      Notes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>Displaying 15 of {filteredStudents.length} candidate profiles</span>
          <span>Cohort Data Synchronized</span>
        </div>
      </div>

      {/* Counselor Notes Modal */}
      {selectedStudentForNotes && (
        <CounselorModal
          student={selectedStudentForNotes}
          onSave={(notes) => {
            updateCounselorNotes(selectedStudentForNotes.id, notes);
            setSelectedStudentForNotes(null);
          }}
          onClose={() => setSelectedStudentForNotes(null)}
        />
      )}
    </div>
  );
};
