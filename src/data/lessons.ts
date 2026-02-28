// 20 bai hoc theo phuong phap OpenSciEd - Hien tuong Neo
// Noi dung tu: 20_cau_hoi_openscied_gdpt2018.docx

export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  body: string;
  answers: Answer[];
  explanation: string;
  concept: string;
  difficulty: 1 | 2 | 3;
  points: number;
}

export interface Lesson {
  id: string;
  grade: 6 | 7 | 8 | 9;
  order: number;
  title: string;
  phenomenon: string;
  wonderPrompt: string;
  drivingQuestion: string;
  gdpt2018: string;
  icon: string;
  questions: Question[];
}

export const LESSONS: Lesson[] = [
  // ===== LOP 6 =====
  {
    id: 'lesson_01',
    grade: 6,
    order: 1,
    title: 'Sương mù Đà Lạt',
    phenomenon: 'Buổi sáng sớm ở Đà Lạt, sương mù dày đặc bao phủ thành phố. Khi mặt trời lên cao, sương dần tan và trời sáng rõ.',
    wonderPrompt: 'Bạn thấy gì lạ trong hiện tượng này?',
    drivingQuestion: 'Tại sao buổi sáng ở Đà Lạt lại có sương mù dày đặc rồi tan đi khi mặt trời lên?',
    gdpt2018: 'KHTN 6: Sự chuyển thể của chất (bay hơi, ngưng tụ); Nhiệt độ',
    icon: '🌫️',
    questions: [
      {
        id: 'q01_01', body: 'Sương mù được tạo thành từ gì?', difficulty: 1, points: 10, concept: 'ngung_tu',
        answers: [
          { id: 'a', text: 'Khói từ nhà máy', isCorrect: false },
          { id: 'b', text: 'Những giọt nước rất nhỏ lơ lửng trong không khí', isCorrect: true },
          { id: 'c', text: 'Bụi từ đất', isCorrect: false },
          { id: 'd', text: 'Khí CO2', isCorrect: false },
        ],
        explanation: 'Sương mù là tập hợp những giọt nước cực nhỏ lơ lửng trong không khí gần mặt đất, hình thành do hơi nước ngưng tụ.',
      },
      {
        id: 'q01_02', body: 'Tại sao sương mù thường xuất hiện vào buổi sáng sớm?', difficulty: 2, points: 10, concept: 'diem_suong',
        answers: [
          { id: 'a', text: 'Vì buổi sáng có nhiều gió', isCorrect: false },
          { id: 'b', text: 'Vì nhiệt độ thấp nhất trong ngày, hơi nước ngưng tụ', isCorrect: true },
          { id: 'c', text: 'Vì mặt trời chưa chiếu sáng', isCorrect: false },
          { id: 'd', text: 'Vì ban đêm cây quang hợp', isCorrect: false },
        ],
        explanation: 'Rạng sáng là lúc nhiệt độ thấp nhất. Khi xuống dưới điểm sương, hơi nước ngưng tụ thành giọt nhỏ tạo sương mù.',
      },
      {
        id: 'q01_03', body: 'Sương mù tan đi khi mặt trời lên vì:', difficulty: 2, points: 10, concept: 'bay_hoi',
        answers: [
          { id: 'a', text: 'Gió thổi sương đi', isCorrect: false },
          { id: 'b', text: 'Nhiệt độ tăng, giọt nước bay hơi trở lại', isCorrect: true },
          { id: 'c', text: 'Sương rơi xuống đất', isCorrect: false },
          { id: 'd', text: 'Cây hấp thu hết sương', isCorrect: false },
        ],
        explanation: 'Khi mặt trời lên, nhiệt độ tăng. Các giọt nước nhỏ bay hơi trở thành hơi nước vô hình. Đây là quá trình ngược với ngưng tụ.',
      },
      {
        id: 'q01_04', body: 'Để tái tạo hiện tượng sương mù, bạn cần:', difficulty: 3, points: 10, concept: 'thi_nghiem',
        answers: [
          { id: 'a', text: 'Đun sôi nước và để nguội', isCorrect: false },
          { id: 'b', text: 'Đặt cốc nước đá trong phòng ẩm, quan sát bên ngoài cốc', isCorrect: true },
          { id: 'c', text: 'Phun nước vào không khí', isCorrect: false },
          { id: 'd', text: 'Dùng quạt thổi hơi nước', isCorrect: false },
        ],
        explanation: 'Cốc nước đá làm lạnh không khí xung quanh, hơi nước ngưng tụ thành giọt nhỏ trên bề mặt cốc — giống nguyên lý sương mù!',
      },
    ],
  },
  {
    id: 'lesson_02',
    grade: 6,
    order: 2,
    title: 'Cây lúa cong khi chín',
    phenomenon: 'Trên cánh đồng lúa, khi lúa chín vàng, bông lúa cong xuống thay vì đứng thẳng như lúc còn xanh.',
    wonderPrompt: 'Tại sao bông lúa lại cong xuống?',
    drivingQuestion: 'Tại sao cây lúa khi chín lại cong xuống chứ không đứng thẳng?',
    gdpt2018: 'KHTN 6: Lực và tác dụng của lực; Trọng lượng; Biến dạng',
    icon: '🌾',
    questions: [
      {
        id: 'q02_01', body: 'Lực nào khiến bông lúa chín cong xuống?', difficulty: 1, points: 10, concept: 'trong_luc',
        answers: [
          { id: 'a', text: 'Lực gió', isCorrect: false },
          { id: 'b', text: 'Trọng lực (lực hút Trái Đất)', isCorrect: true },
          { id: 'c', text: 'Lực từ', isCorrect: false },
          { id: 'd', text: 'Lực đẩy của nước', isCorrect: false },
        ],
        explanation: 'Khi hạt lúa chín, khối lượng tăng lên. Trọng lực kéo bông lúa nặng hơn xuống dưới, khiến thân lúa cong.',
      },
      {
        id: 'q02_02', body: 'Khi treo vật nặng hơn vào đầu que tre, que sẽ:', difficulty: 1, points: 10, concept: 'bien_dang',
        answers: [
          { id: 'a', text: 'Cong nhiều hơn', isCorrect: true },
          { id: 'b', text: 'Đứng thẳng hơn', isCorrect: false },
          { id: 'c', text: 'Không thay đổi', isCorrect: false },
          { id: 'd', text: 'Quay tròn', isCorrect: false },
        ],
        explanation: 'Vật càng nặng, trọng lực càng lớn, que tre càng bị uốn cong nhiều. Đây chính là nguyên lý giống cây lúa chín.',
      },
      {
        id: 'q02_03', body: 'Trọng lượng của một vật phụ thuộc vào:', difficulty: 2, points: 10, concept: 'khoi_luong',
        answers: [
          { id: 'a', text: 'Màu sắc của vật', isCorrect: false },
          { id: 'b', text: 'Khối lượng của vật', isCorrect: true },
          { id: 'c', text: 'Hình dạng của vật', isCorrect: false },
          { id: 'd', text: 'Nhiệt độ của vật', isCorrect: false },
        ],
        explanation: 'Trọng lượng = Khối lượng × Gia tốc trọng trường. Vật có khối lượng càng lớn thì trọng lượng càng lớn.',
      },
      {
        id: 'q02_04', body: '"Lúa chín cúi đầu" là hình ảnh ẩn dụ cho đức tính gì?', difficulty: 3, points: 10, concept: 'lien_he',
        answers: [
          { id: 'a', text: 'Sự yếu đuối', isCorrect: false },
          { id: 'b', text: 'Sự khiêm tốn — càng giỏi càng khiêm nhường', isCorrect: true },
          { id: 'c', text: 'Sự mệt mỏi', isCorrect: false },
          { id: 'd', text: 'Sự sợ hãi', isCorrect: false },
        ],
        explanation: 'Trong văn hóa Việt, "lúa chín cúi đầu" tượng trưng cho sự khiêm tốn. Khoa học giải thích bằng trọng lực, văn hóa gửi gắm bài học làm người.',
      },
    ],
  },
  {
    id: 'lesson_03',
    grade: 6,
    order: 3,
    title: 'Đom đóm phát sáng',
    phenomenon: 'Ban đêm ở vùng quê, đom đóm bay lập lòe phát ra ánh sáng xanh dịu mà không hề nóng như bóng đèn.',
    wonderPrompt: 'Làm sao đom đóm sáng được mà không bị bỏng?',
    drivingQuestion: 'Làm thế nào đom đóm tạo ra ánh sáng mà không nóng như bóng đèn?',
    gdpt2018: 'KHTN 6: Ánh sáng, nguồn sáng; Đa dạng sinh học; Năng lượng',
    icon: '✨',
    questions: [
      {
        id: 'q03_01', body: 'Ánh sáng của đom đóm được tạo ra từ đâu?', difficulty: 1, points: 10, concept: 'phat_quang',
        answers: [
          { id: 'a', text: 'Từ điện trong cơ thể', isCorrect: false },
          { id: 'b', text: 'Từ phản ứng hóa học trong bụng đom đóm', isCorrect: true },
          { id: 'c', text: 'Từ phản chiếu ánh trăng', isCorrect: false },
          { id: 'd', text: 'Từ ma sát khi bay', isCorrect: false },
        ],
        explanation: 'Đom đóm phát sáng nhờ phản ứng hóa học giữa chất luciferin và enzyme luciferase. Đây gọi là phát quang sinh học (bioluminescence).',
      },
      {
        id: 'q03_02', body: 'So với bóng đèn sợi đốt, ánh sáng đom đóm:', difficulty: 2, points: 10, concept: 'nhiet_sang',
        answers: [
          { id: 'a', text: 'Nóng hơn nhiều', isCorrect: false },
          { id: 'b', text: 'Gần như không tỏa nhiệt (ánh sáng lạnh)', isCorrect: true },
          { id: 'c', text: 'Tỏa nhiệt bằng nhau', isCorrect: false },
          { id: 'd', text: 'Nóng hơn một chút', isCorrect: false },
        ],
        explanation: 'Đèn sợi đốt chuyển 90% năng lượng thành nhiệt, chỉ 10% thành ánh sáng. Đom đóm đạt hiệu suất gần 100% — gần như toàn bộ thành ánh sáng!',
      },
      {
        id: 'q03_03', body: 'Đèn LED giống đom đóm ở điểm nào?', difficulty: 2, points: 10, concept: 'led',
        answers: [
          { id: 'a', text: 'Đều dùng lửa để phát sáng', isCorrect: false },
          { id: 'b', text: 'Đều phát sáng hiệu quả, ít tỏa nhiệt', isCorrect: true },
          { id: 'c', text: 'Đều phát sáng nhờ phản ứng hóa học', isCorrect: false },
          { id: 'd', text: 'Đều có màu xanh', isCorrect: false },
        ],
        explanation: 'Đèn LED và đom đóm đều là "ánh sáng lạnh" — phát sáng hiệu quả mà ít tỏa nhiệt. Con người học từ thiên nhiên để tạo công nghệ tốt hơn!',
      },
    ],
  },
  {
    id: 'lesson_04',
    grade: 6,
    order: 4,
    title: 'Cá sống dưới nước',
    phenomenon: 'Cá bơi thoải mái dưới nước hàng giờ, nhưng con người chỉ có thể nín thở dưới nước vài phút.',
    wonderPrompt: 'Cá lấy oxy ở đâu khi sống dưới nước?',
    drivingQuestion: 'Cá lấy oxy ở đâu khi sống dưới nước?',
    gdpt2018: 'KHTN 6: Trao đổi chất ở sinh vật; Đa dạng thế giới sống; Hô hấp',
    icon: '🐟',
    questions: [
      {
        id: 'q04_01', body: 'Cá thở bằng cơ quan nào?', difficulty: 1, points: 10, concept: 'mang_ca',
        answers: [
          { id: 'a', text: 'Phổi', isCorrect: false },
          { id: 'b', text: 'Mang', isCorrect: true },
          { id: 'c', text: 'Da', isCorrect: false },
          { id: 'd', text: 'Miệng', isCorrect: false },
        ],
        explanation: 'Cá sử dụng mang để lọc oxy hòa tan trong nước. Nước chảy qua mang, oxy được hấp thu vào máu.',
      },
      {
        id: 'q04_02', body: 'Nước có chứa oxy không?', difficulty: 1, points: 10, concept: 'oxy_hoa_tan',
        answers: [
          { id: 'a', text: 'Không, nước chỉ có H2O', isCorrect: false },
          { id: 'b', text: 'Có, oxy hòa tan trong nước', isCorrect: true },
          { id: 'c', text: 'Chỉ có khi sục khí', isCorrect: false },
          { id: 'd', text: 'Chỉ nước biển mới có', isCorrect: false },
        ],
        explanation: 'Nước tự nhiên luôn có oxy hòa tan (từ không khí và quang hợp của tảo). Đây là nguồn oxy cho cá và sinh vật thủy sinh.',
      },
      {
        id: 'q04_03', body: 'Tại sao cá chết khi ra khỏi nước?', difficulty: 2, points: 10, concept: 'ho_hap',
        answers: [
          { id: 'a', text: 'Vì không có nước để uống', isCorrect: false },
          { id: 'b', text: 'Vì mang khô, không thể lọc oxy từ không khí', isCorrect: true },
          { id: 'c', text: 'Vì quá nóng', isCorrect: false },
          { id: 'd', text: 'Vì trọng lực quá lớn', isCorrect: false },
        ],
        explanation: 'Mang cá cần nước chảy qua để hoạt động. Trên cạn, mang khô lại và dính chặt, không thể trao đổi khí. Cá "chết đuối" trong không khí!',
      },
    ],
  },
  {
    id: 'lesson_05',
    grade: 6,
    order: 5,
    title: 'Muối biển Việt Nam',
    phenomenon: 'Người dân vùng biển đổ nước biển mặn vào ruộng muối, phơi nắng nhiều ngày, rồi thu được muối trắng tinh.',
    wonderPrompt: 'Muối trắng từ đâu mà ra?',
    drivingQuestion: 'Làm sao người dân lấy được muối trắng từ nước biển mặn?',
    gdpt2018: 'KHTN 6: Chất tinh khiết và hỗn hợp; Tách chất ra khỏi hỗn hợp; Bay hơi',
    icon: '🧂',
    questions: [
      {
        id: 'q05_01', body: 'Nước biển là:', difficulty: 1, points: 10, concept: 'hon_hop',
        answers: [
          { id: 'a', text: 'Chất tinh khiết', isCorrect: false },
          { id: 'b', text: 'Hỗn hợp (nước + muối + khoáng chất)', isCorrect: true },
          { id: 'c', text: 'Hợp chất hóa học', isCorrect: false },
          { id: 'd', text: 'Nguyên tố', isCorrect: false },
        ],
        explanation: 'Nước biển là hỗn hợp gồm nước, muối NaCl, và nhiều khoáng chất khác hòa tan.',
      },
      {
        id: 'q05_02', body: 'Khi phơi nắng ruộng muối, nước biến đi đâu?', difficulty: 1, points: 10, concept: 'bay_hoi',
        answers: [
          { id: 'a', text: 'Nước thấm xuống đất', isCorrect: false },
          { id: 'b', text: 'Nước bay hơi vào không khí', isCorrect: true },
          { id: 'c', text: 'Nước biến thành muối', isCorrect: false },
          { id: 'd', text: 'Nước bị cây hút', isCorrect: false },
        ],
        explanation: 'Nhiệt từ mặt trời làm nước bay hơi. Muối không bay hơi được nên ở lại, kết tinh thành hạt muối trắng.',
      },
      {
        id: 'q05_03', body: 'Phương pháp tách muối ra khỏi nước biển gọi là:', difficulty: 2, points: 10, concept: 'tach_chat',
        answers: [
          { id: 'a', text: 'Lọc', isCorrect: false },
          { id: 'b', text: 'Bay hơi (cô cạn)', isCorrect: true },
          { id: 'c', text: 'Chưng cất', isCorrect: false },
          { id: 'd', text: 'Kết tủa', isCorrect: false },
        ],
        explanation: 'Phương pháp bay hơi (cô cạn) là cách tách chất rắn hòa tan ra khỏi dung dịch bằng cách cho dung môi bay hơi.',
      },
    ],
  },
  // ===== LOP 7 =====
  {
    id: 'lesson_06',
    grade: 7,
    order: 1,
    title: 'Tiếng vọng Sơn Đoòng',
    phenomenon: 'Khi hét lớn trong hang Sơn Đoòng, tiếng vang vọng lại nhiều lần rồi mới tắt hẳn.',
    wonderPrompt: 'Tại sao tiếng vang lại lặp lại nhiều lần?',
    drivingQuestion: 'Tại sao khi hét trong hang lớn, tiếng vang lại vọng lại nhiều lần?',
    gdpt2018: 'KHTN 7: Sóng âm; Tốc độ truyền âm; Phản xạ âm',
    icon: '🔊',
    questions: [
      {
        id: 'q06_01', body: 'Tiếng vang (tiếng vọng) xảy ra do:', difficulty: 1, points: 10, concept: 'phan_xa_am',
        answers: [
          { id: 'a', text: 'Âm thanh bị hấp thu', isCorrect: false },
          { id: 'b', text: 'Âm thanh phản xạ lại từ bề mặt cứng', isCorrect: true },
          { id: 'c', text: 'Không khí rung động mạnh', isCorrect: false },
          { id: 'd', text: 'Gió thổi âm thanh trở lại', isCorrect: false },
        ],
        explanation: 'Tiếng vọng là hiện tượng phản xạ âm — sóng âm gặp bề mặt cứng (vách hang) bật ngược trở lại tai ta.',
      },
      {
        id: 'q06_02', body: 'Trong phòng nhỏ, tại sao ta không nghe thấy tiếng vọng?', difficulty: 2, points: 10, concept: 'khoang_cach_am',
        answers: [
          { id: 'a', text: 'Vì phòng nhỏ không có không khí', isCorrect: false },
          { id: 'b', text: 'Vì khoảng cách quá ngắn, âm phản xạ đến cùng lúc âm gốc', isCorrect: true },
          { id: 'c', text: 'Vì tường phòng hấp thu hết âm', isCorrect: false },
          { id: 'd', text: 'Vì âm thanh không phản xạ trong phòng', isCorrect: false },
        ],
        explanation: 'Tai người cần ít nhất 0.1 giây để phân biệt 2 âm. Phòng nhỏ, âm phản xạ về quá nhanh nên ta nghe như 1 âm duy nhất.',
      },
      {
        id: 'q06_03', body: 'Âm thanh truyền được trong môi trường nào?', difficulty: 2, points: 10, concept: 'truyen_am',
        answers: [
          { id: 'a', text: 'Chỉ trong không khí', isCorrect: false },
          { id: 'b', text: 'Trong chất rắn, lỏng và khí', isCorrect: true },
          { id: 'c', text: 'Chỉ trong chất lỏng', isCorrect: false },
          { id: 'd', text: 'Trong chân không', isCorrect: false },
        ],
        explanation: 'Âm thanh là sóng cơ học, cần môi trường vật chất để truyền. Truyền được qua rắn, lỏng, khí — nhưng KHÔNG truyền trong chân không.',
      },
    ],
  },
  {
    id: 'lesson_07',
    grade: 7,
    order: 2,
    title: 'Lũ lụt miền Trung',
    phenomenon: 'Mỗi mùa mưa, miền Trung Việt Nam lại hứng chịu lũ lụt nghiêm trọng — nước dâng nhanh, ngập sâu.',
    wonderPrompt: 'Tại sao miền Trung bị lũ nặng hơn nơi khác?',
    drivingQuestion: 'Tại sao miền Trung Việt Nam bị lũ lụt nghiêm trọng hơn các vùng khác?',
    gdpt2018: 'KHTN 7: Vòng tuần hoàn nước; Khí quyển và thời tiết; Tác động của con người',
    icon: '🌊',
    questions: [
      {
        id: 'q07_01', body: 'Nước mưa sau khi rơi xuống sẽ:', difficulty: 1, points: 10, concept: 'tuan_hoan_nuoc',
        answers: [
          { id: 'a', text: 'Biến mất hoàn toàn', isCorrect: false },
          { id: 'b', text: 'Chảy theo địa hình, thấm vào đất, hoặc bay hơi', isCorrect: true },
          { id: 'c', text: 'Đứng yên tại chỗ', isCorrect: false },
          { id: 'd', text: 'Bay ngược lên trời ngay', isCorrect: false },
        ],
        explanation: 'Nước mưa tham gia vòng tuần hoàn: chảy theo địa hình → sông suối → biển, hoặc thấm vào đất, hoặc bay hơi trở lại.',
      },
      {
        id: 'q07_02', body: 'Miền Trung hay bị lũ vì địa hình:', difficulty: 2, points: 10, concept: 'dia_hinh',
        answers: [
          { id: 'a', text: 'Bằng phẳng như đồng bằng', isCorrect: false },
          { id: 'b', text: 'Hẹp, dốc — núi gần biển, sông ngắn', isCorrect: true },
          { id: 'c', text: 'Nhiều hồ chứa nước lớn', isCorrect: false },
          { id: 'd', text: 'Cao nguyên rộng', isCorrect: false },
        ],
        explanation: 'Miền Trung có dải đất hẹp, núi sát biển, sông ngắn dốc. Mưa lớn → nước dồn nhanh xuống đồng bằng nhỏ → ngập lụt.',
      },
      {
        id: 'q07_03', body: 'Cảm biến siêu âm có thể giúp cảnh báo lũ bằng cách:', difficulty: 3, points: 10, concept: 'ung_dung',
        answers: [
          { id: 'a', text: 'Đo nhiệt độ nước', isCorrect: false },
          { id: 'b', text: 'Đo mực nước sông liên tục và gửi cảnh báo khi vượt ngưỡng', isCorrect: true },
          { id: 'c', text: 'Chặn nước lũ', isCorrect: false },
          { id: 'd', text: 'Hút nước sông', isCorrect: false },
        ],
        explanation: 'Cảm biến siêu âm đo khoảng cách đến mặt nước. Khi mực nước dâng vượt ngưỡng → gửi tín hiệu cảnh báo qua IoT. Đây là ứng dụng STEM thực tế!',
      },
    ],
  },
  {
    id: 'lesson_08',
    grade: 7,
    order: 3,
    title: 'Baking soda + Giấm',
    phenomenon: 'Khi trộn baking soda (bột nở) với giấm ăn, hỗn hợp sủi bọt mạnh, phun khí ra ngoài.',
    wonderPrompt: 'Chất gì được tạo ra từ phản ứng này?',
    drivingQuestion: 'Tại sao trộn baking soda với giấm lại tạo ra bọt khí mạnh?',
    gdpt2018: 'KHTN 7: Phản ứng hóa học; Dấu hiệu nhận biết PƯHH; Định luật bảo toàn khối lượng',
    icon: '🧪',
    questions: [
      {
        id: 'q08_01', body: 'Bọt khí tạo ra khi trộn baking soda và giấm là:', difficulty: 1, points: 10, concept: 'phan_ung_hh',
        answers: [
          { id: 'a', text: 'Hơi nước', isCorrect: false },
          { id: 'b', text: 'Khí CO2 (carbon dioxide)', isCorrect: true },
          { id: 'c', text: 'Khí oxy', isCorrect: false },
          { id: 'd', text: 'Khí hydrogen', isCorrect: false },
        ],
        explanation: 'Phản ứng: NaHCO3 + CH3COOH → CH3COONa + H2O + CO2↑. Khí CO2 thoát ra tạo thành bọt sủi mạnh.',
      },
      {
        id: 'q08_02', body: 'Đây là phản ứng hóa học vì:', difficulty: 2, points: 10, concept: 'dau_hieu_puhh',
        answers: [
          { id: 'a', text: 'Chỉ thay đổi hình dạng', isCorrect: false },
          { id: 'b', text: 'Có chất mới được tạo ra (CO2, nước, muối)', isCorrect: true },
          { id: 'c', text: 'Chỉ trộn lẫn hai chất', isCorrect: false },
          { id: 'd', text: 'Nhiệt độ không thay đổi', isCorrect: false },
        ],
        explanation: 'Dấu hiệu phản ứng hóa học: tạo chất mới (khí CO2 sủi bọt), thay đổi không quay ngược lại được.',
      },
      {
        id: 'q08_03', body: 'Nếu cân hỗn hợp trong hệ kín trước và sau phản ứng:', difficulty: 3, points: 10, concept: 'bao_toan_kl',
        answers: [
          { id: 'a', text: 'Khối lượng giảm vì khí thoát ra', isCorrect: false },
          { id: 'b', text: 'Khối lượng không đổi (Định luật bảo toàn khối lượng)', isCorrect: true },
          { id: 'c', text: 'Khối lượng tăng', isCorrect: false },
          { id: 'd', text: 'Không thể đo được', isCorrect: false },
        ],
        explanation: 'Trong hệ kín, tổng khối lượng trước = tổng khối lượng sau. Nếu hệ mở, CO2 bay đi nên "có vẻ" nhẹ hơn — nhưng khối lượng tổng thể được bảo toàn!',
      },
    ],
  },
  {
    id: 'lesson_09',
    grade: 7,
    order: 4,
    title: 'Rừng ngập mặn Cần Giờ',
    phenomenon: 'Rừng ngập mặn Cần Giờ sống khỏe trong nước mặn, trong khi hầu hết cây trồng khác chết khi tưới nước muối.',
    wonderPrompt: 'Cây ngập mặn có bí quyết gì đặc biệt?',
    drivingQuestion: 'Tại sao rừng ngập mặn có thể sống được trong nước mặn?',
    gdpt2018: 'KHTN 7: Trao đổi nước và muối khoáng ở thực vật; Hệ sinh thái; Chuỗi thức ăn',
    icon: '🌿',
    questions: [
      {
        id: 'q09_01', body: 'Cây hấp thu nước chủ yếu qua bộ phận nào?', difficulty: 1, points: 10, concept: 're_cay',
        answers: [
          { id: 'a', text: 'Lá', isCorrect: false },
          { id: 'b', text: 'Rễ', isCorrect: true },
          { id: 'c', text: 'Thân', isCorrect: false },
          { id: 'd', text: 'Hoa', isCorrect: false },
        ],
        explanation: 'Rễ cây có lông hút để hấp thu nước và muối khoáng từ đất. Cây ngập mặn có hệ rễ đặc biệt thích nghi với môi trường mặn.',
      },
      {
        id: 'q09_02', body: 'Nếu tưới nước muối đậm đặc cho cây thường, cây sẽ:', difficulty: 2, points: 10, concept: 'tham_thau',
        answers: [
          { id: 'a', text: 'Lớn nhanh hơn', isCorrect: false },
          { id: 'b', text: 'Mất nước và héo chết (thẩm thấu ngược)', isCorrect: true },
          { id: 'c', text: 'Không thay đổi gì', isCorrect: false },
          { id: 'd', text: 'Ra hoa sớm hơn', isCorrect: false },
        ],
        explanation: 'Nước muối đậm đặc bên ngoài rễ → nước trong tế bào rễ bị kéo ra ngoài (thẩm thấu). Cây mất nước và chết.',
      },
      {
        id: 'q09_03', body: 'Rừng ngập mặn có vai trò gì với môi trường?', difficulty: 2, points: 10, concept: 'he_sinh_thai',
        answers: [
          { id: 'a', text: 'Chỉ cung cấp gỗ', isCorrect: false },
          { id: 'b', text: 'Chắn sóng, lọc nước, là nhà của nhiều loài', isCorrect: true },
          { id: 'c', text: 'Gây ô nhiễm nước', isCorrect: false },
          { id: 'd', text: 'Không có vai trò đặc biệt', isCorrect: false },
        ],
        explanation: 'Rừng ngập mặn là "lá phổi xanh" ven biển: chắn sóng bão, lọc ô nhiễm, là nơi sinh sản của tôm cá, hấp thu CO2.',
      },
    ],
  },
  {
    id: 'lesson_10',
    grade: 7,
    order: 5,
    title: 'Ốc sên và vệt nhầy',
    phenomenon: 'Ốc sên bò chậm rãi, để lại vệt nhầy óng ánh trên lá và có thể bò trên mọi bề mặt, kể cả kính dựng đứng.',
    wonderPrompt: 'Chất nhầy giúp gì cho ốc sên?',
    drivingQuestion: 'Tại sao ốc sên để lại vệt nhầy và bò được trên mọi bề mặt?',
    gdpt2018: 'KHTN 7: Lực ma sát; Tốc độ chuyển động; Thích nghi của sinh vật',
    icon: '🐌',
    questions: [
      {
        id: 'q10_01', body: 'Chất nhầy của ốc sên có tác dụng chính là:', difficulty: 1, points: 10, concept: 'ma_sat',
        answers: [
          { id: 'a', text: 'Trang trí', isCorrect: false },
          { id: 'b', text: 'Giảm ma sát và tạo độ bám để di chuyển', isCorrect: true },
          { id: 'c', text: 'Thu hút bạn tình', isCorrect: false },
          { id: 'd', text: 'Chống nắng', isCorrect: false },
        ],
        explanation: 'Chất nhầy vừa giảm ma sát (giúp bò êm) vừa tạo lực bám (giúp bò trên bề mặt dốc). Đây là sự thích nghi tuyệt vời của sinh vật!',
      },
      {
        id: 'q10_02', body: 'Vật di chuyển trên bề mặt trơn sẽ:', difficulty: 1, points: 10, concept: 'luc_ma_sat',
        answers: [
          { id: 'a', text: 'Di chuyển chậm hơn', isCorrect: false },
          { id: 'b', text: 'Dễ trượt vì lực ma sát nhỏ', isCorrect: true },
          { id: 'c', text: 'Không thể di chuyển', isCorrect: false },
          { id: 'd', text: 'Di chuyển ổn định hơn', isCorrect: false },
        ],
        explanation: 'Bề mặt trơn → lực ma sát nhỏ → vật dễ trượt. Ngược lại, bề mặt nhám → ma sát lớn → khó trượt.',
      },
      {
        id: 'q10_03', body: 'Ốc sên bò trên kính đứng được vì:', difficulty: 3, points: 10, concept: 'bam_dinh',
        answers: [
          { id: 'a', text: 'Ốc sên rất nhẹ nên không rơi', isCorrect: false },
          { id: 'b', text: 'Chất nhầy tạo lực bám dính lớn hơn trọng lực', isCorrect: true },
          { id: 'c', text: 'Kính có nam châm hút ốc', isCorrect: false },
          { id: 'd', text: 'Ốc sên có chân hút', isCorrect: false },
        ],
        explanation: 'Chất nhầy + chân cơ bụng rộng tạo lực bám dính mạnh. Khi lực bám > trọng lực kéo xuống, ốc sên leo được bề mặt dựng đứng!',
      },
    ],
  },
  // ===== LOP 8 =====
  {
    id: 'lesson_11',
    grade: 8,
    order: 1,
    title: 'Pin mặt trời',
    phenomenon: 'Trên nóc nhiều nhà ở Việt Nam, các tấm pin mặt trời hấp thu ánh sáng và tạo ra điện dùng cho cả gia đình.',
    wonderPrompt: 'Ánh sáng biến thành điện như thế nào?',
    drivingQuestion: 'Làm sao ánh sáng mặt trời biến thành điện để dùng trong nhà?',
    gdpt2018: 'KHTN 8: Năng lượng điện; Chuyển hóa năng lượng; Năng lượng tái tạo',
    icon: '☀️',
    questions: [
      {
        id: 'q11_01', body: 'Pin mặt trời chuyển hóa năng lượng nào thành điện?', difficulty: 1, points: 10, concept: 'chuyen_hoa_nl',
        answers: [
          { id: 'a', text: 'Năng lượng nhiệt', isCorrect: false },
          { id: 'b', text: 'Năng lượng ánh sáng', isCorrect: true },
          { id: 'c', text: 'Năng lượng gió', isCorrect: false },
          { id: 'd', text: 'Năng lượng hóa học', isCorrect: false },
        ],
        explanation: 'Pin mặt trời (solar cell) chuyển trực tiếp năng lượng ánh sáng thành năng lượng điện nhờ hiệu ứng quang điện.',
      },
      {
        id: 'q11_02', body: 'Năng lượng mặt trời là năng lượng:', difficulty: 1, points: 10, concept: 'tai_tao',
        answers: [
          { id: 'a', text: 'Không tái tạo (như dầu, than)', isCorrect: false },
          { id: 'b', text: 'Tái tạo (không bao giờ cạn kiệt)', isCorrect: true },
          { id: 'c', text: 'Hạt nhân', isCorrect: false },
          { id: 'd', text: 'Hóa thạch', isCorrect: false },
        ],
        explanation: 'Mặt trời chiếu sáng hàng tỷ năm nữa → năng lượng mặt trời là tái tạo, sạch, không gây ô nhiễm.',
      },
      {
        id: 'q11_03', body: 'Tại sao pin mặt trời chỉ tạo điện khi có nắng?', difficulty: 2, points: 10, concept: 'quang_dien',
        answers: [
          { id: 'a', text: 'Vì pin cần nhiệt để hoạt động', isCorrect: false },
          { id: 'b', text: 'Vì cần photon ánh sáng để kích thích electron', isCorrect: true },
          { id: 'c', text: 'Vì pin bị hỏng khi trời tối', isCorrect: false },
          { id: 'd', text: 'Vì ban đêm pin tự tắt', isCorrect: false },
        ],
        explanation: 'Pin mặt trời cần photon (hạt ánh sáng) chiếu vào để đẩy electron di chuyển, tạo dòng điện. Không có ánh sáng = không có dòng điện.',
      },
    ],
  },
  {
    id: 'lesson_12',
    grade: 8,
    order: 2,
    title: 'Nước giếng nhiễm phèn',
    phenomenon: 'Ở nhiều vùng ĐBSCL, nước giếng khoan có màu vàng, mùi tanh, không thể uống trực tiếp.',
    wonderPrompt: 'Chất gì làm nước giếng có màu vàng?',
    drivingQuestion: 'Tại sao nước giếng ở một số nơi có mùi tanh và màu vàng?',
    gdpt2018: 'KHTN 8: Axit - Bazơ - Muối; pH; Tách chất',
    icon: '💧',
    questions: [
      {
        id: 'q12_01', body: 'Nước giếng nhiễm phèn có tính:', difficulty: 1, points: 10, concept: 'axit',
        answers: [
          { id: 'a', text: 'Trung tính', isCorrect: false },
          { id: 'b', text: 'Axit (pH thấp)', isCorrect: true },
          { id: 'c', text: 'Bazơ (pH cao)', isCorrect: false },
          { id: 'd', text: 'Không xác định được', isCorrect: false },
        ],
        explanation: 'Nước phèn chứa muối sắt (III) và có tính axit. Giấy quỳ tím sẽ chuyển đỏ khi nhúng vào nước phèn.',
      },
      {
        id: 'q12_02', body: 'Để kiểm tra độ axit/bazơ của nước, ta dùng:', difficulty: 1, points: 10, concept: 'pH',
        answers: [
          { id: 'a', text: 'Nhiệt kế', isCorrect: false },
          { id: 'b', text: 'Giấy quỳ tím hoặc máy đo pH', isCorrect: true },
          { id: 'c', text: 'Cân điện tử', isCorrect: false },
          { id: 'd', text: 'Kính hiển vi', isCorrect: false },
        ],
        explanation: 'Giấy quỳ tím đổi màu theo pH: đỏ = axit, xanh = bazơ. Máy đo pH cho con số chính xác (0-14).',
      },
      {
        id: 'q12_03', body: 'Để xử lý nước phèn, ta có thể:', difficulty: 2, points: 10, concept: 'xu_ly_nuoc',
        answers: [
          { id: 'a', text: 'Đun sôi là đủ', isCorrect: false },
          { id: 'b', text: 'Lọc qua than hoạt tính và trung hòa bằng vôi', isCorrect: true },
          { id: 'c', text: 'Thêm muối vào', isCorrect: false },
          { id: 'd', text: 'Để ngoài nắng', isCorrect: false },
        ],
        explanation: 'Than hoạt tính hấp phụ tạp chất. Vôi (bazơ) trung hòa axit trong nước phèn, nâng pH lên mức an toàn.',
      },
    ],
  },
  {
    id: 'lesson_13',
    grade: 8,
    order: 3,
    title: 'Cơm nồi cơm điện',
    phenomenon: 'Cắm nồi cơm điện, bấm nút, gạo và nước biến thành cơm chín nóng hổi sau 20 phút.',
    wonderPrompt: 'Năng lượng điện biến thành nhiệt như thế nào?',
    drivingQuestion: 'Năng lượng điện chuyển thành nhiệt để nấu cơm như thế nào?',
    gdpt2018: 'KHTN 8: Dòng điện; Điện trở; Công suất điện; An toàn điện',
    icon: '🍚',
    questions: [
      {
        id: 'q13_01', body: 'Bộ phận nào trong nồi cơm điện tạo ra nhiệt?', difficulty: 1, points: 10, concept: 'dien_tro',
        answers: [
          { id: 'a', text: 'Nắp nồi', isCorrect: false },
          { id: 'b', text: 'Dây mai-so (điện trở)', isCorrect: true },
          { id: 'c', text: 'Dây nguồn', isCorrect: false },
          { id: 'd', text: 'Nút bấm', isCorrect: false },
        ],
        explanation: 'Dây mai-so có điện trở cao, khi dòng điện chạy qua → tỏa nhiều nhiệt. Đây là nguyên lý điện trở gia nhiệt.',
      },
      {
        id: 'q13_02', body: 'Tại sao dây mai-so nóng mà dây điện nguồn không?', difficulty: 2, points: 10, concept: 'dien_tro_nhiet',
        answers: [
          { id: 'a', text: 'Vì dây nguồn dài hơn', isCorrect: false },
          { id: 'b', text: 'Vì dây mai-so có điện trở cao hơn nhiều', isCorrect: true },
          { id: 'c', text: 'Vì dây nguồn bọc nhựa', isCorrect: false },
          { id: 'd', text: 'Vì dây nguồn không có dòng điện', isCorrect: false },
        ],
        explanation: 'Nhiệt tỏa ra = I² × R. Dây mai-so có R rất lớn → tỏa nhiệt nhiều. Dây đồng nguồn có R rất nhỏ → gần như không nóng.',
      },
      {
        id: 'q13_03', body: 'Nồi cơm 700W dùng 0.5 giờ, tiêu thụ bao nhiêu kWh?', difficulty: 3, points: 10, concept: 'cong_suat',
        answers: [
          { id: 'a', text: '700 kWh', isCorrect: false },
          { id: 'b', text: '0.35 kWh', isCorrect: true },
          { id: 'c', text: '35 kWh', isCorrect: false },
          { id: 'd', text: '1.4 kWh', isCorrect: false },
        ],
        explanation: 'Điện năng = Công suất × Thời gian = 0.7 kW × 0.5 h = 0.35 kWh. Nếu giá điện 2000đ/kWh thì nấu 1 nồi cơm tốn khoảng 700đ!',
      },
    ],
  },
  {
    id: 'lesson_14',
    grade: 8,
    order: 4,
    title: 'Tảo nở hoa Hồ Tây',
    phenomenon: 'Hồ Tây đôi khi bỗng chuyển màu xanh lục đậm, bốc mùi hôi, và cá chết nổi hàng loạt.',
    wonderPrompt: 'Cái gì làm nước hồ xanh lục bất thường?',
    drivingQuestion: 'Tại sao hồ nước đôi khi bỗng chuyển màu xanh lục và cá chết hàng loạt?',
    gdpt2018: 'KHTN 8: Quang hợp và hô hấp tế bào; Sinh vật và môi trường; Ô nhiễm nước',
    icon: '🦠',
    questions: [
      {
        id: 'q14_01', body: 'Nước hồ chuyển xanh lục do:', difficulty: 1, points: 10, concept: 'tao',
        answers: [
          { id: 'a', text: 'Ai đó đổ sơn xanh', isCorrect: false },
          { id: 'b', text: 'Tảo phát triển bùng nổ (tảo nở hoa)', isCorrect: true },
          { id: 'c', text: 'Nước bị nhiễm kim loại', isCorrect: false },
          { id: 'd', text: 'Cây thủy sinh ra hoa', isCorrect: false },
        ],
        explanation: 'Tảo nở hoa (algal bloom) là hiện tượng tảo phát triển cực nhanh, biến nước thành màu xanh lục đặc quánh.',
      },
      {
        id: 'q14_02', body: 'Tảo phát triển bùng nổ cần nhiều:', difficulty: 2, points: 10, concept: 'phu_duong',
        answers: [
          { id: 'a', text: 'Oxy', isCorrect: false },
          { id: 'b', text: 'Dinh dưỡng (đạm, lân) từ nước thải', isCorrect: true },
          { id: 'c', text: 'Muối', isCorrect: false },
          { id: 'd', text: 'Cát', isCorrect: false },
        ],
        explanation: 'Nước thải sinh hoạt chứa nhiều đạm (N) và lân (P) — "thức ăn" cho tảo. Quá nhiều dinh dưỡng → tảo bùng nổ (phú dưỡng hóa).',
      },
      {
        id: 'q14_03', body: 'Cá chết khi tảo nở hoa vì:', difficulty: 2, points: 10, concept: 'thieu_oxy',
        answers: [
          { id: 'a', text: 'Tảo ăn cá', isCorrect: false },
          { id: 'b', text: 'Tảo chết phân hủy, tiêu hết oxy trong nước', isCorrect: true },
          { id: 'c', text: 'Nước quá xanh che mất ánh sáng', isCorrect: false },
          { id: 'd', text: 'Cá sợ tảo', isCorrect: false },
        ],
        explanation: 'Tảo chết hàng loạt → vi khuẩn phân hủy xác tảo → tiêu thụ oxy hòa tan → nước thiếu oxy → cá ngạt thở chết.',
      },
    ],
  },
  {
    id: 'lesson_15',
    grade: 8,
    order: 5,
    title: 'Sét đánh mùa mưa',
    phenomenon: 'Trong cơn giông, tia sét lóe sáng chói lọi rồi tiếng sấm ầm ầm vang theo. Sét thường đánh vào cây cao và cột kim loại.',
    wonderPrompt: 'Sét tạo ra từ đâu trong đám mây?',
    drivingQuestion: 'Tại sao sét thường đánh vào vật cao và bằng kim loại?',
    gdpt2018: 'KHTN 8: Điện tích; Dòng điện trong chất khí; Sự phóng điện',
    icon: '⚡',
    questions: [
      {
        id: 'q15_01', body: 'Sét là hiện tượng:', difficulty: 1, points: 10, concept: 'phong_dien',
        answers: [
          { id: 'a', text: 'Gió mạnh', isCorrect: false },
          { id: 'b', text: 'Phóng điện trong không khí giữa mây và đất', isCorrect: true },
          { id: 'c', text: 'Mây va vào nhau', isCorrect: false },
          { id: 'd', text: 'Ánh sáng mặt trời xuyên mây', isCorrect: false },
        ],
        explanation: 'Trong mây giông, các hạt nước va chạm tạo ra điện tích. Khi chênh lệch đủ lớn → phóng điện xuyên không khí = sét.',
      },
      {
        id: 'q15_02', body: 'Sét hay đánh vào vật cao vì:', difficulty: 2, points: 10, concept: 'dien_tich',
        answers: [
          { id: 'a', text: 'Vật cao nặng hơn', isCorrect: false },
          { id: 'b', text: 'Vật cao gần mây hơn, dễ phóng điện qua khoảng cách ngắn', isCorrect: true },
          { id: 'c', text: 'Vật cao hút gió mạnh hơn', isCorrect: false },
          { id: 'd', text: 'Vật cao phản xạ ánh sáng', isCorrect: false },
        ],
        explanation: 'Sét "chọn" đường ngắn nhất giữa mây và đất. Vật cao rút ngắn khoảng cách → dễ bị sét đánh nhất.',
      },
      {
        id: 'q15_03', body: 'Cột thu lôi bảo vệ nhà bằng cách:', difficulty: 2, points: 10, concept: 'thu_loi',
        answers: [
          { id: 'a', text: 'Đẩy sét đi nơi khác', isCorrect: false },
          { id: 'b', text: 'Thu hút sét vào cột rồi dẫn điện xuống đất an toàn', isCorrect: true },
          { id: 'c', text: 'Tạo ra từ trường chống sét', isCorrect: false },
          { id: 'd', text: 'Bắn laser vào mây', isCorrect: false },
        ],
        explanation: 'Cột thu lôi = thanh kim loại nhọn trên nóc nhà, nối dây dẫn xuống đất. Sét đánh vào cột → dòng điện chạy qua dây → xuống đất an toàn.',
      },
    ],
  },
  // ===== LOP 9 =====
  {
    id: 'lesson_16',
    grade: 9,
    order: 1,
    title: 'Đất nhiễm mặn ĐBSCL',
    phenomenon: 'Vùng ĐBSCL, nước biển ngày càng xâm nhập sâu vào nội đồng, đất ruộng nhiễm mặn, lúa không mọc được.',
    wonderPrompt: 'Tại sao nước biển vào sâu đất liền?',
    drivingQuestion: 'Tại sao nước biển ngày càng xâm nhập sâu vào đồng ruộng Việt Nam?',
    gdpt2018: 'KHTN 9: Biến đổi khí hậu; Hiệu ứng nhà kính; Ứng phó thiên tai',
    icon: '🌡️',
    questions: [
      {
        id: 'q16_01', body: 'Hiệu ứng nhà kính làm Trái Đất:', difficulty: 1, points: 10, concept: 'hieu_ung_nha_kinh',
        answers: [
          { id: 'a', text: 'Lạnh hơn', isCorrect: false },
          { id: 'b', text: 'Nóng lên do khí CO2, CH4 giữ nhiệt', isCorrect: true },
          { id: 'c', text: 'Không thay đổi', isCorrect: false },
          { id: 'd', text: 'Quay nhanh hơn', isCorrect: false },
        ],
        explanation: 'Khí nhà kính (CO2, CH4) giữ nhiệt như lớp kính trong nhà kính. Càng nhiều khí → Trái Đất càng nóng → băng tan → nước biển dâng.',
      },
      {
        id: 'q16_02', body: 'Nước biển dâng gây ra hậu quả gì ở ĐBSCL?', difficulty: 2, points: 10, concept: 'xam_nhap_man',
        answers: [
          { id: 'a', text: 'Đất phì nhiêu hơn', isCorrect: false },
          { id: 'b', text: 'Nước mặn xâm nhập, đất nhiễm mặn, không trồng được lúa', isCorrect: true },
          { id: 'c', text: 'Nhiều cá hơn', isCorrect: false },
          { id: 'd', text: 'Thời tiết mát hơn', isCorrect: false },
        ],
        explanation: 'Nước biển dâng + ít mưa + đập thượng nguồn giữ nước → nước mặn đẩy sâu vào nội đồng → đất nhiễm mặn → mất mùa.',
      },
      {
        id: 'q16_03', body: 'Nông dân có thể thích ứng bằng cách:', difficulty: 3, points: 10, concept: 'thich_ung',
        answers: [
          { id: 'a', text: 'Bỏ hoang ruộng', isCorrect: false },
          { id: 'b', text: 'Chuyển sang nuôi tôm nước mặn hoặc trồng giống lúa chịu mặn', isCorrect: true },
          { id: 'c', text: 'Tưới thêm nước biển', isCorrect: false },
          { id: 'd', text: 'Chờ mưa', isCorrect: false },
        ],
        explanation: 'Thích ứng BĐKH: chuyển đổi mô hình (lúa → tôm), dùng giống chịu mặn, hệ thống tưới thông minh (IoT đo độ mặn).',
      },
    ],
  },
  {
    id: 'lesson_17',
    grade: 9,
    order: 2,
    title: 'Di truyền màu mắt',
    phenomenon: 'Trong một gia đình, con có thể giống cha, giống mẹ, hoặc có đặc điểm mà cả cha lẫn mẹ đều không có.',
    wonderPrompt: 'Tại sao anh chị em ruột trông khác nhau?',
    drivingQuestion: 'Tại sao con cái có đặc điểm giống cha mẹ nhưng không hoàn toàn giống?',
    gdpt2018: 'KHTN 9: Di truyền và biến dị; Gen và nhiễm sắc thể; Quy luật di truyền Mendel',
    icon: '🧬',
    questions: [
      {
        id: 'q17_01', body: 'Gen là gì?', difficulty: 1, points: 10, concept: 'gen',
        answers: [
          { id: 'a', text: 'Một loại vitamin', isCorrect: false },
          { id: 'b', text: 'Đoạn DNA mang thông tin quy định tính trạng', isCorrect: true },
          { id: 'c', text: 'Một loại tế bào', isCorrect: false },
          { id: 'd', text: 'Một loại protein', isCorrect: false },
        ],
        explanation: 'Gen nằm trên nhiễm sắc thể (DNA), mang "bản thiết kế" cho các tính trạng: màu mắt, chiều cao, nhóm máu...',
      },
      {
        id: 'q17_02', body: 'Gen trội và gen lặn nghĩa là:', difficulty: 2, points: 10, concept: 'troi_lan',
        answers: [
          { id: 'a', text: 'Gen trội mạnh hơn, gen lặn yếu hơn', isCorrect: false },
          { id: 'b', text: 'Gen trội biểu hiện khi có 1 bản, gen lặn cần 2 bản mới biểu hiện', isCorrect: true },
          { id: 'c', text: 'Gen trội từ cha, gen lặn từ mẹ', isCorrect: false },
          { id: 'd', text: 'Gen trội tốt, gen lặn xấu', isCorrect: false },
        ],
        explanation: 'Ví dụ: Gen tóc xoăn (T) trội, tóc thẳng (t) lặn. TT hoặc Tt → tóc xoăn. Chỉ tt → tóc thẳng. 2 bố mẹ Tt có thể sinh con tt (tóc thẳng)!',
      },
      {
        id: 'q17_03', body: 'Bố Tt × Mẹ Tt, xác suất con tt (lặn) là:', difficulty: 3, points: 10, concept: 'xac_suat',
        answers: [
          { id: 'a', text: '0%', isCorrect: false },
          { id: 'b', text: '25% (1/4)', isCorrect: true },
          { id: 'c', text: '50%', isCorrect: false },
          { id: 'd', text: '100%', isCorrect: false },
        ],
        explanation: 'Tt × Tt → TT (25%), Tt (50%), tt (25%). Có 1/4 = 25% xác suất con mang kiểu gen lặn. Đây là tỉ lệ Mendel kinh điển!',
      },
    ],
  },
  {
    id: 'lesson_18',
    grade: 9,
    order: 3,
    title: 'Robot giao hàng',
    phenomenon: 'Ở một số nước, robot tự đi trên vỉa hè giao hàng đến tận nhà mà không cần người điều khiển.',
    wonderPrompt: 'Robot biết đường đi như thế nào?',
    drivingQuestion: 'Làm sao robot tự tìm đường đi mà không cần người điều khiển?',
    gdpt2018: 'Tin học 9: Trí tuệ nhân tạo; Lập trình Python; IoT cơ bản',
    icon: '🤖',
    questions: [
      {
        id: 'q18_01', body: 'Robot tự hành sử dụng gì để "nhìn" đường?', difficulty: 1, points: 10, concept: 'cam_bien',
        answers: [
          { id: 'a', text: 'Mắt người điều khiển từ xa', isCorrect: false },
          { id: 'b', text: 'Cảm biến (camera, lidar, siêu âm)', isCorrect: true },
          { id: 'c', text: 'Bản đồ giấy', isCorrect: false },
          { id: 'd', text: 'GPS một mình đủ rồi', isCorrect: false },
        ],
        explanation: 'Robot dùng nhiều cảm biến kết hợp: camera nhận dạng vật thể, lidar đo khoảng cách 3D, siêu âm phát hiện vật cản gần.',
      },
      {
        id: 'q18_02', body: 'AI trong robot "học" bằng cách nào?', difficulty: 2, points: 10, concept: 'hoc_may',
        answers: [
          { id: 'a', text: 'Đọc sách giáo khoa', isCorrect: false },
          { id: 'b', text: 'Phân tích hàng ngàn ví dụ để tìm quy luật', isCorrect: true },
          { id: 'c', text: 'Sao chép não người', isCorrect: false },
          { id: 'd', text: 'Được lập trình sẵn mọi tình huống', isCorrect: false },
        ],
        explanation: 'Machine Learning: cho AI xem hàng ngàn ảnh "đường đi" và "vật cản" → AI tự tìm quy luật phân biệt → áp dụng cho tình huống mới.',
      },
      {
        id: 'q18_03', body: 'Robot dò line đơn giản sử dụng cảm biến gì?', difficulty: 2, points: 10, concept: 'do_line',
        answers: [
          { id: 'a', text: 'Cảm biến nhiệt', isCorrect: false },
          { id: 'b', text: 'Cảm biến hồng ngoại (IR) nhận biết đen/trắng', isCorrect: true },
          { id: 'c', text: 'Cảm biến áp suất', isCorrect: false },
          { id: 'd', text: 'Micro thu âm', isCorrect: false },
        ],
        explanation: 'Cảm biến hồng ngoại phát và thu tia IR. Mặt trắng phản xạ mạnh, mặt đen hấp thu → robot biết đường kẻ ở đâu. Đây là dự án STEM phổ biến!',
      },
    ],
  },
  {
    id: 'lesson_19',
    grade: 9,
    order: 4,
    title: 'Ô nhiễm Hà Nội',
    phenomenon: 'Mùa đông Hà Nội, bầu trời xám xịt, chỉ số PM2.5 lên mức nguy hiểm, trẻ em phải đeo khẩu trang đi học.',
    wonderPrompt: 'PM2.5 là gì và tại sao mùa đông nặng hơn?',
    drivingQuestion: 'Tại sao mùa đông Hà Nội không khí lại ô nhiễm nặng hơn mùa hè?',
    gdpt2018: 'KHTN 9: Khí quyển; Ô nhiễm không khí; Hệ sinh thái và con người',
    icon: '😷',
    questions: [
      {
        id: 'q19_01', body: 'PM2.5 là gì?', difficulty: 1, points: 10, concept: 'bui_min',
        answers: [
          { id: 'a', text: 'Loại khí độc', isCorrect: false },
          { id: 'b', text: 'Hạt bụi siêu mịn đường kính dưới 2.5 micromet', isCorrect: true },
          { id: 'c', text: 'Tên một loại virus', isCorrect: false },
          { id: 'd', text: 'Chỉ số nhiệt độ', isCorrect: false },
        ],
        explanation: 'PM2.5 = Particulate Matter 2.5 micromet. Nhỏ hơn sợi tóc 30 lần, có thể xuyên qua phổi vào máu, cực kỳ nguy hiểm.',
      },
      {
        id: 'q19_02', body: 'Mùa đông Hà Nội ô nhiễm nặng hơn vì:', difficulty: 2, points: 10, concept: 'nghich_nhiet',
        answers: [
          { id: 'a', text: 'Mùa đông nhiều xe hơn', isCorrect: false },
          { id: 'b', text: 'Hiện tượng nghịch nhiệt: lớp khí lạnh đè bụi xuống, không khuếch tán được', isCorrect: true },
          { id: 'c', text: 'Mùa đông nhiều nhà máy hơn', isCorrect: false },
          { id: 'd', text: 'Gió mùa mang bụi từ xa đến', isCorrect: false },
        ],
        explanation: 'Nghịch nhiệt: lớp khí nóng trên cao "đè" lớp khí lạnh bên dưới → bụi bẩn bị "giam" sát mặt đất, không bay lên được.',
      },
      {
        id: 'q19_03', body: 'Cảm biến PM2.5 + IoT có thể giúp bằng cách:', difficulty: 3, points: 10, concept: 'iot_moi_truong',
        answers: [
          { id: 'a', text: 'Lọc sạch không khí toàn thành phố', isCorrect: false },
          { id: 'b', text: 'Đo và cảnh báo chất lượng không khí theo thời gian thực', isCorrect: true },
          { id: 'c', text: 'Ngăn xe chạy trên đường', isCorrect: false },
          { id: 'd', text: 'Tạo mưa nhân tạo', isCorrect: false },
        ],
        explanation: 'Trạm IoT đo PM2.5 liên tục → gửi dữ liệu lên cloud → app cảnh báo người dân. Đây là dự án STEM thực tế với ThingBot + cảm biến bụi!',
      },
    ],
  },
  {
    id: 'lesson_20',
    grade: 9,
    order: 5,
    title: 'Nhận diện khuôn mặt',
    phenomenon: 'Điện thoại của bạn chỉ cần nhìn mặt chủ nhân là tự mở khóa, dù bạn đeo kính, đổi kiểu tóc.',
    wonderPrompt: 'Máy "nhìn" mặt người như thế nào?',
    drivingQuestion: 'Làm sao điện thoại nhận ra đúng chủ nhân trong hàng tỷ khuôn mặt?',
    gdpt2018: 'Tin học 9: AI và Machine Learning; Xử lý dữ liệu; Đạo đức công nghệ',
    icon: '📱',
    questions: [
      {
        id: 'q20_01', body: 'Điện thoại nhận diện khuôn mặt dùng công nghệ:', difficulty: 1, points: 10, concept: 'nhan_dien',
        answers: [
          { id: 'a', text: 'Dấu vân tay', isCorrect: false },
          { id: 'b', text: 'AI (Trí tuệ nhân tạo) phân tích đặc điểm khuôn mặt', isCorrect: true },
          { id: 'c', text: 'Mã PIN ẩn', isCorrect: false },
          { id: 'd', text: 'Nhận diện giọng nói', isCorrect: false },
        ],
        explanation: 'AI phân tích khuôn mặt: khoảng cách giữa 2 mắt, hình dạng mũi, đường viền khuôn mặt... tạo thành "bản đồ khuôn mặt" duy nhất.',
      },
      {
        id: 'q20_02', body: 'Để AI nhận diện chính xác hơn, cần:', difficulty: 2, points: 10, concept: 'du_lieu',
        answers: [
          { id: 'a', text: 'Máy tính nhanh hơn', isCorrect: false },
          { id: 'b', text: 'Nhiều dữ liệu huấn luyện (ảnh) hơn', isCorrect: true },
          { id: 'c', text: 'Camera đắt tiền hơn', isCorrect: false },
          { id: 'd', text: 'Màn hình to hơn', isCorrect: false },
        ],
        explanation: 'AI "học" từ dữ liệu. Càng nhiều ảnh huấn luyện (đa góc, ánh sáng, biểu cảm) → AI càng nhận diện chính xác. "Data is the new oil!"',
      },
      {
        id: 'q20_03', body: 'Nhận dạng khuôn mặt có hạn chế gì về đạo đức?', difficulty: 3, points: 10, concept: 'dao_duc_ai',
        answers: [
          { id: 'a', text: 'Không có hạn chế gì', isCorrect: false },
          { id: 'b', text: 'Có thể xâm phạm quyền riêng tư, theo dõi không đồng ý', isCorrect: true },
          { id: 'c', text: 'Quá đắt để sử dụng', isCorrect: false },
          { id: 'd', text: 'Chỉ hoạt động trong phòng tối', isCorrect: false },
        ],
        explanation: 'Nhận dạng khuôn mặt có thể bị dùng để theo dõi, giám sát mà không được đồng ý. Cần cân bằng giữa tiện lợi và quyền riêng tư. STEM không chỉ là kỹ thuật mà còn là trách nhiệm!',
      },
    ],
  },
];

// Helper functions
export function getLessonsByGrade(grade: 6 | 7 | 8 | 9): Lesson[] {
  return LESSONS.filter(l => l.grade === grade);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find(l => l.id === id);
}

export function getTotalQuestions(): number {
  return LESSONS.reduce((sum, l) => sum + l.questions.length, 0);
}
