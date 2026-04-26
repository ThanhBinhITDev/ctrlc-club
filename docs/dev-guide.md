# Hướng Dẫn Phát Triển Website CTRL/C CLUB

## Tổng Quan

Hướng dẫn này cung cấp cách thiết lập môi trường phát triển cho dự án CTRL/C CLUB Website sử dụng công nghệ: Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, Laravel 11, MySQL, Laravel Sanctum, Laravel WebSockets.

## Cài Đặt Môi Trường - Dev Containers (Khuyến nghị)

### 1. Yêu Cầu Hệ Thống
- **Docker** (v24+) & **Docker Compose** (v2.20+)
- **VS Code** + Extension "Remote - Containers"
- Không cần cài Node.js, PHP, MySQL local

### 2. Bật Dev Containers Trong VS Code

**Cách 1: Tự Động**
1. Mở project trong VS Code
2. Khi có thông báo "Reopen in Container", click chọn
3. VS Code sẽ build và khởi chạy container

**Cách 2: Command Palette**
1. Mở VS Code → `Ctrl+Shift+P`
2. Gõ "Remote-Containers: Reopen in Container"
3. Chọn "Reopen in Container"

**Cách 3: Clone và Mở**
```bash
git clone <repo-url> ctrlc-club
cd ctrlc-club
code .
# Nhấn "Reopen in Container" khi VS Code hiển thị
```

### 3. Cấu Trúc Dev Container

```
.devcontainer/
├── devcontainer.json          # Cấu hình container
├── Dockerfile                 # Dockerfile build
├── docker-compose.yml         # Dịch vụ (app + db + redis)
└── post-create.sh            # Script setup sau khi tạo
```

### 4. Dev Container Config

File `.devcontainer/devcontainer.json`:

```json
{
  "name": "CTRL/C CLUB Development",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  "features": {
    "ghcr.io/devcontainers/features/node:1": {
      "version": "lts/*"
    },
    "ghcr.io/devcontainers/features/php:1": {
      "version": "8.1",
      "extensions": [
        "pdo", "pdo_mysql", "mbstring",
        "openssl", "curl", "xml", "zip"
      ]
    }
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "bmewburn.vscode-intelephense-client",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "eamodio.gitlens"
      ]
    }
  },
  "postCreateCommand": "bash .devcontainer/post-create.sh"
}
```

### 5. Docker Compose

`.devcontainer/docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build:
      context: ..
      dockerfile: .devcontainer/Dockerfile
    volumes:
      - ..:/workspace:cached
      - node_modules:/workspace/frontend/node_modules
      - vendor:/workspace/backend/vendor
    environment:
      - NODE_ENV=development
    command: sleep infinity
    networks:
      - ctrlc-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: ctrlc_club
      MYSQL_USER: ctrlc_user
      MYSQL_PASSWORD: ctrlc_password
      MYSQL_ROOT_PASSWORD: root_password
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - ctrlc-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      timeout: 20s
      retries: 10

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - ctrlc-network

volumes:
  mysql_data:
  node_modules:
  vendor:

networks:
  ctrlc-network:
    driver: bridge
```

### 6. Post-Create Script

`.devcontainer/post-create.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Setting up development environment..."

# Setup Frontend
echo "📦 Installing frontend dependencies..."
cd /workspace/frontend
npm install

# Setup Backend
echo "📦 Installing backend dependencies..."
cd /workspace/backend
composer install

# Wait for database
echo "🐳 Waiting for database..."
until mysql -h db -u ctrlc_user -pctrlc_password ctrlc_club -e "SELECT 1" > /dev/null 2>&1; do
  sleep 2
done

# Run migrations
echo "🗄️  Running database migrations..."
php artisan migrate

# Seed database
echo "🌱 Seeding database..."
php artisan db:seed

echo "✅ Development environment setup complete!"
```

---

## Cài Đặt Manual (Không Dùng Dev Containers)

### 1. Điều Kiện Tối Thiểu
- **Node.js** (v18.17+ LTS hoặc v20+)
- **npm** (v9+)
- **PHP** (v8.1+ LTS)
- **Composer** (v2.5+)
- **MySQL** (v8.0+)

### 2. Clone Repository

```bash
git clone <repository-url>
cd ctrlc-club
```

### 3. Cài Đặt Frontend

```bash
cd frontend

# Cài dependencies
npm install

# Cài Shadcn UI
npx shadcn@latest init
npx shadcn@latest add card button input form badge dialog toast
npx shadcn@latest add dropdown-menu navigation-menu skeleton

# Khởi chạy dev server
npm run dev
```

### 4. Cài Đặt Backend

```bash
cd backend

# Cài dependencies
composer install

# Cài Laravel Sanctum
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Cài Laravel WebSockets
composer require beyondcode/laravel-websockets
php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider"

# Copy .env
cp .env.example .env

# Generate key
php artisan key:generate

# Cấu hình database trong .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ctrlc_club
DB_USERNAME=root
DB_PASSWORD=

# Run migrations
php artisan migrate
php artisan db:seed
```

### 5. Cài Đặt Database

Xem [database-setup.md](database-setup.md) để biết chi tiết.

```bash
# Tạo database và user
mysql -u root -p

CREATE DATABASE ctrlc_club CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ctrlc_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON ctrlc_club.* TO 'ctrlc_user'@'localhost';
FLUSH PRIVILEGES;
```

### 6. Chạy Server

**Terminal 1 - Backend:**
```bash
cd backend
php artisan serve
# Server: http://localhost:8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Server: http://localhost:3000
```

**Terminal 3 - WebSocket (tùy chọn):**
```bash
cd backend
php artisan websockets:serve
```

---

## Cấu Trúc Dự Án

### Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── app/                      # App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Trang chủ
│   │   ├── about/page.tsx       # Trang thông tin CLB
│   │   ├── events/
│   │   │   ├── page.tsx        # Danh sách sự kiện
│   │   │   └── [id]/page.tsx   # Chi tiết sự kiện
│   │   ├── forum/
│   │   │   ├── page.tsx        # Diễn đàn
│   │   │   └── [id]/page.tsx   # Chi tiết bài viết
│   │   └── auth/               # Trang đăng nhập/đăng ký
│   ├── components/              # Components
│   │   ├── ui/                  # Shadcn UI
│   │   ├── layout/              # Layout components
│   │   └── features/            # Feature components
│   ├── services/                # API services
│   ├── stores/                  # Zustand stores
│   ├── hooks/                   # Custom hooks
│   ├── types/                   # TypeScript types
│   └── lib/                     # Utilities
├── public/                      # Static assets
└── .env.local                   # Environment
```

### Backend (`backend/`)

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/Auth/        # Auth controllers
│   │   │   ├── EventController.php
│   │   │   ├── ForumController.php
│   │   │   └── UserController.php
│   │   ├── Requests/            # Form requests
│   │   ├── Middleware/          # Custom middleware
│   │   └── Kernel.php
│   ├── Models/                  # Eloquent models
│   ├── Services/                # Business logic
│   ├── Repositories/            # Data access
│   ├── Events/                  # Domain events
│   ├── Listeners/               # Event listeners
│   ├── Jobs/                    # Queue jobs
│   └── Providers/               # Service providers
├── database/
│   ├── migrations/              # Schema migrations
│   ├── seeders/                 # DB seeders
│   └── factories/               # Model factories
├── routes/
│   ├── api.php                  # API routes
│   ├── web.php                  # Web routes
│   └── channels.php             # Broadcast channels
├── storage/
│   └── app/public/              # Uploads
└── tests/
    ├── Feature/                 # Feature tests
    └── Unit/                    # Unit tests
```

---

## Scripts Có Sẵn

### Frontend

```bash
# Development
npm run dev              # Khởi chạy dev server (port 3000)

# Production
npm run build            # Build cho production
npm run start            # Khởi chạy production server

# Testing
npm run test             # Chạy unit tests (Jest)
npm run test:watch       # Watch mode
npm run test:update      # Update snapshots
npm run e2e              # Chạy E2E tests (Playwright)

# Linting & Formatting
npm run lint             # ESLint check
npm run format           # Prettier format
```

### Backend

```bash
# Development
php artisan serve        # Khởi chạy dev server (port 8000)

# Database
php artisan migrate      # Chạy migrations
php artisan migrate:fresh # Xóa và chạy lại migrations
php artisan db:seed      # Chạy seeders
php artisan tinker       # REPL console

# Testing
php artisan test         # Chạy tất cả tests
php artisan test --filter=Unit      # Chỉ unit tests
php artisan test --filter=Feature   # Chỉ feature tests

# Queue & Jobs
php artisan queue:work               # Chạy queue worker
php artisan schedule:run             # Chạy scheduled tasks

# Optimization
php artisan optimize         # Tối ưu autoloader
php artisan config:cache     # Cache config
php artisan route:cache      # Cache routes
php artisan view:cache       # Cache views

# WebSockets
php artisan websockets:serve        # Chạy WebSocket server
php artisan websockets:statistics   # Xem statistics

# Linting
php artisan lint           # PHP Sniffer
php artisan pint           # Code style fixer
php artisan pint --test    # Check without fixing
```

---

## CI/CD Pipeline (GitHub Actions)

### 1. Workflow Overview

File `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  NODE_VERSION: '20'
  PHP_VERSION: '8.2'

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: testing
        ports:
          - 3306:3306
      
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: ${{ env.PHP_VERSION }}
          extensions: mbstring, pdo, pdo_mysql
          coverage: xdebug

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Cache Composer deps
        uses: actions/cache@v3
        with:
          path: backend/vendor
          key: php-${{ env.PHP_VERSION }}-${{ hashFiles('**/composer.lock') }}

      - name: Cache Node modules
        uses: actions/cache@v3
        with:
          path: frontend/node_modules
          key: node-${{ env.NODE_VERSION }}-${{ hashFiles('**/package-lock.json') }}

      - name: Install backend dependencies
        working-directory: ./backend
        run: composer install --no-progress --no-interaction

      - name: Install frontend dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Run migrations
        working-directory: ./backend
        run: php artisan migrate
        env:
          DB_CONNECTION: mysql
          DB_HOST: 127.0.0.1
          DB_DATABASE: testing
          DB_USERNAME: root
          DB_PASSWORD: root

      - name: Run PHPUnit tests
        working-directory: ./backend
        run: php artisan test --coverage --min=80

      - name: Run Jest tests
        working-directory: ./frontend
        run: npm run test -- --coverage --passWithNoTests

      - name: Run E2E tests
        working-directory: ./frontend
        run: npm run e2e
        env:
          BASE_URL: http://localhost:3000
```

### 2. Test Coverage Enforcement

**Backend (PHPUnit):**
```xml
<!-- phpunit.xml -->
<coverage processUncoveredFiles="true" min="80">
    <!-- ... -->
</coverage>
```

**Frontend (Jest):**
```json
// jest.config.ts
"coverageThreshold": {
  "global": {
    "branches": 80,
    "functions": 80,
    "lines": 80,
    "statements": 80
  }
}
```

### 3. Deployment (Manual)

**Frontend (Vercel):**
```bash
cd frontend
vercel --prod
```

**Backend (Forge/Laravel Forge):**
```bash
# Connect to Forge
# Push to main branch → Auto-deploy
```

### 4. Local Deployment

```bash
# Frontend
cd frontend
npm run build
npm run start

# Backend
cd backend
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan serve --host=0.0.0.0 --port=8000
```

---

## Quy Chuẩn Mã Nguồn

### Frontend

**ESLint & Prettier:**
- Sử dụng Airbnb JavaScript Style Guide
- Prettier tự động format khi save
- ESLint check trước khi commit

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vits",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

**Lint Check:**
```bash
npm run lint    # Check issues
npm run format  # Auto-fix
```

### Backend

**Laravel Pint:**
- PSR-12 coding standard
- PHP 8.1+ syntax
- Type declarations

```bash
php artisan lint    # Check issues
php artisan pint    # Auto-fix
```

**PHPStan (Optional):**
```bash
composer require --dev phpstan/phpstan
./vendor/bin/phpstan analyse
```

---

## Kiểm Thử (Testing)

### 1. Frontend Testing

**Unit Tests (Jest + React Testing Library):**
```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Coverage Target:** >80% lines, branches, functions

**E2E Tests (Playwright):**
```bash
npm run e2e               # Run all E2E tests
npm run e2e:ui             # UI mode
npm run e2e:headed         # Watch mode
```

### 2. Backend Testing

**PHPUnit:**
```bash
php artisan test                     # Run all tests
php artisan test --filter=Unit       # Unit tests only
php artisan test --filter=Feature    # Feature tests only
php artisan test --coverage          # With coverage
```

**Coverage Target:** >80% lines, >75% branches

### 3. Test Data

**Factories:**
```php
// database/factories/EventFactory.php
Event::factory()->count(10)->create();
```

**Seeders:**
```bash
php artisan db:seed          # Run seeders
php artisan db:seed --class=EventSeeder  # Specific seeder
```

---

## Troubleshooting

### Issue: Docker không chạy được
**Solution:**
```bash
# Restart Docker
sudo systemctl restart docker

# Check Docker status
docker info
```

### Issue: Port 3000/8000 đã được sử dụng
**Solution:**
```bash
# Mac/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9

# Windows
taskkill /F /PID $(Get-NetTCPConnection -LocalPort 3000).OwningProcess
```

### Issue: Database connection failed
**Solution:**
```bash
# Check MySQL status
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql

# Check .env config
cat backend/.env | grep DB_
```

### Issue: Node modules conflict
**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Composer dependencies error
**Solution:**
```bash
cd backend
rm -rf vendor composer.lock
composer clear-cache
composer install
```

### Issue: Tests fail due to coverage < 80%
**Solution:**
1. Xem coverage report:
```bash
# Frontend
npm run test -- --coverage
open coverage/lcov-report/index.html

# Backend
php artisan test --coverage
open bootstrap/clover-report/index.html
```

2. Thêm tests cho các dòng chưa cover

---

## Git Workflow

### 1. Branch Naming
```
feature/add-user-registration
fix/login-validation
hotfix/security-patch
refactor/database-migration
```

### 2. Commit Message
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

### 3. Pre-commit Checklist
- [ ] Code được lint (ESLint/Pint)
- [ ] Tests pass (Jest/PHPUnit)
- [ ] Coverage ≥ 80%
- [ ] Không có console.log trong production code
- [ ] Documentation được cập nhật
- [ ] Không có sensitive data (API keys)

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Laravel Docs](https://laravel.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Shadcn UI Docs](https://ui.shadcn.com/docs)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Laravel Debugbar](https://github.com/barryvdh/laravel-debugbar)
- [Postman](https://www.postman.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Support
- **Slack/Discord:** `#dev-support` channel
- **GitHub Issues:** [Tạo issue mới](https://github.com/your-org/ctrlc-club/issues)
- **Mentor:** Liên hệ với Senior Dev được phân công
