import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 14
    questionTitle: qsTr("Q14: Rỉ sét")
    drivingQuestion: qsTr("Tại sao sắt để ngoài mưa bị rỉ sét?")

    stepComponents: [
        "qrc:/activities/q14_rust/Step1Phenomenon.qml",
        "qrc:/activities/q14_rust/Step2DQB.qml",
        "qrc:/activities/q14_rust/Step3Investigation.qml",
        "qrc:/activities/q14_rust/Step4Model.qml",
        "qrc:/activities/q14_rust/Step5Problematize.qml"
    ]
}
