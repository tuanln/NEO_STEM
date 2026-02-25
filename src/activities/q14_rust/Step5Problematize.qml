import QtQuick
import NEO_STEM

ProblematizeChallenge {
    title: qsTr("Thách thức: Thép không gỉ")

    scenario: qsTr("Nhà bạn Mai có bồn rửa bằng inox (thép không gỉ) đã dùng hơn 10 năm. " +
                   "Dù tiếp xúc nước và không khí hàng ngày, bồn vẫn sáng bóng, không hề gỉ sét. " +
                   "Trong khi đó, cái đinh sắt rơi cạnh bồn chỉ sau vài tuần đã phủ đầy gỉ nâu đỏ. " +
                   "Mai thắc mắc: cả hai đều là thép, tại sao kết quả lại khác nhau hoàn toàn?")

    challengeQuestion: qsTr("Tại sao inox (thép không gỉ) không bị gỉ?")

    choices: [
        {
            text: qsTr("Inox chứa crom (Cr) tạo lớp oxit Cr₂O₃ bảo vệ, ngăn oxy tiếp xúc sắt bên trong"),
            correct: true,
            explanation: qsTr("Đúng! Inox chứa ít nhất 10.5% crom (Cr). Crom phản ứng với oxy tạo lớp Cr₂O₃ cực mỏng (vài nanomét) nhưng rất bền và kín. " +
                             "Lớp này tự phục hồi nếu bị trầy xước! Nó ngăn oxy và nước tiếp xúc sắt bên trong → không xảy ra phản ứng oxy hóa sắt → không gỉ.")
        },
        {
            text: qsTr("Inox được phủ sơn đặc biệt không nhìn thấy bằng mắt thường"),
            correct: false,
            explanation: qsTr("Không phải. Inox không cần sơn phủ — khả năng chống gỉ nằm trong thành phần hợp kim. " +
                             "Crom trong inox tự tạo lớp oxit bảo vệ Cr₂O₃ ở cấp phân tử, không phải lớp sơn bên ngoài.")
        },
        {
            text: qsTr("Inox không chứa sắt nên không thể gỉ"),
            correct: false,
            explanation: qsTr("Sai. Inox (thép không gỉ) vẫn chứa phần lớn là sắt (thường 70-80% Fe). " +
                             "Tên gọi 'thép' đã cho thấy thành phần chính là sắt. Bí mật nằm ở crom (Cr) được thêm vào hợp kim.")
        },
        {
            text: qsTr("Inox cứng hơn nên nước và oxy không thể tấn công"),
            correct: false,
            explanation: qsTr("Độ cứng không liên quan đến chống gỉ. Nhiều kim loại cứng vẫn bị oxy hóa. " +
                             "Inox chống gỉ nhờ lớp oxit crom Cr₂O₃ bảo vệ, không phải nhờ độ cứng.")
        }
    ]

    extendedInfo: qsTr("🔬 Mở rộng: Mỗi kim loại oxy hóa khác nhau!\n\n" +
                       "• Đồng (Cu): Oxy hóa tạo lớp PATINA xanh lục (Cu₂CO₃) — thấy trên tượng Nữ thần Tự do, mái nhà thờ cổ. Lớp patina bảo vệ đồng bên trong.\n\n" +
                       "• Nhôm (Al): Tạo lớp Al₂O₃ cực mỏng, bền, tự phục hồi — giống crom trong inox. Vì vậy nhôm ít gỉ dù rất hoạt động hóa học.\n\n" +
                       "• Vàng (Au): Hầu như không oxy hóa — đó là lý do vàng giữ được vẻ sáng bóng hàng nghìn năm!\n\n" +
                       "Ứng dụng: Sơn, mạ kẽm (galvanize), bôi dầu mỡ — đều là cách ngăn oxy và nước tiếp xúc sắt để chống gỉ.")
}
