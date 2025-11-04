import React from "react";
import { motion } from "framer-motion";
import { Scale, Users, Gavel, ShieldCheck, Flag } from "lucide-react";

const principles = [
  {
    icon: <Users className="w-10 h-10 text-green-600 mb-2" />,
    title: "Quyền lực thuộc về Nhân dân",
    desc: "Trong tư tưởng Hồ Chí Minh, Nhân dân là chủ thể tối cao của quyền lực; Nhà nước là công cụ để Nhân dân thực hiện quyền làm chủ.",
  },
  {
    icon: <Scale className="w-10 h-10 text-blue-600 mb-2" />,
    title: "Thượng tôn Hiến pháp và pháp luật",
    desc: "Pháp luật giữ vị trí tối thượng trong quản lý xã hội; mọi tổ chức, cá nhân đều bình đẳng trước pháp luật, không ai được đứng trên pháp luật.",
  },
  {
    icon: <Flag className="w-10 h-10 text-red-600 mb-2" />,
    title: "Sự lãnh đạo của Đảng Cộng sản",
    desc: "Đảng là nhân tố lãnh đạo quyết định, bảo đảm Nhà nước đi đúng định hướng xã hội chủ nghĩa, đồng thời chịu sự giám sát của Nhân dân.",
  },
  {
    icon: <Gavel className="w-10 h-10 text-yellow-600 mb-2" />,
    title: "Phân công và kiểm soát quyền lực",
    desc: "Quyền lực nhà nước thống nhất nhưng có sự phân công, phối hợp và kiểm soát giữa lập pháp, hành pháp, tư pháp để tránh lạm quyền.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-purple-600 mb-2" />,
    title: "Dân chủ gắn với kỷ cương",
    desc: "Thực hiện dân chủ phải đi đôi với giữ vững kỷ luật, kỷ cương; bảo đảm quyền con người, quyền công dân, vì mục tiêu dân giàu, nước mạnh, dân chủ, công bằng, văn minh.",
  },
];

const PrincipleSection: React.FC = () => {
  return (
    <section className="relative z-10 w-full flex flex-col items-center justify-center py-16 px-4 bg-white/80 backdrop-blur-md">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-blue-800 mb-8 text-center drop-shadow"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Nguyên lý cơ bản theo Tư tưởng Hồ Chí Minh
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {principles.map((p, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center bg-white rounded-xl shadow-lg p-8 border border-blue-100 hover:shadow-2xl transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            {p.icon}
            <div className="text-xl font-semibold text-blue-700 mb-2 text-center">
              {p.title}
            </div>
            <div className="text-base text-gray-700 text-center leading-relaxed">
              {p.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PrincipleSection;
