export interface LinkItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HighlightCard {
  icon: string;
  title: string;
  description: string;
}

export interface ActivityItem {
  index: string;
  title: string;
  description: string;
}

export interface CultureItem {
  title: string;
  description: string;
}

export interface SiteContent {
  theme: {
    background: string;
    foreground: string;
    muted: string;
    surface: string;
    surface_strong: string;
    line: string;
    brand: string;
    brand_deep: string;
    accent: string;
    accent_soft: string;
  };
  brand: {
    name: string;
    mark: string;
    tagline: string;
    description: string;
  };
  navigation: LinkItem[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primary_cta_label: string;
    primary_cta_url: string;
    secondary_cta_label: string;
    secondary_cta_url: string;
    stats: StatItem[];
  };
  spotlight: {
    label: string;
    title: string;
    focus: string;
    format: string;
    goal: string;
    priorities: string[];
  };
  introduction: {
    section_id: string;
    cards: HighlightCard[];
  };
  activities: {
    section_id: string;
    label: string;
    title: string;
    description: string;
    items: ActivityItem[];
  };
  culture: {
    section_id: string;
    label: string;
    items: CultureItem[];
  };
  contact: {
    section_id: string;
    label: string;
    title: string;
    description: string;
    cta_label: string;
    cta_url: string;
  };
  footer: {
    title: string;
    description: string;
    email: string;
    address: string;
    copyright: string;
    links: LinkItem[];
  };
}
