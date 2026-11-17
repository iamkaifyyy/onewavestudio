import { ArrowUpRight, Sparkles, Mail, MessageSquare } from "lucide-react";
import { STUDIO } from "@/content/studio";

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const Footer = ({ onNavigate, onOpenBooking }: FooterProps) => {
  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-900 bg-white/50 dark:bg-black/50 backdrop-blur-xs transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 cols) */}
          <div className="md:col-span-2 flex flex-col items-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-cyan-400 inline-block" />
              <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white lowercase">
                ynz studio
              </span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-sm">
              An AI-native product studio designing and shipping
              high-performance web software, intelligent agents, and scalable
              MVPs for founders in weeks.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{STUDIO.availability}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
              Explore
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <button
                onClick={() => onNavigate("/work")}
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Selected Work & Case Studies
              </button>
              <button
                onClick={() => onNavigate("/process")}
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                4-Step Delivery Process
              </button>
              <button
                onClick={() => onNavigate("/pricing")}
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Pricing & Retainers
              </button>
              <button
                onClick={() => onNavigate("/about")}
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                About the Studio & Team
              </button>
              <button
                onClick={() => onNavigate("/contact")}
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Contact & Scheduling
              </button>
            </div>
          </div>

          {/* Work / Proof */}
          <div>
            <h4 className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
              Case Studies
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <button
                onClick={() => onNavigate("/work/vernacular-ai-jobs")}
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer truncate"
              >
                RozgarAI Voice Marketplace
              </button>
              <button
                onClick={() => onNavigate("/work/hybrid-llm-platform")}
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer truncate"
              >
                Kortex Hybrid LLM Gateway
              </button>
              <button
                onClick={() => onNavigate("/work/startup-intelligence-rag")}
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer truncate"
              >
                VenturePulse RAG Engine
              </button>
              <button
                onClick={() =>
                  onNavigate("/work/production-agent-infrastructure")
                }
                className="text-left hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer truncate"
              >
                OmniFlow Agent Execution
              </button>
            </div>
          </div>

          {/* Connect & Direct Actions */}
          <div>
            <h4 className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <a
                href={`mailto:${STUDIO.email}`}
                className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>{STUDIO.email}</span>
              </a>
              <a
                href={STUDIO.chatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                <span>Telegram Direct</span>
              </a>
              <a
                href={STUDIO.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <span>X / Twitter (@Iamkaifyyy)</span>
                <ArrowUpRight className="w-3 h-3 opacity-50" />
              </a>
              <a
                href={STUDIO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 opacity-50" />
              </a>
              <a
                href={STUDIO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3 h-3 opacity-50" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-4">
            <span>
              © {new Date().getFullYear()} {STUDIO.name}. All rights reserved.
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline font-mono text-[11px]">
              Strict NDA & IP Ownership Guaranteed
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="text-neutral-900 dark:text-white hover:underline cursor-pointer font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>Book an intro call</span>
            </button>
            <span>·</span>
            <span className="font-mono text-[11px] text-neutral-400">
              v2.0 (AI-Native)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
