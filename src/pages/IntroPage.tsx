/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { motion, cubicBezier } from "framer-motion";
import {
  FaGavel,
  FaVoteYea,
  FaStar,
  FaGlobeAsia,
  FaLightbulb,
} from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

// ====== Reuse your current assets (giữ nguyên ảnh hiện có) ======
import img3ng from "../assets/3ng.png";
import section3Img from "../assets/section3.jpg";
import section4Img from "../assets/section4.jpg";

// Video nền có thể dùng file cũ của bạn
const videoUrl = "/assets/video/bg-socialism.mp4";

// ====== Motion helpers ======
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: cubicBezier(0.4, 0, 0.2, 1) },
  },
};

const tooltipClass =
  "absolute bottom-0 left-1/2 translate-y-full -translate-x-1/2 w-[80%] bg-black/70 text-white text-sm md:text-base font-medium px-4 py-3 rounded-lg shadow-lg backdrop-blur-md pointer-events-none";

// ====== Quick Nav ======
function QuickNav() {
  const items = [
    { id: "quan-diem", label: "Quan điểm HCM" },
    { id: "nha-nuoc", label: "Nhà nước của dân" },
    { id: "thuc-trang", label: "Thực trạng – số liệu" },
    { id: "thach-thuc", label: "Thách thức" },
    { id: "giai-phap", label: "Giải pháp" },
    { id: "quiz", label: "Quiz" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
      {items.map((it) => (
        <ScrollLink
          key={it.id}
          to={it.id}
          smooth
          duration={600}
          offset={-80}
          className="cursor-pointer px-4 py-2 rounded-full bg-white/80 hover:bg-white shadow border border-white/60 text-[#2a2e6e] font-medium backdrop-blur-md transition"
        >
          {it.label}
        </ScrollLink>
      ))}
    </div>
  );
}

// ====== Flip Card ======
function FlipCard({
  title,
  bullets,
  quote,
}: {
  title: string;
  bullets: string[];
  quote?: string;
}) {
  const line1 = bullets?.[0] || "";
  const line2 = bullets?.[1] || "";
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      className="w-full max-w-sm"
      // perspective đặt ngay wrapper để không bị ancestor “phẳng hóa”
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)} // hỗ trợ mobile
    >
      <div
        className={`flip-inner ${flipped ? "is-flipped" : ""}`}
        style={{
          position: "relative",
          height: "16rem",
          borderRadius: "1rem",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Front: chỉ tiêu đề */}
        <div
          className="flip-face"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1rem",
            background: "rgba(255,255,255,.7)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.7)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-[#2a2e6e] text-center leading-snug">
            {title}
          </h3>
        </div>

        {/* Back: đúng 2 dòng giải thích (+ quote nhỏ nếu có) */}
        <div
          className="flip-face"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1rem",
            color: "#fff",
            background: "#2a2e6e",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: "1.25rem",
            textAlign: "center",
          }}
        >
          <p className="text-sm md:text-base leading-relaxed">{line1}</p>
          {line2 && (
            <p className="text-sm md:text-base leading-relaxed">{line2}</p>
          )}
          {quote && (
            <p className="mt-2 text-xs opacity-80 italic">{quote}</p>
          )}
        </div>
      </div>

      {/* CSS nhỏ để bật lật */}
      <style>{`
        .flip-inner.is-flipped { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}


// ====== Triangle Power Diagram (hover to show notes) ======
function PowerTriangle() {
  const nodes = [
    { id: "people", label: "Nhân dân", x: 50, y: 10 },
    { id: "party", label: "Đảng", x: 10, y: 85 },
    { id: "state", label: "Nhà nước", x: 90, y: 85 },
  ] as const;

  const edges = [
    { from: "people", to: "party", text: "Ủy thác niềm tin • giám sát" },
    { from: "party", to: "state", text: "Lãnh đạo • định hướng" },
    { from: "state", to: "people", text: "Phục vụ • bảo đảm quyền" },
  ];

  // ghi chú theo từng nút
  const notes: Record<(typeof nodes)[number]["id"], string> = {
    people:
      "Nhân dân ↔ Đảng: Phê bình, góp ý, kiểm tra đảng viên.\nNhà nước ↔ Nhân dân: Phục vụ lợi ích nhân dân; thực hiện dân chủ, pháp luật nghiêm minh.",
    party:
      "Đảng ↔ Nhân dân: Lắng nghe, chịu sự giám sát của dân.\nĐảng ↔ Nhà nước: Lãnh đạo bằng Cương lĩnh, đường lối; tôn trọng pháp quyền.",
    state:
      "Nhà nước ↔ Nhân dân: Bảo đảm quyền, phục vụ dân.\nĐảng ↔ Nhà nước: Lãnh đạo – nhưng quyền lực được kiểm soát bởi pháp luật.",
  };

  const [hover, setHover] = React.useState<{
    id: (typeof nodes)[number]["id"];
    x: number;
    y: number;
  } | null>(null);

  // tiện hàm khởi tạo hover từ id
  const show = (id: (typeof nodes)[number]["id"]) => {
    const n = nodes.find((k) => k.id === id)!;
    setHover({ id, x: n.x, y: n.y });
  };

  return (
    <div className="relative w-full max-w-xl aspect-square mx-auto select-none">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Edges */}
        {edges.map((e, i) => (
          <g key={i}>
            <line
              x1={nodes.find((n) => n.id === e.from)!.x}
              y1={nodes.find((n) => n.id === e.from)!.y}
              x2={nodes.find((n) => n.id === e.to)!.x}
              y2={nodes.find((n) => n.id === e.to)!.y}
              className="stroke-[#6e7fdc]"
              strokeWidth={0.8}
            />
          </g>
        ))}

        {/* Nodes (hover/click để hiện tooltip) */}
        {nodes.map((n) => {  const dy = n.id === "people" ? -6 : 10; // people nằm trên → chữ đặt trên đầu, còn lại chữ dưới
return( 
          <g
            key={n.id}
            onMouseEnter={() => show(n.id)}
            onMouseLeave={() => setHover(null)}
            onClick={() =>
              setHover((h) => (h?.id === n.id ? null : { id: n.id, x: n.x, y: n.y }))
            } // mobile tap
            style={{ cursor: "pointer" }}
          >
            <circle cx={n.x} cy={n.y} r={5.5} className="fill-[#2a2e6e]" />
            <text
              x={n.x}
              y={n.y + dy}
              textAnchor="middle"
              className="fill-[#2a2e6e] text-[4px] font-semibold"
            >
              {n.label}
            </text>
          </g>
            );
        })}
      </svg>

      {/* Tooltip nổi theo node */}
      {hover && (
        <div
          className="absolute z-20 w-[70%] md:w-[50%] bg-white/90 border border-white/80 shadow-lg rounded-xl p-3 text-sm leading-snug text-[#1f2344] backdrop-blur-md"
          style={{
            left: `${hover.x}%`,
            top: `${hover.y}%`,
            transform: `translate(-50%, calc(-100% - 10px))`,
            pointerEvents: "none", // không cản hover svg
          }}
        >
          <div className="font-semibold mb-1">
            {nodes.find((n) => n.id === hover.id)!.label}
          </div>
          <div className="whitespace-pre-line">{notes[hover.id]}</div>

          {/* mũi tên nhỏ */}
          <div
            className="absolute left-1/2 w-3 h-3 bg-white/90 border-r border-b border-white/80 rotate-45"
            style={{
              bottom: "-6px",
              transform: "translateX(-50%) rotate(45deg)",
            }}
          />
        </div>
      )}
    </div>
  );
}


// ====== Demo data (Trực quan hoá số liệu) ======
const corruptionData = [
  { name: "Thu hồi 2010 (tỷ)", value: 8152 },
  { name: "Đất (ha)", value: 2100 },
];

const socialImpact = [
  { name: "Mất niềm tin", value: 40 },
  { name: "Đạo đức xuống cấp", value: 35 },
  { name: "Bất bình XH", value: 25 },
];

// ====== Main Page ======
const IntroPage_HCM: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden pb-24 bg-[#f4f7ff]">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-80 -z-10"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* HERO / HOME */}
      <section
        className="relative w-full min-h-[85vh] flex flex-col md:flex-row items-center justify-center px-4 pt-24 gap-12 z-10"
        id="home"
      >
        <motion.div
          className="flex-1 text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#2a2e6e] mb-6 leading-snug tracking-tight drop-shadow-lg text-center">
            Xây dựng Đảng & Nhà nước trong sạch, vững mạnh
            <br />
            <span className="block text-3xl md:text-5xl font-bold text-[#2a2e6e] mt-2">
              Phòng, chống tham nhũng
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#2a2e6e]/80 max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow bg-white/60 rounded-2xl px-6 py-4 backdrop-blur-md shadow-lg">
            Giới thiệu nhanh: Ý nghĩa, mục tiêu và yêu cầu cấp bách của nhiệm vụ
            xây dựng Đảng, xây dựng Nhà nước pháp quyền XHCN trong sạch, vững
            mạnh; kiên quyết phòng, chống tham nhũng, tiêu cực.
          </p>
          <QuickNav />
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="relative group w-full max-w-xs md:max-w-md"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <motion.img
              src={img3ng}
              alt="Karl Marx, Friedrich Engels, V.I. Lenin"
              className="rounded-3xl shadow-2xl w-full border-4 border-white/80 bg-white/60"
              variants={{
                rest: { rotate: 0 },
                hover: {
                  rotate: [0, -3, 3, -2, 2, 0],
                  transition: { duration: 0.6 },
                },
              }}
            />
            <motion.div
              variants={{
                rest: { opacity: 0, y: 10 },
                hover: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
              className={tooltipClass}
            >
              Poster đỏ–vàng với sao vàng, sách và khiên cán cân trước tòa nhà,
              kèm các biểu tượng chống tham nhũng, giám sát và liêm chính; tiêu
              đề ‘Xây dựng Đảng & Nhà nước trong sạch, vững mạnh – Phòng, chống
              tham nhũng.
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 mt-12 relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#6e7fdc] to-[#2a2e6e] hidden md:block" />

        {/* 2. Quan điểm HCM */}
        <section
          id="quan-diem"
          className="flex flex-col md:flex-row items-center justify-between my-20"
        >
          <motion.div
            className="md:w-1/2 md:pr-10 text-center md:text-right mb-8 md:mb-0"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <FaStar className="inline-block text-4xl text-[#6e7fdc] mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-4">
              Tư tưởng Hồ Chí Minh về xây dựng Đảng trong sạch, vững mạnh
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {/* === FlipCard grid (I. Tư tưởng HCM về xây dựng Đảng) === */}
              <FlipCard
                title="Đảng vừa là đạo đức, vừa là văn minh"
                bullets={[
                  "Không phải để làm quan phát tài",
                  "Đội tiên phong trung thành với lợi ích dân tộc & giai cấp công nhân",
                ]}
                quote={`“Đảng ta là đạo đức, là văn minh.” – Hồ Chí Minh`}
              />

              <FlipCard
                title="Phẩm chất cán bộ"
                bullets={[
                  "Cần – Kiệm – Liêm – Chính – Chí công vô tư",
                  "Tuyệt đối trung thành với Đảng, đặt lợi ích chung lên trên cá nhân",
                ]}
                quote={`“Người cách mạng phải cần, kiệm, liêm, chính, chí công vô tư.” – Hồ Chí Minh`}
              />

              <FlipCard
                title="Công bộc của dân"
                bullets={[
                  "Cán bộ là công bộc, đầy tớ trung thành của nhân dân",
                  "Phục vụ nhân dân, không đặc quyền đặc lợi",
                ]}
                quote={`“Cán bộ là công bộc của dân, là đầy tớ trung thành của nhân dân.” – Hồ Chí Minh`}
              />

              <FlipCard
                title="Giặc ở trong lòng"
                bullets={[
                  "Chủ nghĩa cá nhân = nguồn gốc suy thoái",
                  "Làm nảy sinh tham nhũng, quan liêu",
                ]}
                quote={`“Chủ nghĩa cá nhân là giặc ở trong lòng.” – Hồ Chí Minh`}
              />

              <FlipCard
                title="CQ6.1 (yêu cầu cán bộ)"
                bullets={[
                  "Gương mẫu, đấu tranh chống đặc quyền, đặc lợi",
                  "Không cửa quyền, hách dịch; định kỳ chuyển đổi công tác",
                ]}
                quote={`Cán bộ phải gương mẫu; kiên quyết chống đặc quyền, đặc lợi; không cửa quyền, hách dịch; định kỳ chuyển đổi vị trí công tác để ngăn ngừa tham nhũng (CQ6.1).`}
              />
            </div>
          </motion.div>

          <div className="md:w-1/2 flex justify-center items-center relative">
            <motion.div
              className="relative group w-full max-w-sm"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.img
                src={section3Img}
                alt="Biểu tượng Đảng"
                className="rounded-2xl shadow-xl w-full border-4 border-white/80 bg-white/60"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.03, transition: { duration: 0.4 } },
                }}
              />
              <motion.div
                variants={{
                  rest: { opacity: 0, y: 10 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className={tooltipClass}
              >
                Bác Hồ – Đảng – Dân tộc.
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. Nhà nước của dân, do dân, vì dân */}
        <section
          id="nha-nuoc"
          className="flex flex-col-reverse md:flex-row items-center justify-between my-20"
        >
          {/* Cột trái: Nội dung */}
          <motion.div
            className="md:w-1/2 md:pr-10 text-center md:text-right mb-8 md:mb-0"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <FaGavel className="inline-block text-4xl text-[#2a2e6e] mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-4">
              Nhà nước của dân, do dân, vì dân
            </h2>

            {/* Nội dung chính theo II */}
            <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
              <li>
                Nhà nước Việt Nam theo Hồ Chí Minh là <b>nhà nước dân chủ</b>,
                mọi quyền hành thuộc về <b>toàn thể nhân dân</b>.
              </li>
              <li>
                Cán bộ Nhà nước là <b>“công bộc”</b>, phải làm sao cho{" "}
                <b>dân giàu, nước mạnh</b>.
              </li>
              <li>
                Quyền lực nhà nước cần được <b>kiểm soát</b>. Nhân dân có quyền{" "}
                <b>giám sát, phê bình, bãi miễn</b> đại biểu nếu không xứng
                đáng.
              </li>
            </ul>

            {/* Kết nối CQ6.4 */}
            <div className="mt-6 p-4 rounded-2xl bg-white/70 border border-white/70 shadow">
              <div className="font-semibold text-[#2a2e6e] mb-2">
                Kết nối CQ6.4: Yêu cầu với Nhà nước pháp quyền XHCN trong giai
                đoạn mới
              </div>
              <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
                <li>
                  <b>Hệ thống pháp luật</b> hoàn thiện, bảo vệ quyền công dân.
                </li>
                <li>
                  <b>Tổ chức bộ máy</b> trong sạch, vững mạnh.
                </li>
                <li>
                  Thực hiện cơ chế <b>“một cửa”</b> để minh bạch, chống quan
                  liêu.
                </li>
                <li>
                  <b>Luân chuyển cán bộ</b> ở vị trí nhạy cảm (tài sản, ngân
                  sách).
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Cột phải: PowerTriangle */}
          <div className="md:w-1/2 flex justify-center items-center relative mb-8 md:mb-0">
            <div className="w-full max-w-sm">
              <PowerTriangle />
            </div>
          </div>
        </section>

        {/* 3. Tham nhũng – Nguy cơ và Thực trạng */}
        <section
          id="thuc-trang"
          className="flex flex-col md:flex-row items-start justify-between my-20 gap-8"
        >
          {/* Cột trái: Mở đầu + Kinh tế */}
          <motion.div
            className="md:w-1/2 text-left"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <FaGlobeAsia className="inline-block text-4xl text-[#6e7fdc] mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-4">
              Tham nhũng – Nguy cơ và Thực trạng
            </h2>

            {/* Mở đầu */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/70 shadow mb-6">
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  Tham nhũng gắn liền với <b>quyền lực</b>: chỉ người có chức
                  vụ, quyền hạn mới có thể lợi dụng để trục lợi.
                </li>
                <li>
                  Hồ Chí Minh coi <b>tham ô</b> là “trộm cướp”, <b>lãng phí</b>{" "}
                  là “kẻ thù của nhân dân”, <b>quan liêu</b> là mảnh đất nuôi
                  dưỡng tham nhũng.
                </li>
                <li>
                  Hệ quả: xói mòn niềm tin, băng hoại đạo đức, cản trở phát
                  triển, mục ruỗng bộ máy; bị thế lực thù địch lợi dụng.
                </li>
              </ul>
            </div>

            {/* Kinh tế */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/70 shadow text-left">
              <h3 className="font-semibold text-[#2a2e6e] mb-2">Kinh tế</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer>
                  <BarChart data={corruptionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ReTooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-3 space-y-1">
                <li>
                  Gây <b>thất thoát, lãng phí</b> nguồn lực quốc gia, làm chậm
                  tăng trưởng.
                </li>
                <li>
                  Tạo <b>chi phí “ngầm”</b> trong đầu tư, đấu thầu, cấp vốn →
                  méo mó môi trường kinh doanh.
                </li>
                <li className="text-gray-600">
                  CQ6.2: Năm 2010, thanh tra kiến nghị thu hồi hơn{" "}
                  <b>8.152 tỷ đồng</b> và hơn <b>2.100 ha đất</b> do sai phạm
                  trong quản lý đất đai, đầu tư, tài sản công.
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Cột phải: Xã hội + Chính trị */}
          <motion.div
            className="md:w-1/2 text-left"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            {/* Xã hội */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/70 shadow mb-6">
              <h3 className="font-semibold text-[#2a2e6e] mb-2">Xã hội</h3>
              <div className="h-48 w-full">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={socialImpact}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-3 space-y-1">
                <li>
                  Băng hoại đạo đức, khuyến khích{" "}
                  <b>chủ nghĩa cá nhân, vụ lợi</b>.
                </li>
                <li>
                  Gây <b>bất bình</b>, làm <b>mất niềm tin</b> của nhân dân với
                  Đảng, Nhà nước.
                </li>
                <li>
                  Khoét sâu <b>khoảng cách giàu – nghèo</b>, bất công xã hội,
                  suy giảm đồng thuận.
                </li>
              </ul>
            </div>

            {/* Chính trị */}
            <div className="p-4 rounded-2xl bg-white/70 border border-white/70 shadow">
              <h3 className="font-semibold text-[#2a2e6e] mb-2">Chính trị</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Làm mục ruỗng bộ máy, suy thoái cán bộ, đảng viên.</li>
                <li>
                  <b>Trực tiếp đe dọa sự tồn vong</b> của Đảng và chế độ.
                </li>
                <li>
                  Bị các thế lực thù địch lợi dụng để chống phá, chia rẽ nhân
                  dân với Đảng.
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* 4. Thách thức xây dựng Đảng hiện nay */}
        <section
          id="thach-thuc"
          className="flex flex-col-reverse md:flex-row items-center justify-between my-20 gap-8"
        >
          {/* (Giữ) Cột trái: ảnh minh hoạ – có thể bỏ nếu muốn */}
          <div className="md:w-1/2 flex justify-center items-center relative">
            <motion.div
              className="relative group w-full max-w-sm"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.img
                src={section4Img}
                alt="Cải cách hành chính, chuyển đổi số"
                className="rounded-2xl shadow-xl w-full border-4 border-white/80 bg-white/60"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.03, transition: { duration: 0.4 } },
                }}
              />
              <motion.div
                variants={{
                  rest: { opacity: 0, y: 10 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className={tooltipClass}
              >
                Xây dựng Đảng Cộng sản Việt Nam trong sạch, vững mạnh.
              </motion.div>
            </motion.div>
          </div>

          {/* Cột phải: nội dung theo IV */}
          <motion.div
            className="md:w-1/2 md:pl-10 text-center md:text-left mb-8 md:mb-0"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <FaVoteYea className="inline-block text-4xl text-[#2a2e6e] mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-4">
              Thách thức xây dựng Đảng hiện nay
            </h2>

            <p className="text-gray-700 mb-3">
              Hiện nay, công tác xây dựng Đảng đối mặt nhiều thách thức:
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
              <li>
                Một bộ phận cán bộ, đảng viên{" "}
                <b>suy thoái tư tưởng, đạo đức, lối sống</b>.
              </li>
              <li>
                Xuất hiện tình trạng <b>“tự diễn biến”, “tự chuyển hóa”</b>{" "}
                trong nội bộ.
              </li>
              <li>
                <b>Công tác cán bộ</b> còn yếu, tồn tại cục bộ, bè phái, tạo
                điều kiện hình thành
                <b> tham nhũng khép kín</b>.
              </li>
              <li>
                <b>Tham nhũng, lãng phí</b> vẫn diễn biến phức tạp, gây bức xúc
                trong xã hội.
              </li>
            </ul>

            <div className="mt-4 p-4 rounded-2xl bg-white/70 border border-red-300 shadow">
              <div className="text-sm text-red-700 font-semibold">
                CQ6.3: Đây là những nguy cơ lớn; nếu không ngăn chặn sẽ ảnh
                hưởng trực tiếp tới <b>uy tín</b>, <b>sức mạnh</b> và{" "}
                <b>sự tồn vong</b> của Đảng.
              </div>
            </div>
          </motion.div>
        </section>

        {/* 5. Giải pháp & Yêu cầu cấp bách */}
        <section
          id="giai-phap"
          className="flex flex-col md:flex-row items-start justify-between my-20 gap-8"
        >
          {/* Nội dung chính */}
          <motion.div
            className="md:w-1/2 md:pr-10 text-center md:text-left"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <FaGavel className="inline-block text-4xl text-[#6e7fdc] mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-4">
              Giải pháp & Yêu cầu cấp bách
            </h2>

            <p className="text-gray-700 mb-4">
              Để ngăn chặn và đẩy lùi tham nhũng, cần triển khai đồng bộ nhiều
              giải pháp:
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
              <li>
                <b>Kiểm soát quyền lực:</b> Xác định cơ chế phân công, phối hợp,
                kiểm soát giữa các cơ quan từ Trung ương đến địa phương.
              </li>
              <li>
                <b>Trách nhiệm người đứng đầu:</b> Xử lý nghiêm khi để xảy ra
                tham nhũng trong phạm vi quản lý.
              </li>
              <li>
                <b>Cải cách hành chính:</b> Thực hiện cơ chế “một cửa”, minh
                bạch hóa thủ tục để ngăn cơ hội nhũng nhiễu.
              </li>
              <li>
                <b>Phát huy vai trò nhân dân:</b> Tạo cơ chế để dân giám sát,
                bảo vệ người tố cáo, khuyến khích đấu tranh chống tham nhũng.
              </li>
              <li>
                <b>Nêu gương của cán bộ:</b> Lấy phòng ngừa là chính, nhưng xử
                lý nghiêm minh, không có “vùng cấm”.
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-white/70 border border-green-300 shadow">
              <div className="text-sm text-green-800 font-semibold">
                CQ6.5: Văn kiện Đại hội XIII của Đảng kế thừa tư tưởng Hồ Chí
                Minh, nhấn mạnh xây dựng Nhà nước vì dân, coi trọng{" "}
                <b>văn hoá</b>, <b>đạo đức</b>, <b>con người Việt Nam</b> làm
                nền tảng cho phát triển bền vững.
              </div>
            </div>
          </motion.div>

          {/* Timeline minh hoạ */}
          <div className="md:w-1/2 flex justify-center items-center relative">
            <div className="w-full max-w-md">
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6e7fdc] to-[#2a2e6e] rounded" />
                {[
                  {
                    year: "Hồ Chí Minh",
                    text: "Nền tảng tư tưởng về dân chủ, đạo đức cách mạng, chống tham nhũng.",
                  },
                  {
                    year: "Đại hội XII",
                    text: "Đẩy mạnh phòng, chống tham nhũng, lãng phí; xây dựng, chỉnh đốn Đảng.",
                  },
                  {
                    year: "Đại hội XIII",
                    text: "Hoàn thiện Nhà nước pháp quyền XHCN; phát huy dân chủ, kiểm soát quyền lực; đề cao văn hoá, đạo đức, con người.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="relative mb-6">
                    <div className="absolute -left-1 top-1.5 h-3 w-3 rounded-full bg-white border-2 border-[#6e7fdc]" />
                    <div className="ml-4 p-4 bg-white/70 border border-white/70 rounded-xl shadow">
                      <div className="text-sm font-semibold text-[#2a2e6e]">
                        {item.year}
                      </div>
                      <div className="text-sm text-gray-700">{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Conclusion */}
      <motion.div
        className="container mx-auto px-4 mt-12 text-center"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <FaLightbulb className="inline-block text-4xl text-yellow-500 mb-4" />
        <h2 className="text-3xl md:text-4xl font-bold text-[#2a2e6e] mb-6">
          Kết luận
        </h2>

        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed bg-white/70 p-6 rounded-2xl shadow">
          Tham nhũng thực sự là <b>“giặc nội xâm”</b>, nguy cơ từ chính nội bộ
          nếu không <b>kiểm soát quyền lực</b>, không{" "}
          <b>rèn luyện đạo đức cán bộ</b>. Tư tưởng Hồ Chí Minh và đường lối,
          nghị quyết của Đảng chính là <b>kim chỉ nam</b> để xây dựng Đảng, Nhà
          nước trong sạch, vững mạnh, <b>củng cố niềm tin của nhân dân</b> và
          bảo đảm <b>sự tồn vong của chế độ</b>.
        </p>
      </motion.div>
    </div>
  );
};

export default IntroPage_HCM;
