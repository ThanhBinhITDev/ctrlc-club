<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SiteContentController extends Controller
{
    public function show()
    {
        return response()->json(SiteSetting::siteContent());
    }

    public function update(Request $request)
    {
        if ($request->user()->getClubLevel() > 2) {
            return response()->json([
                'message' => 'Ban khong co quyen cap nhat noi dung website.',
            ], 403);
        }

        $validated = $request->validate([
            'theme' => 'required|array',
            'theme.background' => 'required|string|max:40',
            'theme.foreground' => 'required|string|max:40',
            'theme.muted' => 'required|string|max:40',
            'theme.surface' => 'required|string|max:60',
            'theme.surface_strong' => 'required|string|max:40',
            'theme.line' => 'required|string|max:60',
            'theme.brand' => 'required|string|max:40',
            'theme.brand_deep' => 'required|string|max:40',
            'theme.accent' => 'required|string|max:40',
            'theme.accent_soft' => 'required|string|max:40',

            'brand' => 'required|array',
            'brand.name' => 'required|string|max:255',
            'brand.mark' => 'required|string|max:50',
            'brand.tagline' => 'required|string|max:255',
            'brand.description' => 'required|string|max:500',

            'navigation' => 'required|array|min:1|max:8',
            'navigation.*.label' => 'required|string|max:80',
            'navigation.*.href' => 'required|string|max:255',

            'hero' => 'required|array',
            'hero.eyebrow' => 'required|string|max:120',
            'hero.title' => 'required|string|max:255',
            'hero.description' => 'required|string|max:1200',
            'hero.primary_cta_label' => 'required|string|max:120',
            'hero.primary_cta_url' => 'required|string|max:255',
            'hero.secondary_cta_label' => 'required|string|max:120',
            'hero.secondary_cta_url' => 'required|string|max:255',
            'hero.stats' => 'required|array|min:1|max:6',
            'hero.stats.*.value' => 'required|string|max:40',
            'hero.stats.*.label' => 'required|string|max:160',

            'spotlight' => 'required|array',
            'spotlight.label' => 'required|string|max:120',
            'spotlight.title' => 'required|string|max:255',
            'spotlight.focus' => 'required|string|max:255',
            'spotlight.format' => 'required|string|max:255',
            'spotlight.goal' => 'required|string|max:255',
            'spotlight.priorities' => 'required|array|min:1|max:8',
            'spotlight.priorities.*' => 'required|string|max:255',

            'introduction' => 'required|array',
            'introduction.section_id' => 'required|string|max:80',
            'introduction.cards' => 'required|array|min:1|max:6',
            'introduction.cards.*.icon' => ['required', 'string', Rule::in(['layers3', 'users', 'shield-check', 'sparkles', 'calendar'])],
            'introduction.cards.*.title' => 'required|string|max:120',
            'introduction.cards.*.description' => 'required|string|max:500',

            'activities' => 'required|array',
            'activities.section_id' => 'required|string|max:80',
            'activities.label' => 'required|string|max:120',
            'activities.title' => 'required|string|max:255',
            'activities.description' => 'required|string|max:1000',
            'activities.items' => 'required|array|min:1|max:8',
            'activities.items.*.index' => 'required|string|max:10',
            'activities.items.*.title' => 'required|string|max:120',
            'activities.items.*.description' => 'required|string|max:500',

            'culture' => 'required|array',
            'culture.section_id' => 'required|string|max:80',
            'culture.label' => 'required|string|max:120',
            'culture.items' => 'required|array|min:1|max:6',
            'culture.items.*.title' => 'required|string|max:120',
            'culture.items.*.description' => 'required|string|max:500',

            'contact' => 'required|array',
            'contact.section_id' => 'required|string|max:80',
            'contact.label' => 'required|string|max:120',
            'contact.title' => 'required|string|max:255',
            'contact.description' => 'required|string|max:1000',
            'contact.cta_label' => 'required|string|max:120',
            'contact.cta_url' => 'required|string|max:255',

            'footer' => 'required|array',
            'footer.title' => 'required|string|max:120',
            'footer.description' => 'required|string|max:500',
            'footer.email' => 'required|string|max:120',
            'footer.address' => 'required|string|max:255',
            'footer.copyright' => 'required|string|max:255',
            'footer.links' => 'required|array|min:1|max:8',
            'footer.links.*.label' => 'required|string|max:80',
            'footer.links.*.href' => 'required|string|max:255',
        ]);

        $content = SiteSetting::mergeWithDefaults($validated);

        $setting = SiteSetting::query()->updateOrCreate(
            ['key' => 'site_content'],
            ['value' => $content]
        );

        return response()->json($setting->value);
    }
}
