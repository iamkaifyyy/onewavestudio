import { motion } from "framer-motion";
import { ArrowUpRight, Check, Calendar, Sparkles } from "lucide-react";
import { PRICING_PACKAGES } from "@/content/pricing";

interface PricingTeaserProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const PricingTeaser = ({ onOpenBooking, onNavigate }: PricingTeaserProps) => {
  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-50/50 dark:bg-black/40">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              Simple, Transparent Terms
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Predictable pricing. Zero surprises.
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light max-w-md leading-relaxed">
            Fixed milestone sprints or flexible monthly retainers. No hourly billing, no agency bloat, and you own 100% of everything we build.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PRICING_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl transition-all duration-300 ${
                pkg.popular
                  ? "bg-white dark:bg-[#0f0f0f] border-2 border-indigo-600 dark:border-cyan-400 shadow-xl"
                  : "bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 dark:bg-cyan-400 text-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular Sprint</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {pkg.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                    {pkg.timeline}
                  </span>
                </div>

                <div className="text-xs text-neutral-500 font-light mb-5">
                  {pkg.tagline}
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-900">
                  <div className="text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                    {pkg.price}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono mt-1">
                    {pkg.billingPeriod}
                  </div>
                </div>

                {/* Best for */}
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                  {pkg.bestFor}
                </p>

                {/* Deliverables preview */}
                <div className="space-y-2.5 mb-8">
                  {pkg.deliverables.slice(0, 4).map((d) => (
                    <div key={d} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                  {pkg.deliverables.length > 4 && (
                    <div className="text-[11px] font-mono text-neutral-400 pl-5">
                      + {pkg.deliverables.length - 4} more inclusions
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                    pkg.popular
                      ? "bg-neutral-950 text-white dark:bg-white dark:text-black hover:opacity-90"
                      : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{pkg.ctaLabel}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Pricing details banner */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Need a custom scope or specific model architecture?
            </h4>
            <p className="text-xs text-neutral-500 font-light mt-0.5">
              Review full package deliverables, what's included in every sprint, and contract terms.
            </p>
          </div>
          <button
            onClick={() => onNavigate("/pricing")}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            <span>View Full Pricing Page</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
