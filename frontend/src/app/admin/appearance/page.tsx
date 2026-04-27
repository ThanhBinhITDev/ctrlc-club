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
      .catch(() => setError("Khong tai duoc cau hinh giao dien website."))
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
      setMessage("Da cap nhat giao dien website thanh cong.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Khong the luu cau hinh giao dien.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-600">Dang tai cau hinh giao dien...</div>;
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
              Dieu chinh giao dien website
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Day la trang rieng danh cho mau sac va cam giac thi giac. Noi dung website
              se duoc giu o trang cai dat de thao tac de hon.
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
