import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { PROJECTS, Project } from "@/content/projects";

interface SelectedWorkProps {
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const SelectedWork = ({ onNavigate }: SelectedWorkProps) => {
  return (
    <section className="py-20 md:py-28 border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
              Case Studies & Proof
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Selected work.
            </h2>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light max-w-md leading-relaxed">
            Real software shipped to production users and hackathon judges. Every project is backed by verifiable code and metrics.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {PROJECTS.map((project: Project, index: number) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onNavigate(`/work/${project.slug}`)}
              className="group flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-neutral-50/70 dark:bg-[#0c0c0c] border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                {/* Badge and Metadata */}
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

                {/* Project Title & One Liner */}
                <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                  {project.oneLiner}
                </p>

                {/* Metrics Highlight Pill */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800/80 mb-6">
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

              {/* Bottom Tags & Action */}
              <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-900 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-200/50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:underline font-mono text-[11px] shrink-0">
                  View Case Study →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all work link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Explore all case studies & architectural breakdowns</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
