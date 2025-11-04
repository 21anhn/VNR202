// src/components/ConclusionSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";

const ConclusionSection: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl border-4 border-purple-200 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-6"
        variants={itemVariants}
      >
        <FaLightbulb className="inline-block text-purple-600 mr-3" />
        Kết luận
      </motion.h2>

      <motion.ul
        className="space-y-4 text-xl md:text-2xl font-medium text-gray-700 max-w-3xl mx-auto"
        variants={itemVariants}
        transition={{ staggerChildren: 0.25, delay: 0.15 }}
      >
        <motion.li variants={itemVariants}>
          <span className="font-bold">Độc lập dân tộc gắn liền với Chủ nghĩa xã hội</span> là
          mục tiêu chiến lược, xuyên suốt trong tư tưởng Hồ Chí Minh.
        </motion.li>

        <motion.li variants={itemVariants}>
          <span className="font-bold">Dân là gốc:</span> mọi đường lối, chính sách phải xuất
          phát từ lợi ích của Nhân dân; “việc gì có lợi cho dân thì hết sức làm”.
        </motion.li>

        <motion.li variants={itemVariants}>
          <span className="font-bold">Đảng Cộng sản Việt Nam</span> là lực lượng lãnh đạo,
          bảo đảm định hướng đúng đắn; đòi hỏi xây dựng Đảng trong sạch, vững mạnh.
        </motion.li>

        <motion.li variants={itemVariants}>
          <span className="font-bold">Nhà nước của dân, do dân, vì dân</span> và
          <span className="font-bold"> pháp quyền xã hội chủ nghĩa</span> là phương tiện
          hiện thực hóa quyền làm chủ của Nhân dân.
        </motion.li>

        <motion.li variants={itemVariants}>
          <span className="font-bold">Đạo đức cách mạng</span> — cần, kiệm, liêm, chính,
          chí công vô tư — là nền tảng; kiên quyết chống
          <span className="font-bold"> “giặc nội xâm”</span> (tham ô, lãng phí, quan liêu).
        </motion.li>

        <motion.li variants={itemVariants}>
          <span className="font-bold">Đại đoàn kết toàn dân tộc</span> là chiến lược lâu dài,
          là nguồn sức mạnh quyết định mọi thắng lợi.
        </motion.li>

        <motion.li variants={itemVariants}>
          <span className="font-bold">Học đi đôi với hành</span>, lý luận gắn với thực tiễn;
          kiên trì đổi mới, phát huy dân chủ, vì mục tiêu “dân giàu, nước mạnh, dân chủ,
          công bằng, văn minh”.
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default ConclusionSection;
