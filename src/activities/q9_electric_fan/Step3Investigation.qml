import QtQuick
import QtQuick.Layouts
import NEO_STEM

InvestigationBase {
    title: qsTr("Thí nghiệm: Mạch điện đơn giản")
    instructions: qsTr("Thay đổi số pin và bật/tắt công tắc. Quan sát tốc độ motor và đèn LED. Ghi lại dữ liệu.")
    requiredDataPoints: 5
    dataHeaders: [qsTr("Số pin"), qsTr("Công tắc"), qsTr("Tốc độ motor"), qsTr("Đèn LED")]

    property int batteryCount: 1   // 1-3
    property bool switchOn: false
    property real motorSpeed: switchOn ? batteryCount * 33.3 : 0
    property string ledStatus: switchOn ? (batteryCount >= 3 ? qsTr("Rất sáng") : (batteryCount >= 2 ? qsTr("Sáng") : qsTr("Mờ"))) : qsTr("Tắt")

    experimentArea: [
        Item {
            anchors.fill: parent

            // Circuit path
            Rectangle {
                anchors.centerIn: parent
                width: parent.width * 0.7; height: parent.height * 0.6
                color: "transparent"; border.width: 3; border.color: switchOn ? "#FFD600" : "#78909C"
                radius: 8

                Behavior on border.color { ColorAnimation { duration: 300 } }
            }

            // Batteries
            Row {
                anchors.left: parent.left; anchors.leftMargin: parent.width * 0.1
                anchors.verticalCenter: parent.verticalCenter
                spacing: 4
                Repeater {
                    model: batteryCount
                    Rectangle {
                        width: 20; height: 36; radius: 3
                        color: switchOn ? "#4CAF50" : "#78909C"
                        border.width: 1; border.color: "#333"
                        Rectangle {
                            anchors.top: parent.top; anchors.horizontalCenter: parent.horizontalCenter
                            width: 10; height: 4; color: "#F44336"
                        }
                        Text { anchors.centerIn: parent; text: "+"; color: "white"; font.pixelSize: 14; font.bold: true }
                    }
                }
            }

            // Switch
            Rectangle {
                anchors.top: parent.top; anchors.topMargin: parent.height * 0.15
                anchors.horizontalCenter: parent.horizontalCenter
                width: 50; height: 30; radius: 15
                color: switchOn ? "#4CAF50" : "#BDBDBD"
                border.width: 2; border.color: "#666"

                Rectangle {
                    width: 24; height: 24; radius: 12
                    color: "white"; anchors.verticalCenter: parent.verticalCenter
                    x: switchOn ? parent.width - width - 3 : 3

                    Behavior on x { NumberAnimation { duration: 200 } }
                }

                MouseArea {
                    anchors.fill: parent
                    onClicked: switchOn = !switchOn
                }

                Behavior on color { ColorAnimation { duration: 200 } }
            }

            // Motor
            Rectangle {
                anchors.right: parent.right; anchors.rightMargin: parent.width * 0.1
                anchors.verticalCenter: parent.verticalCenter
                width: 50; height: 50; radius: 25
                color: "#FFE0B2"; border.width: 2; border.color: "#FF9800"

                Rectangle {
                    anchors.centerIn: parent; width: 30; height: 4; radius: 2
                    color: "#E65100"
                    NumberAnimation on rotation {
                        running: switchOn; from: 0; to: 360
                        duration: Math.max(200, 1200 - batteryCount * 300)
                        loops: Animation.Infinite
                    }
                }
                Text { anchors.bottom: parent.top; anchors.bottomMargin: 4; anchors.horizontalCenter: parent.horizontalCenter; text: qsTr("Motor"); font.pixelSize: 11; color: "#555" }
            }

            // LED
            Rectangle {
                anchors.bottom: parent.bottom; anchors.bottomMargin: parent.height * 0.15
                anchors.horizontalCenter: parent.horizontalCenter
                width: 20; height: 30; radius: 4
                color: switchOn ? "#FFEB3B" : "#616161"
                opacity: switchOn ? (0.4 + batteryCount * 0.2) : 0.5

                Behavior on color { ColorAnimation { duration: 300 } }
                Text { anchors.bottom: parent.top; anchors.bottomMargin: 2; anchors.horizontalCenter: parent.horizontalCenter; text: qsTr("LED"); font.pixelSize: 11; color: "#555" }
            }

            // Speed label
            Rectangle {
                anchors.left: parent.left; anchors.leftMargin: 8
                anchors.top: parent.top; anchors.topMargin: 8
                width: speedText.implicitWidth + 16; height: speedText.implicitHeight + 8
                radius: 8; color: switchOn ? NeoConstants.successGreen : "#78909C"
                Text {
                    id: speedText; anchors.centerIn: parent
                    text: switchOn ? qsTr("Tốc độ: %1%").arg(Math.round(motorSpeed)) : qsTr("Mạch hở")
                    font.pixelSize: NeoConstants.fontCaption; font.bold: true; color: "white"
                }
            }
        }
    ]

    controlsArea: [
        Column {
            anchors.fill: parent; anchors.margins: 8; spacing: 4
            SliderControl {
                width: parent.width; height: parent.height - 4
                label: qsTr("🔋 Số pin")
                value: batteryCount; from: 1; to: 3; stepSize: 1
                accentColor: NeoConstants.successGreen
                labels: [qsTr("1 pin"), qsTr("2 pin"), qsTr("3 pin")]
                onValueChanged: batteryCount = Math.round(value)
            }
        }
    ]

    function recordCurrentData() {
        var speedLabel = !switchOn ? qsTr("Dừng") : (motorSpeed < 50 ? qsTr("Chậm") : (motorSpeed < 80 ? qsTr("Vừa") : qsTr("Nhanh")))
        addDataPoint([batteryCount, switchOn ? qsTr("Bật") : qsTr("Tắt"), speedLabel, ledStatus])
    }

    function getConclusion() {
        if (dataPoints.length >= requiredDataPoints) {
            return qsTr("Kết luận: Quạt điện hoạt động nhờ mạch điện kín. " +
                        "Nguồn điện (pin/ổ cắm) → dây dẫn → công tắc đóng → dòng điện chạy → motor chuyển điện thành chuyển động quay. " +
                        "Nhiều pin hơn = điện áp cao hơn = motor quay nhanh hơn. " +
                        "Công tắc mở = mạch hở = không có dòng điện = quạt dừng!")
        }
        return qsTr("Cần thêm dữ liệu để kết luận.")
    }
}
