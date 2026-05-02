# Agile Task Manager Board 🚀

Dự án Quản lý Công việc (Task Manager) được xây dựng theo mô hình Fullstack hiện đại, áp dụng quy trình phát triển phần mềm Agile.

## 📋 Giới thiệu
Ứng dụng cho phép người dùng quản lý các công việc hàng ngày với giao diện trực quan, hỗ trợ đầy đủ các tính năng Thêm, Sửa, Xóa và cập nhật trạng thái công việc (Todo, In Progress, Done).

## 🛠 Công nghệ sử dụng
Dự án được xây dựng với các công nghệ mạnh mẽ:

### Backend (API)
- **Framework:** Laravel 12.x
- **Ngôn ngữ:** PHP 8.4
- **Cơ sở dữ liệu:** PostgreSQL 15
- **Tính năng:** RESTful API, Migration, Eloquent ORM.

### Frontend (UI)
- **Framework:** ReactJS (Vite + TypeScript)
- **Quản lý trạng thái:** Redux Toolkit
- **Kiểm tra dữ liệu:** Zod
- **Giao diện:** Vanilla CSS (Dark Mode & Modern Design)

### Hạ tầng
- **Docker & Docker Compose:** Container hóa toàn bộ môi trường ứng dụng và database.

## 🚀 Hướng dẫn cài đặt và chạy dự án

### 1. Yêu cầu hệ thống
- Đã cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- Đã cài đặt [Node.js & npm](https://nodejs.org/).

### 2. Khởi chạy Backend (Docker)
Mở terminal tại thư mục gốc của dự án và chạy:
```bash
docker-compose up -d
```
Sau khi các container đã chạy, thực hiện migrate database:
```bash
docker exec laravel_app php artisan migrate
```

### 3. Khởi chạy Frontend
Di chuyển vào thư mục `frontend` và cài đặt thư viện:
```bash
cd frontend
npm install
npm run dev
```
Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173`

## 📁 Cấu trúc dự án chính
- `/backend`: Mã nguồn Laravel API.
- `/frontend`: Mã nguồn ReactJS UI.
- `/docs`: Tài liệu hướng dẫn chi tiết code.
- `docker-compose.yml`: File cấu hình môi trường Docker.

---
*Dự án đang trong quá trình phát triển hoàn thiện các tính năng nâng cao.*