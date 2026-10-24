import "swiper/swiper-bundle.css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../../lib/classNames";
import { useIsDesktop } from "../../../lib/hooks/useIsDesktop";
import styles from "./Carousel.module.css";

const DEFAULT_AUTOPLAY_DELAY = 3000;

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
  autoplay = { delay: DEFAULT_AUTOPLAY_DELAY },
  className,
  slideClassName,
  onSlideChange,
}: CarouselProps<T>) {
  const isDesktop = useIsDesktop();

  if (!items.length) return null;

  const autoplayConfig =
    autoplay === false
      ? false
      : {
          delay:
            typeof autoplay === "object"
              ? autoplay.delay
              : DEFAULT_AUTOPLAY_DELAY,
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
      className={cn(styles.carousel, className)}
      centeredSlides={!isDesktop}
    >
      {items.map((item, index) => (
        <SwiperSlide
          key={index}
          className={cn(styles.slide, slideClassName)}
          style={{ width: slidesPerView === "auto" ? "auto" : undefined }}
        >
          {renderItem(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
