import React, { useState, useEffect } from 'react';
import { 
  Mic2, 
  MicOff, 
  Play, 
  Square, 
  Clock, 
  Sparkles, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Volume2, 
  RotateCcw,
  Send,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { MockInterviewQuestion, MockInterviewResult } from '../../types/career';

export const InterviewPrepView: React.FC = () => {
  const { 
    mockQuestions, 
    mockResults, 
    submitMockInterviewAnswer, 
    targetRole 
  } = useCandidateIntelligence();

  const [activeQuestionId, setActiveQuestionId] = useState<string>(mockQuestions[0]?.id || 'q-1');
  const [candidateAnswerText, setCandidateAnswerText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [latestFeedback, setLatestFeedback] = useState<MockInterviewResult | null>(
    mockResults[0] || null
  );

  const activeQuestion = mockQuestions.find(q => q.id === activeQuestionId) || mockQuestions[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (!candidateAnswerText.trim()) {
        setCandidateAnswerText("In my prior frontend architecture project, I engineered an optimistic state reconciliation queue. To prevent cache stampedes, we implemented exponential backoff and stale-while-revalidate headers, slashing our p99 latency by 35% across 400,000 monthly active users.");
      }
    } else {
      setIsRecording(true);
      setRecordingSeconds(0);
    }
  };

  const handleEvaluate = () => {
    if (!candidateAnswerText.trim()) return;
    const result = submitMockInterviewAnswer(activeQuestion.id, candidateAnswerText);
    setLatestFeedback(result);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const prepSchedule = [
    { day: "Day 1-2", title: "Architecture & State Invariants", focus: "React 19 fiber reconciliation, custom hook encapsulation, suspense boundaries." },
    { day: "Day 3-4", title: "High-Throughput Web Performance", focus: "Core Web Vitals telemetry, bundle splitting, memory leak debugging via DevTools." },
    { day: "Day 5-6", title: "System Design & Edge Caching", focus: "Distributed frontends, CDN caching headers, WebSocket reconnect queues." },
    { day: "Day 7", title: "Behavioral STAR Simulation", focus: "Constructive conflict resolution, technical trade-offs, cross-functional impact." }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Samsung One UI Header Banner */}
      <div className="p-6 sm:p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-sans">Interview Simulator & STAR Coach</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Practice questions tailored to {targetRole.split('@')[0]} with sub-second delivery analytics.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="px-4 py-2 rounded-full bg-[#12131b] border border-white/[0.06] text-center">
              <span className="text-xs text-slate-400 mr-2">Sessions:</span>
              <span className="text-sm font-bold text-white">{mockResults.length}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-[#12131b] border border-white/[0.06] text-center">
              <span className="text-xs text-slate-400 mr-2">Average Score:</span>
              <span className="text-sm font-bold text-[#00c288]">
                {mockResults.length > 0 
                  ? Math.round(mockResults.reduce((a, b) => a + b.contentScore, 0) / mockResults.length) 
                  : 85}%
              </span>
            </div>
          </div>
        </div>

        {/* 7-Day Sprint Roadmap */}
        <div className="mt-5 pt-5 border-t border-white/[0.05]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#5ea2ff] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#2475f4]" />
              7-Day Sprint Milestones
            </span>
            <ProvenanceBadge type="AI Inferred" size="sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {prepSchedule.map((item, idx) => (
              <div key={idx} className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04] text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2475f4]">{item.day}</span>
                  <span className="text-[10px] text-slate-500">Milestone</span>
                </div>
                <div className="font-bold text-white">{item.title}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Simulator Column: AI Interviewer & Question Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Question Selector List */}
          <div className="p-6 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Scenarios ({mockQuestions.length})
            </h3>
            <div className="space-y-2">
              {mockQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setActiveQuestionId(q.id);
                    setCandidateAnswerText('');
                  }}
                  className={`w-full text-left p-4 rounded-[22px] text-xs transition-all border cursor-pointer ${
                    activeQuestionId === q.id
                      ? 'bg-[#2475f4] text-white border-transparent shadow-md'
                      : 'bg-[#12131b] text-slate-300 border-white/[0.04] hover:bg-[#181a24]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-bold ${activeQuestionId === q.id ? 'text-white' : 'text-[#5ea2ff]'}`}>
                      {q.type}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      activeQuestionId === q.id ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <p className={`line-clamp-2 ${activeQuestionId === q.id ? 'text-white/90 font-medium' : 'text-slate-300'}`}>
                    {q.question}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* AI Interviewer Avatar & Sound Waveform Panel */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg text-center space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Simulated AI Interviewer
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#00c288] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#00c288] animate-pulse" />
                Live Session
              </span>
            </div>

            {/* Glowing Avatar */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#2475f4] flex items-center justify-center shadow-[0_4px_24px_rgba(36,117,244,0.5)]">
                <Volume2 className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-[#2475f4]/40 animate-ping opacity-25" />
            </div>

            {/* Active Question Prompt */}
            <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04] text-left">
              <div className="text-[10px] uppercase font-bold text-[#5ea2ff] tracking-wider mb-1">
                {activeQuestion.companyContext}
              </div>
              <p className="text-sm font-semibold text-white leading-relaxed">
                "{activeQuestion.question}"
              </p>
            </div>

            {/* Audio Waveform Simulator */}
            <div className="p-4 rounded-full bg-[#12131b] border border-white/[0.04] flex items-center justify-center gap-1.5 h-12 max-w-xs mx-auto">
              <div className={`w-1.5 bg-[#2475f4] rounded-full ${isRecording ? 'animate-wave-1' : 'h-2'}`} />
              <div className={`w-1.5 bg-[#00c288] rounded-full ${isRecording ? 'animate-wave-2' : 'h-3'}`} />
              <div className={`w-1.5 bg-[#2475f4] rounded-full ${isRecording ? 'animate-wave-3' : 'h-2'}`} />
              <div className={`w-1.5 bg-[#5ea2ff] rounded-full ${isRecording ? 'animate-wave-4' : 'h-4'}`} />
              <div className={`w-1.5 bg-[#2475f4] rounded-full ${isRecording ? 'animate-wave-5' : 'h-2'}`} />
              <div className={`w-1.5 bg-[#00c288] rounded-full ${isRecording ? 'animate-wave-1' : 'h-3'}`} />
            </div>
            
            <div className="text-xs text-slate-400">
              {isRecording ? `Recording Voice (${formatTime(recordingSeconds)})` : "Awaiting your response"}
            </div>
          </div>

        </div>

        {/* Right Simulator Column: Candidate Response & Real-Time Feedback (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Candidate Response Workspace */}
          <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic2 className="w-4 h-4 text-[#2475f4]" />
                <h3 className="text-sm font-bold text-white font-sans">Your Structured Answer</h3>
              </div>
              
              <button
                onClick={toggleRecording}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-[#ff5252] text-white animate-pulse shadow-md'
                    : 'bg-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.1]'
                }`}
              >
                {isRecording ? <Square className="w-3.5 h-3.5" /> : <Mic2 className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Stop Recording' : 'Voice Input'}</span>
              </button>
            </div>

            <textarea
              value={candidateAnswerText}
              onChange={(e) => setCandidateAnswerText(e.target.value)}
              rows={5}
              placeholder="Speak or type your structured STAR response here... Highlight problem context, architecture actions, and quantifiable results."
              className="w-full p-4 rounded-[22px] bg-[#12131b] border border-white/[0.08] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#2475f4] leading-relaxed"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Words: {candidateAnswerText.trim() ? candidateAnswerText.trim().split(/\s+/).length : 0}</span>
                <span>•</span>
                <span>Ideal: 80 - 150 words</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setCandidateAnswerText("In my previous internship at Aether Dynamics, our analytics dashboard experienced high user complaints due to sluggish interactions on mobile browsers. I initiated a profiling sprint using Chrome Performance DevTools and discovered that our main bundle was over 4.8MB due to un-tree-shaken visualization libraries. I re-architected the imports with dynamic lazy loading, implemented React 18 Suspense boundaries, and configured Brotli compression. As a direct result, Largest Contentful Paint dropped from 3.6 seconds to 1.3 seconds, reducing bounce rate by 22% over 250,000 monthly sessions.")}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-slate-400 hover:text-white bg-white/[0.04] transition-colors"
                >
                  Insert Sample STAR
                </button>
                <button
                  onClick={handleEvaluate}
                  disabled={!candidateAnswerText.trim()}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#2475f4] hover:bg-[#1e65db] disabled:opacity-40 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Evaluate Response</span>
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Post-Answer Feedback Report */}
          {latestFeedback && (
            <div className="p-7 rounded-[32px] bg-[#161822] border border-white/[0.06] shadow-lg space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#2475f4]" />
                  <div>
                    <h3 className="text-base font-bold text-white font-sans">Evaluation & Delivery Telemetry</h3>
                    <div className="text-[11px] text-slate-400">{latestFeedback.timestamp}</div>
                  </div>
                </div>
                <ProvenanceBadge type="AI-Generated Feedback - Advisory Only" />
              </div>

              {/* Samsung Device Care Score Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04] text-center">
                  <div className="text-xs text-slate-400 font-medium">Content Score</div>
                  <div className="text-2xl font-black text-[#00c288] mt-0.5">
                    {latestFeedback.contentScore}%
                  </div>
                  <div className="text-[10px] text-slate-500">Tier-1 Benchmark Met</div>
                </div>

                <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04] text-center">
                  <div className="text-xs text-slate-400 font-medium">Speaking Cadence</div>
                  <div className="text-2xl font-black text-[#2475f4] mt-0.5">
                    {latestFeedback.deliverySignals.pacingWpm} <span className="text-xs font-normal">WPM</span>
                  </div>
                  <div className="text-[10px] text-[#00c288]">Optimal Pace</div>
                </div>

                <div className="p-4 rounded-[22px] bg-[#12131b] border border-white/[0.04] text-center">
                  <div className="text-xs text-slate-400 font-medium">Filler Word Count</div>
                  <div className="text-2xl font-black text-[#ffaa00] mt-0.5">
                    {latestFeedback.deliverySignals.fillerWordsCount}
                  </div>
                  <div className="text-[10px] text-slate-500">Minimal Hesitations</div>
                </div>
              </div>

              {/* STAR Breakdown */}
              {latestFeedback.starAdherence && (
                <div className="p-5 rounded-[24px] bg-[#12131b] border border-white/[0.04] space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>STAR Method Breakdown</span>
                    <span className="text-[#5ea2ff] font-extrabold">{latestFeedback.starAdherence.score}% Adherence</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-[18px] bg-[#181a24] border border-white/[0.04]">
                      <span className="font-bold text-[#5ea2ff] block mb-0.5">[S] Situation:</span>
                      <p className="text-slate-300">{latestFeedback.starAdherence.situation}</p>
                    </div>
                    <div className="p-3 rounded-[18px] bg-[#181a24] border border-white/[0.04]">
                      <span className="font-bold text-[#5ea2ff] block mb-0.5">[T] Task:</span>
                      <p className="text-slate-300">{latestFeedback.starAdherence.task}</p>
                    </div>
                    <div className="p-3 rounded-[18px] bg-[#181a24] border border-white/[0.04]">
                      <span className="font-bold text-[#5ea2ff] block mb-0.5">[A] Action:</span>
                      <p className="text-slate-300">{latestFeedback.starAdherence.action}</p>
                    </div>
                    <div className="p-3 rounded-[18px] bg-[#181a24] border border-white/[0.04]">
                      <span className="font-bold text-[#00c288] block mb-0.5">[R] Result:</span>
                      <p className="text-slate-300">{latestFeedback.starAdherence.result}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Evaluator Key Takeaway */}
              <div className="p-4 rounded-[20px] bg-[#1a1f30] border border-[#2475f4]/30 flex items-start gap-3 text-xs">
                <Sparkles className="w-4 h-4 text-[#2475f4] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#5ea2ff]">Evaluator Takeaway: </span>
                  <span className="text-slate-200">{latestFeedback.keyTakeaway}</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
