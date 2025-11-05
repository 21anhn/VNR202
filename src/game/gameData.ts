// src/game/gameData.ts
import type { GameData, GameState } from "./types";

// Đây là state khởi tạo (từ passage "Bắt đầu")
export const initialState: GameState = {
  ngay: 1,
  gao: 5,
  thit: 0,
  rau: 1,
  luong: 30,
  tem_thit: 1,
  tem_vai: 1,
  suc_khoe_con: 100,
  tinh_cam_hang_xom: 5,
  co_sam_xe: false,
  tang_gia: false,
};

const sounds = {
  cho: "/game/assets/audio/cho.mp3",
  tieng_loa_phuong: "/game/assets/audio/daitiengnoiVietNam.mp3",
  toi: "/game/assets/audio/toi.mp3",
};

// Đây là toàn bộ các passages đã được "dịch"
export const gameData: GameData = {
  // Passage "Bắt đầu" chỉ dùng để set state, ta sẽ dùng "GioiThieu" làm passage bắt đầu
  GioiThieu: {
    id: "GioiThieu",
    tag: "gioi-thieu",
    text: () => `
      <h1>Giới thiệu</h1>
      <p>Hà Nội, năm 1982.</p>
      <p>Chiến tranh đã qua, nhưng cuộc sống vẫn còn vô vàn khó khăn. Cả thành phố đang sống trong thời kỳ "Bao Cấp". Mọi thứ đều được phân phối, từ cân gạo, lạng thịt, đến mét vải, bánh xà phòng.</p>
      <p>Bạn là chủ một gia đình 3 người, gồm hai vợ chồng và một đứa con nhỏ, đang sống trong một căn phòng tập thể rộng 15 mét vuông.</p>
      <p>Cuộc sống là một chuỗi ngày dài lo toan: Lo cho con đủ bữa, lo xoay xở khi xe hỏng, lo giữ gìn từng đồng lương và cái tem phiếu.</p>
      <p>Liệu bạn có thể lèo lái gia đình nhỏ của mình vượt qua giai đoạn khó khăn này?</p>
    `,
    choices: () => [
      {
        text: "Bắt đầu cuộc sống mới",
        nextId: "SangNgayMoi", // Passage "Bắt đầu" trong Twine chỉ set state rồi goto "SangNgayMoi"
      },
    ],
    onLoad: (state) => {
      return state;
    },
  },
  SangNgayMoi: {
    id: "SangNgayMoi",
    tag: "khu-tap-the", // Sẽ dùng tag này cho hình nền
    text: () => "", // Passage này chỉ chứa logic
    choices: () => [],
    // onLoad xử lý tất cả logic của passage "SangNgayMoi"
    onLoad: (state, goTo) => {
      if (state.gao <= 0) {
        goTo("Game_Over_HetGao");
        return state;
      }
      if (state.suc_khoe_con <= 0) {
        goTo("Game_Over_ConOm");
        return state;
      }

      // Logic giảm gạo mỗi ngày
      const newState = { ...state, gao: state.gao - 1.5 };

      // Điều hướng theo ngày
      if (newState.ngay === 1) goTo("Ngay1Sang");
      else if (newState.ngay === 2) goTo("Ngay2Sang");
      else if (newState.ngay === 3) goTo("Ngay3Sang");
      else if (newState.ngay > 3) goTo("KetThuc_TongKet");

      return newState;
    },
  },

  // --- NGÀY 1 ---
  Ngay1Sang: {
    id: "Ngay1Sang",
    tag: "khu-tap-the",
    imageUrl: "/game/assets/img/loaphuong.jpg",
    sound: {
      url: sounds.tieng_loa_phuong,
      volume: 0.5,
    },
    text: (state) => `
      <h1>Ngày 1</h1>
      <p>Trời vừa hửng sáng ngày 1. Tiếng loa phường rè rè, phá tan sự tĩnh lặng của khu tập thể.</p>
      <p>Người Vợ lay Chồng dậy: "Hôm nay mậu dịch có thịt! Một người phải đi xếp hàng ngay, một người ở nhà lo cho con."</p>
      <p>Gia đình bạn có ${state.tem_thit} tem phiếu thịt và ${state.luong} đồng. Ai sẽ đi?</p>
    `,
    choices: () => [
      { text: "Người Chồng đi xếp hàng", nextId: "Ngay1DiCho" },
      { text: "Người Vợ đi xếp hàng", nextId: "Ngay1DiCho" },
    ],
  },
  Ngay1DiCho: {
    id: "Ngay1DiCho",
    tag: "cho",
    sound: {
      url: sounds.cho,
    },
    text: () => `
      <h1>Ngày 1</h1>
      <p>6 giờ sáng, dòng người đã dài dằng dặc. Bạn là người thứ 81. Bạn kiên nhẫn chờ...</p>
      <p>...<br/>...<br/>10 giờ trưa. Cuối cùng cũng đến lượt.</p>
      <p>Cô mậu dịch viên gắt gỏng: "Mua gì?"</p>
    `,
    choices: (state) => [
      {
        text: `Sử dụng tem phiếu (Còn ${state.tem_thit} tem)`,
        nextId: "MuaThitTemPhieu",
        condition: () => state.tem_thit > 0, // Chỉ hiện nếu còn tem
      },
      {
        text: `Hỏi mua "thịt ngoài" (Chợ đen)`,
        nextId: "MuaThitChoDen",
        condition: () => state.luong >= 20, // Chỉ hiện nếu đủ tiền
      },
      {
        text: "Bỏ về, không mua nữa",
        nextId: "Ngay1Chieu",
      },
    ],
  },
  MuaThitTemPhieu: {
    id: "MuaThitTemPhieu",
    tag: "cho",
    imageUrl: "/game/assets/img/temthit.jpg",
    sound: {
      url: sounds.cho,
    },
    text: () => `
      <h1>Ngày 1</h1>
      <p>"0.5kg thịt, tiêu chuẩn tháng này." - Bạn chìa tem phiếu ra. Cô mậu dịch viên đóng dấu "CỘP", xé cái tem.</p>
      <p>Bạn có 0.5kg thịt, nhưng hết tem.</p>
    `,
    choices: () => [
      {
        text: "Vui vẻ đi về",
        nextId: "Ngay1Chieu",
        onChoose: (state) => ({
          ...state,
          tem_thit: 0,
          thit: state.thit + 0.5,
          luong: state.luong - 2,
        }),
      },
    ],
  },
  MuaThitChoDen: {
    id: "MuaThitChoDen",
    tag: "cho-den-thit",
    sound: {
      url: sounds.cho,
    },
    text: () => `
      <h1>Ngày 1</h1>
      <p>Bạn rỉ tai: "Chị có... "hàng ngoài" không? Em mua giá cao."</p>
      <p>Cô mậu dịch viên liếc xéo: "20 đồng, 0.5kg ba chỉ. Tem phiếu còn nguyên."</p>
      <p>Bạn mất một khoản tiền lớn, nhưng mua được thịt và giữ được tem phiếu.</p>
    `,
    choices: () => [
      {
        text: "Lén lút đi về",
        nextId: "Ngay1Chieu",
        onChoose: (state) => ({
          ...state,
          luong: state.luong - 20,
          thit: state.thit + 0.5,
        }),
      },
    ],
  },
  Ngay1Chieu: {
    id: "Ngay1Chieu",
    tag: "co-quan",
    text: (state) => `
      <h1>Ngày 1</h1>
      <p>Buổi chiều, người không đi chợ đến cơ quan làm việc.</p>
      <p>Đồng nghiệp rủ: "Này, có mấy cái săm lốp xe đạp "tuồn" ra ngoài. Mua một cái không? 10 đồng, rẻ bằng nửa chợ đen. Để dành sau này xe hỏng còn có cái thay."</p>
      <p>Lương bạn còn ${state.luong} đồng.</p>
    `,
    choices: (state) => [
      {
        text: "Mua một cái săm dự trữ",
        nextId: "MuaSamXe",
        condition: () => state.luong >= 10,
      },
      { text: "Từ chối, tập trung làm việc", nextId: "TuChoiSamXe" },
    ],
  },
  MuaSamXe: {
    id: "MuaSamXe",
    tag: "co-quan",
    text: () =>
      `<h1>Ngày 1</h1><p>Bạn giấu cái săm xe vào túi. "Của phi pháp, nhưng có còn hơn không."</p>`,
    choices: () => [
      {
        text: "Đi về nhà",
        nextId: "Ngay1Toi",
        onChoose: (state) => ({
          ...state,
          luong: state.luong - 10,
          co_sam_xe: true,
        }),
      },
    ],
  },
  TuChoiSamXe: {
    id: "TuChoiSamXe",
    tag: "co-quan",
    text: () =>
      `<h1>Ngày 1</h1><p>"Thôi, tôi không có tiền." Bạn tập trung làm việc. Cuối giờ, tổ trưởng khen bạn làm việc chăm chỉ.</p>`,
    choices: () => [
      {
        text: "Đi về nhà",
        nextId: "Ngay1Toi",
        onChoose: (state) => ({ ...state, co_sam_xe: false }),
      },
    ],
  },
  Ngay1Toi: {
    id: "Ngay1Toi",
    tag: "buoi-toi-1",
    sound: {
      url: sounds.toi,
    },
    text: (state) => `
      <h1>Ngày 1</h1>
      <p>Buổi tối. Cả nhà quây quần.</p>
      <p>${
        state.thit > 0
          ? 'Đĩa thịt rang cháy cạnh thơm lừng. Đứa con reo lên: "Thích quá, hôm nay có thịt!"'
          : 'Bữa cơm chỉ có rau muống luộc. Đứa con mếu máo: "Lại ăn rau..."'
      }</p>
      <p>Đang ăn, bác Toàn hàng xóm gõ cửa, vẻ mặt khó xử: "Nhà tôi lỡ bữa, hết gạo. Anh chị cho tôi vay 1kg được không?"</p>
      <p>(Tình cảm hàng xóm: ${state.tinh_cam_hang_xom})</p>
    `,
    choices: () => [
      { text: "Cho vay (Dù nhà cũng không dư dả)", nextId: "ChoVayGao" },
      { text: "Từ chối khéo", nextId: "TuChoiVayGao" },
    ],
    // Logic (if: $thit > 0) được xử lý ngay khi load passage
    onLoad: (state) => {
      if (state.thit > 0) {
        return {
          ...state,
          thit: state.thit - 0.2,
          suc_khoe_con: state.suc_khoe_con + 5,
        };
      }
      return {
        ...state,
        suc_khoe_con: state.suc_khoe_con - 5,
        gao: state.gao - 1,
      };
    },
  },
  ChoVayGao: {
    id: "ChoVayGao",
    tag: "buoi-toi-1",
    sound: {
      url: sounds.toi,
    },
    text: () =>
      `<h1>Ngày 1</h1><p>"Bác cứ cầm lấy." - Bạn đong 1kg gạo đưa cho bác.</p><p>"Cảm ơn gia đình, tôi mang ơn anh chị." - Bác Toàn cảm kích.</p>`,
    choices: () => [{ text: "Qua ngày mới", nextId: "Ngay1KetThuc" }],
    onLoad: (state) => ({
      ...state,
      gao: state.gao - 1,
      tinh_cam_hang_xom: state.tinh_cam_hang_xom + 3,
    }),
  },
  TuChoiVayGao: {
    id: "TuChoiVayGao",
    tag: "buoi-toi-1",
    sound: {
      url: sounds.toi,
    },
    text: () =>
      `<h1>Ngày 1</h1><p>"Nhà em cũng eo hẹp lắm bác ạ, con đang tuổi ăn..."</p><p>Bác Toàn thở dài, lủi thủi đi về.</p>`,
    choices: () => [{ text: "Qua ngày mới", nextId: "Ngay1KetThuc" }],
    onLoad: (state) => ({
      ...state,
      tinh_cam_hang_xom: state.tinh_cam_hang_xom - 2,
    }),
  },
  Ngay1KetThuc: {
    id: "Ngay1KetThuc",
    tag: "buoi-toi-1",
    sound: {
      url: sounds.toi,
    },
    text: (state) => `
      <h1>Ngày 1</h1>
      <p>Kết thúc ngày 1.</p>
      <p>Tài sản: ${state.gao.toFixed(1)} kg gạo, ${state.thit.toFixed(
      1
    )} kg thịt, ${state.luong} đồng.</p>
    `,
    choices: () => [{ text: "Bắt đầu ngày 2", nextId: "SangNgayMoi" }],
    onLoad: (state) => ({ ...state, ngay: state.ngay + 1 }),
  },

  // --- NGÀY 2 ---
  Ngay2Sang: {
    id: "Ngay2Sang",
    tag: "con-benh",
    text: () => `
      <h1>Ngày 2</h1>
      <p>Sáng ngày 2. Nửa đêm đứa con bỗng sốt cao. Nó ho khan, mệt lả.</p>
      <p>"Phải làm sao đây? Đi trạm xá, hay ra chợ đen mua thuốc?"</p>
    `,
    choices: (state) => [
      {
        text: "Đưa con đi trạm xá (Miễn phí, nhưng có thể không có thuốc)",
        nextId: "DiTramXa",
      },
      {
        text: "Ra chợ đen mua thuốc Tây (Tốn 15 đồng)",
        nextId: "MuaThuocChoDen",
        condition: () => state.luong >= 15,
      },
      {
        text: "Dùng bài thuốc dân gian (Lá nhọ nồi, đánh gió)",
        nextId: "ThuocDanGian",
      },
    ],
    onLoad: (state) => ({ ...state, suc_khoe_con: 60 }),
  },
  DiTramXa: {
    id: "DiTramXa",
    tag: "tram-xa",
    text: () =>
      `<h1>Ngày 2</h1><p>Bạn bế con đến trạm xá. Y tá nói chỉ còn thuốc cảm Xuyên Hương. "Uống tạm cái này xem sao."</p><p>Sức khỏe con không cải thiện nhiều, nhưng cũng không tệ đi.</p>`,
    choices: () => [{ text: "Về nhà lo bữa trưa", nextId: "Ngay2Chieu" }],
    onLoad: (state) => ({ ...state, suc_khoe_con: state.suc_khoe_con + 5 }),
  },
  MuaThuocChoDen: {
    id: "MuaThuocChoDen",
    tag: "cho-den",
    sound: {
      url: sounds.cho,
    },
    text: () =>
      `<h1>Ngày 2</h1><p>Bạn chạy ra chợ đen, nghiến răng mua vỉ thuốc Tetracyclin.</p><p>Con uống thuốc, hạ sốt, nhưng bạn mất một khoản tiền lớn.</p>`,
    choices: () => [{ text: "Về nhà lo bữa trưa", nextId: "Ngay2Chieu" }],
    onLoad: (state) => ({
      ...state,
      luong: state.luong - 15,
      suc_khoe_con: state.suc_khoe_con + 30,
    }),
  },
  ThuocDanGian: {
    id: "ThuocDanGian",
    tag: "con-benh",
    text: () =>
      `<h1>Ngày 2</h1><p>Bạn hái lá, đánh gió cho con. Đứa trẻ khóc thét lên. Sốt không giảm.</p><p>Bạn lo lắng không yên.</p>`,
    choices: () => [{ text: "Về nhà lo bữa trưa", nextId: "Ngay2Chieu" }],
    onLoad: (state) => ({ ...state, suc_khoe_con: state.suc_khoe_con - 30 }),
  },
  Ngay2Chieu: {
    id: "Ngay2Chieu",
    tag: "vai",
    text: (state) => `
      <h1>Ngày 2</h1>
      <p>Buổi chiều. Loa phường thông báo mậu dịch có VẢI HOA.</p>
      <p>Bạn còn ${state.tem_vai} tem phiếu vải. Đứa con rất cần áo mới. Nhưng con bạn đang ốm.</p>
    `,
    choices: (state) => [
      {
        text: "Vẫn đi xếp hàng mua vải",
        nextId: "MuaVai",
        condition: () => state.tem_vai > 0,
      },
      { text: "Ở nhà chăm con", nextId: "ONhaChamCon" },
    ],
  },
  MuaVai: {
    id: "MuaVai",
    tag: "vai",
    text: () =>
      `<h1>Ngày 2</h1><p>Bạn gửi con cho hàng xóm, vội vã đi xếp hàng. May mắn, hàng không quá đông.</p><p>Bạn mua được 2 mét vải hoa, nhưng lúc về nhà, đứa con khóc ngằn ngặt.</p>`,
    choices: () => [{ text: "Về nhà", nextId: "Ngay2Toi" }],
    onLoad: (state) => ({
      ...state,
      tem_vai: 0,
      luong: state.luong - 5,
      suc_khoe_con: state.suc_khoe_con - 30,
    }),
  },
  ONhaChamCon: {
    id: "ONhaChamCon",
    tag: "con-khoe",
    text: () =>
      `<h1>Ngày 2</h1><p>"Thôi, áo quần tính sau, con cái quan trọng hơn."</p><p>Bạn ở nhà, lau người, dỗ dành con. Đứa trẻ có vẻ dễ chịu hơn.</p><p>Bạn bỏ lỡ đợt vải, nhưng con bạn khỏe hơn.</p>`,
    choices: () => [{ text: "Về nhà", nextId: "Ngay2Toi" }],
    onLoad: (state) => ({ ...state, suc_khoe_con: state.suc_khoe_con + 10 }),
  },
  Ngay2Toi: {
    id: "Ngay2Toi",
    tag: "con-khoe",
    sound: {
      url: sounds.toi,
    },
    text: (state) => `
      <h1>Ngày 2</h1>
      <p>Bữa tối ngày 2.</p>
      <p>${
        state.suc_khoe_con < 60
          ? "Đứa con vẫn mệt, chỉ húp chút cháo."
          : "Con đã đỡ hơn, ăn được nửa bát cơm."
      }</p>
      <p>${
        state.thit > 0 ? "Cả nhà ăn nốt chỗ thịt rang." : "Cơm chan nước rau."
      }</p>
      <p>Bạn thấy mảnh đất trống sau khu tập thể. "Hay mình tăng gia, cuốc đất trồng thêm mớ rau?"</p>
    `,
    choices: () => [
      {
        text: "Cuốc đất trồng rau (Tốn sức, nhưng có rau sau này)",
        nextId: "TangGia",
      },
      { text: "Nghỉ ngơi, giữ sức", nextId: "NghiNgoi" },
    ],
    onLoad: (state) => ({ ...state, thit: 0 }), // Ăn hết thịt
  },
  TangGia: {
    id: "TangGia",
    tag: "vuon-rau",
    sound: {
      url: sounds.toi,
    },
    text: () =>
      `<h1>Ngày 2</h1><p>Bạn cặm cụi cuốc đất dưới ánh trăng mờ.</p><p>"Hi vọng mớ rau mầm này sớm mọc."</p>`,
    choices: () => [{ text: "Qua ngày mới", nextId: "Ngay2KetThuc" }],
    onLoad: (state) => ({ ...state, tang_gia: true }),
  },
  NghiNgoi: {
    id: "NghiNgoi",
    tag: "buoi-toi-2",
    sound: {
      url: sounds.toi,
    },
    text: () =>
      `<h1>Ngày 2</h1><p>Bạn quá mệt mỏi sau một ngày. Bạn quyết định đi ngủ sớm.</p>`,
    choices: () => [{ text: "Qua ngày mới", nextId: "Ngay2KetThuc" }],
    onLoad: (state) => ({ ...state, tang_gia: false }),
  },
  Ngay2KetThuc: {
    id: "Ngay2KetThuc",
    tag: "buoi-toi-2",
    sound: {
      url: sounds.toi,
    },
    text: (state) => `
      <h1>Ngày 2</h1>
      <p>Kết thúc ngày 2.</p>
      <p>Tài sản: ${state.gao.toFixed(1)} kg gạo, ${
      state.luong
    } đồng. Sức khỏe con: ${state.suc_khoe_con}.</p>
    `,
    choices: () => [{ text: "Bắt đầu ngày 3", nextId: "SangNgayMoi" }],
    onLoad: (state) => ({ ...state, ngay: state.ngay + 1 }),
  },

  // --- NGÀY 3 ---
  Ngay3Sang: {
    id: "Ngay3Sang",
    tag: "thung-lop",
    text: () => `
      <h1>Ngày 3</h1>
      <p>Sáng ngày 3. Người đi làm dắt xe đạp ra cửa thì "XẸP"! Xe thủng lốp.</p>
      <p>Không có xe, không thể đến cơ quan.</p>
    `,
    choices: (state) => [
      {
        text: "Tự thay săm (Mất thời gian, nhưng không tốn tiền)",
        nextId: "TuThaySam",
        condition: () => state.co_sam_xe === true,
      },
      {
        text: "Dắt xe đi bộ 5km đến chỗ sửa (Mất 8 đồng)",
        nextId: "SuaXe",
        condition: () => state.co_sam_xe === false && state.luong >= 8,
      },
      {
        text: "Hỏi mượn bơm của bác Toàn",
        nextId: "MuonBombaToan",
        condition: () => state.co_sam_xe === false,
      },
    ],
  },
  TuThaySam: {
    id: "TuThaySam",
    tag: "thung-lop",
    text: () =>
      `<h1>Ngày 3</h1><p>Bạn lúi húi tự vá xe. Mất cả buổi sáng, nhưng xong.</p><p>Bạn vẫn đi làm được, dù hơi muộn.</p>`,
    choices: () => [{ text: "Đến cơ quan", nextId: "Ngay3Chieu" }],
    onLoad: (state) => ({ ...state, co_sam_xe: false }),
  },
  SuaXe: {
    id: "SuaXe",
    tag: "thung-lop",
    text: () =>
      `<h1>Ngày 3</h1><p>Bạn dắt bộ cái xe đi sửa. Tốn 8 đồng.</p><p>Bạn đến cơ quan muộn, bị tổ trưởng phê bình.</p>`,
    choices: () => [{ text: "Đến cơ quan", nextId: "Ngay3Chieu" }],
    onLoad: (state) => ({ ...state, luong: state.luong - 8 }),
  },
  MuonBombaToan: {
    id: "MuonBombaToan",
    tag: "thung-lop",
    text: (state) => `
      <h1>Ngày 3</h1>
      <p>Bạn chạy sang gõ cửa nhà bác Toàn.</p>
      ${
        state.tinh_cam_hang_xom > 3
          ? `<p>"Ôi may quá bác có cái bơm! Cháu cảm ơn bác." Bác Toàn vui vẻ: "Việc gì đâu, hôm nọ bác còn vay gạo nhà cháu."</p><p>Bạn bơm xe và đi làm bình thường.</p>`
          : `<p>"Bơm nhà tôi hỏng rồi." - bác Toàn nói vọng ra, không mở cửa.</p><p>Bạn đành dắt bộ đi sửa. Tốn 8 đồng. Bạn đến cơ quan muộn và bị phê bình.</p>`
      }
    `,
    choices: () => [{ text: "Đến cơ quan", nextId: "Ngay3Chieu" }],
    onLoad: (state) => {
      if (state.tinh_cam_hang_xom > 3) {
        return state; // Không tốn tiền
      }
      return { ...state, luong: state.luong - 8 }; // Tốn tiền sửa xe
    },
  },
  Ngay3Chieu: {
    id: "Ngay3Chieu",
    tag: "chieu-3",
    text: () => `
      <h1>Ngày 3</h1>
      <p>Buổi chiều. Bạn vừa đi làm về thì bất ngờ có người nhà ở quê lên thăm, mang cho buồng chuối và chục trứng gà.</p>
      <p>"Ở quê cũng đói, nhưng có gì mang lên cho các cháu."</p>
      <p>Bạn phải giữ khách ở lại ăn cơm tối.</p>
    `,
    choices: () => [{ text: "Vui vẻ nhận quà", nextId: "Ngay3Toi" }],
    onLoad: (state) => ({
      ...state,
      gao: state.gao + 3, // Giả định trứng/chuối giúp "độn" cơm, tiết kiệm gạo
      thit: state.thit + 0.5, // Trứng coi như thịt
    }),
  },
  Ngay3Toi: {
    id: "Ngay3Toi",
    tag: "buoi-toi-3",
    sound: {
      url: sounds.toi,
    },
    text: (state) => `
      <h1>Ngày 3</h1>
      <p>Bữa tối cuối cùng. Nhờ có quà ở quê, bữa cơm thịnh soạn hơn hẳn.</p>
      <p>${
        state.thit > 0
          ? "Bạn làm món trứng đúc thịt."
          : "Bạn luộc trứng, rang cơm."
      }</p>
      ${
        state.tang_gia ? '<p>Thêm đĩa rau lang non từ vườn "tăng gia".</p>' : ""
      }
      <p>Cả nhà và khách ăn uống vui vẻ. Đêm xuống. Khách đã ngủ. Bạn nhìn lại 3 ngày qua...</p>
    `,
    choices: () => [{ text: "Xem kết quả", nextId: "KetThuc_TongKet" }],
    onLoad: (state) => ({
      ...state,
      thit: 0,
      rau: state.tang_gia ? state.rau + 1 : state.rau,
      gao: state.gao - 0.5,
      ngay: state.ngay + 1, // Chuyển sang ngày 4 để kích hoạt kết thúc
    }),
  },

  // --- KẾT THÚC ---
  KetThuc_TongKet: {
    id: "KetThuc_TongKet",
    tag: "tong-ket",
    text: (state) => {
      let ketluan = "";
      if (state.gao >= 2 && state.luong > 10 && state.suc_khoe_con > 90) {
        ketluan =
          'Bạn đúng là một người "biết lo". Gia đình bạn không chỉ sống sót mà còn sống rất tốt!';
      } else if (state.gao > 1 && state.luong > 5) {
        ketluan =
          "Bạn đã xoay xở rất khéo léo. Gia đình đã vượt qua khó khăn một cách an toàn.";
      } else {
        ketluan =
          "Thật vất vả. Bạn đã phải đánh đổi rất nhiều (tiền bạc, sức khỏe) để lo cho gia đình. Cuộc sống vẫn còn nhiều khó khăn phía trước.";
      }
      return `
        <h1>Kết thúc</h1>
        <p>Bạn đã sống sót qua 3 ngày thời bao cấp. Hãy nhìn lại thành quả "xoay xở" của gia đình:</p>
        <ul>
          <li>Gạo còn: ${state.gao.toFixed(1)} kg</li>
          <li>Tiền lương còn: ${state.luong} đồng</li>
          <li>Sức khỏe con: ${state.suc_khoe_con} %</li>
          <li>Tình cảm hàng xóm: ${state.tinh_cam_hang_xom} điểm</li>
        </ul>
        <p><strong>${ketluan}</strong></p>
      `;
    },
    choices: () => [{ text: "Chơi lại từ đầu", nextId: "GioiThieu" }],
    // Khi chơi lại, chúng ta sẽ reset state
    onLoad: (state) => {
      // Logic kết thúc đã nằm trong text, không cần làm gì thêm ở đây
      return state;
    },
  },
  Game_Over_HetGao: {
    id: "Game_Over_HetGao",
    tag: "khu-tap-the",
    text: (state) => `
      <h1>Hết Gạo</h1>
      <p>Ngày ${state.ngay}... Bạn mở thùng gạo. Trống rỗng.</p>
      <p>Đứa con khóc: "Mẹ ơi, con đói..."</p>
      <p>Bạn đã không thể xoay xở đủ.</p>
    `,
    choices: () => [{ text: "Chơi lại", nextId: "GioiThieu" }],
  },
  Game_Over_ConOm: {
    id: "Game_Over_ConOm",
    tag: "con-benh",
    text: (state) => `
      <h1>Con Ốm Nặng</h1>
      <p>Ngày ${state.ngay}... Đứa con lên cơn sốt nặng. Bạn đã không thể chăm lo đủ cho con.</p>
      <p>Đây là điều hối tiếc lớn nhất của bạn.</p>
    `,
    choices: () => [{ text: "Chơi lại", nextId: "GioiThieu" }],
  },
};
