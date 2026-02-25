import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 5
    questionTitle: qsTr("Q5: Muối biển")
    drivingQuestion: qsTr("Tại sao muối biển lấy được bằng cách phơi nắng?")

    stepComponents: [
        "qrc:/activities/q5_sea_salt/Step1Phenomenon.qml",
        "qrc:/activities/q5_sea_salt/Step2DQB.qml",
        "qrc:/activities/q5_sea_salt/Step3Investigation.qml",
        "qrc:/activities/q5_sea_salt/Step4Model.qml",
        "qrc:/activities/q5_sea_salt/Step5Problematize.qml"
    ]
}
