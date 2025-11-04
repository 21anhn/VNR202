import React, { useState } from "react";
import { motion } from "framer-motion";

interface QuizQuestion {
  questionNumber: number;
  question: string;
  imageUrl?: string | null;
  answerOptions: {
    text: string;
    rationale: string; // nêu rõ vì sao đúng/sai
    isCorrect: boolean;
  }[];
  hint: string;
}

const questions: QuizQuestion[] = [
  {
    questionNumber: 1,
    question:
      "Theo Luật Phòng, chống tham nhũng năm 2005, tham nhũng được định nghĩa là gì?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Hành vi lợi dụng mối quan hệ xã hội để mưu cầu lợi ích cá nhân",
        rationale:
          "Sai. Định nghĩa trong luật gắn với người có chức vụ, quyền hạn.",
        isCorrect: false,
      },
      {
        text: "Hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi",
        rationale:
          "Đúng. Đây là định nghĩa chính thức trong Luật PCTN 2005: lợi dụng chức vụ, quyền hạn vì vụ lợi.",
        isCorrect: true,
      },
      {
        text: "Hành vi làm thất thoát ngân sách nhà nước",
        rationale:
          "Sai. Đây là hậu quả có thể có, không phải là định nghĩa pháp lý đầy đủ.",
        isCorrect: false,
      },
      {
        text: "Hành vi quan liêu, cửa quyền",
        rationale:
          "Sai. Quan liêu, cửa quyền là biểu hiện lệch lạc trong quản lý, không đồng nhất với tham nhũng theo định nghĩa luật.",
        isCorrect: false,
      },
    ],
    hint: "Tham nhũng gắn liền với người có chức vụ, quyền hạn.",
  },
  {
    questionNumber: 2,
    question: "Hồ Chí Minh coi tham ô, lãng phí, quan liêu là gì?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Sai lầm trong quản lý",
        rationale: "Sai. Mức độ không chỉ là sai lầm kỹ thuật.",
        isCorrect: false,
      },
      {
        text: "Hệ quả tất yếu của phát triển kinh tế",
        rationale: "Sai. Không phải quy luật tất yếu.",
        isCorrect: false,
      },
      {
        text: "Giặc nội xâm",
        rationale: "Đúng. Người ví đây là kẻ thù nguy hiểm từ bên trong.",
        isCorrect: true,
      },
      {
        text: "Thói quen xấu của cán bộ",
        rationale: "Sai. Cách nói giản lược, không đúng bản chất nghiêm trọng.",
        isCorrect: false,
      },
    ],
    hint: "Người gọi đây là 'giặc'.",
  },
  {
    questionNumber: 3,
    question: "Theo tư tưởng Hồ Chí Minh, cán bộ nhà nước phải được xem là gì?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Người quản lý nhân dân",
        rationale: "Sai. Không phải đứng 'trên' dân.",
        isCorrect: false,
      },
      {
        text: "Người chủ của dân",
        rationale: "Sai. Nhân dân mới là chủ.",
        isCorrect: false,
      },
      {
        text: "Người thay mặt Đảng điều hành xã hội",
        rationale: "Sai. Không phản ánh đầy đủ tinh thần 'vì dân'.",
        isCorrect: false,
      },
      {
        text: "Công bộc của dân",
        rationale: "Đúng. Cán bộ là đầy tớ, công bộc phục vụ Nhân dân.",
        isCorrect: true,
      },
    ],
    hint: "Từ khóa: công bộc.",
  },
  {
    questionNumber: 4,
    question:
      "Tại sao tham nhũng được coi là nguy cơ trực tiếp đe dọa sự tồn vong của Đảng và chế độ?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Vì làm giảm uy tín của cán bộ cấp cao",
        rationale: "Sai. Chỉ là một phần ảnh hưởng.",
        isCorrect: false,
      },
      {
        text: "Vì chỉ gây thất thoát ngân sách",
        rationale: "Sai. Hậu quả rộng hơn nhiều.",
        isCorrect: false,
      },
      {
        text: "Vì làm xói mòn niềm tin của nhân dân, làm mục ruỗng bộ máy, uy hiếp tính chính danh của chế độ",
        rationale: "Đúng. Đây là tác động sâu rộng và nguy hiểm nhất.",
        isCorrect: true,
      },
      {
        text: "Vì chỉ xuất hiện ở một số lĩnh vực nhạy cảm",
        rationale: "Sai. Có thể phát sinh ở nhiều lĩnh vực quyền lực.",
        isCorrect: false,
      },
    ],
    hint: "Liên hệ tới niềm tin nhân dân.",
  },
  {
    questionNumber: 5,
    question:
      "Một trong những yêu cầu cấp bách để phòng, chống tham nhũng theo tư tưởng Hồ Chí Minh là gì?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Chỉ dựa vào cơ quan thanh tra, kiểm toán",
        rationale: "Sai. Không đủ, cần sức dân.",
        isCorrect: false,
      },
      {
        text: "Huy động nhân dân tham gia giám sát, bảo vệ người tố cáo",
        rationale:
          "Đúng. Phát huy quyền làm chủ của Nhân dân và bảo vệ người dũng cảm đấu tranh.",
        isCorrect: true,
      },
      {
        text: "Chỉ tăng cường xử lý bằng pháp luật",
        rationale: "Sai. Phòng ngừa và giám sát xã hội cũng rất quan trọng.",
        isCorrect: false,
      },
      {
        text: "Chỉ tập trung vào việc phòng ngừa trong cơ quan trung ương",
        rationale: "Sai. Cần đồng bộ từ trung ương đến cơ sở.",
        isCorrect: false,
      },
    ],
    hint: "Vai trò nhân dân là then chốt.",
  },
  {
    questionNumber: 6,
    question:
      "Theo Hồ Chí Minh, cán bộ, đảng viên cần có những yêu cầu gì để xây dựng Nhà nước trong sạch, vững mạnh?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Giữ đạo đức cách mạng, trung thành tuyệt đối, tu dưỡng chống chủ nghĩa cá nhân",
        rationale:
          "Đúng. Cốt lõi là đạo đức cách mạng: cần, kiệm, liêm, chính, chí công vô tư.",
        isCorrect: true,
      },
      {
        text: "Chỉ cần tuân thủ pháp luật",
        rationale: "Sai. Cần cả tự giác, đạo đức và nêu gương.",
        isCorrect: false,
      },
      {
        text: "Tập trung phát triển kinh tế, không quan tâm đạo đức",
        rationale: "Sai. Đạo đức là gốc.",
        isCorrect: false,
      },
      {
        text: "Thường xuyên đi công tác nước ngoài",
        rationale: "Sai. Không liên quan tiêu chí trong sạch, vững mạnh.",
        isCorrect: false,
      },
    ],
    hint: "Cần, kiệm, liêm, chính, chí công vô tư.",
  },
  {
    questionNumber: 7,
    question:
      "Hồ Chí Minh coi bệnh đặc quyền, đặc lợi, tham ô, lãng phí, quan liêu là gì?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Vấn đề nhỏ cần quan tâm",
        rationale: "Sai. Đây là nguy cơ nghiêm trọng.",
        isCorrect: false,
      },
      {
        text: "Giặc nội xâm, những xấu xa của chế độ cũ",
        rationale:
          "Đúng. Chúng phá hoại từ bên trong nếu không kiên quyết đấu tranh.",
        isCorrect: true,
      },
      {
        text: "Chỉ là sai lầm hành chính",
        rationale: "Sai. Tác hại sâu rộng hơn hành chính thuần túy.",
        isCorrect: false,
      },
      {
        text: "Không đáng lo ngại",
        rationale: "Sai. Rất đáng lo và phải chống kiên quyết.",
        isCorrect: false,
      },
    ],
    hint: "Người gọi đây là giặc nội xâm.",
  },
  {
    questionNumber: 8,
    question:
      "Trong công tác xây dựng Đảng hiện nay, những vấn đề nào cần đặc biệt quan tâm?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Chống suy thoái chính trị, đạo đức, lối sống; công tác cán bộ và kiểm soát nội bộ",
        rationale:
          "Đúng. Đây là trọng tâm, then chốt để giữ Đảng trong sạch, vững mạnh.",
        isCorrect: true,
      },
      {
        text: "Chỉ quan tâm kinh tế",
        rationale: "Sai. Xây dựng Đảng không thể giản lược như vậy.",
        isCorrect: false,
      },
      {
        text: "Tập trung phát triển công nghệ",
        rationale:
          "Sai. Công nghệ quan trọng nhưng không thay thế xây dựng Đảng.",
        isCorrect: false,
      },
      {
        text: "Hạn chế kiểm tra giám sát",
        rationale: "Sai. Cần tăng cường kiểm tra, giám sát.",
        isCorrect: false,
      },
    ],
    hint: "Đảng nhấn mạnh chính trị, đạo đức, kiểm soát.",
  },
  {
    questionNumber: 9,
    question:
      "Khi xây dựng Nhà nước ngang tầm nhiệm vụ trong giai đoạn cách mạng mới, cần đảm bảo những nội dung nào?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Chỉ tập trung phát triển kinh tế",
        rationale: "Sai. Cần hoàn thiện thể chế, pháp quyền.",
        isCorrect: false,
      },
      {
        text: "Xây dựng Nhà nước pháp quyền XHCN trong sạch, vững mạnh; hoàn thiện pháp luật và kiểm soát quyền lực",
        rationale:
          "Đúng. Pháp quyền, minh bạch, kiểm soát quyền lực là trụ cột.",
        isCorrect: true,
      },
      {
        text: "Không cần minh bạch thủ tục hành chính",
        rationale: "Sai. Minh bạch là điều kiện then chốt.",
        isCorrect: false,
      },
      {
        text: "Giảm quyền dân tham gia",
        rationale: "Sai. Phải phát huy quyền làm chủ của Nhân dân.",
        isCorrect: false,
      },
    ],
    hint: "Pháp quyền, pháp luật, kiểm soát quyền lực.",
  },
  {
    questionNumber: 10,
    question: "Tham nhũng xảy ra ở đâu và do ai thực hiện?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Ở mọi nơi, do tất cả công dân",
        rationale: "Sai. Không gắn với mọi công dân.",
        isCorrect: false,
      },
      {
        text: "Chỉ ở cơ quan nhà nước, do người có chức vụ, quyền hạn lợi dụng chức vụ, quyền hạn",
        rationale:
          "Đúng. Tham nhũng gắn với người có chức vụ, quyền hạn trong khu vực công.",
        isCorrect: true,
      },
      {
        text: "Chỉ trong doanh nghiệp tư nhân",
        rationale: "Sai. Không phù hợp định nghĩa pháp lý ở VN.",
        isCorrect: false,
      },
      {
        text: "Chỉ xảy ra trong các cơ quan quốc tế",
        rationale: "Sai.",
        isCorrect: false,
      },
    ],
    hint: "Tham nhũng gắn với quyền lực.",
  },
  {
    questionNumber: 11,
    question:
      "Vì sao Hồ Chí Minh coi tham ô, lãng phí, quan liêu là giặc nội xâm?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Vì chúng chỉ là những sai lầm hành chính nhỏ",
        rationale: "Sai. Mức độ nghiêm trọng hơn nhiều.",
        isCorrect: false,
      },
      {
        text: "Vì chúng nằm ngay trong tổ chức, làm thất thoát tài sản, băng hoại đạo đức và uy hiếp sự tồn vong của Đảng",
        rationale:
          "Đúng. Nguy cơ từ bên trong, phá hoại cơ sở đạo đức và tổ chức.",
        isCorrect: true,
      },
      {
        text: "Vì chỉ xảy ra trong chế độ cũ",
        rationale: "Sai. Có thể nảy sinh nếu không phòng ngừa.",
        isCorrect: false,
      },
      {
        text: "Vì chỉ làm giảm thu nhập của nhân dân",
        rationale: "Sai. Tác hại vượt xa khía cạnh thu nhập.",
        isCorrect: false,
      },
    ],
    hint: "Người nói 'nằm ngay trong tổ chức ta'.",
  },
  {
    questionNumber: 12,
    question: "Tham nhũng gây ra hậu quả gì cho xã hội và Nhà nước?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Chỉ làm chậm nhịp phát triển kinh tế",
        rationale: "Sai. Ảnh hưởng cả chính trị, xã hội.",
        isCorrect: false,
      },
      {
        text: "Làm thất thoát kinh tế, mất niềm tin của nhân dân, đe dọa sự tồn vong của Đảng và chế độ",
        rationale:
          "Đúng. Tổng hợp cả tác hại kinh tế lẫn khủng hoảng niềm tin và tính chính danh.",
        isCorrect: true,
      },
      {
        text: "Chỉ ảnh hưởng đến một số cán bộ cấp cao",
        rationale: "Sai. Ảnh hưởng rộng tới toàn hệ thống.",
        isCorrect: false,
      },
      {
        text: "Không gây tác động lâu dài",
        rationale: "Sai. Tác động kéo dài và hệ lụy sâu.",
        isCorrect: false,
      },
    ],
    hint: "Hậu quả cả kinh tế lẫn chính trị.",
  },
  {
    questionNumber: 13,
    question: "Tham nhũng gây tác hại gì về mặt kinh tế?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Chỉ ảnh hưởng tới một số doanh nghiệp nhỏ",
        rationale: "Sai. Tác động toàn bộ môi trường kinh doanh.",
        isCorrect: false,
      },
      {
        text: "Gây thất thoát, lãng phí nguồn lực quốc gia, làm chậm tốc độ tăng trưởng, méo mó môi trường kinh doanh",
        rationale:
          "Đúng. Tạo chi phí 'ngầm', giảm hiệu quả phân bổ nguồn lực và cạnh tranh lành mạnh.",
        isCorrect: true,
      },
      {
        text: "Không ảnh hưởng đến chi phí đầu tư, đấu thầu",
        rationale:
          "Sai. Làm tăng chi phí không chính thức, méo cơ chế đấu thầu.",
        isCorrect: false,
      },
      {
        text: "Chỉ gây khó khăn trong quản lý hành chính",
        rationale: "Sai. Ảnh hưởng vượt ra ngoài phạm vi quản trị.",
        isCorrect: false,
      },
    ],
    hint: "Liên hệ chi phí ngầm trong đầu tư.",
  },
  {
    questionNumber: 14,
    question: "Tham nhũng tác động như thế nào đến xã hội và chính trị?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Chỉ làm thay đổi chính sách hành chính",
        rationale: "Sai. Tác động sâu tới đạo đức và tổ chức.",
        isCorrect: false,
      },
      {
        text: "Làm băng hoại đạo đức, tạo bất bình trong dân, khoét sâu khoảng cách giàu – nghèo, làm mục ruỗng bộ máy, suy thoái cán bộ, đảng viên, đe dọa sự tồn vong của Đảng và chế độ",
        rationale:
          "Đúng. Đây là hệ quả xã hội–chính trị toàn diện và đặc biệt nghiêm trọng.",
        isCorrect: true,
      },
      {
        text: "Chỉ ảnh hưởng tới cá nhân tham nhũng",
        rationale: "Sai. Hậu quả lan tỏa trong toàn xã hội.",
        isCorrect: false,
      },
      {
        text: "Không gây tác động lâu dài",
        rationale: "Sai. Di chứng kéo dài, khó khắc phục.",
        isCorrect: false,
      },
    ],
    hint: "Nhấn mạnh băng hoại đạo đức, mục ruỗng bộ máy.",
  },
  {
    questionNumber: 15,
    question: "Giải pháp nào được nêu để ngăn chặn và đẩy lùi tham nhũng?",
    imageUrl: null,
    answerOptions: [
      {
        text: "Chỉ tăng lương cho cán bộ để họ không tham nhũng",
        rationale: "Sai. Không giải quyết gốc rễ quyền lực.",
        isCorrect: false,
      },
      {
        text: "Kiểm soát quyền lực, trách nhiệm người đứng đầu, cải cách hành chính, phát huy vai trò nhân dân, nêu gương cán bộ",
        rationale:
          "Đúng. Đồng bộ cơ chế kiểm soát – minh bạch – nêu gương – trách nhiệm giải trình.",
        isCorrect: true,
      },
      {
        text: "Hạn chế dân giám sát, giảm minh bạch thủ tục",
        rationale: "Sai. Đi ngược phòng, chống tham nhũng.",
        isCorrect: false,
      },
      {
        text: "Không cần xử lý nghiêm minh, chỉ nhắc nhở",
        rationale: "Sai. Cần chế tài đủ sức răn đe, 'không có vùng cấm'.",
        isCorrect: false,
      },
    ],
    hint: "Kiểm soát quyền lực và vai trò nhân dân.",
  },
];

const Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<null | number>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (idx: number) => {
    if (answers[current] !== null) return;
    setSelected(idx);
    setShowFeedback(true);
    setAnswers((prev) => {
      const arr = [...prev];
      arr[current] = idx;
      return arr;
    });
    if (questions[current].answerOptions[idx].isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    setShowHint(false);
    setCurrent((c) => Math.min(c + 1, questions.length));
  };

  const handlePrev = () => {
    setSelected(null);
    setShowFeedback(false);
    setShowHint(false);
    setCurrent((c) => Math.max(c - 1, 0));
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setShowHint(false);
    setAnswers(Array(questions.length).fill(null));
  };

  const isAnswered = answers[current] !== null;
  const isCorrectAnswer =
    answers[current] !== null &&
    questions[current]?.answerOptions[answers[current] as number]?.isCorrect;

  const findCorrectAnswerIndex = (q: QuizQuestion) =>
    q.answerOptions.findIndex((opt) => opt.isCorrect);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7ff] py-10 px-2">
      <motion.div
        className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2a2e6e] via-[#6e7fdc] to-[#3a3f8f] mb-8 text-center drop-shadow">
          Quiz ôn tập lý thuyết
        </h2>

        {current < questions.length ? (
          <>
            <div className="text-lg font-medium mb-6 text-gray-800 text-center">
              Câu {current + 1}/{questions.length}:<br />
              <span className="font-semibold">
                {questions[current].question}
              </span>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              {questions[current].answerOptions.map((opt, idx) => {
                const isSelected = selected === idx || answers[current] === idx;
                const isCorrect = opt.isCorrect;
                const showResult = showFeedback || isAnswered;
                let btnClass = "";
                if (showResult) {
                  if (isSelected && isCorrect)
                    btnClass = "bg-green-500 text-white border-green-600";
                  else if (isSelected && !isCorrect)
                    btnClass = "bg-red-500 text-white border-red-600";
                  else if (isCorrect)
                    btnClass = "bg-green-100 border-green-400 text-green-700";
                  else btnClass = "bg-blue-100 border-blue-300 text-blue-700";
                } else {
                  btnClass = isSelected
                    ? "bg-blue-200 border-blue-400 text-blue-900"
                    : "bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200";
                }
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full px-4 py-3 rounded-lg text-lg font-medium border-2 shadow transition-all text-left ${btnClass}`}
                    disabled={showResult}
                    onClick={() => handleAnswer(idx)}
                  >
                    {String.fromCharCode(65 + idx)}. {opt.text}
                  </motion.button>
                );
              })}
            </div>

            {/* FEEDBACK: Vì sao đúng & vì sao sai */}
            {(showFeedback || isAnswered) && (
              <motion.div
                className="text-left mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {(() => {
                  const chosenIdx = answers[current] as number | null;
                  const correctIdx = findCorrectAnswerIndex(questions[current]);
                  const opts = questions[current].answerOptions;

                  if (chosenIdx === null) return null;

                  return (
                    <div className="space-y-4">
                      <div
                        className={`text-lg font-semibold ${
                          isCorrectAnswer ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isCorrectAnswer ? "Chính xác!" : "Chưa đúng!"}
                      </div>

                      {!isCorrectAnswer && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded">
                          <div className="font-semibold text-red-700 mb-1">
                            Vì sao bạn chọn sai:
                          </div>
                          <div className="text-gray-800">
                            {opts[chosenIdx].rationale}
                          </div>
                        </div>
                      )}

                      <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                        <div className="font-semibold text-green-700 mb-1">
                          Đáp án đúng:&nbsp;
                          {String.fromCharCode(65 + correctIdx)}.{" "}
                          {opts[correctIdx].text}
                        </div>
                        <div className="text-gray-800">
                          {opts[correctIdx].rationale}
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 p-3 rounded">
                        <div className="font-semibold text-gray-800 mb-2">
                          Vì sao các phương án khác sai:
                        </div>
                        <ul className="list-disc pl-5 space-y-2 text-gray-800">
                          {opts.map((op, i) => {
                            if (i === correctIdx) return null; // bỏ đáp án đúng
                            if (!op.rationale) return null;
                            // nếu đã nêu “vì sao bạn chọn sai” ở trên thì bỏ qua phương án đã chọn,
                            // tránh lặp lại cùng một rationale
                            if (!isCorrectAnswer && i === chosenIdx)
                              return null;
                            return (
                              <li key={i}>
                                <span className="font-medium">
                                  {String.fromCharCode(65 + i)}. {op.text}:
                                </span>{" "}
                                {op.rationale}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            <div className="flex justify-between items-center mt-6">
              <button
                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                onClick={handlePrev}
                disabled={current === 0}
              >
                Câu trước
              </button>
              <button
                className="px-5 py-2 bg-yellow-400 text-yellow-900 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
                onClick={() => setShowHint(!showHint)}
              >
                Gợi ý
              </button>
              <button
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
                onClick={handleNext}
                disabled={!isAnswered}
              >
                Câu tiếp
              </button>
            </div>

            <motion.div
              className="mt-4 p-4 text-center bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 rounded-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: showHint ? 1 : 0,
                height: showHint ? "auto" : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-semibold mb-2">Gợi ý:</div>
              <div className="text-sm italic">{questions[current].hint}</div>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-2xl font-bold text-blue-700 mb-2">
              Hoàn thành!
            </div>
            <div className="text-lg mb-4">
              Bạn đúng <span className="text-green-600 font-bold">{score}</span>
              /{questions.length} câu.
            </div>

            {answers.some(
              (ans, idx) =>
                idx < questions.length &&
                ans !== null &&
                !questions[idx]?.answerOptions[ans]?.isCorrect
            ) && (
              <div className="mt-6 text-left max-w-xl mx-auto">
                <div className="font-semibold text-red-600 mb-2">
                  Các câu bạn trả lời sai, hãy lưu ý:
                </div>
                <ul className="space-y-4">
                  {questions.map((q, idx) =>
                    answers[idx] !== null &&
                    !q.answerOptions[answers[idx] as number].isCorrect ? (
                      <li
                        key={idx}
                        className="bg-red-50 border-l-4 border-red-400 p-4 rounded"
                      >
                        <div className="font-medium text-gray-800 mb-1">
                          Câu {idx + 1}: {q.question}
                        </div>
                        <div className="text-gray-700 mb-1">
                          <span className="font-semibold">Đáp án đúng:</span>{" "}
                          {String.fromCharCode(65 + findCorrectAnswerIndex(q))}.{" "}
                          {q.answerOptions[findCorrectAnswerIndex(q)].text}
                        </div>
                        <div className="text-gray-600 text-sm italic">
                          {`Giải thích: ` +
                            q.answerOptions[
                              findCorrectAnswerIndex(q)
                            ].rationale.substring(5)}
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            )}

            <button
              className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={resetQuiz}
            >
              Làm lại Quiz
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;
