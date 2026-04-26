# Hướng Dẫn API Cho Website CTRL/C CLUB

## URL cơ bản
Tất cả các endpoint API có tiền tố `/api/v1`.

## Xác thực
Hầu hết các endpoint yêu cầu xác thực. Bao gồm token JWT trong header Authorization:
```
Authorization: Bearer <token>
```

## Endpoints

### Xác thực (Auth)
- `POST /api/v1/auth/register` - Đăng ký người dùng mới
- `POST /api/v1/auth/login` - Đăng nhập và nhận token
- `POST /api/v1/auth/logout` - Đăng xuất

### Người dùng (Users)
- `GET /api/v1/users/me` - Lấy hồ sơ người dùng hiện tại
- `PUT /api/v1/users/me` - Cập nhật hồ sơ người dùng hiện tại
- `GET /api/v1/users/:id` - Lấy người dùng theo ID (chỉ admin)
- `GET /api/v1/users` - Liệt kê người dùng (chỉ admin, có phân trang)

### Sự kiện (Events)
- `GET /api/v1/events` - Liệt kê tất cả sự kiện (có lọc, sắp xếp, phân trang)
- `GET /api/v1/events/:id` - Chi tiết sự kiện
- `POST /api/v1/events` - Tạo sự kiện mới (chỉ admin)
- `PUT /api/v1/events/:id` - Cập nhật sự kiện (chỉ admin)
- `DELETE /api/v1/events/:id` - Xóa sự kiện (chỉ admin)
- `POST /api/v1/events/:id/register` - Đăng ký tham gia sự kiện
- `DELETE /api/v1/events/:id/register` - Hủy đăng ký sự kiện

### Diễn đàn (Forum)
- `GET /api/v1/forum/posts` - Liệt kê bài viết diễn đàn (có lọc, sắp xếp, phân trang)
- `GET /api/v1/forum/posts/:id` - Lấy bài viết diễn đàn
- `POST /api/v1/forum/posts` - Tạo bài viết diễn đàn mới
- `PUT /api/v1/forum/posts/:id` - Cập nhật bài viết diễn đàn (tác giả hoặc admin chỉ)
- `DELETE /api/v1/forum/posts/:id` - Xóa bài viết diễn đàn (tác giả hoặc admin chỉ)
- `POST /api/v1/forum/posts/:id/comments` - Thêm bình luận vào bài viết
- `PUT /api/v1/forum/posts/:id/comments/:commentId` - Cập nhật bình luận (tác giả hoặc admin chỉ)
- `DELETE /api/v1/forum/posts/:id/comments/:commentId` - Xóa bình luận (tác giả hoặc admin chỉ)

### Sản phẩm (nếu áp dụng)
- `GET /api/v1/merchandise` - Liệt kê các mặt hàng merchandise
- `GET /api/v1/merchandise/:id` - Chi tiết mặt hàng merchandise
- `POST /api/v1/merchandise` - Tạo merchandise mới (chỉ admin)
- `PUT /api/v1/merchandise/:id` - Cập nhật merchandise (chỉ admin)
- `DELETE /api/v1/merchandise/:id` - Xóa merchandise (chỉ admin)

## Phản hồi lỗi
Tất cả lỗi trả về một đối tượng JSON có dạng:
```json
{
  "error": {
    "message": "Thông báo lỗi dễ đọc",
    "code": "MÃ_LỖI",
    "details": {} // Chi tiết bổ sung (tùy chọn)
  }
}
```

## Giới hạn tốc độ
Yêu cầu API bị giới hạn ở 100 yêu cầu mỗi 15 phút mỗi IP. Các header:
- `X-RateLimit-Limit`: Số lượng yêu cầu tối đa được phép trong cửa sổ hiện tại
- `X-RateLimit-Remaining`: Số lượng yêu cầu còn lại trong cửa sổ hiện tại
- `X-RateLimit-Reset`: Thời gian cửa sổ giới hạn tốc độ được đặt lại (giây epoch UTC)

## Phiên bản
API được phiên bản trong URL (`/api/v1/`). Các thay đổi ngắt kết nối sẽ dẫn đến phiên bản mới.

## Phân trang
Các endpoint trả về danh sách hỗ trợ phân trang qua các tham số truy vấn:
- `page`: Số trang (mặc định: 1)
- `limit`: Số mục mỗi trang (mặc định: 10, tối đa: 100)

Phản hồi bao gồm:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Sắp xếp
Sử dụng tham số truy vấn `sort` để sắp xếp kết quả. Định dạng: `field:direction` (ví dụ: `sort=createdAt:desc`). Nhiều trường có thể được chỉ định bằng cách lặp lại tham số.

## Lọc
Nhiều endpoint hỗ trợ lọc. Các tham số lọc thay đổi tùy thuộc vào endpoint và được ghi lại trong mô tả endpoint cụ thể.

## WebSocket (Tính năng thời gian thực)
Để cập nhật thời gian thực (ví dụ: bài viết diễn đàn mới), chúng tôi sử dụng WebSocket tại `/ws`.

URL kết nối: `ws://your-domain.com/ws` (hoặc `wss` cho HTTPS)

Sự kiện:
- `forum:new_post` - Khi một bài viết diễn đàn mới được tạo
- `event:registration_update` - Khi người đăng ký tham gia sự kiện bạn quan tâm
- `notification:new` - Khi bạn nhận được một thông báo mới
