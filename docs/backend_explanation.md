# Giải thích chi tiết mã nguồn Giai đoạn 1 (Backend & Hạ tầng)

Tài liệu này giải thích chi tiết ý nghĩa của các đoạn code cấu hình và ngôn ngữ sử dụng trong Giai đoạn 1 của dự án.

## 1. File `docker-compose.yml` (Công cụ: Docker Compose)
**Ngôn ngữ/Định dạng:** YAML
**Ý nghĩa:** Đây là bản thiết kế để chạy các dịch vụ (services) của dự án trong các container riêng biệt nhưng vẫn có thể giao tiếp với nhau.
- `version: '3.8'`: Khai báo phiên bản của cú pháp Docker Compose.
- `services:`: Bắt đầu định nghĩa các ứng dụng sẽ chạy.
  - **Dịch vụ `app` (Ứng dụng Laravel):**
    - `build: context: .`: Yêu cầu Docker tìm file `Dockerfile` ở thư mục hiện tại để tự động "xây dựng" (build) môi trường PHP phù hợp.
    - `volumes: - ./backend:/var/www`: Map (đồng bộ) thư mục `backend` trên máy tính của bạn vào thư mục `/var/www` bên trong container. Nhờ vậy, khi bạn sửa code trên máy, container sẽ nhận được thay đổi ngay lập tức.
    - `ports: - "8000:8000"`: Mở cổng 8000 để bạn truy cập trang web ở `http://localhost:8000`.
  - **Dịch vụ `db` (Cơ sở dữ liệu PostgreSQL):**
    - `image: postgres:15-alpine`: Tải bản PostgreSQL phiên bản 15 gọn nhẹ (alpine) từ mạng về.
    - `environment:`: Định nghĩa các biến môi trường như tên database (`POSTGRES_DB`), user, password. Các giá trị này sẽ dùng để cấu hình trong file `.env` của Laravel.
    - `volumes: - db-data:/var/lib/postgresql/data`: Lưu trữ dữ liệu vật lý vào một volume có tên là `db-data`. Nếu không có dòng này, khi container tắt, toàn bộ dữ liệu trong database sẽ bị mất.

## 2. File `Dockerfile` (Công cụ: Docker)
**Ngôn ngữ/Định dạng:** Dockerfile Instruction
**Ý nghĩa:** Chứa các lệnh tuần tự để tạo ra một môi trường máy chủ Linux có cài sẵn PHP và các công cụ cần thiết cho Laravel.
- `FROM php:8.2-fpm`: Sử dụng máy chủ Linux nền tảng có sẵn PHP 8.2 FastCGI.
- `RUN apt-get update && apt-get install -y ...`: Lệnh của hệ điều hành Ubuntu/Debian để cài các thư viện lõi như xử lý ảnh (`libpng-dev`), quản lý file zip, và `libpq-dev` (để PHP có thể kết nối được với PostgreSQL).
- `RUN docker-php-ext-install pdo pdo_pgsql ...`: Cài các extension của PHP đặc thù cho dự án, quan trọng nhất là `pdo_pgsql` để thao tác với DB.
- `COPY --from=composer:latest ...`: Lấy chương trình Composer (Trình quản lý thư viện của PHP) từ một container khác bỏ sang đây để sử dụng.
- `CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]`: Lệnh chạy mặc định khi container khởi động: bật server nội bộ của Laravel để phục vụ website.

## 3. Cấu hình Laravel (Ngôn ngữ: PHP)
*(Do Docker Desktop chưa bật nên mã nguồn Laravel chưa được generate. Khi bạn chạy lệnh cài đặt, Laravel sẽ tạo ra cấu trúc thư mục).*
Khi cấu trúc được tạo ra, đây là những phần quan trọng nhất cho dự án:

### a. File `.env` (Biến môi trường)
```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=secret
```
**Ý nghĩa:** Cấu hình để Laravel biết nó cần kết nối tới database hệ quản trị `pgsql` (PostgreSQL), máy chủ là `db` (tương ứng với tên dịch vụ `db` trong file `docker-compose.yml`), và tên truy cập tương ứng.

### b. File Migration (Database Schema)
Ví dụ: `database/migrations/...create_tasks_table.php`
```php
public function up() {
    Schema::create('tasks', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('description')->nullable();
        $table->string('status')->default('todo');
        $table->date('due_date')->nullable();
        $table->timestamps();
    });
}
```
**Ý nghĩa:** Đây là đoạn code PHP để tạo bảng trong DB thay vì phải gõ lệnh SQL truyền thống. `up()` là hàm thực thi tạo bảng `tasks` với các cột tương ứng (tiêu đề, mô tả, trạng thái, ngày hạn). Khi cần thiết có thể chạy hàm `down()` để xoá bảng.

### c. File TaskController (Xử lý Logic - CRUD)
Ví dụ: `app/Http/Controllers/TaskController.php`
```php
public function index() {
    return Task::all(); // Trả về danh sách toàn bộ Task dưới dạng JSON
}
public function store(Request $request) {
    // Lưu một Task mới vào CSDL
    $task = Task::create($request->all());
    return response()->json($task, 201);
}
```
**Ý nghĩa:** Đây là nơi đón nhận request từ phía Frontend (ReactJS), xử lý dữ liệu và tương tác với Database thông qua Model (`Task::...`), sau đó trả kết quả về dưới dạng JSON.
