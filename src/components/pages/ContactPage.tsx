import { useState } from "react";
import { ArrowLeft, Calendar, MessageSquare, Mail, ExternalLink, Check, ShieldCheck, Sparkles } from "lucide-react";
import { STUDIO } from "@/content/studio";

interface ContactPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ContactPage = ({ onNavigate, onOpenBooking: _onOpenBooking }: ContactPageProps) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    packageType: "MVP Sprint (2-4 Weeks)",
    budget: "$5,000 - $10,000",
    message: "",
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
    const subject = encodeURIComponent(`Project Inquiry: ${formData.name} (${formData.packageType})`);
    const body = encodeURIComponent(
      `Hi Mohd Kaif & ynz studio,\n\nI want to build an AI product with you!\n\nName: ${formData.name}\nEmail: ${formData.email}\nScope: ${formData.packageType}\nBudget Range: ${formData.budget}\n\nProject Scope & Goals:\n${formData.message}\n\nLooking forward to speaking.\n\nBest regards,\n${formData.name}`
    );

    setTimeout(() => {
      window.location.href = `mailto:${STUDIO.email}?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <button
          onClick={() => onNavigate("/")}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Page Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
            <span>Direct Access to Builders</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
            Let's build something real.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            Choose your preferred channel below. Book directly on Cal.com, message on Telegram, or submit a scoping outline. We reply within 24 hours.
          </p>
        </div>

        {/* Fast Action Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <a
            href={STUDIO.calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4 text-neutral-900 dark:text-white group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
                Cal.com Schedule
              </h2>
              <p className="text-xs text-neutral-500 font-light">
                Pick a 15-minute slot directly on our calendar.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-cyan-400 mt-4">
              <span>Open Calendar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <a
            href={STUDIO.chatLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4 text-neutral-900 dark:text-white group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5 text-sky-500" />
              </div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
                Telegram Chat
              </h2>
              <p className="text-xs text-neutral-500 font-light">
                Message the founder directly for async technical chat.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between text-xs font-mono text-sky-500 mt-4">
              <span>@iamkaifyyy</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </a>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 transition-all shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4 text-neutral-900 dark:text-white">
                <Mail className="w-5 h-5 text-emerald-500" />
              </div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">
                Direct Email
              </h2>
              <p className="text-xs text-neutral-500 font-light">
                Send briefs, decks, or architectural specs.
              </p>
            </div>
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between mt-4">
              <button
                onClick={handleCopyEmail}
                className="text-xs font-mono text-neutral-700 dark:text-neutral-300 hover:underline cursor-pointer flex items-center gap-1"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : null}
                <span>{copiedEmail ? "Copied!" : STUDIO.email}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Scope Contact Form */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm mb-16">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
            Send a Project Brief
          </h2>
          <p className="text-xs text-neutral-500 font-light mb-8">
            Tell us about your target timeline, problem space, and budget bracket. We'll reply within 24 hours with an honest scope evaluation.
          </p>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/25 text-center">
              <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-base font-semibold text-emerald-900 dark:text-emerald-200 mb-1">
                Message Prepared Successfully
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-light mb-4">
                We're triggering your email client to send your brief to Mohd Kaif at {STUDIO.email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-emerald-800 dark:text-emerald-300 underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full h-11 px-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full h-11 px-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                    Sprint Type
                  </label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                  >
                    <option value="Landing Page Sprint (1-2 Weeks)">Landing Page Sprint (1–2 Weeks)</option>
                    <option value="MVP Sprint (2-4 Weeks)">Full MVP Sprint (2–4 Weeks)</option>
                    <option value="Monthly Retainer (Continuous)">Monthly Retainer (Continuous)</option>
                    <option value="Advisory / Architecture Audit">Advisory / Architecture Audit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                    Estimated Budget Bracket
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
                  >
                    <option value="$2,000 - $3,500">$2,000 – $3,500 (Landing Page)</option>
                    <option value="$5,000 - $10,000">$5,000 – $10,000 (MVP Sprint)</option>
                    <option value="$10,000+">$10,000+ (Multi-Agent / Enterprise)</option>
                    <option value="Undetermined">To be scoped on call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-500 uppercase tracking-wider mb-1.5">
                  Project Notes & Core Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe what you want to build, target users, and any existing mockups or links..."
                  className="w-full p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-neutral-500 font-light flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Your information is protected by strict studio confidentiality.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                >
                  Send Project Brief
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
