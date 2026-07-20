import { motion } from "framer-motion";

export const InfinityLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-8"
    >
      <svg
        viewBox="0 0 46 28"
        className="w-12 h-7 text-[#171717]/90 dark:text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11 6C6.58 6 3 9.58 3 14C3 18.42 6.58 22 11 22C15.42 22 19 18.42 23 14C27 9.58 30.58 6 35 6C39.42 6 43 9.58 43 14C43 18.42 39.42 22 35 22C30.58 22 27 18.42 23 14C19 9.58 15.42 6 11 6Z" />
      </svg>
    </motion.div>
  );
};
