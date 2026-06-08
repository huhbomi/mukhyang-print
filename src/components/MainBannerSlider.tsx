"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const BANNER_WIDTH = 1900;
const BANNER_HEIGHT = 600;

const BANNERS = [
  {
    src: "/images/banner (1).png",
    alt: "묵향인쇄 배너 1",
    bgColor: "#CFDDEB",
  },
  {
    src: "/images/banner (2).png",
    alt: "묵향인쇄 배너 2",
    bgColor: "#E7E6D8",
  },
  {
    src: "/images/banner (3).png",
    alt: "묵향인쇄 배너 3",
    bgColor: "#E8EBEE",
  },
  {
    src: "/images/banner (4).png",
    alt: "묵향인쇄 배너 4",
    bgColor: "#EDDCC5",
  },
] as const;

const AUTOPLAY_INTERVAL_MS = 4000;

export default function MainBannerSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    const total = BANNERS.length;
    setActiveIndex(((index % total) + total) % total);
  }, []);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BANNERS.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden border-b border-border transition-[background-color] duration-[800ms] ease-in-out"
      style={{
        aspectRatio: `${BANNER_WIDTH} / ${BANNER_HEIGHT}`,
        backgroundColor: BANNERS[activeIndex].bgColor,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {BANNERS.map((banner, index) => (
        <Image
          key={banner.src}
          src={banner.src}
          alt={banner.alt}
          width={BANNER_WIDTH}
          height={BANNER_HEIGHT}
          priority={index === 0}
          sizes="100vw"
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        />
      ))}

      <button
        type="button"
        onClick={goPrev}
        aria-label="이전 배너"
        className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-2xl leading-none text-white transition-colors hover:bg-black/55 md:left-5 md:h-11 md:w-11"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="다음 배너"
        className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-2xl leading-none text-white transition-colors hover:bg-black/55 md:right-5 md:h-11 md:w-11"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-5">
        {BANNERS.map((banner, index) => (
          <button
            key={banner.src}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`${index + 1}번째 배너 보기`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              index === activeIndex ? "bg-white" : "bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
