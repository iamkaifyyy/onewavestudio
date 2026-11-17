export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Process" | "Pricing" | "AI & Tech";
}

export const FAQS: FAQItem[] = [
  {
    category: "General",
    question: "Do I own 100% of the code, designs, and intellectual property?",
    answer:
      "Yes. You retain 100% legal ownership of everything we create — including all Figma files, source code, database schemas, and AI prompts. Upon final invoice settlement, we push everything directly to your private GitHub repository and transfer all production keys.",
  },
  {
    category: "Process",
    question: "How long does a typical build take?",
    answer:
      "A Landing Page sprint takes 1 to 2 weeks. A complete production-ready MVP sprint takes between 2 and 4 weeks from kickoff to deployment. For ongoing iteration, our monthly retainer ships updates in 24 to 48-hour sprints.",
  },
  {
    category: "Pricing",
    question: "How does pricing work? Are there any hidden fees or hourly surprises?",
    answer:
      "We operate strictly on fixed-price milestone sprints or predictable monthly retainers. You receive a guaranteed price and scope before we write a single line of code. We do not bill hourly, and you will never receive an unexpected bill.",
  },
  {
    category: "Process",
    question: "What happens after our product is launched?",
    answer:
      "Every project includes 14 days of complimentary post-launch support and bug warranty to ensure everything runs smoothly in production. Afterward, you can either manage the clean codebase yourself, hire in-house, or transition into our Monthly Retainer for ongoing feature development.",
  },
  {
    category: "AI & Tech",
    question: "How is AI used during our project?",
    answer:
      "In two ways: First, in our workflow — we use cutting-edge AI scaffolding, automated unit test generation, and intelligent refactoring tools to accelerate development speed by 3–4x. Second, inside your product — we implement robust, low-latency LLM routing, RAG retrieval pipelines, streaming interfaces, and automated prompt evals so your software doesn't hallucinate or fail silently.",
  },
  {
    category: "AI & Tech",
    question: "What tech stack do you recommend and build with?",
    answer:
      "Our default production stack is Next.js / React with TypeScript, Tailwind CSS, PostgreSQL (via Supabase or Prisma/Drizzle), and Python / FastAPI where heavy background AI processing is required. This stack is industry-standard, ultra-fast, and easily handed over to future engineering hires.",
  },
  {
    category: "General",
    question: "Will you sign a non-disclosure agreement (NDA)?",
    answer:
      "Absolutely. We are happy to sign a mutual NDA before our initial discovery call or deep architectural review to protect your proprietary ideas, business logic, and intellectual property.",
  },
  {
    category: "Process",
    question: "What time zone do you work in and how do we communicate?",
    answer:
      "We operate across global hours with daily overlapping coverage for US, European, and Asian time zones. We prioritize high-signal asynchronous communication via private Slack or Telegram channels, with scheduled video check-ins and screen recording demos for every major milestone.",
  },
];

