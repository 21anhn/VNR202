// src/pages/StoryGamePage.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { gameData, initialState } from "../game/gameData";
import type { GameState, GameChoice } from "../game/types";
import { useTypewriter } from "../hooks/useTypewriter"; // <-- 1. Import hook

// ... (backgroundMap giữ nguyên)
const backgroundMap: Record<string, string> = {
  "gioi-thieu": "/game/assets/img/khutapthe.webp",
  "khu-tap-the": "/game/assets/img/khutapthe.webp",
  cho: "/game/assets/img/cho.jpg",
  "cho-den-thit": "/game/assets/img/chodenthit.jpg",
  "co-quan": "/game/assets/img/giaolo.jpg",
  "buoi-toi-1": "/game/assets/img/buoitoi1.jpg",
  "con-benh": "/game/assets/img/conbenh.jpg",
  "tram-xa": "/game/assets/img/tramxa.jpg",
  "cho-den": "/game/assets/img/bachhoa.jpg",
  "con-khoe": "/game/assets/img/conkhoe.jpg",
  vai: "/game/assets/img/tiemvai.webp",
  "vuon-rau": "/game/assets/img/vuonrau.jpg",
  "buoi-toi-2": "/game/assets/img/buoitoi2.jpg",
  "thung-lop": "/game/assets/img/thunglop.jpg",
  "chieu-3": "/game/assets/img/chieu3.jpg",
  "buoi-toi-3": "/game/assets/img/buoitoi3.jpg",
  "tong-ket": "/game/assets/img/kethuc.jpg",
};

const StoryGamePage: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentPassageId, setCurrentPassageId] = useState<string>("GioiThieu");

  const sfxRef = useRef<HTMLAudioElement | null>(null);

  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const passage = gameData[currentPassageId];

  // ... (hàm goTo giữ nguyên)
  const goTo = (passageId: string) => {
    if (gameData[passageId]) {
      setCurrentPassageId(passageId);
    }
  };

  // ... (useEffect xử lý onLoad giữ nguyên)
  useEffect(() => {
    const currentPassage = gameData[currentPassageId];
    if (currentPassage?.onLoad) {
      if (
        currentPassage.id === "GioiThieu" &&
        gameState.ngay !== initialState.ngay
      ) {
        setGameState(initialState);
      } else {
        const newState = currentPassage.onLoad(gameState, goTo);
        setGameState(newState);
      }
    }
  }, [currentPassageId]);

useEffect(() => {
    if (!bgmRef.current && passage.id === "Ngay1DiCho") {
      
      console.log("Bắt đầu phát nhạc nền (BGM)..."); 
      const bgmUrl = "/game/assets/audio/nhacnen.mp3";
      const audio = new Audio(bgmUrl);

      audio.loop = true; // <-- Tự động lặp lại
      audio.volume = 0.15; // <-- Âm lượng nhỏ

      audio.play().catch((e) => console.error("BGM playback failed:", e));

      bgmRef.current = audio;
    }

    if (passage.id === "GioiThieu" && bgmRef.current) {
      console.log("Dừng nhạc nền khi chơi lại...");
      bgmRef.current.pause();
      bgmRef.current = null;
    }

  }, [passage]);

 useEffect(() => {
    // THAY ĐỔI 1: Lấy cả object 'sound'
    const newSound = passage?.sound;
    
    // Lấy URL của âm thanh đang phát (nếu có)
    const currentSoundUrl = sfxRef.current ? sfxRef.current.src : null;

    // THAY ĐỔI 2: Kiểm tra 'newSound.url'
    // Nếu có âm thanh mới VÀ url của nó khác âm thanh cũ
    if (newSound && newSound.url !== currentSoundUrl) {
      // Dừng âm thanh cũ (nếu có)
      if (sfxRef.current) {
        sfxRef.current.pause();
      }

      // THAY ĐỔI 3: Dùng 'newSound.url'
      const audio = new Audio(newSound.url);
      audio.loop = true; 

      // THAY ĐỔI 4: Dùng 'newSound.volume' (hoặc 1.0 nếu không set)
      // (Toán tử '??' nghĩa là: nếu newSound.volume là null/undefined, dùng 1.0)
      audio.volume = newSound.volume ?? 1.0;

      audio.play().catch((e) => console.error("SFX playback failed:", e));

      sfxRef.current = audio;

    // THAY ĐỔI 5: Kiểm tra 'newSound'
    } else if (!newSound && sfxRef.current) {
      // Nếu passage mới KHÔNG có 'sound', dừng âm thanh cũ
      sfxRef.current.pause();
      sfxRef.current = null;
    }
  }, [passage]);
  
  const handleSelectChoice = (choice: GameChoice) => {
    if (choice.onChoose) {
      setGameState(choice.onChoose(gameState));
    }
    goTo(choice.nextId);
  };

  const backgroundUrl = backgroundMap[passage.tag] || "";

  // 2. Lấy passageText gốc
  const passageText = useMemo(
    () => passage.text(gameState),
    [passage, gameState]
  );

  // 3. Sử dụng useTypewriter
  const { displayedHtml, isTyping, skip } = useTypewriter(passageText, 30); // 30ms

  const availableChoices = useMemo(
    () =>
      passage
        .choices(gameState)
        .filter((c) => (c.condition ? c.condition(gameState) : true)),
    [passage, gameState]
  );

  return (
    <div
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-all duration-500"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* 4. THÊM NÚT SKIP */}
      {isTyping && (
        <button
          onClick={skip}
          className="absolute top-28 right-4 z-30 bg-black/90 text-white px-3 py-1 rounded-md text-sm backdrop-blur-sm hover:bg-black/30 transition"
        >
          Bỏ qua (Skip) »
        </button>
      )}

      <div className="relative z-20 w-full max-w-2xl bg-black/75 text-gray-200 p-8 rounded-lg shadow-xl font-['Special_Elite',_monospace]">
        {passage.imageUrl && (
          <img
            src={passage.imageUrl}
            alt={passage.id}
            className="w-1/2 max-w-xs mx-auto rounded-lg mb-4 border-2 border-gray-600"
          />
        )}

        {/* 5. SỬ DỤNG DISPLAYEDHTML */}
        <div
  className="story-text font-['Special_Elite'] text-[1px] md:text-[22px] text-white leading-relaxed tracking-wide"
          dangerouslySetInnerHTML={{ __html: displayedHtml }}
        />

        {/* 6. ẨN LỰA CHỌN KHI ĐANG GÕ CHỮ */}
        {!isTyping && (
          <div className="mt-6 pt-6 border-t-2 border-gray-500/50 flex flex-col gap-3">
            {availableChoices.map((choice) => (
              <button
                key={choice.text}
                onClick={() => handleSelectChoice(choice)}
                className="block w-full text-left p-3 text-lg text-yellow-400 font-['Anton',_sans-serif] uppercase tracking-wider
                           transition-all duration-200 hover:bg-white/30 hover:text-white rounded"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryGamePage;
