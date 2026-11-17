export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  tagline: string;
  duration: string;
  description: string;
  whatHappens: string[];
  whatYouGet: string[];
  whatWeNeedFromYou: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "Step 01",
    number: "01",
    title: "Discovery & Scope Lock",
    tagline: "Define the critical path to user value",
    duration: "Days 1–3",
    description:
      "We begin with a deep dive into your product thesis, target users, and competitive landscape. We strip away speculative bloat and lock down a realistic, high-impact MVP scope that can be validated in market.",
    whatHappens: [
      "Intro strategy call to align on business metrics and technical constraints",
      "Analysis of technical feasibility (AI models, external APIs, auth, storage)",
      "Architecture blueprint drafting and shared milestone roadmap definition",
      "Repository setup, staging domain creation, and communications channel kickoff",
    ],
    whatYouGet: [
      "Pragmatic Scope Document with firm timeline and deliverables",
      "Technical Architecture Diagram & schema specifications",
      "Private GitHub repository & project board access",
      "Direct async Slack or Telegram channel with the lead builder",
    ],
    whatWeNeedFromYou: [
      "Product context, existing brand guidelines, or reference products",
      "Clear definition of your primary success metric (e.g. signups, retention)",
      "Access to relevant 3rd-party accounts (OpenAI, Stripe, AWS/Vercel)",
    ],
  },
  {
    step: "Step 02",
    number: "02",
    title: "Design & Functional Prototyping",
    tagline: "From rough concept to pixel-accurate clarity",
    duration: "Week 1–2",
    description:
      "We design interactive, modern UI components in Figma before writing production code. You review the exact interactions, user journeys, and micro-animations your customers will touch.",
    whatHappens: [
      "Wireframing key user flows and dashboard information architecture",
      "High-fidelity UI creation following minimal, conversion-focused design standards",
      "Clickable prototype linking all critical user paths for validation",
      "Comprehensive design token system export (colors, typography, radii, dark mode)",
    ],
    whatYouGet: [
      "Interactive Figma Prototype covering desktop and mobile viewports",
      "Production-ready design system tokens ready for Tailwind CSS",
      "Video walkthrough explaining UI decisions and interaction states",
      "Full design ownership and open Figma export file",
    ],
    whatWeNeedFromYou: [
      "Consolidated feedback on layout and copy tone within 48 hours",
      "Sample realistic data or assets you wish displayed in mockups",
    ],
  },
  {
    step: "Step 03",
    number: "03",
    title: "Full-Stack & AI Engineering",
    tagline: "Production-grade code written with AI acceleration",
    duration: "Weeks 2–3",
    description:
      "We execute the full-stack build. Using modern AI-native engineering tools, our senior engineers write tested, secure, and performant code in days rather than months. You get live staging links with continuous deployment.",
    whatHappens: [
      "Next.js / React application scaffolding with Tailwind CSS tokens",
      "Database schema provisioning (PostgreSQL / Supabase / Prisma)",
      "AI pipeline engineering: LLM routing, streaming outputs, vector RAG embeddings",
      "Auth gating, role permissions, Stripe subscription webhooks integration",
    ],
    whatYouGet: [
      "Live preview environments deployed automatically on every Git push",
      "End-to-end integration test coverage for authentication and payments",
      "Async Loom video demo updates at the end of every engineering milestone",
      "Clean, modular TypeScript codebase with strict ESLint and zero tech debt",
    ],
    whatWeNeedFromYou: [
      "Hands-on review of staging previews as features are completed",
      "Sign-off on external credentials and payment processor test keys",
    ],
  },
  {
    step: "Step 04",
    number: "04",
    title: "Launch, Telemetry & Handover",
    tagline: "Ship to production, monitor real users, retain full ownership",
    duration: "Week 4 & Beyond",
    description:
      "We transition the staging application to your custom domain, set up real-time error tracking and analytics, hand over complete documentation, and remain on standby to iterate based on real customer feedback.",
    whatHappens: [
      "Production deployment configuration (DNS, SSL, CDN edge caching)",
      "Error telemetry, logging, and performance monitoring setup (Sentry / PostHog)",
      "Security audit: environment variables, API rate limiting, and CORS verification",
      "Full ownership transfer of repositories, hosting services, and databases",
    ],
    whatYouGet: [
      "Live, operational product on your company's domain",
      "Comprehensive Developer Handover Documentation & deployment guide",
      "14 days of dedicated post-launch bug warranty and support",
      "Seamless option to transition into a Monthly Retainer for ongoing features",
    ],
    whatWeNeedFromYou: [
      "Custom domain DNS access for production deployment",
      "Launch day celebration and public announcement readiness",
    ],
  },
];

