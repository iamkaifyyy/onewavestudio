export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  links: {
    github?: string;
    x?: string;
    linkedin?: string;
    portfolio?: string;
  };
}

export interface StudioPrinciple {
  number: string;
  title: string;
  description: string;
}

export const TEAM: TeamMember[] = [
  {
    name: "Mohd Kaif",
    role: "Founder & Lead AI Engineer",
    bio: "Full-stack engineer and AI builder specializing in fast MVP execution, LLM pipelines, and modern web architectures.",
    avatar: "https://github.com/iamkaifyyy.png",
    links: {
      github: "https://github.com/iamkaifyyy",
      x: "https://x.com/Iamkaifyyy",
      linkedin: "https://linkedin.com/in/iamkaifyyy",
      portfolio: "https://kaify-dev.vercel.app",
    },
  },
];

export const PRINCIPLES: StudioPrinciple[] = [
  {
    number: "01",
    title: "Ship small, ship often",
    description:
      "Large speculative roadmaps kill startups. We prioritize the smallest functional core that delivers real value to users and ship it to production within weeks.",
  },
  {
    number: "02",
    title: "You own everything",
    description:
      "Zero vendor lock-in. No proprietary studio frameworks. Clean, commented TypeScript that any competent engineer can pick up and scale.",
  },
  {
    number: "03",
    title: "Honest, transparent scoping",
    description:
      "If a proposed feature will blow your budget or provides negligible user value, we'll tell you directly and recommend a leaner alternative.",
  },
  {
    number: "04",
    title: "AI as leverage, not gimmick",
    description:
      "We integrate LLMs and agents where they solve actual customer problems with speed and precision, never as meaningless buzzword wrappers.",
  },
];

export const STACK_TOOLS = [
  { category: "Frontend", tools: ["Next.js", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion"] },
  { category: "Backend & Data", tools: ["PostgreSQL", "Supabase", "Prisma", "FastAPI (Python)", "Redis"] },
  { category: "AI & ML", tools: ["Claude 3.5 Sonnet", "Gemini 1.5 Pro/Flash", "OpenAI GPT-4o", "pgvector", "Ollama"] },
  { category: "DevOps & Analytics", tools: ["Vercel", "Cloudflare", "Docker", "PostHog", "Stripe"] },
];

