import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 16
    questionTitle: qsTr("Q16: Nước ngọt có ga")
    drivingQuestion: qsTr("Tại sao mở chai nước ngọt có ga bọt phun ra?")

    stepComponents: [
        "qrc:/activities/q16_soda_fizz/Step1Phenomenon.qml",
        "qrc:/activities/q16_soda_fizz/Step2DQB.qml",
        "qrc:/activities/q16_soda_fizz/Step3Investigation.qml",
        "qrc:/activities/q16_soda_fizz/Step4Model.qml",
        "qrc:/activities/q16_soda_fizz/Step5Problematize.qml"
    ]
}
