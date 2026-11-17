import { ArrowLeft, Check, ShieldCheck, Sparkles } from "lucide-react";
import { PRICING_PACKAGES, INCLUDED_IN_EVERY_PACKAGE } from "@/content/pricing";
import { FAQS } from "@/content/faq";

interface PricingPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const PricingPage = ({ onNavigate, onOpenBooking }: PricingPageProps) => {
  const pricingFaqs = FAQS.filter(
    (f) => f.category === "Pricing" || f.category === "General"
  );

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <button
          onClick={() => onNavigate("/")}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
            <span>Investment & Deliverables</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            Transparent pricing. <br />
            Guaranteed deliverables.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            Hiding prices breeds distrust. We publish our pricing openly so you can plan your runway with complete certainty. Every engagement is backed by fixed milestone terms.
          </p>
        </div>

        {/* 3 Pricing Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-20">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between p-8 rounded-2xl transition-all ${
                pkg.popular
                  ? "bg-white dark:bg-[#0f0f0f] border-2 border-indigo-600 dark:border-cyan-400 shadow-2xl"
                  : "bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 dark:bg-cyan-400 text-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  Recommended for MVPs
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {pkg.name}
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800">
                    {pkg.timeline}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 mb-6 font-light">
                  {pkg.tagline}
                </p>

                {/* Price block */}
                <div className="mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-900">
                  <div className="text-4xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight">
                    {pkg.price}
                  </div>
                  <div className="text-xs text-neutral-500 font-mono mt-1">
                    {pkg.billingPeriod}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-800/60 mb-6 text-xs text-neutral-700 dark:text-neutral-300 font-light">
                  <span className="font-semibold text-neutral-900 dark:text-white block mb-0.5">
                    Best suited for:
                  </span>
                  {pkg.bestFor}
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                    Full Package Inclusions:
                  </div>
                  {pkg.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={onOpenBooking}
                className={`w-full py-3.5 rounded-xl font-semibold text-xs transition-all cursor-pointer shadow-sm ${
                  pkg.popular
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-black hover:opacity-90"
                    : "bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800"
                }`}
              >
                {pkg.ctaLabel}
              </button>
            </div>
          ))}
        </div>

        {/* Included in Every Package Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm mb-20">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Studio Standards</span>
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            What's included in every single package:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {INCLUDED_IN_EVERY_PACKAGE.map((item) => (
              <div key={item} className="flex items-start gap-3 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing FAQs */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
            Pricing & Contract FAQ
          </h2>
          <div className="space-y-4">
            {pricingFaqs.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800"
              >
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Have custom scope requirements?</h3>
            <p className="text-xs text-neutral-400 font-light">
              We can tailor a sprint to match your exact funding milestones and technical architecture.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
          >
            Discuss Custom Scope
          </button>
        </div>
      </div>
    </div>
  );
};
