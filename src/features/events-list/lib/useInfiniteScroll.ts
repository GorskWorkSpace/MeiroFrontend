import { useCallback, useRef } from "react";

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
  rootMargin?: string;
}

/** Возвращает ref-колбэк: когда помеченный элемент появляется на экране, вызывается onLoadMore */
export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  isLoadingMore,
  onLoadMore,
  threshold = 0.1,
  rootMargin = "100px",
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver>(undefined);

  const triggerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isLoadingMore) return;
      observerRef.current?.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            onLoadMore();
          }
        },
        { threshold, rootMargin },
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore, onLoadMore, threshold, rootMargin],
  );

  return { triggerRef };
};
