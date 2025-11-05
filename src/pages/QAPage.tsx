import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: string;
  text: string;
  group: string;
  createdAt: Timestamp;
}

interface Answer {
  id: string;
  questionId: string;
  text: string;
  group: string;
  createdAt: Timestamp;
}

const defaultGroupColors: Record<string, string> = {
  "Nhóm 1": "bg-blue-100",
  "Nhóm 2": "bg-green-100",
  "Nhóm 3": "bg-yellow-100",
  "Nhóm 4": "bg-pink-100",
  "Nhóm 5": "bg-purple-100",
  "Nhóm 6": "bg-orange-100",
  "Nhóm 7": "bg-teal-100",
  "Nhóm 8": "bg-indigo-100",
  "Ẩn danh": "bg-gray-200",
};

const QAPage: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [group, setGroup] = useState("");
  const [customGroup, setCustomGroup] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, Answer[]>>({}); // questionId => answers
  const [answerText, setAnswerText] = useState<Record<string, string>>({});
  const [answerGroup, setAnswerGroup] = useState<Record<string, string>>({});
  const [answerCustomGroup, setAnswerCustomGroup] = useState<
    Record<string, string>
  >({});

  // Load questions
  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const qs = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
        group: doc.data().group || "",
        createdAt: doc.data().createdAt,
      }));
      setQuestions(qs);
    });
    return () => unsubscribe();
  }, []);

  // Load answers
  useEffect(() => {
    const q = query(collection(db, "answers"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ansMap: Record<string, Answer[]> = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const questionId = data.questionId;
        if (!ansMap[questionId]) ansMap[questionId] = [];
        ansMap[questionId].push({
          id: doc.id,
          questionId,
          text: data.text,
          group: data.group,
          createdAt: data.createdAt,
        });
      });
      setAnswers(ansMap);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalGroup = group === "Khác" ? customGroup.trim() : group;
    if (!finalGroup || !question.trim()) return;
    await addDoc(collection(db, "questions"), {
      text: question,
      group: finalGroup,
      createdAt: Timestamp.now(),
    });
    setQuestion("");
    setGroup("");
    setCustomGroup("");
  };

  const handleSubmitAnswer = async (
    questionId: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const finalGroup =
      answerGroup[questionId] === "Khác"
        ? (answerCustomGroup[questionId] || "").trim()
        : answerGroup[questionId];
    if (!finalGroup || !answerText[questionId]?.trim()) return;
    await addDoc(collection(db, "answers"), {
      questionId,
      text: answerText[questionId],
      group: finalGroup,
      createdAt: Timestamp.now(),
    });
    setAnswerText((prev) => ({ ...prev, [questionId]: "" }));
    setAnswerGroup((prev) => ({ ...prev, [questionId]: "" }));
    setAnswerCustomGroup((prev) => ({ ...prev, [questionId]: "" }));
  };

  return (
    <motion.div
      className="min-h-screen bg-[#f4f7ff] flex flex-col items-center pt-32 px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-2xl flex flex-col items-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-[#2a2e6e] drop-shadow-lg">
          Q&A - Lịch sử Đảng Cộng sản Việt Nam (VNR202)
        </h1>

        {/* Form hỏi */}
        <motion.form
          onSubmit={handleSubmitQuestion}
          className="flex w-full max-w-xl gap-2 mb-8 flex-col md:flex-row"
        >
          <div className="flex-1 flex flex-col">
            <select
              className="w-full border rounded-lg px-4 py-3 bg-white"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              required
            >
              <option value="" disabled>
                Chọn nhóm...
              </option>
              {Array.from({ length: 8 }, (_, i) => (
                <option key={i} value={`Nhóm ${i + 1}`}>
                  Nhóm {i + 1}
                </option>
              ))}
              <option value="Ẩn danh">Ẩn danh</option>
              <option value="Khác">Khác</option>
            </select>
            {group === "Khác" && (
              <input
                type="text"
                placeholder="Nhập tên nhóm..."
                className="mt-2 border rounded-lg px-4 py-3"
                value={customGroup}
                onChange={(e) => setCustomGroup(e.target.value)}
                required
              />
            )}
          </div>

          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-3"
            placeholder="Nhập câu hỏi..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-[#3a3f8f] text-white px-6 py-3 rounded-lg mt-2 md:mt-0"
          >
            Gửi
          </button>
        </motion.form>

        {/* Danh sách câu hỏi */}
        <motion.div className="w-full max-w-xl">
          {questions.length === 0 && (
            <p className="text-gray-500 text-center mt-8">
              Chưa có câu hỏi nào.
            </p>
          )}

          <AnimatePresence>
            {questions.map((q) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg mb-3 border ${
                  defaultGroupColors[q.group] || "bg-gray-100"
                }`}
              >
                <p className="text-gray-800 font-medium">{q.text}</p>
                <p className="text-sm text-gray-500 mt-1">{q.group}</p>

                {/* Danh sách trả lời */}
                <div className="mt-3 ml-4">
                  {(answers[q.id] || []).map((ans) => (
                    <div
                      key={ans.id}
                      className={`p-2 rounded mb-2 border ${
                        defaultGroupColors[ans.group] || "bg-gray-100"
                      }`}
                    >
                      <p className="text-gray-700">{ans.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{ans.group}</p>
                    </div>
                  ))}
                </div>

                {/* Form trả lời */}
                <form
                  onSubmit={(e) => handleSubmitAnswer(q.id, e)}
                  className="flex flex-col md:flex-row gap-2 mt-2"
                >
                  <div className="flex-1 flex flex-col">
                    <select
                      className="w-full border rounded-lg px-4 py-2"
                      value={answerGroup[q.id] || ""}
                      onChange={(e) =>
                        setAnswerGroup((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="" disabled>
                        Chọn nhóm...
                      </option>
                      {Array.from({ length: 8 }, (_, i) => (
                        <option key={i} value={`Nhóm ${i + 1}`}>
                          Nhóm {i + 1}
                        </option>
                      ))}
                      <option value="Ẩn danh">Ẩn danh</option>
                      <option value="Khác">Khác</option>
                    </select>
                    {answerGroup[q.id] === "Khác" && (
                      <input
                        type="text"
                        placeholder="Nhập tên nhóm..."
                        className="mt-1 border rounded-lg px-4 py-2"
                        value={answerCustomGroup[q.id] || ""}
                        onChange={(e) =>
                          setAnswerCustomGroup((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }))
                        }
                        required
                      />
                    )}
                  </div>
                  <input
                    type="text"
                    className="flex-1 border rounded-lg px-4 py-2"
                    placeholder="Nhập trả lời..."
                    value={answerText[q.id] || ""}
                    onChange={(e) =>
                      setAnswerText((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#3a3f8f] text-white px-4 py-2 rounded-lg"
                  >
                    Trả lời
                  </button>
                </form>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default QAPage;
