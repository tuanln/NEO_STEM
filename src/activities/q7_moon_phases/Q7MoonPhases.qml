import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 7
    questionTitle: qsTr("Q7: Pha mặt trăng")
    drivingQuestion: qsTr("Tại sao mặt trăng thay đổi hình dạng mỗi đêm?")

    stepComponents: [
        "qrc:/activities/q7_moon_phases/Step1Phenomenon.qml",
        "qrc:/activities/q7_moon_phases/Step2DQB.qml",
        "qrc:/activities/q7_moon_phases/Step3Investigation.qml",
        "qrc:/activities/q7_moon_phases/Step4Model.qml",
        "qrc:/activities/q7_moon_phases/Step5Problematize.qml"
    ]
}
