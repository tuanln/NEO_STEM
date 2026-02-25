import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Điều kiện gỉ sét")
    instructions: qsTr("Đặt 3 đinh sắt vào 3 điều kiện khác nhau. Kéo slider ngày để quan sát mức gỉ theo thời gian. Ghi lại dữ liệu.")
    requiredDataPoints: 5
    dataHeaders: [qsTr("Điều kiện"), qsTr("Ngày"), qsTr("Mức gỉ (0-10)")]

    property int condition: 0       // 0=dry sealed, 1=water submerged, 2=salt water
    property int dayCount: 1        // 1-30

    readonly property var conditions: [
        { name: qsTr("Khô kín (hút ẩm)"), color: "#FFF8E1", nailColor: "#B0BEC5", rustRate: 0.0 },
        { name: qsTr("Ngâm nước thường"), color: "#E3F2FD", nailColor: "#78909C", rustRate: 0.25 },
        { name: qsTr("Ngâm nước muối"), color: "#E8F5E9", nailColor: "#78909C", rustRate: 0.5 }
    ]

    property real rustLevel: {
        var rate = conditions[condition].rustRate
        var level = rate * dayCount
        return Math.min(10, Math.round(level * 10) / 10)
    }

    property color rustColor: {
        if (rustLevel < 1) return conditions[condition].nailColor
        if (rustLevel < 4) return "#A1887F"
        if (rustLevel < 7) return "#8D6E63"
        return "#BF360C"
    }

    experimentArea: [
        Item {
            anchors.fill: parent

            // 3 test tubes
            Row {
                anchors.centerIn: parent
                spacing: 16

                Repeater {
                    model: 3
                    Rectangle {
                        width: parent.parent.parent.width * 0.25
                        height: parent.parent.parent.height * 0.7
                        radius: 8
                        color: conditions[index].color
                        border.width: condition === index ? 3 : 1
                        border.color: condition === index ? NeoConstants.warmOrange : "#BDBDBD"

                        Behavior on border.color { ColorAnimation { duration: 200 } }

                        // Test tube label
                        Text {
                            anchors.top: parent.top; anchors.topMargin: 6
                            anchors.horizontalCenter: parent.horizontalCenter
                            text: conditions[index].name
                            font.pixelSize: 10; font.bold: true; color: "#555555"
                            horizontalAlignment: Text.AlignHCenter
                            width: parent.width - 8
                            wrapMode: Text.WordWrap
                        }

                        // Liquid level (water/salt water)
                        Rectangle {
                            visible: index > 0
                            anchors.bottom: parent.bottom; anchors.bottomMargin: 4
                            anchors.left: parent.left; anchors.right: parent.right; anchors.margins: 4
                            height: parent.height * 0.5
                            radius: 4
                            color: index === 2 ? Qt.rgba(0.6, 0.8, 0.7, 0.4) : Qt.rgba(0.6, 0.8, 0.9, 0.4)
                        }

                        // Nail in tube
                        Rectangle {
                            anchors.centerIn: parent; anchors.verticalCenterOffset: 10
                            width: 8; height: 50; radius: 2
                            color: {
                                if (condition === index) return rustColor
                                // Show static state for non-selected tubes
                                var otherRate = conditions[index].rustRate
                                var otherLevel = otherRate * dayCount
                                if (otherLevel < 1) return conditions[index].nailColor
                                if (otherLevel < 4) return "#A1887F"
                                return "#8D6E63"
                            }
                            Behavior on color { ColorAnimation { duration: 300 } }

                            // Nail head
                            Rectangle {
                                anchors.top: parent.top; anchors.horizontalCenter: parent.horizontalCenter
                                width: 16; height: 5; radius: 2
                                color: parent.color
                            }

                            // Rust patches (visible when rusted)
                            Rectangle {
                                visible: {
                                    var rate = conditions[index].rustRate
                                    return rate * dayCount > 2
                                }
                                x: -3; y: 15; width: 14; height: 8; radius: 4
                                color: "#D84315"; opacity: 0.7
                            }
                            Rectangle {
                                visible: {
                                    var rate = conditions[index].rustRate
                                    return rate * dayCount > 5
                                }
                                x: -2; y: 30; width: 12; height: 6; radius: 3
                                color: "#BF360C"; opacity: 0.8
                            }
                        }

                        // Selector
                        MouseArea {
                            anchors.fill: parent
                            onClicked: condition = index
                        }
                    }
                }
            }

            // Rust level display
            Rectangle {
                anchors.right: parent.right; anchors.rightMargin: 8
                anchors.top: parent.top; anchors.topMargin: 8
                width: rustText.implicitWidth + 16; height: rustText.implicitHeight + 8
                radius: 8; color: rustLevel > 5 ? NeoConstants.errorRed : (rustLevel > 0 ? NeoConstants.warmOrange : NeoConstants.successGreen)
                Text {
                    id: rustText; anchors.centerIn: parent
                    text: qsTr("Mức gỉ: %1/10").arg(rustLevel.toFixed(1))
                    font.pixelSize: NeoConstants.fontCaption; font.bold: true; color: "white"
                }
            }

            // Day display
            Rectangle {
                anchors.left: parent.left; anchors.leftMargin: 8
                anchors.top: parent.top; anchors.topMargin: 8
                width: dayText.implicitWidth + 16; height: dayText.implicitHeight + 8
                radius: 8; color: NeoConstants.oceanBlue
                Text {
                    id: dayText; anchors.centerIn: parent
                    text: qsTr("Ngày %1").arg(dayCount)
                    font.pixelSize: NeoConstants.fontCaption; font.bold: true; color: "white"
                }
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
                label: qsTr("📅 Số ngày")
                value: dayCount; from: 1; to: 30; stepSize: 1
                accentColor: NeoConstants.oceanBlue
                labels: [qsTr("1"), qsTr("15"), qsTr("30")]
                onValueChanged: dayCount = value
            }

            Column {
                Layout.fillWidth: true
                spacing: 4

                Text {
                    text: qsTr("🧪 Điều kiện:")
                    font.pixelSize: 12; font.bold: true; color: "#555555"
                }

                Row {
                    spacing: 6
                    Repeater {
                        model: [qsTr("Khô"), qsTr("Nước"), qsTr("Muối")]
                        TouchButton {
                            width: 56; height: 32
                            text: modelData
                            buttonColor: condition === index ? NeoConstants.warmOrange : "#E0E0E0"
                            textColor: condition === index ? "white" : "#666666"
                            fontSize: 11
                            onClicked: condition = index
                        }
                    }
                }
            }
        }
    ]

    function recordCurrentData() {
        addDataPoint([conditions[condition].name, dayCount, rustLevel.toFixed(1)])
    }

    function getConclusion() {
        if (dataPoints.length >= requiredDataPoints) {
            return qsTr("Kết luận: Sắt bị gỉ sét là do phản ứng OXY HÓA: Fe + O₂ + H₂O → Fe₂O₃ (oxit sắt). " +
                        "Cần CẢ nước VÀ oxy — sắt khô kín không gỉ. " +
                        "Nước muối đẩy nhanh quá trình gỉ vì muối tăng tính dẫn điện của nước, giúp electron di chuyển nhanh hơn. " +
                        "Đó là lý do xe máy ở vùng biển dễ gỉ hơn trong thành phố!")
        }
        return qsTr("Cần thêm dữ liệu để kết luận.")
    }
}
