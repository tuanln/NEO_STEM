import QtQuick
import NEO_STEM

ActivityBase {
    questionId: 15
    questionTitle: qsTr("Q15: Cá thở dưới nước")
    drivingQuestion: qsTr("Tại sao cá sống được dưới nước?")

    stepComponents: [
        "qrc:/activities/q15_fish_gills/Step1Phenomenon.qml",
        "qrc:/activities/q15_fish_gills/Step2DQB.qml",
        "qrc:/activities/q15_fish_gills/Step3Investigation.qml",
        "qrc:/activities/q15_fish_gills/Step4Model.qml",
        "qrc:/activities/q15_fish_gills/Step5Problematize.qml"
    ]
}
