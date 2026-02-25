import QtQuick
import NEO_STEM

PhenomenonViewer {
    id: step
    title: qsTr("Hiện tượng: Ruộng muối Ninh Thuận")
    description: qsTr("Ruộng muối ven biển Ninh Thuận. Kéo slider thời gian để xem nước biển biến thành muối.")

    hotspots: [
        { x: 0.3, y: 0.5, label: qsTr("Ruộng muối (ngày 1)"), detail: qsTr("Nước biển được bơm vào các ô ruộng nông. Mặt trời chiếu trực tiếp, gió biển thổi — điều kiện lý tưởng để nước bay hơi.") },
        { x: 0.5, y: 0.4, label: qsTr("Nước cạn dần (ngày 2)"), detail: qsTr("Nước bay hơi dần, nồng độ muối trong nước tăng lên. Dung dịch trở nên bão hòa — muối bắt đầu kết tinh.") },
        { x: 0.7, y: 0.6, label: qsTr("Muối kết tinh (ngày 3)"), detail: qsTr("Nước bay hơi hết, muối NaCl kết tinh thành lớp trắng trên ruộng. Diêm dân thu hoạch muối — quá trình tách hỗn hợp bằng bay hơi.") }
    ]

    property real dayProgress: 0.0

    sceneComponent: Component {
        Item {
            anchors.fill: parent

            Rectangle {
                anchors.fill: parent; radius: 12
                gradient: Gradient {
                    GradientStop { position: 0.0; color: "#42A5F5" }
                    GradientStop { position: 0.5; color: "#90CAF9" }
                    GradientStop { position: 1.0; color: "#FFF8E1" }
                }
            }

            Rectangle {
                x: parent.width * 0.75; y: parent.height * 0.05
                width: 50; height: 50; radius: 25; color: NeoConstants.sunshine
            }

            Row {
                anchors.bottom: parent.bottom; anchors.left: parent.left; anchors.right: parent.right
                anchors.bottomMargin: parent.height * 0.15; height: parent.height * 0.35; spacing: 4

                Repeater {
                    model: 3
                    Rectangle {
                        width: (parent.width - 8) / 3; height: parent.height; radius: 4; color: "#8D6E63"
                        Rectangle {
                            anchors.fill: parent; anchors.margins: 4; radius: 2
                            color: { if (step.dayProgress < 0.3) return Qt.rgba(0.5,0.75,0.85,0.8); if (step.dayProgress < 0.7) return Qt.rgba(0.6,0.8,0.85,0.5); return "#FFFFFF" }
                            Behavior on color { ColorAnimation { duration: 500 } }
                            ParticleEffects { anchors.fill: parent; effectType: "crystal"; running: step.dayProgress > 0.5; intensity: Math.max(0, (step.dayProgress-0.5)*2) }
                            ParticleEffects { anchors.fill: parent; effectType: "steam"; running: step.dayProgress < 0.8; intensity: Math.max(0.1, 1.0-step.dayProgress); particleColor: Qt.rgba(1,1,1,0.3) }
                        }
                        Text { anchors.bottom: parent.top; anchors.bottomMargin: 4; anchors.horizontalCenter: parent.horizontalCenter; text: qsTr("Ngày ") + (index+1); font.pixelSize: 11; font.bold: true; color: "#555555" }
                    }
                }
            }

            SliderControl {
                anchors.bottom: parent.bottom; anchors.left: parent.left; anchors.right: parent.right; anchors.margins: 8
                label: qsTr("📅 Thời gian"); value: step.dayProgress; from: 0.0; to: 1.0
                labels: [qsTr("Ngày 1"), qsTr("Ngày 2"), qsTr("Ngày 3")]
                accentColor: NeoConstants.warmOrange; onValueChanged: step.dayProgress = value
            }
        }
    }
}
