"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { defaultSiteContent } from "@/data/defaultSiteContent";
import { siteContentService } from "@/services/api";
import { SiteContent } from "@/types/siteContent";
import {
  ArrowRight,
  CalendarRange,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const iconMap = {
  layers3: Layers3,
  users: Users,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  calendar: CalendarRange,
};

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
    <div className="min-h-screen">
      <Navbar brand={content.brand} navigation={content.navigation} />

      <main>
        <section className="section-shell mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="space-y-8">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-4 py-2 text-sm text-[color:var(--muted)]"
              style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)" }}
            >
              <Sparkles className="h-4 w-4 text-[color:var(--brand)]" />
              {content.brand.description}
            </div>

            <div className="space-y-5">
              <p className="font-[family:var(--font-display)] text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--accent)]">
                {content.hero.eyebrow}
              </p>
              <h1 className="max-w-4xl font-[family:var(--font-display)] text-5xl font-bold leading-[0.98] tracking-tight text-[color:var(--foreground)] sm:text-6xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
                {content.hero.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={content.hero.primary_cta_url}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--brand-deep)]"
                style={{ boxShadow: "0 14px 30px rgba(0, 0, 0, 0.14)" }}
              >
                {content.hero.primary_cta_label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={content.hero.secondary_cta_url}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface-strong)] px-6 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
              >
                {content.hero.secondary_cta_label}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {content.hero.stats.map((stat) => (
                <Metric key={`${stat.value}-${stat.label}`} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>

          <div className="glass-panel relative rounded-[2rem] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
                  {content.spotlight.label}
                </p>
                <h2 className="mt-2 font-[family:var(--font-display)] text-2xl font-bold">
                  {content.spotlight.title}
                </h2>
              </div>
              <div className="rounded-2xl bg-[color:var(--accent-soft)] p-3 text-[color:var(--accent)]">
                <CalendarRange className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-4">
              <InfoRow label="Trong tam" value={content.spotlight.focus} />
              <InfoRow label="Hinh thuc" value={content.spotlight.format} />
              <InfoRow label="Muc tieu" value={content.spotlight.goal} />
            </div>

            <div
              className="mt-8 rounded-[1.5rem] bg-[color:var(--foreground)] p-5 text-white"
              style={{ boxShadow: "0 18px 50px rgba(24, 34, 40, 0.18)" }}
            >
              <p className="text-sm uppercase tracking-[0.24em] text-white/60">
                Huong uu tien
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-white/88">
                {content.spotlight.priorities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--brand)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id={content.introduction.section_id} className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {content.introduction.cards.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Sparkles;

              return (
                <div
                  key={`${item.title}-${item.icon}`}
                  className="glass-panel rounded-[1.75rem] p-6 shadow-[0_20px_60px_rgba(24,34,40,0.08)]"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-[color:var(--accent-soft)] p-3 text-[color:var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-[family:var(--font-display)] text-2xl font-bold text-[color:var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section id={content.activities.section_id} className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
                {content.activities.label}
              </p>
              <h2 className="mt-4 font-[family:var(--font-display)] text-4xl font-bold tracking-tight">
                {content.activities.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-[color:var(--muted)]">
                {content.activities.description}
              </p>
            </div>

            <div className="grid gap-4">
              {content.activities.items.map((item) => (
                <ActivityCard
                  key={`${item.index}-${item.title}`}
                  index={item.index}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section id={content.culture.section_id} className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-[color:var(--foreground)] px-6 py-10 text-white sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/60">
              {content.culture.label}
            </p>
            <div className="mt-5 grid gap-6 lg:grid-cols-3">
              {content.culture.items.map((item) => (
                <CultureBlock key={item.title} title={item.title} description={item.description} />
              ))}
            </div>
          </div>
        </section>

        <section id={content.contact.section_id} className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-[2rem] px-6 py-10 sm:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
                  {content.contact.label}
                </p>
                <h2 className="mt-3 font-[family:var(--font-display)] text-4xl font-bold tracking-tight text-[color:var(--foreground)]">
                  {content.contact.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-[color:var(--muted)]">
                  {content.contact.description}
                </p>
              </div>

              <Link
                href={content.contact.cta_url}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#17544c]"
              >
                {content.contact.cta_label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer content={content.footer} />
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-panel rounded-[1.5rem] p-5">
      <p className="font-[family:var(--font-display)] text-3xl font-bold text-[color:var(--foreground)]">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{label}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-[color:var(--line)] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-6 text-[color:var(--foreground)]">
        {value}
      </p>
    </div>
  );
}

function ActivityCard({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-panel rounded-[1.75rem] p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--brand)]">
        {index}
      </p>
      <h3 className="mt-3 font-[family:var(--font-display)] text-2xl font-bold text-[color:var(--foreground)]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{description}</p>
    </div>
  );
}

function CultureBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
      <h3 className="font-[family:var(--font-display)] text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/72">{description}</p>
    </div>
  );
}
