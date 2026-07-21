import { useState, useEffect, useRef, useCallback } from "react";
import {
  ShieldCheck, Database, Lock, Zap, ChevronDown,
  ArrowLeft, BookOpen, Terminal, Menu, X, Layers,
  CreditCard, Users, Mail, HardDrive,
} from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

// ─── Types ──────────────────────────────────────────────────────────────────

interface TradeoffRow {
  name: string;
  setupTime: string;
  cost: string;
  scalability: string;
  verdict: string;
}

export type SupportedStack = "nextjs" | "react-ts" | "astro";

interface StackContent {
  configEnv: { key: string; desc: string }[];
  configCode: string;
  implFilename: string;
  implCode: string;
}

interface DocItem {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  requirements: string[];
  approach: string;
  stacks: Record<SupportedStack, StackContent>;
  tradeoffs: TradeoffRow[];
  isRecommended?: boolean;
}

interface DocCategory {
  slug: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  items: DocItem[];
}

// ─── Content Registry ────────────────────────────────────────────────────────

const CATEGORIES: DocCategory[] = [
  {
    slug: "authentication",
    title: "Authentication",
    description: "Secure sign-in, session management, and identity providers.",
    icon: ShieldCheck,
    items: [
      {
        slug: "auth-clerk",
        title: "Clerk",
        summary: "Drop-in auth with prebuilt UI, social + email, and user management dashboard.",
        isRecommended: true,
        overview:
          "Clerk provides a fully managed authentication service with prebuilt UI components for sign-in, sign-up, and user profile management. It handles OAuth providers (Google, GitHub, etc.), magic links, and email/password flows out of the box. You get a hosted user dashboard, webhook events for user lifecycle, and React hooks for session state — all without writing auth logic from scratch.",
        requirements: [
          "Sign up / Sign in pages with branded UI components",
          "OAuth providers: Google + GitHub minimum, extensible to others",
          "Session management via Clerk's secure token system",
          "Protected route middleware applied to secured routes",
          "Email verification enabled by default on sign up",
          "Webhook endpoint for user.created and user.deleted events",
          "Auth state available globally via hooks",
        ],
        approach:
          "Clerk is the recommended default because it eliminates the most boilerplate. You get prebuilt <SignIn />, <SignUp />, and <UserButton /> components that match your brand with CSS variables. The middleware pattern is simple — one file, one function, route matching via regex. Clerk's free tier covers 10,000 MAU which is enough for most MVPs.",
        stacks: {
          nextjs: {
            configEnv: [
              { key: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", desc: "Public key from Clerk dashboard → API Keys" },
              { key: "CLERK_SECRET_KEY", desc: "Secret key — never expose client-side" },
              { key: "NEXT_PUBLIC_CLERK_SIGN_IN_URL", desc: "Route for sign-in page, e.g. /sign-in" },
              { key: "NEXT_PUBLIC_CLERK_SIGN_UP_URL", desc: "Route for sign-up page, e.g. /sign-up" },
            ],
            configCode: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`,
            implFilename: "middleware.ts",
            implCode: `import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};`,
          },
          "react-ts": {
            configEnv: [
              { key: "VITE_CLERK_PUBLISHABLE_KEY", desc: "Vite publishable key from Clerk dashboard" },
            ],
            configCode: `VITE_CLERK_PUBLISHABLE_KEY=pk_test_...`,
            implFilename: "src/main.tsx",
            implCode: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)`,
          },
          astro: {
            configEnv: [
              { key: "PUBLIC_CLERK_PUBLISHABLE_KEY", desc: "Public key from Clerk dashboard" },
              { key: "CLERK_SECRET_KEY", desc: "Secret key for Astro server environment" },
            ],
            configCode: `PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...`,
            implFilename: "src/middleware.ts",
            implCode: `import { clerkMiddleware } from "@clerk/astro/middleware";

export const onRequest = clerkMiddleware((auth, context) => {
  const { userId, redirectToSignIn } = auth();
  const isProtected = context.url.pathname.startsWith("/dashboard");
  
  if (!userId && isProtected) {
    return redirectToSignIn();
  }
});`,
          },
        },
        tradeoffs: [
          { name: "Clerk", setupTime: "~15 min", cost: "Free to 10K MAU", scalability: "Enterprise-ready", verdict: "Best for speed" },
          { name: "NextAuth.js", setupTime: "~45 min", cost: "Free (self-hosted)", scalability: "Depends on DB", verdict: "Best for data ownership" },
        ],
      },
      {
        slug: "auth-nextauth",
        title: "NextAuth.js / Auth.js",
        summary: "Self-hosted auth with full data ownership — more config, zero vendor lock-in.",
        overview:
          "NextAuth.js (now Auth.js) is an open-source authentication library. You own the user data entirely — sessions and accounts are stored in your own database via database adapters.",
        requirements: [
          "Auth APIs set up on client callback endpoints",
          "Database connection adapters integrated",
          "OAuth providers configured: Google + GitHub minimum",
          "Session strategy: JWT or Database sessions",
          "CSRF protection enabled by default",
        ],
        approach:
          "NextAuth.js is the right choice when you need full data ownership or plan to support custom authorization flows. Use database schema adapters to hold credentials.",
        stacks: {
          nextjs: {
            configEnv: [
              { key: "AUTH_SECRET", desc: "Secret used to sign JWTs (openssl rand -base64 32)" },
              { key: "AUTH_GOOGLE_ID", desc: "Google Client ID" },
              { key: "AUTH_GOOGLE_SECRET", desc: "Google Client Secret" },
            ],
            configCode: `AUTH_SECRET=your-auth-secret-here
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret`,
            implFilename: "app/api/auth/[...nextauth]/route.ts",
            implCode: `import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
});

export const { GET, POST } = handlers;`,
          },
          "react-ts": {
            configEnv: [
              { key: "VITE_API_URL", desc: "URL to custom backend handling auth APIs" },
            ],
            configCode: `VITE_API_URL=http://localhost:8080`,
            implFilename: "src/context/AuthContext.tsx",
            implCode: `import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`\${import.meta.env.VITE_API_URL}/api/auth/me\`)
      .then(res => res.json())
      .then(data => setUser(data.user))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};`,
          },
          astro: {
            configEnv: [
              { key: "AUTH_SECRET", desc: "Auth signing secret key" },
              { key: "AUTH_GITHUB_ID", desc: "GitHub Client ID" },
              { key: "AUTH_GITHUB_SECRET", desc: "GitHub Client Secret" },
            ],
            configCode: `AUTH_SECRET=your-secret
AUTH_GITHUB_ID=github-id
AUTH_GITHUB_SECRET=github-secret`,
            implFilename: "auth.config.ts",
            implCode: `import GitHub from "@auth/core/providers/github";
import { defineConfig } from "auth-astro";

export default defineConfig({
  providers: [
    GitHub({
      clientId: import.meta.env.AUTH_GITHUB_ID,
      clientSecret: import.meta.env.AUTH_GITHUB_SECRET,
    }),
  ],
});`,
          },
        },
        tradeoffs: [
          { name: "NextAuth.js", setupTime: "~45 min", cost: "Free (self-hosted)", scalability: "Depends on DB", verdict: "Best for data ownership" },
          { name: "Clerk", setupTime: "~15 min", cost: "Free to 10K MAU", scalability: "Enterprise-ready", verdict: "Best for speed" },
        ],
      },
    ],
  },
  {
    slug: "database",
    title: "Database",
    description: "Schema design, ORMs, connection pooling, and migrations.",
    icon: Database,
    items: [
      {
        slug: "db-mongodb",
        title: "MongoDB + Mongoose",
        summary: "Flexible document store — great for rapid prototyping and relational flexibility.",
        isRecommended: true,
        overview:
          "MongoDB is a document-oriented NoSQL database that stores data as flexible JSON-like documents. Paired with Mongoose, you get validation, middleware hooks, and a query builder.",
        requirements: [
          "MongoDB Atlas connection setup",
          "Mongoose schemas defined for: User, Team, Subscription",
          "Connection pooling initialized cleanly across serverless cycles",
          "Environment-separated database targets",
        ],
        approach:
          "MongoDB is ideal when the schemas are highly dynamic. We set up mongoose connection pooling in cache wrappers to prevent serverless function connection leaks.",
        stacks: {
          nextjs: {
            configEnv: [
              { key: "MONGODB_URI", desc: "Atlas connection string with db name configuration" },
            ],
            configCode: `MONGODB_URI=mongodb+srv://admin:pass@cluster.mongodb.net/saas-prod?retryWrites=true&w=majority`,
            implFilename: "lib/db.ts",
            implCode: `import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = (global as any).mongoose;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}`,
          },
          "react-ts": {
            configEnv: [
              { key: "VITE_API_URL", desc: "Backend API endpoint hosting mongoose controllers" },
            ],
            configCode: `VITE_API_URL=http://localhost:8080`,
            implFilename: "src/api/client.ts",
            implCode: `// Client-side API fetch layer for remote Mongoose models
export async function getUsers() {
  const res = await fetch(\`\${import.meta.env.VITE_API_URL}/api/users\`);
  if (!res.ok) throw new Error("Fetch failed");
  return res.json();
}`,
          },
          astro: {
            configEnv: [
              { key: "MONGODB_URI", desc: "Astro server database connection string" },
            ],
            configCode: `MONGODB_URI=mongodb+srv://admin:pass@cluster.mongodb.net/astro-db`,
            implFilename: "src/lib/mongoose.ts",
            implCode: `import mongoose from "mongoose";

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(import.meta.env.MONGODB_URI);
}`,
          },
        },
        tradeoffs: [
          { name: "MongoDB + Mongoose", setupTime: "~20 min", cost: "Free (Atlas M0)", scalability: "Horizontal sharding", verdict: "Best for flexible schemas" },
          { name: "PostgreSQL + Prisma", setupTime: "~30 min", cost: "Free (Neon/Supabase)", scalability: "Vertical scaling", verdict: "Best for relational data" },
        ],
      },
      {
        slug: "db-postgresql-prisma",
        title: "PostgreSQL + Prisma",
        summary: "Relational database with type-safe ORM — ideal for transactional and financial data.",
        overview:
          "PostgreSQL is the most advanced open-source relational database. Paired with Prisma ORM, you get a declarative schema, auto-generated type-safe client, and a migration system.",
        requirements: [
          "PostgreSQL database instance",
          "Prisma schema covering User, Team, Subscription models",
          "PgBouncer pooling configurations for serverless execution",
          "DIRECT_URL configured for migrations",
        ],
        approach:
          "PostgreSQL + Prisma is the industry standard for strong typing, foreign keys, and safe schema updates.",
        stacks: {
          nextjs: {
            configEnv: [
              { key: "DATABASE_URL", desc: "PgBouncer pooled connection URL" },
              { key: "DIRECT_URL", desc: "Direct connection URL for migrations" },
            ],
            configCode: `DATABASE_URL="postgresql://user:pass@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:pass@host:5432/postgres"`,
            implFilename: "prisma/schema.prisma",
            implCode: `datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      String   @default("USER")
  createdAt DateTime @default(now())
}`,
          },
          "react-ts": {
            configEnv: [
              { key: "VITE_API_URL", desc: "Backend endpoint hosting Prisma ORM" },
            ],
            configCode: `VITE_API_URL=http://localhost:8080`,
            implFilename: "src/hooks/useFetch.ts",
            implCode: `import { useState, useEffect } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`\${import.meta.env.VITE_API_URL}\${url}\`)
      .then((res) => res.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}`,
          },
          astro: {
            configEnv: [
              { key: "DATABASE_URL", desc: "Direct / pooled database endpoint connection string" },
            ],
            configCode: `DATABASE_URL="postgresql://user:pass@host:5432/db"`,
            implFilename: "src/lib/prisma.ts",
            implCode: `import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (import.meta.env.PROD) {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export { prisma };`,
          },
        },
        tradeoffs: [
          { name: "PostgreSQL + Prisma", setupTime: "~30 min", cost: "Free (Neon/Supabase)", scalability: "Vertical scaling", verdict: "Best for relational data" },
          { name: "MongoDB + Mongoose", setupTime: "~20 min", cost: "Free (Atlas M0)", scalability: "Horizontal sharding", verdict: "Best for flexible schemas" },
        ],
      },
    ],
  },
  {
    slug: "authorization",
    title: "Authorization",
    description: "Access control models — who can do what, and where to enforce it.",
    icon: Lock,
    items: [
      {
        slug: "authz-rbac",
        title: "Role-Based Access Control (RBAC)",
        summary: "Permission matrix tied to user roles — simple, auditable, and battle-tested.",
        overview:
          "RBAC assigns permissions to roles (USER, ADMIN, SUPERADMIN), then assigns roles to users. It is the most common authorization pattern in SaaS.",
        requirements: [
          "Role field configured on database schema user models",
          "Central permissions matrix mapping permissions to roles",
          "Endpoint/middleware checks on secure routes",
          "UI hooks/directives to toggle interactive buttons",
        ],
        approach:
          "Define a structured key/value object containing role privileges. Access evaluations run synchronously without DB calls.",
        stacks: {
          nextjs: {
            configEnv: [],
            configCode: `# RBAC settings are written inside code modules
# Database role mappings store values on users`,
            implFilename: "lib/rbac.ts",
            implCode: `export type Role = "USER" | "ADMIN" | "SUPERADMIN";

const PERMISSIONS: Record<Role, string[]> = {
  USER: ["read:data"],
  ADMIN: ["read:data", "write:data", "delete:team"],
  SUPERADMIN: ["read:data", "write:data", "delete:team", "manage:billing"],
};

export function can(role: Role, permission: string): boolean {
  return PERMISSIONS[role]?.includes(permission) ?? false;
}`,
          },
          "react-ts": {
            configEnv: [],
            configCode: `# React client receives role permissions from API auth payloads`,
            implFilename: "src/hooks/usePermission.ts",
            implCode: `import { useAuth } from "./useAuth"; // mockup user context

export function usePermission(permission: string) {
  const { user } = useAuth();
  if (!user) return false;
  
  const permissions: Record<string, string[]> = {
    USER: ["read:data"],
    ADMIN: ["read:data", "write:data"],
  };

  return permissions[user.role]?.includes(permission) ?? false;
}`,
          },
          astro: {
            configEnv: [],
            configCode: `# Role access definitions map within server-side onRequest scripts`,
            implFilename: "src/lib/rbac.ts",
            implCode: `export function hasPermission(userRole: string, required: string) {
  const map: Record<string, string[]> = {
    USER: ["read"],
    ADMIN: ["read", "write"],
  };
  return map[userRole]?.includes(required) ?? false;
}`,
          },
        },
        tradeoffs: [
          { name: "RBAC (static matrix)", setupTime: "~15 min", cost: "Free", scalability: "Unlimited", verdict: "Best for most SaaS" },
          { name: "ABAC (dynamic context)", setupTime: "~2 hours", cost: "Free", scalability: "Medium", verdict: "Best for granular rules" },
        ],
      },
      {
        slug: "authz-abac",
        title: "Attribute-Based Access Control (ABAC)",
        summary: "Dynamic, context-aware permissions — when roles aren't granular enough.",
        overview:
          "ABAC evaluates access based on attributes of the user, the resource, and the environment (time, IP, etc.).",
        requirements: [
          "Evaluator function parsing contextual metrics",
          "Explicit rule conditions configured as predicates",
          "Default-deny fallback policies",
        ],
        approach:
          "Deploy structured policies that handle complex constraints (e.g. check resource owner match).",
        stacks: {
          nextjs: {
            configEnv: [],
            configCode: `# Policy structures map in server modules`,
            implFilename: "lib/abac.ts",
            implCode: `interface Context {
  userId: string;
  resourceOwnerId: string;
  action: string;
}

export function evaluatePolicy(ctx: Context): boolean {
  if (ctx.action === "edit" && ctx.userId !== ctx.resourceOwnerId) {
    return false;
  }
  return true;
}`,
          },
          "react-ts": {
            configEnv: [],
            configCode: `# Frontend filters actions based on fetched resource context properties`,
            implFilename: "src/components/ProtectedRoute.tsx",
            implCode: `export function OwnerGuard({ userId, ownerId, children }: any) {
  if (userId !== ownerId) return <div className="text-red-500">Access Denied</div>;
  return <>{children}</>;
}`,
          },
          astro: {
            configEnv: [],
            configCode: `# Astro endpoints run context checks prior to mutation executions`,
            implFilename: "src/pages/api/delete-project.ts",
            implCode: `import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { userId, ownerId } = await request.json();
  if (userId !== ownerId) {
    return new Response("Unauthorized", { status: 403 });
  }
  return new Response("Deleted");
};`,
          },
        },
        tradeoffs: [
          { name: "ABAC (custom engine)", setupTime: "~2 hours", cost: "Free", scalability: "Medium", verdict: "Best for granular rules" },
          { name: "RBAC (static matrix)", setupTime: "~15 min", cost: "Free", scalability: "Unlimited", verdict: "Simpler, sufficient for most" },
        ],
      },
    ],
  },
  {
    slug: "caching",
    title: "Caching",
    description: "Performance acceleration — session cache, rate limiting, query memoization.",
    icon: Zap,
    items: [
      {
        slug: "cache-redis-upstash",
        title: "Redis via Upstash",
        summary: "Serverless-friendly Redis — rate limiting, session caching, and query memoization.",
        isRecommended: true,
        overview:
          "Redis is the industry-standard in-memory data store. Upstash provides a serverless Redis service with a REST API that works in serverless edge runtimes.",
        requirements: [
          "Upstash Redis REST endpoints",
          "HTTP REST connection calls via client libraries",
          "Cache-aside pattern wrappers",
          "Sliding-window rate limit checks",
        ],
        approach:
          "Deploy Upstash Redis using HTTP calls. Avoid TCP connection overhead in lambdas.",
        stacks: {
          nextjs: {
            configEnv: [
              { key: "UPSTASH_REDIS_REST_URL", desc: "Upstash API HTTP URL" },
              { key: "UPSTASH_REDIS_REST_TOKEN", desc: "Upstash authorization key" },
            ],
            configCode: `UPSTASH_REDIS_REST_URL=https://us1-abc.upstash.io
UPSTASH_REDIS_REST_TOKEN=token-here`,
            implFilename: "lib/cache.ts",
            implCode: `import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function getCachedData<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = await redis.get<string>(key);
  if (cached) return JSON.parse(cached) as T;

  const fresh = await fetcher();
  await redis.setex(key, 3600, JSON.stringify(fresh));
  return fresh;
}`,
          },
          "react-ts": {
            configEnv: [
              { key: "VITE_CACHE_ENDPOINT", desc: "Proxy endpoint handling Redis requests" },
            ],
            configCode: `VITE_CACHE_ENDPOINT=http://localhost:8080/api/cache`,
            implFilename: "src/utils/fetchCache.ts",
            implCode: `// Fetch helper resolving server caching proxies
export async function fetchCached(key: string) {
  const res = await fetch(\`\${import.meta.env.VITE_CACHE_ENDPOINT}?key=\${key}\`);
  return res.json();
}`,
          },
          astro: {
            configEnv: [
              { key: "UPSTASH_REDIS_REST_URL", desc: "Upstash connection endpoint" },
              { key: "UPSTASH_REDIS_REST_TOKEN", desc: "Upstash token" },
            ],
            configCode: `UPSTASH_REDIS_REST_URL=https://us1-abc.upstash.io
UPSTASH_REDIS_REST_TOKEN=token`,
            implFilename: "src/lib/redis.ts",
            implCode: `import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});`,
          },
        },
        tradeoffs: [
          { name: "Upstash Redis", setupTime: "~10 min", cost: "$0 to 10K cmd/day", scalability: "Global replication", verdict: "Best for serverless" },
          { name: "In-memory Map cache", setupTime: "~5 min", cost: "Free", scalability: "Single-instance only", verdict: "Best for prototyping" },
        ],
      },
      {
        slug: "cache-edge",
        title: "Edge / In-Memory Cache",
        summary: "Lightweight caching without Redis — for smaller apps or edge deployments.",
        overview:
          "For smaller applications that don't require shared state, you can use local in-memory caching mapping values to static variables.",
        requirements: [
          "In-memory Map structure",
          "TTL expiration logic on key retrieval",
          "Eviction controls preventing heap overflow",
        ],
        approach:
          "Implement a local Singleton class managing active key/value maps.",
        stacks: {
          nextjs: {
            configEnv: [],
            configCode: `# In-memory local server caching requires no env keys`,
            implFilename: "lib/memory-cache.ts",
            implCode: `const store = new Map<string, { value: any; expires: number }>();

export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}

export function cacheSet(key: string, value: any, ttlMs: number = 60000) {
  store.set(key, { value, expires: Date.now() + ttlMs });
}`,
          },
          "react-ts": {
            configEnv: [],
            configCode: `# React cache handles data inside client state stores`,
            implFilename: "src/utils/clientCache.ts",
            implCode: `const apiCache = new Map<string, any>();

export function getClientCache(key: string) {
  return apiCache.get(key) || null;
}

export function setClientCache(key: string, value: any) {
  apiCache.set(key, value);
}`,
          },
          astro: {
            configEnv: [],
            configCode: `# Local Astro cache is kept in global server memory scopes`,
            implFilename: "src/lib/memory.ts",
            implCode: `let cacheMap = new Map();

export function getCached(key: string) {
  return cacheMap.get(key);
}

export function setCached(key: string, val: any) {
  cacheMap.set(key, val);
}`,
          },
        },
        tradeoffs: [
          { name: "In-memory Map cache", setupTime: "~5 min", cost: "Free", scalability: "Single-instance only", verdict: "Best for prototyping" },
          { name: "Upstash Redis", setupTime: "~10 min", cost: "$0 to 10K cmd/day", scalability: "Global replication", verdict: "Best for production" },
        ],
      },
    ],
  },
  {
    slug: "billing",
    title: "Billing & Subscriptions",
    description: "Manage subscription plans, checkouts, customer portals, and Stripe webhooks.",
    icon: CreditCard,
    items: [
      {
        slug: "billing-stripe",
        title: "Stripe Subscriptions",
        summary: "Robust billing infrastructure using Stripe checkout sessions, customer portal, and secure webhook event handling.",
        isRecommended: true,
        overview:
          "Payment processing is core to SaaS apps. Stripe Checkout manages customer collection safely, while webhooks keep database subscription states in sync.",
        requirements: [
          "Secure webhook event listener validating signatures",
          "Dynamic pricing configuration mapping (Stripe Price IDs)",
          "Customer Portal redirection flow",
          "Automated DB updates on trial changes, payments, and cancellations",
        ],
        approach:
          "Integrate Stripe with Webhook listener matching events like customer.subscription.updated and customer.subscription.deleted.",
        stacks: {
          nextjs: {
            configEnv: [
              { key: "STRIPE_SECRET_KEY", desc: "Stripe secret API key" },
              { key: "STRIPE_WEBHOOK_SECRET", desc: "Webhook signature verification token" },
            ],
            configCode: `STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...`,
            implFilename: "app/api/webhooks/stripe/route.ts",
            implCode: `import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-24" as any,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature")!;

  try {
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    if (event.type === "customer.subscription.deleted") {
      // Handle subscription cancellation
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}`,
          },
          "react-ts": {
            configEnv: [
              { key: "VITE_STRIPE_PUBLISHABLE_KEY", desc: "Stripe client-side publishable key" },
            ],
            configCode: `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`,
            implFilename: "src/utils/stripe.ts",
            implCode: `export async function redirectToCheckout(priceId: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });
  const { url } = await res.json();
  window.location.href = url;
}`,
          },
          astro: {
            configEnv: [
              { key: "STRIPE_SECRET_KEY", desc: "Stripe API Key" },
            ],
            configCode: `STRIPE_SECRET_KEY=sk_test_...`,
            implFilename: "src/pages/api/checkout.ts",
            implCode: `import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-01-24" as any,
});

export const POST: APIRoute = async ({ request }) => {
  const { priceId } = await request.json();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });
  return new Response(JSON.stringify({ url: session.url }));
};`,
          },
        },
        tradeoffs: [
          { name: "Stripe Billing", setupTime: "~1 hour", cost: "0.5% + transaction fees", scalability: "Global scale", verdict: "Best choice" },
          { name: "Paddle / Lemon Squeezy", setupTime: "~30 min", cost: "5% + fees", scalability: "Global", verdict: "Merchant of Record alternative" },
        ],
      },
    ],
  },
  {
    slug: "multitenancy",
    title: "Organizations & Teams",
    description: "Manage workspaces, invite flows, and per-org data isolation boundaries.",
    icon: Users,
    items: [
      {
        slug: "org-teams",
        title: "Workspace Isolation",
        summary: "Secure workspace structures separating user scopes and resource queries by org boundaries.",
        isRecommended: true,
        overview:
          "B2B SaaS apps require users to belong to workspaces or teams. Data queries must be locked inside active workspace contexts to prevent leaks.",
        requirements: [
          "Organization model containing members",
          "Scope filters on all database fetch queries",
          "Invite token flow link generation",
          "Role definitions within workspace contexts",
        ],
        approach:
          "Include workspace context checks inside secure middleware layers or database query scopes.",
        stacks: {
          nextjs: {
            configEnv: [],
            configCode: `# Scope organization filters directly in queries`,
            implFilename: "lib/queries.ts",
            implCode: `import { prisma } from "@/lib/prisma";

export async function getOrgProjects(orgId: string) {
  // Query is strictly gated by organization ID bounds
  return prisma.project.findMany({
    where: { orgId },
  });
}`,
          },
          "react-ts": {
            configEnv: [],
            configCode: `# Org tokens are passed inside HTTP request headers`,
            implFilename: "src/context/WorkspaceContext.tsx",
            implCode: `import { createContext, useState } from "react";

export const WorkspaceContext = createContext<any>(null);

export const WorkspaceProvider = ({ children }: any) => {
  const [activeOrgId, setActiveOrgId] = useState<string | null>(null);

  return (
    <WorkspaceContext.Provider value={{ activeOrgId, setActiveOrgId }}>
      {children}
    </WorkspaceContext.Provider>
  );
};`,
          },
          astro: {
            configEnv: [],
            configCode: `# Workspace boundaries are verified inside API route parameters`,
            implFilename: "src/middleware/orgGate.ts",
            implCode: `export function verifyOrgAccess(userOrgs: string[], targetOrgId: string) {
  if (!userOrgs.includes(targetOrgId)) {
    throw new Error("Access Denied");
  }
}`,
          },
        },
        tradeoffs: [
          { name: "Schema-level Isolation", setupTime: "~30 min", cost: "Free", scalability: "High", verdict: "Recommended for B2B" },
          { name: "Row-level Security (RLS)", setupTime: "~1 hour", cost: "Free", scalability: "High", verdict: "Supabase Postgres alternative" },
        ],
      },
    ],
  },
  {
    slug: "email",
    title: "Email & Notifications",
    description: "Send transactional emails and manage user notification preferences.",
    icon: Mail,
    items: [
      {
        slug: "email-resend",
        title: "Resend Integration",
        summary: "Send transactional emails with Resend and design templates using React Email.",
        isRecommended: true,
        overview:
          "SaaS apps need to send transactional emails for password resets, signups, and team invites. Resend provides developer-friendly email APIs.",
        requirements: [
          "API integration with transactional services",
          "Component-based email layouts",
          "Dynamic parameter interpolation",
          "Email bounce and delivery tracking logs",
        ],
        approach:
          "Integrate Resend client with React Email templates for type-safe emails.",
        stacks: {
          nextjs: {
            configEnv: [
              { key: "RESEND_API_KEY", desc: "Secret Resend token key" },
            ],
            configCode: `RESEND_API_KEY=re_...`,
            implFilename: "lib/email.ts",
            implCode: `import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  return resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Welcome to Acme",
    html: \`<p>Hello \${name}, welcome!</p>\`,
  });
}`,
          },
          "react-ts": {
            configEnv: [
              { key: "VITE_API_URL", desc: "API Endpoint handling mail triggers" },
            ],
            configCode: `VITE_API_URL=http://localhost:8080`,
            implFilename: "src/utils/mail.ts",
            implCode: `export async function triggerWelcomeEmail(email: string) {
  return fetch(\`\${import.meta.env.VITE_API_URL}/api/email/welcome\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}`,
          },
          astro: {
            configEnv: [
              { key: "RESEND_API_KEY", desc: "Resend token secret" },
            ],
            configCode: `RESEND_API_KEY=re_...`,
            implFilename: "src/pages/api/send-email.ts",
            implCode: `import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();
  await resend.emails.send({
    from: "Astro <onboarding@resend.dev>",
    to: [email],
    subject: "Astro onboard welcome",
    html: "<h1>Welcome!</h1>",
  });
  return new Response("Sent");
};`,
          },
        },
        tradeoffs: [
          { name: "Resend", setupTime: "~10 min", cost: "Free to 3K emails/mo", scalability: "High", verdict: "Best developer choice" },
          { name: "SendGrid / Mailgun", setupTime: "~30 min", cost: "Varies", scalability: "Enterprise", verdict: "Legacy alternative" },
        ],
      },
    ],
  },
  {
    slug: "storage",
    title: "File Storage & Uploads",
    description: "Secure, performant file uploads with upload validation bounds.",
    icon: HardDrive,
    items: [
      {
        slug: "storage-s3",
        title: "S3 Compatible Storage",
        summary: "Presigned URL uploads using AWS S3 or Cloudflare R2 services.",
        isRecommended: true,
        overview:
          "SaaS apps frequently need to store user assets (avatars, PDFs, exports). AWS S3 or Cloudflare R2 provide secure cloud object storage.",
        requirements: [
          "Presigned URL generation",
          "Client-side upload direct to storage buckets",
          "File size limits and mime-type checks",
          "Secure bucket permissions config",
        ],
        approach:
          "Generate secure presigned URLs on the server, then upload files directly from the client to bypass server load limits.",
        stacks: {
          nextjs: {
            configEnv: [
              { key: "S3_BUCKET_NAME", desc: "Amazon S3 or Cloudflare R2 bucket name" },
              { key: "S3_ACCESS_KEY_ID", desc: "Access credential key" },
              { key: "S3_SECRET_ACCESS_KEY", desc: "Secret access key value" },
            ],
            configCode: `S3_BUCKET_NAME=my-saas-bucket
S3_ACCESS_KEY_ID=AKIA...
S3_SECRET_ACCESS_KEY=secret-access-key-value`,
            implFilename: "lib/s3.ts",
            implCode: `import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function getUploadUrl(key: string, fileType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });
  return getSignedUrl(s3, command, { expiresIn: 3600 });
}`,
          },
          "react-ts": {
            configEnv: [],
            configCode: `# React triggers file uploads using generated presigned URLs`,
            implFilename: "src/utils/upload.ts",
            implCode: `export async function uploadFile(file: File, presignedUrl: string) {
  return fetch(presignedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
}`,
          },
          astro: {
            configEnv: [
              { key: "S3_ACCESS_KEY_ID", desc: "Access key" },
              { key: "S3_SECRET_ACCESS_KEY", desc: "Secret key" },
            ],
            configCode: `S3_ACCESS_KEY_ID=access
S3_SECRET_ACCESS_KEY=secret`,
            implFilename: "src/pages/api/upload-url.ts",
            implCode: `import type { APIRoute } from "astro";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "auto",
  endpoint: "https://your-r2-id.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: import.meta.env.S3_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.S3_SECRET_ACCESS_KEY,
  },
});

export const POST: APIRoute = async ({ request }) => {
  const { filename, fileType } = await request.json();
  const command = new PutObjectCommand({ Bucket: "my-bucket", Key: filename, ContentType: fileType });
  const url = await getSignedUrl(s3, command, { expiresIn: 600 });
  return new Response(JSON.stringify({ url }));
};`,
          },
        },
        tradeoffs: [
          { name: "Cloudflare R2", setupTime: "~15 min", cost: "Free to 10GB/mo ($0 egress fee)", scalability: "High", verdict: "Best choice for serverless" },
          { name: "AWS S3", setupTime: "~20 min", cost: "Standard storage + egress fees", scalability: "High", verdict: "Enterprise standard" },
        ],
      },
    ],
  },
];

// ─── Main Component ─────────────────────────────────────────────────────────

interface DocsPageProps {
  onBack: () => void;
}

export const DocsPage = ({ onBack }: DocsPageProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeStack, setActiveStack] = useState<SupportedStack>("nextjs");
  const [expandedPrd, setExpandedPrd] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory, activeItem]);

  const navigateTo = useCallback((catSlug: string, itemSlug?: string) => {
    setActiveCategory(catSlug);
    // Auto-select first item in category if none specified
    if (!itemSlug) {
      const cat = CATEGORIES.find((c) => c.slug === catSlug);
      setActiveItem(cat?.items[0]?.slug || null);
    } else {
      setActiveItem(itemSlug);
    }
    setMobileSidebarOpen(false);
    setExpandedPrd(null);
  }, []);

  const goToIndex = useCallback(() => {
    setActiveCategory(null);
    setActiveItem(null);
    setMobileSidebarOpen(false);
    setExpandedPrd(null);
  }, []);

  // Resolve current category and item
  const currentCategory = activeCategory ? CATEGORIES.find((c) => c.slug === activeCategory) : null;
  const currentItem = currentCategory && activeItem ? currentCategory.items.find((i) => i.slug === activeItem) : null;

  // Resolve stack-specific content of current item
  const stackContent = currentItem ? currentItem.stacks[activeStack] : null;

  // ─── INDEX VIEW ────────────────────────────────────────────────────────────
  if (!activeCategory) {
    return (
      <div className="w-full">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-colors mb-8 cursor-pointer font-mono bg-transparent border-0 p-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO STUDIO</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-neutral-900 border border-[#ebebeb] dark:border-neutral-800 text-[10px] uppercase font-mono tracking-widest text-[#4d4d4d] dark:text-neutral-400 mb-4 w-fit">
          <BookOpen className="w-3 h-3 text-[#0070f3] dark:text-cyan-400" />
          <span>Onewave SaaS Kit</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#171717] dark:text-white mb-3">
          SaaS Engineering Docs.
        </h1>
        <p className="text-sm text-[#4d4d4d] dark:text-neutral-300 font-light max-w-xl leading-relaxed mb-10">
          Everything you need to configure a production SaaS — opinionated specs for auth, data, access control, and performance.
        </p>

        {/* Category card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.slug}
                onClick={() => navigateTo(cat.slug)}
                className="group text-left p-5 bg-white dark:bg-[#080808] border border-[#ebebeb] dark:border-neutral-900 rounded-xl hover:border-[#0070f3]/40 dark:hover:border-cyan-500/25 transition-all duration-200 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-[#fafafa] dark:bg-neutral-950 border border-[#ebebeb] dark:border-neutral-800 text-[#0070f3] dark:text-cyan-400 shrink-0 group-hover:border-[#0070f3]/30 dark:group-hover:border-cyan-500/25 transition-colors">
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-semibold text-[#171717] dark:text-white group-hover:text-[#0070f3] dark:group-hover:text-cyan-400 transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600">
                        {cat.items.length} docs
                      </span>
                    </div>
                    <p className="text-xs text-[#4d4d4d] dark:text-neutral-400 font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Global CLI banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0a0a0a] dark:bg-neutral-950 border border-neutral-800 max-w-full overflow-x-auto">
          <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
          <code className="text-cyan-300 font-mono text-xs sm:text-sm whitespace-nowrap flex-1">
            npx create-onewave-app@latest my-saas
          </code>
          <span className="shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            COMING SOON
          </span>
        </div>
        <p className="mt-2 text-[11px] font-mono text-neutral-400 dark:text-neutral-600">
          The CLI package is being built — star the repo to get notified.
        </p>
      </div>
    );
  }

  // ─── DETAIL VIEW (Category + Item) ─────────────────────────────────────────
  return (
    <div className="w-full">
      {/* Mobile navigation header */}
      <div className="flex lg:hidden items-center justify-between mb-4">
        <button
          onClick={goToIndex}
          className="inline-flex items-center gap-1.5 text-xs text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer font-mono bg-transparent border-0 p-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ALL DOCS</span>
        </button>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-md border border-[#ebebeb] dark:border-neutral-800 text-[#4d4d4d] dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all cursor-pointer"
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile sidebar list */}
      {mobileSidebarOpen && (
        <div className="lg:hidden mb-6 bg-white dark:bg-[#080808] border border-[#ebebeb] dark:border-neutral-900 rounded-xl p-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.slug} className="mb-3 last:mb-0">
              <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-1.5">
                {cat.title}
              </p>
              {cat.items.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => navigateTo(cat.slug, item.slug)}
                  className={`block w-full text-left px-3 py-1.5 rounded text-xs cursor-pointer transition-colors ${
                    activeCategory === cat.slug && activeItem === item.slug
                      ? "text-[#0070f3] dark:text-cyan-400 bg-[#0070f3]/5 dark:bg-cyan-500/5"
                      : "text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white"
                  }`}
                >
                  {item.title}
                  {item.isRecommended && <span className="ml-1.5 text-[9px] text-emerald-500 font-mono">★</span>}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-8">
        {/* ─── Desktop Sidebar ────────────────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-6 self-start h-fit">
          <button
            onClick={goToIndex}
            className="inline-flex items-center gap-1.5 text-xs text-[#4d4d4d] dark:text-neutral-400 hover:text-[#171717] dark:hover:text-white transition-colors cursor-pointer font-mono bg-transparent border-0 p-0 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL DOCS</span>
          </button>

          {CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const isCatActive = activeCategory === cat.slug;
            return (
              <div key={cat.slug} className="mb-4">
                <button
                  onClick={() => navigateTo(cat.slug)}
                  className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider mb-1.5 cursor-pointer bg-transparent border-0 p-0 transition-colors ${
                    isCatActive ? "text-[#171717] dark:text-white" : "text-neutral-400 dark:text-neutral-600 hover:text-[#4d4d4d] dark:hover:text-neutral-400"
                  }`}
                >
                  <CatIcon className="w-3 h-3" />
                  <span>{cat.title}</span>
                </button>
                <div className="flex flex-col gap-0.5 pl-5 border-l border-[#ebebeb] dark:border-neutral-900">
                  {cat.items.map((item) => {
                    const isActive = isCatActive && activeItem === item.slug;
                    return (
                      <button
                        key={item.slug}
                        onClick={() => navigateTo(cat.slug, item.slug)}
                        className={`text-left px-2.5 py-1.5 rounded-md text-xs cursor-pointer transition-all border bg-transparent ${
                          isActive
                            ? "text-[#0070f3] dark:text-cyan-400 border-[#0070f3]/20 dark:border-cyan-500/15 bg-[#0070f3]/5 dark:bg-cyan-500/5"
                            : "text-[#4d4d4d] dark:text-neutral-400 border-transparent hover:text-[#171717] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900"
                        }`}
                      >
                        <span>{item.title}</span>
                        {item.isRecommended && <span className="ml-1.5 text-[9px] text-emerald-500 font-mono">★</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </aside>

        {/* ─── Main Content Area ───────────────────────────────────────────── */}
        <div ref={contentRef} className="flex-1 min-w-0">
          {currentItem && stackContent && (
            <article>
              {/* Doc header */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#171717] dark:text-white">
                    {currentItem.title}
                  </h1>
                  {currentItem.isRecommended && (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      RECOMMENDED DEFAULT
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#4d4d4d] dark:text-neutral-300 font-light leading-relaxed">
                  {currentItem.summary}
                </p>
              </div>

              {/* ─── Tech Stack Selector UI ─────────────────────────────────── */}
              <div className="mb-8 p-1.5 rounded-lg bg-neutral-100 dark:bg-[#0a0a0a] border border-[#ebebeb] dark:border-neutral-900 flex items-center gap-1 w-full max-w-md">
                <div className="flex items-center gap-1.5 px-3 text-[#888888] dark:text-neutral-500 text-[10px] uppercase font-mono tracking-wider shrink-0">
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Stack</span>
                </div>
                <div className="grid grid-cols-3 gap-1 flex-1">
                  {[
                    { id: "nextjs" as const, label: "Next.js" },
                    { id: "react-ts" as const, label: "React + TS" },
                    { id: "astro" as const, label: "Astro" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveStack(s.id)}
                      className={`h-7 rounded text-[11px] font-mono font-medium transition-all cursor-pointer ${
                        activeStack === s.id
                          ? "bg-white dark:bg-neutral-900 text-[#171717] dark:text-white border border-[#ebebeb] dark:border-neutral-800 shadow-sm"
                          : "bg-transparent text-[#888888] hover:text-[#4d4d4d] dark:hover:text-neutral-300 border border-transparent"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <section className="mb-8">
                <h2 className="text-xs font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Overview
                </h2>
                <p className="text-sm text-[#4d4d4d] dark:text-neutral-300 font-light leading-relaxed">
                  {currentItem.overview}
                </p>
              </section>

              {/* Requirements */}
              <section className="mb-8">
                <h2 className="text-xs font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {currentItem.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#4d4d4d] dark:text-neutral-300 font-light leading-relaxed">
                      <span className="w-4 h-4 mt-0.5 shrink-0 flex items-center justify-center rounded border border-[#ebebeb] dark:border-neutral-800 text-[10px] font-mono text-neutral-400 dark:text-neutral-600">
                        {i + 1}
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Recommended Approach */}
              <section className="mb-8">
                <h2 className="text-xs font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Recommended Approach
                </h2>
                <div className="p-4 bg-[#fafafa] dark:bg-[#080808] border border-[#ebebeb] dark:border-neutral-900 rounded-lg">
                  <p className="text-sm text-[#4d4d4d] dark:text-neutral-300 font-light leading-relaxed">
                    {currentItem.approach}
                  </p>
                </div>
              </section>

              {/* Configuration */}
              <section className="mb-8">
                <h2 className="text-xs font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Configuration
                </h2>

                {stackContent.configEnv.length > 0 && (
                  <div className="mb-4 overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#ebebeb] dark:border-neutral-800">
                          <th className="text-left py-2 px-3 font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">Variable</th>
                          <th className="text-left py-2 px-3 font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stackContent.configEnv.map((env) => (
                          <tr key={env.key} className="border-b border-[#ebebeb] dark:border-neutral-800 last:border-0">
                            <td className="py-2 px-3 font-mono text-[#0070f3] dark:text-cyan-400 whitespace-nowrap">{env.key}</td>
                            <td className="py-2 px-3 text-[#4d4d4d] dark:text-neutral-400 font-light">{env.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <CodeBlock code={stackContent.configCode} filename=".env.local" />
              </section>

              {/* Implementation */}
              <section className="mb-8">
                <h2 className="text-xs font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Implementation Code
                </h2>
                <CodeBlock code={stackContent.implCode} filename={stackContent.implFilename} />
              </section>

              {/* ─── INTERACTIVE FEATURES PER MODULE ─────────────────────────── */}

              {/* Interactive Feature 1: CLI Configurator (All Categories) */}
              <section className="mb-8 p-5 bg-[#fafafa] dark:bg-[#080808] border border-[#ebebeb] dark:border-neutral-900 rounded-lg shadow-sm">
                <h3 className="text-xs font-mono font-bold text-[#171717] dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#0070f3] dark:text-cyan-400" />
                  <span>Interactive Command Builder</span>
                </h3>
                <p className="text-xs text-[#888888] dark:text-neutral-500 mb-4 font-light leading-relaxed">
                  Customize flags to see how the scaffold client maps the package dynamically.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] font-mono py-1 text-neutral-400">Target Stack:</span>
                  {["nextjs", "react-ts", "astro"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setActiveStack(st as SupportedStack)}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono transition-all border ${
                        activeStack === st
                          ? "bg-[#171717] text-white dark:bg-white dark:text-black border-transparent"
                          : "bg-white dark:bg-[#121212] border-[#ebebeb] dark:border-neutral-800 text-[#4d4d4d] dark:text-neutral-400"
                      }`}
                    >
                      --stack={st}
                    </button>
                  ))}
                </div>
                <div className="p-3.5 bg-[#0a0a0a] rounded border border-neutral-800 flex items-center justify-between overflow-x-auto">
                  <code className="text-cyan-300 font-mono text-xs whitespace-nowrap">
                    npx onewave add {currentItem.slug} --stack={activeStack}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`npx onewave add ${currentItem.slug} --stack=${activeStack}`);
                      setExpandedPrd("cmd-copied");
                      setTimeout(() => setExpandedPrd(null), 2000);
                    }}
                    className="p-1 rounded bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer text-[10px] font-mono shrink-0 ml-2"
                  >
                    {expandedPrd === "cmd-copied" ? "COPIED!" : "COPY"}
                  </button>
                </div>
              </section>

              {/* Interactive Feature 2: Prisma Schema Relation Viewer */}
              {currentItem.slug === "db-postgresql-prisma" && (
                <PrismaRelationViewer />
              )}

              {/* Interactive Feature 3: RBAC Matrix Validator */}
              {currentItem.slug === "authz-rbac" && (
                <RbacMatrixValidator />
              )}

              {/* Interactive Feature 4: API Rate Limiter Simulator */}
              {currentItem.slug === "cache-redis-upstash" && (
                <RateLimitSimulator />
              )}

              {/* Tradeoffs */}
              <section className="mb-8">
                <h2 className="text-xs font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Tradeoffs
                </h2>
                <div className="overflow-x-auto rounded-lg border border-[#ebebeb] dark:border-neutral-800">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#fafafa] dark:bg-[#080808] border-b border-[#ebebeb] dark:border-neutral-800">
                        <th className="text-left py-2.5 px-3 font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">Approach</th>
                        <th className="text-left py-2.5 px-3 font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">Setup</th>
                        <th className="text-left py-2.5 px-3 font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">Cost</th>
                        <th className="text-left py-2.5 px-3 font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">Scale</th>
                        <th className="text-left py-2.5 px-3 font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wider">Verdict</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItem.tradeoffs.map((row) => (
                        <tr key={row.name} className="border-b border-[#ebebeb] dark:border-neutral-800 last:border-0">
                          <td className="py-2.5 px-3 font-semibold text-[#171717] dark:text-white">{row.name}</td>
                          <td className="py-2.5 px-3 text-[#4d4d4d] dark:text-neutral-400 font-mono">{row.setupTime}</td>
                          <td className="py-2.5 px-3 text-[#4d4d4d] dark:text-neutral-400 font-mono">{row.cost}</td>
                          <td className="py-2.5 px-3 text-[#4d4d4d] dark:text-neutral-400">{row.scalability}</td>
                          <td className="py-2.5 px-3 text-[#0070f3] dark:text-cyan-400 font-medium">{row.verdict}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Install command placeholder */}
              <section className="mb-4">
                <h2 className="text-xs font-mono text-[#888888] dark:text-neutral-500 uppercase tracking-widest mb-3">
                  Scaffold Command
                </h2>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#0a0a0a] dark:bg-neutral-950 border border-neutral-800 overflow-x-auto">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <code className="text-cyan-300/60 font-mono text-xs whitespace-nowrap flex-1">
                    npx onewave add {currentItem.slug} --stack={activeStack}
                  </code>
                  <span className="shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    COMING SOON
                  </span>
                </div>
              </section>

              {/* PRD accordion */}
              <section>
                <div className="border border-[#ebebeb] dark:border-neutral-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedPrd(expandedPrd === currentItem.slug ? null : currentItem.slug)}
                    className="w-full flex items-center justify-between px-4 py-3 text-xs bg-[#fafafa] dark:bg-[#080808] hover:bg-neutral-100 dark:hover:bg-neutral-900/60 transition-colors cursor-pointer border-0"
                  >
                    <span className="font-semibold text-[#171717] dark:text-neutral-200 uppercase tracking-wider text-[10px] font-mono">
                      Full PRD — Product Requirements Document
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                        expandedPrd === currentItem.slug ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedPrd === currentItem.slug && (
                    <div className="border-t border-[#ebebeb] dark:border-neutral-800 p-5 bg-white dark:bg-[#050505]">
                      <div className="text-xs text-[#4d4d4d] dark:text-neutral-300 font-light leading-relaxed space-y-4">
                        <div>
                          <h4 className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-2">Objective</h4>
                          <p>{currentItem.overview}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-2">Requirements Checklist</h4>
                          <ul className="space-y-1">
                            {currentItem.requirements.map((req, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-neutral-400 dark:text-neutral-600 shrink-0">☐</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-2">Approach & Rationale</h4>
                          <p>{currentItem.approach}</p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-wider mb-2">Registry Slug</h4>
                          <code className="text-[#0070f3] dark:text-cyan-400 font-mono">{currentItem.slug}</code>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </article>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Sub-components for Interactive Playgrounds ────────────────────────────

function PrismaRelationViewer() {
  const [selectedModel, setSelectedModel] = useState<string>("User");

  const models: Record<string, { desc: string; relations: string[] }> = {
    User: {
      desc: "Represents an authenticated team member. Points to a singular Team and can hold one Subscription.",
      relations: ["Team (belongs to teamId)", "Subscription (has one via Cascade link)", "AuditLog (has many logs)"],
    },
    Team: {
      desc: "Represents an organization workspace boundary. Users reside within team mappings.",
      relations: ["User (contains many members)"],
    },
    Subscription: {
      desc: "Stores Stripe metadata and payment status bounds. Directly bound to User records.",
      relations: ["User (belongs to userId)"],
    },
    AuditLog: {
      desc: "Stores security and RBAC validation event logging bounds.",
      relations: ["User (belongs to userId)"],
    },
  };

  return (
    <section className="mb-8 p-5 bg-[#fafafa] dark:bg-[#080808] border border-[#ebebeb] dark:border-neutral-900 rounded-lg shadow-sm">
      <h3 className="text-xs font-mono font-bold text-[#171717] dark:text-white uppercase tracking-wider mb-2">
        ⚡ Live Prisma Schema Relation Map
      </h3>
      <p className="text-xs text-[#888888] dark:text-neutral-500 mb-4 font-light leading-relaxed">
        Select a database model schema to trace foreign key paths and relations.
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(models).map((m) => (
          <button
            key={m}
            onClick={() => setSelectedModel(m)}
            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors border ${
              selectedModel === m
                ? "bg-[#171717] text-white dark:bg-white dark:text-black border-transparent"
                : "bg-white dark:bg-[#121212] border-[#ebebeb] dark:border-neutral-800 text-[#4d4d4d] dark:text-neutral-400"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-[#0c0c0c] border border-[#ebebeb] dark:border-neutral-850 rounded-lg text-xs leading-relaxed">
        <p className="font-semibold text-[#171717] dark:text-white mb-1.5">{selectedModel} Model Description:</p>
        <p className="text-[#888888] dark:text-neutral-400 mb-3 font-light">{models[selectedModel].desc}</p>
        <p className="font-semibold text-[#171717] dark:text-white mb-1.5">Relations / Connections:</p>
        <div className="flex flex-col gap-1">
          {models[selectedModel].relations.map((rel, idx) => (
            <div key={idx} className="font-mono text-[10px] text-[#0070f3] dark:text-cyan-400">
              → {rel}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RbacMatrixValidator() {
  const [selectedRole, setSelectedRole] = useState<string>("USER");
  const [selectedAction, setSelectedAction] = useState<string>("write:data");

  const matrix: Record<string, string[]> = {
    USER: ["read:data"],
    ADMIN: ["read:data", "write:data", "delete:team"],
    SUPERADMIN: ["read:data", "write:data", "delete:team", "manage:billing"],
  };

  const evaluate = () => {
    return matrix[selectedRole].includes(selectedAction);
  };

  return (
    <section className="mb-8 p-5 bg-[#fafafa] dark:bg-[#080808] border border-[#ebebeb] dark:border-neutral-900 rounded-lg shadow-sm">
      <h3 className="text-xs font-mono font-bold text-[#171717] dark:text-white uppercase tracking-wider mb-2">
        🛡️ Live RBAC Privilege Evaluator
      </h3>
      <p className="text-xs text-[#888888] dark:text-neutral-500 mb-4 font-light leading-relaxed">
        Select a role and target database action to evaluate permission states.
      </p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1.5">Role Context</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full h-8 px-2 rounded bg-white dark:bg-[#121212] border border-[#ebebeb] dark:border-neutral-800 text-xs text-[#171717] dark:text-white"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPERADMIN">SUPERADMIN</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1.5">Action Target</label>
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="w-full h-8 px-2 rounded bg-white dark:bg-[#121212] border border-[#ebebeb] dark:border-neutral-800 text-xs text-[#171717] dark:text-white"
          >
            <option value="read:data">read:data</option>
            <option value="write:data">write:data</option>
            <option value="delete:team">delete:team</option>
            <option value="manage:billing">manage:billing</option>
          </select>
        </div>
      </div>
      <div className={`p-3 rounded border text-center font-mono text-xs font-bold ${
        evaluate()
          ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400"
          : "bg-red-500/10 border-red-500/25 text-red-600 dark:text-red-400"
      }`}>
        {evaluate() ? "✓ ALLOWED" : "✗ ACCESS DENIED (403)"}
      </div>
    </section>
  );
}

function RateLimitSimulator() {
  const [requests, setRequests] = useState<number>(0);
  const limit = 10;

  const triggerRequest = () => {
    setRequests((prev) => prev + 1);
  };

  const reset = () => {
    setRequests(0);
  };

  const isBlocked = requests > limit;

  return (
    <section className="mb-8 p-5 bg-[#fafafa] dark:bg-[#080808] border border-[#ebebeb] dark:border-neutral-900 rounded-lg shadow-sm">
      <h3 className="text-xs font-mono font-bold text-[#171717] dark:text-white uppercase tracking-wider mb-2">
        📈 API Rate Limiter Simulator
      </h3>
      <p className="text-xs text-[#888888] dark:text-neutral-500 mb-4 font-light leading-relaxed">
        Trigger simulated API requests to view sliding window cache-key rate limits.
      </p>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="text-[10px] font-mono text-neutral-400 uppercase">Requests limit threshold</div>
          <div className="text-lg font-bold text-[#171717] dark:text-white mt-0.5">{requests} / {limit} hits</div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={triggerRequest}
            className="h-8 px-3 rounded bg-[#171717] dark:bg-white text-white dark:text-black text-xs font-semibold hover:bg-black/90 dark:hover:bg-white/90 cursor-pointer"
          >
            Hit API
          </button>
          <button
            onClick={reset}
            className="h-8 px-2.5 rounded bg-white dark:bg-[#121212] border border-[#ebebeb] dark:border-neutral-800 text-[#4d4d4d] dark:text-neutral-400 hover:bg-[#fafafa] text-xs cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
      {isBlocked ? (
        <div className="p-3 rounded border border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-400 text-center font-mono text-xs font-bold animate-pulse">
          ✗ 429 TOO MANY REQUESTS (Rate Limit Blocked)
        </div>
      ) : (
        <div className="p-3 rounded border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-center font-mono text-xs font-bold">
          ✓ 200 OK (Request Passed)
        </div>
      )}
    </section>
  );
}
