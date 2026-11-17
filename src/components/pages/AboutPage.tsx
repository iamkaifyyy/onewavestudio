import { ArrowLeft, Users } from "lucide-react";
import { TEAM, PRINCIPLES, STACK_TOOLS } from "@/content/team";
import { STUDIO } from "@/content/studio";

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const AboutPage = ({ onNavigate, onOpenBooking }: AboutPageProps) => {
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
            <Users className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
            <span>Who We Are & Why AI-Native</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            Building software at the speed of thought.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            {STUDIO.name} is a boutique AI-native product studio founded by engineers who love shipping. We partner with ambitious founders to design, build, and launch production software in weeks instead of quarters.
          </p>
        </div>

        {/* Story Section */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm mb-16">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Our Story & Mission
          </h2>
          <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            <p>
              Traditional agencies are weighed down by bloated project managers, endless status meetings, and slow junior staffing. We started {STUDIO.name} with a simple thesis: a tiny, senior team using modern AI engineering leverage can out-ship traditional 10-person dev shops with higher technical precision and 1/3 the budget.
            </p>
            <p>
              We treat your startup like our own. That means honest scoping, zero fluff, direct communication in private Slack or Telegram channels, and complete handover of clean, unencumbered source code and Figma files.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            The Builder
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-8">
            Leadership & Engineering
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-14 h-14 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover bg-neutral-100 dark:bg-neutral-900"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center gap-3 text-xs font-mono">
                  {member.links.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      GitHub →
                    </a>
                  )}
                  {member.links.x && (
                    <a
                      href={member.links.x}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      X (Twitter) →
                    </a>
                  )}
                  {member.links.linkedin && (
                    <a
                      href={member.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operating Principles */}
        <div className="mb-20">
          <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            Core Beliefs
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-8">
            How we operate.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRINCIPLES.map((principle) => (
              <div
                key={principle.title}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm"
              >
                <div className="font-mono text-xs text-indigo-600 dark:text-cyan-400 mb-2">
                  {principle.number}
                </div>
                <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">
                  {principle.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack We Use */}
        <div className="mb-20">
          <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
            Technologies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-8">
            Tools & Stack We Trust
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {STACK_TOOLS.map((category) => (
              <div
                key={category.category}
                className="p-5 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 pb-2 border-b border-neutral-100 dark:border-neutral-900">
                  {category.category}
                </h4>
                <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                  {category.tools.map((tool) => (
                    <div key={tool} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 dark:bg-cyan-400" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Ready to build together?</h3>
            <p className="text-xs text-neutral-400 font-light">
              Book a 15-minute intro call to discuss your roadmap with Mohd Kaif.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
          >
            Book Strategy Call
          </button>
        </div>
      </div>
    </div>
  );
};
