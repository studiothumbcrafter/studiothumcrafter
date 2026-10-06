import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowDownRight, Image, Layers3, Menu, Sparkles, X } from "lucide-react";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";

import { getEmailJSConfig } from "@/lib/contact.functions";
import { submitInquiry as saveInquiry } from "@/lib/inquiries.functions";

import thumbnail1Asset from "@/assets/portfolio-thumbnail-1.png.asset.json";
import thumbnail2Asset from "@/assets/portfolio-thumbnail-2.png.asset.json";
import thumbnail3Asset from "@/assets/portfolio-thumbnail-3.png.asset.json";
import thumbnail4Asset from "@/assets/portfolio-thumbnail-4.png.asset.json";
import thumbnail5Asset from "@/assets/portfolio-thumbnail-5.png.asset.json";
import thumbnail6Asset from "@/assets/portfolio-thumbnail-6.png.asset.json";
import fastFoodAsset from "@/assets/portfolio-fast-food-24-hours.jpg.asset.json";
import hardcoreAsset from "@/assets/portfolio-100-days-hardcore.jpg.asset.json";
import trappedAsset from "@/assets/portfolio-we-got-trapped.jpg.asset.json";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio Thumbcrafter | YouTube Thumbnail Designer" },
      {
        name: "description",
        content:
          "Bold gaming and YouTube thumbnail concepts by Studio Thumbcrafter, a developing designer focused on scroll-stopping visuals.",
      },
      { property: "og:title", content: "Studio Thumbcrafter | YouTube Thumbnail Designer" },
      {
        property: "og:description",
        content: "Bold, high-impact thumbnail design for gaming and YouTube creators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioPortfolio,
});

type Category = "All" | "Gaming" | "YouTube" | "Other";

const projects = [
  { title: "Rank Push Livestream", category: "Gaming" as const, ref: "WORK_001", image: thumbnail3Asset.url, alt: "Gaming livestream thumbnail with a fantasy game character and bold rank push title" },
  { title: "Top 10 Conqueror", category: "Gaming" as const, ref: "WORK_002", image: thumbnail4Asset.url, alt: "Top 10 Conqueror gaming thumbnail with an illustrated character" },
  { title: "Minecraft Team", category: "Gaming" as const, ref: "WORK_003", image: thumbnail5Asset.url, alt: "Minecraft gaming thumbnail featuring a team of colorful block characters" },
  { title: "Minecraft Adventure", category: "Gaming" as const, ref: "WORK_004", image: thumbnail6Asset.url, alt: "Minecraft adventure thumbnail featuring a group of block characters on a floating island" },
  { title: "Which One Is Better?", category: "YouTube" as const, ref: "WORK_005", image: thumbnail1Asset.url, alt: "YouTube comparison thumbnail asking which AI option is better" },
  { title: "The Dark Truth", category: "YouTube" as const, ref: "WORK_006", image: thumbnail2Asset.url, alt: "YouTube commentary thumbnail titled The Dark Truth" },
  { title: "Fast Food for 24 Hours", category: "YouTube" as const, ref: "WORK_007", image: fastFoodAsset.url, alt: "Food challenge thumbnail titled Fast Food for 24 Hours" },
  { title: "100 Days Hardcore", category: "Gaming" as const, ref: "WORK_008", image: hardcoreAsset.url, alt: "Minecraft before-and-after thumbnail showing day one and day one hundred" },
  { title: "We Got Trapped", category: "YouTube" as const, ref: "WORK_009", image: trappedAsset.url, alt: "Horror thumbnail titled We Got Trapped outside Longfellow School" },
];

const services = [
  { number: "01", title: "YouTube Thumbnail Design", text: "Custom visuals shaped around your topic, audience, and video idea.", icon: Image },
  { number: "02", title: "Gaming Thumbnail Design", text: "High-energy compositions with dramatic action, contrast, and readable focus.", icon: Sparkles },
  { number: "03", title: "Custom Thumbnail Concepts", text: "Original directions to explore the strongest visual hook before final artwork.", icon: Layers3 },
];

const skills = ["YouTube thumbnail design", "Gaming thumbnail design", "Visual composition", "Attention-grabbing layouts", "Bold typography", "Creative image editing"];

function StudioPortfolio() {
  const [filter, setFilter] = useState<Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const loadConfig = useServerFn(getEmailJSConfig);
  const visibleProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const details = String(data.get("details") ?? "");
    const requirements = String(data.get("requirements") ?? "");

    setFormStatus("sending");
    try {
      const [{ default: emailjs }, config] = await Promise.all([
        import("@emailjs/browser"),
        loadConfig(),
      ]);
      await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          name,
          email,
          details,
          requirements,
          message: `Name: ${name}\nEmail: ${email}\nVideo details: ${details}\nRequirements: ${requirements}`,
        },
        { publicKey: config.publicKey },
      );
      setFormStatus("success");
      form.reset();
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-50 border-b border-ink/15 bg-paper/95 backdrop-blur-md">
        <nav className="mx-auto grid h-16 max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 sm:px-6 lg:px-10" aria-label="Main navigation">
          <a href="#home" className="min-w-0 truncate font-display text-2xl uppercase">Studio Thumbcrafter</a>
          <div className="hidden items-center gap-7 text-xs font-bold uppercase md:flex">
            {(["Home", "About", "Portfolio", "Services", "Contact"] as const).map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-signal">{item}</a>
            ))}
            <Button asChild className="min-h-9 px-5 py-2 font-body text-xs"><a href="#contact">Work With Me</a></Button>
          </div>
          <Button variant="icon" className="md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </nav>
        {menuOpen && (
          <div className="border-t border-ink/15 bg-paper px-4 py-5 md:hidden">
            {(["Home", "About", "Portfolio", "Services", "Contact"] as const).map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block border-b border-ink/10 py-3 font-display text-2xl uppercase">{item}</a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section id="home" className="relative flex min-h-[calc(100svh-4rem)] scroll-mt-16 items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-10">
          <span className="absolute left-6 top-7 font-mono text-[10px] text-ink/40">[ STC / VISUAL LAB / 2026 ]</span>
          <span className="absolute bottom-7 right-6 font-mono text-[10px] text-ink/40">FRAME_001</span>
          <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 lg:grid-cols-12">
            <div className="animate-rise-in lg:col-span-7">
              <p className="mb-5 font-mono text-xs font-semibold uppercase">YouTube Thumbnail Designer</p>
              <h1 className="max-w-[880px] font-display text-7xl leading-[0.86] uppercase sm:text-8xl lg:text-9xl xl:text-[9rem]">
                Thumbnails that make people <span className="text-signal">stop scrolling.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/70 sm:text-xl">
                I create bold, high-impact YouTube thumbnails designed to grab attention and make videos stand out.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild><a href="#portfolio">View My Work <ArrowDownRight size={19} /></a></Button>
                <Button variant="outline" asChild><a href="#contact">Get a Thumbnail</a></Button>
              </div>
            </div>

            <div className="animate-clip-in relative h-[470px] sm:h-[560px] lg:col-span-5">
              {/* Background watermark */}
              <div className="pointer-events-none absolute -bottom-8 -right-6 select-none font-display text-[9rem] leading-none text-ink/[0.04] sm:text-[11rem]">
                CLICK
              </div>

              {/* Top-left category badge */}
              <div className="absolute -left-2 top-0 z-20 rotate-[-5deg] border-4 border-ink bg-signal px-5 py-4 shadow-[8px_8px_0px_0px_#090909] sm:left-0 sm:px-7 sm:py-5">
                <p className="font-display text-4xl leading-none text-ink sm:text-5xl">YOUTUBE THUMBNAIL</p>
                <p className="mt-2 font-mono text-[10px] font-bold uppercase tracking-wider text-ink/80 sm:text-xs">Scroll-stopping thumbnails</p>
              </div>

              {/* Decorative play button */}
              <div className="absolute right-0 top-4 z-0 flex size-24 -rotate-12 items-center justify-center rounded-full border-4 border-ink/10 text-ink/10 sm:size-32">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="ml-1 sm:size-12" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>


              {/* Cross accent */}
              <div className="absolute left-[30%] top-[32%] z-0 opacity-25">
                <div className="h-1 w-10 rotate-45 bg-signal" />
                <div className="h-1 w-10 -translate-y-1 -rotate-45 bg-signal" />
              </div>

              <div className="absolute bottom-10 left-0 z-10 w-[78%] -rotate-6 border-8 border-chalk bg-chalk shadow-2xl">
                <img src={thumbnail6Asset.url} alt="Minecraft adventure thumbnail from the Studio Thumbcrafter portfolio" width={1280} height={720} className="aspect-video w-full object-cover" />
              </div>
              <div className="absolute bottom-28 right-0 w-[67%] rotate-6 border-8 border-chalk bg-chalk shadow-xl">
                <img src={thumbnail3Asset.url} alt="Rank Push livestream thumbnail from the Studio Thumbcrafter portfolio" width={1280} height={720} className="aspect-video w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-16 bg-ink px-4 py-24 text-paper sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-[1280px] gap-16 md:grid-cols-2 md:gap-20">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase text-signal">About / 01</p>
              <h2 className="font-display text-6xl uppercase sm:text-7xl">The story so far</h2>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/70">
                Studio Thumbcrafter is a developing design practice built through 4–5 months of focused learning and hands-on experimentation. Alongside schooling, I’m learning how composition, contrast, and bold type can turn a video idea into an eye-catching visual.
              </p>
            </div>
            <div className="relative border-l-4 border-signal pl-8 sm:pl-12">
              <span className="absolute -left-3 -top-12 font-display text-8xl text-signal/20">01</span>
              <h3 className="font-display text-4xl uppercase">Growing by making</h3>
              <p className="mt-3 max-w-lg leading-relaxed text-paper/60">No inflated claims—just a focused designer building stronger work with every concept.</p>
              <div className="mt-10 flex flex-wrap gap-2">
                {skills.map((skill) => <span key={skill} className="border border-paper/25 px-3 py-2 font-mono text-[10px] uppercase">{skill}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="scroll-mt-16 px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase">Selected work / 02</p>
                <h2 className="font-display text-6xl uppercase sm:text-8xl">Portfolio</h2>
              </div>
              <span className="hidden max-w-48 text-right font-mono text-[10px] uppercase text-ink/50 sm:block">Gaming and creator thumbnails designed for visual impact</span>
            </div>
            <div className="mb-8 flex flex-wrap gap-1 border-y border-ink/15 py-3" role="group" aria-label="Filter portfolio">
              {(["All", "Gaming", "YouTube", "Other"] as Category[]).map((category) => (
                <Button key={category} variant="filter" className={filter === category ? "border-ink bg-ink text-paper" : ""} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}</Button>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <article key={project.ref} className="group relative aspect-video overflow-hidden bg-ink animate-scale-in">
                  <img src={project.image} alt={project.alt} width={1280} height={720} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute right-3 top-3 bg-chalk px-2 py-1 font-mono text-[9px] text-ink">{project.ref}</span>
                  <div className="absolute inset-0 flex translate-y-full flex-col justify-end bg-signal/95 p-6 text-ink transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
                    <p className="font-mono text-[10px] uppercase">Category: {project.category}</p>
                    <h3 className="mt-1 font-display text-4xl uppercase">{project.title}</h3>
                  </div>
                </article>
              ))}
              {visibleProjects.length === 0 && <p className="col-span-full border border-ink/20 p-10 text-center font-mono text-xs uppercase text-ink/60">New concept samples will be added here.</p>}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-16 border-y border-ink/15 bg-chalk px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1280px]">
            <p className="font-mono text-[10px] uppercase">Capabilities / 03</p>
            <h2 className="mt-2 font-display text-6xl uppercase sm:text-8xl">What I design</h2>
            <div className="mt-12 grid gap-px bg-ink/15 md:grid-cols-3">
              {services.map(({ number, title, text, icon: Icon }) => (
                <article key={number} className="group bg-chalk p-7 sm:p-9">
                  <div className="flex items-start justify-between"><span className="font-mono text-xs">{number}</span><Icon className="text-signal transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" size={32} strokeWidth={1.5} /></div>
                  <h3 className="mt-14 font-display text-4xl uppercase leading-none">{title}</h3>
                  <p className="mt-5 leading-relaxed text-ink/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-16 bg-signal px-4 py-24 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="font-mono text-[10px] uppercase">New project / 04</p>
              <h2 className="mt-3 font-display text-7xl uppercase leading-[0.9] sm:text-8xl">Let’s craft your next click.</h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed">Share the video idea, audience, and visual direction. I’ll reply by email.</p>
              <a href="mailto:studiothumbcrafter@gmail.com" className="mt-10 inline-block break-all border-b-2 border-ink pb-1 font-display text-2xl sm:text-3xl">studiothumbcrafter@gmail.com</a>
            </div>
            <form onSubmit={submitInquiry} className="relative bg-ink p-7 text-paper shadow-2xl sm:p-10">
              <div className="absolute right-0 top-0 size-16 bg-signal" aria-hidden="true" />
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Name"><input required name="name" autoComplete="name" placeholder="YOUR NAME" className="field" /></Field>
                <Field label="Email"><input required name="email" type="email" autoComplete="email" placeholder="YOU@EMAIL.COM" className="field" /></Field>
                <div className="sm:col-span-2"><Field label="YouTube / video details"><input required name="details" placeholder="VIDEO TOPIC OR CHANNEL LINK" className="field" /></Field></div>
                <div className="sm:col-span-2"><Field label="Project requirements"><textarea required name="requirements" rows={4} placeholder="WHAT SHOULD THE THUMBNAIL COMMUNICATE?" className="field resize-none" /></Field></div>
                <Button type="submit" variant="signal" disabled={formStatus === "sending"} className="sm:col-span-2">
                  {formStatus === "sending" ? "Sending..." : "Send Inquiry"} <ArrowDownRight size={20} />
                </Button>
                {formStatus === "success" && (
                  <p className="sm:col-span-2 border border-signal/50 bg-signal/10 px-4 py-3 font-mono text-xs text-signal">
                    Inquiry sent. I’ll reply to your email soon.
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="sm:col-span-2 border border-red-500/50 bg-red-500/10 px-4 py-3 font-mono text-xs text-red-400">
                    Couldn’t send. Make sure the EmailJS keys are set, or email me directly at studiothumbcrafter@gmail.com.
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-ink px-4 pb-10 pt-20 text-paper sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="overflow-hidden font-display text-7xl uppercase leading-none text-paper/10 sm:text-9xl lg:text-[12rem]">Thumbcrafter</div>
          <div className="mt-10 grid gap-6 border-t border-paper/15 pt-7 text-xs sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div><p className="font-display text-2xl uppercase">Studio Thumbcrafter</p><p className="mt-1 text-paper/50">YouTube Thumbnail Designer</p><a className="mt-2 block text-signal" href="mailto:studiothumbcrafter@gmail.com">studiothumbcrafter@gmail.com</a></div>
            <div className="flex flex-wrap gap-5 font-mono text-[10px] uppercase sm:justify-end">{["Home", "About", "Portfolio", "Services", "Contact"].map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-signal">{item}</a>)}</div>
            <p className="text-paper/35 sm:col-span-2 sm:text-right">© 2026 Studio Thumbcrafter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase text-paper/50">{label}</span>{children}</label>;
}