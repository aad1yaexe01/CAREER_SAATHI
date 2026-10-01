export type ProvenanceType = 
  | 'Verified Employer'
  | 'Aggregated Public Review'
  | 'AI Inferred'
  | 'AI-Generated Feedback - Advisory Only'
  | 'System Tech Docs';

export type FitClassification = 'Safe Fit' | 'Stretch' | 'Reach';

export interface ResumeBullet {
  id: string;
  original: string;
  proposed: string;
  status: 'accepted' | 'rejected' | 'pending' | 'edited';
  rationale: string;
  keywordsAdded: string[];
}

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  bullets: ResumeBullet[];
}

export interface ATSKeyword {
  keyword: string;
  found: boolean;
  category: 'Core Technical' | 'Cloud & Systems' | 'Architecture' | 'Soft Skills';
}

export interface CandidateResume {
  summary: string;
  atsScore: number;
  experiences: ResumeExperience[];
  keywords: ATSKeyword[];
  education: {
    institution: string;
    degree: string;
    gradYear: string;
    gpa: string;
  };
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Systems & DevOps' | 'Core CS & DSA';
  currentLevel: number; // 0-100
  requiredLevel: number; // 0-100
  importance: 'must_have' | 'nice_to_have';
  status: 'not_started' | 'in_progress' | 'completed';
  learningResource: {
    title: string;
    type: 'Interactive Lab' | 'Specialization' | 'Capstone Project';
    duration: string;
    provider: string;
  };
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo: string;
  location: string;
  type: string;
  salary: string;
  postedDate: string;
  fitClassification: FitClassification;
  matchScore: number; // 0-100
  description: string;
  overlaps: string[];
  gaps: string[];
  actionRecommendation: string;
  requiredSkills: string[];
  provenance: ProvenanceType;
}

export interface CompanyPipelineStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  preparationTip: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  logo: string;
  industry: string;
  headquarters: string;
  size: string;
  verified: boolean;
  overview: string;
  cultureSummary: string;
  perks: string[];
  hiringPipeline: CompanyPipelineStep[];
  interviewTrends: {
    topTopics: { topic: string; percentage: number }[];
    difficultyScore: number; // out of 5
    sentimentScore: number; // 0-100
    candidateQuotes: string[];
  };
}

export type ApplicationStage = 
  | 'Wishlist' 
  | 'Applied' 
  | 'In Review' 
  | 'Interview Scheduled' 
  | 'Offer' 
  | 'Rejected';

export interface ApplicationItem {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  stage: ApplicationStage;
  appliedDate: string;
  daysElapsed: number;
  salary: string;
  location: string;
  nextStep: string;
  interviewSlot?: string;
  followUpDraft?: string;
}

export interface MockInterviewQuestion {
  id: string;
  question: string;
  type: 'Technical Architecture' | 'Behavioral STAR' | 'System Design' | 'Frontend Core';
  difficulty: 'Foundation' | 'Mid-Level' | 'Advanced Senior';
  companyContext: string;
  expectedKeyPoints: string[];
}

export interface MockInterviewResult {
  id: string;
  questionId: string;
  question: string;
  userAnswer: string;
  timestamp: string;
  contentScore: number; // 0-100
  starAdherence?: {
    situation: string;
    task: string;
    action: string;
    result: string;
    score: number;
  };
  deliverySignals: {
    pacingWpm: number;
    fillerWordsCount: number;
    clarityScore: number;
  };
  keyTakeaway: string;
}

export interface CohortStudent {
  id: string;
  name: string;
  avatar: string;
  rollNo: string;
  cohort: string;
  readinessScore: number;
  applicationsCount: number;
  interviewsCount: number;
  status: 'Ready' | 'In Progress' | 'At Risk';
  flaggedWeakSpots: string[];
  counselorNotes: string;
}

export interface CohortInsight {
  id: string;
  title: string;
  description: string;
  impactMetric: string;
  recommendedAction: string;
  actionTaken: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  mode: 'candidate' | 'developer';
  text: string;
  timestamp: string;
  attribution?: ProvenanceType;
  quickChips?: string[];
}

export type AppPersona = 'candidate' | 'institution';

export type LanguageCode = 'en' | 'hi' | 'or' | 'es' | 'fr' | 'de';
