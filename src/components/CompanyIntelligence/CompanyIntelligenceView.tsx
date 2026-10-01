import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Award,
  ChevronRight,
  Flame,
  ThumbsUp
} from 'lucide-react';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { CompanyProfile } from '../../types/career';

export const CompanyIntelligenceView: React.FC = () => {
  const { companies, setActiveTab } = useCandidateIntelligence();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('comp-techcorp');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Samsung One UI Search & Company Ribbon */}
      <div className="p-6 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white font-sans">Company Info</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified hiring anatomy, interview pipelines, and mined employee feedback.
            </p>
          </div>

          {/* Search Capsule */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search employers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#12131b] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2475f4]"
            />
          </div>
        </div>

        {/* Company Selector Ribbon (One UI rounded-full pills) */}
        <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {filteredCompanies.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCompanyId(c.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCompanyId === c.id
                  ? 'bg-[#2475f4] text-white shadow-md'
                  : 'bg-[#12131b] text-slate-300 hover:text-white border border-white/[0.05]'
              }`}
            >
              <span>{c.logo}</span>
              <span>{c.name}</span>
              {c.verified && (
                <ShieldCheck className={`w-3.5 h-3.5 ${selectedCompanyId === c.id ? 'text-white' : 'text-[#00c288]'}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Company Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Overview, Culture & Hiring Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Card with [Verified Employer] */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[24px] bg-[#1f2230] border border-white/[0.06] flex items-center justify-center text-3xl shadow-inner">
                  {activeCompany.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-2xl font-bold text-white tracking-tight font-sans">{activeCompany.name}</h2>
                    {activeCompany.verified ? (
                      <ProvenanceBadge type="Verified Employer" />
                    ) : (
                      <ProvenanceBadge type="Aggregated Public Review" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 flex-wrap">
                    <span className="text-slate-200 font-semibold">{activeCompany.industry}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {activeCompany.headquarters}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      {activeCompany.size}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('interviews')}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2475f4] hover:bg-[#1e65db] text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
              >
                <span>Launch Interview for {activeCompany.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Overview text */}
            <div className="pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Company Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeCompany.overview}
              </p>
            </div>
          </div>

          {/* Culture & Perks with [Aggregated Public Review] */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-bold text-white font-sans">Culture & Employee Perks</h3>
                <ProvenanceBadge type="Aggregated Public Review" />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#00c288] font-bold bg-[#00c288]/15 px-3 py-1 rounded-full border border-[#00c288]/25">
                <ThumbsUp className="w-3 h-3" />
                <span>4.5 / 5 Rating</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4 p-4 rounded-[20px] bg-[#12131b] border border-white/[0.04]">
              {activeCompany.cultureSummary}
            </p>

            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Verified Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeCompany.perks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200 p-3 rounded-[18px] bg-[#12131b] border border-white/[0.04]">
                  <CheckCircle2 className="w-4 h-4 text-[#00c288] flex-shrink-0" />
                  <span className="font-medium">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Hiring Pipeline with [AI Inferred] */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-bold text-white font-sans">Hiring Pipeline & Evaluation Stages</h3>
                <ProvenanceBadge type="AI Inferred" />
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {activeCompany.hiringPipeline.length} Rounds
              </span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#222634]">
              {activeCompany.hiringPipeline.map((step) => (
                <div key={step.step} className="relative flex items-start gap-4 pl-1">
                  <div className="w-8 h-8 rounded-full bg-[#2475f4] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 z-10 shadow-md">
                    {step.step}
                  </div>
                  <div className="flex-1 p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04]">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                      <h4 className="text-xs font-bold text-white">{step.title}</h4>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold bg-white/[0.06] px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-2 leading-relaxed">{step.description}</p>
                    <div className="p-3 rounded-[16px] bg-[#1a1f30] border border-[#2475f4]/30 text-[11px] text-[#5ea2ff] flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#2475f4] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">Preparation Strategy: </span>
                        <span>{step.preparationTip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Interview Experience Mining */}
        <div className="space-y-6">
          
          {/* Trends & Topic Weights */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white font-sans">Interview Topic Weights</h3>
              <ProvenanceBadge type="AI Inferred" size="sm" />
            </div>

            <div className="space-y-4">
              {activeCompany.interviewTrends.topTopics.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-200 font-medium">{item.topic}</span>
                    <span className="text-[#2475f4] font-bold">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#12131b] overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-[#2475f4]"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/[0.06]">
              <div className="p-3.5 rounded-[20px] bg-[#12131b] border border-white/[0.04] text-center">
                <div className="text-[11px] text-slate-400 font-medium">Difficulty Level</div>
                <div className="text-xl font-black text-[#ffaa00] mt-0.5">
                  {activeCompany.interviewTrends.difficultyScore} / 5.0
                </div>
                <div className="text-[10px] text-slate-500">Above Average</div>
              </div>
              <div className="p-3.5 rounded-[20px] bg-[#12131b] border border-white/[0.04] text-center">
                <div className="text-[11px] text-slate-400 font-medium">Candidate Sentiment</div>
                <div className="text-xl font-black text-[#00c288] mt-0.5">
                  {activeCompany.interviewTrends.sentimentScore}%
                </div>
                <div className="text-[10px] text-slate-500">Positive Experience</div>
              </div>
            </div>
          </div>

          {/* Candidate Experience Quotes */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#2475f4]" />
                <h3 className="text-sm font-bold text-white font-sans">Candidate Debriefs</h3>
              </div>
              <ProvenanceBadge type="Aggregated Public Review" size="sm" />
            </div>

            <div className="space-y-3">
              {activeCompany.interviewTrends.candidateQuotes.map((quote, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-[20px] bg-[#12131b] border border-white/[0.04] text-xs text-slate-300 italic relative leading-relaxed"
                >
                  "{quote}"
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
