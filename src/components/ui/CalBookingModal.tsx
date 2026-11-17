import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  MessageSquare,
  Mail,
  ExternalLink,
  Check,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { STUDIO } from "@/content/studio";

interface CalBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

export const CalBookingModal = ({
  isOpen,
  onClose,
  defaultTopic,
}: CalBookingModalProps) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    timeline: "2-4 weeks (MVP Sprint)",
    notes: defaultTopic ? `Inquiring about: ${defaultTopic}` : "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Mohd Kaif & ynz studio team,\n\nI want to discuss an AI product build!\n\nName: ${formData.name}\nEmail: ${formData.email}\nTarget Timeline: ${formData.timeline}\n\nProject Notes:\n${formData.notes || "Looking forward to our call."}\n\nBest regards,\n${formData.name}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${STUDIO.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400 w-fit mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
              <span>{STUDIO.availability}</span>
            </div>

            <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-2">
              Book a 15-Min Strategy Call
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light mb-6">
              Pick a time on our calendar, message us directly on Telegram, or
              drop a quick project note below. Zero pitch, 100% technical
              clarity.
            </p>

            {/* Fast Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a
                href={STUDIO.calLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-medium text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm group"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-indigo-400 dark:text-indigo-600" />
                  <span>Open Cal.com Calendar</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={STUDIO.chatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 font-medium text-xs transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-sky-500" />
                  <span>Chat on Telegram</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
              <span className="bg-white dark:bg-[#0c0c0c] px-3 text-[11px] font-mono text-neutral-400 uppercase tracking-widest absolute">
                Or send a quick note
              </span>
            </div>

            {/* Quick Contact Form */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20 text-center"
              >
                <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200 mb-1">
                  Drafting your email client...
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-light mb-4">
                  We are opening your default mail application to send your
                  scope directly to Kaif. Replies within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-emerald-800 dark:text-emerald-300 underline cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Alex Mercer"
                      className="w-full h-10 px-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="alex@company.com"
                      className="w-full h-10 px-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                    Target Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData({ ...formData, timeline: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                  >
                    <option value="1-2 weeks (Landing Page Sprint)">
                      1–2 Weeks (Landing Page Sprint)
                    </option>
                    <option value="2-4 weeks (MVP Sprint)">
                      2–4 Weeks (Full MVP Sprint)
                    </option>
                    <option value="Ongoing (Monthly Retainer)">
                      Ongoing (Monthly Retainer)
                    </option>
                    <option value="Just exploring feasibility">
                      Just exploring feasibility
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-1">
                    What are you building?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Brief 1-sentence overview of your product idea or AI workflow..."
                    className="w-full p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-mono cursor-pointer transition-colors"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Mail className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedEmail
                        ? "Copied hello@ynz.studio"
                        : "Copy direct email"}
                    </span>
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                  >
                    Send Intro Scope
                  </button>
                </div>
              </form>
            )}

            {/* Trust footer */}
            <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>15 minutes · Free</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero spam · Mutual NDA friendly</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
