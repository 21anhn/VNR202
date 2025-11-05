// src/components/ExampleAccordion.tsx
import React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

const aiApplications = [
  {
    title: "Chatbot hỏi–đáp giáo trình & văn kiện",
    content:
      "Chatbot dựa trên Gemini + ChatGPT giúp tra cứu khái niệm, luận điểm, trích dẫn tiêu biểu; có thể trả lời văn bản và giọng nói (Text-to-Speech) để tăng trải nghiệm tự học.",
  },
  {
    title: "Storytelling & minh họa hình ảnh",
    content:
      "Sử dụng Gemini để generate hình ảnh minh họa cho các câu chuyện, giúp người học dễ hình dung nội dung và liên hệ thực tiễn.",
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
        Ứng dụng AI trong phát triển nội dung môn Lịch sử Đảng cộng sản Việt Nam
        (VNR202)
      </motion.h2>
      <motion.p
        className="text-sm md:text-base text-gray-600 mb-7 text-center italic"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        *Sử dụng AI (Gemini + ChatGPT) để tạo chatbot, tóm tắt chương mục, và
        Gemini để generate hình ảnh minh họa trong storytelling. Nội dung bám
        sát đề cương và giáo trình môn học.*
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
