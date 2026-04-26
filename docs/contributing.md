# Đóng Góp Cho Website CTRL/C CLUB

Cảm ơn bạn đã quan tâm đóng góp vào website CTRL/C CLUB! Chúng tôi chào đón các đóng góp từ cộng đồng.

## Cách Đóng Góp

Có nhiều cách để đóng góp, bao gồm:

- Báo cáo lỗi
- Đề xuất tính năng mới
- Cải thiện tài liệu
- Viết mã nguồn
- Kiểm tra pull request

## Báo Cáo Lỗi

Trước khi gửi báo cáo lỗi, vui lòng kiểm tra xem vấn đề đã được báo cáo chưa bằng cách tìm kiếm trong [trình theo dõi vấn đề](https://github.com/your-repo/issues).

Nếu bạn tìm thấy lỗi chưa được báo cáo, vui lòng mở một issue với thông tin sau:

- Tiêu đề rõ ràng và mô tả
- Các bước để tái tạo vấn đề
- Hành vi mong đợi vs. hành vi thực tế
- Ảnh chụp màn hình hoặc video quay màn hình (nếu có)
- Môi trường của bạn (HĐH, phiên bản trình duyệt, v.v.)

## Đề Xuất Tính Năng

Các yêu cầu tính năng mới được chào đón! Vui lòng mở một issue với:

- Tiêu đề rõ ràng và mô tả
- Mô tả chi tiết về tính năng
- Vấn đề mà tính năng giải quyết
- Các khuyết tiềm tàng hoặc xem xét tiềm năng

## Có Nguyên Mã Đóng Góp

### Thiết Lập Môi Trường Phát Triển

1. Fork repository trên GitHub
2. Clone fork của bạn về local:
   ```bash
   git clone https://github.com/your-username/ctrlc-club.git
   cd ctrlc-club
   ```
3. Thiết lập remote upstream:
   ```bash
   git remote add upstream https://github.com/original-repo/ctrlc-club.git
   ```
4. Làm theo [Hướng dẫn phát triển](dev-guide.md) để thiết lập môi trường local của bạn.

### Làm Thay Đổi

1. Tạo một nhánh mới để thay đổi của bạn:
   ```bash
   git checkout -b feature-or-fix-description
   ```
2. Thực hiện các thay đổi của bạn, tuân thủ các [hướng dẫn về phong cách mã](#phong-cách-mã-nguồn).
3. Viết hoặc cập nhật test nếu cần thiết.
4. Đảm bảo tất cả các test đều qua:
   ```bash
   npm run test   # trong cả hai thư mục frontend và backend
   php artisan test   # trong thư mục backend
   ```
5. Cam kết các thay đổi của bạn:
   ```bash
   git commit -m "Thông báo cam kết mô tả"
   ```
6. Đẩy nhánh của bạn lên fork của bạn:
   ```bash
   git push origin feature-or-fix-description
   ```
7. Mở một pull request chống lại nhánh `main` của repository gốc.

### Hướng Dẫn Pull Request

- Giữ pull request của bạn tập trung vào một vấn đề hoặc tính năng duy nhất.
- Viết tiêu đề và mô tả rõ ràng, mô tả.
- Tham chiếu bất kỳ vấn đề liên quan nào trong mô tả (ví dụ: "Sửa lỗi #123").
- Đảm bảo mã của bạn qua tất cả các test và kiểm tra phong cách.
- Sẵn sàng nghe phản hồi và thực hiện thay đổi.

## Phong cách mã nguồn

Chúng tôi sử dụng:
- **ESLint** và **Prettier** cho frontend (JavaScript/TypeScript trong Next.js)
- **Laravel Pint** và **PHP_CodeSniffer** cho backend (PHP trong Laravel)

Để kiểm tra vấn đề về phong cách:
- Frontend: `npm run lint`
- Backend: `php artisan lint`

Để tự động sửa định dạng:
- Frontend: `npm run format`
- Backend: `php artisan pint`

## Tài liệu

Nếu đóng góp của bạn thay đổi cách website hoạt động, vui lòng cập nhật tài liệu thích ứng.

## Cộng đồng

Vui lòng tôn trọng và cân nhắc người khác khi đóng góp. Chúng tôi nhắm tới việc tạo ra một môi trường歡迎 và bao gồm tất cả mọi người.

## Giấy phép

Bằng cách đóng góp vào website CTRL/C CLUB, bạn đồng ý rằng đóng góp của bạn sẽ được cấp phép theo giấy phép MIT.
