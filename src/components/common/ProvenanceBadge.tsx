import React from 'react';
import { ShieldCheck, Users, Sparkles, AlertCircle, FileCode } from 'lucide-react';
import { ProvenanceType } from '../../types/career';

interface ProvenanceBadgeProps {
  type: ProvenanceType;
  size?: 'sm' | 'md';
  className?: string;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({ 
  type, 
  size = 'sm',
  className = '' 
}) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'Verified Employer':
        return {
          icon: ShieldCheck,
          label: 'Verified Employer',
          containerClass: 'bg-[#00c288]/15 text-[#00c288] border-[#00c288]/30',
        };
      case 'Aggregated Public Review':
        return {
          icon: Users,
          label: 'Aggregated Public Review',
          containerClass: 'bg-[#2475f4]/15 text-[#5ea2ff] border-[#2475f4]/30',
        };
      case 'AI Inferred':
        return {
          icon: Sparkles,
          label: 'AI Inferred',
          containerClass: 'bg-[#8c52ff]/15 text-[#bb86fc] border-[#8c52ff]/30',
        };
      case 'AI-Generated Feedback - Advisory Only':
        return {
          icon: AlertCircle,
          label: 'AI Feedback · Advisory Only',
          containerClass: 'bg-[#ffaa00]/15 text-[#ffc043] border-[#ffaa00]/30',
        };
      case 'System Tech Docs':
        return {
          icon: FileCode,
          label: 'System Tech Docs',
          containerClass: 'bg-[#00d2d3]/15 text-[#48dbfb] border-[#00d2d3]/30',
        };
      default:
        return {
          icon: Sparkles,
          label: type,
          containerClass: 'bg-white/[0.08] text-slate-300 border-white/[0.08]',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;
  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-3 py-1 gap-1.5' 
    : 'text-xs px-3.5 py-1.5 gap-2';

  return (
    <span 
      className={`inline-flex items-center font-semibold rounded-full border transition-all select-none tracking-tight ${sizeClasses} ${config.containerClass} ${className}`}
      title={`Provenance Origin: ${config.label}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>[{config.label}]</span>
    </span>
  );
};
