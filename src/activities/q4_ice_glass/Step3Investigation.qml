import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Ngưng tụ trên ly")
    instructions: qsTr("Thay đổi số đá (nhiệt độ ly) và độ ẩm không khí. Quan sát khi nào giọt nước xuất hiện.")
    requiredDataPoints: 4
    dataHeaders: [qsTr("Nhiệt ly (°C)"), qsTr("Độ ẩm (%)"), qsTr("Ngưng tụ")]

    property int iceCount: 0        // 0-5
    property real humidity: 60      // 30-95%
    property real glassTemp: 25     // Calculated
    property bool hasCondensation: false

    onIceCountChanged: updateCondensation()
    onHumidityChanged: updateCondensation()

    function updateCondensation() {
        // Glass temp decreases with more ice
        glassTemp = 25 - iceCount * 5

        // Dew point approximation based on humidity
        // Simple formula: Td ≈ T - ((100 - RH)/5)
        var airTemp = 30  // Assume 30°C ambient
        var dewPoint = airTemp - ((100 - humidity) / 5)

        hasCondensation = glassTemp <= dewPoint
    }

    experimentArea: [
        Item {
            anchors.fill: parent

            // Glass with ice
            Rectangle {
                id: expGlass
                anchors.centerIn: parent
                width: Math.min(parent.width * 0.3, 140)
                height: width * 1.5
                radius: 8
                color: "transparent"
                border.width: 3
                border.color: Qt.rgba(0.7, 0.85, 1.0, 0.7)

                // Water
                Rectangle {
                    anchors.bottom: parent.bottom
                    anchors.left: parent.left
                    anchors.right: parent.right
                    anchors.margins: 4
                    height: parent.height * 0.65
                    radius: 6
                    color: Qt.rgba(0.7, 0.9, 1.0, 0.5)

                    // Ice cubes
                    Repeater {
                        model: iceCount
                        Rectangle {
                            x: 5 + (index % 3) * 22
                            y: 5 + Math.floor(index / 3) * 18
                            width: 18
                            height: 14
                            radius: 3
                            color: Qt.rgba(0.85, 0.95, 1.0, 0.8)
                            border.width: 1
                            border.color: Qt.rgba(0.7, 0.88, 1.0, 0.6)
                        }
                    }
                }

                // Condensation
                ParticleEffects {
                    anchors.fill: parent
                    anchors.margins: -6
                    effectType: "condensation"
                    running: hasCondensation
                    intensity: hasCondensation ? Math.min(1.0, iceCount * 0.25) : 0
                }
            }

            // Thermometer
            ThermometerWidget {
                anchors.right: parent.right
                anchors.rightMargin: 16
                anchors.verticalCenter: parent.verticalCenter
                temperature: glassTemp
                minTemp: -5
                maxTemp: 35
            }

            // Info panel
            Column {
                anchors.left: parent.left
                anchors.leftMargin: 8
                anchors.top: parent.top
                anchors.topMargin: 8
                spacing: 6

                Rectangle {
                    width: 140
                    height: 24
                    radius: 6
                    color: NeoConstants.oceanBlue

                    Text {
                        anchors.centerIn: parent
                        text: qsTr("Nhiệt ly: ") + Math.round(glassTemp) + "°C"
                        font.pixelSize: 12
                        font.bold: true
                        color: "white"
                    }
                }

                Rectangle {
                    width: 140
                    height: 24
                    radius: 6
                    color: "#78909C"

                    Text {
                        anchors.centerIn: parent
                        text: qsTr("Điểm sương: ") + Math.round(30 - (100 - humidity) / 5) + "°C"
                        font.pixelSize: 12
                        font.bold: true
                        color: "white"
                    }
                }

                Rectangle {
                    width: 140
                    height: 24
                    radius: 6
                    color: hasCondensation ? NeoConstants.successGreen : "#E0E0E0"

                    Text {
                        anchors.centerIn: parent
                        text: hasCondensation ? qsTr("💧 Ngưng tụ!") : qsTr("Chưa ngưng tụ")
                        font.pixelSize: 12
                        font.bold: true
                        color: hasCondensation ? "white" : "#999999"
                    }
                }
            }
        }
    ]

    controlsArea: [
        RowLayout {
            anchors.fill: parent
            anchors.margins: 4
            spacing: 12

            Column {
                Layout.fillWidth: true
                spacing: 4

                Text {
                    text: qsTr("🧊 Số viên đá: ") + iceCount
                    font.pixelSize: 12
                    font.bold: true
                    color: "#555555"
                }

                Row {
                    spacing: 8

                    TouchButton {
                        width: 44; height: 36
                        text: "−"
                        buttonColor: iceCount > 0 ? NeoConstants.oceanBlue : "#E0E0E0"
                        textColor: "white"
                        fontSize: 20
                        enabled: iceCount > 0
                        onClicked: iceCount--
                    }

                    TouchButton {
                        width: 44; height: 36
                        text: "+"
                        buttonColor: iceCount < 5 ? NeoConstants.oceanBlue : "#E0E0E0"
                        textColor: "white"
                        fontSize: 20
                        enabled: iceCount < 5
                        onClicked: iceCount++
                    }
                }
            }

            SliderControl {
                Layout.fillWidth: true
                label: qsTr("💨 Độ ẩm không khí")
                value: humidity
                from: 30
                to: 95
                stepSize: 5
                unit: "%"
                accentColor: NeoConstants.stepTeal
                onValueChanged: humidity = value
            }
        }
    ]

    function recordCurrentData() {
        addDataPoint([Math.round(glassTemp), Math.round(humidity) + "%", hasCondensation ? qsTr("Có") : qsTr("Không")])
    }

    function getConclusion() {
        return qsTr("Kết luận: Giọt nước bên ngoài ly đá là do NGƯNG TỤ. " +
                    "Hơi nước trong không khí (ở thể khí) gặp thành ly lạnh, " +
                    "nhiệt độ giảm xuống dưới 'điểm sương', hơi nước chuyển thành giọt nước (thể lỏng). " +
                    "Độ ẩm càng cao → điểm sương càng cao → dễ ngưng tụ hơn. " +
                    "Ly càng lạnh (nhiều đá) → ngưng tụ càng nhiều.")
    }
}
