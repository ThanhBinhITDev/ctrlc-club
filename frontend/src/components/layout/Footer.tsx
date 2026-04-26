import Link from "next/link";
import { SiteContent } from "@/types/siteContent";

export default function Footer({ content }: { content: SiteContent["footer"] }) {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[rgba(255,255,255,0.58)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <h2 className="font-[family:var(--font-display)] text-2xl font-bold text-[color:var(--foreground)]">
            {content.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
            {content.description}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Lien he
            </p>
            <p className="mt-3 text-sm text-[color:var(--foreground)]">{content.email}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">{content.address}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Dieu huong
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {content.links.map((link) => (
                <Link key={`${link.label}-${link.href}`} href={link.href} className="text-sm text-[color:var(--foreground)] transition hover:text-[color:var(--brand)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--line)] px-4 py-4 text-center text-xs text-[color:var(--muted)]">
        {content.copyright}
      </div>
    </footer>
  );
}
