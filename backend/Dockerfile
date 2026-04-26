FROM php:8.4-cli

# Cài đặt system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libsqlite3-dev

# Xóa cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Cài đặt PHP extensions
RUN docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd

# Lấy Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Thiết lập thư mục làm việc
WORKDIR /var/www

# Copy code vào container
COPY . .

# Cài đặt dependencies
RUN composer install

# Cấp quyền cho thư mục storage và bootstrap/cache
RUN chmod -R 777 storage bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Chạy lệnh khởi động
CMD php artisan migrate --force && php artisan db:seed --class=ClubSeeder && php artisan serve --host=0.0.0.0 --port=8000
