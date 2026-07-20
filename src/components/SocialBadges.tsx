import { motion } from "framer-motion";

export interface SocialHandles {
  linkedin: string;
  twitter: string;
  portfolio: string;
}

interface SocialBadgesProps {
  handles: SocialHandles;
  delay?: number;
}

export const SocialBadges = ({ handles, delay = 0.5 }: SocialBadgesProps) => {
  const links = {
    linkedin: `https://linkedin.com/in/${handles.linkedin}`,
    twitter: `https://x.com/${handles.twitter}`,
    portfolio: `https://${handles.portfolio}`,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="flex flex-wrap items-center justify-center gap-3 mb-8"
    >
      {/* LinkedIn Badge */}
      <a
        href={links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-[#ebebeb] dark:border-white/10 text-xs font-medium text-[#4d4d4d] dark:text-neutral-300 hover:text-[#171717] dark:hover:text-cyan-300 hover:bg-[#fafafa] dark:hover:bg-cyan-500/5 hover:border-[#a1a1a1]/50 dark:hover:border-cyan-500/30 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none"
      >
        <div className="w-4 h-4 rounded-full bg-[#0077b5] flex items-center justify-center shrink-0">
          <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </div>
        <span>@{handles.linkedin}</span>
      </a>

      {/* X (Twitter) Badge */}
      <a
        href={links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-[#ebebeb] dark:border-white/10 text-xs font-medium text-[#4d4d4d] dark:text-neutral-300 hover:text-[#171717] dark:hover:text-cyan-300 hover:bg-[#fafafa] dark:hover:bg-cyan-500/5 hover:border-[#a1a1a1]/50 dark:hover:border-cyan-500/30 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none"
      >
        <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center shrink-0 border border-white/10">
          <svg className="w-2 h-2 text-white fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <span>@{handles.twitter}</span>
      </a>

      {/* Portfolio Badge */}
      <a
        href={links.portfolio}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-[#ebebeb] dark:border-white/10 text-xs font-medium text-[#4d4d4d] dark:text-neutral-300 hover:text-[#171717] dark:hover:text-cyan-300 hover:bg-[#fafafa] dark:hover:bg-cyan-500/5 hover:border-[#a1a1a1]/50 dark:hover:border-cyan-500/30 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none"
      >
        <div className="w-4 h-4 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center shrink-0 border border-neutral-800 dark:border-neutral-200">
          <svg className="w-2.5 h-2.5 text-white dark:text-black fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <span>Portfolio</span>
      </a>
    </motion.div>
  );
};
