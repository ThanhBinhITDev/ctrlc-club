<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class SiteSetting extends Model
{
    protected $fillable = [
        'key',
        'value',
    ];

    protected function casts(): array
    {
        return [
            'value' => 'array',
        ];
    }

    public static function defaultSiteContent(): array
    {
        return [
            'theme' => [
                'background' => '#f4efe6',
                'foreground' => '#182228',
                'muted' => '#5e6a70',
                'surface' => 'rgba(255, 255, 255, 0.78)',
                'surface_strong' => '#fffdf8',
                'line' => 'rgba(24, 34, 40, 0.12)',
                'brand' => '#c85a2e',
                'brand_deep' => '#8f3517',
                'accent' => '#256b60',
                'accent_soft' => '#dceeea',
            ],
            'brand' => [
                'name' => 'CTRL/C CLUB',
                'mark' => 'C/C',
                'tagline' => 'Build / Share / Lead',
                'description' => 'Cong dong hoc tap va xay dung san pham cho sinh vien yeu cong nghe',
            ],
            'navigation' => [
                ['label' => 'Gioi thieu', 'href' => '/#gioi-thieu'],
                ['label' => 'Hoat dong', 'href' => '/#hoat-dong'],
                ['label' => 'Van hoa', 'href' => '/#van-hoa'],
                ['label' => 'Lien he', 'href' => '/#lien-he'],
            ],
            'hero' => [
                'eyebrow' => 'Ctrl/C Club',
                'title' => 'Noi thanh vien cung hoc ky luat lam san pham, khong chi hoc code.',
                'description' => 'Chung toi xay dung mot moi truong de sinh vien luyen ky nang ky thuat, van hanh nhom, va tu duy trach nhiem thong qua workshop, du an noi bo va cac hoat dong cong dong.',
                'primary_cta_label' => 'Vao he thong quan tri',
                'primary_cta_url' => '/login',
                'secondary_cta_label' => 'Xem hoat dong noi bat',
                'secondary_cta_url' => '/#hoat-dong',
                'stats' => [
                    ['value' => '50+', 'label' => 'thanh vien tham gia hoat dong'],
                    ['value' => '12', 'label' => 'chu de workshop co the trien khai'],
                    ['value' => '3', 'label' => 'nhom trong tam van hanh song song'],
                ],
            ],
            'spotlight' => [
                'label' => 'Mua hoat dong',
                'title' => 'Sprint xay dung noi luc',
                'focus' => 'Frontend, backend, van hanh noi bo',
                'format' => 'Workshop + pairing + task force',
                'goal' => 'Moi thanh vien co san pham va vai tro ro rang',
                'priorities' => [
                    'Xay dung san pham noi bo cho CLB va khoa',
                    'To chuc workshop, sharing, onboarding cho thanh vien moi',
                    'Van hanh he thong quan tri, tai lieu va quy trinh lam viec',
                ],
            ],
            'introduction' => [
                'section_id' => 'gioi-thieu',
                'cards' => [
                    [
                        'icon' => 'layers3',
                        'title' => 'Workshop thuc chien',
                        'description' => 'Cac buoi hoc theo du an, tu web co ban den quy trinh deploy va van hanh.',
                    ],
                    [
                        'icon' => 'users',
                        'title' => 'Van hoa peer-learning',
                        'description' => 'Thanh vien hoc cung nhau, review code, chia se kinh nghiem va keo nhau cung tien.',
                    ],
                    [
                        'icon' => 'shield-check',
                        'title' => 'Moi truong co trach nhiem',
                        'description' => 'Ranh mach trong vai tro, nhung luon uu tien tinh than ho tro va tin cay.',
                    ],
                ],
            ],
            'activities' => [
                'section_id' => 'hoat-dong',
                'label' => 'Hoat dong',
                'title' => 'Lo trinh hoc tap gan voi van hanh that.',
                'description' => 'Moi giai doan deu huong thanh vien vao mot ket qua ro rang: hieu he thong, lam viec co quy trinh, va co kha nang ban giao san pham trong nhom.',
                'items' => [
                    [
                        'index' => '01',
                        'title' => 'Onboarding theo vai tro',
                        'description' => 'Thanh vien moi duoc dan vao dung nhom, dung tai lieu va cach lam viec phu hop thay vi tu boi tuong.',
                    ],
                    [
                        'index' => '02',
                        'title' => 'Workshop va phien pairing',
                        'description' => 'Tac vu duoc tach nho, co nguoi dong hanh, co review sau moi buoi de giu nhiet hoc tap lien tuc.',
                    ],
                    [
                        'index' => '03',
                        'title' => 'Du an noi bo co deadline',
                        'description' => 'Thanh vien thuc hanh tu khau len y tuong, chia viec, trien khai, test, ghi tai lieu den demo.',
                    ],
                ],
            ],
            'culture' => [
                'section_id' => 'van-hoa',
                'label' => 'Van hoa lam viec',
                'items' => [
                    [
                        'title' => 'Ro rang',
                        'description' => 'Viec nao, deadline nao, nguoi nao chiu trach nhiem deu duoc noi minh bach.',
                    ],
                    [
                        'title' => 'Ho tro',
                        'description' => 'Khong de thanh vien moi tu xoay mot minh; review va pairing la mac dinh.',
                    ],
                    [
                        'title' => 'Tien bo',
                        'description' => 'Moi hoat dong deu nham den nang luc that, khong dung o muc tham gia cho co.',
                    ],
                ],
            ],
            'contact' => [
                'section_id' => 'lien-he',
                'label' => 'San sang mo rong',
                'title' => 'Day la bo khung tot de tiep tuc them su kien, forum va quy trinh thanh vien.',
                'description' => 'Phan public da co huong noi dung ro, con khu admin da san cho viec tiep tuc them module quan ly va du lieu that.',
                'cta_label' => 'Mo dashboard',
                'cta_url' => '/admin',
            ],
             'footer' => [
                'title' => 'CTRL/C CLUB',
                'description' => 'Noi ket noi sinh vien yeu cong nghe thong qua du an, workshop va van hoa lam viec tu te.',
                'email' => 'hello@ctrlcclub.com',
                'address' => 'Phong sinh hoat CLB, khuon vien truong',
                'copyright' => 'CTRL/C CLUB. All rights reserved.',
                'links' => [
                    ['label' => 'Dang nhap', 'href' => '/login'],
                    ['label' => 'Dashboard', 'href' => '/admin'],
                    ['label' => 'Gioi thieu', 'href' => '/#gioi-thieu'],
                ],
            ],
            'typography' => [
                'fontFamily' => [
                    'heading' => 'be-vietnam-pro',
                    'body' => 'inter',
                ],
            ],
        ];
    }

    public static function siteContent(): array
    {
        if (!Schema::hasTable('site_settings')) {
            return static::defaultSiteContent();
        }

        $record = static::query()->where('key', 'site_content')->first();

        return static::mergeWithDefaults($record?->value ?? []);
    }

    public static function mergeWithDefaults(array $content): array
    {
        return array_replace_recursive(static::defaultSiteContent(), $content);
    }
}
