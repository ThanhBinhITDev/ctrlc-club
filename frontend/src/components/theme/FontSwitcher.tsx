"use client";

import { useSiteTheme } from "@/context/SiteThemeContext";
import { SiteContent } from "@/types/siteContent";

interface FontSwitcherProps {
  value?: SiteContent["typography"];
  onChange?: (typography: SiteContent["typography"]) => void;
}

export default function FontSwitcher({ value, onChange }: FontSwitcherProps = {}) {
  const siteThemeContext = useSiteTheme();
  const typography = value ?? siteThemeContext?.siteTypography;
  const updateTypography = onChange ?? siteThemeContext?.updateTypography;

  if (!typography || !updateTypography) {
    return null;
  }


  const fontOptions = {
    heading: [
      { key: "be-vietnam-pro", label: "Be Vietnam Pro" },
      { key: "montserrat", label: "Montserrat" },
      { key: "inter", label: "Inter" },
      { key: "plus-jakarta", label: "Plus Jakarta Sans" },
      { key: "lexend", label: "Lexend" },
    ],
    body: [
      { key: "be-vietnam-pro", label: "Be Vietnam Pro" },
      { key: "inter", label: "Inter" },
      { key: "lexend", label: "Lexend" },
    ],
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-[color:var(--foreground)]">Font Tiêu đề</label>
         <select
           value={typography.fontFamily.heading}
           onChange={(e) =>
             updateTypography({
               ...typography,
               fontFamily: { ...typography.fontFamily, heading: e.target.value },
             })
           }
           className="mt-2 w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 text-sm outline-none transition focus:border-[color:var(--brand)]"
         >
           {fontOptions.heading.map((f) => (
             <option key={f.key} value={f.key}>
               {f.label}
             </option>
           ))}
         </select>
      </div>

      <div>
        <label className="text-sm font-semibold text-[color:var(--foreground)]">Font Nội dung</label>
         <select
           value={typography.fontFamily.body}
           onChange={(e) =>
             updateTypography({
               ...typography,
               fontFamily: { ...typography.fontFamily, body: e.target.value },
             })
           }
           className="mt-2 w-full rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-2 text-sm outline-none transition focus:border-[color:var(--brand)]"
         >
           {fontOptions.body.map((f) => (
             <option key={f.key} value={f.key}>
               {f.label}
             </option>
           ))}
         </select>
      </div>

      <div className="mt-4 rounded-lg bg-[color:var(--surface)]/50 p-4">
        <h4 className="text-sm font-semibold text-[color:var(--foreground)]">Preview:</h4>
        <div className="mt-2 space-y-2">
          <p
            className="text-2xl font-bold transition-[font-family]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Quy trình làm việc chuyên nghiệp
          </p>
          <p
            className="text-sm text-[color:var(--muted)] transition-[font-family]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Chúng tôi xây dựng môi trường học tập để sinh viên rèn luyện kỹ năng thông qua các dự án
            thực tế.
          </p>
        </div>
      </div>
    </div>
  );
}
