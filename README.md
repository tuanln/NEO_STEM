# NEO STEM

Ung dung giao duc STEM tuong tac cho hoc sinh Viet Nam (Lop 3-9).

20 hien tuong khoa hoc tu doi song thuong ngay, hoc qua 5 buoc: Hien tuong - Cau hoi - Thi nghiem - Mo hinh - Thach thuc.

## Cai dat nhanh (Linux ARM / Armbian)

```bash
# Cach 1: Qua pip (khuyen nghi)
pip install git+https://github.com/<username>/NEO_STEM.git
neostem install
neostem run

# Cach 2: Thu cong
git clone https://github.com/<username>/NEO_STEM.git
cd NEO_STEM
bash install-armbian.sh
./neostem.sh
```

## Cai dat tren macOS (Development)

```bash
brew install qt@6 cmake
pip install -e .
neostem install
neostem run
```

## Lenh CLI

| Lenh | Mo ta |
|------|-------|
| `neostem install` | Cai Qt6 dependencies + build tu source |
| `neostem run` | Chay ung dung |
| `neostem status` | Kiem tra trang thai cai dat |
| `neostem uninstall` | Xoa build artifacts |

## Yeu cau he thong

- **CPU:** ARM aarch64 hoac x86_64
- **RAM:** 2GB+ (tu dong tao swap neu can)
- **OS:** Armbian Bookworm / Ubuntu 22.04+ / macOS
- **Display:** HDMI, LCD touchscreen, hoac X11/Wayland

## Cong nghe

- Qt 6.5+ / QML (giao dien)
- C++ 17 (backend)
- SQLite (luu tien do)
- CMake (build system)

## License

MIT - Binh Dan Hoc STEM & Robot
