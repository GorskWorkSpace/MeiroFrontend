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
  loop = true,
  autoplay = { delay: 3000 },
  className = "",
  slideClassName = "",
  onSlideChange,
}: CarouselProps<T>) {
  if (!items.length) return null;

  const autoplayConfig =
    autoplay === false
      ? false
      : {
          delay: typeof autoplay === "object" ? autoplay.delay : 3000,
          disableOnInteraction: false,
        };

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      loop={loop}
      autoplay={autoplayConfig} //если не нужен передаем false, задержку менять здесь же
      grabCursor={true}
      onSlideChange={(swiper) => onSlideChange?.(swiper.activeIndex)}
      className={`${styles.carousel} ${className}`}
      centeredSlides
    >
      {items.map((item, index) => (
        <SwiperSlide
          key={index}
          className={`${styles.slide} ${slideClassName}`}
          style={{ width: slidesPerView === "auto" ? "auto" : undefined }}
        >
          {renderItem(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
