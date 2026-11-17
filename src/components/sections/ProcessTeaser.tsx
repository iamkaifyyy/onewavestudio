import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Palette, Code2, Rocket } from "lucide-react";
import { PROCESS_STEPS } from "@/content/process";

interface ProcessTeaserProps {
  onNavigate: (path: string) => void;
}

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "01": Compass,
  "02": Palette,
  "03": Code2,
  "04": Rocket,
};

export const ProcessTeaser = ({ onNavigate }: ProcessTeaserProps) => {
  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              Delivery Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Idea to launch in 4 steps.
            </h2>
          </div>
          <button
            onClick={() => onNavigate("/process")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-white hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <span>See detailed process breakdown & deliverables</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Steps Horizontal Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[step.number] || Compass;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => onNavigate("/process")}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-neutral-50/70 dark:bg-[#0c0c0c] border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                    </div>
                    <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-600">
                      {step.number}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-indigo-600 dark:text-cyan-400 uppercase tracking-wider block mb-1">
                    {step.duration}
                  </span>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {step.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>Deliverables</span>
                  <span className="text-neutral-900 dark:text-white group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
