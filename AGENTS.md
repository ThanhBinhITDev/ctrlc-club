# AGENTS.md

This repository uses a strict project-wide web app design system. Any AI agent
working in this repo should read and follow:

- [docs/ai/web-app-design-system.md](docs/ai/web-app-design-system.md)

## Required Behavior

- Apply one shared visual language across public pages and admin pages.
- Keep public pages more spacious and narrative-driven.
- Keep admin pages denser, clearer, and more software-like.
- Use Tailwind + CSS variables.
- Do not hard-code page-level colors in components when theme tokens should be used.
- Do not introduce random shadows, spacing, radii, or fonts.
- Prefer light mode by default.
- Support both light and dark themes through structured tokens.
- Keep UI polished like a modern SaaS product, without looking flashy or template-like.

## Must Avoid

- Generic AI-looking UI
- Stock shadcn-looking UI without adaptation
- Old-style dark admin sidebars by default
- Purple default gradients without explicit brand direction
- Overly decorative admin pages
- Weak CTA hierarchy
- Mobile layouts that lose structure

## Workflow

Before implementing or revising UI:
1. Identify page type: landing, content, auth, admin dashboard, data list, form, CMS/settings, theme editor.
2. Match the correct pattern from the design-system doc.
3. Use the token, typography, spacing, and motion rules from the design-system doc.
4. Review the result against the anti-pattern and checklist sections in the design-system doc.

If there is a conflict between visual flourish and usability, choose usability.
If there is a conflict between speed and system consistency, choose consistency.
