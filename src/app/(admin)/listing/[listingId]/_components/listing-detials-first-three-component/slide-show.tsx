"use client"; // If using Next.js App Router
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Slideshow({
  data,
  dressName,
}: {
  data: string[];
  dressName: string;
}) {
  const images = data.length
    ? data
    : [
        "https://files.edgestore.dev/vkpagg64z2y0yvdx/publicFiles/_public/4420c9d1-dd2e-4afa-9b54-8a85d396ecbc.jpeg",
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length); // next image
        setFade(true); // fade in
      }, 1000); // fade duration = 1s
    }, 10000); // 30 seconds per image

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={dressName ?? ""}
          fill
          className={`object-cover rounded-l-[6px] transition-opacity duration-1000 ${
            index === currentIndex && fade ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 300px"
        />
      ))}
    </div>
  );
}
