import ColorThief from "colorthief";
import { useEffect, useRef, useState } from "react";
const { VITE_API_BASE_URL } = import.meta.env;
const Book = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [bgColor, setBgColor] = useState("transparent");
  const [textColor, setTextColor] = useState("");
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const colorThief = new ColorThief();

    const handleLoad = () => {
      const [r, g, b] = colorThief.getColor(img);
      setBgColor(
        `linear-gradient(135deg, rgba(${r},${g},${b},0.9), rgba(${r},${g},${b},0.4))`,
      );
      // 计算反色
      const oppositeR = 255 - r;
      const oppositeG = 255 - g;
      const oppositeB = 255 - b;
      // 用于文字颜色
      setTextColor(`rgb(${oppositeR},${oppositeG},${oppositeB})`);
    };

    //img.complete 等待图片加载完成
    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
    }

    return () => {
      img.removeEventListener("load", handleLoad);
    };
  }, []);
  return (
    <div
      style={{ background: bgColor, color: textColor }}
      className="flex h-45 w-33 flex-col border border-[#333333]"
    >
      <section className="h-30 w-full">
        <img
          ref={imgRef}
          src={`${VITE_API_BASE_URL}/uploads/1764037520489-370086747-%E5%A4%B4%E5%83%8F.png`}
          alt="book"
          className="h-full w-full object-cover"
          crossOrigin="anonymous"
        />
      </section>
      <section>书名</section>
      <section>操作</section>
    </div>
  );
};

export default Book;
