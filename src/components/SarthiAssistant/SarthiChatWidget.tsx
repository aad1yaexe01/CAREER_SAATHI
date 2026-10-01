import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Mic2, 
  MicOff, 
  User, 
  Code2, 
  Globe, 
  Bot, 
  RotateCcw,
  ChevronDown,
  Minimize2,
  Maximize2,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useCandidateIntelligence } from '../../context/CandidateIntelligenceContext';
import { ProvenanceBadge } from '../common/ProvenanceBadge';
import { SARTHI_KNOWLEDGE } from '../../data/mockData';
import { LanguageCode, ChatMessage } from '../../types/career';

export const SarthiChatWidget: React.FC = () => {
  const { 
    activeTab, 
    readinessScore, 
    resume, 
    targetRole, 
    language, 
    setLanguage 
  } = useCandidateIntelligence();

  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState<'candidate' | 'developer'>('candidate');
  const [inputText, setInputText] = useState('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      mode: 'candidate',
      text: "Hello Alex! I am **Sarthi**, your personal career companion. I have synced with your target role (**TechCorp Global**) and your **84/100 Readiness Score**. How can I assist you right now?",
      timestamp: "Just now",
      attribution: "AI Inferred",
      quickChips: [
        "How can I improve my ATS score?",
        "What are my top 3 skill gaps?",
        "Draft a cover letter for my target role"
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const candidateChips = [
    "How can I improve my ATS score for Google?",
    "What are my top 3 skill gaps?",
    "Draft a cover letter for my target role"
  ];

  const developerChips = [
    "Explain candidate intelligence state model",
    "How is match score calculated?",
    "Show API schema for jobs feed"
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      mode: chatMode,
      text: query,
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let botReply = "";
      let attribution: any = chatMode === 'developer' ? 'System Tech Docs' : 'AI Inferred';
      const qLower = query.toLowerCase();

      const isHindi = /[\u0900-\u097F]/.test(query) || language === 'hi';
      const isOdia = /[\u0B00-\u0B7F]/.test(query) || language === 'or';
      const isSpanish = /cómo|mejorar|puesto|habilidades|carta/i.test(query) || language === 'es';
      const isFrench = /comment|améliorer|compétences|lettre/i.test(query) || language === 'fr';
      const isGerman = /wie|lebenslauf|fähigkeiten|anschreiben/i.test(query) || language === 'de';

      if (chatMode === 'developer') {
        if (qLower.includes('state') || qLower.includes('model') || qLower.includes('context')) {
          botReply = SARTHI_KNOWLEDGE.developerAdvice.stateModel;
        } else if (qLower.includes('match') || qLower.includes('calculate') || qLower.includes('formula')) {
          botReply = SARTHI_KNOWLEDGE.developerAdvice.matchFormula;
        } else if (qLower.includes('api') || qLower.includes('schema') || qLower.includes('feed')) {
          botReply = SARTHI_KNOWLEDGE.developerAdvice.apiSchema;
        } else {
          botReply = "### Architecture Overview\nCAREER SATHI operates on an atomic **Candidate-Intelligence Layer** (`CandidateIntelligenceContext`). State changes synchronously update all views: Job Opportunities, Resume Optimizer, Skill Roadmap, and Institutional Center. All data provenance is strictly tagged.";
        }
      } else {
        if (isHindi) {
          if (qLower.includes('ats') || qLower.includes('स्कोर') || qLower.includes('resume')) {
            botReply = "एटीएस (ATS) स्कोर को 90%+ करने के लिए: 1) अपने रेज़्यूमे में 'Docker' और 'System Design' कीवर्ड जोड़ें। 2) अपने Aether Dynamics प्रोजेक्ट के बुलेट पॉइंट में मात्रात्मक परिणाम शामिल करें।";
          } else {
            botReply = `नमस्ते एलेक्स! आपकी वर्तमान रोजगार तत्परता ${readinessScore}/100 है। टेककॉर्प (TechCorp) के लिए 'Docker' पूरा करने से आपका मैच स्कोर सीधे 95% तक पहुँच जाएगा!`;
          }
        } else if (isOdia) {
          botReply = `ନମସ୍କାର ଆଲେକ୍ସ! ଆପଣଙ୍କର ସାମଗ୍ରିକ ନିଯୁକ୍ତି ପ୍ରସ୍ତୁତି ସ୍କୋର ଏବେ ${readinessScore}/100 ଅଛି। TechCorp ଏବଂ Google ପାଇଁ ଆପଣଙ୍କର Docker ଏବଂ WebSockets କୁ ପ୍ରାଥମିକତା ଦିଅନ୍ତୁ।`;
        } else if (isSpanish) {
          botReply = `¡Hola Alex! Tu índice de preparación actual es de ${readinessScore}/100. Para optimizar tu perfil para TechCorp, te recomiendo completar el módulo de 'Docker' y aprobar los cambios sugeridos.`;
        } else if (isFrench) {
          botReply = `Bonjour Alex ! Votre score d'employabilité actuel est de ${readinessScore}/100. Complétez le module Docker pour maximiser votre compatibilité avec TechCorp.`;
        } else if (isGerman) {
          botReply = `Hallo Alex! Dein Beschäftigungsbereitschafts-Score liegt bei ${readinessScore}/100. Schließe das Docker-Modul ab, um deine Passgenauigkeit bei TechCorp auf 95% zu steigern.`;
        } else {
          if (qLower.includes('ats') || qLower.includes('resume') || qLower.includes('improve')) {
            botReply = SARTHI_KNOWLEDGE.candidateAdvice.atsImprovement;
          } else if (qLower.includes('gap') || qLower.includes('skill')) {
            botReply = SARTHI_KNOWLEDGE.candidateAdvice.skillGaps;
          } else if (qLower.includes('cover') || qLower.includes('letter')) {
            botReply = SARTHI_KNOWLEDGE.candidateAdvice.coverLetter;
          } else {
            botReply = `You are currently viewing **${activeTab.toUpperCase()}** with target role **${targetRole.split('@')[0]}**. Your readiness score is **${readinessScore}/100**. Would you like me to walk you through your high-impact action items?`;
          }
        }
      }

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        mode: chatMode,
        text: botReply,
        timestamp: "Just now",
        attribution,
        quickChips: chatMode === 'candidate' ? candidateChips : developerChips
      };

      setMessages(prev => [...prev, assistantMsg]);
    }, 600);
  };

  const handleVoiceToggle = () => {
    if (isVoiceRecording) {
      setIsVoiceRecording(false);
      setInputText("How can I improve my ATS score for Google?");
    } else {
      setIsVoiceRecording(true);
      setTimeout(() => {
        setIsVoiceRecording(false);
        setInputText("What are my top 3 skill gaps?");
      }, 2500);
    }
  };

  return (
    <>
      {/* Samsung One UI Floating Action Pill (FAB) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#2475f4] hover:bg-[#1e65db] text-white shadow-[0_8px_25px_rgba(36,117,244,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          title="Open Sarthi AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00c288] animate-ping" />
          </div>
          <span className="font-extrabold text-sm tracking-tight font-sans">
            Sarthi
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">
            {chatMode === 'candidate' ? 'Companion' : 'Dev'}
          </span>
        </button>
      )}

      {/* Samsung One UI Drawer / Sheet Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[440px] h-[600px] max-h-[85vh] flex flex-col bg-[#161822] border border-white/[0.08] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden animate-fade-in">
          
          {/* Header with Segmented Mode Switcher & Language */}
          <div className="p-4 bg-[#12131b] border-b border-white/[0.06] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#2475f4] flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white font-sans">Sarthi Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-[#00c288]" />
                  </div>
                  <p className="text-[10px] text-slate-400">
                    Multilingual Career Intelligence
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#181a24] border border-white/[0.08] text-slate-300 focus:outline-none"
                >
                  <option value="en">EN</option>
                  <option value="hi">हिन्दी</option>
                  <option value="or">ଓଡ଼ିଆ</option>
                  <option value="es">ES</option>
                  <option value="fr">FR</option>
                  <option value="de">DE</option>
                </select>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Segmented Mode Switcher (One UI pill switch) */}
            <div className="grid grid-cols-2 p-1 rounded-full bg-[#181a24] border border-white/[0.06] text-xs">
              <button
                onClick={() => setChatMode('candidate')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  chatMode === 'candidate'
                    ? 'bg-[#2475f4] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Candidate</span>
              </button>

              <button
                onClick={() => setChatMode('developer')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
                  chatMode === 'developer'
                    ? 'bg-[#2475f4] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Developer</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.attribution && (
                  <div className="mb-1">
                    <ProvenanceBadge type={msg.attribution} size="sm" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#2475f4] text-white rounded-[22px] rounded-br-[4px] shadow-sm font-medium'
                      : 'bg-[#12131b] border border-white/[0.06] text-slate-200 rounded-[22px] rounded-bl-[4px]'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>

                {/* Quick Chips */}
                {msg.quickChips && msg.sender === 'assistant' && (
                  <div className="flex items-center gap-1.5 flex-wrap mt-2 max-w-full">
                    {msg.quickChips.map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(chip)}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-[#1b1e2a] hover:bg-[#222634] border border-white/[0.08] text-[#5ea2ff] font-semibold transition-all text-left truncate max-w-full cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input Animation Banner */}
          {isVoiceRecording && (
            <div className="px-4 py-2 bg-[#1a1f30] border-t border-[#2475f4]/30 flex items-center justify-between text-xs text-[#5ea2ff] animate-pulse">
              <div className="flex items-center gap-2">
                <Mic2 className="w-4 h-4 text-[#2475f4]" />
                <span>Listening in {language.toUpperCase()}...</span>
              </div>
              <span className="text-[10px] text-slate-400">Tap mic to send</span>
            </div>
          )}

          {/* Input Footer in Samsung One UI capsule format */}
          <div className="p-3 bg-[#12131b] border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceToggle}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isVoiceRecording
                    ? 'bg-[#ff5252] text-white animate-pulse'
                    : 'bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1]'
                }`}
                title="Voice Input"
              >
                <Mic2 className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder={
                  chatMode === 'developer'
                    ? "Ask about state architecture, schemas..."
                    : `Ask Sarthi in any language...`
                }
                className="flex-1 px-4 py-2.5 rounded-full bg-[#181a24] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2475f4]"
              />

              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="w-9 h-9 rounded-full bg-[#2475f4] hover:bg-[#1e65db] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
