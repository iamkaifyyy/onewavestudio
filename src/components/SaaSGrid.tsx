import { useState, useMemo } from "react";
import { Sparkles, Copy, Check, ShieldCheck, CreditCard, BrainCircuit, BarChart3, MessageSquare, Send, Calculator, FileText } from "lucide-react";

type FeatureId = "auth" | "stripe" | "ai" | "analytics" | "chat";

interface FeatureOption {
  id: FeatureId;
  label: string;
  desc: string;
  hours: number;
  cost: number;
  icon: React.ComponentType<{ className?: string }>;
}

const FEATURE_OPTIONS: FeatureOption[] = [
  { id: "auth", label: "User Auth & Roles", desc: "Clerk / NextAuth gate, user profiles, secure session tokens", hours: 10, cost: 500, icon: ShieldCheck },
  { id: "stripe", label: "Stripe Subscription Billing", desc: "Pricing cards, Stripe checkout, subscription webhooks", hours: 12, cost: 600, icon: CreditCard },
  { id: "ai", label: "AI API Integration", desc: "Gemini / OpenAI streaming, custom context prompts, LLM parser", hours: 15, cost: 800, icon: BrainCircuit },
  { id: "analytics", label: "Real-Time Analytics", desc: "Event logs tracking, custom charts dashboard, metrics funnels", hours: 16, cost: 900, icon: BarChart3 },
  { id: "chat", label: "Interactive Messaging", desc: "Websocket server, real-time message history, user status", hours: 14, cost: 700, icon: MessageSquare },
];

interface SaaSGridProps {
  onInitiateBuild: (proposalText: string) => void;
}

export const SaaSGrid = ({ onInitiateBuild }: SaaSGridProps) => {
  const [projectName, setProjectName] = useState("My Next SaaS");
  const [projectConcept, setProjectConcept] = useState("A modern workflow utility to increase builder performance");
  const [selectedFeatures, setSelectedFeatures] = useState<FeatureId[]>(["auth", "stripe"]);
  const [velocity, setVelocity] = useState<"standard" | "expedited">("standard");
  const [activeTab, setActiveTab] = useState<"proposal" | "cost">("proposal");
  const [copied, setCopied] = useState(false);

  // Toggle selected features
  const toggleFeature = (id: FeatureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const calculations = useMemo(() => {
    let baseHours = 20; // Core setup (Git, base layout, database sync)
    let baseCost = 1000;

    selectedFeatures.forEach((featId) => {
      const option = FEATURE_OPTIONS.find((o) => o.id === featId);
      if (option) {
        baseHours += option.hours;
        baseCost += option.cost;
      }
    });

    if (velocity === "expedited") {
      baseCost = Math.round(baseCost * 1.25); // 25% rush premium
    }

    const durationWeeks = Math.ceil(baseHours / 20); // Assumes 20h/week dedicated development

    return {
      hours: baseHours,
      cost: baseCost,
      weeks: durationWeeks,
    };
  }, [selectedFeatures, velocity]);

  // Generate copyable project proposal in Markdown
  const generateProposal = () => {
    const featureLabels = selectedFeatures
      .map((id) => {
        const feat = FEATURE_OPTIONS.find((f) => f.id === id);
        return feat ? `- **${feat.label}**: ${feat.desc}` : "";
      })
      .filter(Boolean)
      .join("\n");

    const recommendation = selectedFeatures.includes("ai") || selectedFeatures.includes("analytics")
      ? "Next.js (React), Tailwind CSS, FastAPI (Python), PostgreSQL + Prisma"
      : "Next.js (React), Tailwind CSS, PostgreSQL + Prisma Client";

    return `* Generated Proposal for: ${projectName}
* Value Prop: ${projectConcept}
* Technology Stack: ${recommendation}
* Features Selected:
${featureLabels || "- Core database & configuration setup."}
* Target Timeline: ${velocity === "expedited" ? "Priority Delivery (~1 week)" : `Balanced Timeline (~${calculations.weeks} weeks)`}
* Dedicated Hours: ~${calculations.hours} hours
* Estimated Budget: $${calculations.cost.toLocaleString()} USD`;
  };

  const copyProposal = () => {
    navigator.clipboard.writeText(generateProposal());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Divider / Section Header */}
      <div className="w-full border-t border-[#ebebeb] dark:border-neutral-900 pt-16 mb-12 flex flex-col items-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-[#ebebeb] dark:border-neutral-800 text-[10px] uppercase font-mono tracking-widest text-[#4d4d4d] dark:text-neutral-400 mb-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none">
          <Sparkles className="w-3 h-3 text-[#0070f3] dark:text-cyan-400" />
          <span>SaaS Scoping Console</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-[#171717] dark:text-white transition-colors duration-300">
          SaaS Proposal Builder.
        </h2>
        <p className="text-[#4d4d4d] dark:text-neutral-400 text-sm text-center mt-2 font-light max-w-md transition-colors duration-300">
          Got a SaaS idea? Scope features, calculate costs, generate a complete project proposal, and send it to me instantly.
        </p>
      </div>

      {/* Scoping Console Main Box */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-5 gap-8 bg-white dark:bg-[#0a0a0a] border border-[#ebebeb] dark:border-neutral-900 p-6 md:p-8 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300">
        
        {/* Left Control Console (2/5 Span) */}
        <div className="md:col-span-2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ebebeb] dark:border-neutral-900 pb-6 md:pb-0 md:pr-8">
          <div>
            <h3 className="text-sm font-semibold text-[#171717] dark:text-white mb-6 uppercase tracking-wider font-mono">
              Project Parameters
            </h3>

            {/* Project Name */}
            <div className="mb-4">
              <label className="block text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mb-2 uppercase tracking-wider">
                SaaS App Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. WaveLaunch"
                className="w-full h-10 px-3 rounded bg-white dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-900 text-[#171717] dark:text-white placeholder-[#888888]/60 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-[#a1a1a1] dark:focus:border-neutral-700 transition-colors shadow-sm"
              />
            </div>

            {/* Concept Value Proposition */}
            <div className="mb-5">
              <label className="block text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mb-2 uppercase tracking-wider">
                Core Concept
              </label>
              <textarea
                value={projectConcept}
                onChange={(e) => setProjectConcept(e.target.value)}
                placeholder="Describe what the application will accomplish..."
                rows={2}
                className="w-full p-3 rounded bg-white dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-900 text-[#171717] dark:text-white placeholder-[#888888]/60 dark:placeholder-neutral-600 text-sm focus:outline-none focus:border-[#a1a1a1] dark:focus:border-neutral-700 transition-colors resize-none shadow-sm"
              />
            </div>

            {/* Feature Checklist Selector */}
            <div className="mb-5">
              <label className="block text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mb-2.5 uppercase tracking-wider">
                Scope Features
              </label>
              <div className="flex flex-col gap-2">
                {FEATURE_OPTIONS.map((feat) => {
                  const FeatIcon = feat.icon;
                  const isSelected = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`w-full flex items-start gap-3 p-2.5 rounded border text-left cursor-pointer transition-all ${
                        isSelected
                          ? "bg-neutral-50 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-800"
                          : "bg-white dark:bg-[#0a0a0a] border-[#ebebeb] dark:border-neutral-900 hover:bg-[#fafafa] dark:hover:bg-neutral-950/60"
                      }`}
                    >
                      <div className={`mt-0.5 p-1 rounded bg-[#fafafa] dark:bg-neutral-900 border border-[#ebebeb] dark:border-neutral-800 ${isSelected ? "text-[#0070f3] dark:text-cyan-400" : "text-neutral-450 dark:text-neutral-500"}`}>
                        <FeatIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isSelected ? "text-[#171717] dark:text-white" : "text-[#4d4d4d] dark:text-neutral-350"}`}>
                          {feat.label}
                        </div>
                        <div className="text-[10px] text-[#888888] dark:text-neutral-500 mt-0.5 leading-normal font-light">
                          {feat.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Velocity Priority Selector */}
            <div className="mb-6">
              <label className="block text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mb-2 uppercase tracking-wider">
                Delivery Velocity
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setVelocity("standard")}
                  className={`h-9 rounded border text-xs font-medium cursor-pointer transition-all ${
                    velocity === "standard"
                      ? "bg-[#171717] text-white dark:bg-white dark:text-black border-transparent shadow-sm"
                      : "bg-white dark:bg-[#0a0a0a] border-[#ebebeb] dark:border-neutral-900 text-[#4d4d4d] dark:text-neutral-400 hover:bg-[#fafafa] dark:hover:bg-neutral-950/60"
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setVelocity("expedited")}
                  className={`h-9 rounded border text-xs font-medium cursor-pointer transition-all ${
                    velocity === "expedited"
                      ? "bg-[#171717] text-white dark:bg-white dark:text-black border-transparent shadow-sm"
                      : "bg-white dark:bg-[#0a0a0a] border-[#ebebeb] dark:border-neutral-900 text-[#4d4d4d] dark:text-neutral-400 hover:bg-[#fafafa] dark:hover:bg-neutral-950/60"
                  }`}
                >
                  Expedited (+25%)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Console (3/5 Span) */}
        <div className="md:col-span-3 flex flex-col justify-between h-full min-h-[420px]">
          
          {/* Workspace Tabs Header */}
          <div className="flex items-center justify-between border-b border-[#ebebeb] dark:border-neutral-900 pb-3 mb-4">
            <div className="flex items-center gap-1.5">
              {[
                { id: "proposal", label: "Scoping Proposal", icon: FileText },
                { id: "cost", label: "Cost Analysis", icon: Calculator },
              ].map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as "proposal" | "cost")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? "bg-[#171717] text-white dark:bg-white dark:text-black shadow-sm"
                        : "text-[#4d4d4d] dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-[#171717] dark:hover:text-white"
                    }`}
                  >
                    <TabIcon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Clipboard Action */}
            {activeTab === "proposal" && (
              <button
                onClick={copyProposal}
                className="px-2.5 py-1.5 rounded-md border border-[#ebebeb] dark:border-neutral-800 hover:bg-[#fafafa] dark:hover:bg-neutral-900/60 text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono font-bold"
                title="Copy proposal markdown"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "COPIED" : "COPY PROPOSAL"}</span>
              </button>
            )}
          </div>

          {/* Scoping Output Panel */}
          <div className="flex-1 bg-[#fafafa] dark:bg-neutral-950/60 border border-[#ebebeb] dark:border-neutral-900 rounded-lg p-4 font-mono text-xs overflow-auto max-h-[380px] relative shadow-inner">
            
            {/* PROPOSAL PREVIEW TAB */}
            {activeTab === "proposal" && (
              <pre className="text-[#4d4d4d] dark:text-neutral-300 whitespace-pre-wrap font-sans text-xs leading-relaxed max-w-none">
                {generateProposal()}
              </pre>
            )}

            {/* COST ANALYSIS TAB */}
            {activeTab === "cost" && (
              <div className="flex flex-col gap-5 font-sans py-2">
                <div className="text-[11px] font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest border-b border-[#ebebeb] dark:border-neutral-900 pb-2 mb-1">
                  Budget & Scope Allocation
                </div>

                {/* Estimate Dashboard Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-900 p-3 rounded-lg text-center shadow-sm">
                    <div className="text-[10px] font-mono text-[#888888] dark:text-neutral-500 uppercase">Dev Time</div>
                    <div className="text-lg font-semibold text-[#171717] dark:text-white mt-1">~{calculations.hours}h</div>
                  </div>
                  <div className="bg-white dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-900 p-3 rounded-lg text-center shadow-sm">
                    <div className="text-[10px] font-mono text-[#888888] dark:text-neutral-500 uppercase">Phase</div>
                    <div className="text-lg font-semibold text-[#171717] dark:text-white mt-1">~{calculations.weeks} Wk{calculations.weeks > 1 ? "s" : ""}</div>
                  </div>
                  <div className="bg-white dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-900 p-3 rounded-lg text-center shadow-sm">
                    <div className="text-[10px] font-mono text-[#888888] dark:text-neutral-500 uppercase">Est. Budget</div>
                    <div className="text-lg font-semibold text-[#0070f3] dark:text-cyan-400 mt-1">${calculations.cost.toLocaleString()}</div>
                  </div>
                </div>

                {/* Scope Line Items list */}
                <div className="flex flex-col gap-2.5 mt-2">
                  <div className="text-[11px] font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest pb-1 border-b border-dashed border-[#ebebeb] dark:border-neutral-900">
                    Line Item Details
                  </div>
                  
                  <div className="flex justify-between text-xs text-[#4d4d4d] dark:text-neutral-400">
                    <span>Base Setup (DB, Git, Base Layout)</span>
                    <span className="font-mono text-neutral-500 dark:text-neutral-400">$1,000 (20h)</span>
                  </div>

                  {selectedFeatures.map((fid) => {
                    const feat = FEATURE_OPTIONS.find((f) => f.id === fid);
                    if (!feat) return null;
                    return (
                      <div key={fid} className="flex justify-between text-xs text-[#4d4d4d] dark:text-neutral-400">
                        <span>{feat.label}</span>
                        <span className="font-mono text-neutral-500 dark:text-neutral-400">${feat.cost} ({feat.hours}h)</span>
                      </div>
                    );
                  })}

                  {velocity === "expedited" && (
                    <div className="flex justify-between text-xs text-amber-700 dark:text-amber-400 font-medium">
                      <span>Priority Rush Delivery Fee (+25%)</span>
                      <span className="font-mono">+${Math.round(calculations.cost - (calculations.cost / 1.25))}</span>
                    </div>
                  )}

                  <div className="border-t border-[#ebebeb] dark:border-neutral-900 pt-3 mt-1 flex justify-between text-sm font-semibold text-[#171717] dark:text-white">
                    <span>Total Estimated Project Cost</span>
                    <span>${calculations.cost.toLocaleString()} USD</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Lead Generation CTA Card */}
          <div className="mt-4 pt-4 border-t border-[#ebebeb] dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[10px] text-[#888888] dark:text-neutral-500 font-sans leading-normal max-w-sm text-center sm:text-left">
              Satisfied with this proposal and budget? Click below to send this scope directly to Mohd Kaif to kickstart development.
            </div>
            
            <button
              onClick={() => onInitiateBuild(generateProposal())}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] dark:bg-white text-white dark:text-black font-semibold text-xs rounded hover:bg-black/90 dark:hover:bg-white/90 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Scope proposal</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
