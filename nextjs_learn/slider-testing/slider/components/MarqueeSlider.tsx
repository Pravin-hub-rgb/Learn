'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Marquee from 'react-fast-marquee'
import { cardData } from '../src/components/sliders/cardData'
import styles from '../src/components/sliders/SliderShared.module.css'

export default function MarqueeSlider() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Touch tracking refs (plain refs, no re-renders needed)
  const lastTouchXRef = useRef(0)
  const velocityRef = useRef(0)
  const lastTimestampRef = useRef(0)
  const momentumRafRef = useRef<number | null>(null)
  const innerContainerRef = useRef<HTMLElement | null>(null)

  // Helper: get the rfm inner scroll container
  const getInner = useCallback((): HTMLElement | null => {
    if (innerContainerRef.current) return innerContainerRef.current
    const el = containerRef.current?.querySelector('.rfm-marquee-container') as HTMLElement | null
    if (el) innerContainerRef.current = el
    return el
  }, [])

  // Stop any ongoing momentum animation
  const stopMomentum = useCallback(() => {
    if (momentumRafRef.current !== null) {
      cancelAnimationFrame(momentumRafRef.current)
      momentumRafRef.current = null
    }
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    stopMomentum()
    setIsPlaying(false)
    setIsDragging(true)

    lastTouchXRef.current = e.touches[0].clientX
    velocityRef.current = 0
    lastTimestampRef.current = performance.now()
  }, [stopMomentum])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const inner = getInner()
    if (!inner) return

    const touch = e.touches[0]
    const now = performance.now()
    const deltaX = touch.clientX - lastTouchXRef.current
    const deltaT = now - lastTimestampRef.current

    // Scroll the inner marquee container directly — both directions
    inner.scrollLeft -= deltaX

    // Track velocity (px/ms), weighted toward recent movement
    if (deltaT > 0) {
      const instantVelocity = deltaX / deltaT
      velocityRef.current = velocityRef.current * 0.6 + instantVelocity * 0.4
    }

    lastTouchXRef.current = touch.clientX
    lastTimestampRef.current = now
  }, [getInner])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)

    const inner = getInner()
    if (!inner) {
      setIsPlaying(true)
      return
    }

    const initialVelocity = velocityRef.current // px/ms, positive = dragged right

    // If basically no velocity, just resume
    if (Math.abs(initialVelocity) < 0.05) {
      setIsPlaying(true)
      return
    }

    // Momentum phase: coast and decelerate, then resume auto-scroll
    let velocity = initialVelocity
    const friction = 0.92 // lower = stops faster

    const animate = () => {
      velocity *= friction

      // Apply momentum scroll (opposite direction: drag right = scroll left)
      inner.scrollLeft -= velocity * 16 // ~16ms per frame

      if (Math.abs(velocity) < 0.05) {
        // Momentum done, resume marquee
        momentumRafRef.current = null
        setIsPlaying(true)
        return
      }

      momentumRafRef.current = requestAnimationFrame(animate)
    }

    momentumRafRef.current = requestAnimationFrame(animate)
  }, [getInner])

  // Cleanup on unmount
  useEffect(() => {
    return () => stopMomentum()
  }, [stopMomentum])

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
          cursor: isDragging ? 'grabbing' : 'grab',
          // Prevent browser's native horizontal scroll from interfering
          touchAction: 'pan-y',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <Marquee
          speed={35}
          pauseOnHover={true}
          pauseOnClick={false}
          gradient={false}
          direction="left"
          play={isPlaying}
          className="flex items-center"
        >
          {cardData.map((card) => (
            <div
              key={card.id}
              className="mx-8"
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

      <div className="mt-4 text-center text-sm text-gray-600">
        {isDragging
          ? "👆 Dragging... Release to resume auto-scroll"
          : "👆 Touch and drag to scroll. Auto-scroll resumes when you release."
        }
      </div>
    </div>
  )
}