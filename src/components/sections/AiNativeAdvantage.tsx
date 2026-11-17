import { motion } from "framer-motion";
import { Zap, Cpu, Users, Check } from "lucide-react";

interface AiNativeAdvantageProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const AiNativeAdvantage = ({ onOpenBooking, onNavigate: _onNavigate }: AiNativeAdvantageProps) => {
  const points = [
    {
      icon: Zap,
      badge: "In Our Workflow",
      title: "AI as engineering leverage",
      description:
        "We harness state-of-the-art AI scaffolding, automated unit tests, and continuous refactoring agents. What previously took a team of 5 engineers three months now ships in 2 to 4 weeks with higher test coverage.",
      proofs: [
        "Automated regression test suites generated on every branch",
        "Deterministic schema sync between frontend types and database models",
        "Rapid functional prototyping in days rather than multiple sprints",
      ],
    },
    {
      icon: Cpu,
      badge: "In Your Product",
      title: "Grounded, hallucination-free AI architecture",
      description:
        "Anyone can wrap an OpenAI API call in a text box. We architect production-grade LLM routing, semantic vector retrieval (RAG), response caching, and structured schema parsers that don't fail silently.",
      proofs: [
        "Multi-model fallback routing (Claude, Gemini, Llama) with cost optimization",
        "Real-time streaming UI components with sub-300ms time-to-first-token",
        "Continuous automated prompt eval testbeds ensuring 99%+ schema reliability",
      ],
    },
    {
      icon: Users,
      badge: "In Our Collaboration",
      title: "Small senior team, zero account managers",
      description:
        "You communicate directly with the senior engineers designing your Figma files and writing your pull requests. No telephone games, no bureaucratic status decks, and no untechnical middlemen.",
      proofs: [
        "Direct async Slack or Telegram channel with the lead builder",
        "Loom video updates and live staging preview links on every milestone",
        "Honest scoping: we challenge bloated features and protect your runway",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-black/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            Why Work With Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-4">
            How we're different: <br className="hidden sm:inline" />
            <span className="text-indigo-600 dark:text-cyan-400">Actually "AI-native".</span>
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            "AI-native" shouldn't be an empty buzzword. Here is what it concretely means for your timeline, budget, and final product quality.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                      {point.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2.5">
                    {point.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                    {point.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                    {point.proofs.map((proof) => (
                      <div key={proof} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{proof}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-semibold text-white">
              Want to see how your product concept looks with our AI pipeline?
            </h4>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              We'll review your scope and sketch out the fastest technical delivery path in a 15-minute call.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
          >
            Book 15-Min Strategy Call
          </button>
        </div>
      </div>
    </section>
  );
};
