// src/pages/QuestionItem.tsx
import React, { useEffect, useMemo, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

type Question = {
  id: string;
  text: string;
  group: string;
  createdAt: Timestamp | null;
};

type CommentDoc = {
  id: string;
  text: string;
  createdAt: Timestamp | null;
};

// time-ago helper
const timeAgo = (ts: Timestamp | null) => {
  if (!ts) return "";
  const diffMs = Date.now() - ts.toMillis();
  if (diffMs < 0) return "vừa xong";
  const s = Math.floor(diffMs / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (s < 10) return "vừa xong";
  if (s < 60) return `${s} giây trước`;
  if (m < 60) return `${m} phút trước`;
  if (h < 24) return `${h} giờ trước`;
  return `${d} ngày trước`;
};

// localStorage helpers (lưu tên mặc định & map commentId -> author)
const LS_AUTHOR_DEFAULT_KEY = "qa_author_default";
const LS_AUTHOR_MAP_KEY = "qa_author_by_comment";

const loadAuthorDefault = () => localStorage.getItem(LS_AUTHOR_DEFAULT_KEY) ?? "";
const saveAuthorDefault = (name: string) => localStorage.setItem(LS_AUTHOR_DEFAULT_KEY, name);

const loadAuthorMap = (): Record<string, string> => {
  try { return JSON.parse(localStorage.getItem(LS_AUTHOR_MAP_KEY) || "{}"); }
  catch { return {}; }
};
const saveAuthorMap = (map: Record<string, string>) =>
  localStorage.setItem(LS_AUTHOR_MAP_KEY, JSON.stringify(map));

const QuestionItem: React.FC<{ question: Question }> = ({ question }) => {
  const [comments, setComments] = useState<CommentDoc[]>([]);
  const [authorName, setAuthorName] = useState<string>("");
  const [commentText, setCommentText] = useState<string>("");

  // map local: commentId -> author
  const [authorById, setAuthorById] = useState<Record<string, string>>({});

  // init local defaults
  useEffect(() => {
    setAuthorName(loadAuthorDefault());
    setAuthorById(loadAuthorMap());
  }, []);

  // subscribe comments
  useEffect(() => {
    const q = query(
      collection(db, "questions", question.id, "comments"),
      orderBy("createdAt", "asc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setComments(
        snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            text: data.text ?? "",
            createdAt: data.createdAt ?? null,
          };
        })
      );
    });
    return () => unsub();
  }, [question.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // gửi comment lên Firestore (chỉ text + createdAt)
    const ref = await addDoc(collection(db, "questions", question.id, "comments"), {
      text: commentText.trim(),
      createdAt: serverTimestamp(),
    });

    // lưu tên cục bộ giống như “Tên nhóm”: nhớ cho lần sau & gán tên cho commentId mới
    const name = authorName.trim() || "Ẩn danh";
    if (authorName.trim()) saveAuthorDefault(authorName.trim());

    const updated = { ...authorById, [ref.id]: name };
    setAuthorById(updated);
    saveAuthorMap(updated);

    setCommentText("");
  };

  const createdAtStr = useMemo(() => timeAgo(question.createdAt), [question]);

  // lấy tên hiển thị cho từng comment
  const getAuthorFor = (id: string) => authorById[id] || "Ẩn danh";

  return (
    <motion.div
      className="bg-white rounded-xl shadow p-5 mb-6 border border-[#e0e7ff] text-[#2a2e6e]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="text-[#6e7fdc] font-semibold">Nhóm: {question.group}</div>
        {createdAtStr && <div className="text-xs text-gray-500">{createdAtStr}</div>}
      </div>

      <strong className="block mb-1 text-[#3a3f8f]">Câu hỏi:</strong>
      <p className="mb-4">{question.text}</p>

      {/* Form nhập tên + bình luận (tên giống kiểu “Tên nhóm…”) */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-3">
        <input
          type="text"
          placeholder="Tên của bạn (để trống = Ẩn danh)"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="border border-[#bfcfff] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e7fdc]"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Viết bình luận..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 border border-[#bfcfff] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6e7fdc]"
            required
            maxLength={500}
          />
          <button
            type="submit"
            className="bg-[#3a3f8f] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow hover:bg-[#2a2e6e] transition"
          >
            Gửi
          </button>
        </div>
      </form>

      {/* Danh sách comments */}
      <AnimatePresence>
        {comments.map((c) => (
          <motion.div
            key={c.id}
            className="bg-[#f4f7ff] rounded-md px-3 py-2 mb-2 text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#3a3f8f]">{getAuthorFor(c.id)}</span>
              <span className="text-xs text-gray-500">{timeAgo(c.createdAt)}</span>
            </div>
            <div>{c.text}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionItem;
