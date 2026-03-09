import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  fetchAllAdsThunk,
  selectAllAds,
  selectAdsLoading,
  selectAdsError,
  AdCard,
  type Ad,
} from "../../../entities/ad";
import { Carousel } from "../../../shared/ui/carousel/Carousel";
import styles from "./AdsCarousel.module.css";

export interface AdsCarouselProps {
  autoPlay?: boolean;
  infinite?: boolean;
  limit?: number;
  onAdClick?: (ad: Ad) => void;
  className?: string;
}

export const AdsCarousel: React.FC<AdsCarouselProps> = ({
  autoPlay = true,
  infinite = true,
  limit = 10,
  onAdClick,
  className = "",
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
        <div className={styles.skeleton}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.skeletonCard} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.adsDisplay} ${styles.error} ${className}`}>
        <p>Не удалось загрузить рекламу</p>
      </div>
    );
  }

  if (!ads.length) return null;

  const displayedAds = limit ? ads.slice(0, limit) : ads;

  const adCards = displayedAds.map((ad) => (
    <AdCard key={ad.id} ad={ad} onClick={onAdClick} />
  ));

  return (
    <div className={`${styles.adsDisplay} ${className}`}>
      <Carousel
        items={adCards}
        autoPlay={autoPlay}
        autoPlayInterval={5000}
        infinite={infinite}
        itemWidth={320}
        gap={8}
      />
    </div>
  );
};
