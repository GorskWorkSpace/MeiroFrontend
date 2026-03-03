import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion,type PanInfo, useAnimation } from 'framer-motion';
import styles from './Carousel.module.css';

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  infinite?: boolean;
  itemWidth?: number;
  gap?: number;
  className?: string;
  onSlideChange?: (index: number) => void;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  infinite = false,
  itemWidth = 320,
  gap = 8,
  className = '',
  onSlideChange,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const autoPlayRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  
  const totalItems = items.length;
  
  const extendedItems = infinite ? [...items, ...items, ...items] : items;
  
  const startIndex = infinite ? totalItems : 0;
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const getSnapPosition = useCallback((index: number) => {
    const containerCenter = containerWidth / 2;
    const itemCenter = index * (itemWidth + gap) + itemWidth / 2;
    return containerCenter - itemCenter;
  }, [containerWidth, itemWidth, gap]);

  const snapToIndex = useCallback(async (index: number, animated = true) => {
    await controls.start({
      x: getSnapPosition(index),
      transition: animated ? { type: 'spring', stiffness: 300, damping: 30 } : { duration: 0 }
    });
    
    setCurrentIndex(index);
    onSlideChange?.(index % totalItems);
    
    if (infinite) {
      if (index <= totalItems - 1) {

        const newIndex = index + totalItems;
        setCurrentIndex(newIndex);
        await controls.set({ x: getSnapPosition(newIndex) });
      } else if (index >= totalItems * 2) {

        const newIndex = index - totalItems;
        setCurrentIndex(newIndex);
        await controls.set({ x: getSnapPosition(newIndex) });
      }
    }
  }, [controls, getSnapPosition, totalItems, infinite, onSlideChange]);

  const handleDragEnd = useCallback(async (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const itemWidthWithGap = itemWidth + gap;

    const offsetInItems = offset / itemWidthWithGap;
    const absOffset = Math.abs(offsetInItems);
    
    const direction = offset > 0 || velocity > 500 ? -1 : 1;
    
    let newIndex = currentIndex;
    
    if (absOffset > 0.5 || Math.abs(velocity) > 500) {
      newIndex = currentIndex + direction;
    }
    
    await snapToIndex(newIndex);
  }, [currentIndex, itemWidth, gap, snapToIndex]);

  const handleDragStart = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    
    const nextSlide = () => {
      snapToIndex(currentIndex + 1);
    };

    autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, currentIndex, snapToIndex]);

  useEffect(() => {
    if (containerWidth) {
      snapToIndex(startIndex, false);
    }
  }, [containerWidth, startIndex, snapToIndex]);

  return (
    <div ref={containerRef} className={`${styles.carouselContainer} ${className}`}>
      <motion.div
        className={styles.carouselTrack}
        drag="x"
        dragConstraints={{ left: -Infinity, right: Infinity }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ gap }}
        whileTap={{ cursor: 'grabbing' }}
      >
        {extendedItems.map((item, i) => (
          <div key={i} className={styles.carouselItem} style={{ width: itemWidth }}>
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};