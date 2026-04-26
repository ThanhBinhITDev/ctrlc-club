# Hướng dẫn Triển khai & Chạy dự án CTRL/C CLUB

Tài liệu này hướng dẫn cách cài đặt môi trường và nạp dữ liệu (seed data) khi bạn chạy dự án ở máy mới hoặc deploy lên server.

## 1. Yêu cầu hệ thống
*   **PHP** >= 8.2 & **Composer**
*   **Node.js** >= 18 & **npm**
*   **SQLite** (Đã được cấu hình mặc định, không cần cài server riêng)

---

## 2. Các bước thiết lập Backend (Laravel)

Di chuyển vào thư mục backend:
```bash
cd backend
```

### Bước 1: Cài đặt thư viện
```bash
composer install
```

### Bước 2: Cấu hình môi trường (.env)
Nếu chưa có file `.env`, hãy tạo mới từ file mẫu:
```bash
cp .env.example .env
php artisan key:generate
```

### Bước 3: Khởi tạo Database và Nạp dữ liệu (QUAN TRỌNG)
Để tạo các bảng và nạp dữ liệu mẫu (Admin, Chức vụ CLB, Thành viên demo), bạn chạy lệnh sau:

**Cách 1: Xóa hết làm lại từ đầu (Khuyên dùng khi máy mới):**
```bash
php artisan migrate:fresh --seed --seeder=ClubSeeder
```
*Lệnh này sẽ xóa mọi bảng cũ, tạo lại bảng mới và nạp dữ liệu từ file `ClubSeeder.php`.*

**Cách 2: Chỉ nạp thêm dữ liệu mẫu (nếu đã có bảng):**
```bash
php artisan db:seed --class=ClubSeeder
```

### Bước 4: Chạy server backend
```bash
php artisan serve
```
Server sẽ chạy tại: `http://127.0.0.1:8000`

---

## 3. Các bước thiết lập Frontend (Next.js)

Di chuyển vào thư mục frontend:
```bash
cd ../frontend
```

### Bước 1: Cài đặt thư viện
```bash
npm install
```

### Bước 2: Chạy server frontend
```bash
npm run dev
```
Giao diện sẽ chạy tại: `http://localhost:3000`

---

## 4. Danh sách tài khoản thử nghiệm (Sau khi nạp dữ liệu)

Sau khi chạy lệnh `db:seed`, bạn có thể sử dụng các tài khoản sau để kiểm tra:

| Vai trò | Email | Mật khẩu |
| :--- | :--- | :--- |
| **Chủ nhiệm (Admin)** | `admin@ctrlcclub.com` | `password` |
| **Thành viên CLB** | `member@ctrlcclub.com` | `password` |
| **Thành viên khách** | `normal@gmail.com` | `password` |

---

## 5. Lưu ý khi Deploy (Sản xuất)

1.  **SQLite**: File database nằm tại `backend/database/database.sqlite`. Đừng quên cấp quyền ghi cho thư mục `database` và `storage` trên server.
2.  **MySQL**: Nếu muốn dùng MySQL thay vì SQLite, hãy sửa các dòng `DB_...` trong file `.env` của backend.
3.  **Dữ liệu**: Lệnh `ClubSeeder` được thiết kế để nạp các chức vụ "cứng" (Level 1-5). Bạn nên chạy nó ngay khi deploy lần đầu để hệ thống có khung chức vụ sẵn.
4.  **CORS**: Đảm bảo cấu hình đúng URL của Frontend trong `backend/config/cors.php` hoặc `.env` để không bị chặn API.
