import React, { useState } from 'react';
import { 
  Compass, 
  Building2, 
  FileText, 
  Crosshair, 
  Mic2, 
  KanbanSquare, 
  GraduationCap, 
  Sparkles, 
  Globe, 
  ChevronDown, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  UserCheck,
  Building,
  ShieldCheck,
  Smartphone,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useCandidateIntelligence } from '../context/CandidateIntelligenceContext';
import { LanguageCode } from '../types/career';
import { SARTHI_KNOWLEDGE } from '../data/mockData';

export const Header: React.FC = () => {
  const {
    persona,
    setPersona,
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    targetRole,
    setTargetRole,
    readinessScore,
    cohortPercentile,
    resume,
    applications
  } = useCandidateIntelligence();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = SARTHI_KNOWLEDGE.translations[language] || SARTHI_KNOWLEDGE.translations.en;

  const tabs = [
    { id: 'jobs', label: 'Job Opportunities', icon: Compass },
    { id: 'companies', label: 'Company Info', icon: Building2 },
    { id: 'resume', label: 'Resume Optimizer', icon: FileText },
    { id: 'skills', label: 'Skill Gap & Learning', icon: Crosshair },
    { id: 'interviews', label: 'Interview Simulator', icon: Mic2 },
    { id: 'applications', label: 'Application Board', icon: KanbanSquare },
    { id: 'institution', label: 'Institutional Center', icon: GraduationCap }
  ];

  const languages: { code: LanguageCode; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'es', label: 'Spanish', native: 'Español' },
    { code: 'fr', label: 'French', native: 'Français' },
    { code: 'de', label: 'German', native: 'Deutsch' }
  ];

  const targetRoles = [
    "Senior Frontend Engineer (Core Platform) @ TechCorp Global",
    "Full-Stack Software Engineer (Cloud Console) @ Google",
    "Frontend Architect (Merchant Experience) @ Stripe",
    "Lead Product Engineer (AI Workspaces) @ InnovateLab"
  ];

  // Current view title for One UI large header
  const getCurrentViewTitle = () => {
    switch (activeTab) {
      case 'jobs': return 'Career Opportunities';
      case 'companies': return 'Company Info';
      case 'resume': return 'Resume Optimization';
      case 'skills': return 'Skill Gap Roadmap';
      case 'interviews': return 'Interview Simulator';
      case 'applications': return 'Application Workflow';
      case 'institution': return 'Institutional Health';
      default: return 'Career Companion';
    }
  };

  const getReadinessStatusText = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Great';
    if (score >= 70) return 'Good';
    return 'Optimizing';
  };

  return (
    <div className="w-full bg-[#0c0d12] border-b border-white/[0.07] transition-all">
      {/* Samsung One UI Top Status App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 border-b border-white/[0.04]">
          
          {/* Brand Logo & One UI badge */}
          <div className="flex items-center gap-2.5">
            <div 
              onClick={() => setActiveTab('jobs')}
              className="w-9 h-9 rounded-2xl bg-[#2475f4] flex items-center justify-center text-white shadow-[0_2px_10px_rgba(36,117,244,0.4)] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <Sparkles className="w-4 h-4 fill-white/20" />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight text-white font-sans">
                CAREER SATHI
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#2475f4]/15 text-[#5ea2ff] border border-[#2475f4]/30">
                AI Platform
              </span>
            </div>
          </div>

          {/* Right Action Controls: Persona Switch & Language */}
          <div className="flex items-center gap-2.5">
            {/* One UI Segmented Switch for Persona */}
            <div className="flex items-center p-1 rounded-full bg-[#181a24] border border-white/[0.06]">
              <button
                onClick={() => {
                  setPersona('candidate');
                  if (activeTab === 'institution') setActiveTab('jobs');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  persona === 'candidate'
                    ? 'bg-[#2475f4] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Candidate</span>
              </button>
              <button
                onClick={() => {
                  setPersona('institution');
                  setActiveTab('institution');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  persona === 'institution'
                    ? 'bg-[#00c288] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Institutional</span>
              </button>
            </div>

            {/* Language Selector Capsule */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181a24] border border-white/[0.06] text-slate-300 hover:bg-[#202330] text-xs font-semibold transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="uppercase text-[11px]">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 top-10 mt-1 w-44 bg-[#1b1e2a] border border-white/[0.08] rounded-2xl shadow-2xl p-1.5 z-50 animate-fade-in">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                    Select Language
                  </div>
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                        language === item.code
                          ? 'bg-[#2475f4] text-white font-bold'
                          : 'text-slate-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <span>{item.native}</span>
                      <span className="text-[10px] uppercase opacity-60">{item.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Samsung One UI "Viewing Area" (Large header with breathing space) */}
        <div className="py-6 sm:py-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2475f4]">
                {persona === 'candidate' ? 'Candidate Operating System' : 'Institutional Admin Console'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="text-xs text-slate-400">Alex Chen</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              {getCurrentViewTitle()}
            </h1>

            {/* Target Role Selector Pill */}
            <div className="relative inline-block pt-1">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#181a24] hover:bg-[#202330] border border-white/[0.07] text-xs font-semibold text-slate-200 transition-all max-w-[360px] sm:max-w-md truncate cursor-pointer"
              >
                <Crosshair className="w-3.5 h-3.5 text-[#2475f4] flex-shrink-0" />
                <span className="truncate">{targetRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0 ml-1" />
              </button>

              {roleMenuOpen && (
                <div className="absolute left-0 top-12 mt-1 w-96 max-w-[90vw] bg-[#1a1d28] border border-white/[0.1] rounded-3xl shadow-2xl p-2 z-50 animate-fade-in">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
                    Target Role Trajectory
                  </div>
                  {targetRoles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setTargetRole(role);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs rounded-2xl transition-all flex items-center justify-between ${
                        targetRole === role 
                          ? 'bg-[#2475f4] text-white font-bold' 
                          : 'text-slate-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="truncate">{role}</span>
                      {targetRole === role && <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Samsung "Device Care" Style Readiness Widget */}
          <div 
            onClick={() => setActiveTab('skills')}
            className="flex items-center gap-4 p-3.5 sm:px-5 sm:py-3.5 rounded-[24px] bg-[#161822] border border-white/[0.07] shadow-lg cursor-pointer hover:border-[#2475f4]/40 hover:bg-[#1b1e2a] transition-all group self-start md:self-auto"
            title="View Employability Diagnostics & Skill Breakdown"
          >
            {/* Circular Progress Gauge */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#222634"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#2475f4"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="125.6"
                  strokeDashoffset={125.6 - (125.6 * readinessScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-white">{readinessScore}</span>
              </div>
            </div>

            {/* Widget Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  {getReadinessStatusText(readinessScore)}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00c288]/15 text-[#00c288] border border-[#00c288]/25">
                  Top {100 - cohortPercentile}%
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5">
                Employability Health
              </span>
              <div className="flex items-center gap-1.5 text-[11px] text-[#2475f4] font-semibold mt-1 group-hover:underline">
                <span>View Full Matrix</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Samsung One UI "Interaction Area": Smooth Horizontal Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none border-t border-white/[0.04]">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isInst = tab.id === 'institution';

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (isInst) setPersona('institution');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? isInst
                      ? 'bg-[#00c288] text-white shadow-[0_2px_12px_rgba(0,194,136,0.35)] scale-[1.02]'
                      : 'bg-[#2475f4] text-white shadow-[0_2px_12px_rgba(36,117,244,0.35)] scale-[1.02]'
                    : 'bg-[#14161f] text-slate-300 hover:bg-[#1e212d] hover:text-white border border-white/[0.05]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {isInst && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-bold ml-0.5">
                    ADMIN
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
