import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 12
    questionTitle: qsTr("Q12: Lá cây xanh")
    drivingQuestion: qsTr("Tại sao lá cây xanh nhưng hoa có nhiều màu?")

    stepComponents: [
        "qrc:/activities/q12_leaf_color/Step1Phenomenon.qml",
        "qrc:/activities/q12_leaf_color/Step2DQB.qml",
        "qrc:/activities/q12_leaf_color/Step3Investigation.qml",
        "qrc:/activities/q12_leaf_color/Step4Model.qml",
        "qrc:/activities/q12_leaf_color/Step5Problematize.qml"
    ]
}
