import { useCallback, useEffect, useRef, useState } from "react";

interface UseHorizontalScrollProps {
  speed?: number;
}

const DRAG_MULTIPLIER = 1.5;
const MOVE_THRESHOLD = 5;

export const useHorizontalScroll = ({
  speed = 20,
}: UseHorizontalScrollProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isHoveringRef.current) return;
      e.preventDefault();
      container.scrollLeft += (e.deltaY || e.deltaX) * speed;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [speed]);

  const stopDragging = useCallback((cursor: string) => {
    setIsDragging(false);
    const container = containerRef.current;
    if (container) {
      container.style.cursor = cursor;
      container.style.userSelect = "";
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    setHasMoved(false);
    startXRef.current = e.pageX - container.offsetLeft;
    startScrollLeftRef.current = container.scrollLeft;
    container.style.cursor = "grabbing";
    container.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!isDragging || !container) return;

      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startXRef.current) * DRAG_MULTIPLIER;

      if (Math.abs(walk) > MOVE_THRESHOLD) {
        setHasMoved(true);
      }

      container.scrollLeft = startScrollLeftRef.current - walk;
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => stopDragging("grab"), [stopDragging]);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
    const container = containerRef.current;
    if (container && !isDragging) {
      container.style.cursor = "grab";
    }
  }, [isDragging]);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
    if (isDragging) {
      setHasMoved(false);
      stopDragging("");
    }
  }, [isDragging, stopDragging]);

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
