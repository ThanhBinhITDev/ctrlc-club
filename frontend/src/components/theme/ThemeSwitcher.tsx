"use client";

import { useEffect, useRef, useState } from "react";
import { Palette, RotateCcw, X } from "lucide-react";
import { useSiteTheme } from "@/context/SiteThemeContext";

export default function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<{ top: number; right: number } | null>(null);
  const { presets, activePresetId, applyPreset, resetTheme } = useSiteTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const maxRightOffset = Math.max(16, window.innerWidth - rect.right);
    const top = rect.bottom + 12;

    setPanelStyle({
      top,
      right: maxRightOffset,
    });
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/90 text-[color:var(--foreground)] transition hover:border-[color:var(--brand)] ${
          compact ? "px-3 py-2 text-xs font-semibold" : "px-4 py-2 text-sm font-semibold"
        }`}
      >
        <Palette className="h-4 w-4" />
        {compact ? "Theme" : "Theme Switcher"}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close theme switcher"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[120] bg-black/20 backdrop-blur-[1px]"
          />

          <div
            className="fixed z-[121] w-[min(360px,calc(100vw-24px))] rounded-[1.5rem] border border-[color:var(--line)] bg-[color:var(--surface-strong)] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.18)]"
            style={
              panelStyle
                ? { top: panelStyle.top, right: panelStyle.right }
                : { top: 80, right: 16 }
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[color:var(--foreground)]">Theme Switcher</p>
                <p className="text-xs text-[color:var(--muted)]">Doi nhanh giao dien cho phien hien tai</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line)] text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  resetTheme();
                  setOpen(false);
                }}
                className="inline-flex items-center gap-1 rounded-full border border-[color:var(--line)] px-3 py-1 text-xs font-semibold text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Mac dinh
              </button>
            </div>

            <div className="mt-4 grid max-h-[min(70vh,560px)] gap-3 overflow-y-auto pr-1">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    applyPreset(preset.id);
                    setOpen(false);
                  }}
                  className={`rounded-2xl border p-3 text-left transition ${
                    activePresetId === preset.id
                      ? "border-[color:var(--brand)] bg-white"
                      : "border-[color:var(--line)] bg-white/70 hover:border-[color:var(--brand)]"
                  }`}
                >
                  <div className="flex gap-2">
                    {[preset.theme.background, preset.theme.foreground, preset.theme.brand, preset.theme.accent].map((color) => (
                      <div key={color} className="h-6 w-6 rounded-full border border-black/5" style={{ background: color }} />
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[color:var(--foreground)]">{preset.name}</p>
                  <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">{preset.description}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
