import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "./Carousel.module.css";

export interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  spaceBetween?: number;
  slidesPerView?: number | "auto";
  loop?: boolean;
  autoplay?: boolean | { delay: number };
  className?: string;
  slideClassName?: string;
  onSlideChange?: (index: number) => void;
}

export function Carousel<T>({
  items,
  renderItem,
  spaceBetween = 16,
  slidesPerView = "auto",
  loop = false,
  autoplay = false,
  className = "",
  onSlideChange,
}: CarouselProps<T>) {
  if (!items.length) return null;

  const autoplayConfig = autoplay
    ? {
        delay: typeof autoplay === "object" ? autoplay.delay : 3000,
        disableOnInteraction: false,
      }
    : false;

  return (
    <Swiper
      modules={autoplay ? [Autoplay] : []}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      loop={loop}
      autoplay={autoplayConfig} // если не нужно просто не передаем эту строку
      grabCursor={true}
      onSlideChange={(swiper) => onSlideChange?.(swiper.activeIndex)}
      className={`${styles.carousel} ${className}`}
    >
      {items.map((item, index) => (
        <SwiperSlide
          key={index}
          className={className}
          style={{ width: slidesPerView === "auto" ? "auto" : undefined }}
        >
          {renderItem(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
