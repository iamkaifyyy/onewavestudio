import { ArrowLeft, Check, Clock, PackageCheck, AlertCircle, Sparkles } from "lucide-react";
import { PROCESS_STEPS } from "@/content/process";

interface ProcessPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ProcessPage = ({ onNavigate, onOpenBooking }: ProcessPageProps) => {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
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
            <span>Delivery Playbook</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            The 4-step delivery process.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            A disciplined, milestone-driven framework engineered for speed. Here is exactly what happens from our first kickoff call to your production URL.
          </p>
        </div>

        {/* 4 Detailed Process Cards */}
        <div className="space-y-12 mb-20">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-6 border-b border-neutral-100 dark:border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-mono font-bold text-sm flex items-center justify-center">
                    {step.number}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                      {step.title}
                    </h2>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      {step.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300 w-fit">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Timeline: {step.duration}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-8">
                {step.description}
              </p>

              {/* 3 Columns: What Happens, What You Get, What We Need */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1: What Happens */}
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
                    <span>What Happens</span>
                  </h3>
                  <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 font-light">
                    {step.whatHappens.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: What You Get */}
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                    <PackageCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>What You Get</span>
                  </h3>
                  <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 font-light">
                    {step.whatYouGet.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: What We Need */}
                <div className="p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                    <span>What We Need From You</span>
                  </h3>
                  <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 font-light">
                    {step.whatWeNeedFromYou.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Ready to start Step 01?</h3>
            <p className="text-xs text-neutral-400 font-light">
              Book a 15-minute scoping call to map your product architecture.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
          >
            Schedule Discovery Call
          </button>
        </div>
      </div>
    </div>
  );
};
