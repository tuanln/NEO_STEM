import QtQuick
import NEO_STEM

ProblematizeChallenge {
    title: qsTr("Thách thức: Biến đổi khí hậu và rừng ngập mặn")

    scenario: qsTr("Do biến đổi khí hậu, mực nước biển dâng cao. Một số vùng ven biển bị nhiễm mặn nặng hơn, " +
                   "nồng độ muối trong nước tăng từ 3.5% lên 5%. " +
                   "Đồng thời, một số vùng khác do mưa nhiều bất thường, nước biển bị pha loãng, " +
                   "nồng độ muối giảm xuống 1%.")

    challengeQuestion: qsTr("Điều gì sẽ xảy ra với rừng ngập mặn nếu nồng độ muối thay đổi mạnh?")

    choices: [
        {
            text: qsTr("Cây ngập mặn thích nghi được với một khoảng nồng độ muối nhất định. Thay đổi quá nhiều sẽ gây stress"),
            correct: true,
            explanation: qsTr("Đúng! Cây đước lọc muối hiệu quả ở 2-4%. Muối >5% vượt khả năng lọc → cây stress. Muối <1% → cây ngập mặn thua cạnh tranh với cây nước ngọt. Mỗi loài có giới hạn thích nghi.")
        },
        {
            text: qsTr("Cây ngập mặn sẽ thích nghi hoàn toàn vì chúng đã quen sống trong muối"),
            correct: false,
            explanation: qsTr("Dù thích nghi tốt, mỗi loài có giới hạn. Nồng độ muối thay đổi quá nhanh hoặc quá nhiều sẽ vượt khả năng điều chỉnh của cây.")
        },
        {
            text: qsTr("Rừng ngập mặn sẽ không bị ảnh hưởng vì chúng sống dưới nước"),
            correct: false,
            explanation: qsTr("Rừng ngập mặn RẤT nhạy cảm với nồng độ muối. Thay đổi nồng độ ảnh hưởng trực tiếp đến khả năng hấp thụ nước qua rễ (thẩm thấu).")
        }
    ]

    extendedInfo: qsTr("🌏 Rừng ngập mặn Việt Nam: Cần Giờ (TP.HCM), Cà Mau, Quảng Ninh... " +
                       "là hệ sinh thái quan trọng: chống xói mòn, nuôi dưỡng hải sản, hấp thụ CO₂.\n\n" +
                       "Biến đổi khí hậu đe dọa rừng ngập mặn qua: nước biển dâng, bão mạnh hơn, " +
                       "thay đổi nồng độ muối. Bảo vệ rừng ngập mặn = bảo vệ bờ biển Việt Nam.")
}
