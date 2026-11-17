import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";
import { STUDIO } from "@/content/studio";

export const SocialProof = () => {
  return (
    <section className="py-14 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Proof Strip Banner */}
        <div className="rounded-2xl bg-neutral-900 dark:bg-[#0c0c0c] border border-neutral-800 p-6 sm:p-8 text-white relative overflow-hidden mb-12 shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider">
                    Hackathon Winner
                  </span>
                  <span className="text-xs text-neutral-400">AI for Bharat 2026</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white mt-1">
                  1st Place Recognition for Vernacular Multi-Agent Architecture
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-0.5">
                  Engineered RozgarAI — automated voice dial-in pipeline serving informal laborers without text interfaces.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Production Verified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Studio Real Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
          {STUDIO.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="pt-4 sm:pt-0 sm:px-6 first:pl-0 last:pr-0"
            >
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                {metric.label}
              </div>
              <div className="text-[11px] text-neutral-500 font-light leading-normal">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Real Projects Built strip */}
        <div className="mt-12 pt-8 border-t border-dashed border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <span className="uppercase tracking-widest text-[10px]">
            Verified Architecture Shipments:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-neutral-700 dark:text-neutral-300 font-medium">
            <span>• RozgarAI Voice Engine</span>
            <span>• Kortex Hybrid Router</span>
            <span>• VenturePulse RAG</span>
            <span>• OmniFlow Agent Fabric</span>
          </div>
        </div>
      </div>
    </section>
  );
};
