"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { defaultSiteContent } from "@/data/defaultSiteContent";
import { siteContentService } from "@/services/api";
import { SiteContent } from "@/types/siteContent";
import { ArrowRight, Sparkles, Zap, Check, Command } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  useEffect(() => {
    siteContentService
      .getPublic()
      .then((res) => setContent(res.data))
      .catch(() => setContent(defaultSiteContent));
  }, []);

  useEffect(() => {
    document.title = content.brand.name;
  }, [content.brand.name]);

  return (
    <div className="bg-white text-foreground selection:bg-brand selection:text-white">
      <Navbar brand={content.brand} navigation={content.navigation} />

      <main>
        {/* Hero Section - Balanced & Premium */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 pt-32 pb-20">
          <div className="mx-auto max-w-6xl text-center space-y-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand border border-brand/20">
              <Sparkles className="h-3.5 w-3.5 fill-brand" />
              {content.brand.tagline}
            </div>
            
            <h1 className="font-display text-5xl font-black leading-[1.1] tracking-tighter text-foreground sm:text-7xl lg:text-8xl">
              {content.hero.title}
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {content.hero.description}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
              <Link
                href={content.hero.primary_cta_url}
                className="group flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 shadow-lg shadow-brand/20"
              >
                {content.hero.primary_cta_label}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={content.hero.secondary_cta_url}
                className="flex items-center justify-center rounded-full border border-line bg-white/50 px-8 py-4 text-base font-bold text-foreground backdrop-blur-md transition hover:bg-white"
              >
                {content.hero.secondary_cta_label}
              </Link>
            </div>
          </div>

          {/* Stats Inline - Clean & Balanced */}
          <div className="mx-auto mt-24 grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3 border-t border-line pt-12 px-6">
            {content.hero.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-display text-4xl font-black text-foreground">{stat.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Introduction - Bento Grid with Focus */}
        <section id={content.introduction.section_id} className="mx-auto max-w-7xl px-6 py-32 lg:py-48">
          <div className="grid gap-6 lg:grid-cols-12">
            {content.introduction.cards.map((item, idx) => (
              <div
                key={item.title}
                className={`group rounded-[2rem] border border-line bg-surface-strong/30 p-10 transition-all hover:bg-white hover:shadow-xl ${
                  idx === 0 ? "lg:col-span-8" : "lg:col-span-4"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background transition-transform group-hover:rotate-12">
                  <Zap className="h-6 w-6 fill-current" />
                </div>
                <h3 className="mt-8 font-display text-3xl font-black tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Spotlight - High Contrast, Clean Line-height */}
        <section className="bg-foreground py-32 text-white lg:py-48">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand">{content.spotlight.label}</p>
                  <h2 className="font-display text-5xl font-black leading-[1.1] tracking-tighter sm:text-6xl">
                    {content.spotlight.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-8 pt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Trọng tâm</p>
                    <p className="text-lg font-bold">{content.spotlight.focus}</p>
                  </div>
                  <div className="h-10 w-px bg-white/10 hidden sm:block" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Hình thức</p>
                    <p className="text-lg font-bold">{content.spotlight.format}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 lg:p-16 backdrop-blur-xl">
                <ul className="space-y-8">
                  {content.spotlight.priorities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-5">
                      <div className="mt-1.5 flex h-2 w-2 shrink-0 rounded-full bg-brand" />
                      <p className="text-lg font-medium text-white/80 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Activities - Balanced Steps */}
        <section id={content.activities.section_id} className="mx-auto max-w-7xl px-6 py-32 lg:py-48">
          <div className="mb-20 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-brand">{content.activities.label}</p>
            <h2 className="font-display text-4xl font-black tracking-tighter text-foreground sm:text-6xl leading-[1.1]">
              {content.activities.title}
            </h2>
          </div>
          
          <div className="grid gap-12 md:grid-cols-3">
            {content.activities.items.map((item) => (
              <div key={item.index} className="space-y-6">
                <div className="font-display text-6xl font-black text-line">
                  {item.index}
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-base leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Culture - Modern Card */}
        <section id={content.culture.section_id} className="mx-auto max-w-7xl px-6 pb-32">
          <div className="rounded-[3rem] bg-surface-strong border border-line px-10 py-20 lg:px-20">
            <div className="grid gap-16 lg:grid-cols-[1fr_2.5fr] items-start">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-brand">{content.culture.label}</p>
                <h2 className="font-display text-4xl font-black tracking-tighter text-foreground leading-[1.1]">
                  Văn hóa CLB
                </h2>
              </div>
              <div className="grid gap-10 sm:grid-cols-3">
                {content.culture.items.map((item) => (
                  <div key={item.title} className="space-y-4">
                    <h3 className="font-display text-xl font-bold text-foreground uppercase tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact - The Refined CTA */}
        <section id={content.contact.section_id} className="mx-auto max-w-5xl px-6 py-32 text-center">
          <div className="space-y-10">
            <h2 className="font-display text-5xl font-black leading-[1.1] tracking-tighter text-foreground sm:text-7xl">
              {content.contact.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted">
              {content.contact.description}
            </p>
            <div className="pt-6">
              <Link
                href={content.contact.cta_url}
                className="inline-flex items-center gap-3 rounded-full bg-brand px-10 py-5 text-lg font-bold text-white shadow-xl shadow-brand/20 transition-transform hover:-translate-y-1 hover:brightness-110"
              >
                {content.contact.cta_label}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer content={content.footer} />
    </div>
  );
}
