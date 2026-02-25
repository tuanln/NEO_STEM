import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Lăng kính tách ánh sáng")
    instructions: qsTr("Xoay lăng kính để tách ánh sáng trắng thành quang phổ. Ghi lại góc xoay và số màu nhìn thấy.")
    requiredDataPoints: 5
    dataHeaders: [qsTr("Góc (°)"), qsTr("Số màu"), qsTr("Thứ tự màu")]

    property real prismAngle: 0
    property int visibleColors: 0
    property string colorOrder: qsTr("Chưa thấy")

    onPrismAngleChanged: {
        if (prismAngle < 15) {
            visibleColors = 0
            colorOrder = qsTr("Chưa thấy")
        } else if (prismAngle < 30) {
            visibleColors = 2
            colorOrder = qsTr("Đỏ, Cam")
        } else if (prismAngle < 45) {
            visibleColors = 4
            colorOrder = qsTr("Đỏ, Cam, Vàng, Lục")
        } else if (prismAngle < 60) {
            visibleColors = 6
            colorOrder = qsTr("Đỏ, Cam, Vàng, Lục, Lam, Chàm")
        } else {
            visibleColors = 7
            colorOrder = qsTr("Đỏ, Cam, Vàng, Lục, Lam, Chàm, Tím")
        }
    }

    experimentArea: [
        Item {
            anchors.fill: parent

            // White light beam
            Rectangle {
                id: lightBeam
                x: 0; y: parent.height * 0.4
                width: parent.width * 0.35; height: 6
                color: "white"
                border.width: 1; border.color: "#E0E0E0"
            }

            // Prism
            Canvas {
                id: prism
                anchors.centerIn: parent
                width: 80; height: 70
                rotation: prismAngle * 0.5
                onPaint: {
                    var ctx = getContext("2d")
                    ctx.clearRect(0, 0, width, height)
                    ctx.beginPath()
                    ctx.moveTo(width / 2, 0)
                    ctx.lineTo(width, height)
                    ctx.lineTo(0, height)
                    ctx.closePath()
                    ctx.fillStyle = "rgba(200, 230, 255, 0.6)"
                    ctx.fill()
                    ctx.strokeStyle = "#90CAF9"
                    ctx.lineWidth = 2
                    ctx.stroke()
                }
            }

            // Spectrum output
            Column {
                x: parent.width * 0.65
                y: parent.height * 0.2
                width: parent.width * 0.3
                spacing: 2
                Repeater {
                    model: [
                        { c: "#FF0000", n: qsTr("Đỏ"), min: 15 },
                        { c: "#FF7F00", n: qsTr("Cam"), min: 15 },
                        { c: "#FFFF00", n: qsTr("Vàng"), min: 30 },
                        { c: "#00FF00", n: qsTr("Lục"), min: 30 },
                        { c: "#0000FF", n: qsTr("Lam"), min: 45 },
                        { c: "#4B0082", n: qsTr("Chàm"), min: 45 },
                        { c: "#8B00FF", n: qsTr("Tím"), min: 60 }
                    ]
                    Rectangle {
                        width: parent.width
                        height: 8
                        radius: 4
                        color: modelData.c
                        opacity: prismAngle >= modelData.min ? 0.9 : 0.1

                        Behavior on opacity { NumberAnimation { duration: 300 } }
                    }
                }
            }

            // Angle display
            Rectangle {
                anchors.left: parent.left; anchors.leftMargin: 8
                anchors.top: parent.top; anchors.topMargin: 8
                width: angleText.implicitWidth + 16; height: angleText.implicitHeight + 8
                radius: 8; color: NeoConstants.oceanBlue
                Text {
                    id: angleText; anchors.centerIn: parent
                    text: qsTr("Góc: %1° — %2 màu").arg(Math.round(prismAngle)).arg(visibleColors)
                    font.pixelSize: NeoConstants.fontCaption; font.bold: true; color: "white"
                }
            }
        }
    ]

    controlsArea: [
        SliderControl {
            anchors.fill: parent; anchors.margins: 8
            label: qsTr("🔄 Góc xoay lăng kính")
            value: prismAngle; from: 0; to: 75; stepSize: 1
            accentColor: NeoConstants.stepIndigo
            labels: [qsTr("0°"), qsTr("25°"), qsTr("50°"), qsTr("75°")]
            onValueChanged: prismAngle = value
        }
    ]

    function recordCurrentData() {
        addDataPoint([Math.round(prismAngle), visibleColors, colorOrder])
    }

    function getConclusion() {
        if (dataPoints.length >= requiredDataPoints) {
            return qsTr("Kết luận: Ánh sáng trắng thực ra là tổng hợp của nhiều màu. " +
                        "Khi đi qua lăng kính (hoặc giọt nước), ánh sáng bị khúc xạ — mỗi màu bị bẻ cong một góc khác nhau. " +
                        "Đó là lý do ta thấy 7 màu: Đỏ, Cam, Vàng, Lục, Lam, Chàm, Tím. " +
                        "Cầu vồng chính là quang phổ của ánh sáng mặt trời được giọt mưa tách ra!")
        }
        return qsTr("Cần thêm dữ liệu để kết luận.")
    }
}
