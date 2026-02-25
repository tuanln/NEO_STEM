import QtQuick
import NEO_STEM

ProblematizeChallenge {
    title: qsTr("Thách thức: Vệt contrail máy bay")

    scenario: qsTr("Bạn nhìn lên bầu trời và thấy máy bay để lại một vệt trắng dài phía sau. " +
                   "Vệt trắng đó gọi là 'contrail' (condensation trail = vệt ngưng tụ). " +
                   "Ở độ cao 10,000m, nhiệt độ bên ngoài khoảng -50°C. " +
                   "Khí xả từ động cơ máy bay rất nóng (khoảng 600°C) và chứa nhiều hơi nước.")

    challengeQuestion: qsTr("Tại sao máy bay tạo ra vệt trắng trên bầu trời?")

    choices: [
        {
            text: qsTr("Hơi nước nóng từ động cơ gặp không khí cực lạnh, ngưng tụ thành tinh thể băng"),
            correct: true,
            explanation: qsTr("Đúng! Nguyên lý giống hệt giọt nước trên ly đá. Hơi nước nóng → gặp không khí -50°C → ngưng tụ tức thì thành tinh thể băng li ti → tạo vệt trắng.")
        },
        {
            text: qsTr("Máy bay phun khói trắng từ ống xả"),
            correct: false,
            explanation: qsTr("Không phải khói! Vệt trắng là tinh thể băng từ hơi nước ngưng tụ. Tương tự khi bạn thở ra hơi trắng vào ngày lạnh — đó cũng là ngưng tụ.")
        },
        {
            text: qsTr("Máy bay xả nhiên liệu thừa tạo khói trắng"),
            correct: false,
            explanation: qsTr("Máy bay không xả nhiên liệu. Vệt trắng là nước ở dạng tinh thể băng — sản phẩm của ngưng tụ khi hơi nước nóng gặp không khí lạnh.")
        }
    ]

    extendedInfo: qsTr("🌡 So sánh:\n" +
                       "• Ly đá: Hơi nước trong phòng (30°C) gặp ly lạnh (5°C) → giọt nước\n" +
                       "• Contrail: Hơi nước từ động cơ (600°C) gặp không khí (-50°C) → tinh thể băng\n" +
                       "• Thở ngày lạnh: Hơi nước từ phổi (37°C) gặp không khí lạnh (0°C) → hơi trắng\n\n" +
                       "Tất cả cùng nguyên lý: hơi nước gặp lạnh → ngưng tụ!")
}
