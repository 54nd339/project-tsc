'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface CarouselItem {
  id: string
  title: string
  imageUrl: string
  description?: string
}

interface CarouselProps {
  title?: string
  items: CarouselItem[]
}

export function Carousel({ title, items }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!items || items.length === 0) {
    return null
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full h-[32rem] overflow-hidden rounded-lg shadow-lg">
      {/* Images */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {item.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <h5 className="text-white text-2xl font-bold">{item.title}</h5>
              {item.description && (
                <p className="text-white/90 mt-2">{item.description}</p>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all shadow-lg"
        aria-label="Previous"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-gray-800" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all shadow-lg"
        aria-label="Next"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-gray-800" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
