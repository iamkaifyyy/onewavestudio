import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Trophy, Sparkles } from "lucide-react";
import { PROJECTS, Project } from "@/content/projects";

interface WorkPageProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const WorkPage = ({ onNavigate, onOpenBooking }: WorkPageProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "AI Voice", "LLM Gateway", "RAG Engine", "Autonomous Agents"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "AI Voice") return p.tags.includes("AI Voice");
    if (activeFilter === "LLM Gateway") return p.tags.includes("LLM Gateway");
    if (activeFilter === "RAG Engine") return p.tags.includes("RAG Engine");
    if (activeFilter === "Autonomous Agents") return p.tags.includes("Autonomous Agents");
    return true;
  });

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Back Link */}
        <button
          onClick={() => onNavigate("/")}
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-cyan-400" />
            <span>Portfolio & Technical Case Studies</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
            Real products. <br />
            Verifiable architectures.
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            Explore deep architectural teardowns of production AI systems, voice engines, intelligent routing proxies, and grounded RAG pipelines built by the studio.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-neutral-200 dark:border-neutral-900">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((project: Project) => (
            <div
              key={project.slug}
              onClick={() => onNavigate(`/work/${project.slug}`)}
              className="group flex flex-col justify-between p-7 sm:p-9 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
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
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Trophy className="w-3 h-3" />
                        <span>Award Winner</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600">
                    {project.timeline}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </h2>

                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                  {project.oneLiner}
                </p>

                {/* Metrics Pill */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800/80 mb-6">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-sm font-bold text-neutral-900 dark:text-white font-mono">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-neutral-500 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:underline font-mono text-[11px] shrink-0 ml-2">
                  Full Case Study →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-950 border border-neutral-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Want similar architecture for your product?</h3>
            <p className="text-xs text-neutral-400 font-light">
              We engineer custom RAG, agents, and full-stack MVPs tailored to your product roadmap.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-100 transition-colors cursor-pointer shrink-0"
          >
            Book Strategy Call
          </button>
        </div>
      </div>
    </div>
  );
};
