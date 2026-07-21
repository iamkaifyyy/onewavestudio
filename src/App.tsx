import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowLeft, Send, CheckCircle2, Server, Activity, ArrowUpRight, Sparkles } from "lucide-react";
import { InfinityLogo } from "@/components/InfinityLogo";
import { SocialBadges } from "@/components/SocialBadges";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SaaSGrid } from "@/components/SaaSGrid";
import { DocsPage } from "@/components/DocsPage";

// Custom handles configured at the app level
const SOCIAL_HANDLES = {
  linkedin: "iamkaifyyy",
  twitter: "Iamkaifyyy",
  portfolio: "kaifyyy-sh.vercel.app",
};

type ViewType = "home" | "status" | "privacy" | "terms" | "build" | "docs";

const App = () => {
  const line1 = "An ecosystem of ambitious products";
  const line2 = "engineered for the modern world.";

  // Routing and intake prefill state
  const [view, setView] = useState<ViewType>("home");


  // Scoping intake form inputs
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientBudget, setClientBudget] = useState("5000-10000");
  const [clientScope, setClientScope] = useState("");
  const [intakeSuccess, setIntakeSuccess] = useState(false);

  // Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
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

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  // Prefill the scoping text box and redirect
  const handleInitiateBuild = (proposalText: string) => {
    setClientScope(proposalText);
    setView("build");
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  // Submit client intake form
  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientScope) return;

    // Trigger success panel
    setIntakeSuccess(true);

    // Format mailto redirection to send proposal to the founder
    const emailAddress = "hello@onewave.studio";
    const subject = encodeURIComponent(`SaaS Project Request: ${clientName}`);
    const body = encodeURIComponent(
      `Hi Mohd Kaif,\n\nI want to build a SaaS with Onewave Studio!\n\nHere are my scoping details:\n- Name: ${clientName}\n- Contact: ${clientEmail}\n- Budget Bracket: $${clientBudget}\n\n---\n\nProject Scope:\n${clientScope}\n\n---\n\nI look forward to discussing development milestones.\n\nBest regards,`
    );
    
    // Open mailto client after a short delay
    setTimeout(() => {
      window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    }, 800);
  };

  // Reset intake form when navigating back
  const handleBackToStudio = () => {
    setView("home");
    setIntakeSuccess(false);
    setClientName("");
    setClientEmail("");
    setClientScope("");
  };

  // Stagger animation helpers
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""} min-h-screen bg-[#fafafa] dark:bg-black text-[#171717] dark:text-white selection:bg-[#171717] dark:selection:bg-neutral-800 selection:text-white transition-colors duration-300 overflow-x-hidden relative`}>
      
      {/* Mesh atmospheric glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden opacity-30 dark:opacity-40 z-0 transition-opacity duration-300">
        <div className="absolute top-[-25%] left-[10%] w-[50%] h-[70%] rounded-full bg-gradient-to-tr from-[#00dfd8]/30 via-[#007cf0]/20 to-[#7928ca]/10 blur-[130px]" />
        <div className="absolute top-[-20%] right-[10%] w-[45%] h-[65%] rounded-full bg-gradient-to-tl from-[#ff4d4d]/20 via-[#ff0080]/15 to-[#7928ca]/10 blur-[130px]" />
      </div>

      {/* Navigation Header */}
      <header className="relative w-full max-w-5xl mx-auto px-6 h-16 flex items-center justify-between z-50">
        <button
          onClick={() => setView("home")}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer text-left bg-transparent border-0 p-0"
        >
          <svg
            viewBox="0 0 46 28"
            className="w-7 h-4 text-[#171717] dark:text-white/90 transition-colors duration-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 6C6.58 6 3 9.58 3 14C3 18.42 6.58 22 11 22C15.42 22 19 18.42 23 14C27 9.58 30.58 6 35 6C39.42 6 43 9.58 43 14C43 18.42 39.42 22 35 22C30.58 22 27 18.42 23 14C19 9.58 15.42 6 11 6Z" />
          </svg>
          <span className="font-semibold text-sm tracking-tight text-[#171717] dark:text-white/90 transition-colors duration-300">
            Onewave Studio
          </span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("docs")}
            className="hidden sm:block text-xs font-mono text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0"
          >
            Docs
          </button>
          <button
            onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-[#121212] border border-transparent hover:border-[#ebebeb] dark:hover:border-neutral-900 text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-all cursor-pointer"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-[18px] h-[18px]" />
          ) : (
            <Sun className="w-[18px] h-[18px]" />
          )}
        </button>
      </div>
      </header>

      {/* Main viewport region */}
      <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-20 z-10 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <InfinityLogo />

              <motion.h1
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold tracking-tight text-center leading-[1.15] max-w-4xl mb-6 text-[#171717] dark:text-white transition-colors duration-300"
              >
                <motion.span className="block overflow-hidden pb-1">
                  {line1.split(" ").map((word, idx) => (
                    <motion.span key={`line1-${idx}`} variants={wordVariants} className="inline-block mr-[0.25em] last:mr-0 origin-bottom">
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
                <motion.span className="block overflow-hidden pb-1">
                  {line2.split(" ").map((word, idx) => (
                    <motion.span key={`line2-${idx}`} variants={wordVariants} className="inline-block mr-[0.25em] last:mr-0 origin-bottom">
                      {word}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.h1>

              <SocialBadges handles={SOCIAL_HANDLES} delay={0.5} />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
                className="text-[#4d4d4d] dark:text-neutral-300 text-sm md:text-base text-center leading-relaxed max-w-lg mb-8 font-light transition-colors duration-300"
              >
                You're one email sign-up away from my building-in-public updates. I share everything I learn while launching the Wave suite.
              </motion.p>

              <NewsletterForm delay={0.6} />

              <SaaSGrid onInitiateBuild={handleInitiateBuild} />
            </motion.div>
          )}

          {/* DOCS VIEW */}
          {view === "docs" && (
            <motion.div
              key="docs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <DocsPage onBack={() => setView("home")} />
            </motion.div>
          )}

          {/* STATUS MONITOR VIEW */}
          {view === "status" && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-3xl"
            >
              <button
                onClick={handleBackToStudio}
                className="inline-flex items-center gap-1.5 text-xs text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-colors mb-8 cursor-pointer font-mono bg-transparent border-0 p-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO STUDIO</span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-[#ebebeb] dark:border-neutral-800 text-[10px] uppercase font-mono tracking-widest text-[#4d4d4d] dark:text-neutral-400 mb-4 w-fit">
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                <span>Live Telemetry Monitor</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#171717] dark:text-white mb-2">
                System Operational Status.
              </h1>
              <p className="text-sm text-[#4d4d4d] dark:text-neutral-400 mb-10 font-light">
                Uptime reports and latency graphs for Onewave developer networks and services.
              </p>

              {/* Status Nodes Grid */}
              <div className="flex flex-col gap-4 mb-8">
                {[
                  { name: "Onewave Core Gateway", status: "Operational", uptime: "99.99%", latency: "14ms" },
                  { name: "WaveEdit Render Cluster", status: "Operational", uptime: "99.95%", latency: "112ms" },
                  { name: "WaveDocs Static CDN", status: "Operational", uptime: "100.00%", latency: "9ms" },
                  { name: "WaveTrack Event Queue", status: "Operational", uptime: "99.98%", latency: "16ms" },
                ].map((node) => (
                  <div key={node.name} className="flex items-center justify-between p-4 bg-white dark:bg-[#0a0a0a] border border-[#ebebeb] dark:border-neutral-900 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-500/5 text-emerald-500">
                        <Server className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#171717] dark:text-white">{node.name}</div>
                        <div className="text-[10px] text-neutral-400 dark:text-neutral-600 font-mono mt-0.5">Uptime: {node.uptime}</div>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3 font-mono text-xs">
                      <span className="text-[#888888] dark:text-neutral-500">{node.latency}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{node.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* SVG Mock Latency Graph */}
              <div className="bg-white dark:bg-[#0a0a0a] border border-[#ebebeb] dark:border-neutral-900 rounded-lg p-5 shadow-sm">
                <div className="text-[10px] font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest mb-4">
                  Network Latency Response (Last 24 Hours)
                </div>
                <svg viewBox="0 0 500 100" className="w-full h-24 text-[#0070f3] dark:text-cyan-400">
                  <path
                    d="M 0 50 Q 25 30, 50 60 T 100 40 T 150 70 T 200 35 T 250 80 T 300 45 T 350 65 T 400 30 T 450 50 T 500 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line x1="0" y1="85" x2="500" y2="85" stroke={theme === "dark" ? "#1a1a1a" : "#ebebeb"} strokeWidth="1" strokeDasharray="4" />
                </svg>
                <div className="flex justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-600 mt-2">
                  <span>24h ago</span>
                  <span>Average: 12ms</span>
                  <span>Now</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* PRIVACY POLICY */}
          {view === "privacy" && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl text-left"
            >
              <button onClick={handleBackToStudio} className="inline-flex items-center gap-1.5 text-xs text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-colors mb-8 cursor-pointer font-mono">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO STUDIO</span>
              </button>
              <h1 className="text-3xl font-semibold tracking-tight text-[#171717] dark:text-white mb-6">
                Privacy Policy.
              </h1>
              <div className="text-sm text-[#4d4d4d] dark:text-neutral-400 font-light space-y-6 leading-relaxed">
                <p>
                  <strong>Effective Date: July 2026.</strong> We value your privacy and aim to keep our data policies as transparent and developer-friendly as possible.
                </p>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-white uppercase tracking-wider font-mono">1. Data Ingestion & Analytics</h3>
                <p>
                  We compile minimal logs necessary to run and test our SaaS models. If you participate in our building-in-public updates, your email address is securely cataloged to deliver those publications. We never resell or distribute your contact database.
                </p>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-white uppercase tracking-wider font-mono">2. Cookie Policy</h3>
                <p>
                  We store basic application configuration settings (like your light or dark mode theme choice) locally within your browser's Local Storage cache. No marketing tracker script is initialized.
                </p>
              </div>
            </motion.div>
          )}

          {/* TERMS OF SERVICE */}
          {view === "terms" && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl text-left"
            >
              <button onClick={handleBackToStudio} className="inline-flex items-center gap-1.5 text-xs text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-colors mb-8 cursor-pointer font-mono">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO STUDIO</span>
              </button>
              <h1 className="text-3xl font-semibold tracking-tight text-[#171717] dark:text-white mb-6">
                Terms of Service.
              </h1>
              <div className="text-sm text-[#4d4d4d] dark:text-neutral-400 font-light space-y-6 leading-relaxed">
                <p>
                  <strong>Effective Date: July 2026.</strong> By accessing this portfolio console or using the generated SaaS blueprints, you agree to these fair usage terms.
                </p>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-white uppercase tracking-wider font-mono">1. Code Generation Blueprints</h3>
                <p>
                  All database Prisma schemas and API handler route code created using our SaaS Blueprint Studio are free to copy, modify, and distribute for personal or commercial projects. No attribution is required.
                </p>
                <h3 className="text-sm font-semibold text-[#171717] dark:text-white uppercase tracking-wider font-mono">2. Warranty Disclaimer</h3>
                <p>
                  Blueprints are provided as boilerplate scaffolding utilities. We do not provide warranty of complete production readiness. Review your security permissions prior to shipping container code.
                </p>
              </div>
            </motion.div>
          )}

          {/* BUILD A SAAS / CONTACT FORM VIEW */}
          {view === "build" && (
            <motion.div
              key="build"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl"
            >
              <button
                onClick={handleBackToStudio}
                className="inline-flex items-center gap-1.5 text-xs text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-colors mb-8 cursor-pointer font-mono bg-transparent border-0 p-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>BACK TO STUDIO</span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-[#ebebeb] dark:border-neutral-800 text-[10px] uppercase font-mono tracking-widest text-[#4d4d4d] dark:text-neutral-400 mb-4 w-fit mx-auto">
                <Sparkles className="w-3 h-3 text-[#0070f3] dark:text-cyan-400" />
                <span>Partnership Application</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-center text-[#171717] dark:text-white mb-2">
                Build a SaaS with Onewave.
              </h1>
              <p className="text-sm text-center text-[#4d4d4d] dark:text-neutral-400 mb-10 font-light max-w-md mx-auto">
                Submit your idea, select your budget bracket, and let's turn your scoped features into a live production SaaS.
              </p>

              {/* Success Panel */}
              <AnimatePresence mode="wait">
                {intakeSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/25 text-center shadow-md"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 font-mono mb-2">
                      APPLICATION COMPILED SUCCESSFULLY
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400/90 leading-relaxed font-light mb-4">
                      Your scoping proposal has been configured. We are opening your email client to send the scope to Mohd Kaif.
                    </p>
                    <button
                      onClick={handleBackToStudio}
                      className="px-4 py-2 border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs rounded-md font-medium cursor-pointer transition-colors"
                    >
                      Return to console
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleIntakeSubmit}
                    className="w-full text-left bg-white dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:to-[#040404] border border-[#ebebeb] dark:border-neutral-900 p-6 md:p-8 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex flex-col gap-5"
                  >
                    {/* Client Name Input */}
                    <div>
                      <label className="block text-xs font-mono text-[#888888] dark:text-neutral-500 mb-2 uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-10 px-3 rounded-md bg-[#fafafa] dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-800 text-[#171717] dark:text-white placeholder-[#888888]/60 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-[#a1a1a1] dark:focus:border-neutral-700 transition-colors"
                      />
                    </div>

                    {/* Client Email Input */}
                    <div>
                      <label className="block text-xs font-mono text-[#888888] dark:text-neutral-500 mb-2 uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full h-10 px-3 rounded-md bg-[#fafafa] dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-800 text-[#171717] dark:text-white placeholder-[#888888]/60 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-[#a1a1a1] dark:focus:border-neutral-700 transition-colors"
                      />
                    </div>

                    {/* Client Budget Range Selector */}
                    <div>
                      <label className="block text-xs font-mono text-[#888888] dark:text-neutral-500 mb-3 uppercase">
                        SaaS Build Budget Range
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { value: "under-5000", label: "Under $5,000" },
                          { value: "5000-10000", label: "$5,000 - $10,000" },
                          { value: "10000-25000", label: "$10,000 - $25,000" },
                          { value: "25000-plus", label: "$25,000+" },
                        ].map((b) => (
                          <button
                            key={b.value}
                            type="button"
                            onClick={() => setClientBudget(b.value)}
                            className={`h-9 border rounded-md cursor-pointer transition-colors ${
                              clientBudget === b.value
                                ? "bg-[#171717] dark:bg-white text-white dark:text-black border-transparent"
                                : "bg-transparent border-[#ebebeb] dark:border-neutral-800 text-[#4d4d4d] dark:text-neutral-300 hover:bg-[#fafafa] dark:hover:bg-neutral-950"
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Scoped Project details proposal box */}
                    <div>
                      <label className="block text-xs font-mono text-[#888888] dark:text-neutral-500 mb-2 uppercase">
                        Project Concept Scope
                      </label>
                      <textarea
                        required
                        value={clientScope}
                        onChange={(e) => setClientScope(e.target.value)}
                        placeholder="Paste your scoped blueprint or detail your product parameters..."
                        rows={6}
                        className="w-full p-3 rounded-md bg-[#fafafa] dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-800 text-[#171717] dark:text-white placeholder-[#888888]/60 dark:placeholder-neutral-600 text-xs font-mono focus:outline-none focus:border-[#a1a1a1] dark:focus:border-neutral-700 transition-colors"
                      />
                    </div>

                    {/* Submit Scope proposal Button */}
                    <button
                      type="submit"
                      className="w-full h-11 bg-[#0070f3] hover:bg-[#0070f3]/90 active:bg-blue-700 text-white font-medium text-sm rounded-md shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Scoped Project Request</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Unique Footer */}
        <footer className="mt-32 w-full border-t border-[#ebebeb] dark:border-neutral-900 pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#888888] dark:text-neutral-500 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 46 28"
              className="w-6 h-3.5 text-[#171717]/60 dark:text-white/60"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11 6C6.58 6 3 9.58 3 14C3 18.42 6.58 22 11 22C15.42 22 19 18.42 23 14C27 9.58 30.58 6 35 6C39.42 6 43 9.58 43 14C43 18.42 39.42 22 35 22C30.58 22 27 18.42 23 14C19 9.58 15.42 6 11 6Z" />
            </svg>
            <button
              onClick={() => setView("home")}
              className="font-semibold text-[#171717] dark:text-white bg-transparent border-0 p-0 cursor-pointer hover:opacity-85"
            >
              Onewave Studio
            </button>
            <span className="text-[10px] text-neutral-400 dark:text-neutral-600">v1.1.0</span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-[#4d4d4d] dark:text-neutral-400">
            <button onClick={() => setView("docs")} className="bg-transparent border-0 p-0 hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer font-mono">Docs</button>
            <button onClick={() => setView("status")} className="bg-transparent border-0 p-0 hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer font-mono">Status</button>
            <button onClick={() => setView("privacy")} className="bg-transparent border-0 p-0 hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer font-mono">Privacy</button>
            <button onClick={() => setView("terms")} className="bg-transparent border-0 p-0 hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer font-mono">Terms</button>
            <button onClick={() => setView("build")} className="bg-transparent border-0 p-0 text-[#0070f3] dark:text-cyan-400 hover:opacity-80 transition-opacity cursor-pointer font-mono font-bold flex items-center gap-0.5">
              <span>Build with us</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="text-center sm:text-right flex flex-col sm:items-end gap-1">
            <p className="text-[11px]">
              © {new Date().getFullYear()} Onewave Studio. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 justify-center sm:justify-end text-[10px] text-neutral-400 dark:text-neutral-600">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;