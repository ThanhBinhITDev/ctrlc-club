"use client";

import { useEffect, useState } from "react";
import { defaultSiteContent } from "@/data/defaultSiteContent";
import { siteContentService } from "@/services/api";
import { SiteContent } from "@/types/siteContent";

const iconOptions = [
  { value: "layers3", label: "Layers" },
  { value: "users", label: "Users" },
  { value: "shield-check", label: "Shield" },
  { value: "sparkles", label: "Sparkles" },
  { value: "calendar", label: "Calendar" },
];

export default function SettingsPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    siteContentService
      .getAdmin()
      .then((res) => setContent(res.data))
      .catch(() => setError("Khong tai duoc noi dung website."))
      .finally(() => setLoading(false));
  }, []);

  const updateSection = <K extends keyof SiteContent>(section: K, value: SiteContent[K]) => {
    setContent((prev) => ({ ...prev, [section]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await siteContentService.update(content);
      setContent(res.data);
      setMessage("Da cap nhat noi dung website thanh cong.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Khong the luu noi dung website.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-600">Dang tai cau hinh noi dung website...</div>;
  }

  return (
    <div className="p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
              Website CMS
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Chinh sua gan nhu toan bo noi dung trang web
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Form nay dang dieu khien brand, menu, hero, cac section noi dung va footer
              cua trang public. Sau khi luu, homepage se dung du lieu moi.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:bg-slate-400"
          >
            {saving ? "Dang luu..." : "Luu thay doi"}
          </button>
        </div>

        {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">{message}</div>}
        {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{error}</div>}

        <SectionCard title="Brand">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Ten CLB" value={content.brand.name} onChange={(value) => updateSection("brand", { ...content.brand, name: value })} />
            <TextInput label="Logo text" value={content.brand.mark} onChange={(value) => updateSection("brand", { ...content.brand, mark: value })} />
            <TextInput label="Tagline" value={content.brand.tagline} onChange={(value) => updateSection("brand", { ...content.brand, tagline: value })} />
            <TextArea label="Mo ta ngan o dau trang" value={content.brand.description} onChange={(value) => updateSection("brand", { ...content.brand, description: value })} rows={3} />
          </div>
        </SectionCard>

        <SectionCard title="Navigation">
          <RepeaterActions
            onAdd={() =>
              updateSection("navigation", [...content.navigation, { label: "Menu moi", href: "/#new-section" }])
            }
          />
          <div className="space-y-4">
            {content.navigation.map((item, index) => (
              <div key={`${item.label}-${index}`} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_1fr_auto]">
                <TextInput
                  label={`Nhan ${index + 1}`}
                  value={item.label}
                  onChange={(value) => {
                    const next = [...content.navigation];
                    next[index] = { ...next[index], label: value };
                    updateSection("navigation", next);
                  }}
                />
                <TextInput
                  label="Link"
                  value={item.href}
                  onChange={(value) => {
                    const next = [...content.navigation];
                    next[index] = { ...next[index], href: value };
                    updateSection("navigation", next);
                  }}
                />
                <DeleteButton
                  onClick={() => updateSection("navigation", content.navigation.filter((_, itemIndex) => itemIndex !== index))}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Hero">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Eyebrow" value={content.hero.eyebrow} onChange={(value) => updateSection("hero", { ...content.hero, eyebrow: value })} />
            <TextInput label="CTA chinh" value={content.hero.primary_cta_label} onChange={(value) => updateSection("hero", { ...content.hero, primary_cta_label: value })} />
            <TextArea label="Tieu de chinh" value={content.hero.title} onChange={(value) => updateSection("hero", { ...content.hero, title: value })} rows={3} />
            <TextInput label="URL CTA chinh" value={content.hero.primary_cta_url} onChange={(value) => updateSection("hero", { ...content.hero, primary_cta_url: value })} />
            <TextArea label="Mo ta chinh" value={content.hero.description} onChange={(value) => updateSection("hero", { ...content.hero, description: value })} rows={4} />
            <div className="grid gap-4">
              <TextInput label="CTA phu" value={content.hero.secondary_cta_label} onChange={(value) => updateSection("hero", { ...content.hero, secondary_cta_label: value })} />
              <TextInput label="URL CTA phu" value={content.hero.secondary_cta_url} onChange={(value) => updateSection("hero", { ...content.hero, secondary_cta_url: value })} />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Stats</h3>
              <button
                onClick={() =>
                  updateSection("hero", {
                    ...content.hero,
                    stats: [...content.hero.stats, { value: "0", label: "Thong so moi" }],
                  })
                }
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
              >
                Them stat
              </button>
            </div>

            {content.hero.stats.map((item, index) => (
              <div key={`${item.value}-${index}`} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[160px_1fr_auto]">
                <TextInput
                  label="Gia tri"
                  value={item.value}
                  onChange={(value) => {
                    const next = [...content.hero.stats];
                    next[index] = { ...next[index], value };
                    updateSection("hero", { ...content.hero, stats: next });
                  }}
                />
                <TextInput
                  label="Mo ta"
                  value={item.label}
                  onChange={(value) => {
                    const next = [...content.hero.stats];
                    next[index] = { ...next[index], label: value };
                    updateSection("hero", { ...content.hero, stats: next });
                  }}
                />
                <DeleteButton
                  onClick={() =>
                    updateSection("hero", {
                      ...content.hero,
                      stats: content.hero.stats.filter((_, itemIndex) => itemIndex !== index),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Spotlight">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Label" value={content.spotlight.label} onChange={(value) => updateSection("spotlight", { ...content.spotlight, label: value })} />
            <TextInput label="Tieu de" value={content.spotlight.title} onChange={(value) => updateSection("spotlight", { ...content.spotlight, title: value })} />
            <TextInput label="Trong tam" value={content.spotlight.focus} onChange={(value) => updateSection("spotlight", { ...content.spotlight, focus: value })} />
            <TextInput label="Hinh thuc" value={content.spotlight.format} onChange={(value) => updateSection("spotlight", { ...content.spotlight, format: value })} />
            <TextInput label="Muc tieu" value={content.spotlight.goal} onChange={(value) => updateSection("spotlight", { ...content.spotlight, goal: value })} />
          </div>

          <ListEditor
            title="Huong uu tien"
            items={content.spotlight.priorities}
            onChange={(items) => updateSection("spotlight", { ...content.spotlight, priorities: items })}
            addLabel="Them uu tien"
            placeholder="Noi dung uu tien"
          />
        </SectionCard>

        <SectionCard title="Gioi thieu">
          <TextInput
            label="Section ID"
            value={content.introduction.section_id}
            onChange={(value) => updateSection("introduction", { ...content.introduction, section_id: value })}
          />

          <div className="mt-6 space-y-4">
            <RepeaterActions
              onAdd={() =>
                updateSection("introduction", {
                  ...content.introduction,
                  cards: [...content.introduction.cards, { icon: "sparkles", title: "Them card", description: "Mo ta moi" }],
                })
              }
            />
            {content.introduction.cards.map((card, index) => (
              <div key={`${card.title}-${index}`} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-2">
                <SelectInput
                  label="Icon"
                  value={card.icon}
                  options={iconOptions}
                  onChange={(value) => {
                    const next = [...content.introduction.cards];
                    next[index] = { ...next[index], icon: value };
                    updateSection("introduction", { ...content.introduction, cards: next });
                  }}
                />
                <TextInput
                  label="Tieu de"
                  value={card.title}
                  onChange={(value) => {
                    const next = [...content.introduction.cards];
                    next[index] = { ...next[index], title: value };
                    updateSection("introduction", { ...content.introduction, cards: next });
                  }}
                />
                <TextArea
                  label="Mo ta"
                  value={card.description}
                  onChange={(value) => {
                    const next = [...content.introduction.cards];
                    next[index] = { ...next[index], description: value };
                    updateSection("introduction", { ...content.introduction, cards: next });
                  }}
                  rows={3}
                />
                <div className="flex items-end justify-end">
                  <DeleteButton
                    onClick={() =>
                      updateSection("introduction", {
                        ...content.introduction,
                        cards: content.introduction.cards.filter((_, itemIndex) => itemIndex !== index),
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Hoat dong">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Section ID" value={content.activities.section_id} onChange={(value) => updateSection("activities", { ...content.activities, section_id: value })} />
            <TextInput label="Label" value={content.activities.label} onChange={(value) => updateSection("activities", { ...content.activities, label: value })} />
            <TextInput label="Tieu de" value={content.activities.title} onChange={(value) => updateSection("activities", { ...content.activities, title: value })} />
            <TextArea label="Mo ta tong" value={content.activities.description} onChange={(value) => updateSection("activities", { ...content.activities, description: value })} rows={4} />
          </div>

          <div className="mt-6 space-y-4">
            <RepeaterActions
              onAdd={() =>
                updateSection("activities", {
                  ...content.activities,
                  items: [...content.activities.items, { index: "00", title: "Muc moi", description: "Noi dung moi" }],
                })
              }
            />
            {content.activities.items.map((item, index) => (
              <div key={`${item.index}-${index}`} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[100px_1fr]">
                <TextInput
                  label="So thu tu"
                  value={item.index}
                  onChange={(value) => {
                    const next = [...content.activities.items];
                    next[index] = { ...next[index], index: value };
                    updateSection("activities", { ...content.activities, items: next });
                  }}
                />
                <TextInput
                  label="Tieu de"
                  value={item.title}
                  onChange={(value) => {
                    const next = [...content.activities.items];
                    next[index] = { ...next[index], title: value };
                    updateSection("activities", { ...content.activities, items: next });
                  }}
                />
                <TextArea
                  label="Mo ta"
                  value={item.description}
                  onChange={(value) => {
                    const next = [...content.activities.items];
                    next[index] = { ...next[index], description: value };
                    updateSection("activities", { ...content.activities, items: next });
                  }}
                  rows={3}
                />
                <div className="flex items-end justify-end">
                  <DeleteButton
                    onClick={() =>
                      updateSection("activities", {
                        ...content.activities,
                        items: content.activities.items.filter((_, itemIndex) => itemIndex !== index),
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Van hoa">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Section ID" value={content.culture.section_id} onChange={(value) => updateSection("culture", { ...content.culture, section_id: value })} />
            <TextInput label="Label" value={content.culture.label} onChange={(value) => updateSection("culture", { ...content.culture, label: value })} />
          </div>

          <div className="mt-6 space-y-4">
            <RepeaterActions
              onAdd={() =>
                updateSection("culture", {
                  ...content.culture,
                  items: [...content.culture.items, { title: "Gia tri moi", description: "Mo ta moi" }],
                })
              }
            />
            {content.culture.items.map((item, index) => (
              <div key={`${item.title}-${index}`} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-2">
                <TextInput
                  label="Tieu de"
                  value={item.title}
                  onChange={(value) => {
                    const next = [...content.culture.items];
                    next[index] = { ...next[index], title: value };
                    updateSection("culture", { ...content.culture, items: next });
                  }}
                />
                <TextArea
                  label="Mo ta"
                  value={item.description}
                  onChange={(value) => {
                    const next = [...content.culture.items];
                    next[index] = { ...next[index], description: value };
                    updateSection("culture", { ...content.culture, items: next });
                  }}
                  rows={3}
                />
                <div className="md:col-span-2 flex justify-end">
                  <DeleteButton
                    onClick={() =>
                      updateSection("culture", {
                        ...content.culture,
                        items: content.culture.items.filter((_, itemIndex) => itemIndex !== index),
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Call To Action va Footer">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Contact section ID" value={content.contact.section_id} onChange={(value) => updateSection("contact", { ...content.contact, section_id: value })} />
            <TextInput label="Contact label" value={content.contact.label} onChange={(value) => updateSection("contact", { ...content.contact, label: value })} />
            <TextInput label="Contact title" value={content.contact.title} onChange={(value) => updateSection("contact", { ...content.contact, title: value })} />
            <TextArea label="Contact description" value={content.contact.description} onChange={(value) => updateSection("contact", { ...content.contact, description: value })} rows={4} />
            <TextInput label="CTA label" value={content.contact.cta_label} onChange={(value) => updateSection("contact", { ...content.contact, cta_label: value })} />
            <TextInput label="CTA URL" value={content.contact.cta_url} onChange={(value) => updateSection("contact", { ...content.contact, cta_url: value })} />
            <TextInput label="Footer title" value={content.footer.title} onChange={(value) => updateSection("footer", { ...content.footer, title: value })} />
            <TextInput label="Footer email" value={content.footer.email} onChange={(value) => updateSection("footer", { ...content.footer, email: value })} />
            <TextArea label="Footer description" value={content.footer.description} onChange={(value) => updateSection("footer", { ...content.footer, description: value })} rows={4} />
            <TextInput label="Footer address" value={content.footer.address} onChange={(value) => updateSection("footer", { ...content.footer, address: value })} />
            <TextInput label="Footer copyright" value={content.footer.copyright} onChange={(value) => updateSection("footer", { ...content.footer, copyright: value })} />
          </div>

          <div className="mt-6 space-y-4">
            <RepeaterActions
              onAdd={() => updateSection("footer", { ...content.footer, links: [...content.footer.links, { label: "Link moi", href: "/" }] })}
            />
            {content.footer.links.map((link, index) => (
              <div key={`${link.label}-${index}`} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_1fr_auto]">
                <TextInput
                  label="Nhan"
                  value={link.label}
                  onChange={(value) => {
                    const next = [...content.footer.links];
                    next[index] = { ...next[index], label: value };
                    updateSection("footer", { ...content.footer, links: next });
                  }}
                />
                <TextInput
                  label="URL"
                  value={link.href}
                  onChange={(value) => {
                    const next = [...content.footer.links];
                    next[index] = { ...next[index], href: value };
                    updateSection("footer", { ...content.footer, links: next });
                  }}
                />
                <DeleteButton
                  onClick={() =>
                    updateSection("footer", {
                      ...content.footer,
                      links: content.footer.links.filter((_, itemIndex) => itemIndex !== index),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
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

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
      />
    </label>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function RepeaterActions({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onAdd}
        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
      >
        Them muc
      </button>
    </div>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
    >
      Xoa
    </button>
  );
}

function ListEditor({
  title,
  items,
  onChange,
  addLabel,
  placeholder,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
  placeholder: string;
}) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</h3>
        <button
          onClick={() => onChange([...items, placeholder])}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
        >
          {addLabel}
        </button>
      </div>

      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1fr_auto]">
          <TextInput
            label={`Muc ${index + 1}`}
            value={item}
            onChange={(value) => {
              const next = [...items];
              next[index] = value;
              onChange(next);
            }}
          />
          <DeleteButton onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} />
        </div>
      ))}
    </div>
  );
}
