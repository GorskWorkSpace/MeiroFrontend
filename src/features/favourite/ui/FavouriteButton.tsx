import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { toggleFavouriteThunk } from "../../../entities/event/model/eventThunks";
import { HeartIcon } from "../../../shared/assets";
import { selectIsFavouritePending } from "../model/favouriteSelectors";
import styles from "./FavouriteButton.module.css";
import { useCallback, useRef, useEffect } from "react";

interface FavouriteButtonProps {
  eventId: string;
  isFavourite: boolean;
}

export const FavouriteButton = ({
  eventId,
  isFavourite,
}: FavouriteButtonProps) => {
  const dispatch = useAppDispatch();
  const isPending = useAppSelector(selectIsFavouritePending(eventId));
  const isClickedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isPending) return;
      if (isClickedRef.current) return;

      isClickedRef.current = true;

      timeoutRef.current = setTimeout(() => {
        isClickedRef.current = false;
      }, 300);

      dispatch(toggleFavouriteThunk({ id: eventId }));
    },
    [dispatch, eventId, isPending],
  );

  return (
    <button
      className={`${styles.wrapper} ${isPending ? styles.pending : ""}`}
      onClick={handleClick}
      onTouchEnd={handleClick}
      disabled={isPending}
      type="button"
      aria-label={isFavourite ? "Убрать из избранного" : "Добавить в избранное"}
    >
      <HeartIcon isFavourite={isFavourite} />
    </button>
  );
};
