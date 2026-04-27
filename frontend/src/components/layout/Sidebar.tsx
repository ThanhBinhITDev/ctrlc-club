"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, ShieldCheck, LayoutDashboard, Settings, LogOut, Palette } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Quản lý User', href: '/admin/users', icon: Users },
    { name: 'Thành viên CLB', href: '/admin/club-members', icon: ShieldCheck },
    { name: 'Nội dung website', href: '/admin/settings', icon: Settings },
    { name: 'Giao diện', href: '/admin/appearance', icon: Palette },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col border-r border-[color:var(--line)] bg-[color:var(--surface-strong)]/95 backdrop-blur-xl">
      <div className="border-b border-[color:var(--line)] px-6 py-5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--foreground)] text-sm font-black text-white shadow-sm">
            C/C
          </div>
          <div>
            <p className="font-[family:var(--font-display)] text-lg font-bold tracking-tight text-[color:var(--foreground)]">
              CTRL/C CLUB
            </p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Admin Workspace
            </p>
          </div>
        </Link>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-2xl border border-[color:var(--line)] bg-white/70 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
            Dang nhap voi
          </p>
          <p className="mt-2 text-sm font-semibold text-[color:var(--foreground)]">
            {user?.club_member?.position?.name || 'Thành viên khách'}
          </p>
        </div>
        <div className="mt-3">
          <ThemeSwitcher compact />
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        {menuItems.map((item) => {
          const isActive =
            item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                isActive 
                  ? "bg-[color:var(--foreground)] text-white shadow-[0_12px_30px_rgba(24,34,40,0.14)]" 
                  : "text-[color:var(--muted)] hover:bg-white hover:text-[color:var(--foreground)]"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[color:var(--brand)]'}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t border-[color:var(--line)] p-4">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[color:var(--line)] bg-white/70 p-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--brand)] font-bold text-white">
              {user?.name?.charAt(0)}
            </div>
            <div className="min-w-0 text-sm">
              <p className="truncate font-semibold text-[color:var(--foreground)]">{user?.name}</p>
              <p className="truncate text-xs text-[color:var(--muted)]">
                {user?.club_member?.position?.name || 'Thành viên khách'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => logout()}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--line)] bg-white text-[color:var(--muted)] transition hover:border-red-300 hover:text-red-600"
            title="Đăng xuất"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
