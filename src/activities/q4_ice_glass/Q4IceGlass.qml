import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 4
    questionTitle: qsTr("Q4: Giọt nước trên ly đá")
    drivingQuestion: qsTr("Tại sao bên ngoài ly đá có giọt nước bám?")

    stepComponents: [
        "qrc:/activities/q4_ice_glass/Step1Phenomenon.qml",
        "qrc:/activities/q4_ice_glass/Step2DQB.qml",
        "qrc:/activities/q4_ice_glass/Step3Investigation.qml",
        "qrc:/activities/q4_ice_glass/Step4Model.qml",
        "qrc:/activities/q4_ice_glass/Step5Problematize.qml"
    ]
}
