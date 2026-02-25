import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Máng nghiêng và viên bi")
    instructions: qsTr("Thay đổi độ cao và góc nghiêng. Quan sát tốc độ viên bi ở cuối máng. Ghi lại dữ liệu.")
    requiredDataPoints: 5
    dataHeaders: [qsTr("Độ cao (cm)"), qsTr("Góc (°)"), qsTr("Tốc độ")]

    property real rampHeight: 20  // 10-50 cm
    property real rampAngle: rampHeight * 0.9  // approximate
    property real ballSpeed: Math.sqrt(rampHeight) * 15  // proportional to sqrt(h)

    experimentArea: [
        Item {
            anchors.fill: parent

            // Ramp
            Canvas {
                anchors.fill: parent
                onPaint: {
                    var ctx = getContext("2d")
                    ctx.clearRect(0, 0, width, height)
                    var topY = height * (0.8 - rampHeight / 70)
                    var bottomY = height * 0.8
                    // Ramp surface
                    ctx.beginPath()
                    ctx.moveTo(width * 0.15, topY)
                    ctx.lineTo(width * 0.65, bottomY)
                    ctx.lineTo(width * 0.65, bottomY + 6)
                    ctx.lineTo(width * 0.15, topY + 6)
                    ctx.closePath()
                    ctx.fillStyle = "#795548"
                    ctx.fill()
                    // Flat section
                    ctx.fillRect(width * 0.65, bottomY, width * 0.3, 6)
                }
                onRampHeightChanged: requestPaint()
            }

            // Ball rolling animation
            Rectangle {
                id: ball
                width: 16; height: 16; radius: 8; color: "#F44336"

                property real animDur: Math.max(300, 2000 - ballSpeed * 15)

                SequentialAnimation on x {
                    id: ballAnimX
                    running: true; loops: Animation.Infinite
                    NumberAnimation { from: parent.width * 0.15; to: parent.width * 0.85; duration: ball.animDur }
                    PauseAnimation { duration: 500 }
                }
                SequentialAnimation on y {
                    id: ballAnimY
                    running: true; loops: Animation.Infinite
                    NumberAnimation {
                        from: parent.height * (0.8 - rampHeight / 70) - 16
                        to: parent.height * 0.8 - 16
                        duration: ball.animDur * 0.75
                    }
                    NumberAnimation {
                        from: parent.height * 0.8 - 16
                        to: parent.height * 0.8 - 16
                        duration: ball.animDur * 0.25
                    }
                    PauseAnimation { duration: 500 }
                }
            }

            // Height marker
            Rectangle {
                x: parent.width * 0.08; y: parent.height * (0.8 - rampHeight / 70)
                width: 3; height: parent.height * 0.8 - y
                color: "#FF9800"

                Text {
                    anchors.right: parent.left; anchors.rightMargin: 4
                    anchors.verticalCenter: parent.verticalCenter
                    text: qsTr("%1 cm").arg(Math.round(rampHeight))
                    font.pixelSize: 12; color: "#FF9800"; font.bold: true
                }
            }

            // Speed display
            Rectangle {
                anchors.right: parent.right; anchors.rightMargin: 8
                anchors.top: parent.top; anchors.topMargin: 8
                width: speedText2.implicitWidth + 16; height: speedText2.implicitHeight + 8
                radius: 8; color: NeoConstants.warmOrange
                Text {
                    id: speedText2; anchors.centerIn: parent
                    text: qsTr("Tốc độ: %1 cm/s").arg(Math.round(ballSpeed))
                    font.pixelSize: NeoConstants.fontCaption; font.bold: true; color: "white"
                }
            }
        }
    ]

    controlsArea: [
        SliderControl {
            anchors.fill: parent; anchors.margins: 8
            label: qsTr("📐 Độ cao máng nghiêng")
            value: rampHeight; from: 10; to: 50; stepSize: 1
            accentColor: NeoConstants.warmOrange
            labels: [qsTr("10cm"), qsTr("30cm"), qsTr("50cm")]
            onValueChanged: rampHeight = value
        }
    ]

    function recordCurrentData() {
        var speedLabel = ballSpeed < 40 ? qsTr("Chậm") : (ballSpeed < 70 ? qsTr("Vừa") : qsTr("Nhanh"))
        addDataPoint([Math.round(rampHeight), Math.round(rampAngle), speedLabel])
    }

    function getConclusion() {
        if (dataPoints.length >= requiredDataPoints) {
            return qsTr("Kết luận: Khi viên bi ở trên cao, nó có THẾ NĂNG hấp dẫn (năng lượng do vị trí). " +
                        "Khi lăn xuống, trọng lực kéo viên bi → thế năng chuyển thành ĐỘNG NĂNG (năng lượng chuyển động). " +
                        "Càng cao → càng nhiều thế năng → càng nhanh ở cuối dốc. " +
                        "Xe đạp xuống dốc cũng vậy — trọng lực chuyển thế năng thành động năng!")
        }
        return qsTr("Cần thêm dữ liệu để kết luận.")
    }
}
