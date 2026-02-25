import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 11
    questionTitle: qsTr("Q11: Xe đạp xuống dốc")
    drivingQuestion: qsTr("Tại sao xe đạp đi nhanh hơn khi xuống dốc?")

    stepComponents: [
        "qrc:/activities/q11_bicycle/Step1Phenomenon.qml",
        "qrc:/activities/q11_bicycle/Step2DQB.qml",
        "qrc:/activities/q11_bicycle/Step3Investigation.qml",
        "qrc:/activities/q11_bicycle/Step4Model.qml",
        "qrc:/activities/q11_bicycle/Step5Problematize.qml"
    ]
}
