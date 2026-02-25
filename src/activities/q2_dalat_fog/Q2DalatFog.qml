import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 2
    questionTitle: qsTr("Q2: Sương mù Đà Lạt")
    drivingQuestion: qsTr("Tại sao Đà Lạt sáng sớm có sương mù, trưa tan hết?")

    stepComponents: [
        "qrc:/activities/q2_dalat_fog/Step1Phenomenon.qml",
        "qrc:/activities/q2_dalat_fog/Step2DQB.qml",
        "qrc:/activities/q2_dalat_fog/Step3Investigation.qml",
        "qrc:/activities/q2_dalat_fog/Step4Model.qml",
        "qrc:/activities/q2_dalat_fog/Step5Problematize.qml"
    ]
}
