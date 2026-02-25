import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Trống và sóng âm")
    instructions: qsTr("Thay đổi lực đập và kích thước trống. Quan sát hạt gạo nhảy và sóng âm. Ghi lại dữ liệu.")
    requiredDataPoints: 5
    dataHeaders: [qsTr("Lực đập"), qsTr("Kích thước"), qsTr("Biên độ"), qsTr("Tần số (Hz)")]

    property real hitForce: 0.5    // 0-1
    property real drumSize: 0.5    // 0-1: nhỏ→lớn
    property real amplitude: hitForce * 100
    property real frequency: 200 + (1.0 - drumSize) * 400  // smaller = higher pitch

    experimentArea: [
        Item {
            anchors.fill: parent

            // Drum
            Rectangle {
                id: expDrum
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.verticalCenter: parent.verticalCenter
                width: 80 + drumSize * 100; height: width * 0.5
                radius: 8; color: "#D32F2F"
                border.width: 2; border.color: "#B71C1C"

                // Drum skin
                Rectangle {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.bottom: parent.top; anchors.bottomMargin: -3
                    width: parent.width + 6; height: 8; radius: 4
                    color: "#FFF9C4"; border.width: 1; border.color: "#F9A825"

                    SequentialAnimation on scale {
                        running: hitForce > 0
                        loops: Animation.Infinite
                        NumberAnimation { from: 1.0; to: 1.0 + hitForce * 0.05; duration: 60 }
                        NumberAnimation { from: 1.0 + hitForce * 0.05; to: 1.0 - hitForce * 0.03; duration: 60 }
                        NumberAnimation { from: 1.0 - hitForce * 0.03; to: 1.0; duration: 60 }
                        PauseAnimation { duration: Math.max(50, 400 - hitForce * 300) }
                    }
                }
            }

            // Rice grains
            Repeater {
                model: 6
                Rectangle {
                    property real gx: 0.4 + Math.random() * 0.2
                    property real bounceDur: 150 + Math.random() * 100
                    property real bounceH: hitForce * 25
                    x: parent.width * gx
                    width: 4; height: 3; radius: 1; color: "#F5F5DC"
                    SequentialAnimation on y {
                        running: hitForce > 0.1; loops: Animation.Infinite
                        NumberAnimation { from: expDrum.y - 10; to: expDrum.y - 10 - bounceH; duration: bounceDur }
                        NumberAnimation { from: expDrum.y - 10 - bounceH; to: expDrum.y - 10; duration: bounceDur }
                    }
                }
            }

            // Sound wave visualization
            Row {
                anchors.bottom: parent.bottom; anchors.bottomMargin: 10
                anchors.horizontalCenter: parent.horizontalCenter
                spacing: 2
                Repeater {
                    model: 30
                    Rectangle {
                        property real waveH: amplitude * 0.3 * Math.abs(Math.sin((index / 30.0) * Math.PI * 4))
                        width: 4; height: Math.max(2, waveH); radius: 2
                        color: NeoConstants.warmOrange
                        anchors.verticalCenter: parent.verticalCenter
                    }
                }
            }

            // Info badge
            Rectangle {
                anchors.left: parent.left; anchors.leftMargin: 8
                anchors.top: parent.top; anchors.topMargin: 8
                width: infoText.implicitWidth + 16; height: infoText.implicitHeight + 8
                radius: 8; color: NeoConstants.warmOrange
                Text {
                    id: infoText; anchors.centerIn: parent
                    text: qsTr("%1 dB — %2 Hz").arg(Math.round(amplitude)).arg(Math.round(frequency))
                    font.pixelSize: NeoConstants.fontCaption; font.bold: true; color: "white"
                }
            }
        }
    ]

    controlsArea: [
        Column {
            anchors.fill: parent; anchors.margins: 8; spacing: 4
            SliderControl {
                width: parent.width; height: parent.height / 2 - 4
                label: qsTr("💪 Lực đập")
                value: hitForce; from: 0; to: 1.0; stepSize: 0.01
                accentColor: NeoConstants.errorRed
                labels: [qsTr("Nhẹ"), qsTr("Vừa"), qsTr("Mạnh")]
                onValueChanged: hitForce = value
            }
            SliderControl {
                width: parent.width; height: parent.height / 2 - 4
                label: qsTr("📏 Kích thước trống")
                value: drumSize; from: 0; to: 1.0; stepSize: 0.01
                accentColor: NeoConstants.stepTeal
                labels: [qsTr("Nhỏ"), qsTr("Vừa"), qsTr("Lớn")]
                onValueChanged: drumSize = value
            }
        }
    ]

    function recordCurrentData() {
        var forceLabel = hitForce < 0.33 ? qsTr("Nhẹ") : (hitForce < 0.66 ? qsTr("Vừa") : qsTr("Mạnh"))
        var sizeLabel = drumSize < 0.33 ? qsTr("Nhỏ") : (drumSize < 0.66 ? qsTr("Vừa") : qsTr("Lớn"))
        addDataPoint([forceLabel, sizeLabel, Math.round(amplitude), Math.round(frequency)])
    }

    function getConclusion() {
        if (dataPoints.length >= requiredDataPoints) {
            return qsTr("Kết luận: Khi đập trống, mặt trống rung → đẩy không khí xung quanh → tạo sóng âm. " +
                        "Đập mạnh hơn = biên độ lớn hơn = tiếng TO hơn. " +
                        "Trống nhỏ = rung nhanh hơn = tần số CAO hơn = tiếng cao. " +
                        "Trống lớn = rung chậm hơn = tần số THẤP hơn = tiếng trầm. " +
                        "Âm thanh cần môi trường (không khí) để truyền đi!")
        }
        return qsTr("Cần thêm dữ liệu để kết luận.")
    }
}
