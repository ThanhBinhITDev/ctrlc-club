"use client";

import { themePresets, buildThemeFromCore } from "@/data/themePresets";
import { SiteContent } from "@/types/siteContent";

export default function AppearanceEditor({
  content,
  onThemeChange,
}: {
  content: SiteContent;
  onThemeChange: (theme: SiteContent["theme"]) => void;
}) {
  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Theme</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Chọn một màu giao diện có sẵn, xem preview, sau đó nếu cần thì chỉ tinh chỉnh 2
          màu chính. Các thông số sau hơn đã được đưa xuống cuối trang.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {themePresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onThemeChange(preset.theme)}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-400"
            >
              <div className="flex gap-2">
                <ThemeSwatch color={preset.theme.background} />
                <ThemeSwatch color={preset.theme.foreground} />
                <ThemeSwatch color={preset.theme.brand} />
                <ThemeSwatch color={preset.theme.accent} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{preset.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{preset.description}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Tinh Chỉnh Nhanh</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ColorInput
            label="Màu nút chính"
            value={content.theme.brand}
            onChange={(value) => onThemeChange(buildThemeFromCore(content.theme, { brand: value }))}
          />
          <ColorInput
            label="Màu nhân phụ"
            value={content.theme.accent}
            onChange={(value) => onThemeChange(buildThemeFromCore(content.theme, { accent: value }))}
          />
        </div>

        <div className="mt-6">
          <ThemePreview theme={content.theme} brand={content.brand} />
        </div>
      </section>

        <details className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
        <summary className="cursor-pointer text-sm font-semibold text-slate-700">
          Mở tùy chỉnh nâng cao
        </summary>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Dành cho lúc cần can thiệp sâu vào nền, viền và độ tương phản.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ColorInput label="Background" value={content.theme.background} onChange={(value) => onThemeChange({ ...content.theme, background: value })} />
          <ColorInput label="Foreground" value={content.theme.foreground} onChange={(value) => onThemeChange({ ...content.theme, foreground: value })} />
          <ColorInput label="Muted" value={content.theme.muted} onChange={(value) => onThemeChange({ ...content.theme, muted: value })} />
          <ColorInput label="Surface Strong" value={content.theme.surface_strong} onChange={(value) => onThemeChange({ ...content.theme, surface_strong: value })} />
          <ColorInput label="Brand Deep" value={content.theme.brand_deep} onChange={(value) => onThemeChange({ ...content.theme, brand_deep: value })} />
          <ColorInput label="Accent Soft" value={content.theme.accent_soft} onChange={(value) => onThemeChange({ ...content.theme, accent_soft: value })} />
          <TextInput label="Surface (rgba/hex)" value={content.theme.surface} onChange={(value) => onThemeChange({ ...content.theme, surface: value })} />
          <TextInput label="Line (rgba/hex)" value={content.theme.line} onChange={(value) => onThemeChange({ ...content.theme, line: value })} />
        </div>
      </details>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
      />
    </label>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3">
        <input
          type="color"
          value={normalizeColor(value)}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-12 rounded-lg border-0 bg-transparent p-0"
        />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="flex-1 text-sm text-slate-900 outline-none"
        />
      </div>
    </label>
  );
}

function ThemeSwatch({ color }: { color: string }) {
  return <div className="h-9 w-9 rounded-full border border-slate-200" style={{ background: color }} />;
}

function ThemePreview({
  theme,
  brand,
}: {
  theme: SiteContent["theme"];
  brand: SiteContent["brand"];
}) {
  return (
    <div
      className="overflow-hidden rounded-[1.75rem] border p-5"
      style={{
        background: `linear-gradient(180deg, ${theme.background}, ${theme.surface_strong})`,
        borderColor: theme.line,
        color: theme.foreground,
      }}
    >
      <div className="flex items-center justify-between rounded-2xl border px-4 py-3" style={{ borderColor: theme.line, background: theme.surface }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-black text-white"
            style={{ background: theme.foreground }}
          >
            {brand.mark}
          </div>
          <div>
            <p className="font-semibold">{brand.name}</p>
            <p className="text-xs uppercase tracking-[0.24em]" style={{ color: theme.muted }}>
              {brand.tagline}
            </p>
          </div>
        </div>
        <button
          className="rounded-full px-4 py-2 text-sm font-semibold text-white"
          style={{ background: theme.brand }}
        >
          CTA
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border p-5" style={{ borderColor: theme.line, background: theme.surface }}>
          <p className="text-sm font-semibold uppercase tracking-[0.28em]" style={{ color: theme.accent }}>
            Preview
          </p>
          <h3 className="mt-3 text-3xl font-bold font-display">
            Giao diện sạch, cân đối và dễ điều chỉnh theo thương hiệu.
          </h3>
          <p className="mt-3 text-sm leading-7" style={{ color: theme.muted }}>
            Ở preview này bạn có thể nhìn nhanh tương quan giữa nền, text, border và hai màu chủ đạo.
          </p>
          <div className="mt-5 flex gap-3">
            <span className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: theme.brand }}>
              Brand
            </span>
            <span className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: theme.accent }}>
              Accent
            </span>
          </div>
        </div>

        <div className="rounded-[1.5rem] p-5 text-white" style={{ background: theme.foreground }}>
          <p className="text-sm uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.64)" }}>
            Highlight
          </p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl px-4 py-3" style={{ background: theme.accent_soft }} />
            <div className="rounded-2xl px-4 py-3 text-sm" style={{ background: "rgba(255,255,255,0.08)" }}>
              Surface contrast
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function normalizeColor(value: string) {
  if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
    return value;
  }

  return "#999999";
}
