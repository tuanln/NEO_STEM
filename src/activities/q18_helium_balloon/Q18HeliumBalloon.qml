import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 18
    questionTitle: qsTr("Q18: Bóng bay heli")
    drivingQuestion: qsTr("Tại sao bóng bay heli bay lên trời?")

    stepComponents: [
        "qrc:/activities/q18_helium_balloon/Step1Phenomenon.qml",
        "qrc:/activities/q18_helium_balloon/Step2DQB.qml",
        "qrc:/activities/q18_helium_balloon/Step3Investigation.qml",
        "qrc:/activities/q18_helium_balloon/Step4Model.qml",
        "qrc:/activities/q18_helium_balloon/Step5Problematize.qml"
    ]
}
