// shared/lib/hooks/useHorizontalScroll.ts
import { useRef, useEffect, useState, useCallback } from "react";

interface UseHorizontalScrollProps {
  speed?: number;
}

export const useHorizontalScroll = (props?: UseHorizontalScrollProps) => {
  const { speed = 20 } = props || {};
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHovering) return;
      e.preventDefault();
      const delta = e.deltaY || e.deltaX;
      container.scrollLeft += delta * speed;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isHovering, speed]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    container.style.cursor = "grabbing";
    container.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!isDragging || !container) return;

      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;

      if (Math.abs(walk) > 5) {
        setHasMoved(true);
      }

      container.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft],
  );

  const handleMouseUp = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(false);
    container.style.cursor = "grab";
    container.style.userSelect = "";

    // Если было движение - это drag, если нет - клик
    // Возвращаем флаг, чтобы компонент мог решить, был ли клик
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
    const container = containerRef.current;
    if (container && !isDragging) {
      container.style.cursor = "grab";
    }
  }, [isDragging]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    if (isDragging) {
      setIsDragging(false);
      setHasMoved(false);
      const container = containerRef.current;
      if (container) {
        container.style.cursor = "";
        container.style.userSelect = "";
      }
    }
  }, [isDragging]);

  return {
    containerRef,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    },
    isDragging,
    hasMoved,
  };
};
