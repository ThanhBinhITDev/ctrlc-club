"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteContent } from "@/types/siteContent";
import { themePresets } from "@/data/themePresets";
import { defaultSiteContent } from "@/data/defaultSiteContent";

interface SiteThemeContextType {
  activePresetId: string | null;
  presets: typeof themePresets;
  applyPreset: (id: string) => void;
  updateSiteTheme: (theme: SiteContent["theme"]) => void;
  resetTheme: () => void;
  siteTypography: SiteContent["typography"];
  updateTypography: (typography: SiteContent["typography"]) => void;
}

const SiteThemeContext = createContext<SiteThemeContextType | undefined>(undefined);

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [siteTypography, setSiteTypography] = useState<SiteContent["typography"]>(
    defaultSiteContent.typography
  );

  const applyThemeToCSSVariables = (theme: SiteContent["theme"]) => {
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/_/g, "-")}`;
      root.style.setProperty(cssVarName, value);
    });
  };

  const applyTypographyToCSSVariables = (typography: SiteContent["typography"]) => {
    const root = document.documentElement;
    const fontMap: Record<string, string> = {
      "be-vietnam-pro": "var(--font-be-vietnam-pro)",
      "montserrat": "var(--font-montserrat)",
      "inter": "var(--font-inter)",
      "plus-jakarta": "var(--font-plus-jakarta)",
      "lexend": "var(--font-lexend)",
    };
    const headingFont = fontMap[typography.fontFamily.heading] || "var(--font-sans)";
    const bodyFont = fontMap[typography.fontFamily.body] || "var(--font-sans)";
    
    root.style.setProperty("--font-heading", headingFont);
    root.style.setProperty("--font-body", bodyFont);
  };

  const applyPreset = (id: string) => {
    const preset = themePresets.find((p) => p.id === id);
    if (preset) {
      setActivePresetId(id);
      applyThemeToCSSVariables(preset.theme);
      localStorage.setItem("site-theme-preset", id);
    }
  };

  const updateSiteTheme = (theme: SiteContent["theme"]) => {
    setActivePresetId(null);
    applyThemeToCSSVariables(theme);
  };

  const updateTypography = (typography: SiteContent["typography"]) => {
    setSiteTypography(typography);
    applyTypographyToCSSVariables(typography);
    localStorage.setItem("site-typography", JSON.stringify(typography));
  };

  const resetTheme = () => {
    setActivePresetId(null);
    applyThemeToCSSVariables(defaultSiteContent.theme);
    updateTypography(defaultSiteContent.typography);
    localStorage.removeItem("site-theme-preset");
    localStorage.removeItem("site-typography");
  };

  useEffect(() => {
    // Initial load from localStorage
    const savedPresetId = localStorage.getItem("site-theme-preset");
    if (savedPresetId) {
      applyPreset(savedPresetId);
    } else {
      applyThemeToCSSVariables(defaultSiteContent.theme);
    }

    const savedTypography = localStorage.getItem("site-typography");
    if (savedTypography) {
      try {
        const parsed = JSON.parse(savedTypography);
        setSiteTypography(parsed);
        applyTypographyToCSSVariables(parsed);
      } catch (e) {
        applyTypographyToCSSVariables(defaultSiteContent.typography);
      }
    } else {
      applyTypographyToCSSVariables(defaultSiteContent.typography);
    }
  }, []);

  return (
    <SiteThemeContext.Provider
      value={{
        activePresetId,
        presets: themePresets,
        applyPreset,
        updateSiteTheme,
        resetTheme,
        siteTypography,
        updateTypography,
      }}
    >
      {children}
    </SiteThemeContext.Provider>
  );
}

export function useSiteTheme() {
  const context = useContext(SiteThemeContext);
  if (context === undefined) {
    throw new Error("useSiteTheme must be used within a SiteThemeProvider");
  }
  return context;
}