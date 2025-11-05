import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import videoBg from "../assets/baocap.mp4";

// ⚙️ Font: import trong index.css hoặc layout chính
// @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;600&family=Special+Elite&display=swap');

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/game");
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* 🎬 Video nền */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-[0.4]"
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      {/* Overlay ánh sáng kiểu đèn vàng cũ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#1a1405]/20 to-black/50 z-10" />

      {/* Nội dung chính */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="font-['Special_Elite'] text-4xl md:text-6xl text-yellow-300 mb-6 drop-shadow-lg"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Hà Nội — Những Năm Bao Cấp
        </motion.h1>

        <motion.p
          className="font-['Roboto_Slab'] text-lg md:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Trở lại những năm 1980 — nơi tem phiếu, chợ mậu dịch và ánh đèn dầu
          vàng là một phần của cuộc sống hằng ngày.
        </motion.p>

        <motion.button
          onClick={handleStart}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg text-lg font-bold shadow-lg transition font-['Special_Elite']"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Bắt đầu hành trình
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
