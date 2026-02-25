import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 8
    questionTitle: qsTr("Q8: Tiếng trống")
    drivingQuestion: qsTr("Tại sao đập trống phát ra tiếng vang?")

    stepComponents: [
        "qrc:/activities/q8_drum_sound/Step1Phenomenon.qml",
        "qrc:/activities/q8_drum_sound/Step2DQB.qml",
        "qrc:/activities/q8_drum_sound/Step3Investigation.qml",
        "qrc:/activities/q8_drum_sound/Step4Model.qml",
        "qrc:/activities/q8_drum_sound/Step5Problematize.qml"
    ]
}
