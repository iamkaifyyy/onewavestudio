export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  badge: "Studio Project" | "Client Project";
  award?: string;
  client: string;
  timeline: string;
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  summary: string;
  problem: string;
  solution: string;
  aiArchitecture: {
    models: string;
    retrieval: string;
    caching: string;
    evals: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  featuresBuilt: {
    title: string;
    caption: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "vernacular-ai-jobs",
    title: "RozgarAI: Vernacular Voice Job Marketplace",
    oneLiner: "Voice-first vernacular AI matching informal workers with micro-gigs via WhatsApp and Web.",
    badge: "Studio Project",
    award: "1st Place Winner — AI for Bharat Hackathon 2026",
    client: "Studio Initiative (Urban Labor Tech)",
    timeline: "2 Weeks Sprint",
    role: "Full-Stack AI Architecture & Mobile Web UI",
    liveUrl: "https://rozgar-ai.demo.ynz.studio",
    githubUrl: "https://github.com/iamkaifyyy/rozgar-ai",
    tags: ["AI Voice", "Vernacular", "Audio Pipeline", "Multi-Agent"],
    summary:
      "A voice-first platform empowering informal laborers and trade workers to discover, negotiate, and secure hyper-local work using their regional native dialects without needing to type or navigate complex forms.",
    problem:
      "Traditional job platforms require high textual literacy and formal resume formatting. Over 180M informal sector workers are locked out of digital gig discovery due to language barriers, complex UI gates, and desktop-first form flows.",
    solution:
      "We engineered an asynchronous audio-in, audio-out pipeline. Workers speak naturally in Hindi, Hinglish, or Marathi; an automatic speech recognition pipeline transcribes the audio, extracts skills and availability into structured schemas, and matches them against open contractor requests with automated phone notifications.",
    aiArchitecture: {
      models: "Whisper Large v3 (Fast Whisper) + Gemini 1.5 Flash for dialect intent extraction",
      retrieval: "Hyperlocal geospatial radius search with pgvector skill embeddings",
      caching: "Redis audio fingerprint cache preventing duplicate transcriptions",
      evals: "Dialect comprehension benchmark test suite across 5 regional vernacular variants",
    },
    metrics: [
      { label: "Hackathon Recognition", value: "1st Place" },
      { label: "Speech-to-Match Latency", value: "<1.4s" },
      { label: "Dialect Intent Accuracy", value: "94.2%" },
      { label: "Build Delivery Time", value: "14 Days" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "FastAPI", "Whisper", "PostgreSQL", "pgvector", "Twilio Voice"],
    featuresBuilt: [
      {
        title: "Voice-First Profile Generator",
        caption: "Workers record a 20-second voice note; structured candidate profiles are synthesized automatically.",
      },
      {
        title: "Autonomous Contractor Matching",
        caption: "Contractors post tasks via text or voice; candidates are ranked by distance, skill, and wage acceptance.",
      },
      {
        title: "Bilingual SMS & Voice Dispatch",
        caption: "Dispatches automated IVR calls to candidates in their exact native language with one-click acceptance.",
      },
    ],
  },
  {
    slug: "hybrid-llm-platform",
    title: "Kortex: Hybrid Cloud & Edge LLM Router",
    oneLiner: "Intelligent gateway routing prompts between local Ollama nodes and cloud APIs for 68% cost reduction.",
    badge: "Studio Project",
    client: "Internal Research & Open Source",
    timeline: "3 Weeks",
    role: "Gateway Engineering & Performance Benchmarking",
    liveUrl: "https://kortex.demo.ynz.studio",
    githubUrl: "https://github.com/iamkaifyyy/kortex-gateway",
    tags: ["LLM Gateway", "Cost Optimization", "Local Models", "Caching"],
    summary:
      "A developer proxy and dashboard that inspects incoming prompt tokens, detects semantic complexity, and routes simple extraction tasks to local quant models while forwarding heavy reasoning tasks to frontier cloud APIs.",
    problem:
      "Startups building AI features waste 60%+ of their token budget sending simple parsing, formatting, and classification queries to expensive frontier models (Claude 3.5 Sonnet / GPT-4o), resulting in crippling cloud bills and rate limit throttling.",
    solution:
      "We designed an ultra-low-overhead reverse proxy with semantic response caching and dynamic token complexity scoring. Incoming prompts are evaluated in under 12ms: lightweight tasks are answered locally via quantized Llama-3.2/Mistral instances, slashing token expenditure without sacrificing reasoning quality.",
    aiArchitecture: {
      models: "Ollama Llama-3.2 3B & Mistral 7B (Local) + Claude 3.5 Sonnet / Gemini 1.5 Pro (Cloud)",
      retrieval: "Semantic cache lookup using 384-dimensional lightweight embeddings in Redis",
      caching: "Two-tier exact hash + cosine similarity cache (threshold 0.94)",
      evals: "Real-time automated LLM-as-a-judge quality audit ensuring 0% degradation on routed tasks",
    },
    metrics: [
      { label: "Token Cost Savings", value: "68.4%" },
      { label: "Gateway Routing Overhead", value: "9.2ms" },
      { label: "Semantic Cache Hit Ratio", value: "31.8%" },
      { label: "Throughput Capacity", value: "1,200 req/s" },
    ],
    techStack: ["Go / Python", "Redis", "Ollama", "PostgreSQL", "React", "Tailwind CSS", "Vercel"],
    featuresBuilt: [
      {
        title: "Semantic Complexity Classifier",
        caption: "Classifies prompt entropy and reasoning depth in single-digit milliseconds before downstream routing.",
      },
      {
        title: "Live Token & Cost Dashboard",
        caption: "Real-time cost telemetry showing per-route dollar savings, model latency comparisons, and error fallbacks.",
      },
      {
        title: "Zero-Downtime Provider Failover",
        caption: "Instantly falls back from cloud provider rate limits (429s) to secondary frontier endpoints or edge instances.",
      },
    ],
  },
  {
    slug: "startup-intelligence-rag",
    title: "VenturePulse: Grounded Startup Research Engine",
    oneLiner: "Evidence-backed market intelligence synthesizing investor memos with verified source attribution.",
    badge: "Client Project",
    client: "Seed Stage Venture Syndicate",
    timeline: "4 Weeks Sprint",
    role: "Full-Stack Design & RAG Architecture",
    tags: ["RAG Engine", "Fintech", "Venture Capital", "Automated Evals"],
    summary:
      "An institutional research workspace that parses pitch decks, investor updates, SEC filings, and product metrics to generate evidence-grounded investment memos with citation links down to the exact source paragraph.",
    problem:
      "Venture analysts spend 15+ hours per deal reviewing raw data across 8+ formats. Generic AI tools hallucinate revenue figures and market sizes, making standard LLM summaries unsafe for serious diligence decisions.",
    solution:
      "We built a deterministic RAG ingestion engine that splits tabular financials, slide images, and PDFs into verified markdown chunks. Our dual-step verification model cross-references every claimed metric against source document coordinates before displaying it to investors.",
    aiArchitecture: {
      models: "Claude 3.5 Sonnet + Gemini 1.5 Pro (Vision for deck slide graphics)",
      retrieval: "Hybrid BM25 keyword matching + Cohere reranker + Pinecone vector index",
      caching: "Document chunk hash indexing preventing re-computation on updated pitch decks",
      evals: "Continuous Ragas framework metrics checking context precision, faithfulness, and recall",
    },
    metrics: [
      { label: "Memo Prep Time", value: "15h → 45m" },
      { label: "Citation Faithfulness", value: "99.1%" },
      { label: "Decks Diligenced", value: "140+" },
      { label: "Analyst Adoption", value: "100%" },
    ],
    techStack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "FastAPI", "Pinecone", "Cohere", "Supabase"],
    featuresBuilt: [
      {
        title: "Interactive Split-Screen Citation Inspector",
        caption: "Clicking any generated revenue claim highlights the exact coordinate box in the uploaded PDF slide.",
      },
      {
        title: "Competitive Landscape Matrix Synthesizer",
        caption: "Extracts feature differences and pricing tables across competitor domains with automated web verification.",
      },
      {
        title: "One-Click IC Memo Export",
        caption: "Exports institutional-grade diligence memorandums in clean Notion, PDF, and Markdown formats.",
      },
    ],
  },
  {
    slug: "production-agent-infrastructure",
    title: "OmniFlow: Production Multi-Agent Execution Fabric",
    oneLiner: "Stateful agent orchestration pipeline coordinating autonomous research, code drafting, and telemetry.",
    badge: "Client Project",
    client: "B2B SaaS Enterprise",
    timeline: "3 Weeks",
    role: "Architecture, Backend & Execution Sandbox",
    tags: ["Autonomous Agents", "Workflows", "Sandboxing", "Infrastructure"],
    summary:
      "A fault-tolerant orchestration platform designed for multi-agent workflows that run long-horizon tasks (document generation, codebase refactoring, research synthesis) with human-in-the-loop review checkpoints.",
    problem:
      "Autonomous agents fail silently or loop infinitely when given multi-step instructions without strict state boundary controls, state recovery snapshots, or sandboxed execution environments.",
    solution:
      "We developed an actor-model state machine where every agent turn is deterministic, log-traced, and recoverable. Long-running tasks execute in isolated runtime environments with time-budget enforcement and instant human approval gates for critical state mutations.",
    aiArchitecture: {
      models: "OpenAI GPT-4o / Claude 3.5 Sonnet with JSON schema enforcement",
      retrieval: "Episodic agent memory stored in Redis vector store with session expiration",
      caching: "Deterministic tool call result cache reducing redundant web and database lookups",
      evals: "Automated regression tests evaluating tool selection precision and loop prevention bounds",
    },
    metrics: [
      { label: "Task Completion Rate", value: "96.4%" },
      { label: "Infinite Loop Rate", value: "0.0%" },
      { label: "Mean Execution Time", value: "3.2m" },
      { label: "Active Pipeline Jobs", value: "2,500/mo" },
    ],
    techStack: ["Node.js / TypeScript", "Python", "Docker Sandboxes", "Redis", "BullMQ", "PostgreSQL", "Next.js"],
    featuresBuilt: [
      {
        title: "Step-by-Step DAG Execution Visualizer",
        caption: "Inspect agent reasoning trees, tool inputs/outputs, and latency breakdowns in a live reactive canvas.",
      },
      {
        title: "Human-in-the-Loop Interceptor",
        caption: "Pauses execution before sensitive tool calls (e.g. email sending, DB write) until user signs off.",
      },
      {
        title: "Deterministic State Snapshot Replay",
        caption: "Rewind any failed agent execution to its previous turn and branch into a new debug session.",
      },
    ],
  },
];

