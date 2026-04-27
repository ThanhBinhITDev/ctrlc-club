"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultSiteContent } from "@/data/defaultSiteContent";
import { themePresets } from "@/data/themePresets";
import { siteContentService } from "@/services/api";
import { SiteContent } from "@/types/siteContent";

const STORAGE_KEY = "ctrlc-theme-preset";

type SiteThemeContextType = {
  siteTheme: SiteContent["theme"];
  activePresetId: string | null;
  applyPreset: (presetId: string) => void;
  resetTheme: () => void;
  updateSiteTheme: (theme: SiteContent["theme"]) => void;
  presets: typeof themePresets;
};

const SiteThemeContext = createContext<SiteThemeContextType | undefined>(undefined);

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  const [siteTheme, setSiteTheme] = useState<SiteContent["theme"]>(defaultSiteContent.theme);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  useEffect(() => {
    siteContentService
      .getPublic()
      .then((res) => {
        const nextTheme = res.data.theme ?? defaultSiteContent.theme;
        setSiteTheme(nextTheme);

        const storedPresetId = localStorage.getItem(STORAGE_KEY);
        if (storedPresetId) {
          const preset = themePresets.find((item) => item.id === storedPresetId);
          if (preset) {
            applyThemeVariables(preset.theme);
            setActivePresetId(storedPresetId);
            return;
          }
        }

        applyThemeVariables(nextTheme);
        setActivePresetId(null);
      })
      .catch(() => {
        applyThemeVariables(defaultSiteContent.theme);
      });
  }, []);

  const applyPreset = (presetId: string) => {
    const preset = themePresets.find((item) => item.id === presetId);
    if (!preset) return;

    applyThemeVariables(preset.theme);
    localStorage.setItem(STORAGE_KEY, presetId);
    setActivePresetId(presetId);
  };

  const resetTheme = () => {
    applyThemeVariables(siteTheme);
    localStorage.removeItem(STORAGE_KEY);
    setActivePresetId(null);
  };

  const updateSiteTheme = (theme: SiteContent["theme"]) => {
    setSiteTheme(theme);

    const storedPresetId = localStorage.getItem(STORAGE_KEY);
    if (!storedPresetId) {
      applyThemeVariables(theme);
    }
  };

  return (
    <SiteThemeContext.Provider
      value={{
        siteTheme,
        activePresetId,
        applyPreset,
        resetTheme,
        updateSiteTheme,
        presets: themePresets,
      }}
    >
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const context = useContext(SiteThemeContext);
  if (!context) {
    throw new Error("useSiteTheme must be used within SiteThemeProvider");
  }

  return context;
}

function applyThemeVariables(theme: SiteContent["theme"]) {
  const root = document.documentElement;
  const entries = [
    ["--background", theme.background],
    ["--foreground", theme.foreground],
    ["--muted", theme.muted],
    ["--surface", theme.surface],
    ["--surface-strong", theme.surface_strong],
    ["--line", theme.line],
    ["--brand", theme.brand],
    ["--brand-deep", theme.brand_deep],
    ["--accent", theme.accent],
    ["--accent-soft", theme.accent_soft],
  ] as const;

  entries.forEach(([key, value]) => root.style.setProperty(key, value));
}
