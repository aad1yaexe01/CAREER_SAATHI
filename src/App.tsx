import React from 'react';
import { CandidateIntelligenceProvider, useCandidateIntelligence } from './context/CandidateIntelligenceContext';
import { Header } from './components/Header';
import { JobDiscoveryView } from './components/JobDiscovery/JobDiscoveryView';
import { CompanyIntelligenceView } from './components/CompanyIntelligence/CompanyIntelligenceView';
import { ResumeOptimizerView } from './components/ResumeOptimizer/ResumeOptimizerView';
import { SkillGapView } from './components/SkillGap/SkillGapView';
import { InterviewPrepView } from './components/InterviewPrep/InterviewPrepView';
import { ApplicationTrackerView } from './components/ApplicationTracker/ApplicationTrackerView';
import { InstitutionalDashboardView } from './components/InstitutionalDashboard/InstitutionalDashboardView';
import { SarthiChatWidget } from './components/SarthiAssistant/SarthiChatWidget';
import { Sparkles, CheckCircle2, Info, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, notification, clearNotification } = useCandidateIntelligence();

  return (
    <div className="min-h-screen bg-[#0c0d12] text-slate-100 flex flex-col font-sans selection:bg-[#2475f4]/30 selection:text-[#5ea2ff]">
      {/* Global Samsung One UI Header & Navigation */}
      <Header />

      {/* Global Real-time State Notification Toast (Samsung One UI Capsule) */}
      {notification && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 animate-bounce-once max-w-md">
          <div className={`p-4 rounded-[24px] border shadow-2xl backdrop-blur-2xl flex items-start gap-3.5 ${
            notification.type === 'boost'
              ? 'bg-[#181a26]/95 border-[#2475f4]/50 shadow-[0_8px_30px_rgba(36,117,244,0.3)]'
              : notification.type === 'success'
              ? 'bg-[#161822]/95 border-[#00c288]/40 shadow-[0_8px_30px_rgba(0,194,136,0.2)]'
              : 'bg-[#161822]/95 border-white/[0.1]'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
              notification.type === 'boost' ? 'bg-[#2475f4] text-white' :
              notification.type === 'success' ? 'bg-[#00c288] text-white' :
              'bg-white/[0.1] text-slate-300'
            }`}>
              {notification.type === 'boost' ? (
                <Sparkles className="w-4 h-4" />
              ) : notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Info className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 pr-1">
              <div className="text-xs font-bold text-white tracking-tight font-sans">
                {notification.type === 'boost' ? 'Intelligence Synchronized' : 'System Notice'}
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-normal">
                {notification.message}
              </p>
            </div>

            <button
              onClick={clearNotification}
              className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'jobs' && <JobDiscoveryView />}
        {activeTab === 'companies' && <CompanyIntelligenceView />}
        {activeTab === 'resume' && <ResumeOptimizerView />}
        {activeTab === 'skills' && <SkillGapView />}
        {activeTab === 'interviews' && <InterviewPrepView />}
        {activeTab === 'applications' && <ApplicationTrackerView />}
        {activeTab === 'institution' && <InstitutionalDashboardView />}
      </main>

      {/* Global Sarthi AI Assistant Chat Widget */}
      <SarthiChatWidget />

      {/* Minimal Clean Footer */}
      <footer className="mt-auto border-t border-white/[0.05] bg-[#0c0d12] py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300 font-sans">CAREER SATHI</span>
            <span>•</span>
            <span className="text-slate-400">AI Career & Employability Platform</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap justify-center">
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04]">Unified Intelligence Layer</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04]">Candidate Operating System</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04]">Data Provenance Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CandidateIntelligenceProvider>
      <MainLayout />
    </CandidateIntelligenceProvider>
  );
}
