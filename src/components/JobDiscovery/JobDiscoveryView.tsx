import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  ChevronRight, 
  Filter, 
  SlidersHorizontal,
  CheckCircle2, 
  ArrowUpRight, 
  Building2, 
  Zap, 
  Info,
  Briefcase
} from 'lucide-react';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';
import { JobOpportunity, FitClassification } from '../../types/career';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { MatchExplanationModal } from './MatchExplanationModal';

export const JobDiscoveryView: React.FC = () => {
  const { jobs, setActiveTab, applyForJob } = useCandidateIntelligence();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFit, setSelectedFit] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobOpportunity | null>(null);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFit = selectedFit === 'all' || job.fitClassification === selectedFit;
      
      const matchesLocation = 
        selectedLocation === 'all' || 
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesFit && matchesLocation;
    });
  }, [jobs, searchQuery, selectedFit, selectedLocation]);

  const fitCounts = useMemo(() => {
    return {
      all: jobs.length,
      'Safe Fit': jobs.filter(j => j.fitClassification === 'Safe Fit').length,
      'Stretch': jobs.filter(j => j.fitClassification === 'Stretch').length,
      'Reach': jobs.filter(j => j.fitClassification === 'Reach').length
    };
  }, [jobs]);

  const getFitBadge = (fit: FitClassification) => {
    switch (fit) {
      case 'Safe Fit':
        return 'bg-[#00c288]/15 text-[#00c288] border-[#00c288]/30';
      case 'Stretch':
        return 'bg-[#ffaa00]/15 text-[#ffaa00] border-[#ffaa00]/30';
      case 'Reach':
        return 'bg-[#ff5252]/15 text-[#ff5252] border-[#ff5252]/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Samsung One UI Search & Filter Capsule Bar */}
      <div className="p-6 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* One UI Search Capsule */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roles, companies, or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-[#12131b] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2475f4] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Fit Filter Pills (Samsung One UI style) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 sm:pb-0">
            {[
              { id: 'all', label: `All (${fitCounts.all})` },
              { id: 'Safe Fit', label: `Safe Fit (${fitCounts['Safe Fit']})` },
              { id: 'Stretch', label: `Stretch (${fitCounts['Stretch']})` },
              { id: 'Reach', label: `Reach (${fitCounts['Reach']})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFit(tab.id)}
                className={`text-xs px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedFit === tab.id
                    ? 'bg-[#2475f4] text-white shadow-md'
                    : 'bg-[#12131b] text-slate-400 hover:text-slate-200 border border-white/[0.05]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Location Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="text-xs px-4 py-2.5 rounded-full bg-[#12131b] border border-white/[0.08] text-slate-300 focus:outline-none focus:border-[#2475f4] cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="San Francisco">San Francisco, CA</option>
              <option value="New York">New York, NY</option>
              <option value="Sunnyvale">Sunnyvale, CA</option>
              <option value="Austin">Austin, TX</option>
            </select>
          </div>

        </div>
      </div>

      {/* Role Cards Feed in Samsung One UI grouped surface cards */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center rounded-[32px] bg-[#161822] border border-white/[0.06]">
            <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No matching positions found</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filter parameters or query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFit('all'); setSelectedLocation('all'); }}
              className="mt-4 px-5 py-2.5 rounded-full bg-[#2475f4] text-xs font-semibold text-white cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group p-6 sm:p-7 rounded-[32px] bg-[#161822] hover:bg-[#1b1e2a] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200 shadow-md hover:shadow-xl"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left Side: Company Info & Details */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-[22px] bg-[#1f2230] border border-white/[0.06] flex items-center justify-center text-3xl flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                    {job.companyLogo}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-lg font-bold text-white tracking-tight group-hover:text-[#5ea2ff] transition-colors font-sans">
                        {job.title}
                      </h2>
                      <span className={`text-xs px-3 py-1 rounded-full font-bold border ${getFitBadge(job.fitClassification)}`}>
                        {job.fitClassification}
                      </span>
                      <ProvenanceBadge type={job.provenance} />
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                      <span className="font-semibold text-slate-200">{job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[#00c288] font-bold">
                        <DollarSign className="w-3.5 h-3.5" />
                        {job.salary}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        {job.postedDate}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 max-w-3xl leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skill Overlap Chips */}
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      {job.overlaps.slice(0, 3).map((overlap, idx) => (
                        <span key={idx} className="text-[11px] px-3 py-1 rounded-full bg-[#00c288]/10 text-[#00c288] border border-[#00c288]/20 font-semibold">
                          ✓ {overlap}
                        </span>
                      ))}
                      {job.gaps.length > 0 && (
                        <span className="text-[11px] px-3 py-1 rounded-full bg-[#ffaa00]/10 text-[#ffaa00] border border-[#ffaa00]/20 font-semibold">
                          ⚠ Gap: {job.gaps[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: One UI Match Score Meter & Action Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-white/[0.06]">
                  {/* Match Score Meter */}
                  <div 
                    onClick={() => setSelectedJobForModal(job)}
                    className="p-3.5 rounded-[22px] bg-[#12131b] border border-white/[0.06] hover:border-[#2475f4]/40 cursor-pointer transition-all w-full sm:w-56"
                    title="Click for full explainability breakdown"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-300">Candidate Match</span>
                      <span className={`font-black text-sm ${
                        job.matchScore >= 80 ? 'text-[#00c288]' :
                        job.matchScore >= 65 ? 'text-[#ffaa00]' : 'text-[#ff5252]'
                      }`}>
                        {job.matchScore}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#1e2230] overflow-hidden p-0.5">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          job.matchScore >= 80 ? 'bg-[#00c288]' :
                          job.matchScore >= 65 ? 'bg-[#ffaa00]' : 'bg-[#ff5252]'
                        }`}
                        style={{ width: `${job.matchScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5">
                      <span>Explainability breakdown</span>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  {/* One UI Pill Buttons */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedJobForModal(job)}
                      className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-300 bg-white/[0.06] hover:bg-white/[0.1] transition-colors flex-1 sm:flex-initial cursor-pointer"
                    >
                      Explain Match
                    </button>
                    <button
                      onClick={() => applyForJob(job)}
                      className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#2475f4] hover:bg-[#1e65db] shadow-md transition-all flex-1 sm:flex-initial cursor-pointer"
                    >
                      <span>Apply & Track</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Match Explanation Modal */}
      {selectedJobForModal && (
        <MatchExplanationModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
        />
      )}
    </div>
  );
};
