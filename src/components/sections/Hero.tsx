import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Sparkles,
  Check,
  Activity,
} from "lucide-react";
import { STUDIO } from "@/content/studio";

interface HeroProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const Hero = ({ onOpenBooking, onNavigate }: HeroProps) => {
  const [activeTab, setActiveTab] = useState<"stream" | "evals" | "routing">(
    "stream",
  );

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Availability Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono tracking-wider uppercase text-neutral-700 dark:text-neutral-300 w-fit mb-6 shadow-2xs"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{STUDIO.availability}</span>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <span className="text-neutral-500">2–4 Week Delivery</span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-950 dark:text-white leading-[1.08] max-w-4xl mb-6"
        >
          Design. Build. Ship. <br />
          <span className="text-neutral-400 dark:text-neutral-500 font-light">
            AI-native products for founders.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 font-light leading-relaxed max-w-2xl mb-8"
        >
          We engineer full-stack web applications, autonomous LLM workflows, and
          conversion-focused MVPs that take startups from blank canvas to
          production users in weeks.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-4"
        >
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90 transition-all cursor-pointer shadow-sm group active:scale-98"
          >
            <Calendar className="w-4 h-4 text-indigo-400 dark:text-indigo-600" />
            <span>Book a strategy call</span>
            <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 font-medium text-sm transition-all cursor-pointer"
          >
            <span>Explore our work</span>
          </button>
        </motion.div>

        {/* Microline & Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-2 text-xs text-neutral-500 font-mono mb-16"
        >
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span>Free · 15 min · No commitment · Direct with lead engineer</span>
        </motion.div>

        {/* Hero Interactive UI Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="w-full rounded-2xl bg-neutral-900 border border-neutral-800 p-1.5 shadow-2xl overflow-hidden"
        >
          {/* Terminal / Browser Chrome */}
          <div className="bg-[#0f0f0f] rounded-xl border border-neutral-800/80 p-4 sm:p-6 text-neutral-300">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
                <div className="w-3 h-3 rounded-full bg-neutral-700" />
                <span className="ml-2 text-[11px] font-mono text-neutral-400">
                  ynz-runtime // production-cluster:us-east-1
                </span>
              </div>

              {/* Mockup tabs */}
              <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-lg border border-neutral-800 text-[11px] font-mono">
                {(["stream", "evals", "routing"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2.5 py-1 rounded transition-colors uppercase cursor-pointer ${
                      activeTab === tab
                        ? "bg-neutral-800 text-white font-semibold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab 1: Live Stream Preview */}
            {activeTab === "stream" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                <div className="lg:col-span-7 flex flex-col justify-between bg-black/60 rounded-lg p-4 border border-neutral-800/60 font-mono text-xs">
                  <div>
                    <div className="flex items-center justify-between text-neutral-400 text-[10px] pb-2 mb-3 border-b border-neutral-800">
                      <span>USER_PROMPT_INPUT</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Activity className="w-3 h-3 animate-pulse" />
                        STREAMING (142 tokens/sec)
                      </span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed font-sans text-xs">
                      "Synthesize diligence memo for Series-A SaaS deal: extract
                      ARR growth, net retention, and verify churn rate against
                      Q3 audit sheet coordinates."
                    </p>

                    <div className="mt-4 p-3 rounded bg-neutral-900/80 border border-neutral-800/80 text-[11px] text-neutral-300">
                      <div className="text-indigo-400 font-semibold mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>SYNTHESIZED DILIGENCE MEMO [GROUNDED]</span>
                      </div>
                      <p className="leading-relaxed">
                        • ARR: $4.2M (+140% YoY verified on DocPg-14)
                        <br />• Net Dollar Retention: 124% (Enterprise cohort)
                        <br />• Gross Margin: 82% (Sub-tenant infrastructure
                        verified)
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Model: Claude-3.5-Sonnet via ynz studio Gateway</span>
                    <span className="text-emerald-400 font-bold">
                      Latency: 412ms
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-between gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                      <span>Semantic Cache</span>
                      <span className="text-emerald-400">31.8% HIT</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      68.4% Cost Saved
                    </div>
                    <div className="text-[10px] text-neutral-400 font-sans mt-0.5">
                      Frequent queries served from local edge vectors without
                      hitting paid tokens.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-widest mb-1 flex items-center justify-between">
                      <span>Faithfulness Eval</span>
                      <span className="text-indigo-400">RAGAS 0.99</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      0% Hallucinations
                    </div>
                    <div className="text-[10px] text-neutral-400 font-sans mt-0.5">
                      Deterministic dual-step verification grounds every claim
                      in source documents.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-neutral-900/70 border border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase">
                        Production Uptime
                      </div>
                      <div className="text-sm font-bold text-emerald-400">
                        99.99% Guaranteed
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-neutral-400 uppercase">
                        Full Ownership
                      </div>
                      <div className="text-sm font-bold text-white">
                        100% Code & IP
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Evals View */}
            {activeTab === "evals" && (
              <div className="p-4 bg-black/60 rounded-lg border border-neutral-800 font-mono text-xs space-y-3">
                <div className="text-neutral-400 text-[10px] uppercase tracking-wider pb-2 border-b border-neutral-800 flex items-center justify-between">
                  <span>Automated Continuous Evaluation Pipeline</span>
                  <span className="text-emerald-400">
                    All 42 Test Suites Passing
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded bg-neutral-900/90 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400">
                      Context Precision
                    </div>
                    <div className="text-lg font-bold text-white mt-1">
                      98.6%
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">
                      ✓ Top-k retrieval relevance
                    </div>
                  </div>
                  <div className="p-3 rounded bg-neutral-900/90 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400">
                      JSON Schema Adherence
                    </div>
                    <div className="text-lg font-bold text-white mt-1">
                      100.0%
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">
                      ✓ Zod parse enforcement
                    </div>
                  </div>
                  <div className="p-3 rounded bg-neutral-900/90 border border-neutral-800">
                    <div className="text-[10px] text-neutral-400">
                      P95 Time to First Token
                    </div>
                    <div className="text-lg font-bold text-white mt-1">
                      280ms
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">
                      ✓ Edge CDN streaming
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Dynamic Routing */}
            {activeTab === "routing" && (
              <div className="p-4 bg-black/60 rounded-lg border border-neutral-800 font-mono text-xs space-y-3">
                <div className="text-neutral-400 text-[10px] uppercase tracking-wider pb-2 border-b border-neutral-800">
                  Adaptive Model Selection Router
                </div>
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span>Low entropy extraction & formatting</span>
                    <span className="text-sky-400">
                      → Local Ollama Llama-3.2 (0.00$ / token)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span>Complex multi-step legal reasoning</span>
                    <span className="text-indigo-400">
                      → Claude 3.5 Sonnet (Frontier API)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-neutral-900 border border-neutral-800">
                    <span>High-volume audio & dialect parsing</span>
                    <span className="text-amber-400">
                      → Whisper Large v3 + Gemini Flash
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
