### User Models
- **User**: Cơ sở cho việc xác thực, lưu trữ email, mật khẩu.
- **ClubMember**: Mở rộng từ `User` dành riêng cho thành viên CLB, lưu trữ chức vụ, ban và thông tin sinh viên.
- **ClubPosition**: Định nghĩa các chức vụ và cấp bậc (Level) trong CLB.

### Database Extensions
- Bổ sung bảng `club_positions` để quản lý danh mục chức vụ.
- Bổ sung bảng `club_members` để quản lý hồ sơ và phân cấp thành viên.
- Sử dụng RBAC để phân tách quyền lợi giữa `Club-Member` và `External-User`.

### Quản lý Thành viên (Member Management)
Hệ thống cung cấp hai giao diện quản lý riêng biệt:
1. **User Management**: Quản lý tất cả tài khoản người dùng đã đăng ký hệ thống (bao gồm cả khách và thành viên CLB).
2. **Club Management**: Giao diện chuyên sâu dành cho Ban Chủ nhiệm để quản lý chức vụ, ban bệ và phân cấp trong nội bộ CLB.


#### Cấu trúc Menu Item
```json
{
  "id": "string",
  "label": "string",
  "key": "string",
  "type": "link|dropdown|divider",
  "icon": "lucide-react icon name",
  "path": "/url",
  "children": [...],
  "roles": ["admin", "moderator"],
  "order": 0,
  "active": true,
  "target": "_self|_blank"
}
```

#### API Endpoints
- `GET /api/v1/nav/menu` - Lấy menu (cached, role-based filtering)
- `PUT /api/v1/nav/menu` - Cập nhật menu (chỉ super-admin)
- `GET /api/v1/ui-config` - Cấu hình giao diện (theme, colors, layout)

### Sidebar (Desktop)
- Collapsible trên desktop (expand/collapse)
- Fixed position, sticky top
- Hiển thị: Logo, navigation items, user menu
- Ẩn các item không có permission

### Navbar (Top)
- Responsive trên mobile
- Search bar, notifications, user profile
- Breadcrumbs khi cần
- Mobile hamburger menu

### Dynamic Rendering
- Menu được fetch từ API (có cache Redis 1h)
- Filter role-based client-side
- Real-time update qua WebSocket khi có thay đổi
- SWR để revalidate khi focus window