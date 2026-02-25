import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 9
    questionTitle: qsTr("Q9: Quạt điện")
    drivingQuestion: qsTr("Tại sao quạt điện quay khi cắm điện?")

    stepComponents: [
        "qrc:/activities/q9_electric_fan/Step1Phenomenon.qml",
        "qrc:/activities/q9_electric_fan/Step2DQB.qml",
        "qrc:/activities/q9_electric_fan/Step3Investigation.qml",
        "qrc:/activities/q9_electric_fan/Step4Model.qml",
        "qrc:/activities/q9_electric_fan/Step5Problematize.qml"
    ]
}
