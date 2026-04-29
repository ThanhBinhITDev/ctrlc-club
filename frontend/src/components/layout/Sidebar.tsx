"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, ShieldCheck, LayoutDashboard, Settings, LogOut, Palette, Command } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ThemeSwitcher from '@/components/theme/ThemeSwitcher';

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Quản lý User', href: '/admin/users', icon: Users },
  { name: 'Thành viên CLB', href: '/admin/club-members', icon: ShieldCheck },
  { name: 'Nội dung website', href: '/admin/settings', icon: Settings },
  { name: 'Giao diện', href: '/admin/appearance', icon: Palette },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-line bg-white">
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-line">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-foreground text-background transition-transform group-hover:rotate-12">
            <Command className="h-4 w-4" />
          </div>
          <span className="font-display text-sm font-black tracking-tighter text-foreground uppercase">
            CTRL/C ADMIN
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4 custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                isActive 
                  ? "bg-brand/10 text-brand" 
                  : "text-muted hover:bg-surface-strong hover:text-foreground"
              }`}
            >
               <item.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-brand' : 'text-muted group-hover:text-brand'}`} />
               <span className="truncate flex-1 min-w-0 uppercase tracking-wider">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Footer Profile */}
      <div className="border-t border-line p-4">
        <div className="flex items-center gap-3 p-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand text-white text-[10px] font-black">
            {user?.name?.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[10px] font-black text-foreground uppercase">{user?.name}</p>
            <p className="truncate text-[9px] font-bold text-muted uppercase tracking-tighter">
              {user?.club_member?.position?.name || 'Administrator'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <ThemeSwitcher compact />
          <button 
            onClick={() => logout()}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded border border-line bg-white text-muted transition hover:text-danger hover:border-danger"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
