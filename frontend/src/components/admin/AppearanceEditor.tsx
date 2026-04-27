"use client";

import { SiteContent } from "@/types/siteContent";

const themePresets = [
  {
    id: "sand",
    name: "Clean Sand",
    description: "Sang, sach, am va de nhin cho website CLB.",
    theme: {
      background: "#f4efe6",
      foreground: "#182228",
      muted: "#5e6a70",
      surface: "rgba(255, 255, 255, 0.78)",
      surface_strong: "#fffdf8",
      line: "rgba(24, 34, 40, 0.12)",
      brand: "#c85a2e",
      brand_deep: "#8f3517",
      accent: "#256b60",
      accent_soft: "#dceeea",
    },
  },
  {
    id: "ocean",
    name: "Ocean Tech",
    description: "Tre trung, hien dai, hop voi nhom ky thuat va workshop.",
    theme: {
      background: "#edf6f7",
      foreground: "#0f2230",
      muted: "#56707b",
      surface: "rgba(255, 255, 255, 0.82)",
      surface_strong: "#ffffff",
      line: "rgba(15, 34, 48, 0.12)",
      brand: "#1e7bd7",
      brand_deep: "#1657a0",
      accent: "#0f8b73",
      accent_soft: "#d8f3ec",
    },
  },
  {
    id: "ember",
    name: "Editorial Ember",
    description: "Trang nha, co diem nhan manh, hop cho trang gioi thieu.",
    theme: {
      background: "#f7f1ea",
      foreground: "#231815",
      muted: "#6a5d58",
      surface: "rgba(255, 255, 255, 0.8)",
      surface_strong: "#fffaf5",
      line: "rgba(35, 24, 21, 0.12)",
      brand: "#b84d2c",
      brand_deep: "#83331b",
      accent: "#7a6a2b",
      accent_soft: "#efe5bf",
    },
  },
  {
    id: "forest",
    name: "Forest Lab",
    description: "Xanh sach, de tin, hop trang CLB co dinh huong hoc tap ben vung.",
    theme: {
      background: "#eef4ef",
      foreground: "#18251e",
      muted: "#5c6f62",
      surface: "rgba(255, 255, 255, 0.84)",
      surface_strong: "#fbfdfb",
      line: "rgba(24, 37, 30, 0.12)",
      brand: "#2f7d57",
      brand_deep: "#1f573c",
      accent: "#8f6a2d",
      accent_soft: "#f0e5cf",
    },
  },
  {
    id: "midnight",
    name: "Midnight Neon",
    description: "Dam, hien dai, noi bat cho cac doi ky thuat va showcase du an.",
    theme: {
      background: "#101722",
      foreground: "#e9eef5",
      muted: "#9aa8bc",
      surface: "rgba(22, 31, 45, 0.78)",
      surface_strong: "#172131",
      line: "rgba(233, 238, 245, 0.1)",
      brand: "#2ec5ff",
      brand_deep: "#1c84aa",
      accent: "#ff8f3d",
      accent_soft: "#3a2b20",
    },
  },
  {
    id: "berry",
    name: "Berry Pulse",
    description: "Tre, nang luong, hop landing page sinh vien va su kien.",
    theme: {
      background: "#f8eef3",
      foreground: "#241821",
      muted: "#76606f",
      surface: "rgba(255, 255, 255, 0.82)",
      surface_strong: "#fffafd",
      line: "rgba(36, 24, 33, 0.1)",
      brand: "#cf3f74",
      brand_deep: "#92284f",
      accent: "#6941c6",
      accent_soft: "#e7def9",
    },
  },
  {
    id: "copper",
    name: "Copper Slate",
    description: "Can bang giua nghiem tuc va am ap, hop website to chuc.",
    theme: {
      background: "#f2efec",
      foreground: "#1f2329",
      muted: "#68707a",
      surface: "rgba(255, 255, 255, 0.82)",
      surface_strong: "#fcfbfa",
      line: "rgba(31, 35, 41, 0.12)",
      brand: "#b8643c",
      brand_deep: "#7d4428",
      accent: "#3b6d8c",
      accent_soft: "#d9e9f2",
    },
  },
  {
    id: "sunset",
    name: "Sunset Paper",
    description: "Mem, than thien, hop trang gioi thieu va onboarding thanh vien moi.",
    theme: {
      background: "#fbf2e8",
      foreground: "#2b1f1a",
      muted: "#7b665f",
      surface: "rgba(255, 252, 248, 0.84)",
      surface_strong: "#fffdfa",
      line: "rgba(43, 31, 26, 0.1)",
      brand: "#dd6b4d",
      brand_deep: "#9d4630",
      accent: "#d39b2f",
      accent_soft: "#f6e8bf",
    },
  },
  {
    id: "mono",
    name: "Mono Minimal",
    description: "Toi gian, sach, trung tinh, de dua noi dung len tren het.",
    theme: {
      background: "#f5f5f3",
      foreground: "#1b1b1b",
      muted: "#666666",
      surface: "rgba(255, 255, 255, 0.8)",
      surface_strong: "#ffffff",
      line: "rgba(27, 27, 27, 0.1)",
      brand: "#2f2f2f",
      brand_deep: "#111111",
      accent: "#7a7a7a",
      accent_soft: "#ececec",
    },
  },
  {
    id: "royal",
    name: "Royal Academy",
    description: "Chac chan, hoc thuat, hop CLB co hinh anh chuyen nghiep.",
    theme: {
      background: "#eff2f8",
      foreground: "#18233b",
      muted: "#5f6d86",
      surface: "rgba(255, 255, 255, 0.84)",
      surface_strong: "#ffffff",
      line: "rgba(24, 35, 59, 0.12)",
      brand: "#2f5bd3",
      brand_deep: "#1d3986",
      accent: "#b38a2e",
      accent_soft: "#f2e6bf",
    },
  },
  {
    id: "mint",
    name: "Mint Studio",
    description: "Nhe, hien dai, hop CLB tre va cac trang nhieu thong tin.",
    theme: {
      background: "#edf8f4",
      foreground: "#163129",
      muted: "#60776f",
      surface: "rgba(255, 255, 255, 0.82)",
      surface_strong: "#fbfffd",
      line: "rgba(22, 49, 41, 0.1)",
      brand: "#2db38c",
      brand_deep: "#1d7d61",
      accent: "#5671f5",
      accent_soft: "#e1e6ff",
    },
  },
  {
    id: "lava",
    name: "Lava Contrast",
    description: "Manh, dam, rat hop cho landing page can diem nhan cao.",
    theme: {
      background: "#191512",
      foreground: "#f5ede7",
      muted: "#c5b5a8",
      surface: "rgba(37, 30, 26, 0.78)",
      surface_strong: "#261f1b",
      line: "rgba(245, 237, 231, 0.1)",
      brand: "#ff6b3d",
      brand_deep: "#b34728",
      accent: "#ffd166",
      accent_soft: "#4b4024",
    },
  },
];

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
          Chon mot mau giao dien co san, xem preview, sau do neu can thi chi tinh chinh 2
          mau chinh. Cac thong so sau hon da duoc dua xuong cuoi trang.
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
        <h2 className="text-lg font-semibold text-slate-900">Tinh Chinh Nhanh</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ColorInput
            label="Mau nut chinh"
            value={content.theme.brand}
            onChange={(value) => onThemeChange(buildThemeFromCore(content.theme, { brand: value }))}
          />
          <ColorInput
            label="Mau nhan phu"
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
          Mo tuy chinh nang cao
        </summary>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Danh cho luc can can thiep sau vao nen, vien va do tuong phan.
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
          <h3 className="mt-3 font-[family:var(--font-display)] text-3xl font-bold">
            Giao dien sach, can doi va de dieu chinh theo thuong hieu.
          </h3>
          <p className="mt-3 text-sm leading-7" style={{ color: theme.muted }}>
            O preview nay ban co the nhin nhanh tuong quan giua nen, text, border va hai mau chu dao.
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

function buildThemeFromCore(
  currentTheme: SiteContent["theme"],
  updates: Partial<Pick<SiteContent["theme"], "brand" | "accent">>,
) {
  const brand = updates.brand ?? currentTheme.brand;
  const accent = updates.accent ?? currentTheme.accent;

  return {
    ...currentTheme,
    brand,
    brand_deep: darkenHex(brand, 0.28),
    accent,
    accent_soft: mixHexWithWhite(accent, 0.82),
  };
}

function darkenHex(hex: string, amount: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const darkened = {
    r: Math.round(rgb.r * (1 - amount)),
    g: Math.round(rgb.g * (1 - amount)),
    b: Math.round(rgb.b * (1 - amount)),
  };

  return rgbToHex(darkened.r, darkened.g, darkened.b);
}

function mixHexWithWhite(hex: string, whiteRatio: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const mixed = {
    r: Math.round(rgb.r * (1 - whiteRatio) + 255 * whiteRatio),
    g: Math.round(rgb.g * (1 - whiteRatio) + 255 * whiteRatio),
    b: Math.round(rgb.b * (1 - whiteRatio) + 255 * whiteRatio),
  };

  return rgbToHex(mixed.r, mixed.g, mixed.b);
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const isValid = /^[0-9a-fA-F]{6}$/.test(normalized);

  if (!isValid) return null;

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0"))
    .join("")}`;
}
