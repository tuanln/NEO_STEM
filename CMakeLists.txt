cmake_minimum_required(VERSION 3.16)
project(NEO_STEM VERSION 1.0.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 6.5 REQUIRED COMPONENTS Quick QuickControls2 Multimedia Sql)

qt_add_executable(neostem src/main.cpp)

# Mark singletons BEFORE qt_add_qml_module
set_source_files_properties(src/core/NeoConstants.qml PROPERTIES QT_QML_SINGLETON_TYPE TRUE)
set_source_files_properties(src/core/ProgressTracker.qml PROPERTIES QT_QML_SINGLETON_TYPE TRUE)
set_source_files_properties(src/core/BadgeSystem.qml PROPERTIES QT_QML_SINGLETON_TYPE TRUE)

# Core QML module — types available by name across the app
qt_add_qml_module(neostem
    URI NEO_STEM
    VERSION 1.0
    QML_FILES
        src/core/ActivityBase.qml
        src/core/NeoConstants.qml
        src/core/NeoBar.qml
        src/core/NeoBonus.qml
        src/core/NeoScore.qml
        src/core/NeoAudio.qml
        src/core/DrivingQuestionBoard.qml
        src/core/DQBItem.qml
        src/core/PhenomenonViewer.qml
        src/core/InvestigationBase.qml
        src/core/ModelBuilder.qml
        src/core/ProblematizeChallenge.qml
        src/core/ProgressTracker.qml
        src/core/BadgeSystem.qml
        src/core/TouchButton.qml
        src/core/DragItem.qml
        src/core/DropZone.qml
        src/core/ParticleEffects.qml
        src/core/ThermometerWidget.qml
        src/core/SliderControl.qml
        src/menu/MainMenu.qml
        src/menu/QuestionSelector.qml
        src/menu/StepSelector.qml
        src/menu/ProfileScreen.qml
        src/menu/SettingsScreen.qml
        src/activities/q1_rice_cooker/Q1RiceCooker.qml
        src/activities/q2_dalat_fog/Q2DalatFog.qml
        src/activities/q3_mangrove/Q3Mangrove.qml
        src/activities/q4_ice_glass/Q4IceGlass.qml
        src/activities/q5_sea_salt/Q5SeaSalt.qml
        src/activities/q6_rainbow/Q6Rainbow.qml
        src/activities/q7_moon_phases/Q7MoonPhases.qml
        src/activities/q8_drum_sound/Q8DrumSound.qml
        src/activities/q9_electric_fan/Q9ElectricFan.qml
        src/activities/q10_magnet/Q10Magnet.qml
        src/activities/q11_bicycle/Q11Bicycle.qml
        src/activities/q12_leaf_color/Q12LeafColor.qml
        src/activities/q13_light_bulb/Q13LightBulb.qml
        src/activities/q14_rust/Q14Rust.qml
        src/activities/q15_fish_gills/Q15FishGills.qml
        src/activities/q16_soda_fizz/Q16SodaFizz.qml
        src/activities/q17_ice_cream/Q17IceCream.qml
        src/activities/q18_helium_balloon/Q18HeliumBalloon.qml
        src/activities/q19_firefly/Q19Firefly.qml
        src/activities/q20_water_xylophone/Q20WaterXylophone.qml
    # JS files no longer needed — logic moved inline to QML singletons
)

# Activity step files — loaded dynamically by Loader, not registered as QML types.
qt_add_resources(neostem "activities"
    PREFIX "/activities"
    BASE "src/activities"
    FILES
        src/activities/q1_rice_cooker/Step1Phenomenon.qml
        src/activities/q1_rice_cooker/Step2DQB.qml
        src/activities/q1_rice_cooker/Step3Investigation.qml
        src/activities/q1_rice_cooker/Step4Model.qml
        src/activities/q1_rice_cooker/Step5Problematize.qml
        src/activities/q2_dalat_fog/Step1Phenomenon.qml
        src/activities/q2_dalat_fog/Step2DQB.qml
        src/activities/q2_dalat_fog/Step3Investigation.qml
        src/activities/q2_dalat_fog/Step4Model.qml
        src/activities/q2_dalat_fog/Step5Problematize.qml
        src/activities/q3_mangrove/Step1Phenomenon.qml
        src/activities/q3_mangrove/Step2DQB.qml
        src/activities/q3_mangrove/Step3Investigation.qml
        src/activities/q3_mangrove/Step4Model.qml
        src/activities/q3_mangrove/Step5Problematize.qml
        src/activities/q4_ice_glass/Step1Phenomenon.qml
        src/activities/q4_ice_glass/Step2DQB.qml
        src/activities/q4_ice_glass/Step3Investigation.qml
        src/activities/q4_ice_glass/Step4Model.qml
        src/activities/q4_ice_glass/Step5Problematize.qml
        src/activities/q5_sea_salt/Step1Phenomenon.qml
        src/activities/q5_sea_salt/Step2DQB.qml
        src/activities/q5_sea_salt/Step3Investigation.qml
        src/activities/q5_sea_salt/Step4Model.qml
        src/activities/q5_sea_salt/Step5Problematize.qml
        src/activities/q6_rainbow/Step1Phenomenon.qml
        src/activities/q6_rainbow/Step2DQB.qml
        src/activities/q6_rainbow/Step3Investigation.qml
        src/activities/q6_rainbow/Step4Model.qml
        src/activities/q6_rainbow/Step5Problematize.qml
        src/activities/q7_moon_phases/Step1Phenomenon.qml
        src/activities/q7_moon_phases/Step2DQB.qml
        src/activities/q7_moon_phases/Step3Investigation.qml
        src/activities/q7_moon_phases/Step4Model.qml
        src/activities/q7_moon_phases/Step5Problematize.qml
        src/activities/q8_drum_sound/Step1Phenomenon.qml
        src/activities/q8_drum_sound/Step2DQB.qml
        src/activities/q8_drum_sound/Step3Investigation.qml
        src/activities/q8_drum_sound/Step4Model.qml
        src/activities/q8_drum_sound/Step5Problematize.qml
        src/activities/q9_electric_fan/Step1Phenomenon.qml
        src/activities/q9_electric_fan/Step2DQB.qml
        src/activities/q9_electric_fan/Step3Investigation.qml
        src/activities/q9_electric_fan/Step4Model.qml
        src/activities/q9_electric_fan/Step5Problematize.qml
        src/activities/q10_magnet/Step1Phenomenon.qml
        src/activities/q10_magnet/Step2DQB.qml
        src/activities/q10_magnet/Step3Investigation.qml
        src/activities/q10_magnet/Step4Model.qml
        src/activities/q10_magnet/Step5Problematize.qml
        src/activities/q11_bicycle/Step1Phenomenon.qml
        src/activities/q11_bicycle/Step2DQB.qml
        src/activities/q11_bicycle/Step3Investigation.qml
        src/activities/q11_bicycle/Step4Model.qml
        src/activities/q11_bicycle/Step5Problematize.qml
        src/activities/q12_leaf_color/Step1Phenomenon.qml
        src/activities/q12_leaf_color/Step2DQB.qml
        src/activities/q12_leaf_color/Step3Investigation.qml
        src/activities/q12_leaf_color/Step4Model.qml
        src/activities/q12_leaf_color/Step5Problematize.qml
        src/activities/q13_light_bulb/Step1Phenomenon.qml
        src/activities/q13_light_bulb/Step2DQB.qml
        src/activities/q13_light_bulb/Step3Investigation.qml
        src/activities/q13_light_bulb/Step4Model.qml
        src/activities/q13_light_bulb/Step5Problematize.qml
        src/activities/q14_rust/Step1Phenomenon.qml
        src/activities/q14_rust/Step2DQB.qml
        src/activities/q14_rust/Step3Investigation.qml
        src/activities/q14_rust/Step4Model.qml
        src/activities/q14_rust/Step5Problematize.qml
        src/activities/q15_fish_gills/Step1Phenomenon.qml
        src/activities/q15_fish_gills/Step2DQB.qml
        src/activities/q15_fish_gills/Step3Investigation.qml
        src/activities/q15_fish_gills/Step4Model.qml
        src/activities/q15_fish_gills/Step5Problematize.qml
        src/activities/q16_soda_fizz/Step1Phenomenon.qml
        src/activities/q16_soda_fizz/Step2DQB.qml
        src/activities/q16_soda_fizz/Step3Investigation.qml
        src/activities/q16_soda_fizz/Step4Model.qml
        src/activities/q16_soda_fizz/Step5Problematize.qml
        src/activities/q17_ice_cream/Step1Phenomenon.qml
        src/activities/q17_ice_cream/Step2DQB.qml
        src/activities/q17_ice_cream/Step3Investigation.qml
        src/activities/q17_ice_cream/Step4Model.qml
        src/activities/q17_ice_cream/Step5Problematize.qml
        src/activities/q18_helium_balloon/Step1Phenomenon.qml
        src/activities/q18_helium_balloon/Step2DQB.qml
        src/activities/q18_helium_balloon/Step3Investigation.qml
        src/activities/q18_helium_balloon/Step4Model.qml
        src/activities/q18_helium_balloon/Step5Problematize.qml
        src/activities/q19_firefly/Step1Phenomenon.qml
        src/activities/q19_firefly/Step2DQB.qml
        src/activities/q19_firefly/Step3Investigation.qml
        src/activities/q19_firefly/Step4Model.qml
        src/activities/q19_firefly/Step5Problematize.qml
        src/activities/q20_water_xylophone/Step1Phenomenon.qml
        src/activities/q20_water_xylophone/Step2DQB.qml
        src/activities/q20_water_xylophone/Step3Investigation.qml
        src/activities/q20_water_xylophone/Step4Model.qml
        src/activities/q20_water_xylophone/Step5Problematize.qml
)

target_link_libraries(neostem PRIVATE
    Qt6::Quick
    Qt6::QuickControls2
    Qt6::Multimedia
    Qt6::Sql
)

install(TARGETS neostem
    BUNDLE DESTINATION .
    LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
)
