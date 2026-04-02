import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import styles from "./Carousel.module.css";
import { useMediaQuery } from "../../lib/hooks/useMediaQuery";

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

  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
      autoplay={autoplayConfig}
      grabCursor={true}
      onSlideChange={(swiper) => onSlideChange?.(swiper.activeIndex)}
      className={`${styles.carousel} ${className}`}
      centeredSlides={!isDesktop}
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
