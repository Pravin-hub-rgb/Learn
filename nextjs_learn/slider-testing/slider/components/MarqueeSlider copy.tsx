'use client'

import { useState, useRef, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import { cardData } from '../src/components/sliders/cardData'
import styles from '../src/components/sliders/SliderShared.module.css'

export default function MarqueeSlider() {
  const [isDragging, setIsDragging] = useState(false)
  const [manualOffset, setManualOffset] = useState(0)
  const [baseOffset, setBaseOffset] = useState(0)
  const [touchStartX, setTouchStartX] = useState(0)
  const [lastTouchX, setLastTouchX] = useState(0)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    
    const touch = e.touches[0]
    setTouchStartX(touch.clientX)
    setLastTouchX(touch.clientX)
  }
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !wrapperRef.current) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - lastTouchX
    setLastTouchX(touch.clientX)
    
    // Apply manual scroll offset - drag right = move right
    setManualOffset(prev => prev + deltaX)
  }
  
  const handleTouchEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    
    // Calculate touch velocity for smart resume
    const totalDragDistance = lastTouchX - touchStartX
    
    // Only adjust if touch was intentional (not just tap)
    if (Math.abs(totalDragDistance) > 10) {
      // Update base offset to current position
      setBaseOffset(prev => prev + manualOffset)
      setManualOffset(0)
    } else {
      // Just a tap, reset offset
      setManualOffset(0)
    }
  }

  // Calculate total offset
  const totalOffset = baseOffset + manualOffset

  return (
    <div className="w-full overflow-hidden bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Enhanced Marquee with Touch-Scroll
      </h2>

      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={wrapperRef}
          style={{
            transform: `translateX(${totalOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          <Marquee
            speed={35}
            pauseOnHover={true}
            pauseOnClick={false}
            gradient={false}
            direction="left"
            play={!isDragging}  // Pause marquee when dragging
            className="flex items-center"
          >
            {cardData.map((card) => (
              <div
                key={card.id}
                className="mx-8"  // 32px gap between cards
              >
                <div className={`${styles.card} w-96 h-[570px] cursor-pointer`}>
                  <img
                    src={card.src}
                    alt={card.alt}
                    className={styles.image}
                    draggable={false}
                  />
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardName}>{card.name}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        {isDragging 
          ? "👆 Dragging... Release to resume auto-scroll" 
          : "👆 Touch and drag to scroll manually. Auto-scroll resumes when you release."
        }
      </div>
    </div>
  )
}
