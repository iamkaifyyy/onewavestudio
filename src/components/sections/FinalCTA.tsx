import { motion } from "framer-motion";
import { Calendar, ArrowUpRight, Check, Sparkles, MessageSquare } from "lucide-react";
import { STUDIO } from "@/content/studio";

interface FinalCTAProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const FinalCTA = ({ onOpenBooking, onNavigate }: FinalCTAProps) => {
  return (
    <section className="py-20 md:py-32 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background ambient mesh glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[450px] pointer-events-none opacity-20 blur-[120px] bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500" />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono tracking-wider uppercase text-neutral-300 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{STUDIO.availability}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5 leading-tight"
        >
          Have something you want built?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-300 font-light max-w-xl mx-auto leading-relaxed mb-10"
        >
          Tell us what you're working on and we'll map the fastest path to real users. No sales pitch, just honest technical scoping with the builder.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-100 transition-all cursor-pointer shadow-lg active:scale-98"
          >
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span>Book an intro call</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </button>

          <button
            onClick={() => onNavigate("/pricing")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-medium text-sm transition-all cursor-pointer"
          >
            <span>See pricing & packages</span>
          </button>

          <a
            href={STUDIO.chatLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 text-neutral-300 border border-neutral-800 font-medium text-sm transition-all"
          >
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Chat on Telegram</span>
          </a>
        </motion.div>

        {/* Microline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-mono text-neutral-400"
        >
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free 15-min intro call</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>No commitment</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Replies within 24h</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
