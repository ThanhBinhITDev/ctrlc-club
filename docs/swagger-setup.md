# Hướng Dẫn Thiết Lập Swagger/OpenAPI

## Tổng Quan

Swagger/OpenAPI cung cấp tài liệu API tương tác cho dự án CTRL/C CLUB. Tích hợp Laravel với `darkaonline/l5-swagger` để tạo ra giao diện tài liệu API trực quan, hỗ trợ test endpoint trực tiếp từ trình duyệt.

---

## 1. Cài Đặt L5-Swagger

### 1.1 Cài Đặt Package

```bash
cd backend
composer require "darkaonline/l5-swagger:8.*"
```

### 1.2 Publish Config và Views

```bash
php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"
```

Lệnh này tạo các file:
- `config/l5-swagger.php` - Cấu hình Swagger
- `resources/views/vendor/l5-swagger/` - Views tùy chỉnh

---

## 2. Cấu Hình Swagger

### 2.1 File Config

`config/l5-swagger.php`:

```php
<?php

return [
    'defaults' => [
        'routes' => [
            'docs' => 'docs/api',
            'docs.asset' => 'vendor/l5-swagger/docs.asset',
            'docs.oauth2_callback' => 'docs/oauth2-callback',
            'api.documentation' => 'api/documentation',
            'api.versions' => 'api/versions',
        ],
    ],

    'documentations' => [
        'default' => [
            'api' => [
                'title' => 'CTRL/C CLUB API',
                'description' => 'API tài liệu cho website câu lạc bộ CTRL/C',
                'version' => 'v1.0.0',
                'base_url' => env('APP_URL', 'http://localhost:8000'),
                'license' => 'MIT',
                'license_url' => 'https://opensource.org/licenses/MIT',
            ],

            'routes' => [
                'docs' => 'docs/api',
                'docs.asset' => 'vendor/l5-swagger/docs.asset',
                'docs.oauth2_callback' => 'docs/oauth2-callback',
                'api.documentation' => 'api/documentation',
                'api.versions' => 'api/versions',
            ],

            'paths' => [
                'use_controllers' => false, // Sử dụng annotations
                'docs_json_file' => 'api-docs.json',
                'docs_yaml_file' => null,
                'format' => 'json',
                'graceful_exceptions' => env('L5_SWAGGER_GRACEFUL_EXCEPTIONS', true),
                'exception_class' => \L5Swagger\Models\Exception::class,
                'securityDefinitions' => [
                    'bearerAuth' => [
                        'type' => 'http',
                        'description' => 'Bearer token trong header Authorization',
                        'name' => 'Authorization',
                        'in' => 'header',
                        'scheme' => 'bearer',
                        'bearerFormat' => 'JWT',
                        'flow' => 'implicit',
                    ],
                ],
                'generate_always' => env('L5_SWAGGER_GENERATE_ALWAYS', false),
                'generate_yaml_copy' => env('L5_SWAGGER_GENERATE_YAML_COPY', false),
                'proxy' => false,
                'additional_config_url' => null,
                'operations_sort' => null,
            ],

            'annotations' => [
                'scan' => [
                    'paths' => [base_path('app/Http/Controllers')],
                    'exclude' => [],
                    'include' => [],
                    'examples' => base_path('storage/app/swagger-examples'),
                    'processors' => [],
                    'pattern' => null,
                    'recursive' => false,
                    'readers' => [
                        \L5Swagger\Readers\FileSystemReader::class,
                        \L5Swagger\Readers\RouteReader::class,
                    ],
                ],
            ],
        ],
    ],

    'generate_always' => env('L5_SWAGGER_GENERATE_ALWAYS', false),
    'generate_yaml_copy' => env('L5_SWAGGER_GENERATE_YAML_COPY', false),
    'proxy' => false,
    'additional_config_url' => null,
    'operations_sort' => null,

    'securityDefinitions' => [
        'bearerAuth' => [
            'type' => 'http',
            'description' => 'Bearer token trong header Authorization',
            'name' => 'Authorization',
            'in' => 'header',
            'scheme' => 'bearer',
            'bearerFormat' => 'JWT',
        ],
    ],

    'generate_always' => env('L5_SWAGGER_GENERATE_ALWAYS', true),

    'proxy' => false,
    'additional_config_url' => null,
    'operations_sort' => null,

    'security' => [],
];
```

### 2.2 Cấu Hình .env

Thêm vào file `.env` backend:

```env
# Swagger
L5_SWAGGER_GENERATE_ALWAYS=true
L5_SWAGGER_GRACEFUL_EXCEPTIONS=true
```

---

## 3. Viết OpenAPI Annotations

### 3.1 Cấu Trúc Annotation

Sử dụng PHPDoc annotations trong Controller để mô tả API:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

/**
 * @OA\Info(
 *     title="CTRL/C CLUB API",
 *     version="1.0.0",
 *     description="API quản lý câu lạc bộ CTRL/C"
 * )
 * 
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */
class EventController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/events",
     *     summary="Lấy danh sách sự kiện",
     *     tags={"Events"},
     *     security={},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Số trang",
     *         required=false,
     *         @OA\Schema(type="integer", default=1)
     *     ),
     *     @OA\Parameter(
     *         name="limit",
     *         in="query",
     *         description="Số mục mỗi trang",
     *         required=false,
     *         @OA\Schema(type="integer", default=10, maximum=100)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(ref="#/components/schemas/Event")
     *             ),
     *             @OA\Property(property="pagination", ref="#/components/schemas/Pagination")
     *         )
     *     )
     * )
     */
    public function index(Request $request)
    {
        $events = Event::with('user')
            ->orderBy('start_time', 'desc')
            ->paginate($request->get('limit', 10));

        return EventResource::collection($events);
    }

    /**
     * @OA\Get(
     *     path="/api/v1/events/{id}",
     *     summary="Lấy chi tiết sự kiện",
     *     tags={"Events"},
     *     security={},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID sự kiện",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", ref="#/components/schemas/Event")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Không tìm thấy"
     *     )
     * )
     */
    public function show($id)
    {
        $event = Event::with(['user', 'registrations'])->findOrFail($id);
        return new EventResource($event);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/events",
     *     summary="Tạo sự kiện mới",
     *     tags={"Events"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title","description","start_time","end_time","capacity"},
     *             @OA\Property(property="title", type="string", example="PHP Workshop"),
     *             @OA\Property(property="description", type="string", example="Learn PHP basics"),
     *             @OA\Property(property="start_time", type="string", format="date-time", example="2024-12-01T10:00:00Z"),
     *             @OA\Property(property="end_time", type="string", format="date-time", example="2024-12-01T12:00:00Z"),
     *             @OA\Property(property="capacity", type="integer", example=50),
     *             @OA\Property(property="location", type="string", example="Room 101")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Tạo thành công",
     *         @OA\JsonContent(ref="#/components/schemas/Event")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Chưa xác thực"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Dữ liệu không hợp lệ"
     *     )
     * )
     */
    public function store(StoreEventRequest $request)
    {
        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'capacity' => $request->capacity,
            'location' => $request->location,
            'user_id' => $request->user()->id,
        ]);

        return new EventResource($event);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/events/{id}/register",
     *     summary="Đăng ký tham gia sự kiện",
     *     tags={"Events"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID sự kiện",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Đăng ký thành công",
     *         @OA\JsonContent(
     *             @OA\Property(property="data",
     *                 @OA\Properties(
     *                     @OA\Property(property="event_id", type="integer"),
     *                     @OA\Property(property="user_id", type="integer"),
     *                     @OA\Property(property="status", type="string")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=409,
     *         description="Sự kiện đã đầy"
     *     )
     * )
     */
    public function register(Request $request, $id)
    {
        $event = Event::findOrFail($id);

        if ($event->isFull()) {
            return response()->json([
                'error' => 'Event is full',
            ], 409);
        }

        $registration = $event->registrations()->create([
            'user_id' => $request->user()->id,
            'status' => 'registered',
        ]);

        return response()->json([
            'data' => $registration,
        ], 201);
    }
}
```

### 3.2 Schema Definitions

Tạo file `app/Swagger/Schemas.php` để định nghĩa schemas tái sử dụng:

```php
<?php

return [
    'Event' => [
        'type' => 'object',
        'properties' => [
            'id' => ['type' => 'integer'],
            'title' => ['type' => 'string'],
            'description' => ['type' => 'string'],
            'start_time' => ['type' => 'string', 'format' => 'date-time'],
            'end_time' => ['type' => 'string', 'format' => 'date-time'],
            'capacity' => ['type' => 'integer'],
            'location' => ['type' => 'string'],
            'status' => ['type' => 'string'],
            'created_at' => ['type' => 'string', 'format' => 'date-time'],
        ],
    ],

    'Pagination' => [
        'type' => 'object',
        'properties' => [
            'page' => ['type' => 'integer'],
            'limit' => ['type' => 'integer'],
            'total' => ['type' => 'integer'],
            'pages' => ['type' => 'integer'],
        ],
    ],
];
```

### 3.3 Ví Dụ Đầy Đủ Controller

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

/**
 * @OA\Tag(name="Forum", description="API diễn đàn")
 */
class ForumController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/forum/posts",
     *     summary="Lấy danh sách bài viết",
     *     tags={"Forum"},
     *     security={},
     *     @OA\Parameter(
     *         name="category",
     *         in="query",
     *         description="Lọc theo danh mục",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Tìm kiếm theo tiêu đề/nội dung",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=200, description="Thành công")
     * )
     */
    public function index(Request $request)
    {
        $query = Post::query();

        if ($category = $request->get('category')) {
            $query->where('category', $category);
        }

        if ($search = $request->get('search')) {
            $query->whereFullText(['title', 'content'], $search);
        }

        $posts = $query->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return PostResource::collection($posts);
    }

    /**
     * @OA\Post(
     *     path="/api/v1/forum/posts",
     *     summary="Tạo bài viết mới",
     *     tags={"Forum"},
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"title","content"},
     *             @OA\Property(property="title", type="string"),
     *             @OA\Property(property="content", type="string")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Thành công")
     * )
     */
    public function store(StorePostRequest $request)
    {
        $post = $request->user()->posts()->create($request->validated());
        return new PostResource($post);
    }
}
```

---

## 4. Sinh Tài Liệu

### 4.1 Generate Swagger JSON

```bash
cd backend
php artisan l5-swagger:generate
```

Lệnh này tạo file `public/api-docs.json`.

### 4.2 Xem Tài Liệu

Mở trình duyệt truy cập:
```
http://localhost:8000/docs/api
```

Giao diện Swagger UI sẽ hiển thị tất cả API endpoints với khả năng:
- Xem chi tiết request/response
- Thực hiện test trực tiếp
- Xem schema models
- Tải xuống spec JSON/YAML

---

## 5. Tích Hợp Frontend

### 5.1 Sử Dụng OpenAPI Client

Tạo API client từ OpenAPI spec:

```bash
npm install @hey-api/openapi-ts -D
```

File `openapi.config.ts`:

```typescript
import type { Config } from '@hey-api/openapi-ts';

const config: Config = {
  input: {
    target: 'http://localhost:8000/api-docs.json',
  },
  output: {
    path: './src/lib/api',
    client: 'react-query',
  },
};

export default config;
```

Generate client:

```bash
npx @hey-api/openapi-ts --config openapi.config.ts
```

### 5.2 Sử Dụng Trong Components

```typescript
import { useGetEvents } from '@/lib/api';

function EventsPage() {
  const { data, isLoading } = useGetEvents({
    query: { page: 1, limit: 10 },
  });

  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.data.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

---

## 6. CI/CD Integration

### 6.1 GitHub Actions

File `.github/workflows/swagger.yml`:

```yaml
name: Generate Swagger Docs

on:
  push:
    branches: [ main ]
    paths:
      - 'backend/app/Http/Controllers/**'
      - 'backend/config/l5-swagger.php'

jobs:
  generate:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - name: Install dependencies
        working-directory: ./backend
        run: composer install

      - name: Generate Swagger
        working-directory: ./backend
        run: php artisan l5-swagger:generate

      - name: Commit docs
        run: |
          git config --global user.name 'github-actions'
          git config --global user.email 'actions@github.com'
          git add backend/public/api-docs.json
          git diff --cached --quiet || git commit -m 'Update Swagger docs'
          git push
```

### 6.2 Deploy to GitHub Pages

File `.github/workflows/deploy-docs.yml`:

```yaml
name: Deploy API Docs

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - name: Install dependencies
        working-directory: ./backend
        run: composer install --no-dev

      - name: Generate Swagger
        working-directory: ./backend
        run: php artisan l5-swagger:generate

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./backend/public
          destination_dir: api-docs
```

---

## 7. Best Practices

### 7.1 Annotation Guidelines

**DO:**
- Document all public API endpoints
- Specify request/response types
- Include examples
- Add error responses
- Use proper HTTP status codes
- Tag endpoints by feature

**DON'T:**
- Expose sensitive endpoints in production
- Duplicate documentation
- Leave incomplete annotations

### 7.2 Security

```php
/**
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT",
 *     description="Nhập token JWT nhận được sau khi đăng nhập"
 * )
 */
```

### 7.3 Versioning

Đặt version trong config:
```php
'version' => 'v1.0.0',
```

Khi có thay đổi breaking:
- Tạo version mới: `v2.0.0`
- Giữ version cũ để backward compatibility
- Document migration guide

---

## 8. Troubleshooting

### 8.1 Common Issues

**Issue**: Swagger UI không load CSS/JS
```
Solution: Chạy lệnh generate lại
php artisan l5-swagger:generate --force
```

**Issue**: Annotations không cập nhật
```
Solution: Clear cache
php artisan config:clear
php artisan cache:clear
php artisan l5-swagger:generate --force
```

**Issue**: Lỗi parse annotation
```
Solution: Kiểm tra cú pháp PHPDoc
- Đảm bảo tag đóng đúng */
- Không có ký tự đặc biệt
- PHPDoc block ngay trước method/class
```

### 8.2 Debug Mode

Bật debug trong `.env`:
```env
APP_DEBUG=true
L5_SWAGGER_GENERATE_ALWAYS=true
```

Kiểm tra log:
```bash
tail -f storage/logs/laravel.log
```

---

## 9. Resources

- [L5-Swagger Documentation](https://github.com/DarkaOnLine/L5-Swagger)
- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [Swagger Editor](https://editor.swagger.io/)

---

## 10. Conclusion

Tích hợp Swagger/OpenAPI mang lại:

✅ Tài liệu API tự động cập nhật
✅ Giao diện test trực quan
✅ Đồng bộ giữa code và docs
✅ Dễ dàng chia sẻ với team
✅ Hỗ trợ frontend generation

**Mục tiêu**: 100% API endpoints được document hóa với Swagger.