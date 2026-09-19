import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign In | Studio Thumbcrafter" },
      { name: "description", content: "Admin sign in for Studio Thumbcrafter." },
      { property: "og:title", content: "Sign In | Studio Thumbcrafter" },
      {
        property: "og:description",
        content: "Admin sign in for Studio Thumbcrafter.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setStatus("error");
        setMessage(error.message);
      } else {
        setStatus("success");
        setMessage("Account created. Check your email for confirmation, then sign in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus("error");
        setMessage(error.message);
      } else {
        setStatus("success");
        router.navigate({ to: "/admin" });
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4 text-ink">
      <div className="w-full max-w-md border border-ink/10 bg-chalk p-8 shadow-2xl">
        <h1 className="font-display text-4xl uppercase">Admin Access</h1>
        <p className="mt-2 text-sm text-ink/60">Sign in to view contact inquiries.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase text-ink/50">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-ink bg-transparent py-2 font-body text-sm outline-none focus:border-signal"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="mb-2 block font-mono text-[10px] uppercase text-ink/50">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-ink bg-transparent py-2 font-body text-sm outline-none focus:border-signal"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={status === "loading"} className="w-full">
            {mode === "signup"
              ? status === "loading"
                ? "Creating..."
                : "Create Account"
              : status === "loading"
                ? "Signing In..."
                : "Sign In"}
          </Button>
          {status === "error" && <p className="text-sm text-red-500">{message}</p>}
          {status === "success" && mode === "signup" && (
            <p className="text-sm text-green-600">{message}</p>
          )}
        </form>
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setStatus("idle");
              setMessage("");
            }}
            className="text-xs font-mono uppercase text-ink/50 underline hover:text-signal"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
