import QtQuick
import NEO_STEM

ProblematizeChallenge {
    title: qsTr("Thách thức: Nồi áp suất")

    scenario: qsTr("Bạn Minh nấu cơm bằng nồi áp suất. Minh nhận thấy nồi áp suất nấu nhanh hơn nồi thường, " +
                   "nhưng khi mở nắp (sau khi xả hơi), nước bên trong vẫn đang sôi sùng sục dù đã tắt bếp. " +
                   "Nhiệt kế cho thấy nước trong nồi áp suất đạt 120°C trước khi tắt bếp.")

    challengeQuestion: qsTr("Tại sao nước trong nồi áp suất sôi ở nhiệt độ cao hơn 100°C?")

    choices: [
        {
            text: qsTr("Vì nồi áp suất tạo áp suất cao hơn, nên nước cần nhiệt độ cao hơn để sôi"),
            correct: true,
            explanation: qsTr("Đúng! Áp suất cao ép phân tử nước lại, cần nhiều năng lượng hơn để chuyển sang thể khí. Nước sôi ở 120°C ở áp suất 2 atm.")
        },
        {
            text: qsTr("Vì nồi áp suất làm nóng nước nhanh hơn nên nhiệt độ sôi tăng"),
            correct: false,
            explanation: qsTr("Tốc độ đun nóng không thay đổi nhiệt độ sôi. Nhiệt độ sôi phụ thuộc vào áp suất, không phải tốc độ đun.")
        },
        {
            text: qsTr("Vì nồi áp suất cách nhiệt tốt hơn nên giữ nhiệt lâu"),
            correct: false,
            explanation: qsTr("Cách nhiệt giúp giữ nhiệt nhưng không thay đổi nhiệt độ sôi. Yếu tố quyết định là áp suất bên trong nồi.")
        },
        {
            text: qsTr("Vì nước trong nồi áp suất là loại nước đặc biệt"),
            correct: false,
            explanation: qsTr("Nước vẫn là H₂O bình thường. Sự khác biệt nằm ở áp suất bên trong nồi, không phải bản chất của nước.")
        }
    ]

    extendedInfo: qsTr("🏔 Mở rộng: Trên đỉnh núi cao (ví dụ Fansipan 3143m), áp suất không khí thấp hơn mực nước biển. " +
                       "Vì vậy nước sôi ở nhiệt độ THẤP hơn 100°C (khoảng 90°C). " +
                       "Đó là lý do nấu cơm trên núi cao thường lâu chín hơn!\n\n" +
                       "Công thức: Áp suất ↑ → Nhiệt độ sôi ↑ | Áp suất ↓ → Nhiệt độ sôi ↓")
}
