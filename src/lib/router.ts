import { useState, useEffect, useCallback } from "react";

export type RoutePath =
  | "/"
  | "/about"
  | "/process"
  | "/pricing"
  | "/work"
  | `/work/${string}`
  | "/contact";

export interface ParsedRoute {
  path: string;
  page: "home" | "about" | "process" | "pricing" | "work" | "casestudy" | "contact";
  slug?: string;
}

export function parsePath(pathname: string): ParsedRoute {
  // Normalize path
  const clean = pathname.replace(/\/$/, "") || "/";

  if (clean === "/" || clean === "") {
    return { path: "/", page: "home" };
  }
  if (clean === "/about") {
    return { path: "/about", page: "about" };
  }
  if (clean === "/process") {
    return { path: "/process", page: "process" };
  }
  if (clean === "/pricing") {
    return { path: "/pricing", page: "pricing" };
  }
  if (clean === "/work") {
    return { path: "/work", page: "work" };
  }
  if (clean.startsWith("/work/")) {
    const slug = clean.replace("/work/", "");
    return { path: clean, page: "casestudy", slug };
  }
  if (clean === "/contact") {
    return { path: "/contact", page: "contact" };
  }

  // Fallback to home
  return { path: "/", page: "home" };
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const route = parsePath(currentPath);

  return {
    path: currentPath,
    route,
    navigate,
  };
}

