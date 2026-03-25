import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  AdCard,
  AdCardSkeleton,
  fetchAllAdsThunk,
  selectAdsError,
  selectAdsLoading,
  selectAllAds,
} from "../../../entities/ad";
import { Carousel } from "../../../shared/ui/carousel/Carousel";
import styles from "./AdsCarousel.module.css";

export interface AdsCarouselProps {
  autoPlay?: boolean;
  infinite?: boolean;
  limit?: number;
  className?: string;
  skeletonCount?: number;
}

export const AdsCarousel: React.FC<AdsCarouselProps> = ({
  limit = 10,
  className = "",
  skeletonCount = 3,
}) => {
  const dispatch = useAppDispatch();
  const ads = useAppSelector(selectAllAds);
  const loading = useAppSelector(selectAdsLoading);
  const error = useAppSelector(selectAdsError);

  useEffect(() => {
    dispatch(fetchAllAdsThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={`${styles.adsDisplay} ${className}`}>
        <Carousel
          items={Array(skeletonCount).fill(null)}
          renderItem={() => <AdCardSkeleton />}
          spaceBetween={8}
          slidesPerView="auto"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.adsDisplay} ${styles.error} ${className}`}>
        <p>Не удалось загрузить рекламу</p>
        <button
          onClick={() => dispatch(fetchAllAdsThunk())}
          className={styles.retryButton}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  const displayedAds = limit ? ads.slice(0, limit) : ads;

  if (!displayedAds.length) {
    return (
      <div className={`${styles.adsDisplay} ${styles.empty} ${className}`}>
        <p>Нет доступных объявлений</p>
      </div>
    );
  }

  return (
    <div className={`${styles.adsDisplay} ${className}`}>
      <Carousel
        items={displayedAds}
        renderItem={(ad) => <AdCard ad={ad} />}
        spaceBetween={8}
        slidesPerView="auto"
        loop={true}
        autoplay={{ delay: 5000 }}
        slideClassName={styles.slide}
      />
    </div>
  );
};
