import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  AdCard,
  AdCardSkeleton,
  fetchAllAdsThunk,
  selectAdsError,
  selectAdsLoading,
  selectAllAds,
  type Ad,
} from "../../../entities/ad";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import styles from "./AdsCarousel.module.css";

export interface AdsCarouselProps {
  autoPlay?: boolean;
  infinite?: boolean;
  limit?: number;
  onAdClick?: (ad: Ad) => void;
  className?: string;
  skeletonCount?: number;
}

export const AdsCarousel: React.FC<AdsCarouselProps> = ({
  limit = 10,
  onAdClick,
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
    const skeletonItems = Array(skeletonCount)
      .fill(null)
      .map((_, index) => <AdCardSkeleton key={`skeleton-${index}`} />);

    return (
      <div className={`${styles.adsDisplay} ${className}`}>
        <Swiper spaceBetween={8}>
          <SwiperSlide>{skeletonItems}</SwiperSlide>
        </Swiper>
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

  return (
    <div className={`${styles.adsDisplay} ${className}`}>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 5000 }}
        grabCursor={true}
        spaceBetween={8}
        speed={1000}
      >
        {displayedAds.map((ad) => (
          <SwiperSlide key={ad.id} className={styles.slide}>
            <AdCard ad={ad} onClick={onAdClick} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
