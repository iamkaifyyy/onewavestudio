import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { STUDIO } from "@/content/studio";

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
  theme: string;
  onToggleTheme: () => void;
}

export const Navbar = ({
  currentPath,
  onNavigate,
  onOpenBooking,
  theme,
  onToggleTheme,
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", path: "/work" },
    { label: "Process", path: "/process" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-200 ${
          scrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Brand Wordmark */}
          <button
            onClick={() => handleLinkClick("/")}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-white lowercase font-sans flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-cyan-400 inline-block animate-pulse" />
              ynz studio
            </span>
            <span className="text-[10px] text-neutral-400 font-mono tracking-wide hidden sm:block">
              / ai product studio
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100/70 dark:bg-neutral-900/60 p-1 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-xs">
            {navLinks.map((link) => {
              const isActive =
                currentPath === link.path ||
                (link.path === "/work" && currentPath.startsWith("/work"));
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs font-semibold"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions Right */}
          <div className="flex items-center gap-2.5">
            {/* Direct Chat (Ghost button) */}
            <a
              href={STUDIO.chatLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
              <span>Chat</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Primary Solid CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-sm group"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book 15-min call</span>
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#0a0a0a] border-b border-neutral-200 dark:border-neutral-800 px-6 py-5 flex flex-col gap-3 shadow-xl">
            <div className="flex flex-col gap-1 mb-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === link.path
                      ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white font-semibold"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold text-xs cursor-pointer shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 15-min intro call</span>
              </button>

              <a
                href={STUDIO.chatLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                <span>Chat on Telegram</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
