"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { cardData } from "../../componets/sliders/cardData";

// import 'swiper/swiper-bundle.min.css';
import styles from "./Slider.module.css";

// Optional: if you want pagination dots later, import & add Pagination module + 'swiper/css/pagination'

export default function Slider() {
  const swiperRef = useRef<unknown>(null);

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24} // gap between cards – adjust to taste
        slidesPerView={1.5} // fallback for tiny screens
        loop={true}
        loopAdditionalSlides={6} // helps with very few slides → more clones for smoother loop
          speed={60000} // total time (ms) to move the full visible width – higher = slower constant speed
        autoplay={{
          delay: 0, // crucial: 0 = no pause between transitions
          disableOnInteraction: false, // resume after swipe/touch
          pauseOnMouseEnter: true, // optional: pause on hover
          reverseDirection: false, // set true if you want right-to-left
        }}
        freeMode={false} // keep false for controlled autoplay
        allowTouchMove={true} // still swipeable on mobile
        grabCursor={true}
        centeredSlides={false}
        breakpoints={{
          480: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 3.5, spaceBetween: 24 },
          1024: { slidesPerView: 4.5, spaceBetween: 32 },
          1280: { slidesPerView: 5.2, spaceBetween: 40 },
        }}
        className={styles.swiper}
      >
        {cardData.map((card) => (
          <SwiperSlide key={card.id} className={styles.slide}>
            <div className={styles.card}>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
