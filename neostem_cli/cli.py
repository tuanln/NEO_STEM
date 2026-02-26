#!/usr/bin/env python3
"""NEO STEM CLI - Cai dat va chay ung dung NEO STEM tren Linux ARM."""

import argparse
import os
import platform
import shutil
import subprocess
import sys
from pathlib import Path

REPO_URL = "https://github.com/tuanln/NEO_STEM.git"
APP_HOME = Path.home() / ".neostem"
SOURCE_DIR = APP_HOME / "NEO_STEM"


def get_project_dir():
    """Tra ve thu muc chua source code (CMakeLists.txt).

    Uu tien:
    1. Thu muc hien tai neu co CMakeLists.txt (dev mode)
    2. Thu muc ~/.neostem/NEO_STEM (pip install mode)
    """
    # Dev mode: chay tu source repo truc tiep
    local = Path(__file__).resolve().parent.parent
    if (local / "CMakeLists.txt").exists():
        return local

    # Pip install mode: source duoc clone ve ~/.neostem/NEO_STEM
    if (SOURCE_DIR / "CMakeLists.txt").exists():
        return SOURCE_DIR

    return SOURCE_DIR  # se duoc clone trong cmd_install


def get_build_dir():
    return get_project_dir() / "build"


def get_binary():
    return get_build_dir() / "neostem"


# ---------------------------------------------------------------------------
# Colors
# ---------------------------------------------------------------------------
class C:
    G = "\033[92m"
    Y = "\033[93m"
    R = "\033[91m"
    B = "\033[94m"
    N = "\033[0m"


def info(msg):
    print(f"{C.G}[INFO]{C.N} {msg}")


def warn(msg):
    print(f"{C.Y}[WARN]{C.N} {msg}")


def error(msg):
    print(f"{C.R}[ERROR]{C.N} {msg}")


def step(msg):
    print(f"\n{C.B}==== {msg} ===={C.N}")


def run(cmd, **kwargs):
    print(f"  $ {cmd}")
    return subprocess.run(cmd, shell=True, **kwargs)


# ---------------------------------------------------------------------------
# clone / update source
# ---------------------------------------------------------------------------
def ensure_source():
    """Clone hoac update source code tu GitHub."""
    APP_HOME.mkdir(parents=True, exist_ok=True)

    if (SOURCE_DIR / "CMakeLists.txt").exists():
        info(f"Source da co tai {SOURCE_DIR}")
        step("Cap nhat source tu GitHub")
        r = run("git pull --ff-only", cwd=SOURCE_DIR)
        if r.returncode != 0:
            warn("Khong the cap nhat. Dung ban hien tai.")
        return SOURCE_DIR

    step("Tai source code tu GitHub")
    info(f"Clone {REPO_URL}")
    r = run(f"git clone --depth 1 {REPO_URL} {SOURCE_DIR}")
    if r.returncode != 0:
        error("Khong the clone repo! Kiem tra internet va git.")
        sys.exit(1)

    info(f"Source da tai ve: {SOURCE_DIR}")
    return SOURCE_DIR


# ---------------------------------------------------------------------------
# install
# ---------------------------------------------------------------------------
DEBIAN_PACKAGES = [
    "cmake", "g++", "make", "pkg-config",
    "qt6-base-dev", "qt6-declarative-dev", "qt6-multimedia-dev",
    "qml6-module-qtquick", "qml6-module-qtquick-controls",
    "qml6-module-qtquick-layouts", "qml6-module-qtquick-window",
    "qml6-module-qt-labs-localstorage",
    "libqt6sql6-sqlite", "libqt6multimedia6", "qt6-qml-dev",
    "fonts-noto-sans", "fonts-noto-color-emoji",
    "libgl1-mesa-dev", "libegl1-mesa-dev",
]


def _check_dpkg(pkg):
    r = subprocess.run(["dpkg", "-s", pkg], capture_output=True, text=True)
    return r.returncode == 0


def cmd_install(args):
    """Cai dat dependencies va build ung dung."""
    # --- system info ---
    step("Kiem tra he thong")
    arch = platform.machine()
    info(f"Kien truc: {arch}")
    info(f"OS: {platform.platform()}")

    if sys.platform == "darwin":
        _install_macos(args)
        return

    if sys.platform != "linux":
        error(f"Chua ho tro platform: {sys.platform}")
        sys.exit(1)

    # --- source ---
    proj = ensure_source()

    # --- swap ---
    _ensure_swap()

    # --- deps ---
    step("Cai dat dependencies (can sudo)")
    run("sudo apt update -qq")

    missing = [p for p in DEBIAN_PACKAGES if not _check_dpkg(p)]
    if missing:
        pkgs = " ".join(missing)
        info(f"Cai {len(missing)} goi...")
        r = run(f"sudo apt install -y {pkgs}")
        if r.returncode != 0:
            warn("Mot so goi co the khong co. Thu backports.")
    else:
        info("Tat ca dependencies da co san")

    # --- build ---
    _build(proj, jobs=args.jobs)

    # --- done ---
    print(f"\n{C.G}{'='*50}")
    print(f"  CAI DAT HOAN TAT!")
    print(f"  Chay: neostem run")
    print(f"{'='*50}{C.N}\n")


def _install_macos(args):
    """Build tren macOS."""
    # Dev mode: source local
    local = Path(__file__).resolve().parent.parent
    if (local / "CMakeLists.txt").exists():
        proj = local
    else:
        proj = ensure_source()

    step("Build tren macOS")
    qt_prefix = subprocess.run(
        ["brew", "--prefix", "qt@6"], capture_output=True, text=True,
    ).stdout.strip()

    if not qt_prefix:
        error("Chua cai Qt6. Chay: brew install qt@6")
        sys.exit(1)

    _build(proj, cmake_args=f"-DCMAKE_PREFIX_PATH={qt_prefix}", jobs=args.jobs)
    print(f"\n{C.G}Build xong! Chay: neostem run{C.N}\n")


def _ensure_swap():
    try:
        out = subprocess.run(["free", "-m"], capture_output=True, text=True).stdout
        for line in out.splitlines():
            if line.startswith("Swap:"):
                swap_mb = int(line.split()[1])
                if swap_mb < 512:
                    warn(f"Swap chi co {swap_mb}MB. Dang tao 1GB swap...")
                    run("sudo fallocate -l 1G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=1024")
                    run("sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile")
                    info("Swap 1GB da tao")
                else:
                    info(f"Swap: {swap_mb}MB")
                break
    except Exception:
        pass


def _build(proj, cmake_args="", jobs=None):
    step("Build NEO STEM")
    build = proj / "build"
    build.mkdir(exist_ok=True)

    if jobs is None:
        try:
            mem = os.sysconf("SC_PAGE_SIZE") * os.sysconf("SC_PHYS_PAGES") // (1024**2)
            jobs = 1 if mem < 2500 else 2
        except Exception:
            jobs = 1

    info("CMake configure...")
    r = run(f"cmake {proj} -DCMAKE_BUILD_TYPE=Release {cmake_args}", cwd=build)
    if r.returncode != 0:
        error("CMake configure that bai!")
        sys.exit(1)

    info(f"Build (make -j{jobs})... Co the mat 5-15 phut.")
    r = run(f"make -j{jobs}", cwd=build)
    if r.returncode != 0:
        error("Build that bai!")
        sys.exit(1)

    binary = build / "neostem"
    if binary.exists():
        size = binary.stat().st_size / (1024 * 1024)
        info(f"Build thanh cong! Binary: {size:.1f} MB")
    else:
        error("Khong tim thay binary sau khi build")
        sys.exit(1)


# ---------------------------------------------------------------------------
# run
# ---------------------------------------------------------------------------
def cmd_run(args):
    """Chay ung dung NEO STEM."""
    binary = get_binary()
    if not binary.exists():
        error("Chua build! Chay truoc: neostem install")
        sys.exit(1)

    env = os.environ.copy()

    if sys.platform == "darwin":
        info("Khoi chay tren macOS...")
        os.execv(str(binary), [str(binary)])

    # Linux: auto-detect platform
    if "DISPLAY" in env or "WAYLAND_DISPLAY" in env:
        env.setdefault("QT_QPA_PLATFORM", "wayland" if "WAYLAND_DISPLAY" in env else "xcb")
    elif os.path.exists("/dev/dri/card0"):
        env.setdefault("QT_QPA_PLATFORM", "eglfs")
    else:
        env.setdefault("QT_QPA_PLATFORM", "linuxfb")
        env.setdefault("QT_QUICK_BACKEND", "software")

    env.setdefault("QSG_RENDER_LOOP", "basic")
    env.setdefault("QML_DISK_CACHE_PATH", "/tmp/neostem_qmlcache")

    pname = env.get("QT_QPA_PLATFORM", "auto")
    info(f"Platform: {pname}")
    info("Dang khoi chay NEO STEM...")
    os.execve(str(binary), [str(binary)], env)


# ---------------------------------------------------------------------------
# status
# ---------------------------------------------------------------------------
def cmd_status(args):
    proj = get_project_dir()
    binary = get_binary()

    print(f"\n  NEO STEM v1.0.0")
    print(f"  {'='*40}")
    print(f"  Source:   {proj}")
    print(f"  Co source: {'CO' if (proj / 'CMakeLists.txt').exists() else 'CHUA (chay: neostem install)'}")
    print(f"  Binary:   {'CO' if binary.exists() else 'CHUA BUILD'}")

    if binary.exists():
        size = binary.stat().st_size / (1024 * 1024)
        print(f"  Kich thuoc: {size:.1f} MB")

    qt = shutil.which("qmake6")
    print(f"  Qt6:      {'CO (' + qt + ')' if qt else 'CHUA CAI'}")
    print(f"  Platform: {sys.platform}")
    print(f"  Arch:     {platform.machine()}")

    try:
        out = subprocess.run(["free", "-m"], capture_output=True, text=True).stdout
        for line in out.splitlines():
            if line.startswith("Mem:"):
                print(f"  RAM:      {line.split()[1]} MB")
            if line.startswith("Swap:"):
                print(f"  Swap:     {line.split()[1]} MB")
    except Exception:
        pass
    print()


# ---------------------------------------------------------------------------
# uninstall
# ---------------------------------------------------------------------------
def cmd_uninstall(args):
    build = get_build_dir()
    if build.exists():
        info(f"Xoa {build}...")
        shutil.rmtree(build)
        info("Da xoa build artifacts")
    else:
        info("Khong co gi de xoa")


# ---------------------------------------------------------------------------
# main
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(
        prog="neostem",
        description="NEO STEM - Ung dung giao duc STEM tuong tac (Lop 3-9)",
    )
    sub = parser.add_subparsers(dest="command", help="Lenh")

    p_install = sub.add_parser("install", help="Cai dat: clone source + Qt6 deps + build")
    p_install.add_argument("-j", "--jobs", type=int, default=None, help="So luong build jobs")

    sub.add_parser("run", help="Chay ung dung")
    sub.add_parser("status", help="Hien thi trang thai")
    sub.add_parser("uninstall", help="Xoa build artifacts")

    args = parser.parse_args()

    commands = {
        "install": cmd_install,
        "run": cmd_run,
        "status": cmd_status,
        "uninstall": cmd_uninstall,
    }

    if args.command in commands:
        commands[args.command](args)
    else:
        parser.print_help()
        print(f"\n  Bat dau nhanh:")
        print(f"    neostem install   # Clone source + cai Qt6 + build")
        print(f"    neostem run       # Chay ung dung")
        print(f"    neostem status    # Kiem tra trang thai")
        print()


if __name__ == "__main__":
    main()
