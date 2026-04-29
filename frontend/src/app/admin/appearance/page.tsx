"use client";

import { useEffect, useState } from "react";
import AppearanceEditor from "@/components/admin/AppearanceEditor";
import { useSiteTheme } from "@/context/SiteThemeContext";
import { defaultSiteContent } from "@/data/defaultSiteContent";
import { siteContentService } from "@/services/api";
import { SiteContent } from "@/types/siteContent";

export default function AppearancePage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { updateSiteTheme } = useSiteTheme();

  useEffect(() => {
    siteContentService
      .getAdmin()
      .then((res) => setContent(res.data))
      .catch(() => setError("Không tải được cấu hình giao diện website."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await siteContentService.update(content);
      setContent(res.data);
      updateSiteTheme(res.data.theme);
      setMessage("Đã cập nhật giao diện website thành công.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể lưu cấu hình giao diện.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
     return <div className="p-8 text-slate-600">Đang tải cấu hình giao diện...</div>;
  }

  return (
    <div className="p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
              Appearance
            </p>
             <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
               Điều chỉnh giao diện website
             </h1>
             <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
               Đây là trang riêng dành cho màu sắc và cảm giác thị giác. Nội dung website
               sẽ được giữ ở trang cài đặt để thao tác dễ hơn.
             </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400"
          >
            {saving ? "Dang luu..." : "Luu giao dien"}
          </button>
        </div>

        {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{message}</div>}
        {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}

        <AppearanceEditor
          content={content}
          onThemeChange={(theme) => setContent((prev) => ({ ...prev, theme }))}
        />
      </div>
    </div>
  );
}
