// src/hooks/useTypewriter.ts
import { useState, useEffect, useMemo, useRef } from "react";

/**
 * Tách HTML thành các token (tag hoặc text).
 */
const tokenizeHtml = (
  html: string
): { type: "tag" | "text"; content: string }[] => {
  if (!html) return [];
  const regex = /(<[^>]+>)/g;
  return html
    .split(regex)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("<") && part.endsWith(">")) {
        return { type: "tag", content: part };
      }
      // Giải mã các ký tự HTML cơ bản (nếu có)
      const decodedText = part
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
      return { type: "text", content: decodedText };
    });
};

/**
 * Hook để tạo hiệu ứng gõ chữ cho nội dung HTML (Không có âm thanh).
 * @param htmlContent Chuỗi HTML đầy đủ cần hiển thị.
 * @param speed Tốc độ gõ chữ (ms).
 */
export const useTypewriter = (htmlContent: string, speed: number = 30) => {
  const [displayedHtml, setDisplayedHtml] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const tokens = useMemo(() => tokenizeHtml(htmlContent), [htmlContent]);

  const totalTextLength = useMemo(
    () =>
      tokens
        .filter((t) => t.type === "text")
        .reduce((acc, t) => acc + t.content.length, 0),
    [tokens]
  );

  // Hàm Skip (chỉ cần dừng interval)
  const skip = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setDisplayedHtml(htmlContent);
    setIsTyping(false);
  };

  useEffect(() => {
    // Dọn dẹp interval cũ
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Reset
    setDisplayedHtml("");
    if (!htmlContent || totalTextLength === 0) {
      setIsTyping(false);
      setDisplayedHtml(htmlContent);
      return;
    }

    setIsTyping(true);
    let currentTextIndex = 0; // Vị trí ký tự tổng (chỉ đếm text)
    let currentHtmlOutput = "";

    intervalRef.current = window.setInterval(() => {
      if (currentTextIndex >= totalTextLength) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsTyping(false);
        setDisplayedHtml(htmlContent); // Đảm bảo cuối cùng hiển thị đúng
        return;
      }

      // Xây dựng lại chuỗi HTML
      currentHtmlOutput = "";
      let textCharsProcessed = 0;

      for (const token of tokens) {
        if (token.type === "tag") {
          currentHtmlOutput += token.content;
        } else {
          // Tính toán số ký tự text cần hiển thị cho token này
          const charsToShow = currentTextIndex + 1 - textCharsProcessed;
          if (charsToShow > 0) {
            const part = token.content.substring(0, charsToShow);
            currentHtmlOutput += part;
            textCharsProcessed += part.length;
          }
        }
        // Dừng sớm nếu đã xử lý đủ ký tự
        if (textCharsProcessed > currentTextIndex) break;
      }

      // Đã loại bỏ playSound()

      setDisplayedHtml(currentHtmlOutput);
      currentTextIndex++;
    }, speed);

    // Cleanup khi component unmount hoặc htmlContent thay đổi
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [htmlContent, speed, totalTextLength, tokens]); // Chạy lại khi text thay đổi

  return { displayedHtml, isTyping, skip };
};
