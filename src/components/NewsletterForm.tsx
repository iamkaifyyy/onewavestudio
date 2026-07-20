import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export const NewsletterForm = ({ delay = 0.6 }: { delay?: number }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="w-full max-w-md mb-24"
    >
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-2"
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="name@email.com"
                className="w-full h-10 px-4 rounded-md bg-white dark:bg-[#121212] border border-[#ebebeb] dark:border-neutral-800 focus:border-[#a1a1a1] dark:focus:border-neutral-700 text-[#171717] dark:text-white placeholder-[#888888] dark:placeholder-neutral-500 text-sm focus:outline-none transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none"
              />
              {error && (
                <span className="absolute -bottom-5 left-0 text-[11px] text-red-600 font-mono">
                  {error}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="h-10 px-5 rounded-md bg-[#171717] dark:bg-white hover:bg-[#171717]/90 dark:hover:bg-white/90 active:bg-black dark:active:bg-white/80 text-white dark:text-black text-sm font-medium transition-all duration-200 cursor-pointer shadow-md dark:shadow-none"
            >
              Sign up
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-md text-sm font-light font-mono shadow-sm dark:shadow-none"
          >
            <Check className="w-4 h-4 shrink-0 text-emerald-500 dark:text-emerald-400" />
            <span>Success! Welcome to the ecosystem.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
