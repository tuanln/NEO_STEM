# NEO STEM

Ung dung giao duc STEM tuong tac cho hoc sinh Viet Nam (Lop 3-9).

20 hien tuong khoa hoc tu doi song thuong ngay, hoc qua 5 buoc: Hien tuong - Cau hoi - Thi nghiem - Mo hinh - Thach thuc.

## Cai dat nhanh

```bash
# Buoc 1: Cai CLI
pip install git+https://github.com/tuanln/NEO_STEM.git

# Buoc 2: Cai Qt6 + build tu source (tu dong)
neostem install

# Buoc 3: Chay
neostem run
```

Hoat dong tren: **Linux x86_64**, **Linux ARM64 (Armbian)**, **macOS**.

### Cai dat thu cong (khong can pip)

```bash
git clone https://github.com/tuanln/NEO_STEM.git
cd NEO_STEM
bash install-armbian.sh   # Linux
# hoac: brew install qt@6 && mkdir build && cd build && cmake .. && make  # macOS
```

## Lenh CLI

| Lenh | Mo ta |
|------|-------|
| `neostem install` | Cai Qt6 dependencies + build tu source |
| `neostem run` | Chay ung dung |
| `neostem status` | Kiem tra trang thai cai dat |
| `neostem uninstall` | Xoa build artifacts |

## Yeu cau he thong

| Platform | OS | CPU | RAM |
|----------|-----|-----|-----|
| Linux x86_64 | Ubuntu 22.04+ / Debian 12+ | Intel/AMD 64-bit | 2GB+ |
| Linux ARM64 | Armbian Bookworm / Ubuntu 22.04+ | Cortex-A53+ | 2GB+ |
| macOS | macOS 13+ | Apple Silicon / Intel | 4GB+ |

- **Display:** HDMI, LCD touchscreen, X11, Wayland, hoac Framebuffer

## Cong nghe

- Qt 6.5+ / QML (giao dien)
- C++ 17 (backend)
- SQLite (luu tien do)
- CMake (build system)

## License

MIT - Binh Dan Hoc STEM & Robot
