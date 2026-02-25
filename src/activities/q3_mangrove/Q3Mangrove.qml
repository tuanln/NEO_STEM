import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 3
    questionTitle: qsTr("Q3: Rừng ngập mặn")
    drivingQuestion: qsTr("Tại sao cây bần/đước sống được trong nước mặn?")

    stepComponents: [
        "qrc:/activities/q3_mangrove/Step1Phenomenon.qml",
        "qrc:/activities/q3_mangrove/Step2DQB.qml",
        "qrc:/activities/q3_mangrove/Step3Investigation.qml",
        "qrc:/activities/q3_mangrove/Step4Model.qml",
        "qrc:/activities/q3_mangrove/Step5Problematize.qml"
    ]
}
