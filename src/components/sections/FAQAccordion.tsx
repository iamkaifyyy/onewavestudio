import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { FAQS } from "@/content/faq";

interface FAQAccordionProps {
  onOpenBooking: () => void;
}

export const FAQAccordion = ({ onOpenBooking }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
            <span>Questions & Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
            Frequently asked questions.
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light">
            Everything you need to know about IP ownership, delivery timelines, pricing, and how we build.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-neutral-50 dark:bg-[#0c0c0c] border-neutral-300 dark:border-neutral-700 shadow-sm"
                    : "bg-white dark:bg-neutral-950/60 border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-neutral-900 text-white dark:bg-white dark:text-black"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800/60 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Have a question not answered? */}
        <div className="mt-12 text-center text-xs text-neutral-500 font-mono">
          <span>Have a specific architectural question? </span>
          <button
            onClick={onOpenBooking}
            className="text-neutral-900 dark:text-white underline font-semibold hover:text-indigo-600 dark:hover:text-cyan-400 cursor-pointer ml-1"
          >
            Ask us directly on a 15-min call →
          </button>
        </div>
      </div>
    </section>
  );
};
