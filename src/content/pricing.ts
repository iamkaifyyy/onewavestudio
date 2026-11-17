export interface PricingPackage {
  id: string;
  name: string;
  popular?: boolean;
  tagline: string;
  bestFor: string;
  price: string;
  billingPeriod: string;
  timeline: string;
  description: string;
  deliverables: string[];
  ctaLabel: string;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "landing-page",
    name: "Landing Page Sprint",
    tagline: "Validate fast with high conversion",
    bestFor: "Startups & products launching soon needing a high-trust digital storefront.",
    price: "$2,200",
    billingPeriod: "one-time flat fee",
    timeline: "1 to 2 Weeks",
    description:
      "A bespoke, conversion-optimized marketing site built to explain your value proposition, showcase social proof, and convert visitors into leads or waitlist signups.",
    deliverables: [
      "Custom UI/UX designed in Figma (No generic templates)",
      "Production Next.js / React build with Tailwind CSS",
      "Subtle Framer Motion interactions & responsive mobile layouts",
      "SEO setup: OpenGraph images, metadata tags & sitemap",
      "Waitlist / Lead Capture integration (Resend / Loops / Supabase)",
      "Analytics setup (PostHog / Plausible) tracking CTA conversions",
    ],
    ctaLabel: "Book 15-min Intro Call",
  },
  {
    id: "mvp-sprint",
    name: "Full MVP Sprint",
    popular: true,
    tagline: "Turn your core thesis into a live software product",
    bestFor: "Founders needing their first version built and shipped to users in weeks, not quarters.",
    price: "$5,500",
    billingPeriod: "milestone-based fixed scope",
    timeline: "2 to 4 Weeks",
    description:
      "End-to-end design, full-stack development, and production deployment of your core product. Built with clean architecture, auth, billing, and AI pipelines.",
    deliverables: [
      "Complete Discovery & Technical Architecture Document",
      "Interactive Figma Design System & clickable prototype",
      "Full-stack web application (Next.js / React + TypeScript)",
      "User Authentication & Roles (Clerk / Supabase Auth)",
      "Database schema & migration scripts (PostgreSQL / Prisma)",
      "AI Pipeline Integration (LLM streaming, RAG vector embeddings, evals)",
      "Stripe Subscription Billing & checkout checkout flow",
      "Automated CI/CD deployment to Vercel or Cloudflare",
      "14 days of dedicated post-launch support & bug warranty",
    ],
    ctaLabel: "Book 15-min Intro Call",
  },
  {
    id: "monthly-retainer",
    name: "Dedicated Retainer",
    tagline: "Continuous build velocity for growing products",
    bestFor: "Funded teams or post-launch founders who need sustained engineering and design momentum.",
    price: "$4,800",
    billingPeriod: "per month · pause or cancel anytime",
    timeline: "Ongoing Dedicated Velocity",
    description:
      "Senior product design and full-stack engineering capacity embedded into your workflow. One active request at a time with rapid 24–48 hour iterations.",
    deliverables: [
      "Dedicated senior designer & full-stack AI engineer bandwidth",
      "Continuous feature design, frontend builds & API integrations",
      "Direct Slack / Telegram channel for async collaboration",
      "Weekly staging deployments & milestone video demos",
      "Database tuning, latency caching & prompt optimization",
      "Zero long-term contract lock-in — pause or cancel with 14 days notice",
    ],
    ctaLabel: "Inquire About Capacity",
  },
];

export const INCLUDED_IN_EVERY_PACKAGE: string[] = [
  "100% intellectual property & code ownership transferred to you",
  "Clean, typed TypeScript codebase with zero proprietary vendor lock-in",
  "Full Figma design files with editable components and token styles",
  "Private GitHub repository with clean commit logs and deployment scripts",
  "Direct communication with senior engineers — zero account managers",
  "Daily or async 48-hour progress updates with video demos",
];

