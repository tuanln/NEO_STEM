import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 13
    questionTitle: qsTr("Q13: Bóng đèn")
    drivingQuestion: qsTr("Tại sao bóng đèn phát sáng khi bật công tắc?")

    stepComponents: [
        "qrc:/activities/q13_light_bulb/Step1Phenomenon.qml",
        "qrc:/activities/q13_light_bulb/Step2DQB.qml",
        "qrc:/activities/q13_light_bulb/Step3Investigation.qml",
        "qrc:/activities/q13_light_bulb/Step4Model.qml",
        "qrc:/activities/q13_light_bulb/Step5Problematize.qml"
    ]
}
