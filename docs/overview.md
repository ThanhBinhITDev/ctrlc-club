# CTRL/C CLUB Website - Tổng Quan Dự Án

## Mục đích
Website cho CTRL/C CLUB để cung cấp thông tin, đăng ký sự kiện và diễn đàn thảo luận thành viên.

## Tính năng
- **Trang thông tin**: Giới thiệu về câu lạc bộ, lịch sử, sứ mệnh, liên hệ.
- **Hệ thống đăng ký sự kiện**: Thành viên có thể đăng ký tham gia workshops, talks, và hoạt động.
- **Diễn đàn thành viên**: Nơi thành viên chia sẻ kiến thức, đặt câu hỏi, và cộng tác.

## Đối tượng sử dụng
- **Thành viên CLB**: Người dùng chung xem sự kiện, đăng ký, và tham gia diễn đàn.
- **Quản trị viên**: Quản lý sự kiện, kiểm duyệt diễn đàn, cập nhật nội dung.
- **Đội phát triển**: Bảo trì và mở rộng website.

## Công nghệ đề xuất (để phát triển nhanh)
- **Frontend**: Next.js (React framework với SSR, SEO tốt, dễ deploy)
- **Backend**: Laravel (PHP framework mạnh mẽ, tốt cho API, ORM, auth)
- **Database**: MySQL (tích hợp tốt với Laravel)
- **Hosting**: Vercel (frontend) + AWS/Laravel Forge (backend) hoặc Docker trên bất kỳ VPS nào

## Cấu trúc dự án
```
ctrlc-club/
├── docs/                 # Tài liệu
├── frontend/             # Ứng dụng Next.js
├── backend/              # API Laravel
├── database/             # Schema cơ sở dữ liệu và migrations
└── README.md
```

## Bắt đầu
Xem [Hướng dẫn phát triển](dev-guide.md) để biết hướng dẫn cài đặt.

## Đóng góp
Vui lòng đọc [Hướng dẫn đóng góp](CONTRIBUTING.md) trước khi gửi pull request.

## Giấy phép
Dự án này được cấp phép dưới giấy phép MIT.
