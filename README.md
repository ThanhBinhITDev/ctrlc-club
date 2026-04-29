# CTRL/C CLUB Website

Hệ thống website cho câu lạc bộ CTRL/C CLUB.

## Tính năng

- **Trang thông tin**: Giới thiệu về câu lạc bộ, lịch sử, sứ mệnh, liên hệ.
- **Hệ thống đăng ký sự kiện**: Thành viên có thể đăng ký tham gia workshops, talks, hoạt động.
- **Forum thảo luận**: Nơi thành viên trò chuyện, chia sẻ kiến thức, đặt câu hỏi.

## Công nghệ sử dụng

### Frontend
- **Next.js 14** - React framework với App Router, SSR, SSG, ISR
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling utility-first
- **Shadcn UI** - Component library hiện đại
- **React 18** - UI framework
- **React Query** - State management cho server data
- **Zustand** - State management client

### Backend
- **Laravel 11** - PHP framework mạnh mẽ
- **Eloquent ORM** - Database ORM
- **MySQL 8.0** - Hệ quản trị cơ sở dữ liệu
- **Laravel Sanctum** - Authentication (JWT + sessions)
- **Laravel WebSockets** - Real-time communication

### Real-time & Features
- **Pusher Protocol** - WebSocket protocol
- **Local Storage** - File uploads
- **File/Array Cache** - Caching đơn giản
- **MySQL Full-text Search** - Tìm kiếm
- **Laravel Localization** - Multi-language (EN/VI)

### Infrastructure & Operations
- **Dev Containers** - Môi trường phát triển chuẩn hóa
- **GitHub Actions** - CI/CD automation
- **PHPUnit** - Backend testing
- **Jest** - Frontend unit testing
- **Playwright** - E2E testing
- **Swagger/OpenAPI** - API documentation
- **Google Analytics 4** - Analytics

### Deployment
- **Vercel** - Frontend hosting
- **Laravel Forge** - Backend deployment (khuyến nghị)
- **Docker** - Containerization

## Tài liệu

Xem thư mục [docs/](./docs/) để biết thông tin chi tiết:

- [Hướng dẫn Onboarding](./docs/onboarding.md) - Hướng dẫn setup môi trường, cấu trúc source code, chạy test, debugging (Dành cho người mới)
- [Tổng quan dự án](./docs/overview.md) - Mô tả dự án, đối tượng, công nghệ
- [Hướng dẫn phát triển](./docs/dev-guide.md) - Cài đặt môi trường, cấu trúc project, scripts
- [Hướng dẫn thiết lập database](./docs/database-setup.md) - Cài đặt MySQL, kết nối, migration
- [Hướng dẫn đóng góp](./docs/contributing.md) - Quy trình đóng góp, báo cáo lỗi, gợi ý tính năng
- [Hướng dẫn API](./docs/api-guide.md) - Chi tiết endpoints, xác thực, xử lý lỗi, pagination
- [Sơ đồ luồng hệ thống](./docs/system-flow.md) - Sơ đồ luồng dữ liệu và chức năng chính
- [Kiến trúc chi tiết](./docs/architecture.md) - Kiến trúc frontend, backend, database, authentication, real-time
- [Chiến lược Testing](./docs/testing-strategy.md) - Testing comprehensive >80% coverage
- [Hướng dẫn Swagger](./docs/swagger-setup.md) - API documentation chuẩn OpenAPI 3.0

## Cài đặt nhanh

### Sử dụng Dev Containers (Khuyến nghị)

1. Clone repository
2. Mở trong VS Code
3. Click "Reopen in Container" khi được yêu cầu
4. Chờ VS Code tự động setup môi trường

Xem chi tiết mục Dev Containers trong [dev-guide.md](./docs/dev-guide.md).

### Cài đặt thủ công

1. Clone repository
2. Cài đặt dependencies cho frontend và backend
3. Thiết lập biến môi trường
4. Thiết lập database MySQL (xem [database-setup.md](./docs/database-setup.md))
5. Chạy server development

Xem chi tiết trong [dev-guide.md](./docs/dev-guide.md).

## Testing

Chúng tôi áp dụng chiến lược testing comprehensive với mục tiêu **>80% coverage**:

- **Frontend**: Jest + React Testing Library (unit tests)
- **Frontend**: Playwright (E2E tests)
- **Backend**: PHPUnit (unit & feature tests)
- **Coverage**: >80% lines, branches, functions

Xem chi tiết tại [testing-strategy.md](./docs/testing-strategy.md).

## CI/CD

- **GitHub Actions** - Tự động chạy tests trên mỗi PR
- **Coverage enforcement** - Chặn merge nếu coverage < 80%
- **Parallel testing** - Unit, feature, E2E chạy đồng thời
- **Auto-deploy** - Deploy khi pass tất cả checks

Xem chi tiết tại [dev-guide.md](./docs/dev-guide.md).

## Contributors

### Lead Developer
- **Thanh Binh** ([@ThanhBinhITDev](https://github.com/ThanhBinhITDev))

### AI Collaborators
- **Antigravity** (Google DeepMind) - Lead AI Architectural Support & System Design
- **Geminicli** - AI Development Support
- **Codex** - Logic & Feature Implementation
- **Claude** - Component Design & Optimization

## Giấy phép

Dự án này được cấp phép dưới giấy phép MIT.
<!-- AI-Contribution-Ref: Antigravity-Added -->
