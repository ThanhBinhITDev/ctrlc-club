# Hướng Dẫn Thiết Lập Cơ Sở Dữ Liệu Cho Website CTRL/C CLUB

## Lựa chọn cơ sở dữ liệu
Với backend Laravel, chúng tôi đề xuất sử dụng **MySQL** vì:
- Tích hợp tốt với Laravel qua Eloquent ORM
- Hiệu suất tốt, ổn định
- Dễ dàng thiết lập và bảo trì
- Nhiều tài liệu và cộng đồng hỗ trợ

## Cài đặt MySQL

### Trên macOS (sử dụng Homebrew)
```bash
brew install mysql
brew services start mysql
```

### Trên Ubuntu
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

### Trên Windows
Tải xuống và cài đặt từ https://dev.mysql.com/downloads/installer/
Trong quá trình cài đặt, chọn để启动 MySQL làm service.

## Bảo mật lần đầu cài đặt MySQL
Sau khi cài đặt, chạy script bảo mật:
```bash
sudo mysql_secure_installation
```
Làmตาม hướng dẫn để:
- Đặt mật khẩu cho user root
- Xóa user ẩn danh
- Vô hiệu hóa đăng nhập root từ xa (nếu không cần)
- Xóa database test
- Tải lại bảng privilege

## Tạo database và user cho Laravel

1. Đăng nhập vào MySQL với tư cách root:
   ```bash
   sudo mysql -u root -p
   ```

2. Tạo database:
   ```sql
   CREATE DATABASE ctrlc_club CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. Tạo user và cấp quyền:
   ```sql
   CREATE USER 'ctrlc_user'@'localhost' IDENTIFIED BY 'your_strong_password';
   GRANT ALL PRIVILEGES ON ctrlc_club.* TO 'ctrlc_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

## Cài đặt Laravel và kết nối đến database

1.Trong thư mục backend, sao chép file `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```

2. Tạo khóa ứng dụng Laravel:
   ```bash
   php artisan key:generate
   ```

3. Cập nhật file `.env` với thông tin database:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=ctrlc_club
   DB_USERNAME=ctrlc_user
   DB_PASSWORD=your_strong_password
   ```

4. Chạy migration để tạo bảng:
   ```bash
   php artisan migrate
   ```

## Tùy chọn: Sử dụng Docker (khuyến nghị để môi trường nhất quán)

Nếu bạn muốn sử dụng Docker để tránh cài đặt MySQL trực tiếp trên máy, bạn có thể sử dụng `docker-compose`.

Tạo file `docker-compose.yml` trong thư mục gốc dự án:
```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    container_name: ctrlc_club_mysql
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: ctrlc_club
      MYSQL_USER: ctrlc_user
      MYSQL_PASSWORD: your_strong_password
      MYSQL_ROOT_PASSWORD: root_strong_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

Sau đó khởi động:
```bash
docker-compose up -d
```

Cập nhật file `.env` của backend để kết nối đến Docker MySQL:
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ctrlc_club
DB_USERNAME=ctrlc_user
DB_PASSWORD=your_strong_password
```

## Seed dữ liệu ban đầu (tùy chọn)
Để填充 quelques données初始数据（例如，管理员用户、示例事件）：
```bash
php artisan db:seed
```

## Kiểm tra kết nối
Bạn có thể kiểm tra kết nối bằng cách chạy:
```bash
php artisan tinker
```
Sau đó trong tương tác Tinker:
```php
Illuminate\Support\Facades\DB::connection()->getPDO();
```
Nếu không có lỗi, kết nối thành công.

## Khắc phục sự cố
- **Lỗi kết nối từ chối**: Đảm bảo dịch vụ MySQL đang chạy và cổng 3306 mở.
- **Lỗi xác thực**: Kiểm tra lại tên user và mật khẩu trong file `.env`.
- **Database không tồn tại**: Đảm bảo bạn đã tạo database và tên trùng khớp.
- **Lỗi ký tự**: Đảm bảo database và bảng sử dụng `utf8mb4` để hỗ trợ tiếng Việt đầy đủ.
