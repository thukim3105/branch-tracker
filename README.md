# BranchFlow

Website theo dõi branch GitHub bằng Focus Graph và bằng chứng cho trạng thái merged, released, deployed.

## Cấu trúc

- `app/` — giao diện React + Vite + TypeScript.
- `api/` — API NestJS (sẽ dựng ở bước backend).

## Chạy giao diện

```powershell
cd app
npm install
npm run dev
```

Vite sẽ in ra địa chỉ local để mở trong trình duyệt.

## Phạm vi MVP

Chọn một repository và branch, xem Focus Graph theo chiều dọc, rồi kiểm tra trạng thái Merged / Released / Deployed cùng bằng chứng. Nếu thiếu dữ liệu, trạng thái phải là Unknown.

## Trạng thái phát triển

Giao diện khung đã có trong `app/`; API sẽ được tạo trong `api/` ở bước backend.
