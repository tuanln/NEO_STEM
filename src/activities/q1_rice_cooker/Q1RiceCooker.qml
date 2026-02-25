import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 1
    questionTitle: qsTr("Q1: Nồi cơm điện")
    drivingQuestion: qsTr("Tại sao nắp nồi cơm điện rung và có hơi nước?")

    stepComponents: [
        "qrc:/activities/q1_rice_cooker/Step1Phenomenon.qml",
        "qrc:/activities/q1_rice_cooker/Step2DQB.qml",
        "qrc:/activities/q1_rice_cooker/Step3Investigation.qml",
        "qrc:/activities/q1_rice_cooker/Step4Model.qml",
        "qrc:/activities/q1_rice_cooker/Step5Problematize.qml"
    ]
}
