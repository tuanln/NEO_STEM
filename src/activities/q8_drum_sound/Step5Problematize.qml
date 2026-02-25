import QtQuick
import NEO_STEM

ProblematizeChallenge {
    title: qsTr("Thách thức: Âm thanh trong vũ trụ")

    scenario: qsTr("Trong phim khoa học viễn tưởng, khi tàu vũ trụ nổ tung, ta nghe tiếng nổ rất lớn. " +
                   "Nhưng trong thực tế, các phi hành gia nói rằng ngoài vũ trụ hoàn toàn IM LẶNG — " +
                   "dù có vụ nổ lớn ngay gần đó, họ không nghe thấy gì cả.")

    challengeQuestion: qsTr("Tại sao trong vũ trụ không nghe được tiếng nổ?")

    choices: [
        {
            text: qsTr("Vì ngoài vũ trụ không có không khí — không có môi trường truyền sóng âm"),
            correct: true,
            explanation: qsTr("Đúng! Âm thanh là sóng cơ học, cần môi trường (khí, lỏng, rắn) để truyền. Vũ trụ gần như chân không — không có phân tử để truyền sóng. Vì vậy dù vụ nổ tạo rung động, không có gì mang âm thanh đến tai.")
        },
        {
            text: qsTr("Vì tiếng nổ quá lớn nên tai người không nghe được"),
            correct: false,
            explanation: qsTr("Nếu có môi trường truyền, tiếng nổ lớn tai vẫn nghe được (dù có thể gây đau). Vấn đề là không có gì để truyền sóng, không phải do cường độ.")
        },
        {
            text: qsTr("Vì khoảng cách quá xa nên âm thanh không đến được"),
            correct: false,
            explanation: qsTr("Khoảng cách làm âm nhỏ đi, nhưng ngay cả vụ nổ sát bên cũng không nghe nếu không có không khí. Vấn đề là thiếu môi trường truyền.")
        },
        {
            text: qsTr("Vì mũ phi hành gia cách âm quá tốt"),
            correct: false,
            explanation: qsTr("Mũ phi hành gia có cách âm, nhưng lý do chính là ngoài vũ trụ không có không khí. Ngay cả bỏ mũ ra (không nên!) cũng không nghe vì không có phân tử truyền sóng.")
        }
    ]

    extendedInfo: qsTr("🚀 Mở rộng: Trên Mặt Trăng cũng không nghe tiếng nói vì không có khí quyển. " +
                       "Phi hành gia giao tiếp bằng sóng radio (sóng điện từ — truyền được trong chân không). " +
                       "Thú vị: Sao Hỏa có bầu khí quyển mỏng, nên ÂM THANH CÓ THỂ TRUYỀN nhưng rất nhỏ!\n\n" +
                       "Trong nước, âm thanh truyền nhanh hơn trong không khí ~4 lần (1500 m/s vs 343 m/s).")
}
