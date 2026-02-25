import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Đun nước sôi")
    instructions: qsTr("Điều chỉnh lửa và quan sát nước thay đổi. Ghi lại nhiệt độ và trạng thái nước tại mỗi mức.")
    requiredDataPoints: 5
    dataHeaders: [qsTr("Nhiệt độ (°C)"), qsTr("Trạng thái")]

    property real currentTemp: 25
    property real heatLevel: 0.0  // 0 = off, 0.33 = low, 0.66 = med, 1.0 = high
    property string waterState: qsTr("Yên tĩnh")

    Timer {
        id: heatTimer
        interval: 100
        running: true
        repeat: true
        onTriggered: {
            // Temperature changes based on heat level
            var targetTemp = 25 + heatLevel * 85  // Max ~110°C
            if (heatLevel > 0) {
                currentTemp = Math.min(currentTemp + (targetTemp - currentTemp) * 0.02, 110)
            } else {
                currentTemp = Math.max(currentTemp - 0.5, 25)
            }

            // Update water state
            if (currentTemp < 40) waterState = qsTr("Yên tĩnh")
            else if (currentTemp < 80) waterState = qsTr("Bọt nhỏ xuất hiện")
            else if (currentTemp < 100) waterState = qsTr("Bọt lớn + hơi nước")
            else waterState = qsTr("Sôi mạnh + nắp rung!")
        }
    }

    // Experiment visualization
    experimentArea: [
        Item {
            anchors.fill: parent

            // Transparent pot
            Rectangle {
                id: pot
                anchors.centerIn: parent
                width: Math.min(parent.width * 0.5, 250)
                height: width * 0.8
                radius: 12
                color: "transparent"
                border.width: 3
                border.color: "#90CAF9"

                // Water
                Rectangle {
                    anchors.bottom: parent.bottom
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 4
                    height: parent.height * 0.65
                    radius: 8
                    color: currentTemp >= 80 ? "#81D4FA" : "#B3E5FC"

                    // Bubbles based on temp
                    ParticleEffects {
                        anchors.fill: parent
                        effectType: "bubbles"
                        running: currentTemp >= 40
                        intensity: Math.min(1.0, (currentTemp - 40) / 60)
                    }
                }

                // Pot lid
                Rectangle {
                    id: potLid
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.bottom: parent.top
                    anchors.bottomMargin: -4
                    width: parent.width + 10
                    height: 14
                    radius: 7
                    color: "#B0BEC5"
                    border.width: 2
                    border.color: "#78909C"

                    // Lid rattle when boiling
                    SequentialAnimation on anchors.bottomMargin {
                        running: currentTemp >= 100
                        loops: Animation.Infinite
                        NumberAnimation { from: -4; to: -9; duration: 120 }
                        NumberAnimation { from: -9; to: -4; duration: 80 }
                        PauseAnimation { duration: 200 }
                    }
                }

                // Steam
                ParticleEffects {
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.bottom: parent.top
                    width: parent.width
                    height: parent.height * 0.6
                    effectType: "steam"
                    running: currentTemp >= 80
                    intensity: Math.min(1.0, (currentTemp - 80) / 20)
                }
            }

            // Stove/flame
            Rectangle {
                anchors.horizontalCenter: pot.horizontalCenter
                anchors.top: pot.bottom
                anchors.topMargin: -2
                width: pot.width * 0.8
                height: 20
                radius: 4
                color: "#455A64"

                // Flame
                Row {
                    anchors.top: parent.top
                    anchors.topMargin: -12
                    anchors.horizontalCenter: parent.horizontalCenter
                    spacing: 4
                    visible: heatLevel > 0

                    Repeater {
                        model: Math.floor(heatLevel * 5) + 1
                        Rectangle {
                            width: 6
                            height: 8 + heatLevel * 8
                            radius: 3
                            color: heatLevel > 0.66 ? "#FF5722" : (heatLevel > 0.33 ? "#FF9800" : "#FFC107")

                            SequentialAnimation on scale {
                                running: heatLevel > 0
                                loops: Animation.Infinite
                                NumberAnimation { from: 1.0; to: 0.6; duration: 120 }
                                NumberAnimation { from: 0.6; to: 1.0; duration: 120 }
                            }
                        }
                    }
                }
            }

            // Thermometer
            ThermometerWidget {
                anchors.right: parent.right
                anchors.rightMargin: 16
                anchors.verticalCenter: parent.verticalCenter
                temperature: currentTemp
                maxTemp: 120
            }

            // State label
            Rectangle {
                anchors.left: parent.left
                anchors.leftMargin: 8
                anchors.top: parent.top
                anchors.topMargin: 8
                width: stateText.implicitWidth + 16
                height: stateText.implicitHeight + 8
                radius: 8
                color: currentTemp >= 100 ? NeoConstants.errorRed
                     : currentTemp >= 80 ? NeoConstants.warmOrange
                     : NeoConstants.oceanBlue

                Text {
                    id: stateText
                    anchors.centerIn: parent
                    text: waterState
                    font.pixelSize: NeoConstants.fontCaption
                    font.bold: true
                    color: "white"
                }
            }
        }
    ]

    // Controls
    controlsArea: [
        SliderControl {
            anchors.fill: parent
            anchors.margins: 8
            label: qsTr("🔥 Mức lửa")
            value: heatLevel
            from: 0.0
            to: 1.0
            stepSize: 0.01
            accentColor: NeoConstants.warmOrange
            labels: [qsTr("Tắt"), qsTr("Nhỏ"), qsTr("Vừa"), qsTr("Lớn")]
            onValueChanged: heatLevel = value
        }
    ]

    function recordCurrentData() {
        var state = waterState
        addDataPoint([Math.round(currentTemp), state])
    }

    function getConclusion() {
        if (dataPoints.length >= requiredDataPoints) {
            return qsTr("Kết luận: Khi nước được đun nóng đến 100°C, nước chuyển từ thể lỏng sang thể khí (hơi nước). " +
                        "Phân tử nước di chuyển nhanh hơn khi nhiệt độ tăng, tạo bọt khí. " +
                        "Hơi nước tạo áp suất đẩy nắp nồi lên, gây ra tiếng rung. " +
                        "Đây là quá trình bay hơi và sôi — một dạng chuyển thể từ lỏng sang khí.")
        }
        return qsTr("Cần thêm dữ liệu để kết luận.")
    }
}
