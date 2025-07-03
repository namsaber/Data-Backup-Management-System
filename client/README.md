# Hệ thống Quản lý Backup Dữ liệu

Một ứng dụng web hiện đại được xây dựng bằng React.js và TailwindCSS để quản lý các bản sao lưu dữ liệu.

## Tính năng chính

### 📋 Trang danh sách bản sao lưu

- Hiển thị bảng thông tin các bản backup với đầy đủ thông tin
- Cho phép lọc theo:
  - Ngày tạo (từ ngày - đến ngày)
  - Người tạo
  - Ghi chú
- Hiển thị số lượng backup hiện tại
- Responsive design cho mọi thiết bị

### ➕ Trang thêm mới bản sao lưu

- Form nhập thông tin với validation:
  - Người tạo (bắt buộc)
  - Đường dẫn file .bak (bắt buộc, phải có định dạng .bak)
  - Ghi chú (tùy chọn)
- Thông báo thành công và tự động chuyển về trang danh sách

### ✏️ Trang chỉnh sửa bản sao lưu

- Form được điền sẵn thông tin hiện tại
- Validation tương tự trang thêm mới
- Xử lý trường hợp backup không tồn tại

### 🗑️ Chức năng xóa

- Nút xóa từng bản ghi với xác nhận
- Modal xác nhận trước khi xóa
- Thông báo lỗi nếu có

### 📊 Xuất Excel

- Nút xuất ra Excel với đầy đủ thông tin
- Tên file tự động với timestamp
- Định dạng bảng đẹp với cột rộng phù hợp

### ⚠️ Cảnh báo và Validation

- Cảnh báo khi nhập thiếu thông tin
- Validation real-time khi người dùng nhập
- Thông báo lỗi hệ thống
- Loading states cho các thao tác

## Công nghệ sử dụng

- **React.js 19** - Framework UI
- **TypeScript** - Type safety
- **TailwindCSS 4** - Styling
- **React Router DOM** - Routing
- **Lucide React** - Icons
- **XLSX** - Excel export
- **LocalStorage** - Data persistence

## Cấu trúc dự án

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Button component với variants
│   ├── Input.tsx       # Input component với validation
│   ├── Textarea.tsx    # Textarea component
│   ├── Modal.tsx       # Modal component
│   ├── BackupForm.tsx  # Form cho backup
│   ├── BackupFilter.tsx # Filter component
│   └── BackupTable.tsx # Table hiển thị backup
├── pages/              # Page components
│   ├── BackupListPage.tsx  # Trang danh sách
│   ├── AddBackupPage.tsx   # Trang thêm mới
│   └── EditBackupPage.tsx  # Trang chỉnh sửa
├── hooks/              # Custom hooks
│   └── useBackups.ts   # Hook quản lý backup data
├── types/              # TypeScript interfaces
│   └── backup.ts       # Backup related types
├── utils/              # Utility functions
│   └── excelExport.ts  # Excel export functionality
└── App.tsx             # Main app component
```

## Cài đặt và chạy

1. **Cài đặt dependencies:**

   ```bash
   npm install
   ```

2. **Chạy development server:**

   ```bash
   npm run dev
   ```

3. **Build cho production:**

   ```bash
   npm run build
   ```

4. **Preview build:**
   ```bash
   npm run preview
   ```

## Tính năng kỹ thuật

### 🏗️ Component Architecture

- **Tách biệt khoa học**: Mỗi component có trách nhiệm riêng biệt
- **Reusable**: Các component có thể tái sử dụng
- **Type-safe**: Sử dụng TypeScript cho type safety
- **Responsive**: Thiết kế responsive cho mọi thiết bị

### 📊 Data Management

- **LocalStorage**: Lưu trữ dữ liệu locally
- **Custom Hook**: useBackups hook quản lý state
- **Error Handling**: Xử lý lỗi toàn diện
- **Loading States**: Hiển thị trạng thái loading

### 🎨 UI/UX Design

- **Modern Design**: Thiết kế hiện đại với TailwindCSS
- **Consistent**: Nhất quán về màu sắc và spacing
- **Accessible**: Hỗ trợ accessibility
- **Interactive**: Các hiệu ứng hover, focus

### 🔧 Development Features

- **Hot Reload**: Tự động reload khi có thay đổi
- **Type Checking**: TypeScript checking
- **Linting**: ESLint configuration
- **Build Optimization**: Vite build optimization

## Cách sử dụng

1. **Xem danh sách backup**: Truy cập trang chủ để xem tất cả backup
2. **Lọc dữ liệu**: Sử dụng bộ lọc để tìm kiếm backup cụ thể
3. **Thêm backup mới**: Click "Thêm Backup mới" và điền form
4. **Chỉnh sửa**: Click nút edit trên từng dòng để chỉnh sửa
5. **Xóa backup**: Click nút delete và xác nhận
6. **Xuất Excel**: Click "Xuất Excel" để tải file

## Lưu ý

- Dữ liệu được lưu trong LocalStorage của trình duyệt
- File backup phải có định dạng .bak
- Tất cả thao tác đều có validation và error handling
- Responsive design hoạt động tốt trên mobile và desktop

## Tác giả

Được phát triển cho mục đích học tập và thực hành React.js với TypeScript và TailwindCSS.
