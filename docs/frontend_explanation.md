# Giải thích chi tiết mã nguồn Giai đoạn 2 (Frontend)

Tài liệu này giải thích ý nghĩa các thành phần, cấu trúc và thư viện được sử dụng trong thư mục `frontend/`.

## 1. Cấu trúc thư mục (Architecture)
- `src/schemas/`: Chứa các quy tắc kiểm tra dữ liệu đầu vào.
- `src/store/`: "Kho lưu trữ" dữ liệu tập trung của toàn ứng dụng (Redux).
- `src/services/`: Nơi chứa các hàm gọi API giao tiếp với Backend (Laravel).
- `src/components/`: Chứa các thành phần giao diện nhỏ (UI Component).

## 2. Giải thích chi tiết từng công nghệ

### a. Zod (Validation Schema)
**File:** `src/schemas/taskSchema.ts`
- **Ý nghĩa:** Zod là công cụ giúp ta định nghĩa cấu trúc của một Task (phải có tiêu đề, tối đa 255 ký tự, trạng thái là gì).
- Khi người dùng bấm nút "Add Task", ứng dụng sẽ đưa dữ liệu qua Zod để kiểm tra (validate). Nếu thiếu tiêu đề, Zod sẽ báo lỗi ngay lập tức mà chưa cần gửi lên máy chủ.

### b. Axios (Giao tiếp API)
**File:** `src/services/api.ts`
- **Ý nghĩa:** Đây là "người đưa thư" giúp Frontend (React) nói chuyện với Backend (Laravel ở cổng 8000).
- Chúng ta gọi các hàm `api.post()`, `api.get()` để tương tác với CSDL. Zod được kết hợp ở đây để lọc dữ liệu rác trước khi gửi và sau khi nhận.

### c. Redux Toolkit (Quản lý State)
**Files:** `src/store/index.ts`, `src/store/slices/taskSlice.ts`
- **Ý nghĩa:** Thay vì truyền dữ liệu danh sách Task qua lại giữa các Component rất mệt mỏi, ta tạo ra một "Store" (kho) chung.
- `taskSlice.ts`: Là một phân khu trong kho, chuyên quản lý danh sách Task. Các hành động (Thêm, Xóa, Sửa, Lấy danh sách) gọi là các `createAsyncThunk` (hành động bất đồng bộ). Khi API chạy thành công, nó sẽ tự động cập nhật danh sách (`extraReducers`), làm cho giao diện thay đổi theo.

### d. Giao diện (React Components)
- `TaskForm.tsx`: Hiển thị form nhập liệu. Nó lưu tạm dữ liệu nhập vào `useState`. Khi submit, nó dùng `dispatch(addTask(...))` để đẩy vào kho Redux.
- `TaskList.tsx`: Dùng `useSelector` để "lắng nghe" dữ liệu từ kho Redux. Mỗi khi kho có Task mới, nó tự động render lại danh sách.

### e. Thiết kế & Vanilla CSS
**File:** `src/index.css`
- Tôi đã thiết kế giao diện theo phong cách **Dark Mode hiện đại (Glassmorphism + Dark theme)** với màu tím/xanh dương chủ đạo. 
- Có hiệu ứng viền sáng (box-shadow) và phóng to nhẹ (transform scale) khi rê chuột vào mỗi Task, mang lại trải nghiệm rất mượt mà.
