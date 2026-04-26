## Điều hướng và Giao diện (Navigation & UI)

### Navigation Manager
Hệ thống quản lý menu động qua API.

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