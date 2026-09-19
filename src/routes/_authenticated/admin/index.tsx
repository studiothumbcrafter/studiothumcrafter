import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";

import { ensureAdmin, listInquiries } from "@/lib/inquiries.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin | Studio Thumbcrafter" },
      { name: "description", content: "Admin dashboard for Studio Thumbcrafter inquiries." },
      { property: "og:title", content: "Admin | Studio Thumbcrafter" },
      {
        property: "og:description",
        content: "Admin dashboard for Studio Thumbcrafter inquiries.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

type Inquiry = {
  id: string;
  name: string;
  email: string;
  details: string;
  requirements: string;
  created_at: string;
};

function AdminPage() {
  const ensure = useServerFn(ensureAdmin);
  const list = useServerFn(listInquiries);
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        await ensure();
        const data = await list();
        if (!cancelled) setInquiries(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load inquiries");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [ensure, list]);

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="flex items-center justify-between border-b border-ink/15 px-6 py-5">
        <h1 className="font-display text-3xl uppercase">Inquiries</h1>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        {error && (
          <p className="border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-500">{error}</p>
        )}
        {inquiries === null && !error && (
          <p className="font-mono text-xs uppercase text-ink/50">Loading...</p>
        )}
        {inquiries !== null && inquiries.length === 0 && (
          <p className="border border-ink/20 p-8 text-center font-mono text-xs uppercase text-ink/50">
            No inquiries yet.
          </p>
        )}
        <div className="space-y-4">
          {inquiries?.map((inquiry) => (
            <article key={inquiry.id} className="border border-ink/10 bg-chalk p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl uppercase">{inquiry.name}</h2>
                  <p className="mt-1 font-mono text-xs text-ink/60">{inquiry.email}</p>
                </div>
                <time className="font-mono text-[10px] uppercase text-ink/40">
                  {new Date(inquiry.created_at).toLocaleString()}
                </time>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-mono text-[10px] uppercase text-ink/50">Video Details</h3>
                  <p className="mt-1 text-sm">{inquiry.details}</p>
                </div>
                <div>
                  <h3 className="font-mono text-[10px] uppercase text-ink/50">Requirements</h3>
                  <p className="mt-1 text-sm">{inquiry.requirements}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
