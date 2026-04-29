"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const titleMap: Record<string, string> = {
  "/admin": "Tổng quan",
  "/admin/users": "Quản lý người dùng",
  "/admin/club-members": "Thành viên CLB",
  "/admin/settings": "Nội dung website",
  "/admin/appearance": "Giao diện website",
};

export default function AdminTopbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const title = titleMap[pathname] || "Admin Workspace";

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-line bg-white px-6 lg:px-10">
      <div className="flex items-center gap-6 min-w-0">
        <h1 className="font-display text-sm font-black text-foreground uppercase tracking-widest truncate">
          {title}
        </h1>
        
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="h-8 w-48 rounded border border-line bg-surface-strong pl-9 pr-4 text-[10px] font-bold uppercase tracking-tight focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative flex h-8 w-8 items-center justify-center rounded border border-line bg-white text-muted transition hover:text-foreground"
        >
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-2 top-2 h-1 w-1 rounded-full bg-danger" />
        </button>

        <div className="h-4 w-px bg-line" />

        <div className="flex items-center gap-2">
          <p className="hidden md:block text-[10px] font-black text-foreground uppercase leading-none">{user?.name}</p>
          <div className="flex h-8 w-8 items-center justify-center rounded border border-brand/20 bg-brand/5 text-brand font-black text-[10px]">
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
}
