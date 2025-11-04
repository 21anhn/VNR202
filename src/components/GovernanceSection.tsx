// src/components/GovernanceSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaGavel, FaUsers } from "react-icons/fa";
import { FaScaleBalanced, FaFlag } from "react-icons/fa6";

const GovernanceSection: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl border-4 border-blue-200"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-6 text-center"
        variants={itemVariants}
      >
        <FaGavel className="inline-block text-[#6e7fdc] mr-3" />
        Nhà nước pháp quyền xã hội chủ nghĩa
      </motion.h2>

      <motion.p
        className="text-xl md:text-2xl text-gray-700 mb-8 text-center max-w-3xl mx-auto"
        variants={itemVariants}
        transition={{ delay: 0.2 }}
      >
        Trong tư tưởng Hồ Chí Minh, Nhà nước pháp quyền xã hội chủ nghĩa là{" "}
        <span className="font-bold">Nhà nước của dân, do dân, vì dân</span>,
        quản lý xã hội bằng Hiến pháp và pháp luật, dưới sự lãnh đạo của Đảng
        Cộng sản Việt Nam.
      </motion.p>

      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={itemVariants}
        transition={{ staggerChildren: 0.3, delay: 0.4 }}
      >
        <motion.li
          className="bg-blue-50 p-6 rounded-2xl shadow-lg border-2 border-blue-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-blue-800 text-xl font-bold mb-3">
            <FaScaleBalanced className="mr-3 text-2xl" /> Hiến pháp tối thượng
          </div>
          <p className="text-gray-600 text-base">
            Tất cả tổ chức, cá nhân và cơ quan nhà nước đều phải tuân thủ Hiến
            pháp và pháp luật; không ai đứng trên pháp luật.
          </p>
        </motion.li>

        <motion.li
          className="bg-blue-50 p-6 rounded-2xl shadow-lg border-2 border-blue-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-blue-800 text-xl font-bold mb-3">
            <FaHandshake className="mr-3 text-2xl" /> Phân công & Kiểm soát
          </div>
          <p className="text-gray-600 text-base">
            Quyền lực nhà nước là thống nhất nhưng có sự phân công, phối hợp và
            kiểm soát giữa lập pháp, hành pháp và tư pháp để tránh lạm quyền.
          </p>
        </motion.li>

        <motion.li
          className="bg-blue-50 p-6 rounded-2xl shadow-lg border-2 border-blue-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-blue-800 text-xl font-bold mb-3">
            <FaUsers className="mr-3 text-2xl" /> Bảo đảm quyền công dân
          </div>
          <p className="text-gray-600 text-base">
            Nhà nước có trách nhiệm tôn trọng, bảo vệ và phát huy quyền con
            người, quyền công dân; thực hiện dân chủ gắn với công bằng xã hội.
          </p>
        </motion.li>

        <motion.li
          className="bg-blue-50 p-6 rounded-2xl shadow-lg border-2 border-blue-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-blue-800 text-xl font-bold mb-3">
            <FaFlag className="mr-3 text-2xl" /> Sự lãnh đạo của Đảng
          </div>
          <p className="text-gray-600 text-base">
            Đảng Cộng sản Việt Nam là lực lượng lãnh đạo Nhà nước và xã hội,
            bảo đảm Nhà nước đi đúng định hướng xã hội chủ nghĩa.
          </p>
        </motion.li>

        <motion.li
          className="bg-blue-50 p-6 rounded-2xl shadow-lg border-2 border-blue-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-blue-800 text-xl font-bold mb-3">
            <FaScaleBalanced className="mr-3 text-2xl" /> Dân chủ gắn kỷ cương
          </div>
          <p className="text-gray-600 text-base">
            Dân chủ phải đi đôi với kỷ luật, kỷ cương; phát huy quyền làm chủ
            nhưng giữ vững sự ổn định và phát triển.
          </p>
        </motion.li>

        <motion.li
          className="bg-blue-50 p-6 rounded-2xl shadow-lg border-2 border-blue-300 transition-transform hover:scale-105"
          variants={itemVariants}
        >
          <div className="flex items-center text-blue-800 text-xl font-bold mb-3">
            <FaHandshake className="mr-3 text-2xl" /> Phục vụ phát triển
          </div>
          <p className="text-gray-600 text-base">
            Nhà nước hướng tới mục tiêu dân giàu, nước mạnh, dân chủ, công bằng,
            văn minh; vì lợi ích chung của toàn dân tộc.
          </p>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default GovernanceSection;
