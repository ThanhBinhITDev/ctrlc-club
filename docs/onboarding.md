# Hướng Dẫn Onboarding - Chuẩn Bị Trước Khi Vào Làm (Comprehensive)

## Mục Tiêu
Tài liệu này giúp người mới bắt đầu hiểu rõ cách thiết lập môi trường phát triển, cấu trúc source code chi tiết với Next.js 14 + Shadcn UI, Laravel 11, chiến lược testing (>80% coverage), Dev Containers setup, và các best practices của dự án CTRL/C CLUB Website.

---

## 1. Tổng Quan Dự Án

### 1.1 Mục Tiêu Dự Án
Xây dựng website cho câu lạc bộ CTRL/C CLUB với 3 tính năng cốt lõi:
- **Trang thông tin CLB**: Giới thiệu, lịch sử, sứ mệnh, liên hệ (ưu tiên hàng đầu)
- **Hệ thống đăng ký sự kiện**: Workshops, talks, hoạt động CLB
- **Diễn đàn thảo luận**: Chia sẻ kiến thức, Q&A, cộng tác

### 1.2 Quy Mô và Đặc Thù
- **Quy mô**: Dưới 1000 users (người dùng nội bộ CLB)
- **Đội ngũ**: 1-2 developer
- **Không có thanh toán**: Không tích hợp payment gateway
- **Ưu tiên**: Trang thông tin CLB trước, sau đó là events và forum
- **Environment**: Dev Containers / GitHub Codespaces

### 1.3 Tech Stack Chi Tiết

| Layer | Technology | Version | Mục Đích |
|-------|-----------|---------|----------|
| **Frontend** | Next.js 14 | 14.x | App Router, SSR, SSG, ISR |
| | TypeScript | 5.x | Type safety |
| | Tailwind CSS | 3.x | Styling |
| | Shadcn UI | 0.x | Component library |
| | React 18 | 18.x | UI framework |
| | React Query | 5.x | Server state |
| | Zustand | 4.x | Client state |
| **Backend** | Laravel | 11.x | PHP framework |
| | Eloquent ORM | - | Database ORM |
| | MySQL | 8.0+ | Database |
| **Real-time** | Laravel WebSockets | 1.x | WebSocket server |
| | Pusher | - | WebSocket protocol |
| **Auth** | Laravel Sanctum | - | JWT + sessions |
| **Storage** | Local storage | - | File uploads |
| **Cache** | Laravel Cache | - | File/Array driver |
| **Search** | DB Full-text | - | MySQL full-text search |
| **i18n** | Laravel Localization | - | Multi-language |
| **Testing** | PHPUnit | 10.x | Backend tests |
| | Playwright | 1.x | E2E tests |
| | Jest | 29.x | Unit tests (frontend) |
| **CI/CD** | GitHub Actions | - | Automation |
| **Analytics** | Google Analytics 4 | - | Analytics |
| **API Docs** | Swagger/OpenAPI | - | Documentation |

---

## 2. Môi Trường Yêu Cầu

### 2.1 Phần Cứng Tối Thiểu
- **RAM**: 16GB (khuyến nghị để chạy Docker, frontend, backend, database)
- **Ổ đĩa**: 20GB SSD trống (Docker images khá nặng)
- **Hệ điều hành**: macOS 12+, Ubuntu 22.04+, Windows 10/11 (64-bit)

### 2.2 Phần Mềm Yêu Cầu

#### Công Cụ Bắt Buộc
- **Git** (v2.30+)
```bash
git --version
```

- **Node.js** (v18.17+ LTS hoặc v20+)
```bash
node --version
npm --version
```

- **PHP** (v8.1+ LTS) - **Không cần cài local nếu dùng Dev Containers**
```bash
php --version
```

- **Composer** (v2.5+) - **Không cần cài local nếu dùng Dev Containers**
```bash
composer --version
```

- **Docker** (v24+) & **Docker Compose** (v2.20+)
```bash
docker --version
docker compose version
```

- **Git** (credential manager)
```bash
git config --global credential.helper store
```

#### Công Cụ Phát Triển
- **VS Code** (recommended) hoặc IDE hỗ trợ Dev Containers
- **Extensions VS Code:**
  - [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

#### Trình Duyệt
- Chrome/Edge (DevTools, Lighthouse)
- Firefox (tương thích)

#### Công Cụ Thêm
- **ngrok** (test webhook từ localhost)
- **Postman** hoặc **Thunder Client** (VS Code extension) - test API
- **MySQL Client** (TablePlus, DBeaver, hoặc MySQL Workbench)

### Kiểm Tra Điều Kiện Trước Bắt Đầu

Chạy các lệnh sau để xác nhận môi trường đã sẵn sàng:

```bash
# Kiểm tra Node.js
node --version && npm --version

# Kiểm tra PHP
php --version

# Kiểm tra Composer
composer --version

# Kiểm tra MySQL
mysql --version

# Kiểm tra Git
git --version

# Kiểm tra Docker
docker --version && docker compose version
```

> **⚠️ Lưu ý**: Nếu bất kỳ công cụ nào chưa được cài đặt, vui lòng tham khảo [Dev Guide](./dev-guide.md) hoặc [Database Setup](./database-setup.md) để cài đặt.

---

## 2. Cài Đặt Môi Trường Phát Triển

### Bước 1: Clone Repository

```bash
# Clone repository
git clone https://github.com/your-org/ctrlc-club.git
cd ctrlc-club

# Thêm remote upstream (nếu clone từ fork)
git remote add upstream https://github.com/original-repo/ctrlc-club.git
```

### Bước 2: Cấu Trúc Thư Mục Dự Án

```
ctrlc-club/
├── docs/                  # Tài liệu dự án (bạn đang đọc file này)
│   ├── onboarding.md      # Hướng dẫn setup và onboarding
│   ├── dev-guide.md       # Hướng dẫn phát triển
│   ├── database-setup.md  # Cài đặt database
│   ├── api-guide.md       # Tài liệu API
│   ├── contributing.md    # Quy trình đóng góp
│   └── architecture.md    # Kiến trúc hệ thống
├── frontend/              # Ứng dụng Next.js (Frontend)
│   ├── src/
│   │   ├── app/          # Pages & Layouts (App Router)
│   │   ├── components/   # UI Components tái sử dụng
│   │   ├── services/     # API client và service layer
│   │   ├── utils/        # Hàm tiện ích và helpers
│   │   ├── styles/       # CSS, SCSS, Tailwind config
│   │   └── lib/          # Thư viện và utilities tùy chỉnh
│   ├── public/           # Tài nguyên tĩnh (ảnh, fonts)
│   ├── tests/            # Test files (Jest + RTL)
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   └── .env.example
├── backend/               # Ứng dụng Laravel (Backend)
│   ├── app/
│   │   ├── Http/Controllers/  # Controllers xử lý request
│   │   ├── Models/           # Eloquent Models
│   │   ├── Services/         # Business logic layer
│   │   ├── Repositories/     # Data access layer
│   │   ├── Events/           # Event system
│   │   ├── Listeners/        # Event listeners
│   │   ├── Jobs/            # Queue jobs
│   │   ├── Middleware/      # Custom middleware
│   │   ├── Providers/       # Service providers
│   │   └── Utils/           # Hàm tiện ích
│   ├── database/
│   │   ├── migrations/     # Migration scripts
│   │   ├── seeders/        # Data seeders
│   │   └── factories/      # Model factories
│   ├── routes/            # Route definitions
│   ├── tests/             # PHPUnit tests
│   ├── .env.example
│   └── composer.json
├── database/               # Schema và scripts DB
│   ├── schemas/           # ER diagrams, schema docs
│   └── migrations/        # Migration chung (nếu có)
├── docker/                # Docker configs (nếu dùng)
├── scripts/               # Scripts tiện ích
├── .gitignore
└── README.md
```

### Bước 3: Cài Đặt Frontend (Next.js)

```bash
cd /path/to/ctrlc-club/frontend

# Cài dependencies
npm install

# Sao chép file .env
cp .env.example .env

# Cấu hình biến môi trường trong .env
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
# NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
```

### Bước 4: Cài Đặt Backend (Laravel)

```bash
cd /path/to/ctrlc-club/backend

# Cài dependencies PHP
composer install

# Sao chép file .env
cp .env.example .env

# Tạo application key
php artisan key:generate

# Cấu hình database trong .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=ctrlc_club
# DB_USERNAME=ctrlc_user
# DB_PASSWORD=your_password
```

### Bước 5: Thiết Lập Database

Xem chi tiết tại [database-setup.md](./database-setup.md)

```bash
# Tạo database và user
sudo mysql -u root -p
# Chạy các câu lệnh SQL để tạo database và user

# Chạy migration
cd backend
php artisan migrate

# Chạy seeder (optional)
php artisan db:seed
```

### Bước 6: Khởi Động Server

**Terminal 1 - Backend:**
```bash
cd backend
php artisan serve
# Server chạy tại http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Server chạy tại http://localhost:3000
```

**Terminal 3 - Queue Worker (nếu cần):**
```bash
cd backend
php artisan queue:work
```

### Bước 7: Xác Minh Cài Đặt

1. Truy cập http://localhost:3000 - Kiểm tra trang chủ frontend
2. Truy cập http://localhost:8000/api/v1/events - Kiểm tra API endpoint
3. Thực hiện test kết nối database:
```bash
cd backend
php artisan tinker
>>> Illuminate\Support\Facades\DB::connection()->getPDO();
```

---

## 3. Cấu Trúc Source Code Chi Tiết

### 3.1 Frontend (Next.js 13+ App Router)

#### `src/app/` - Pages và Layouts
```
app/
├── layout.tsx          # Root layout (wrapper chung)
├── page.tsx           # Trang chủ
├── events/
│   ├── page.tsx       # Danh sách sự kiện
│   └── [id]/page.tsx  # Chi tiết sự kiện
├── forum/
│   ├── page.tsx       # Danh sách bài viết
│   └── [id]/page.tsx  # Chi tiết bài viết
├── profile/           # Hồ sơ người dùng
└── api/               # Route Handlers (API routes)
```

**Best Practices:**
- Sử dụng Server Components mặc định để giảm tải client-side
- Sử dụng `use client` directive chỉ khi cần interactivity
- Tận dụng Next.js Image component cho tối ưu hóa ảnh
- Implement loading states với `loading.tsx`

#### `src/components/` - UI Components

```
components/
├── ui/                # Components giao diện cơ bản
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Form.tsx
│   └── Modal.tsx
├── layout/            # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
├── features/          # Components theo feature
│   ├── events/
│   │   ├── EventCard.tsx
│   │   └── EventList.tsx
│   └── forum/
│       ├── PostCard.tsx
│       └── CommentList.tsx
└── shared/            # Components dùng chung
```

**Best Practices:**
- Đặt tên component theo PascalCase
- Sử dụng TypeScript cho type safety
- Extract props interface ra riêng
- Sử dụng composition pattern thay vì prop drilling

#### `src/services/` - API Client

```
services/
├── api.ts             # Axios instance config
├── auth.service.ts    # Auth API calls
├── event.service.ts   # Event API calls
├── forum.service.ts   # Forum API calls
└── user.service.ts    # User API calls
```

**Best Practices:**
- Sử dụng Axios interceptor cho auth token
- Implement retry logic cho failed requests
- Type-safe API responses với TypeScript
- Centralize error handling

#### `src/utils/` - Utilities

```
utils/
├── format.ts          # Format date, currency, etc.
├── validate.ts        # Validation functions
├── constants.ts       # App constants
└── helpers.ts         # Helper functions
```

### 3.2 Backend (Laravel)

#### `app/Http/Controllers/` - Controllers

```
Http/Controllers/
├── Api/
│   ├── AuthController.php
│   ├── EventController.php
│   ├── ForumController.php
│   └── UserController.php
└── Controller.php     # Base controller
```

**Best Practices:**
- Sử dụng Resource controllers
- Implement Request validation (FormRequest classes)
- Tránh logic trong controller - delegate to Services
- Sử dụng API Resource cho response formatting

#### `app/Models/` - Eloquent Models

```
Models/
├── User.php
├── Event.php
├── Post.php
├── Comment.php
└── Registration.php
```

**Best Practices:**
- Define relationships rõ ràng
- Sử dụng accessors và mutators
- Implement model scopes cho reusable queries
- Bảo vệ attributes với `$fillable` hoặc `$guarded`

#### `app/Services/` - Business Logic

```
Services/
├── EventService.php
├── ForumService.php
├── AuthService.php
└── NotificationService.php
```

**Best Practices:**
- Single Responsibility Principle
- Inject dependencies qua constructor
- Return DTOs hoặc mảng thay vì raw models
- Write unit tests cho service layer

#### `app/Repositories/` - Data Access Layer

```
Repositories/
├── BaseRepository.php
├── EventRepository.php
└── ForumRepository.php
```

**Best Practices:**
- Abstract database queries
- Implement repository pattern cho testability
- Cache frequent queries
- Sử dụng criteria pattern cho complex filters

#### `database/migrations/` - Schema Definitions

**Best Practices:**
- Sử dụng foreign keys constraint
- Index foreign keys và frequent query columns
- Timestamps cho tất cả bảng audit
- Soft deletes cho dữ liệu quan trọng

---

## 4. Chạy Test và Kiểm Chất Lượng

### 4.1 Frontend Testing (Jest + React Testing Library)

#### Cấu trúc test files:
```
src/
├── components/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── __snapshots__/
└── ...
```

#### Chạy tests:
```bash
# Chạy tất cả tests
npm run test

# Chạy tests với watch mode
npm run test -- --watch

# Chạy tests với coverage
npm run test -- --coverage

# Chạy tests cho file cụ thể
npm run test -- Button.test.tsx
```

#### Viết tests:

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('should render button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Best Practices:**
- Test behavior, không implementation details
- Arrange-Act-Assert pattern
- Mock external dependencies
- Test edge cases và error states

### 4.2 Backend Testing (PHPUnit)

#### Cấu trúc test files:
```
tests/
├── Feature/
│   ├── EventTest.php
│   └── AuthTest.php
├── Unit/
│   ├── EventServiceTest.php
│   └── UserTest.php
└── TestCase.php
```

#### Chạy tests:
```bash
# Chạy tất cả tests
php artisan test

# Chạy tests cho thư mục cụ thể
php artisan test tests/Feature

# Chạy tests cho file cụ thể
php artisan test tests/Feature/EventTest.php

# Chạy tests với filter
php artisan test --filter=test_user_can_register
```

#### Viết tests:

```php
// EventTest.php
namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EventTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function authenticated_user_can_create_event()
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user, 'sanctum')->postJson('/api/v1/events', [
            'title' => 'Test Event',
            'description' => 'Event description',
            'date' => now()->addDays(7)->toDateString(),
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('events', ['title' => 'Test Event']);
    }
}
```

**Best Practices:**
- Sử dụng model factories cho test data
- RefreshDatabase trait cho test isolation
- Test HTTP status codes
- Test database assertions
- Test authorization logic

### 4.3 Code Quality Checks

#### Frontend Linting:
```bash
# Check linting issues
npm run lint

# Auto-fix formatting
npm run format
```

#### Backend Linting:
```bash
# Check PHP code style
php artisan lint

# Auto-fix formatting
php artisan pint
```

#### Chạy trước khi commit:
```bash
# Frontend
npm run lint && npm run test

# Backend
php artisan lint && php artisan test
```

---

## 5. Debugging và Troubleshooting

### 5.1 Frontend Debugging

#### Chrome DevTools

**Console Logging:**
```typescript
// Simple log
console.log('Component rendered', data);

// Debug object
console.table(items);

// Performance timing
console.time('api-call');
await fetchData();
console.timeEnd('api-call');
```

**Breakpoints:**
- Sử dụng `debugger` statement trong code
- Mở DevTools (F12) → Sources tab → Set breakpoints
- Sử dụng conditional breakpoints

**React DevTools:**
- Cài đặt extension Chrome React DevTools
- Inspect component props và state
- Profiler tab để check performance

#### Common Issues:

**CORS Error:**
```
Access to fetch at 'http://localhost:8000/api/v1/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Giải pháp:**
- Backend: Cấu hình CORS trong Laravel
```php
// config/cors.php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
```

**API Not Found (404):**
```
GET http://localhost:3000/api/v1/events 404
```

**Giải pháp:**
- Kiểm tra proxy config trong `next.config.js`
- Đảm bảo backend server đang chạy
- Kiểm tra URL trong service files

**Hydration Mismatch:**
```
Warning: Text content did not match...
```

**Giải pháp:**
- Tránh render conditionally trong SSR
- Sử dụng `useEffect` cho client-side only logic
- Check thời gian render server vs client

### 5.2 Backend Debugging

#### Laravel Telescope (nếu cài đặt)

```bash
# Truy cập http://localhost:8000/telescope
# Monitor requests, queries, errors, logs
```

#### Laravel Debugbar (nếu cài đặt)

- Xem SQL queries, execution time
- Mỗi request hiển thị debug bar

#### Logging

```php
// Log đơn giản
\Log::info('User registered', ['user_id' => $user->id]);

// Log error
\Log::error('Payment failed', [
    'error' => $e->getMessage(),
    'trace' => $e->getTraceAsString()
]);

// Log debug
\Log::debug('Query executed', ['sql' => $query, 'bindings' => $bindings]);
```

**Xem log:**
```bash
# Xem log real-time
tail -f storage/logs/laravel.log

# Tìm error cụ thể
grep -i "error" storage/logs/laravel.log

# Xem log ngày hôm nay
grep "$(date +%Y-%m-%d)" storage/logs/laravel.log
```

#### Database Debugging

```php
// Enable query log
\DB::enableQueryLog();

// Run queries...

// Dump queries
\DB::getQueryLog();

// Log all queries
event(\Illuminate\Database\Events\QueryExecuted::class, function ($query) {
    \Log::info($query->sql, ['bindings' => $query->bindings]);
});
```

#### Tinker (REPL)

```bash
php artisan tinker

# Test model
>>> $user = App\Models\User::first();
>>> $user->name
=> "John Doe"

# Test relationship
>>> $user->events()->count();
=> 5

# Test query
>>> App\Models\Event::where('status', 'active')->get();
```

#### Common Issues:

**Database Connection Error:**
```
SQLSTATE[HY000] [2002] Connection refused
```

**Giải pháp:**
```bash
# Kiểm tra MySQL đang chạy
sudo systemctl status mysql

# Khởi động lại MySQL
sudo systemctl restart mysql

# Kiểm tra file .env
cat .env | grep DB_
```

**Migration Error:**
```
Base table or view already exists: 1050 Table
```

**Giải pháp:**
```bash
# Rollback và chạy lại
php artisan migrate:rollback
php artisan migrate

# Force migrate
php artisan migrate:fresh
```

**CSRF Token Mismatch:**
```
The CSRF token is missing
```

**Giải pháp:**
- API routes: Sử dụng `api.php` không cần CSRF
- Web routes: Thêm CSRF token vào form
- SPA: Cấu hình sanctum/csrf-cookie

### 5.3 Network Debugging

#### Check port listening:
```bash
# Mac/Linux
lsof -i :3000
lsof -i :8000

# Linux
netstat -tulpn | grep 3000
```

#### Kill process on port:
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Linux
fuser -k 3000/tcp
```

#### Test API endpoint:
```bash
# GET request
curl http://localhost:8000/api/v1/events

# POST request
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# With auth header
curl http://localhost:8000/api/v1/events \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 6. Best Practices và Coding Standards

### 6.1 Frontend Best Practices

#### Component Design
1. **Single Responsibility**: Mỗi component một chức năng
2. **Composition over Inheritance**: Dùng children prop và composition
3. **Props Interface**: Định nghĩa TypeScript interface cho props

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick
}) => { ... };
```

#### State Management
- **Local state**: `useState`, `useReducer`
- **Global state**: Context API hoặc Zustand/Redux
- **Server state**: React Query hoặc SWR

```typescript
// Sử dụng React Query cho API calls
const { data, isLoading, error } = useQuery({
  queryKey: ['events'],
  queryFn: fetchEvents
});
```

#### Performance
- **React.memo()** cho expensive components
- **useCallback()** cho stable function references
- **useMemo()** cho expensive calculations
- **Lazy loading** routes với `loading.tsx`
- **Code splitting** tự động Next.js

#### SEO
- Sử dụng `next-seo` package
- Meta tags trong từng page
- Open Graph tags cho social media

```typescript
// app/layout.tsx
export const metadata = {
  title: 'CTRL/C CLUB',
  description: 'Website câu lạc bộ CTRL/C',
  openGraph: {
    title: 'CTRL/C CLUB',
    description: 'Website câu lạc bộ CTRL/C',
    images: ['/og-image.jpg'],
  },
};
```

### 6.2 Backend Best Practices

#### Laravel Conventions

**Naming:**
- Models: Singular PascalCase (`User`, `Event`)
- Controllers: Plural PascalCase (`UsersController`)
- Routes: kebab-case (`/api/v1/user-events`)
- Database tables: plural snake_case (`user_events`)
- Migrations: snake_case with timestamp (`create_events_table`)

**Code Structure:**
```php
// Good: Thin controller, fat service
class EventController extends Controller
{
    public function __construct(
        private EventService $eventService
    ) {}

    public function store(StoreEventRequest $request)
    {
        $event = $this->eventService->create($request->validated());
        
        return new EventResource($event);
    }
}
```

#### Eloquent Best Practices

**Relationships:**
```php
class User extends Model
{
    // One-to-Many
    public function events()
    {
        return $this->hasMany(Event::class);
    }

    // Many-to-Many
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    // Accessor
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    // Scope
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
```

**Query Optimization:**
```php
// Bad: N+1 problem
$events = Event::all();
foreach ($events as $event) {
    echo $event->user->name; // N queries
}

// Good: Eager loading
$events = Event::with('user')->get(); // 1 query total
```

#### Security Best Practices

**Input Validation:**
```php
class StoreEventRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date|after:today',
            'capacity' => 'required|integer|min:1|max:500',
        ];
    }
}
```

**SQL Injection Prevention:**
```php
// Bad: Raw query with concatenation
DB::select("SELECT * FROM users WHERE id = " . $request->id);

// Good: Parameterized query
DB::select("SELECT * FROM users WHERE id = ?", [$request->id]);

// Best: Eloquent query builder
User::where('id', $request->id)->first();
```

**XSS Prevention:**
```php
// Blade auto-escapes by default
{{ $user->name }} <!-- Safe -->

// Avoid unescaped output
{!! $user->name !!} <!-- Dangerous -->

// Purify HTML input
use Illuminate\Support\Facades\Purifier;
$clean = Purifier::clean($dirtyHtml);
```

**CSRF Protection:**
```php
// Web routes automatically get CSRF protection
Route::post('/events', [EventController::class, 'store']);

// API routes don't need CSRF (use Sanctum tokens)
Route::post('/events', [EventController::class, 'store'])->middleware('auth:sanctum');
```

### 6.3 Git Workflow và Commit Standards

#### Branch Naming
```
feature/add-user-registration
fix/login-validation-error
hotfix/security-patch
hotfix/security-patch
refactor/database-migration
```

#### Commit Message Format
```
type(scope): description

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Formatting, missing semi-colons, etc (no code change)
- `refactor`: Code refactoring (no bug fix or feature)
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**
```
feat(events): add event registration system

- Users can register for events
- Admin can manage event capacity
- Email notifications on registration

Fixes #123

fix(auth): resolve login validation error

- Fix email validation regex
- Add password strength check
```

#### Pre-commit Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated for new code
- [ ] All existing tests pass
- [ ] Documentation updated (if applicable)
- [ ] No console.log statements in production code
- [ ] No sensitive data (API keys, passwords) committed

### 6.4 Database Best Practices

#### Migration Rules
```php
class CreateEventsTable extends Migration
{
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('capacity')->default(50);
            $table->foreignId('created_by')->constrained('users');
            $table->softDeletes(); // Soft delete support
            $table->timestamps(); // created_at, updated_at
            
            // Indexes for frequent queries
            $table->index('start_time');
            $table->index('created_by');
        });
    }
}
```

**Rules:**
- Always use `foreignId()` for relationships
- Add `timestamps()` to all tables
- Use `softDeletes()` for important data
- Index foreign keys and frequent query columns
- Use descriptive migration names

---

## 7. Phát Triển Đặc Biệt (Special Development)

### 7.1 Real-time Features (WebSocket)

Sử dụng Laravel WebSockets hoặc Pusher cho real-time features:

**Cài đặt:**
```bash
composer require beyondcode/laravel-websockets
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider"
php artisan migrate
```

**Sử dụng trong frontend:**
```typescript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  wsHost: window.location.hostname,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});

// Subscribe to channel
echo.channel('forum')
  .listen('NewPost', (e) => {
    console.log('New post created:', e.post);
  });
```

### 7.2 File Uploads

**Tối đa 10MB cho ảnh:**
```php
// Validation
$request->validate([
    'image' => 'required|image|max:10240', // 10MB in KB
]);

// Store
$path = $request->file('image')->store('events', 'public');
```

**Frontend component:**
```typescript
const FileUpload: React.FC<{ onUpload: (url: string) => void }> = ({ onUpload }) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    onUpload(data.url);
  };

  return <input type="file" accept="image/*" onChange={handleChange} />;
};
```

### 7.3 Email Notifications

**Laravel Mail:**
```php
// Event registration notification
class EventRegistered extends Notification
{
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Bạn đã đăng ký sự kiện thành công')
            ->greeting('Chào ' . $notifiable->name)
            ->line('Bạn đã đăng ký tham gia sự kiện.')
            ->action('Xem chi tiết', url('/events/' . $this->event->id))
            ->line('Cảm ơn bạn đã tham gia!');
    }
}
```

---

## 8. Troubleshooting FAQ

### Q1: Lỗi "Module not found" khi cài đặt frontend
**A:** Xóa `node_modules` và `package-lock.json`, sau đó chạy `npm install` lại:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Q2: Backend không connect được database
**A:** Kiểm tra file `.env`:
```bash
cd backend
cat .env | grep DB_
# Đảm bảo DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD chính xác
```

### Q3: Lỗi CORS khi gọi API từ frontend
**A:** Cấu hình CORS trong Laravel:
```bash
# Cài package Laravel CORS
composer require fruitcake/laravel-cors

# Hoặc cấu hình trong config/cors.php
```

### Q4: Test không chạy được
**A:** Đảm bảo đã cài dependencies test:
```bash
# Frontend
cd frontend
npm install --save-dev jest @testing-library/react

# Backend (đã có sẵn với Laravel)
cd backend
composer install --dev
```

### Q5: Port 3000 hoặc 8000 đã được sử dụng
**A:** Chạy lệnh kill process:
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9
```

---

## 9. Tài Nguyên Hữu Ích

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Laravel Docs](https://laravel.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)
- [Laravel Telescope](https://laravel.com/docs/telescope)

### Code Standards
- [PHP-FIG PSR Standards](https://www.php-fig.org/psr/)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

---

## 10. Liên Hệ và Hỗ Trợ

### Kênh hỗ trợ
- **Slack/Discord**: `#dev-support` channel
- **GitHub Issues**: [Tạo issue mới](https://github.com/your-org/ctrlc-club/issues)
- **Mentor**: Liên hệ với Senior Dev được phân công

### Onboarding Session
- **Thời gian**: Hàng tuần, Thứ 3 lúc 14:00
- **Link**: [Calendar Invite]
- **Agenda**: Demo project, Q&A, pair programming

---

## ✅ Checklist Onboarding

- [ ] Đọc tài liệu này
- [ ] Cài đặt môi trường (Node, PHP, MySQL)
- [ ] Clone repository
- [ ] Cài đặt Frontend dependencies
- [ ] Cài đặt Backend dependencies
- [ ] Thiết lập database
- [ ] Khởi động server thành công
- [ ] Truy cập được http://localhost:3000
- [ ] Truy cập được http://localhost:8000/api/v1/events
- [ ] Chạy được test đầu tiên
- [ ] Đọc [API Guide](./api-guide.md)
- [ ] Đọc [Dev Guide](./dev-guide.md)

**Chúc mừng! Bạn đã sẵn sàng để bắt đầu phát triển cho CTRL/C CLUB! 🎉**