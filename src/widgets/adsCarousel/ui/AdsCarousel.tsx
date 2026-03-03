import React from 'react';
import styles from './AdsCarousel.module.css';
import { Carousel } from '../../../shared/ui/carousel/Carousel';


interface AdsCarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  infinite?: boolean;
  className?: string;
}

export const AdsCarousel: React.FC<AdsCarouselProps> = ({
  items,
  autoPlay = true,
  infinite = true,
  className = '',
}) => {
  if (!items.length) return null;

  return (
    <div className={`${styles.adsCarousel} ${className}`}>
      <Carousel
        items={items}
        autoPlay={autoPlay}
        autoPlayInterval={5000}
        infinite={infinite}
        itemWidth={320}
        gap={8}
      />
    </div>
  );
};