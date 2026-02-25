import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 17
    questionTitle: qsTr("Q17: Kem tan chảy")
    drivingQuestion: qsTr("Tại sao kem tan nhanh ngoài nắng?")

    stepComponents: [
        "qrc:/activities/q17_ice_cream/Step1Phenomenon.qml",
        "qrc:/activities/q17_ice_cream/Step2DQB.qml",
        "qrc:/activities/q17_ice_cream/Step3Investigation.qml",
        "qrc:/activities/q17_ice_cream/Step4Model.qml",
        "qrc:/activities/q17_ice_cream/Step5Problematize.qml"
    ]
}
