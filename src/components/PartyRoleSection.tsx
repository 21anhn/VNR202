// src/components/PartyRoleSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaCogs, FaSitemap, FaHandshake, FaUsers } from "react-icons/fa";

const PartyRoleSection: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl border-4 border-red-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-6 text-center"
        variants={itemVariants}
      >
        <FaStar className="inline-block text-red-600 mr-3" />
        Vai trò lãnh đạo của Đảng Cộng sản Việt Nam
      </motion.h2>

      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        variants={itemVariants}
        transition={{ staggerChildren: 0.3, delay: 0.2 }}
      >
        <motion.li
          className="bg-red-50 p-6 rounded-2xl shadow-lg border-2 border-red-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-red-800 text-xl font-bold mb-3">
            <FaSitemap className="mr-3 text-2xl" /> Nhân tố lãnh đạo quyết định
          </div>
          <p className="text-gray-600 text-base">
            Đảng Cộng sản Việt Nam là lực lượng duy nhất lãnh đạo Nhà nước và
            xã hội, bảo đảm định hướng xã hội chủ nghĩa cho cách mạng Việt Nam.
          </p>
        </motion.li>

        <motion.li
          className="bg-red-50 p-6 rounded-2xl shadow-lg border-2 border-red-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-red-800 text-xl font-bold mb-3">
            <FaCogs className="mr-3 text-2xl" /> Xây dựng và Chỉnh đốn
          </div>
          <p className="text-gray-600 text-base">
            Đảng phải thường xuyên tự xây dựng, chỉnh đốn, nâng cao năng lực,
            đạo đức, chống quan liêu, tham nhũng, “giữ Đảng thật trong sạch”.
          </p>
        </motion.li>

        <motion.li
          className="bg-red-50 p-6 rounded-2xl shadow-lg border-2 border-red-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-red-800 text-xl font-bold mb-3">
            <FaHandshake className="mr-3 text-2xl" /> Đổi mới phương thức lãnh đạo
          </div>
          <p className="text-gray-600 text-base">
            Đảng lãnh đạo bằng chủ trương, đường lối, tôn trọng nguyên tắc pháp
            quyền; không bao biện làm thay Nhà nước, phát huy vai trò Mặt trận và
            các tổ chức chính trị – xã hội.
          </p>
        </motion.li>

        <motion.li
          className="bg-red-50 p-6 rounded-2xl shadow-lg border-2 border-red-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-red-800 text-xl font-bold mb-3">
            <FaUsers className="mr-3 text-2xl" /> Gắn bó với Nhân dân
          </div>
          <p className="text-gray-600 text-base">
            Đảng là “đầy tớ trung thành của Nhân dân”, phải giữ mối quan hệ máu
            thịt với Nhân dân, dựa vào Nhân dân để xây dựng và bảo vệ Tổ quốc.
          </p>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default PartyRoleSection;
