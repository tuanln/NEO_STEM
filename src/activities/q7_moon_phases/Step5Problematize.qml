import QtQuick
import NEO_STEM

ProblematizeChallenge {
    title: qsTr("Thách thức: Nguyệt thực vs Trăng mới")

    scenario: qsTr("Bạn Hùng quan sát trời đêm và thấy mặt trăng hoàn toàn tối. Hùng nghĩ đây là trăng mới. " +
                   "Nhưng mẹ Hùng nói đây là nguyệt thực toàn phần! Hùng thắc mắc: cả hai trường hợp " +
                   "mặt trăng đều tối, vậy chúng giống nhau hay khác nhau?")

    challengeQuestion: qsTr("Nguyệt thực và trăng mới khác nhau như thế nào?")

    choices: [
        {
            text: qsTr("Trăng mới do góc nhìn (mặt trời chiếu mặt khuất), nguyệt thực do bóng Trái Đất che"),
            correct: true,
            explanation: qsTr("Đúng! Trăng mới: mặt trời chiếu phía ta không thấy → mặt trăng tối (xảy ra mỗi tháng). Nguyệt thực: Trái Đất nằm giữa, bóng che mặt trăng → tối (hiếm, chỉ khi 3 thiên thể thẳng hàng).")
        },
        {
            text: qsTr("Cả hai hoàn toàn giống nhau, chỉ khác tên gọi"),
            correct: false,
            explanation: qsTr("Sai! Nguyên lý hoàn toàn khác. Trăng mới là hiện tượng thường xuyên do vị trí quỹ đạo. Nguyệt thực là hiện tượng hiếm do bóng Trái Đất.")
        },
        {
            text: qsTr("Nguyệt thực xảy ra ban ngày, trăng mới xảy ra ban đêm"),
            correct: false,
            explanation: qsTr("Cả hai đều quan sát vào ban đêm. Nguyệt thực xảy ra khi trăng tròn (đối diện mặt trời), không phải ban ngày.")
        },
        {
            text: qsTr("Trăng mới do mặt trăng quay mặt khác về phía ta, nguyệt thực do mặt trăng tắt sáng"),
            correct: false,
            explanation: qsTr("Mặt trăng không tự phát sáng nên không thể 'tắt'. Và ta luôn thấy cùng một mặt của mặt trăng (do quay đồng bộ). Sự khác biệt nằm ở ánh sáng chiếu đến, không phải mặt trăng quay.")
        }
    ]

    extendedInfo: qsTr("🌑 Mở rộng: Nguyệt thực toàn phần, mặt trăng thường chuyển màu đỏ đồng ('Trăng máu'). " +
                       "Lý do: ánh sáng mặt trời đi qua khí quyển Trái Đất, bị lọc chỉ còn ánh đỏ, " +
                       "chiếu lên mặt trăng. Giống nguyên lý hoàng hôn đỏ!\n\n" +
                       "Nguyệt thực xảy ra 2-3 lần/năm nhưng không phải nơi nào cũng thấy được.")
}
