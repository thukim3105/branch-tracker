# BranchFlow

Website theo dõi branch GitHub bằng Focus Graph và bằng chứng cho trạng thái merged, released, deployed.

## Cấu trúc

- `app/` — giao diện React (sẽ khởi tạo ở bước giao diện).
- `api/` — API NestJS (sẽ khởi tạo ở bước backend).

## Phạm vi MVP

Chọn một repository và branch, xem Focus Graph theo chiều dọc, rồi kiểm tra trạng thái Merged / Released / Deployed cùng bằng chứng. Nếu thiếu dữ liệu, trạng thái phải là Unknown.
