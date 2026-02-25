import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Sương mù trong lọ")
    instructions: qsTr("Tạo sương mù trong lọ bằng nước nóng + đá lạnh. Điều chỉnh nhiệt độ nước và quan sát.")
    requiredDataPoints: 4
    dataHeaders: [qsTr("Nhiệt nước (°C)"), qsTr("Có đá lạnh"), qsTr("Sương mù")]

    property real waterTemp: 40
    property bool hasIce: false
    property bool hasFog: false

    onWaterTempChanged: updateFog()
    onHasIceChanged: updateFog()

    function updateFog() {
        // Fog forms when warm moist air meets cold surface
        hasFog = waterTemp >= 50 && hasIce
    }

    experimentArea: [
        Item {
            anchors.fill: parent

            // Glass jar
            Rectangle {
                id: jar
                anchors.centerIn: parent
                width: Math.min(parent.width * 0.4, 200)
                height: width * 1.4
                radius: 12
                color: "transparent"
                border.width: 3
                border.color: Qt.rgba(0.6, 0.8, 1.0, 0.6)

                // Hot water at bottom
                Rectangle {
                    anchors.bottom: parent.bottom
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 4
                    height: parent.height * 0.35
                    radius: 8
                    color: waterTemp > 70 ? "#FFCC80" : (waterTemp > 50 ? "#FFE0B2" : "#B3E5FC")

                    // Steam from hot water
                    ParticleEffects {
                        anchors.fill: parent
                        effectType: "steam"
                        running: waterTemp >= 50
                        intensity: (waterTemp - 50) / 50
                        particleColor: "#E0E0E0"
                    }
                }

                // Ice on top
                Rectangle {
                    visible: hasIce
                    anchors.top: parent.top
                    anchors.horizontalCenter: parent.horizontalCenter
                    anchors.topMargin: 4
                    width: parent.width * 0.7
                    height: 20
                    radius: 4
                    color: "#E3F2FD"
                    border.width: 1
                    border.color: "#90CAF9"

                    Text {
                        anchors.centerIn: parent
                        text: "🧊 " + qsTr("Đá lạnh")
                        font.pixelSize: 11
                        color: "#1565C0"
                    }
                }

                // Fog inside jar
                ParticleEffects {
                    anchors.fill: parent
                    anchors.margins: 8
                    effectType: "fog"
                    running: hasFog
                    intensity: hasFog ? 0.8 : 0
                    particleColor: "white"
                }
            }

            // Labels
            Column {
                anchors.left: parent.left
                anchors.leftMargin: 8
                anchors.verticalCenter: parent.verticalCenter
                spacing: 8

                Rectangle {
                    width: labelRow.implicitWidth + 12
                    height: 28
                    radius: 6
                    color: hasFog ? NeoConstants.successGreen : "#E0E0E0"

                    Text {
                        id: labelRow
                        anchors.centerIn: parent
                        text: hasFog ? qsTr("✓ Sương mù xuất hiện!") : qsTr("Chưa có sương mù")
                        font.pixelSize: 12
                        font.bold: true
                        color: hasFog ? "white" : "#666666"
                    }
                }

                Text {
                    text: qsTr("Nhiệt nước: ") + Math.round(waterTemp) + "°C"
                    font.pixelSize: NeoConstants.fontCaption
                    color: "#555555"
                }
            }

            // Thermometer
            ThermometerWidget {
                anchors.right: parent.right
                anchors.rightMargin: 16
                anchors.verticalCenter: parent.verticalCenter
                temperature: waterTemp
                maxTemp: 100
            }
        }
    ]

    controlsArea: [
        RowLayout {
            anchors.fill: parent
            anchors.margins: 4
            spacing: 12

            SliderControl {
                Layout.fillWidth: true
                label: qsTr("🌡 Nhiệt độ nước")
                value: waterTemp
                from: 20
                to: 90
                stepSize: 5
                unit: "°C"
                accentColor: NeoConstants.warmOrange
                onValueChanged: waterTemp = value
            }

            TouchButton {
                text: hasIce ? qsTr("❄ Bỏ đá") : qsTr("❄ Thêm đá")
                buttonColor: hasIce ? NeoConstants.hintBlue : "#E0E0E0"
                textColor: hasIce ? "white" : "#666666"
                fontSize: NeoConstants.fontCaption
                onClicked: hasIce = !hasIce
            }
        }
    ]

    function recordCurrentData() {
        addDataPoint([Math.round(waterTemp), hasIce ? qsTr("Có") : qsTr("Không"), hasFog ? qsTr("Có") : qsTr("Không")])
    }

    function getConclusion() {
        return qsTr("Kết luận: Sương mù hình thành khi hơi nước ấm gặp bề mặt lạnh và ngưng tụ thành giọt nước li ti. " +
                    "Ở Đà Lạt, ban đêm nhiệt độ giảm thấp, hơi nước trong không khí ngưng tụ thành sương mù. " +
                    "Khi mặt trời lên, nhiệt độ tăng, giọt nước bay hơi và sương tan. " +
                    "Đây là một phần của chu trình nước trong tự nhiên.")
    }
}
