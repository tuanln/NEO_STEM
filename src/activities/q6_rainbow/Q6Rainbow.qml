import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 6
    questionTitle: qsTr("Q6: Cầu vồng")
    drivingQuestion: qsTr("Tại sao cầu vồng xuất hiện sau cơn mưa?")

    stepComponents: [
        "qrc:/activities/q6_rainbow/Step1Phenomenon.qml",
        "qrc:/activities/q6_rainbow/Step2DQB.qml",
        "qrc:/activities/q6_rainbow/Step3Investigation.qml",
        "qrc:/activities/q6_rainbow/Step4Model.qml",
        "qrc:/activities/q6_rainbow/Step5Problematize.qml"
    ]
}
