import { Calendar, MessageSquare } from "lucide-react";
import { STUDIO } from "@/content/studio";

interface MobileCTAProps {
  onOpenBooking: () => void;
}

export const MobileCTA = ({ onOpenBooking }: MobileCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 p-3 px-4 flex items-center gap-2.5 shadow-2xl">
      <button
        onClick={onOpenBooking}
        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-xs cursor-pointer shadow-sm active:scale-98 transition-transform"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book 15-Min Call</span>
      </button>

      <a
        href={STUDIO.chatLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-11 h-11 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 active:scale-98 transition-transform"
        aria-label="Chat on Telegram"
      >
        <MessageSquare className="w-4 h-4 text-sky-500" />
      </a>
    </div>
  );
};

