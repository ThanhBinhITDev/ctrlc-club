"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LayoutDashboard, Palette, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

const titleMap: Record<string, { title: string; description: string }> = {
  "/admin": {
    title: "Tong quan",
    description: "Quan sat nhanh tinh hinh he thong va hoat dong gan day.",
  },
  "/admin/users": {
    title: "Quan ly nguoi dung",
    description: "Theo doi danh sach tai khoan va xu ly phan quyen co ban.",
  },
  "/admin/club-members": {
    title: "Thanh vien CLB",
    description: "Quan ly nhan su noi bo, chuc vu va tinh trang hoat dong.",
  },
  "/admin/settings": {
    title: "Noi dung website",
    description: "Cap nhat hero, section, CTA, footer va cau truc noi dung trang.",
  },
  "/admin/appearance": {
    title: "Giao dien website",
    description: "Thu theme, doi preset va dieu chinh trai nghiem thi giac.",
  },
};

export default function AdminTopbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const current =
    titleMap[pathname] ??
    (pathname.startsWith("/admin/appearance")
      ? titleMap["/admin/appearance"]
      : pathname.startsWith("/admin/settings")
        ? titleMap["/admin/settings"]
        : titleMap["/admin"]);

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line)] bg-[color:var(--surface-strong)]/88 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-6 px-6 py-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
            <Link href="/admin" className="hover:text-[color:var(--brand)]">
              Admin
            </Link>
            <span>/</span>
            <span>{current.title}</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[color:var(--foreground)]">
            {current.title}
          </h1>
          <p className="mt-1 text-sm text-[color:var(--muted)]">{current.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/80 px-3 py-2 text-xs font-semibold text-[color:var(--muted)] xl:inline-flex">
            <LayoutDashboard className="h-3.5 w-3.5 text-[color:var(--brand)]" />
            {user?.club_member?.position?.name || "Thanh vien khach"}
          </div>
          <ThemeSwitcher />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/85 text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
            title="Thong bao"
          >
            <Bell className="h-4.5 w-4.5" />
          </button>
          <div className="hidden items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/85 px-3 py-2 md:inline-flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--brand)] text-xs font-bold text-white">
              {user?.name?.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[color:var(--foreground)]">{user?.name}</p>
              <p className="text-xs text-[color:var(--muted)]">Workspace admin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-6 pb-4">
        <QuickLink href="/admin" label="Tong quan" icon={LayoutDashboard} pathname={pathname} />
        <QuickLink href="/admin/settings" label="Noi dung" icon={Settings} pathname={pathname} />
        <QuickLink href="/admin/appearance" label="Theme" icon={Palette} pathname={pathname} />
      </div>
    </header>
  );
}

function QuickLink({
  href,
  label,
  icon: Icon,
  pathname,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  pathname: string;
}) {
  const isActive = href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
        isActive
          ? "border-[color:var(--brand)] bg-white text-[color:var(--foreground)]"
          : "border-[color:var(--line)] bg-white/70 text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
      }`}
    >
      <Icon className={`h-3.5 w-3.5 ${isActive ? "text-[color:var(--brand)]" : ""}`} />
      {label}
    </Link>
  );
}
