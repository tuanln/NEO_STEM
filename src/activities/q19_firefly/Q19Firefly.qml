import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 19
    questionTitle: qsTr("Q19: Đom đóm")
    drivingQuestion: qsTr("Tại sao đom đóm phát sáng trong đêm?")

    stepComponents: [
        "qrc:/activities/q19_firefly/Step1Phenomenon.qml",
        "qrc:/activities/q19_firefly/Step2DQB.qml",
        "qrc:/activities/q19_firefly/Step3Investigation.qml",
        "qrc:/activities/q19_firefly/Step4Model.qml",
        "qrc:/activities/q19_firefly/Step5Problematize.qml"
    ]
}
