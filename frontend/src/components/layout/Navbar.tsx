"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { defaultSiteContent } from "@/data/defaultSiteContent";
import { SiteContent } from "@/types/siteContent";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

interface NavbarProps {
  brand?: SiteContent["brand"];
  navigation?: SiteContent["navigation"];
}

export default function Navbar({
  brand = defaultSiteContent.brand,
  navigation = defaultSiteContent.navigation,
}: NavbarProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[rgba(251,247,240,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--foreground)] text-sm font-black text-white">
              {brand.mark}
            </div>
            <div>
              <span className="block font-[family:var(--font-display)] text-lg font-bold tracking-tight text-[color:var(--foreground)]">
                {brand.name}
              </span>
              <span className="block text-[11px] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                {brand.tagline}
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <NavLink key={`${item.label}-${item.href}`} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher compact />
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:-translate-y-0.5 hover:border-[color:var(--brand)]"
              >
                <LayoutDashboard className="h-4 w-4" />
                Quan tri
              </Link>
              <div className="hidden rounded-full border border-[color:var(--line)] bg-white px-3 py-2 text-sm text-[color:var(--muted)] sm:block">
                {user.name}
              </div>
              <button
                onClick={() => logout()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-white text-[color:var(--muted)] transition hover:border-red-300 hover:text-red-600"
                title="Dang xuat"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--brand-deep)]"
            >
              <LogIn className="h-4 w-4" />
              Dang nhap
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-[color:var(--muted)] transition hover:text-[color:var(--brand)]"
    >
      {children}
    </Link>
  );
}
