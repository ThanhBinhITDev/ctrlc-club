"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LayoutDashboard, LogOut, Command } from "lucide-react";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default function Navbar({ brand, navigation }: any) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex justify-center p-4">
      <div className="flex h-14 w-full max-w-7xl items-center justify-between rounded-pill border border-line bg-surface/60 px-6 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background transition-transform group-hover:rotate-12">
              <Command className="h-4 w-4" />
            </div>
            <span className="font-display text-base font-black uppercase tracking-tighter text-foreground">
              {brand?.mark || "C/C"}
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navigation?.map((item: any) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-widest text-muted transition hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

          <div className="flex items-center gap-4">
           <ThemeSwitcher compact />
           <div className="h-4 w-px bg-line" />
          
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="flex h-8 items-center gap-2 rounded-pill bg-foreground px-4 text-xs font-bold text-background transition hover:bg-brand"
              >
                <LayoutDashboard className="h-3 w-3" />
                DASHBOARD
              </Link>
              <button
                onClick={() => logout()}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition hover:text-danger hover:border-danger"
              >
                <LogOut className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex h-9 items-center gap-2 rounded-pill bg-foreground px-5 text-xs font-bold text-background transition hover:bg-brand"
            >
              <LogIn className="h-3.5 w-3.5" />
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
