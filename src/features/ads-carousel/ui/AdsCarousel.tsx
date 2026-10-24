import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  AdCard,
  AdCardSkeleton,
  fetchAllAdsThunk,
  selectAdsLoading,
  selectAllAds,
} from "../../../entities/ad";
import { cn } from "../../../shared/lib/classNames";
import { Carousel } from "../../../shared/ui/carousel";
import styles from "./AdsCarousel.module.css";

const AUTOPLAY_DELAY = 5000;
const SLIDES_GAP = 8;

export interface AdsCarouselProps {
  limit?: number;
  className?: string;
  skeletonCount?: number;
}

export const AdsCarousel = ({
  limit = 10,
  className,
  skeletonCount = 5,
}: AdsCarouselProps) => {
  const dispatch = useAppDispatch();
  const ads = useAppSelector(selectAllAds);
  const loading = useAppSelector(selectAdsLoading);

  useEffect(() => {
    dispatch(fetchAllAdsThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={cn(styles.adsDisplay, className)}>
        <Carousel
          items={Array.from({ length: skeletonCount })}
          renderItem={() => <AdCardSkeleton />}
          spaceBetween={SLIDES_GAP}
          slidesPerView="auto"
        />
      </div>
    );
  }

  const displayedAds = limit ? ads.slice(0, limit) : ads;

  return (
    <div className={cn(styles.adsDisplay, className)}>
      <Carousel
        items={displayedAds}
        renderItem={(ad) => <AdCard ad={ad} />}
        spaceBetween={SLIDES_GAP}
        slidesPerView="auto"
        loop={true}
        autoplay={{ delay: AUTOPLAY_DELAY }}
        slideClassName={styles.slide}
      />
    </div>
  );
};
