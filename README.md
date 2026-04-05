# NEO STEM

Ứng dụng giáo dục STEM tương tác dành cho học sinh Việt Nam (Lớp 3-9, 8-15 tuổi).

Khám phá **20 hiện tượng khoa học** từ đời sống thường ngày, học qua phương pháp **5 bước khoa học**: Hiện tượng - Câu hỏi - Thí nghiệm - Mô hình - Thách thức.

## Tính năng nổi bật

- 20 hoạt động STEM theo phương pháp OpenSciEd
- 3 cấp độ: Cơ bản (Lớp 3-5), Nâng cao (Lớp 5-6), THCS (Lớp 6-9)
- Giao diện cảm ứng tối ưu cho trẻ em (font lớn, nút bấm rõ ràng)
- Chế độ **"Chữ lớn"** (+25%) cho trẻ nhỏ và màn hình lớn
- Hệ thống gamification: 300 sao + 29 huy hiệu thành tích
- Lưu tiến độ offline bằng SQLite
- Hỗ trợ đa ngôn ngữ (Tiếng Việt mặc định)

## Cài đặt nhanh

```bash
# Bước 1: Cài CLI
pip install git+https://github.com/tuanln/NEO_STEM.git

# Bước 2: Cài Qt6 + build từ source (tự động)
neostem install

# Bước 3: Chạy
neostem run
```

Hoạt động trên: **Linux x86_64**, **Linux ARM64 (Armbian)**, **macOS**.

### Cài đặt thủ công (không cần pip)

```bash
git clone https://github.com/tuanln/NEO_STEM.git
cd NEO_STEM
bash install-armbian.sh   # Linux
# hoặc: brew install qt@6 && mkdir build && cd build && cmake .. && make  # macOS
```

## Lệnh CLI

| Lệnh | Mô tả |
|------|-------|
| `neostem install` | Cài Qt6 dependencies + build từ source |
| `neostem run` | Chạy ứng dụng |
| `neostem status` | Kiểm tra trạng thái cài đặt |
| `neostem uninstall` | Xóa build artifacts |

## 20 hiện tượng khoa học

### Nước & Nhiệt (6-10 tuổi)
| # | Hiện tượng | Câu hỏi khám phá | Lớp |
|---|-----------|-------------------|-----|
| 1 | Nồi cơm điện | Tại sao nắp nồi cơm điện rung và có hơi nước? | 4-5 |
| 2 | Sương mù Đà Lạt | Tại sao Đà Lạt sáng sớm có sương mù, trưa tan hết? | 4-5 |
| 4 | Giọt nước trên ly đá | Tại sao bên ngoài ly đá có giọt nước bám? | 3-4 |
| 5 | Muối biển | Tại sao muối biển lấy được bằng cách phơi nắng? | 4-5 |
| 17 | Kem tan chảy | Tại sao kem tan nhanh ngoài nắng? | 3-4 |

### Ánh sáng & Âm thanh (8-13 tuổi)
| # | Hiện tượng | Câu hỏi khám phá | Lớp |
|---|-----------|-------------------|-----|
| 6 | Cầu vồng | Tại sao cầu vồng xuất hiện sau cơn mưa? | 6-7 |
| 7 | Pha mặt trăng | Tại sao mặt trăng thay đổi hình dạng mỗi đêm? | 4-5 |
| 8 | Tiếng trống | Tại sao đập trống phát ra tiếng vang? | 4-5 |
| 13 | Bóng đèn | Tại sao bóng đèn phát sáng khi bật công tắc? | 4-5 |
| 20 | Chai nước xylophone | Tại sao gõ chai nước khác mực nghe khác nhau? | 4-5 |

### Lực & Điện từ (8-15 tuổi)
| # | Hiện tượng | Câu hỏi khám phá | Lớp |
|---|-----------|-------------------|-----|
| 9 | Quạt điện | Tại sao quạt điện quay khi cắm điện? | 4-5 |
| 10 | Nam châm | Tại sao nam châm hút đinh sắt nhưng không hút nhôm? | 5-6 |
| 11 | Xe đạp xuống dốc | Tại sao xe đạp đi nhanh hơn khi xuống dốc? | 7 |
| 18 | Bóng bay heli | Tại sao bóng bay heli bay lên trời? | 6-8 |

### Sự sống & Hóa học (8-15 tuổi)
| # | Hiện tượng | Câu hỏi khám phá | Lớp |
|---|-----------|-------------------|-----|
| 3 | Rừng ngập mặn | Tại sao cây bần/đước sống được trong nước mặn? | 8-9 |
| 12 | Lá cây xanh | Tại sao lá cây xanh nhưng hoa có nhiều màu? | 5-6 |
| 14 | Rỉ sét | Tại sao sắt để ngoài mưa bị rỉ sét? | 7-8 |
| 15 | Cá thở dưới nước | Tại sao cá sống được dưới nước? | 4-5 |
| 16 | Nước ngọt có ga | Tại sao mở chai nước ngọt có ga bọt phun ra? | 5-6 |
| 19 | Đom đóm | Tại sao đom đóm phát sáng trong đêm? | 5-6 |

## Phương pháp 5 bước

Mỗi hoạt động trải qua 5 bước theo phương pháp OpenSciEd:

| Bước | Tên | Mô tả |
|------|-----|-------|
| 1 | Hiện tượng Neo | Quan sát hiện tượng thực tế, kích thích tò mò |
| 2 | Bảng câu hỏi | Đặt câu hỏi khám phá (Driving Question Board) |
| 3 | Thí nghiệm | Tiến hành thí nghiệm, thu thập dữ liệu |
| 4 | Xây dựng mô hình | Tạo mô hình giải thích hiện tượng |
| 5 | Thách thức | Áp dụng kiến thức vào bài toán mới |

Mỗi bước cho tối đa **3 sao**, mỗi câu hỏi tối đa **15 sao**, tổng cộng **300 sao**.

## Hệ thống huy hiệu

| Huy hiệu | Điều kiện |
|-----------|-----------|
| Bước đầu tiên | Hoàn thành bước đầu tiên |
| Nhà thám hiểm | Khám phá nhiều câu hỏi |
| Bậc thầy câu hỏi | Xuất sắc ở bước Bảng câu hỏi |
| Nhà khoa học nhí | Xuất sắc ở bước Thí nghiệm |
| Kiến trúc sư | Xuất sắc ở bước Xây dựng mô hình |
| Người thách thức | Xuất sắc ở bước Thách thức |
| Hoàn hảo | Đạt 3 sao tất cả các bước |
| + 20 huy hiệu "Bậc thầy" | Hoàn thành trọn vẹn từng câu hỏi |

## Giao diện thân thiện trẻ em

- Font chữ lớn, rõ ràng (tối thiểu 16px, nội dung chính 24px)
- Chế độ **"Chữ lớn"** tăng thêm 25% cho trẻ nhỏ
- Nút bấm tối thiểu 52px, phù hợp ngón tay nhỏ
- Bảng màu tươi sáng, phân biệt theo nhóm kiến thức
- Icon trực quan (🏠 🔆 💡 ⬅) thay vì ký hiệu trừu tượng
- Hiệu ứng animation phản hồi khi tương tác
- Hệ thống sao + huy hiệu tạo động lực học tập

## Yêu cầu hệ thống

| Nền tảng | Hệ điều hành | CPU | RAM |
|----------|-------------|-----|-----|
| Linux x86_64 | Ubuntu 22.04+ / Debian 12+ | Intel/AMD 64-bit | 2GB+ |
| Linux ARM64 | Armbian Bookworm / Ubuntu 22.04+ | Cortex-A53+ | 2GB+ |
| macOS | macOS 13+ | Apple Silicon / Intel | 4GB+ |

- **Màn hình:** HDMI, LCD touchscreen, X11, Wayland, hoặc Framebuffer

## Công nghệ

- Qt 6.5+ / QML (giao diện)
- C++ 17 (backend)
- SQLite (lưu tiến độ)
- CMake (build system)

## Tài liệu

- [ARCHITECTURE.md](ARCHITECTURE.md) - Tài liệu kiến trúc & hướng dẫn triển khai chi tiết

## Hướng dẫn cho giáo viên / phụ huynh

1. **Cài đặt** theo hướng dẫn ở trên
2. **Chọn cấp độ** phù hợp với lớp/tuổi của trẻ
3. Nếu trẻ nhỏ (lớp 3-4), bật **"Chữ lớn"** trong Cài đặt
4. Để trẻ **tự khám phá**, bắt đầu từ nhóm "Nước & Nhiệt" (dễ nhất)
5. Theo dõi tiến độ qua mục **Hồ sơ** (📊)
6. Khuyến khích trẻ đạt **3 sao** mỗi bước trước khi chuyển câu hỏi mới

## Đóng góp

Chào mừng mọi đóng góp! Vui lòng:

1. Fork repo
2. Tạo branch mới (`git checkout -b feature/ten-tinh-nang`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng mới'`)
4. Push lên branch (`git push origin feature/ten-tinh-nang`)
5. Tạo Pull Request

## License

MIT - Bình Dân Học STEM & Robot
