export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  promise: string;
  deliverables: string[];
  techStack: string[];
  highlight: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "product-design",
    number: "01",
    title: "Product Design",
    tagline: "UX, UI & Design Systems",
    description:
      "Modern, ultra-responsive product interfaces built for maximum clarity and conversion. We build functional prototypes before writing code so you can validate flows with users on day one.",
    promise: "Pixel-accurate UI and clickable prototypes in Figma.",
    deliverables: [
      "User research & information architecture",
      "Interactive high-fidelity Figma prototypes",
      "Complete design system & token definitions",
      "Responsive desktop and mobile viewports",
    ],
    techStack: ["Figma", "Design Tokens", "Tailwind CSS", "Framer Motion"],
    highlight: "Ready for engineer handoff without ambiguity.",
  },
  {
    id: "ai-development",
    number: "02",
    title: "AI-Native Development",
    tagline: "LLMs, RAG, Agents & Automation",
    description:
      "We architect intelligent backends and client experiences that use LLMs where they create real value. From low-latency streaming to grounded retrieval-augmented generation and autonomous workflow agents.",
    promise: "Production-grade AI integrations with eval pipelines.",
    deliverables: [
      "Multi-model routing (Claude, Gemini, OpenAI)",
      "Hybrid vector search & retrieval (RAG)",
      "Structured output parsers with schema validation",
      "Prompt evaluation testbeds & latency caching",
    ],
    techStack: ["Next.js", "FastAPI", "Pinecone/pgvector", "LangChain/LlamaIndex", "Redis"],
    highlight: "Resilient systems built with streaming and zero hallucination traps.",
  },
  {
    id: "mvp-sprint",
    number: "03",
    title: "MVP in Weeks",
    tagline: "Scoped Sprint from Idea to Launch",
    description:
      "A laser-focused build cycle designed to get real software into the hands of real users fast. We eliminate bloated scopes and execute the critical path to product-market signal.",
    promise: "From concept to live production URL in 2 to 4 weeks.",
    deliverables: [
      "Core feature scope definition & sprint planning",
      "Full-stack architecture, database & auth gating",
      "Billing setup (Stripe checkout & subscriptions)",
      "Automated CI/CD deployment to Vercel/Cloudflare",
    ],
    techStack: ["React / Next.js", "PostgreSQL", "Prisma / Drizzle", "Stripe", "Vercel"],
    highlight: "Ship before your market momentum fades.",
  },
  {
    id: "monthly-retainer",
    number: "04",
    title: "Monthly Retainer",
    tagline: "Continuous Build & Iteration",
    description:
      "Dedicated senior design and development bandwidth embedded into your roadmap. Ideal for funded teams and post-MVP startups looking for continuous iteration without hiring overhead.",
    promise: "Direct async Slack/Telegram collaboration with 24–48h turnarounds.",
    deliverables: [
      "Continuous feature development & bug resolution",
      "Weekly staging deployments & demo videos",
      "Performance optimization & database indexing",
      "Priority architecture advisory & technical review",
    ],
    techStack: ["Full Stack", "DevOps", "Telemetry", "Direct Channel"],
    highlight: "Pause or cancel anytime with zero lock-in.",
  },
];

