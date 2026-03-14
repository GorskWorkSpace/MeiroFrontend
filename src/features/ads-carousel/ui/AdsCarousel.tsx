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
import { Carousel } from "../../../shared/ui/carousel/Carousel";
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
  autoPlay = true,
  infinite = true,
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
        <Carousel
          items={skeletonItems}
          autoPlay={false}
          infinite={false}
          itemWidth={320}
          gap={8}
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
