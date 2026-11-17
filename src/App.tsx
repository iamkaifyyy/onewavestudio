import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/lib/router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { CalBookingModal } from "@/components/ui/CalBookingModal";

// Pages
import { HomePage } from "@/components/pages/HomePage";
import { AboutPage } from "@/components/pages/AboutPage";
import { ProcessPage } from "@/components/pages/ProcessPage";
import { PricingPage } from "@/components/pages/PricingPage";
import { WorkPage } from "@/components/pages/WorkPage";
import { CaseStudyPage } from "@/components/pages/CaseStudyPage";
import { ContactPage } from "@/components/pages/ContactPage";

const App = () => {
  const { path, route, navigate } = useRouter();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingTopic, setBookingTopic] = useState<string | undefined>();

  // Theme state with localStorage persistence (dark default)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
      return "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const openBooking = (topic?: string) => {
    setBookingTopic(topic);
    setBookingModalOpen(true);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark" : ""
      } min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-800 dark:selection:text-white flex flex-col justify-between transition-colors duration-300 pb-16 sm:pb-0 relative overflow-x-hidden`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden opacity-25 dark:opacity-30 z-0">
        <div className="absolute top-[-20%] left-[15%] w-[45%] h-[65%] rounded-full bg-gradient-to-tr from-indigo-500/20 via-sky-500/15 to-purple-500/10 blur-[130px]" />
        <div className="absolute top-[-15%] right-[10%] w-[40%] h-[60%] rounded-full bg-gradient-to-tl from-emerald-500/15 via-cyan-500/15 to-indigo-500/10 blur-[130px]" />
      </div>

      {/* Sticky Navbar */}
      <Navbar
        currentPath={path}
        onNavigate={navigate}
        onOpenBooking={() => openBooking()}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full relative z-10">
        <AnimatePresence mode="wait">
          {route.page === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HomePage
                onOpenBooking={() => openBooking()}
                onNavigate={navigate}
              />
            </motion.div>
          )}

          {route.page === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AboutPage
                onNavigate={navigate}
                onOpenBooking={() => openBooking("Studio Partnership")}
              />
            </motion.div>
          )}

          {route.page === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProcessPage
                onNavigate={navigate}
                onOpenBooking={() => openBooking("Delivery Process")}
              />
            </motion.div>
          )}

          {route.page === "pricing" && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <PricingPage
                onNavigate={navigate}
                onOpenBooking={() => openBooking("Sprint Package")}
              />
            </motion.div>
          )}

          {route.page === "work" && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <WorkPage
                onNavigate={navigate}
                onOpenBooking={() => openBooking("Portfolio Inquiry")}
              />
            </motion.div>
          )}

          {route.page === "casestudy" && route.slug && (
            <motion.div
              key={`casestudy-${route.slug}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <CaseStudyPage
                slug={route.slug}
                onNavigate={navigate}
                onOpenBooking={() => openBooking(`Case Study: ${route.slug}`)}
              />
            </motion.div>
          )}

          {route.page === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ContactPage
                onNavigate={navigate}
                onOpenBooking={() => openBooking()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigate}
        onOpenBooking={() => openBooking()}
      />

      {/* Floating CTA bar on mobile */}
      <MobileCTA onOpenBooking={() => openBooking()} />

      {/* Cal.com Strategy Call Modal */}
      <CalBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultTopic={bookingTopic}
      />
    </div>
  );
};

export default App;
