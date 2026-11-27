"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BIKE_FALLBACK_IMAGE } from "@/data/bikes";

interface SafeBikeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export default function SafeBikeImage({
  src,
  alt,
  fill = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  className = "object-contain",
}: SafeBikeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || BIKE_FALLBACK_IMAGE);

  React.useEffect(() => {
    setImgSrc(src || BIKE_FALLBACK_IMAGE);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      unoptimized
      className={className}
      onError={() => {
        if (imgSrc !== BIKE_FALLBACK_IMAGE) {
          setImgSrc(BIKE_FALLBACK_IMAGE);
        }
      }}
    />
  );
}
