import QtQuick
import NEO_STEM

ProblematizeChallenge {
    title: qsTr("Thách thức: Sương mù vs Smog")

    scenario: qsTr("Ở Đà Lạt, sương mù sáng sớm tan nhanh khi mặt trời lên — bầu trời trong xanh. " +
                   "Nhưng ở Hà Nội vào mùa đông, có những ngày 'sương mù' kéo dài cả ngày, " +
                   "trời xám xịt và không khí có mùi khó chịu. Thực ra đó không phải sương mù thuần túy — " +
                   "người ta gọi là smog (sương mù + ô nhiễm).")

    challengeQuestion: qsTr("Tại sao smog ở Hà Nội kéo dài hơn sương mù tự nhiên ở Đà Lạt?")

    choices: [
        {
            text: qsTr("Vì smog chứa hạt bụi ô nhiễm giữ giọt nước lâu hơn, khó bay hơi"),
            correct: true,
            explanation: qsTr("Đúng! Hạt bụi mịn (PM2.5) làm 'nhân ngưng tụ' — hơi nước bám vào bụi tạo giọt nước bền hơn. Mặt trời khó xuyên qua, nhiệt độ chậm tăng, smog kéo dài.")
        },
        {
            text: qsTr("Vì Hà Nội ở vùng thấp hơn Đà Lạt nên lạnh hơn"),
            correct: false,
            explanation: qsTr("Thực tế Đà Lạt (1500m) lạnh hơn Hà Nội. Vấn đề của smog không phải nhiệt độ mà là ô nhiễm không khí.")
        },
        {
            text: qsTr("Vì Hà Nội có nhiều nước hơn Đà Lạt"),
            correct: false,
            explanation: qsTr("Lượng nước không phải yếu tố chính. Smog kéo dài vì ô nhiễm tạo hạt nhân ngưng tụ và cản ánh sáng mặt trời.")
        }
    ]

    extendedInfo: qsTr("🌍 Ô nhiễm không khí: Hạt PM2.5 từ xe cộ, nhà máy, đốt rác... tạo 'nhân ngưng tụ' nhân tạo. " +
                       "Hơi nước bám vào hạt bụi này dễ hơn bám vào không khí sạch. " +
                       "Đó là lý do thành phố ô nhiễm hay có smog kéo dài.\n\n" +
                       "Giải pháp: Giảm ô nhiễm (xe điện, năng lượng sạch, trồng cây) → Ít nhân ngưng tụ → Ít smog.")
}
