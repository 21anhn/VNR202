import React from "react";
import { motion } from "framer-motion";
import VoiceChatbot from "../components/VoiceChatbot";

const ChatbotPage: React.FC = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7ff] py-10 px-2">
    <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-6 md:p-10">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2a2e6e] via-[#6e7fdc] to-[#3a3f8f] mb-8 text-center drop-shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Chatbot hỏi đáp giáo trình Tư tưởng Hồ Chí Minh
      </motion.h2>
      <VoiceChatbot />
    </div>
  </div>
);

export default ChatbotPage;
