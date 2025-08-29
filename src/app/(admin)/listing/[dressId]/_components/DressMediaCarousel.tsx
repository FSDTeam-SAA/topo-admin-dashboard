'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
}

export default function DressMediaCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="w-full flex flex-col items-center mt-3">
      <div className="relative w-full max-w-lg h-[400px] rounded-lg overflow-hidden mb-2">
        <Image
          src={images[current]}
          alt={`Dress image ${current + 1}`}
          fill
          className="object-cover rounded-lg"
          priority={current === 0} // preload first image
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx === current ? 'bg-black' : 'bg-gray-300'
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
