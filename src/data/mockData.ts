import { 
  JobOpportunity, 
  CompanyProfile, 
  CandidateResume, 
  SkillItem, 
  ApplicationItem, 
  CohortStudent, 
  CohortInsight,
  MockInterviewQuestion,
  MockInterviewResult
} from '../types/career';

export const INITIAL_RESUME: CandidateResume = {
  summary: "Final-year Computer Science Honors student specializing in high-performance web applications, modern TypeScript architectures, and human-centered design. Proven track record through production internships and capstone systems.",
  atsScore: 78,
  education: {
    institution: "Apex Institute of Science & Technology",
    degree: "B.S. in Computer Science & Engineering",
    gradYear: "2026",
    gpa: "3.88 / 4.00"
  },
  keywords: [
    { keyword: "TypeScript", found: true, category: "Core Technical" },
    { keyword: "React 19", found: true, category: "Core Technical" },
    { keyword: "Next.js", found: true, category: "Core Technical" },
    { keyword: "Docker / K8s", found: false, category: "Cloud & Systems" },
    { keyword: "WebSockets / Realtime", found: false, category: "Cloud & Systems" },
    { keyword: "System Design", found: true, category: "Architecture" },
    { keyword: "Micro-frontends", found: false, category: "Architecture" },
    { keyword: "Cross-Functional Leadership", found: true, category: "Soft Skills" },
    { keyword: "Agile CI/CD", found: true, category: "Cloud & Systems" },
    { keyword: "Performance Profiling", found: true, category: "Core Technical" }
  ],
  experiences: [
    {
      id: "exp-1",
      company: "Aether Dynamics (Internship)",
      role: "Software Engineering Intern",
      duration: "May 2025 - Aug 2025",
      bullets: [
        {
          id: "b-1",
          original: "Built frontend features using React and Redux for the analytics dashboard.",
          proposed: "Architected reactive analytics dashboard utilizing React 18 and Redux Toolkit, decreasing initial bundle payload by 32% and increasing rendering throughput by 45%.",
          status: "pending",
          rationale: "Quantified performance uplift and specified modern architecture paradigm for high ATS parser scoring.",
          keywordsAdded: ["Performance Profiling", "State Architecture"]
        },
        {
          id: "b-2",
          original: "Optimized slow pages and resolved various frontend bug reports.",
          proposed: "Spearheaded Core Web Vitals remediation program; eliminated cumulative layout shifts and slashed Largest Contentful Paint (LCP) from 3.6s to 1.3s across 250k daily sessions.",
          status: "pending",
          rationale: "Translates vague bug fixing into demonstrable Core Web Vitals engineering impact prioritized by Tier-1 employers.",
          keywordsAdded: ["Core Web Vitals", "LCP Optimization"]
        }
      ]
    },
    {
      id: "exp-2",
      company: "Campus Tech Labs",
      role: "Lead Full-Stack Developer",
      duration: "Sep 2024 - Apr 2025",
      bullets: [
        {
          id: "b-3",
          original: "Maintained student portal backend and wrote database queries.",
          proposed: "Engineered scalable RESTful micro-services and indexed PostgreSQL schemas handling 18,000 concurrent student course registrations with zero downtime.",
          status: "accepted",
          rationale: "Highlights concurrency handling and database indexing metrics.",
          keywordsAdded: ["Database Indexing", "High Concurrency"]
        }
      ]
    }
  ]
};

export const INITIAL_SKILLS: SkillItem[] = [
  {
    id: "sk-docker",
    name: "Docker & Container Orchestration",
    category: "Systems & DevOps",
    currentLevel: 45,
    requiredLevel: 85,
    importance: "must_have",
    status: "in_progress",
    learningResource: {
      title: "Production Docker & Multi-Stage Builds Masterclass",
      type: "Interactive Lab",
      duration: "4.5 hrs",
      provider: "CloudNative Academy"
    }
  },
  {
    id: "sk-websockets",
    name: "WebSockets & Event-Driven Realtime",
    category: "Systems & DevOps",
    currentLevel: 55,
    requiredLevel: 80,
    importance: "nice_to_have",
    status: "not_started",
    learningResource: {
      title: "Realtime Bidirectional Architecture with Socket.io & Redis",
      type: "Capstone Project",
      duration: "6.0 hrs",
      provider: "SystemCraft"
    }
  },
  {
    id: "sk-react",
    name: "React 19 & Concurrent State",
    category: "Frontend",
    currentLevel: 94,
    requiredLevel: 90,
    importance: "must_have",
    status: "completed",
    learningResource: {
      title: "React Server Components & Concurrent Mode Deep Dive",
      type: "Specialization",
      duration: "8.0 hrs",
      provider: "Frontend Masters"
    }
  },
  {
    id: "sk-ts",
    name: "TypeScript Advanced Generics & Inference",
    category: "Frontend",
    currentLevel: 90,
    requiredLevel: 85,
    importance: "must_have",
    status: "completed",
    learningResource: {
      title: "Type-Level TypeScript and Compiler Internals",
      type: "Interactive Lab",
      duration: "5.0 hrs",
      provider: "TypeHero"
    }
  },
  {
    id: "sk-sysdesign",
    name: "Distributed Web System Design",
    category: "Core CS & DSA",
    currentLevel: 68,
    requiredLevel: 85,
    importance: "must_have",
    status: "in_progress",
    learningResource: {
      title: "High-Scale Frontend Caching, CDNs & Edge Compute",
      type: "Specialization",
      duration: "7.0 hrs",
      provider: "System Design School"
    }
  },
  {
    id: "sk-dsa",
    name: "Algorithms & Complex Data Structures",
    category: "Core CS & DSA",
    currentLevel: 82,
    requiredLevel: 80,
    importance: "must_have",
    status: "completed",
    learningResource: {
      title: "Competitive Programming & Graph Traversal Patterns",
      type: "Interactive Lab",
      duration: "12.0 hrs",
      provider: "LeetCode Premium"
    }
  }
];

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: "job-techcorp",
    title: "Senior Frontend Engineer (Core Platform)",
    company: "TechCorp Global",
    companyId: "comp-techcorp",
    companyLogo: "⚡",
    location: "San Francisco, CA / Remote",
    type: "Full-Time",
    salary: "$145,000 - $175,000",
    postedDate: "2 days ago",
    fitClassification: "Safe Fit",
    matchScore: 84,
    description: "Lead the frontend architecture of our next-gen enterprise analytics workspace. You will collaborate with distributed systems teams to build resilient, accessible, sub-second web applications.",
    overlaps: ["React 19 & TypeScript", "State Management", "Performance Profiling", "System Design"],
    gaps: ["Production Docker / Containerization", "WebSockets Realtime Streams"],
    actionRecommendation: "Complete 'Docker & Container Orchestration' module to boost fit score to 95%!",
    requiredSkills: ["React", "TypeScript", "Docker", "WebSockets", "System Design"],
    provenance: "Verified Employer"
  },
  {
    id: "job-google",
    title: "Full-Stack Software Engineer (Cloud Console)",
    company: "Google",
    companyId: "comp-google",
    companyLogo: "🔷",
    location: "Sunnyvale, CA / Hybrid",
    type: "Full-Time",
    salary: "$160,000 - $190,000",
    postedDate: "1 day ago",
    fitClassification: "Stretch",
    matchScore: 76,
    description: "Build ultra-reliable web interfaces for Google Cloud infrastructure services. Solve high-dimensional visualization challenges and optimize latency across international cloud regions.",
    overlaps: ["Algorithms & DSA", "TypeScript Generics", "Modern Web Architecture"],
    gaps: ["Distributed Locks & Consensus", "Multi-region Failover", "Kubernetes"],
    actionRecommendation: "Review Distributed Systems interview prep modules and STAR behavioral stories.",
    requiredSkills: ["TypeScript", "Distributed Systems", "Kubernetes", "Algorithms"],
    provenance: "Verified Employer"
  },
  {
    id: "job-stripe",
    title: "Frontend Architect (Merchant Experience)",
    company: "Stripe",
    companyId: "comp-stripe",
    companyLogo: "💳",
    location: "Seattle, WA / Remote",
    type: "Full-Time",
    salary: "$170,000 - $210,000",
    postedDate: "3 days ago",
    fitClassification: "Reach",
    matchScore: 68,
    description: "Re-architect global checkout workflows and payment verification flows with world-class polish, strict accessibility, and deterministic state recovery.",
    overlaps: ["TypeScript", "Core Web Vitals", "Unit & Integration Testing"],
    gaps: ["High-Volume Financial Idempotency", "Micro-frontend Federation", "Fintech Compliance"],
    actionRecommendation: "High-reach target. Recommended to secure an internal referral or complete enterprise capstone project.",
    requiredSkills: ["TypeScript", "Micro-frontends", "Design Systems", "Web Performance"],
    provenance: "Verified Employer"
  },
  {
    id: "job-innovate",
    title: "Lead Product Engineer (AI Workspaces)",
    company: "InnovateLab",
    companyId: "comp-innovate",
    companyLogo: "🚀",
    location: "New York, NY / Remote",
    type: "Full-Time",
    salary: "$130,000 - $155,000",
    postedDate: "Just now",
    fitClassification: "Safe Fit",
    matchScore: 92,
    description: "Rapidly prototype and scale generative AI user interfaces for enterprise creative teams. Heavy emphasis on fluid micro-interactions, responsive design, and robust API orchestration.",
    overlaps: ["React & Next.js", "Tailwind CSS", "API Middleware", "Rapid Prototyping"],
    gaps: ["Automated E2E Testing Pipelines"],
    actionRecommendation: "Immediate high-probability interview match! Ready to apply with optimized resume.",
    requiredSkills: ["React", "Next.js", "Tailwind CSS", "REST/GraphQL"],
    provenance: "Verified Employer"
  },
  {
    id: "job-cloudwave",
    title: "Backend & Systems Infrastructure Engineer",
    company: "CloudWave Technologies",
    companyId: "comp-cloudwave",
    companyLogo: "🌊",
    location: "Austin, TX / Hybrid",
    type: "Full-Time",
    salary: "$140,000 - $165,000",
    postedDate: "4 days ago",
    fitClassification: "Reach",
    matchScore: 62,
    description: "Design edge routing and high-throughput streaming pipelines. Focus on telemetry ingestion, Redis cluster caching, and automated deployment infrastructure.",
    overlaps: ["PostgreSQL", "Node.js Microservices", "Core Data Structures"],
    gaps: ["Distributed Redis Caching", "Rust or Go concurrency", "Terraform Infrastructure"],
    actionRecommendation: "Candidate background leans frontend-heavy; requires foundational systems upskilling.",
    requiredSkills: ["Go/Rust", "Redis", "Distributed Systems", "Docker"],
    provenance: "Aggregated Public Review"
  }
];

export const INITIAL_COMPANIES: CompanyProfile[] = [
  {
    id: "comp-techcorp",
    name: "TechCorp Global",
    logo: "⚡",
    industry: "Enterprise SaaS & Cloud Intelligence",
    headquarters: "San Francisco, CA",
    size: "4,500+ employees",
    verified: true,
    overview: "TechCorp builds mission-critical telemetry, observability, and data intelligence tools used by 65% of Fortune 500 enterprises. Renowned for engineering rigor, transparent promotion tracks, and remote-first engineering culture.",
    cultureSummary: "Engineers commend the collaborative no-blame postmortem culture, bi-annual hackathons, and dedicated 20% innovation time. Work-life balance is rated 4.4/5 with flexible core working hours.",
    perks: [
      "$4,500 Annual Learning & Conference Budget",
      "Comprehensive Health & Mental Wellness Coverage",
      "Flexible Remote Work Equipment Stipend",
      "Parental Leave (16 Weeks Paid)"
    ],
    hiringPipeline: [
      {
        step: 1,
        title: "Recruiter Screen",
        duration: "30 Mins",
        description: "Review of background, mutual alignment on role requirements, salary expectations, and candidate timeline.",
        preparationTip: "Be concise about your current graduation timeline and key architectural choices in past internships."
      },
      {
        step: 2,
        title: "Technical Architecture & Live Coding",
        duration: "60 Mins",
        description: "Hands-on browser-based pair coding focusing on React state modeling, custom hook design, and asynchronous data fetching.",
        preparationTip: "Focus on clean abstraction, typing accuracy, and explaining tradeoffs out loud."
      },
      {
        step: 3,
        title: "System Design for Web Applications",
        duration: "60 Mins",
        description: "Deep dive into frontend caching, CDN invalidation, telemetry pipelines, and bundle splitting strategies.",
        preparationTip: "Prepare to discuss client vs server rendering tradeoffs and optimistic UI updates."
      },
      {
        step: 4,
        title: "Values & Cross-Functional Alignment",
        duration: "45 Mins",
        description: "Behavioral interview with an Engineering Director exploring conflict resolution, mentorship, and ownership.",
        preparationTip: "Structure responses strictly via the STAR framework (Situation, Task, Action, Result)."
      }
    ],
    interviewTrends: {
      topTopics: [
        { topic: "React Performance & Rendering Tree", percentage: 38 },
        { topic: "State Management & Asynchronous Data", percentage: 28 },
        { topic: "Web Performance & Core Web Vitals", percentage: 20 },
        { topic: "Behavioral Collaboration & Conflict", percentage: 14 }
      ],
      difficultyScore: 3.8,
      sentimentScore: 89,
      candidateQuotes: [
        "The live coding was very practical—no obscure binary tree inversion, just real product engineering problems.",
        "Interviewers were exceptionally helpful and gave hints when I stumbled on custom reducer logic.",
        "System design round probed deeply on offline resilience and optimistic caching."
      ]
    }
  },
  {
    id: "comp-google",
    name: "Google",
    logo: "🔷",
    industry: "Internet & Technology",
    headquarters: "Mountain View, CA",
    size: "180,000+ employees",
    verified: true,
    overview: "Google organizes the world's information and makes it universally accessible and useful. The Cloud Console engineering organization manages mission-critical web applications supporting millions of developers globally.",
    cultureSummary: "High intellectual density, world-class peer learning, unmatched internal tooling and infrastructure. Reviewers highlight high compensation and prestige, with some bureaucracy in large orgs.",
    perks: [
      "On-Campus Gourmet Dining & Micro-Kitchens",
      "Top-tier 401(k) Matching & Equity Refreshers",
      "Global Mobility & Internal Transfer Program",
      "Comprehensive Wellness Centers & Fitness Facilities"
    ],
    hiringPipeline: [
      {
        step: 1,
        title: "Initial Recruiter & Coding Screen",
        duration: "45 Mins",
        description: "Data structures and algorithm screening on a shared Google Doc without syntax highlighting.",
        preparationTip: "Practice writing syntactically correct code on plain text editors; write test cases proactively."
      },
      {
        step: 2,
        title: "Onsite Technical Rounds (3x Coding)",
        duration: "3x 45 Mins",
        description: "In-depth graph traversals, dynamic programming, and systems engineering problem sets.",
        preparationTip: "Clarify constraints thoroughly before writing a single line of implementation."
      },
      {
        step: 3,
        title: "Googleyness & Leadership",
        duration: "45 Mins",
        description: "Behavioral assessment evaluating ambiguity navigation, intellectual humility, and ethical decision-making.",
        preparationTip: "Have concrete examples where you advocated for user safety or admitted and fixed a technical mistake."
      }
    ],
    interviewTrends: {
      topTopics: [
        { topic: "Graphs & Dynamic Programming", percentage: 42 },
        { topic: "Concurrency & Asynchronous Systems", percentage: 26 },
        { topic: "Time/Space Complexity Proofs", percentage: 18 },
        { topic: "Googleyness & Navigating Ambiguity", percentage: 14 }
      ],
      difficultyScore: 4.6,
      sentimentScore: 82,
      candidateQuotes: [
        "The coding bar is rigorous; you must articulate O(N) space and time complexity immediately.",
        "Googleyness interview genuinely cared about how I handled team friction during capstones."
      ]
    }
  },
  {
    id: "comp-stripe",
    name: "Stripe",
    logo: "💳",
    industry: "Financial Infrastructure",
    headquarters: "San Francisco & Dublin",
    size: "8,000+ employees",
    verified: true,
    overview: "Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size use Stripe software to accept payments and manage their operations online.",
    cultureSummary: "Writing-heavy culture with deep documentation emphasis. Exceptionally high bar for craft, design precision, and developer experience. High autonomy with demanding pace.",
    perks: [
      "Home Office & Ergonomic Setup Allowance ($2,000)",
      "Generous Equity Grants with Liquidity Events",
      "Stripe Press Book Stipend & Subscriptions",
      "Top-tier Healthcare & Family Planning"
    ],
    hiringPipeline: [
      {
        step: 1,
        title: "Recruiter Phone Consultation",
        duration: "30 Mins",
        description: "Discussion of engineering interests, Stripe operating principles, and past projects.",
        preparationTip: "Read Stripe's operating principles before this call."
      },
      {
        step: 2,
        title: "Practical Bug Squash & Feature Extension",
        duration: "60 Mins",
        description: "You clone an actual codebase, navigate unfamiliar code, locate simulated production bugs, and add tests.",
        preparationTip: "Get comfortable using your own local IDE, debugger, and terminal shortcuts."
      },
      {
        step: 3,
        title: "API Design & Systems Integration",
        duration: "60 Mins",
        description: "Design clean, developer-friendly REST/HTTP interfaces handling idempotent retries and backwards compatibility.",
        preparationTip: "Pay special attention to HTTP status codes, pagination, and error message clarity."
      }
    ],
    interviewTrends: {
      topTopics: [
        { topic: "Bug Squashing in Real Codebases", percentage: 40 },
        { topic: "API Design & Error Handling", percentage: 32 },
        { topic: "System Resiliency & Idempotency", percentage: 18 },
        { topic: "Written Communication & Craft", percentage: 10 }
      ],
      difficultyScore: 4.4,
      sentimentScore: 91,
      candidateQuotes: [
        "Best interview experience in tech. You work in your own VS Code environment with open internet.",
        "They test real engineering: how you read documentation, debug stack traces, and write tests."
      ]
    }
  },
  {
    id: "comp-innovate",
    name: "InnovateLab",
    logo: "🚀",
    industry: "AI Tools & Workspace Platforms",
    headquarters: "New York, NY",
    size: "250 employees",
    verified: true,
    overview: "Fast-growing Series B unicorn building generative AI interfaces that transform enterprise creative and marketing workflows.",
    cultureSummary: "High velocity, lean squads, and direct user interaction. High ownership where junior engineers frequently deploy customer-facing experiments.",
    perks: [
      "Generous Series B Equity Package",
      "Unlimited PTO with Mandatory Minimums",
      "Annual Company Offsites (Tokyo, Lisbon)",
      "State of the Art M3 Max Hardware"
    ],
    hiringPipeline: [
      {
        step: 1,
        title: "Speed Chat with Founder / CTO",
        duration: "30 Mins",
        description: "Vision alignment, review of live portfolio projects, and fast technical inquiry.",
        preparationTip: "Have a live deployed demo ready to share on screen."
      },
      {
        step: 2,
        title: "Interactive UI Pairing",
        duration: "45 Mins",
        description: "Building an animated AI chat or generative canvas widget using React and Tailwind.",
        preparationTip: "Demonstrate strong CSS mastery and quick instinct for polished transitions."
      }
    ],
    interviewTrends: {
      topTopics: [
        { topic: "Rapid UI Prototyping & Tailwind", percentage: 45 },
        { topic: "Streaming APIs & Server-Sent Events", percentage: 35 },
        { topic: "Product Instinct & User Empathy", percentage: 20 }
      ],
      difficultyScore: 3.2,
      sentimentScore: 94,
      candidateQuotes: [
        "Super friendly team and lightning-fast offer turnaround within 48 hours.",
        "Loved that we discussed actual UX challenges instead of abstract leetcode puzzles."
      ]
    }
  },
  {
    id: "comp-cloudwave",
    name: "CloudWave Technologies",
    logo: "🌊",
    industry: "Cloud Infrastructure & Edge Networking",
    headquarters: "Austin, TX",
    size: "1,200 employees",
    verified: false,
    overview: "Provides high-throughput edge compute nodes and global caching infrastructure for media streaming and gaming platforms.",
    cultureSummary: "Strong systems engineering culture with high reliability requirements. Heavy focus on on-call rotations and low latency guarantees.",
    perks: [
      "Comprehensive Health & Dental",
      "401(k) Match up to 5%",
      "Generous Wellness Stipend"
    ],
    hiringPipeline: [
      {
        step: 1,
        title: "Technical Recruiter Screen",
        duration: "30 Mins",
        description: "Initial overview of systems fundamentals and networking basics.",
        preparationTip: "Brush up on OSI model and TCP/UDP handshakes."
      },
      {
        step: 2,
        title: "Systems Architecture & Caching",
        duration: "60 Mins",
        description: "Designing low-latency distributed caches with eviction policies and failover mechanisms.",
        preparationTip: "Be ready to calculate throughput and memory footprints for millions of requests/sec."
      }
    ],
    interviewTrends: {
      topTopics: [
        { topic: "Distributed Caching & Redis", percentage: 40 },
        { topic: "Concurrency & Race Conditions", percentage: 35 },
        { topic: "TCP/IP & Edge Routing", percentage: 25 }
      ],
      difficultyScore: 4.1,
      sentimentScore: 78,
      candidateQuotes: [
        "Deep technical questions on memory alignment and thread pool starvation.",
        "Make sure you understand cache stampede prevention strategies."
      ]
    }
  }
];

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: "app-1",
    jobId: "job-techcorp",
    jobTitle: "Senior Frontend Engineer (Core Platform)",
    company: "TechCorp Global",
    stage: "Interview Scheduled",
    appliedDate: "Sep 18, 2026",
    daysElapsed: 13,
    salary: "$145,000 - $175,000",
    location: "San Francisco, CA / Remote",
    nextStep: "Technical Architecture & Live Coding Round",
    interviewSlot: "Thursday, Oct 8 at 10:00 AM PST",
    followUpDraft: "Hi Sarah,\n\nI am eagerly looking forward to our Technical Architecture interview this Thursday. I have been reviewing TechCorp's recent whitepaper on micro-frontend federation and would love to dive deeper into how your core platform scales.\n\nWarm regards,\nAlex Chen"
  },
  {
    id: "app-2",
    jobId: "job-innovate",
    jobTitle: "Lead Product Engineer (AI Workspaces)",
    company: "InnovateLab",
    stage: "In Review",
    appliedDate: "Sep 24, 2026",
    daysElapsed: 7,
    salary: "$130,000 - $155,000",
    location: "New York, NY / Remote",
    nextStep: "Engineering Manager Application Review",
    followUpDraft: "Hi Marcus,\n\nFollowing up on my application for the Lead Product Engineer role submitted last week. With my recent work deploying production AI streaming interfaces and achieving a 92% match on your role specifications, I remain very excited about InnovateLab's roadmap.\n\nBest,\nAlex Chen"
  },
  {
    id: "app-3",
    jobId: "job-google",
    jobTitle: "Full-Stack Software Engineer (Cloud Console)",
    company: "Google",
    stage: "Applied",
    appliedDate: "Sep 27, 2026",
    daysElapsed: 4,
    salary: "$160,000 - $190,000",
    location: "Sunnyvale, CA / Hybrid",
    nextStep: "Awaiting Recruiter Initial Screening",
    followUpDraft: "Dear Google Recruiting Team,\n\nI recently submitted my application for the Full-Stack Software Engineer position (Cloud Console). Having maintained high performance in complex data systems and campus portal architectures, I look forward to connecting with your team.\n\nSincerely,\nAlex Chen"
  },
  {
    id: "app-4",
    jobId: "job-stripe",
    jobTitle: "Frontend Architect (Merchant Experience)",
    company: "Stripe",
    stage: "Wishlist",
    appliedDate: "Pending Submission",
    daysElapsed: 0,
    salary: "$170,000 - $210,000",
    location: "Seattle, WA / Remote",
    nextStep: "Complete Docker & Systems Roadmap before applying",
    followUpDraft: "Ready for draft generation upon application submission."
  },
  {
    id: "app-5",
    jobId: "job-cloudwave",
    jobTitle: "Backend & Systems Infrastructure Engineer",
    company: "CloudWave Technologies",
    stage: "Wishlist",
    appliedDate: "Pending Submission",
    daysElapsed: 0,
    salary: "$140,000 - $165,000",
    location: "Austin, TX / Hybrid",
    nextStep: "Targeting referral via alumni network",
    followUpDraft: "Ready for draft generation."
  }
];

export const INITIAL_MOCK_QUESTIONS: MockInterviewQuestion[] = [
  {
    id: "q-1",
    question: "Walk me through how you would architect a real-time collaborative state management system for a high-traffic analytics dashboard. How do you handle optimistic UI updates and network dropouts?",
    type: "Technical Architecture",
    difficulty: "Advanced Senior",
    companyContext: "TechCorp Global - Technical Architecture Round",
    expectedKeyPoints: [
      "Optimistic reconciliation queue with rollback mechanisms",
      "WebSockets / Server-Sent Events with exponential backoff reconnection",
      "Conflict resolution via CRDTs or timestamp vectors",
      "Client-side caching with IndexedDB / memory memoization"
    ]
  },
  {
    id: "q-2",
    question: "Tell me about a time when you identified a critical performance bottleneck in a web application. What telemetry did you analyze, and how did you measure success after your deployment?",
    type: "Behavioral STAR",
    difficulty: "Mid-Level",
    companyContext: "Google - Behavioral & Engineering Excellence",
    expectedKeyPoints: [
      "Situation: Clear production issue and user impact",
      "Task: Personal responsibility and measurement criteria",
      "Action: Telemetry instrumentation, Chrome DevTools profiling, code modifications",
      "Result: Concrete numerical improvement in LCP, bundle size, or conversion"
    ]
  },
  {
    id: "q-3",
    question: "How do you design a front-end caching layer that guarantees consistency while preventing cache stampede when 50,000 clients simultaneously request updated metrics?",
    type: "System Design",
    difficulty: "Advanced Senior",
    companyContext: "Stripe - Merchant Experience Infrastructure",
    expectedKeyPoints: [
      "Stale-while-revalidate caching headers",
      "Single-flight request coalescing / deduplication",
      "Jittered exponential backoff and localized rate limiting",
      "Service worker persistence and optimistic fallback"
    ]
  }
];

export const INITIAL_MOCK_RESULTS: MockInterviewResult[] = [
  {
    id: "res-1",
    questionId: "q-2",
    question: "Tell me about a time when you identified a critical performance bottleneck in a web application.",
    userAnswer: "In my previous internship at Aether Dynamics, our analytics dashboard experienced high user complaints due to sluggish interactions on mobile browsers. I initiated a profiling sprint using Chrome Performance DevTools and discovered that our main bundle was over 4.8MB due to un-tree-shaken visualization libraries. I re-architected the imports with dynamic lazy loading, implemented React 18 Suspense boundaries, and configured Brotli compression. As a direct result, Largest Contentful Paint dropped from 3.6 seconds to 1.3 seconds, reducing bounce rate by 22% over 250,000 monthly sessions.",
    timestamp: "Yesterday, 4:15 PM",
    contentScore: 88,
    starAdherence: {
      situation: "Clearly defined slow analytics dashboard at Aether Dynamics with user churn complaints.",
      task: "Took initiative to profile and isolate bundle weight and rendering bottlenecks.",
      action: "Applied dynamic imports, React 18 Suspense, and Brotli compression.",
      result: "Measurable 63% reduction in LCP (3.6s to 1.3s) and 22% bounce rate improvement.",
      score: 92
    },
    deliverySignals: {
      pacingWpm: 138,
      fillerWordsCount: 2,
      clarityScore: 90
    },
    keyTakeaway: "Outstanding STAR structure with verified metric outcomes. Excellent demonstration of ownership."
  }
];

// 50 simulated cohort students for Institutional Dashboard
export const GENERATED_COHORT_STUDENTS: CohortStudent[] = [
  { id: "stu-1", name: "Alex Chen", avatar: "AC", rollNo: "CS2026-001", cohort: "Batch 2026 - CS", readinessScore: 84, applicationsCount: 5, interviewsCount: 2, status: "Ready", flaggedWeakSpots: ["Docker/K8s", "Distributed Locks"], counselorNotes: "Top tier frontend candidate. Advised to wrap up Docker lab before TechCorp onsite." },
  { id: "stu-2", name: "Priya Sharma", avatar: "PS", rollNo: "CS2026-014", cohort: "Batch 2026 - CS", readinessScore: 92, applicationsCount: 8, interviewsCount: 4, status: "Ready", flaggedWeakSpots: ["System Design scaling"], counselorNotes: "Received preliminary offer from Microsoft. Guiding on negotiation." },
  { id: "stu-3", name: "Marcus Rodriguez", avatar: "MR", rollNo: "CS2026-032", cohort: "Batch 2026 - CS", readinessScore: 61, applicationsCount: 3, interviewsCount: 0, status: "At Risk", flaggedWeakSpots: ["ATS Resume formatting", "DSA Trees/Graphs"], counselorNotes: "Resume lacking quantified impact bullets. Scheduled 1-on-1 resume rewrite workshop." },
  { id: "stu-4", name: "Ananya Patnaik", avatar: "AP", rollNo: "CS2026-045", cohort: "Batch 2026 - CS", readinessScore: 88, applicationsCount: 6, interviewsCount: 3, status: "Ready", flaggedWeakSpots: ["Behavioral STAR delivery"], counselorNotes: "Strong technical portfolio; practicing STAR behavioral drills." },
  { id: "stu-5", name: "David Kim", avatar: "DK", rollNo: "CS2026-021", cohort: "Batch 2026 - CS", readinessScore: 74, applicationsCount: 4, interviewsCount: 1, status: "In Progress", flaggedWeakSpots: ["React internals", "Cloud deployment"], counselorNotes: "Actively completing CloudNative certification." },
  { id: "stu-6", name: "Fatima Al-Mansoor", avatar: "FA", rollNo: "CS2026-009", cohort: "Batch 2026 - CS", readinessScore: 95, applicationsCount: 9, interviewsCount: 5, status: "Ready", flaggedWeakSpots: ["None critical"], counselorNotes: "Finalist for Google Cloud and Stripe. Top cohort scholar." },
  { id: "stu-7", name: "Liam O'Connor", avatar: "LO", rollNo: "CS2026-054", cohort: "Batch 2026 - CS", readinessScore: 58, applicationsCount: 2, interviewsCount: 0, status: "At Risk", flaggedWeakSpots: ["Low application volume", "Incomplete portfolio"], counselorNotes: "Disengaged from campus placement portal. Triggered outreach alert." },
  { id: "stu-8", name: "Subhashree Mohanty", avatar: "SM", rollNo: "CS2026-018", cohort: "Batch 2026 - CS", readinessScore: 86, applicationsCount: 7, interviewsCount: 3, status: "Ready", flaggedWeakSpots: ["Microservices architecture"], counselorNotes: "Completed Spring Boot capstone, ready for Tier 1 drives." },
  { id: "stu-9", name: "Carlos Mendez", avatar: "CM", rollNo: "CS2026-037", cohort: "Batch 2026 - CS", readinessScore: 69, applicationsCount: 5, interviewsCount: 1, status: "In Progress", flaggedWeakSpots: ["Mock interview filler words", "SQL optimization"], counselorNotes: "Filler word frequency at 8/min; mock interview simulator prescribed." },
  { id: "stu-10", name: "Elena Rostova", avatar: "ER", rollNo: "CS2026-028", cohort: "Batch 2026 - CS", readinessScore: 79, applicationsCount: 6, interviewsCount: 2, status: "In Progress", flaggedWeakSpots: ["GraphQL caching"], counselorNotes: "On track for Autumn placement drives." },
  // Simulating 40 additional realistic cohort records
  ...Array.from({ length: 40 }).map((_, i) => {
    const idx = i + 11;
    const scores = [52, 64, 71, 77, 83, 89, 93, 48, 67, 85];
    const score = scores[i % scores.length];
    const status: 'Ready' | 'In Progress' | 'At Risk' = score >= 80 ? 'Ready' : score >= 65 ? 'In Progress' : 'At Risk';
    const firstNames = ["Rohan", "Maya", "Kenji", "Zoe", "Aarav", "Chloe", "Samuel", "Deepak", "Sarah", "Mateo", "Ingrid", "Bikash"];
    const lastNames = ["Das", "Patel", "Tanaka", "Vargas", "Mishra", "Dubois", "Schmidt", "Gupta", "Jenkins", "Nair"];
    const fName = firstNames[i % firstNames.length];
    const lName = lastNames[i % lastNames.length];
    return {
      id: `stu-${idx}`,
      name: `${fName} ${lName}`,
      avatar: `${fName[0]}${lName[0]}`,
      rollNo: `CS2026-${String(idx).padStart(3, '0')}`,
      cohort: i % 4 === 0 ? "Batch 2026 - Data Science" : "Batch 2026 - CS",
      readinessScore: score,
      applicationsCount: Math.floor(score / 14) + (i % 3),
      interviewsCount: Math.floor(score / 30),
      status,
      flaggedWeakSpots: score < 70 ? ["System Design", "Core Web Vitals", "STAR delivery"] : ["Edge Caching"],
      counselorNotes: score < 70 ? "Requires counselor intervention before placement deadline." : "Steady progress recorded on skills roadmap."
    };
  })
];

export const INITIAL_COHORT_INSIGHTS: CohortInsight[] = [
  {
    id: "ins-1",
    title: "Systemic Gap: System Design & Micro-frontends",
    description: "42% of final-year candidates in Batch 2026 show proficiency scores below 65% in System Design and Caching architectures required by Tier-1 enterprise recruiters.",
    impactMetric: "Affects 21 Candidates",
    recommendedAction: "Dispatch 3-Day Intensive System Design & Caching Remedial Track to all flagged candidates.",
    actionTaken: false
  },
  {
    id: "ins-2",
    title: "Resume Keyword Alignment Deficit",
    description: "31 candidate resumes lack modern cloud infrastructure tags (Docker, Kubernetes, CI/CD), leading to estimated 24% reduction in ATS screen pass rates.",
    impactMetric: "31% ATS Drop Risk",
    recommendedAction: "Trigger Automated ATS Bullet Optimization prompt on student dashboards.",
    actionTaken: false
  },
  {
    id: "ins-3",
    title: "Mock Interview Delivery Pacing",
    description: "Average candidate speaking pace in mock simulator is 168 WPM with elevated filler word density (5.2/min) during technical architecture questions.",
    impactMetric: "Confidence Signal Alert",
    recommendedAction: "Recommend Sarthi Voice Modulation & STAR delivery drill exercises.",
    actionTaken: true
  }
];

export const SARTHI_KNOWLEDGE = {
  candidateAdvice: {
    atsImprovement: "To maximize your ATS compatibility score for Tier-1 companies like TechCorp or Google: 1) Replace passive phrases with quantifiable impact verbs (e.g., 'Engineered', 'Optimized by 34%'), 2) Align exact keywords found in the job description such as 'Docker', 'WebSockets', and 'System Design', and 3) Ensure your bullet points follow the Google XYZ formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. Would you like me to rewrite your Aether Dynamics bullet now?",
    skillGaps: "Based on your active target 'Senior Frontend Engineer @ TechCorp Global', your primary gap is 'Docker & Container Orchestration' (current: 45%, required: 85%) and 'WebSockets & Event-Driven Realtime' (current: 55%, required: 80%). Marking your Docker lab complete will immediately increase your job match from 84% to 95%!",
    coverLetter: "Here is a tailored draft for TechCorp:\n\n'Dear Hiring Team at TechCorp,\n\nI am writing to express my strong enthusiasm for the Senior Frontend Engineer (Core Platform) role. Having engineered telemetry-driven React architectures that reduced Largest Contentful Paint to 1.3s and slashed initial payload sizes by 32%, I have spent my academic and internship career obsessing over sub-second web performance. I would be thrilled to bring this rigor to TechCorp's mission-critical analytics workspace.\n\nWarm regards,\nAlex Chen'"
  },
  developerAdvice: {
    stateModel: "CAREER SATHI utilizes a unified Candidate-Intelligence Layer powered by React Context (`CandidateIntelligenceContext`). This centralized store maintains candidate profile, resume ATS vectors, skill matrix levels, active job matches, and interview transcripts. When an action occurs (e.g. `acceptBulletRewrite()` or `completeSkill()`), a single atomic state dispatch recalculates overall readiness, ATS scores, and cross-module match percentages synchronously.",
    matchFormula: "Fit Match Formula: Match Score = (0.50 * Technical Skill Overlap) + (0.25 * Resume ATS Keyword Density) + (0.15 * Mock Interview Preparedness Score) + (0.10 * Relevant Work Experience Vector). Fit classifications are: >= 80% Safe Fit, 65-79% Stretch, < 65% Reach.",
    apiSchema: "REST API Schema for Job Feed:\n{\n  \"id\": string,\n  \"title\": string,\n  \"company\": string,\n  \"fitClassification\": \"Safe Fit\" | \"Stretch\" | \"Reach\",\n  \"matchScore\": number (0-100),\n  \"overlaps\": string[],\n  \"gaps\": string[],\n  \"actionRecommendation\": string,\n  \"provenance\": \"Verified Employer\" | \"Aggregated Public Review\" | \"AI Inferred\"\n}"
  },
  translations: {
    en: {
      appName: "CAREER SATHI",
      tagline: "AI Career & Employability Intelligence Platform",
      readiness: "Overall Employability Readiness",
      targetRole: "Target Role",
      candidateView: "Candidate OS",
      institutionalView: "Institution Admin",
      safeFit: "Safe Fit",
      stretch: "Stretch",
      reach: "Reach",
      welcomeMsg: "Hello Alex! I am Sarthi, your personal career companion. How can I help boost your employability today?"
    },
    hi: {
      appName: "कैरियर साथी (CAREER SATHI)",
      tagline: "एआई करियर एवं रोजगार क्षमता इंटेलिजेंस प्लेटफॉर्म",
      readiness: "समग्र रोजगार तत्परता स्कोर",
      targetRole: "लक्षित पद",
      candidateView: "उम्मीदवार व्यू",
      institutionalView: "संस्थान डैशबोर्ड",
      safeFit: "सुरक्षित फिट",
      stretch: "मध्यम लक्ष्य",
      reach: "उच्च लक्ष्य",
      welcomeMsg: "नमस्ते एलेक्स! मैं सारथी हूँ, आपका व्यक्तिगत करियर मार्गदर्शक। आज मैं आपकी रोजगार तत्परता बढ़ाने में कैसे मदद कर सकता हूँ?"
    },
    or: {
      appName: "କ୍ୟାରିଅର୍ ସାଥୀ (CAREER SATHI)",
      tagline: "ଏଆଇ କ୍ୟାରିଅର ଏବଂ ନିଯୁକ୍ତି ଯୋଗ୍ୟତା ଇଣ୍ଟେଲିଜେନ୍ସ ପ୍ଲାଟଫର୍ମ",
      readiness: "ସାମଗ୍ରିକ ନିଯୁକ୍ତି ପ୍ରସ୍ତୁତି ସ୍କୋର",
      targetRole: "ଲକ୍ଷ୍ୟ ଭୂମିକା",
      candidateView: "ପ୍ରାର୍ଥୀ ଭ୍ୟୁ",
      institutionalView: "ଅନୁଷ୍ଠାନ ଡ୍ୟାସବୋର୍ଡ",
      safeFit: "ସୁରକ୍ଷିତ ଫିଟ୍",
      stretch: "ପ୍ରୟାସ ଯୋଗ୍ୟ",
      reach: "ଉଚ୍ଚ ଲକ୍ଷ୍ୟ",
      welcomeMsg: "ନମସ୍କାର ଆଲେକ୍ସ! ମୁଁ ସାରଥୀ, ଆପଣଙ୍କର ବ୍ୟକ୍ତିଗତ କ୍ୟାରିଅର୍ ସାଥୀ। ଆଜି ଆପଣଙ୍କର ଚାକିରି ପ୍ରସ୍ତୁତି କିପରି ଉନ୍ନତ କରିପାରିବା?"
    },
    es: {
      appName: "CAREER SATHI",
      tagline: "Plataforma de Inteligencia de Carrera y Empleabilidad",
      readiness: "Preparación Global para el Empleo",
      targetRole: "Rol Objetivo",
      candidateView: "Vista Candidato",
      institutionalView: "Panel Institucional",
      safeFit: "Ajuste Seguro",
      stretch: "Reto Moderado",
      reach: "Alto Reto",
      welcomeMsg: "¡Hola Alex! Soy Sarthi, tu compañero de carrera. ¿Cómo puedo ayudarte hoy con tu preparación profesional?"
    },
    fr: {
      appName: "CAREER SATHI",
      tagline: "Plateforme d'Intelligence Carrière & Employabilité",
      readiness: "Score Global d'Employabilité",
      targetRole: "Poste Cible",
      candidateView: "Espace Candidat",
      institutionalView: "Tableau de Bord Établissement",
      safeFit: "Adéquation Optimale",
      stretch: "Objectif Ambitieux",
      reach: "Défi Supérieur",
      welcomeMsg: "Bonjour Alex ! Je suis Sarthi, votre guide de carrière. Comment puis-je vous aider à accélérer vos opportunités aujourd'hui ?"
    },
    de: {
      appName: "CAREER SATHI",
      tagline: "KI-Plattform für Karriere & Beschäftigungsfähigkeit",
      readiness: "Gesamte Beschäftigungsbereitschaft",
      targetRole: "Zielposition",
      candidateView: "Kandidaten-Modus",
      institutionalView: "Instituts-Dashboard",
      safeFit: "Sicherer Fit",
      stretch: "Ambitioniert",
      reach: "Herausforderung",
      welcomeMsg: "Hallo Alex! Ich bin Sarthi, dein persönlicher Karrierebegleiter. Wie kann ich heute deine Erfolgschancen steigern?"
    }
  }
};
