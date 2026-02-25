import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 10
    questionTitle: qsTr("Q10: Nam châm")
    drivingQuestion: qsTr("Tại sao nam châm hút đinh sắt nhưng không hút nhôm?")

    stepComponents: [
        "qrc:/activities/q10_magnet/Step1Phenomenon.qml",
        "qrc:/activities/q10_magnet/Step2DQB.qml",
        "qrc:/activities/q10_magnet/Step3Investigation.qml",
        "qrc:/activities/q10_magnet/Step4Model.qml",
        "qrc:/activities/q10_magnet/Step5Problematize.qml"
    ]
}
