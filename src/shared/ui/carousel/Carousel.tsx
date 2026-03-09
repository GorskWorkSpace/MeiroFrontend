import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, type PanInfo, useAnimation } from "framer-motion";
import styles from "./Carousel.module.css";

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

interface ExtendedItem {
  item: React.ReactNode;
  originalIndex: number;
  copy: number;
  key: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  infinite = true,
  itemWidth = 320,
  gap = 8,
  className = "",
  onSlideChange,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const autoPlayRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isInteractingRef = useRef(false);
  const interactionTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined);

  const totalItems = items.length;
  const itemWidthWithGap = itemWidth + gap;

  const [copiesCount, setCopiesCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  const extendedItems = React.useMemo<ExtendedItem[]>(() => {
    if (!infinite) {
      return items.map((item, i) => ({
        item,
        originalIndex: i,
        copy: 0,
        key: `item-0-${i}`,
      }));
    }

    const result: ExtendedItem[] = [];
    for (let copy = 0; copy < copiesCount; copy++) {
      for (let i = 0; i < totalItems; i++) {
        result.push({
          item: items[i],
          originalIndex: i,
          copy,
          key: `item-${copy}-${i}`,
        });
      }
    }
    return result;
  }, [items, totalItems, infinite, copiesCount]);

  const startIndex = React.useMemo(() => {
    if (!infinite) return 0;
    return Math.floor(extendedItems.length / 2) - Math.floor(totalItems / 2);
  }, [extendedItems.length, totalItems, infinite]);

  useEffect(() => {
    if (infinite) {
      setCurrentIndex(startIndex);
    }
  }, [startIndex, infinite]);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getSnapPosition = useCallback(
    (index: number) => {
      if (!containerWidth) return 0;
      const containerCenter = containerWidth / 2;
      const itemCenter = index * itemWidthWithGap + itemWidth / 2;
      return containerCenter - itemCenter;
    },
    [containerWidth, itemWidthWithGap],
  );

  const ensureNoEmptySpace = useCallback(
    (index: number) => {
      if (!infinite) return index;

      const margin = totalItems * 2;

      if (index < margin) {
        setCopiesCount((prev) => prev + 2);
        const newIndex = index + totalItems * 2;
        setCurrentIndex(newIndex);
        controls.set({ x: getSnapPosition(newIndex) });
        return newIndex;
      }

      if (index > extendedItems.length - margin) {
        setCopiesCount((prev) => prev + 2);
        return index;
      }

      return index;
    },
    [infinite, totalItems, extendedItems.length, controls, getSnapPosition],
  );

  const snapToIndex = useCallback(
    async (index: number, animated = true) => {
      const safeIndex = ensureNoEmptySpace(index);

      await controls.start({
        x: getSnapPosition(safeIndex),
        transition: animated
          ? { type: "spring", stiffness: 300, damping: 30 }
          : { duration: 0 },
      });

      setCurrentIndex(safeIndex);
      onSlideChange?.(safeIndex % totalItems);
    },
    [controls, getSnapPosition, totalItems, ensureNoEmptySpace, onSlideChange],
  );

  const handleDragStart = useCallback(() => {
    isInteractingRef.current = true;

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = undefined;
    }
  }, []);

  const handleDragEnd = useCallback(
    async (_: any, info: PanInfo) => {
      const offset = info.offset.x;
      const velocity = info.velocity.x;

      const offsetInItems = offset / itemWidthWithGap;
      const absOffset = Math.abs(offsetInItems);
      const direction = offset > 0 || velocity > 500 ? -1 : 1;

      let newIndex = currentIndex;

      if (absOffset > 0.5 || Math.abs(velocity) > 500) {
        newIndex = currentIndex + direction;
      }

      await snapToIndex(newIndex);

      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }

      interactionTimeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 2000);
    },
    [currentIndex, itemWidthWithGap, snapToIndex],
  );

  useEffect(() => {
    if (!autoPlay) return;

    const nextSlide = () => {
      if (!isInteractingRef.current) {
        snapToIndex(currentIndex + 1);
      }
    };

    autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, currentIndex, snapToIndex]);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (containerWidth && infinite) {
      snapToIndex(startIndex, false);
    }
  }, [containerWidth, startIndex, snapToIndex, infinite]);

  useEffect(() => {
    if (containerWidth && !infinite) {
      snapToIndex(0, false);
    }
  }, [containerWidth, snapToIndex, infinite]);

  const displayItems = !infinite
    ? items.map((item, i) => ({ item, key: `item-${i}` }))
    : extendedItems;

  return (
    <div
      ref={containerRef}
      className={`${styles.carouselContainer} ${className}`}
    >
      <motion.div
        className={styles.carouselTrack}
        drag="x"
        dragConstraints={
          !infinite
            ? {
                left: -((totalItems - 1) * itemWidthWithGap),
                right: 0,
              }
            : undefined
        }
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{
          gap,
          touchAction: "pan-y",
          cursor: isInteractingRef.current ? "grabbing" : "grab",
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        {displayItems.map((itemData: any) => (
          <div
            key={itemData.key}
            className={styles.carouselItem}
            style={{ width: itemWidth }}
          >
            {itemData.item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
