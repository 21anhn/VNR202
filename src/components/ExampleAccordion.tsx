// src/components/ExampleAccordion.tsx
import React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const aiApplications = [
  {
    title: "Sinh bộ Quiz theo đề cương học phần",
    content:
      "AI tạo nhanh 15+ câu trắc nghiệm kèm gợi ý và giải thích, bao phủ các chủ đề: cơ sở hình thành tư tưởng Hồ Chí Minh; độc lập dân tộc gắn liền CNXH; đại đoàn kết toàn dân tộc; xây dựng Đảng & Nhà nước; đạo đức cách mạng; vận dụng thực tiễn và liên hệ hiện nay.",
  },
  {
    title: "Chatbot hỏi–đáp giáo trình & văn kiện",
    content:
      "Chatbot hỗ trợ tra cứu khái niệm, luận điểm then chốt và trích dẫn tiêu biểu (như “cần, kiệm, liêm, chính, chí công vô tư”, “giặc nội xâm”); có thể trả lời dạng văn bản và giọng nói (Text-to-Speech) để tăng tương tác tự học.",
  },
  {
    title: "Tóm tắt & bản đồ khái niệm chương mục",
    content:
      "AI giúp tóm tắt mỗi chương, tạo “mind map/logic map” thể hiện mối liên hệ giữa các luận điểm: từ mục tiêu độc lập dân tộc gắn CNXH đến phương thức thực hiện qua đại đoàn kết, xây dựng Đảng trong sạch, Nhà nước của dân, do dân, vì dân.",
  },
  {
    title: "Phân tích đạo đức cách mạng & tự rèn luyện",
    content:
      "Tạo checklist tự đánh giá theo các phẩm chất: cần–kiệm–liêm–chính–chí công vô tư; cơ chế nhắc nhở thói quen tốt; gợi ý tình huống/ví dụ thực tế để người học luyện phản biện và liên hệ bản thân.",
  },
  {
    title: "Vận dụng vào thực tiễn hiện nay",
    content:
      "Gợi ý tình huống học thuật/thực tiễn (chống tham nhũng, nêu gương cán bộ, phát huy dân chủ, đoàn kết quốc tế) để người học áp dụng phương pháp tư duy và nguyên tắc của tư tưởng Hồ Chí Minh vào bối cảnh đổi mới.",
  },
  {
    title: "Cá nhân hóa lộ trình ôn tập",
    content:
      "Theo dõi kết quả làm quiz để đề xuất phần đọc bổ sung, flashcards trọng tâm từng mục (đại đoàn kết, vai trò Đảng, Nhà nước pháp quyền XHCN), giúp ôn thi hiệu quả và có hệ thống.",
  },
];

const ExampleAccordion: React.FC = () => {
  return (
    <section className="relative z-10 w-full flex flex-col items-center justify-center py-14 px-4 bg-blue-50/80">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-blue-800 mb-2 text-center drop-shadow"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Ứng dụng AI trong môn Tư tưởng Hồ Chí Minh
      </motion.h2>
      <motion.p
        className="text-sm md:text-base text-gray-600 mb-7 text-center italic"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        *Nội dung bám sát đề cương và giáo trình môn Tư tưởng Hồ Chí Minh.*
      </motion.p>
      <Accordion.Root
        type="single"
        collapsible
        className="w-full max-w-2xl mx-auto rounded-2xl shadow-2xl bg-white/90 divide-y divide-blue-100"
      >
        {aiApplications.map((item, i) => (
          <Accordion.Item
            key={i}
            value={"item-" + i}
            className="overflow-hidden rounded-2xl mb-3 shadow-lg border border-blue-100"
          >
            <Accordion.Header asChild>
              <Accordion.Trigger asChild>
                <motion.button
                  className="flex w-full items-center justify-between px-7 py-6 text-lg font-semibold text-blue-700 bg-white group outline-none transition-all duration-200 hover:bg-blue-50 focus:bg-blue-100 rounded-2xl shadow-md"
                  initial={{ backgroundColor: "#fff" }}
                  whileHover={{ backgroundColor: "#e0edfa" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{item.title}</span>
                  <span className="ml-2 transition-transform group-data-[state=open]:rotate-180">
                    <ChevronDown className="w-6 h-6 text-blue-500" />
                  </span>
                </motion.button>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild>
              <motion.div
                className="px-7 pb-6 text-base text-gray-700 bg-blue-50/80 rounded-b-2xl border-t border-blue-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {item.content}
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
};

export default ExampleAccordion;
