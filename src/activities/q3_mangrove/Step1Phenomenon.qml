import QtQuick
import NEO_STEM

PhenomenonViewer {
    title: qsTr("Hiện tượng: Rừng ngập mặn Cần Giờ")
    description: qsTr("Rừng ngập mặn Cần Giờ, TP.HCM. Cây đước mọc khỏe trong nước mặn, nhưng cây thường lại héo. Tại sao?")

    hotspots: [
        { x: 0.3, y: 0.3, label: qsTr("Cây đước khỏe mạnh"), detail: qsTr("Cây đước có hệ rễ đặc biệt và cơ chế lọc muối. Rễ cọc bám sâu, rễ thở nhô lên mặt nước. Tế bào rễ có thể lọc 90% muối khi hấp thụ nước.") },
        { x: 0.7, y: 0.3, label: qsTr("Cây thường héo úa"), detail: qsTr("Cây bình thường sẽ héo và chết trong nước mặn. Nồng độ muối bên ngoài cao hơn bên trong tế bào, nước bị rút ra ngoài (thẩm thấu ngược).") },
        { x: 0.5, y: 0.7, label: qsTr("Nước mặn"), detail: qsTr("Nước biển có nồng độ muối khoảng 3.5%. Muối NaCl tan trong nước tạo dung dịch có áp suất thẩm thấu cao, ảnh hưởng trực tiếp đến tế bào thực vật.") }
    ]

    sceneComponent: Component {
        Item {
            anchors.fill: parent

            Rectangle {
                anchors.fill: parent; radius: 12
                gradient: Gradient {
                    GradientStop { position: 0.0; color: "#81D4FA" }
                    GradientStop { position: 0.4; color: "#B3E5FC" }
                    GradientStop { position: 1.0; color: "#A5D6A7" }
                }
            }

            Rectangle {
                anchors.bottom: parent.bottom; anchors.left: parent.left; anchors.right: parent.right
                height: parent.height * 0.4; color: "#4DB6AC"; opacity: 0.6; radius: 8
                SequentialAnimation on opacity {
                    running: true; loops: Animation.Infinite
                    NumberAnimation { to: 0.7; duration: 2000; easing.type: Easing.InOutSine }
                    NumberAnimation { to: 0.5; duration: 2000; easing.type: Easing.InOutSine }
                }
            }

            // Healthy mangrove
            Item {
                x: parent.width * 0.15; y: parent.height * 0.15; width: parent.width * 0.3; height: parent.height * 0.7
                Rectangle { anchors.horizontalCenter: parent.horizontalCenter; anchors.bottom: parent.bottom; width: 12; height: parent.height * 0.6; color: "#5D4037" }
                Repeater { model: 5; Rectangle { x: parent.width/2-6+(index-2)*18; y: parent.height*0.5; width: 4; height: parent.height*0.5; color: "#6D4C41"; rotation: (index-2)*12; transformOrigin: Item.Top } }
                Repeater { model: 4; Rectangle { anchors.horizontalCenter: parent.horizontalCenter; y: parent.height*0.05+index*20; width: 50-index*5; height: 30; radius: 15; color: "#2E7D32" } }
                Text { anchors.top: parent.top; anchors.horizontalCenter: parent.horizontalCenter; text: qsTr("Cây đước ✓"); font.pixelSize: 12; font.bold: true; color: NeoConstants.successGreen }
            }

            // Dying regular tree
            Item {
                x: parent.width * 0.6; y: parent.height * 0.2; width: parent.width * 0.3; height: parent.height * 0.65
                Rectangle { anchors.horizontalCenter: parent.horizontalCenter; anchors.bottom: parent.bottom; width: 10; height: parent.height * 0.6; color: "#8D6E63"; rotation: 8 }
                Repeater { model: 3; Rectangle { anchors.horizontalCenter: parent.horizontalCenter; y: parent.height*0.1+index*18; width: 35-index*5; height: 22; radius: 11; color: "#A1887F"; rotation: 5 } }
                Text { anchors.top: parent.top; anchors.horizontalCenter: parent.horizontalCenter; text: qsTr("Cây thường ✗"); font.pixelSize: 12; font.bold: true; color: NeoConstants.errorRed }
            }

            Rectangle {
                anchors.bottom: parent.bottom; anchors.horizontalCenter: parent.horizontalCenter; anchors.bottomMargin: 8
                width: saltLbl.implicitWidth + 16; height: 28; radius: 8; color: Qt.rgba(0,0,0,0.4)
                Text { id: saltLbl; anchors.centerIn: parent; text: qsTr("🌊 Nước mặn 3.5%"); font.pixelSize: 13; font.bold: true; color: "white" }
            }
        }
    }
}
