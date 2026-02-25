import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Quang hợp")
    instructions: qsTr("Thay đổi ánh sáng, nước và CO₂. Quan sát tốc độ quang hợp qua bọt O₂ và màu lá. Ghi lại dữ liệu.")
    requiredDataPoints: 5
    dataHeaders: [qsTr("Ánh sáng"), qsTr("Nước"), qsTr("CO₂"), qsTr("Tốc độ quang hợp")]

    property real lightLevel: 0.5   // 0-1
    property real waterLevel: 0.5   // 0-1
    property real co2Level: 0.5     // 0-1
    property real photosynthesisRate: Math.min(lightLevel, waterLevel, co2Level) * 100

    experimentArea: [
        Item {
            anchors.fill: parent

            // Background - light intensity
            Rectangle {
                anchors.fill: parent
                color: Qt.rgba(1.0, 1.0, 0.8, lightLevel * 0.4)
            }

            // Sun indicator
            Rectangle {
                x: parent.width * 0.8; y: 8
                width: 36; height: 36; radius: 18
                color: "#FFD600"
                opacity: lightLevel

                Behavior on opacity { NumberAnimation { duration: 300 } }
            }

            // Leaf container
            Rectangle {
                id: leafContainer
                anchors.centerIn: parent
                width: parent.width * 0.45; height: parent.height * 0.55
                radius: 12; color: "transparent"

                // Leaf shape (large oval)
                Rectangle {
                    id: leafBody
                    anchors.centerIn: parent
                    width: parent.width * 0.7; height: parent.height * 0.8
                    radius: width / 2

                    property real greenIntensity: Math.max(0.2, photosynthesisRate / 100)
                    color: Qt.rgba(0.1, 0.3 + greenIntensity * 0.5, 0.1, 1.0)

                    Behavior on color { ColorAnimation { duration: 500 } }

                    // Leaf vein (center)
                    Rectangle {
                        anchors.centerIn: parent
                        width: 2; height: parent.height * 0.8
                        color: Qt.rgba(0.05, 0.25, 0.05, 0.6)
                    }

                    // Leaf veins (side)
                    Repeater {
                        model: 4
                        Rectangle {
                            x: parent.width * 0.5
                            y: parent.height * (0.2 + index * 0.18)
                            width: parent.width * 0.35; height: 1.5
                            color: Qt.rgba(0.05, 0.25, 0.05, 0.5)
                            rotation: -30
                            transformOrigin: Item.Left
                        }
                    }
                    Repeater {
                        model: 4
                        Rectangle {
                            x: parent.width * 0.5
                            y: parent.height * (0.2 + index * 0.18)
                            width: parent.width * 0.35; height: 1.5
                            color: Qt.rgba(0.05, 0.25, 0.05, 0.5)
                            rotation: 30
                            transformOrigin: Item.Left
                        }
                    }

                    // Chloroplasts glow
                    Repeater {
                        model: [
                            { cx: 0.3, cy: 0.25 }, { cx: 0.6, cy: 0.2 },
                            { cx: 0.4, cy: 0.5 }, { cx: 0.65, cy: 0.45 },
                            { cx: 0.35, cy: 0.7 }, { cx: 0.6, cy: 0.72 }
                        ]
                        Rectangle {
                            x: leafBody.width * modelData.cx - 5
                            y: leafBody.height * modelData.cy - 3
                            width: 10; height: 6; radius: 3
                            color: "#1B5E20"
                            opacity: photosynthesisRate / 100

                            Behavior on opacity { NumberAnimation { duration: 400 } }
                        }
                    }
                }

                // O2 bubbles
                Repeater {
                    model: Math.floor(photosynthesisRate / 20)
                    Rectangle {
                        id: bubble
                        property real baseX: leafContainer.width * (0.3 + index * 0.12)
                        property int bubbleDuration: 1800 + index * 400

                        x: baseX
                        width: 8; height: 8; radius: 4
                        color: "transparent"
                        border.width: 1.5; border.color: Qt.rgba(0.3, 0.7, 1.0, 0.7)

                        Text {
                            anchors.centerIn: parent
                            text: "O₂"
                            font.pixelSize: 5; color: "#1565C0"
                        }

                        SequentialAnimation on y {
                            running: true; loops: Animation.Infinite
                            NumberAnimation { from: leafContainer.height * 0.7; to: leafContainer.height * 0.05; duration: bubble.bubbleDuration; easing.type: Easing.OutQuad }
                            NumberAnimation { from: leafContainer.height * 0.7; to: leafContainer.height * 0.7; duration: 0 }
                        }

                        SequentialAnimation on opacity {
                            running: true; loops: Animation.Infinite
                            NumberAnimation { from: 0.9; to: 0.2; duration: bubble.bubbleDuration }
                            NumberAnimation { from: 0.9; to: 0.9; duration: 0 }
                        }
                    }
                }
            }

            // Water indicator
            Rectangle {
                anchors.bottom: leafContainer.bottom
                anchors.horizontalCenter: leafContainer.horizontalCenter
                width: leafContainer.width * 0.5
                height: 8 + waterLevel * 12
                radius: 4
                color: Qt.rgba(0.5, 0.7, 1.0, 0.4 + waterLevel * 0.3)

                Behavior on height { NumberAnimation { duration: 300 } }
                Behavior on color { ColorAnimation { duration: 300 } }

                Text {
                    anchors.centerIn: parent
                    text: qsTr("H₂O")
                    font.pixelSize: 9; color: "#1565C0"; font.bold: true
                    visible: waterLevel > 0.3
                }
            }

            // CO2 arrows
            Repeater {
                model: Math.max(0, Math.floor(co2Level * 4))
                Text {
                    property real startX: leafContainer.x + leafContainer.width * (0.2 + index * 0.22)
                    property int arrowDuration: 2200 + index * 300
                    x: startX; font.pixelSize: 10; color: "#78909C"
                    text: "CO₂"

                    SequentialAnimation on y {
                        running: true; loops: Animation.Infinite
                        NumberAnimation { from: leafContainer.y - 20; to: leafContainer.y + leafContainer.height * 0.3; duration: arrowDuration; easing.type: Easing.InQuad }
                        NumberAnimation { from: leafContainer.y - 20; to: leafContainer.y - 20; duration: 0 }
                    }

                    SequentialAnimation on opacity {
                        running: true; loops: Animation.Infinite
                        NumberAnimation { from: 0.8; to: 0.1; duration: arrowDuration }
                        NumberAnimation { from: 0.8; to: 0.8; duration: 0 }
                    }
                }
            }

            // Rate display
            Rectangle {
                anchors.left: parent.left; anchors.leftMargin: 8
                anchors.top: parent.top; anchors.topMargin: 8
                width: rateText.implicitWidth + 16; height: rateText.implicitHeight + 8
                radius: 8; color: photosynthesisRate > 50 ? NeoConstants.successGreen : (photosynthesisRate > 20 ? NeoConstants.warmOrange : "#78909C")

                Behavior on color { ColorAnimation { duration: 300 } }

                Text {
                    id: rateText; anchors.centerIn: parent
                    text: qsTr("Quang hợp: %1%").arg(Math.round(photosynthesisRate))
                    font.pixelSize: NeoConstants.fontCaption; font.bold: true; color: "white"
                }
            }

            // Leaf color label
            Text {
                anchors.bottom: parent.bottom; anchors.bottomMargin: 8
                anchors.horizontalCenter: parent.horizontalCenter
                text: photosynthesisRate > 60 ? qsTr("Lá xanh đậm - quang hợp mạnh") :
                      (photosynthesisRate > 25 ? qsTr("Lá xanh nhạt - quang hợp yếu") :
                       qsTr("Lá vàng úa - thiếu nguyên liệu"))
                font.pixelSize: NeoConstants.fontCaption; font.bold: true; color: "#333"
            }
        }
    ]

    controlsArea: [
        RowLayout {
            anchors.fill: parent
            anchors.margins: 4
            spacing: 8

            SliderControl {
                Layout.fillWidth: true
                label: qsTr("☀ Ánh sáng")
                value: lightLevel; from: 0; to: 1.0; stepSize: 0.05
                accentColor: NeoConstants.sunshine
                labels: [qsTr("Tối"), qsTr("Vừa"), qsTr("Sáng")]
                onValueChanged: lightLevel = value
            }

            SliderControl {
                Layout.fillWidth: true
                label: qsTr("💧 Nước")
                value: waterLevel; from: 0; to: 1.0; stepSize: 0.05
                accentColor: NeoConstants.oceanBlue
                labels: [qsTr("Khô"), qsTr("Vừa"), qsTr("Ướt")]
                onValueChanged: waterLevel = value
            }

            SliderControl {
                Layout.fillWidth: true
                label: qsTr("🌫 CO₂")
                value: co2Level; from: 0; to: 1.0; stepSize: 0.05
                accentColor: NeoConstants.stepTeal
                labels: [qsTr("Ít"), qsTr("Vừa"), qsTr("Nhiều")]
                onValueChanged: co2Level = value
            }
        }
    ]

    function recordCurrentData() {
        var lightLabel = lightLevel < 0.33 ? qsTr("Yếu") : (lightLevel < 0.66 ? qsTr("Vừa") : qsTr("Mạnh"))
        var waterLabel = waterLevel < 0.33 ? qsTr("Ít") : (waterLevel < 0.66 ? qsTr("Vừa") : qsTr("Nhiều"))
        var co2Label = co2Level < 0.33 ? qsTr("Ít") : (co2Level < 0.66 ? qsTr("Vừa") : qsTr("Nhiều"))
        var rateLabel = photosynthesisRate < 25 ? qsTr("Rất chậm") : (photosynthesisRate < 50 ? qsTr("Chậm") : (photosynthesisRate < 75 ? qsTr("Vừa") : qsTr("Nhanh")))
        addDataPoint([lightLabel, waterLabel, co2Label, rateLabel])
    }

    function getConclusion() {
        if (dataPoints.length >= requiredDataPoints) {
            return qsTr("Kết luận: Quang hợp cần 3 nguyên liệu: ÁNH SÁNG + NƯỚC (H₂O) + KHÍ CO₂. " +
                        "Diệp lục trong lục lạp hấp thụ ánh sáng, dùng năng lượng đó để kết hợp CO₂ và H₂O " +
                        "tạo ra GLUCOSE (đường nuôi cây) và O₂ (khí oxy thải ra). " +
                        "Thiếu bất kỳ nguyên liệu nào → quang hợp chậm → lá nhạt màu, cây yếu. " +
                        "Lá xanh vì diệp lục phản xạ ánh sáng xanh!")
        }
        return qsTr("Cần thêm dữ liệu để kết luận.")
    }
}
