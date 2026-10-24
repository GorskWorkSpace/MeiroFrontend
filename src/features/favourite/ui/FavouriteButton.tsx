import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { toggleFavouriteThunk } from "../../../entities/event";
import { HeartIcon } from "../../../shared/assets";
import { cn } from "../../../shared/lib/classNames";
import { selectIsFavouritePending } from "../model/favouriteSelectors";
import styles from "./FavouriteButton.module.css";

const ANIMATION_DURATION = 300;
const ICON_SIZE = 16;

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
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // onTouchEnd и onClick могут сработать оба — анимация служит защитой от двойного клика
      if (isPending || isAnimating) return;

      setIsAnimating(true);
      timeoutRef.current = setTimeout(
        () => setIsAnimating(false),
        ANIMATION_DURATION,
      );

      dispatch(toggleFavouriteThunk({ id: eventId }));
    },
    [dispatch, eventId, isPending, isAnimating],
  );

  return (
    <button
      className={cn(styles.wrapper, isPending && styles.pending)}
      onClick={handleClick}
      onTouchEnd={handleClick}
      disabled={isPending}
      type="button"
      aria-label={isFavourite ? "Убрать из избранного" : "Добавить в избранное"}
    >
      <div className={cn(styles.heartContainer, isAnimating && styles.animate)}>
        <HeartIcon
          isFavourite={isFavourite}
          className={isAnimating ? "heartIconAnimate" : undefined}
          size={ICON_SIZE}
        />
      </div>
    </button>
  );
};
