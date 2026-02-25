import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 20
    questionTitle: qsTr("Q20: Chai nước xylophone")
    drivingQuestion: qsTr("Tại sao gõ chai nước khác mực nghe khác nhau?")

    stepComponents: [
        "qrc:/activities/q20_water_xylophone/Step1Phenomenon.qml",
        "qrc:/activities/q20_water_xylophone/Step2DQB.qml",
        "qrc:/activities/q20_water_xylophone/Step3Investigation.qml",
        "qrc:/activities/q20_water_xylophone/Step4Model.qml",
        "qrc:/activities/q20_water_xylophone/Step5Problematize.qml"
    ]
}
