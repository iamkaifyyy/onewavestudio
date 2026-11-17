import { motion } from "framer-motion";
import { Layers, BrainCircuit, Rocket, RefreshCw, ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "@/content/services";

interface ServicesProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "product-design": Layers,
  "ai-development": BrainCircuit,
  "mvp-sprint": Rocket,
  "monthly-retainer": RefreshCw,
};

export const Services = ({ onOpenBooking, onNavigate: _onNavigate }: ServicesProps) => {
  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-black/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              Capabilities & Offerings
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              What we provide.
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light max-w-md leading-relaxed">
            Every engagement is led by senior engineers and designers. We build production systems without intermediate layers or agency bloat.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = SERVICE_ICONS[service.id] || Layers;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                    </div>
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1.5">
                    {service.title}
                  </h3>
                  <div className="text-xs font-mono text-indigo-600 dark:text-cyan-400 mb-3">
                    {service.tagline}
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 mb-6">
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                      Our Promise
                    </div>
                    <div className="text-xs font-medium text-neutral-900 dark:text-white">
                      {service.promise}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200/60 dark:border-neutral-800/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-white hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors cursor-pointer ml-3 shrink-0"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

