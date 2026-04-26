# Hướng Dẫn API Cho Website CTRL/C CLUB

## URL cơ bản
Tất cả các endpoint API có tiền tố `/api/v1`.

## Xác thực
Hầu hết các endpoint yêu cầu xác thực. Bao gồm token JWT trong header Authorization:
```
Authorization: Bearer <token>
```

## Vai trò và Quyền (RBAC)

### Các Vai Trò
- **Super-Admin**: Quyền cao nhất, quản trị toàn hệ thống (chủ nhiệm)
- **Admin**: Quản lý nội dung, thành viên, sự kiện (phó chủ nhiệm, trưởng ban)
- **Moderator**: Quản lý diễn đàn, duyệt bài viết (phó chủ nhiệm truyền thông)
- **Member**: Thành viên thường, quyền cơ bản
- **Guest**: Khách chưa đăng ký

### Phân Quyền Chi Tiết
- **Super-Admin**: Toàn quyền trên mọi tính năng (UI config, navigation, user management, role assignment)
- **Admin**:
  - Quản lý người dùng (ngoại trừ super-admin)
  - Tạo/sửa/xóa sự kiện
  - Cập nhật UI config và navigation
  - Xem báo cáo thống kê
- **Moderator**:
  - Duyệt/biên tập bài viết forum
  - Quản lý comment
  - Xóa bài viết vi phạm
  - Quản lý categories forum
- **Member**:
  - Đăng ký/rút sự kiện
  - Tạo bài viết forum
  - Cập nhật profile

## Endpoints

### Vai trò và Quyền (Roles & Permissions)
- `GET /api/v1/roles` - Liệt kê tất cả vai trò (admin only)
- `GET /api/v1/roles/:id` - Lấy chi tiết vai trò (admin only)
- `POST /api/v1/roles` - Tạo vai trò mới (super-admin only)
- `PUT /api/v1/roles/:id` - Cập nhật vai trò (super-admin only)
- `DELETE /api/v1/roles/:id` - Xóa vai trò (super-admin only)
- `GET /api/v1/roles/:id/permissions` - Lấy quyền của vai trò
- `PUT /api/v1/roles/:id/permissions` - Cập nhật quyền vai trò (super-admin only)

### Quản lý Thành viên CLB (Club Members)
- `GET /api/v1/club/members` - Liệt kê thành viên CLB (admin+)
- `POST /api/v1/club/members` - Bổ nhiệm user thành thành viên CLB (admin+)
- `GET /api/v1/club/members/:id` - Lấy thông tin chi tiết thành viên CLB
- `PUT /api/v1/club/members/:id` - Cập nhật chức vụ/thông tin thành viên (theo phân cấp)
- `DELETE /api/v1/club/members/:id` - Xóa tên khỏi danh sách CLB (giữ lại tài khoản user)

### Chức vụ CLB (Club Positions)
- `GET /api/v1/club/positions` - Liệt kê các chức vụ
- `POST /api/v1/club/positions` - Tạo chức vụ mới (super-admin only)
- `PUT /api/v1/club/positions/:id` - Cập nhật chức vụ (super-admin only)
- `DELETE /api/v1/club/positions/:id` - Xóa chức vụ (super-admin only)

### Người dùng (Users)
- `GET /api/v1/users/me` - Lấy hồ sơ người dùng hiện tại
- `PUT /api/v1/users/me` - Cập nhật hồ sơ người dùng hiện tại
- `GET /api/v1/users/:id` - Lấy người dùng theo ID (chỉ admin)
- `GET /api/v1/users` - Liệt kê tất cả người dùng (chỉ admin, bao gồm cả user thường và thành viên CLB)
- `POST /api/v1/users` - Tạo người dùng mới (chỉ admin)
- `PUT /api/v1/users/:id` - Cập nhật người dùng (chỉ admin)
- `DELETE /api/v1/users/:id` - Xóa người dùng (chỉ admin)
- `PUT /api/v1/users/:id/role` - Gán vai trò cho người dùng (chỉ admin)
- `GET /api/v1/users/:id/permissions` - Lấy quyền của người dùng

### Giao diện (UI Config)
- `GET /api/v1/ui-config` - Lấy cấu hình giao diện hiện tại (theme, colors, layouts)
- `PUT /api/v1/ui-config` - Cập nhật cấu hình giao diện (chỉ super-admin)
- `GET /api/v1/ui-config/sections` - Lấy tất sections giao diện
- `PUT /api/v1/ui-config/sections/:section` - Cập nhật section giao diện (chỉ super-admin)

### Điều hướng (Navigation)
- `GET /api/v1/nav/menu` - Lấy menu điều hướng (sidebar/navbar)
- `PUT /api/v1/nav/menu` - Cập nhật menu điều hướng (chỉ super-admin)
- `GET /api/v1/nav/items` - Lấy danh sách item điều hướng
- `POST /api/v1/nav/items` - Tạo item điều hướng mới (chỉ super-admin)
- `PUT /api/v1/nav/items/:id` - Cập nhật item điều hướng (chỉ super-admin)
- `DELETE /api/v1/nav/items/:id` - Xóa item điều hướng (chỉ super-admin)
- `POST /api/v1/nav/reorder` - Sắp xếp lại menu (chỉ super-admin)

### Sự kiện (Events)
- `GET /api/v1/events` - Liệt kê tất cả sự kiện (có lọc, sắp xếp, phân trang)
- `GET /api/v1/events/:id` - Chi tiết sự kiện
- `POST /api/v1/events` - Tạo sự kiện mới (admin+)
- `PUT /api/v1/events/:id` - Cập nhật sự kiện (admin+)
- `DELETE /api/v1/events/:id` - Xóa sự kiện (admin+)
- `POST /api/v1/events/:id/register` - Đăng ký tham gia sự kiện
- `DELETE /api/v1/events/:id/register` - Hủy đăng ký sự kiện

### Diễn đàn (Forum)
- `GET /api/v1/forum/posts` - Liệt kê bài viết diễn đàn (có lọc, sắp xếp, phân trang)
- `GET /api/v1/forum/posts/:id` - Lấy bài viết diễn đàn
- `POST /api/v1/forum/posts` - Tạo bài viết diễn đàn mới
- `PUT /api/v1/forum/posts/:id` - Cập nhật bài viết diễn đàn (tác giả hoặc admin+)
- `DELETE /api/v1/forum/posts/:id` - Xóa bài viết diễn đàn (tác giả hoặc admin+)
- `POST /api/v1/forum/posts/:id/pin` - Ghim bài viết (admin+)
- `POST /api/v1/forum/posts/:id/lock` - Khóa bài viết (admin+)
- `POST /api/v1/forum/posts/:id/comments` - Thêm bình luận vào bài viết
- `PUT /api/v1/forum/posts/:id/comments/:commentId` - Cập nhật bình luận (tác giả hoặc admin+)
- `DELETE /api/v1/forum/posts/:id/comments/:commentId` - Xóa bình luận (tác giả hoặc admin+)
- `POST /api/v1/forum/categories` - Tạo danh mục forum (chỉ admin)
- `PUT /api/v1/forum/categories/:id` - Cập nhật danh mục forum (chỉ admin)
- `DELETE /api/v1/forum/categories/:id` - Xóa danh mục forum (chỉ admin)

### Thông báo (Notifications)
- `GET /api/v1/notifications` - Lấy danh sách thông báo
- `PUT /api/v1/notifications/:id/read` - Đánh dấu đã đọc
- `PUT /api/v1/notifications/read-all` - Đánh dấu tất cả đã đọc
- `DELETE /api/v1/notifications/:id` - Xóa thông báo

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
Để cập nhật thời gian thực, chúng tôi sử dụng WebSocket tại `/ws` (Laravel WebSockets).

URL kết nối: `ws://your-domain.com/ws` (hoặc `wss` cho HTTPS)

Sự kiện:
- `forum:new_post` - Khi một bài viết diễn đàn mới được tạo
- `forum:post_updated` - Khi bài viết được cập nhật
- `event:registration_update` - Khi người đăng ký tham gia sự kiện bạn quan tâm
- `notification:new` - Khi bạn nhận được thông báo mới
- `ui:config_changed` - Khi cấu hình giao diện được cập nhật

### Xác thực WebSocket
Client phải gửi token JWT khi kết nối:
```javascript
const socket = new WebSocket('ws://your-domain.com/ws');
socket.onopen = () => {
  socket.send(JSON.stringify({
    event: 'pusher:subscribe',
    data: {
      channel: 'private-user.' + userId,
      auth: {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }
    }
  }));
};
```

### Kênh
- `private-user.{userId}` - Thông báo riêng tư cho user
- `presence-online` - Trạng thái online của thành viên
- `forum-updates` - Cập nhật diễn đàn