#!/bin/bash
#============================================================================
# NEO STEM - Script cài đặt trên Armbian ARM (aarch64)
# Dành cho: Armbian Bookworm (Debian 12) / Armbian Jammy (Ubuntu 22.04+)
# RAM tối thiểu: 2GB (khuyến nghị thêm 1GB swap)
#============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

INSTALL_DIR="$HOME/NEO_STEM"
SERVICE_NAME="neostem"

log_info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_step()  { echo -e "\n${BLUE}==== $1 ====${NC}"; }

#--- Kiểm tra hệ thống ---
check_system() {
    log_step "Bước 1/6: Kiểm tra hệ thống"

    ARCH=$(uname -m)
    if [[ "$ARCH" != "aarch64" && "$ARCH" != "armv7l" ]]; then
        log_error "Script này chỉ dành cho ARM (aarch64/armv7l). Hệ thống: $ARCH"
        exit 1
    fi
    log_info "Kiến trúc: $ARCH"

    TOTAL_RAM=$(free -m | awk '/^Mem:/{print $2}')
    log_info "RAM: ${TOTAL_RAM}MB"

    if [ "$TOTAL_RAM" -lt 1500 ]; then
        log_warn "RAM thấp (${TOTAL_RAM}MB). Khuyến nghị 2GB+."
    fi

    # Kiểm tra swap
    SWAP=$(free -m | awk '/^Swap:/{print $2}')
    if [ "$SWAP" -lt 512 ]; then
        log_warn "Swap: ${SWAP}MB (thấp). Đang tạo 1GB swap..."
        setup_swap
    else
        log_info "Swap: ${SWAP}MB"
    fi

    # Kiểm tra distro
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        log_info "OS: $PRETTY_NAME"
    fi
}

#--- Thiết lập swap ---
setup_swap() {
    if [ -f /swapfile ]; then
        log_info "Swap file đã tồn tại"
        return
    fi

    log_info "Tạo 1GB swap file..."
    sudo fallocate -l 1G /swapfile 2>/dev/null || sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile

    # Thêm vào fstab nếu chưa có
    if ! grep -q '/swapfile' /etc/fstab; then
        echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    fi

    # Giảm swappiness
    sudo sysctl vm.swappiness=10
    echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf 2>/dev/null

    log_info "Swap 1GB đã tạo thành công"
}

#--- Cài đặt dependencies ---
install_deps() {
    log_step "Bước 2/6: Cài đặt dependencies"

    sudo apt update

    # Thử cài Qt6 từ repo chính
    log_info "Cài đặt Qt6 và build tools..."

    # Danh sách packages cần thiết
    PACKAGES=(
        # Build tools
        cmake
        g++
        make
        pkg-config
        # Qt6 core
        qt6-base-dev
        qt6-declarative-dev
        qt6-multimedia-dev
        # QML modules
        qml6-module-qtquick
        qml6-module-qtquick-controls
        qml6-module-qtquick-layouts
        qml6-module-qtquick-window
        qml6-module-qt-labs-localstorage
        # Qt6 libraries
        libqt6sql6-sqlite
        libqt6multimedia6
        qt6-qml-dev
        # Fonts
        fonts-noto-sans
        fonts-noto-color-emoji
        # Runtime
        libgl1-mesa-dev
        libegl1-mesa-dev
    )

    # Cài từng gói, bỏ qua gói không có
    INSTALL_LIST=""
    for pkg in "${PACKAGES[@]}"; do
        if apt-cache show "$pkg" >/dev/null 2>&1; then
            INSTALL_LIST="$INSTALL_LIST $pkg"
        else
            log_warn "Gói không tìm thấy: $pkg (bỏ qua)"
        fi
    done

    if [ -n "$INSTALL_LIST" ]; then
        sudo apt install -y $INSTALL_LIST
    fi

    # Kiểm tra Qt6 đã cài thành công
    if ! command -v qmake6 >/dev/null 2>&1; then
        # Thử tìm qmake6 ở vị trí khác
        if [ -x /usr/lib/qt6/bin/qmake ]; then
            log_info "Qt6 tìm thấy tại /usr/lib/qt6/"
        else
            log_error "Qt6 chưa cài được. Thử cài từ source hoặc backports."
            log_info "Thử: sudo apt install -t bookworm-backports qt6-base-dev"
            exit 1
        fi
    fi

    QT_VERSION=$(qmake6 --version 2>/dev/null | grep "Qt version" | awk '{print $4}')
    log_info "Qt6 phiên bản: ${QT_VERSION:-unknown}"
    log_info "Dependencies đã cài đặt thành công"
}

#--- Build ứng dụng ---
build_app() {
    log_step "Bước 3/6: Build ứng dụng NEO STEM"

    cd "$INSTALL_DIR"
    mkdir -p build
    cd build

    log_info "Đang configure CMake..."
    cmake .. \
        -DCMAKE_BUILD_TYPE=Release \
        -DCMAKE_CXX_FLAGS="-O2" \
        2>&1 | tail -5

    # Chọn số job dựa trên RAM
    if [ "$TOTAL_RAM" -lt 2500 ]; then
        JOBS=1
        log_warn "RAM thấp, build với 1 job (chậm nhưng an toàn)"
    else
        JOBS=2
    fi

    log_info "Đang build (make -j${JOBS})... Có thể mất 5-15 phút."
    make -j${JOBS} 2>&1 | tail -10

    if [ -f neostem ]; then
        log_info "Build thành công!"
        ls -lh neostem
    else
        log_error "Build thất bại!"
        exit 1
    fi
}

#--- Kiểm tra QML modules ---
verify_qml() {
    log_step "Bước 4/6: Kiểm tra QML modules"

    # Test nhanh
    cat > /tmp/neostem_test.qml << 'QMLEOF'
import QtQuick
import QtQuick.Controls
ApplicationWindow {
    visible: true; width: 200; height: 100
    Text { anchors.centerIn: parent; text: "Qt6 OK!"; font.pixelSize: 24 }
    Timer { interval: 2000; running: true; onTriggered: Qt.quit() }
}
QMLEOF

    log_info "Test QML engine..."
    if command -v qml6 >/dev/null 2>&1; then
        timeout 5 qml6 /tmp/neostem_test.qml 2>/dev/null && log_info "QML OK!" || log_warn "QML test không chạy được (có thể do headless)"
    else
        log_warn "qml6 không tìm thấy, bỏ qua test"
    fi
    rm -f /tmp/neostem_test.qml
}

#--- Tạo launcher script ---
create_launcher() {
    log_step "Bước 5/6: Tạo launcher"

    cat > "$INSTALL_DIR/neostem.sh" << 'LAUNCHER'
#!/bin/bash
# NEO STEM Launcher - Tự động chọn platform tốt nhất

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BINARY="$SCRIPT_DIR/build/neostem"

if [ ! -f "$BINARY" ]; then
    echo "Lỗi: Không tìm thấy $BINARY"
    echo "Chạy: cd $SCRIPT_DIR && bash install-armbian.sh"
    exit 1
fi

# Xác định platform
if [ -n "$DISPLAY" ] || [ -n "$WAYLAND_DISPLAY" ]; then
    # Đang chạy trên desktop (X11 hoặc Wayland)
    if [ -n "$WAYLAND_DISPLAY" ]; then
        export QT_QPA_PLATFORM=wayland
    else
        export QT_QPA_PLATFORM=xcb
    fi
elif [ -e /dev/dri/card0 ]; then
    # Có GPU, dùng EGLFS (fullscreen)
    export QT_QPA_PLATFORM=eglfs
else
    # Fallback: Linux framebuffer
    export QT_QPA_PLATFORM=linuxfb
fi

# Tối ưu cho RAM thấp
export QSG_RENDER_LOOP=basic
export QML_DISK_CACHE_PATH=/tmp/neostem_qmlcache

# Kiểm tra có GPU không
if [ ! -e /dev/dri/card0 ]; then
    export QT_QUICK_BACKEND=software
    echo "[NEO STEM] Chế độ software rendering (không có GPU)"
fi

echo "[NEO STEM] Platform: $QT_QPA_PLATFORM"
echo "[NEO STEM] Đang khởi chạy..."

exec "$BINARY" "$@"
LAUNCHER

    chmod +x "$INSTALL_DIR/neostem.sh"
    log_info "Launcher tạo tại: $INSTALL_DIR/neostem.sh"
}

#--- Tạo systemd service (auto-start) ---
create_service() {
    log_step "Bước 6/6: Tạo auto-start service (tùy chọn)"

    read -p "Bạn muốn tạo systemd service (tự động chạy khi khởi động)? [y/N] " yn
    case $yn in
        [Yy]* )
            CURRENT_USER=$(whoami)
            sudo tee /etc/systemd/system/neostem.service > /dev/null << SERVICEEOF
[Unit]
Description=NEO STEM Education App
After=multi-user.target graphical.target
Wants=graphical.target

[Service]
Type=simple
User=$CURRENT_USER
Environment=QT_QPA_PLATFORM=eglfs
Environment=QSG_RENDER_LOOP=basic
Environment=QML_DISK_CACHE_PATH=/tmp/neostem_qmlcache
WorkingDirectory=$INSTALL_DIR
ExecStart=$INSTALL_DIR/neostem.sh
Restart=on-failure
RestartSec=5

[Install]
WantedBy=graphical.target
SERVICEEOF

            sudo systemctl daemon-reload
            sudo systemctl enable neostem.service
            log_info "Service đã tạo và kích hoạt"
            log_info "  Khởi chạy: sudo systemctl start neostem"
            log_info "  Xem log:   sudo journalctl -u neostem -f"
            ;;
        * )
            log_info "Bỏ qua tạo service"
            ;;
    esac
}

#--- Hàm chính ---
main() {
    echo ""
    echo "╔══════════════════════════════════════════════╗"
    echo "║     NEO STEM - Cài đặt trên Armbian ARM     ║"
    echo "║     Bình Dân Học STEM & Robot v1.0.0         ║"
    echo "╚══════════════════════════════════════════════╝"
    echo ""

    # Kiểm tra đang ở đúng thư mục
    if [ ! -f "$INSTALL_DIR/CMakeLists.txt" ]; then
        log_error "Không tìm thấy CMakeLists.txt tại $INSTALL_DIR"
        log_info "Hãy copy source code vào $INSTALL_DIR trước:"
        log_info "  scp -r NEO_STEM/ user@armbian-ip:~/"
        exit 1
    fi

    check_system
    install_deps
    build_app
    verify_qml
    create_launcher
    create_service

    echo ""
    echo "╔══════════════════════════════════════════════╗"
    echo "║          CÀI ĐẶT HOÀN TẤT!                 ║"
    echo "╠══════════════════════════════════════════════╣"
    echo "║                                              ║"
    echo "║  Chạy ứng dụng:                              ║"
    echo "║    cd ~/NEO_STEM && ./neostem.sh             ║"
    echo "║                                              ║"
    echo "║  Hoặc chạy trực tiếp:                        ║"
    echo "║    ~/NEO_STEM/build/neostem                  ║"
    echo "║                                              ║"
    echo "║  Nếu có lỗi hiển thị, thử:                  ║"
    echo "║    QT_QPA_PLATFORM=linuxfb ./neostem.sh      ║"
    echo "║    QT_QPA_PLATFORM=xcb ./neostem.sh          ║"
    echo "║                                              ║"
    echo "╚══════════════════════════════════════════════╝"
}

main "$@"
