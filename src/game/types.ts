// src/game/types.ts

// 1. Định nghĩa State của game (các biến $ trong Twine)
export interface GameState {
  ngay: number;
  gao: number;
  thit: number;
  rau: number;
  luong: number;
  tem_thit: number;
  tem_vai: number;
  suc_khoe_con: number;
  tinh_cam_hang_xom: number;
  co_sam_xe: boolean;
  tang_gia: boolean;
}

// 2. Định nghĩa một Lựa chọn (Choice)
export interface GameChoice {
  text: string;
  nextId: string;
  // Hàm này sẽ được gọi khi chọn, để cập nhật state (thay cho (set: ...))
  onChoose?: (state: GameState) => GameState;
  // Điều kiện để hiển thị lựa chọn này (thay cho (if: ...))
  condition?: (state: GameState) => boolean;
}

// 3. Định nghĩa một Màn chơi (Passage)
export interface GamePassage {
  id: string;
  // Tag này dùng để đổi hình nền
  tag: string;
  // Nội dung văn bản (có thể là hàm để hiển thị nội dung động)
  text: (state: GameState) => string;
  // Các lựa chọn
  choices: (state: GameState) => GameChoice[];
  // Hàm này tự động chạy khi vào passage (thay cho (goto:), (if:...) ở đầu passage)
  onLoad?: (
    state: GameState,
    // Hàm này dùng để điều hướng
    goTo: (passageId: string) => void
  ) => GameState;
  // Hình ảnh nội dung (nếu có)
  imageUrl?: string;
  sound?: {
    url: string;
    volume?: number; 
  };
}

// 4. Định nghĩa toàn bộ dữ liệu game
export type GameData = Record<string, GamePassage>;
