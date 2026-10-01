import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { 
  AppPersona, 
  LanguageCode, 
  CandidateResume, 
  SkillItem, 
  JobOpportunity, 
  CompanyProfile, 
  ApplicationItem, 
  ApplicationStage,
  CohortStudent, 
  CohortInsight, 
  MockInterviewQuestion, 
  MockInterviewResult 
} from '../types/career';
import { 
  INITIAL_RESUME, 
  INITIAL_SKILLS, 
  INITIAL_JOBS, 
  INITIAL_COMPANIES, 
  INITIAL_APPLICATIONS, 
  INITIAL_MOCK_QUESTIONS, 
  INITIAL_MOCK_RESULTS, 
  GENERATED_COHORT_STUDENTS, 
  INITIAL_COHORT_INSIGHTS 
} from '../data/mockData';

interface CandidateIntelligenceContextType {
  persona: AppPersona;
  setPersona: (p: AppPersona) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  readinessScore: number;
  cohortPercentile: number;
  
  // Data
  resume: CandidateResume;
  skills: SkillItem[];
  jobs: JobOpportunity[];
  companies: CompanyProfile[];
  applications: ApplicationItem[];
  mockQuestions: MockInterviewQuestion[];
  mockResults: MockInterviewResult[];
  cohortStudents: CohortStudent[];
  cohortInsights: CohortInsight[];
  
  // Cross-Module State Actions
  acceptResumeBullet: (expId: string, bulletId: string) => void;
  rejectResumeBullet: (expId: string, bulletId: string) => void;
  editResumeBullet: (expId: string, bulletId: string, newText: string) => void;
  updateSkillStatus: (skillId: string, status: 'not_started' | 'in_progress' | 'completed') => void;
  addSkillToRoadmap: (skillName: string) => void;
  moveApplicationStage: (appId: string, newStage: ApplicationStage) => void;
  saveFollowUpDraft: (appId: string, draft: string) => void;
  submitMockInterviewAnswer: (questionId: string, answerText: string) => MockInterviewResult;
  assignRemedialRoadmap: (insightId: string) => void;
  updateCounselorNotes: (studentId: string, notes: string) => void;
  applyForJob: (job: JobOpportunity) => void;
  
  // Global Notification / Toast
  notification: { message: string; type: 'success' | 'info' | 'boost' } | null;
  clearNotification: () => void;
}

const CandidateIntelligenceContext = createContext<CandidateIntelligenceContextType | undefined>(undefined);

export const CandidateIntelligenceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersona] = useState<AppPersona>('candidate');
  const [activeTab, setActiveTab] = useState<string>('jobs');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [targetRole, setTargetRole] = useState<string>('Senior Frontend Engineer (Core Platform) @ TechCorp Global');
  
  const [resume, setResume] = useState<CandidateResume>(INITIAL_RESUME);
  const [skills, setSkills] = useState<SkillItem[]>(INITIAL_SKILLS);
  const [jobs, setJobs] = useState<JobOpportunity[]>(INITIAL_JOBS);
  const [companies] = useState<CompanyProfile[]>(INITIAL_COMPANIES);
  const [applications, setApplications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);
  const [mockQuestions, setMockQuestions] = useState<MockInterviewQuestion[]>(INITIAL_MOCK_QUESTIONS);
  const [mockResults, setMockResults] = useState<MockInterviewResult[]>(INITIAL_MOCK_RESULTS);
  const [cohortStudents, setCohortStudents] = useState<CohortStudent[]>(GENERATED_COHORT_STUDENTS);
  const [cohortInsights, setCohortInsights] = useState<CohortInsight[]>(INITIAL_COHORT_INSIGHTS);
  
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'boost' } | null>({
    message: "Candidate Intelligence Synchronized. 3 recommendations available.",
    type: 'info'
  });

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'boost' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 5500);
  }, []);

  // Centralized Candidate Readiness Score calculation
  // Dynamic formula based on:
  // - Completed skills ratio
  // - Accepted resume optimizations & ATS score
  // - Mock interview performance average
  // - Active job search momentum
  const readinessScore = useMemo(() => {
    const completedSkillsCount = skills.filter(s => s.status === 'completed').length;
    const skillsFactor = (completedSkillsCount / Math.max(skills.length, 1)) * 35; // max 35 pts
    const atsFactor = (resume.atsScore / 100) * 35; // max 35 pts
    
    const avgInterviewScore = mockResults.length > 0 
      ? mockResults.reduce((acc, r) => acc + r.contentScore, 0) / mockResults.length 
      : 75;
    const interviewFactor = (avgInterviewScore / 100) * 20; // max 20 pts
    
    const momentumFactor = Math.min(applications.length * 2, 10); // max 10 pts
    
    const raw = Math.round(skillsFactor + atsFactor + interviewFactor + momentumFactor);
    return Math.min(Math.max(raw, 40), 99);
  }, [skills, resume.atsScore, mockResults, applications.length]);

  const cohortPercentile = useMemo(() => {
    const scores = cohortStudents.map(s => s.readinessScore);
    const belowCount = scores.filter(s => s < readinessScore).length;
    return Math.round((belowCount / scores.length) * 100);
  }, [readinessScore, cohortStudents]);

  // Dynamic recalculation of Job Match Scores whenever skills or resume changes
  const recalculateJobMatches = useCallback((updatedSkills: SkillItem[], updatedAtsScore: number) => {
    const dockerSkill = updatedSkills.find(s => s.id === 'sk-docker');
    const isDockerDone = dockerSkill?.status === 'completed';
    const websocketsSkill = updatedSkills.find(s => s.id === 'sk-websockets');
    const isWsDone = websocketsSkill?.status === 'completed';

    setJobs(prevJobs => prevJobs.map(job => {
      let score = job.matchScore;
      let overlaps = [...job.overlaps];
      let gaps = [...job.gaps];
      let classification = job.fitClassification;

      if (job.id === 'job-techcorp') {
        if (isDockerDone) {
          score = isWsDone ? 96 : 92;
          if (!overlaps.includes("Docker Containerization")) {
            overlaps.push("Docker Containerization");
          }
          gaps = gaps.filter(g => !g.toLowerCase().includes("docker"));
          classification = 'Safe Fit';
        } else {
          score = 84;
        }
      } else if (job.id === 'job-google') {
        if (isDockerDone) {
          score = 83;
          classification = 'Safe Fit';
          gaps = gaps.filter(g => !g.toLowerCase().includes("docker"));
        }
      } else if (job.id === 'job-stripe') {
        if (updatedAtsScore >= 85) {
          score = 75;
          classification = 'Stretch';
        }
      }

      return {
        ...job,
        matchScore: score,
        overlaps,
        gaps,
        fitClassification: classification
      };
    }));
  }, []);

  // Action: Accept Resume Bullet Rewrite
  const acceptResumeBullet = useCallback((expId: string, bulletId: string) => {
    setResume(prev => {
      let keywordsToAdd: string[] = [];
      const updatedExperiences = prev.experiences.map(exp => {
        if (exp.id !== expId) return exp;
        return {
          ...exp,
          bullets: exp.bullets.map(b => {
            if (b.id === bulletId) {
              keywordsToAdd = b.keywordsAdded;
              return { ...b, status: 'accepted' as const };
            }
            return b;
          })
        };
      });

      // Boost ATS Score
      const newAtsScore = Math.min(prev.atsScore + 6, 96);
      
      // Update keywords found
      const updatedKeywords = prev.keywords.map(kw => {
        if (keywordsToAdd.includes(kw.keyword) || kw.keyword === 'Performance Profiling') {
          return { ...kw, found: true };
        }
        return kw;
      });

      // Recalculate job matches
      recalculateJobMatches(skills, newAtsScore);

      return {
        ...prev,
        atsScore: newAtsScore,
        experiences: updatedExperiences,
        keywords: updatedKeywords
      };
    });

    showNotification("Resume Bullet Accepted! ATS score boosted to " + Math.min(resume.atsScore + 6, 96) + "% and synchronized with all job matches.", 'boost');
  }, [skills, recalculateJobMatches, resume.atsScore, showNotification]);

  // Action: Reject Resume Bullet
  const rejectResumeBullet = useCallback((expId: string, bulletId: string) => {
    setResume(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id !== expId) return exp;
        return {
          ...exp,
          bullets: exp.bullets.map(b => b.id === bulletId ? { ...b, status: 'rejected' as const } : b)
        };
      })
    }));
    showNotification("Suggestion rejected. Original bullet preserved.", 'info');
  }, [showNotification]);

  // Action: Edit Resume Bullet
  const editResumeBullet = useCallback((expId: string, bulletId: string, newText: string) => {
    setResume(prev => {
      const newAtsScore = Math.min(prev.atsScore + 4, 94);
      return {
        ...prev,
        atsScore: newAtsScore,
        experiences: prev.experiences.map(exp => {
          if (exp.id !== expId) return exp;
          return {
            ...exp,
            bullets: exp.bullets.map(b => b.id === bulletId ? { 
              ...b, 
              proposed: newText, 
              status: 'edited' as const 
            } : b)
          };
        })
      };
    });
    showNotification("Custom bullet saved. ATS score calibrated.", 'success');
  }, [showNotification]);

  // Action: Update Skill Status (Cross-module trigger to Module 1 & Module 5!)
  const updateSkillStatus = useCallback((skillId: string, status: 'not_started' | 'in_progress' | 'completed') => {
    setSkills(prev => {
      const nextSkills = prev.map(s => {
        if (s.id === skillId) {
          const newLevel = status === 'completed' ? 95 : status === 'in_progress' ? 65 : s.currentLevel;
          return { ...s, status, currentLevel: newLevel };
        }
        return s;
      });

      // Recalculate job matches
      recalculateJobMatches(nextSkills, resume.atsScore);

      // If completed Docker or Systems, unlock new senior question in Module 5
      if (skillId === 'sk-docker' && status === 'completed') {
        setMockQuestions(qPrev => {
          if (qPrev.some(q => q.id === 'q-unlocked-docker')) return qPrev;
          return [
            ...qPrev,
            {
              id: "q-unlocked-docker",
              question: "✨ UNLOCKED (via Docker Completion): How do you structure zero-downtime rolling container deployments with health probes and canary testing in Kubernetes?",
              type: "System Design",
              difficulty: "Advanced Senior",
              companyContext: "TechCorp Global - Unlocked by Skill Mastery",
              expectedKeyPoints: [
                "Liveness and readiness probes",
                "Canary ingress weighting with Envoy / Nginx",
                "Graceful SIGTERM lifecycle handling",
                "Automated rollback on error budget depletion"
              ]
            }
          ];
        });
      }

      return nextSkills;
    });

    if (status === 'completed') {
      showNotification("🎯 Skill Marked Complete! TechCorp Fit Match jumped to 92% and an Advanced System Design mock question unlocked!", 'boost');
    } else {
      showNotification(`Skill roadmap status updated to ${status}.`, 'info');
    }
  }, [recalculateJobMatches, resume.atsScore, showNotification]);

  // Action: Add Skill to Roadmap from Module 1
  const addSkillToRoadmap = useCallback((skillName: string) => {
    const existing = skills.find(s => s.name.toLowerCase().includes(skillName.toLowerCase()));
    if (existing) {
      updateSkillStatus(existing.id, 'in_progress');
      showNotification(`'${existing.name}' is now active in your Learning Roadmap!`, 'success');
    } else {
      const newSkill: SkillItem = {
        id: `sk-${Date.now()}`,
        name: skillName,
        category: 'Systems & DevOps',
        currentLevel: 40,
        requiredLevel: 85,
        importance: 'must_have',
        status: 'in_progress',
        learningResource: {
          title: `Accelerated ${skillName} Intensive Capstone`,
          type: 'Interactive Lab',
          duration: '5.0 hrs',
          provider: 'SystemCraft'
        }
      };
      setSkills(prev => [newSkill, ...prev]);
      showNotification(`Added '${skillName}' to your Skill Roadmap & synchronized match targets!`, 'boost');
    }
  }, [skills, updateSkillStatus, showNotification]);

  // Action: Move Application Stage
  const moveApplicationStage = useCallback((appId: string, newStage: ApplicationStage) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      return {
        ...app,
        stage: newStage,
        lastUpdated: "Just now"
      };
    }));
    showNotification(`Application updated to stage: ${newStage}`, 'info');
  }, [showNotification]);

  // Action: Save Follow-up Draft
  const saveFollowUpDraft = useCallback((appId: string, draft: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id !== appId) return app;
      return { ...app, followUpDraft: draft };
    }));
    showNotification("AI Follow-up email draft customized and saved.", 'success');
  }, [showNotification]);

  // Action: Apply for Job directly
  const applyForJob = useCallback((job: JobOpportunity) => {
    const exists = applications.find(a => a.jobId === job.id);
    if (exists) {
      showNotification("Application is already active on your Kanban tracker!", 'info');
      setActiveTab('applications');
      return;
    }
    const newApp: ApplicationItem = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      stage: 'Applied',
      appliedDate: "Today",
      daysElapsed: 0,
      salary: job.salary,
      location: job.location,
      nextStep: "Awaiting recruiter application review",
      followUpDraft: `Hi Recruiting Team at ${job.company},\n\nI have just submitted my application for the ${job.title} role. With an aligned skill match score of ${job.matchScore}%, I am enthusiastic about contributing to your team's mission.\n\nBest regards,\nAlex Chen`
    };
    setApplications(prev => [newApp, ...prev]);
    showNotification(`Applied to ${job.company}! Added to your Application Tracker.`, 'success');
    setActiveTab('applications');
  }, [applications, showNotification]);

  // Action: Submit Mock Interview Answer
  const submitMockInterviewAnswer = useCallback((questionId: string, answerText: string): MockInterviewResult => {
    const wordCount = answerText.trim().split(/\s+/).length;
    const fillerWords = (answerText.match(/\b(um|uh|like|you know|basically|actually)\b/gi) || []).length;
    
    // Dynamic scoring logic based on depth and keywords
    const hasNumbers = /\d+%|\d+\s*(sec|s|ms|k|m|million|users)/i.test(answerText);
    const hasSTAR = /situation|problem|task|action|result|measured|outcome/i.test(answerText);
    
    let score = 75;
    if (wordCount > 60) score += 10;
    if (hasNumbers) score += 8;
    if (hasSTAR) score += 5;
    if (fillerWords > 4) score -= 6;
    score = Math.min(Math.max(score, 60), 96);

    const questionObj = mockQuestions.find(q => q.id === questionId);

    const result: MockInterviewResult = {
      id: `res-${Date.now()}`,
      questionId,
      question: questionObj?.question || "Interview Question",
      userAnswer: answerText,
      timestamp: "Just now",
      contentScore: score,
      starAdherence: {
        situation: "Identified scenario and context clearly in the introduction.",
        task: "Specified the objective and measurable latency/throughput requirements.",
        action: "Detailed exact architecture steps, libraries, and design patterns utilized.",
        result: hasNumbers 
          ? "Exemplary quantitative metrics cited for performance validation." 
          : "Consider adding explicit numerical percentages (e.g. 35% improvement) to reinforce final business impact.",
        score: Math.min(score + 2, 95)
      },
      deliverySignals: {
        pacingWpm: Math.floor(130 + Math.random() * 20),
        fillerWordsCount: fillerWords,
        clarityScore: Math.max(95 - fillerWords * 4, 70)
      },
      keyTakeaway: score >= 85 
        ? "Excellent structured communication adhering closely to Senior FAANG evaluation criteria." 
        : "Good technical intuition; incorporate more concrete production metrics to achieve top percentile ratings."
    };

    setMockResults(prev => [result, ...prev]);
    showNotification(`Mock Answer Evaluated! Content Score: ${score}/100. Readiness score refreshed.`, 'boost');
    return result;
  }, [mockQuestions, showNotification]);

  // Action: Institutional Admin assigns remedial roadmap
  const assignRemedialRoadmap = useCallback((insightId: string) => {
    setCohortInsights(prev => prev.map(ins => {
      if (ins.id !== insightId) return ins;
      return { ...ins, actionTaken: true };
    }));

    // Update students below 70
    setCohortStudents(prev => prev.map(s => {
      if (s.readinessScore < 70) {
        return {
          ...s,
          readinessScore: s.readinessScore + 8,
          status: (s.readinessScore + 8) >= 65 ? 'In Progress' : 'At Risk',
          counselorNotes: "Remedial System Design & Caching module dispatched. Mandatory completion by Oct 15."
        };
      }
      return s;
    }));

    showNotification("Remedial Track Dispatched! 21 flagged students updated with tailored learning plans.", 'boost');
  }, [showNotification]);

  // Action: Update Counselor Notes
  const updateCounselorNotes = useCallback((studentId: string, notes: string) => {
    setCohortStudents(prev => prev.map(s => {
      if (s.id !== studentId) return s;
      return { ...s, counselorNotes: notes };
    }));
    showNotification("Counselor guidance notes updated for student record.", 'success');
  }, [showNotification]);

  return (
    <CandidateIntelligenceContext.Provider
      value={{
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
        skills,
        jobs,
        companies,
        applications,
        mockQuestions,
        mockResults,
        cohortStudents,
        cohortInsights,
        acceptResumeBullet,
        rejectResumeBullet,
        editResumeBullet,
        updateSkillStatus,
        addSkillToRoadmap,
        moveApplicationStage,
        saveFollowUpDraft,
        submitMockInterviewAnswer,
        assignRemedialRoadmap,
        updateCounselorNotes,
        applyForJob,
        notification,
        clearNotification
      }}
    >
      {children}
    </CandidateIntelligenceContext.Provider>
  );
};

export const useCandidateIntelligence = () => {
  const context = useContext(CandidateIntelligenceContext);
  if (!context) {
    throw new Error('useCandidateIntelligence must be used within a CandidateIntelligenceProvider');
  }
  return context;
};
