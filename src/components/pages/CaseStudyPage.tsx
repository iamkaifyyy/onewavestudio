import { ArrowLeft, ExternalLink, Trophy, Cpu } from "lucide-react";
import { PROJECTS } from "@/content/projects";

interface CaseStudyPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const CaseStudyPage = ({ slug, onNavigate, onOpenBooking }: CaseStudyPageProps) => {
  const project = PROJECTS.find((p) => p.slug === slug) || PROJECTS[0];

  // Find next project
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <button
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                project.badge === "Studio Project"
                  ? "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-cyan-300 border-indigo-200 dark:border-indigo-800/50"
                  : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50"
              }`}
            >
              {project.badge}
            </span>
            {project.award && (
              <span className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Trophy className="w-3 h-3" />
                <span>{project.award}</span>
              </span>
            )}
          </div>
        </div>

        {/* Title and One Liner */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
          {project.title}
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-8">
          {project.oneLiner}
        </p>

        {/* Snapshot Meta Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm mb-12 text-xs">
          <div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Client / Scope
            </div>
            <div className="font-semibold text-neutral-900 dark:text-white">
              {project.client}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Delivery Velocity
            </div>
            <div className="font-semibold text-neutral-900 dark:text-white">
              {project.timeline}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Our Role
            </div>
            <div className="font-semibold text-neutral-900 dark:text-white">
              {project.role}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Live Product
            </div>
            <div className="flex items-center gap-2 font-mono">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                >
                  <span>Launch URL</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-neutral-400">Production Private</span>
              )}
            </div>
          </div>
        </div>

        {/* Results Metrics Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 text-white border border-neutral-800 mb-14 shadow-xl">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-4">
            Key Architectural Outcomes & Metrics
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
                  {m.value}
                </div>
                <div className="text-xs text-neutral-400 font-light">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem & Solution Sections */}
        <div className="space-y-12 mb-16">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>The Problem & Friction</span>
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-light leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>The Architecture & Solution</span>
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 font-light leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Features Built Deep Dive */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Key Features Built
          </h2>
          <div className="space-y-4">
            {project.featuresBuilt.map((feature, i) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 text-neutral-900 dark:text-white">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {feature.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How AI is Used (Section 9 Spec) */}
        <div className="p-8 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm mb-16">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            <span>AI Architecture & Implementation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            How AI was engineered in this system:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
              <div className="font-mono text-[10px] text-neutral-400 uppercase mb-1">
                Foundation Models
              </div>
              <div className="text-neutral-900 dark:text-white font-medium">
                {project.aiArchitecture.models}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
              <div className="font-mono text-[10px] text-neutral-400 uppercase mb-1">
                Retrieval & Indexing
              </div>
              <div className="text-neutral-900 dark:text-white font-medium">
                {project.aiArchitecture.retrieval}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
              <div className="font-mono text-[10px] text-neutral-400 uppercase mb-1">
                Caching & Latency Tuning
              </div>
              <div className="text-neutral-900 dark:text-white font-medium">
                {project.aiArchitecture.caching}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/60 dark:border-neutral-800/60">
              <div className="font-mono text-[10px] text-neutral-400 uppercase mb-1">
                Continuous Evaluation & Testbed
              </div>
              <div className="text-neutral-900 dark:text-white font-medium">
                {project.aiArchitecture.evals}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
            Technologies & Libraries Deployed
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Next Project & CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
              Up Next
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1">
              {nextProject.title}
            </h3>
            <p className="text-xs text-neutral-400 font-light">
              {nextProject.oneLiner}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate(`/work/${nextProject.slug}`)}
              className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium cursor-pointer transition-colors"
            >
              Next Case Study →
            </button>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Book a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
