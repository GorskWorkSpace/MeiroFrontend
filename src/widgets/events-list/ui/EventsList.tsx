import { useEffect, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  EventCard,
  fetchAllEventsThunk,
  fetchNextPageThunk,
  selectAllEvents,
  selectEventsLoading,
  selectEventsLoadingMore,
  selectHasMoreEvents,
} from "../../../entities/event";
import { FavouriteButton } from "../../../features/favourite";
import styles from "./EventsList.module.css";
import { Title } from "../../../shared/ui/title";
import { Caption } from "../../../shared/ui/caption";

export const EventsList = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectEventsLoading);
  const isLoadingMore = useAppSelector(selectEventsLoadingMore);
  const hasMore = useAppSelector(selectHasMoreEvents);

  const observerRef = useRef<IntersectionObserver>(undefined);

  const preLastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isLoadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log("соо при каждом запросе пачки ивентов");
            dispatch(fetchNextPageThunk());
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px",
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore, dispatch],
  );

  useEffect(() => {
    console.log("Загрузка страницы");
    dispatch(fetchAllEventsThunk({}));
  }, [dispatch]);

  if (isLoading && events.length === 0) return <div>Загрузка...</div>;

  return (
    <div className={styles.flex}>
      <Title size={18} weight={500}>
        Мероприятия для вас
      </Title>
      <div className={styles.grid}>
        {events.map((event, index) => {
          const isPreLast = index === events.length - 2;

          return (
            <div key={event.id} ref={isPreLast ? preLastElementRef : undefined}>
              <EventCard
                event={event}
                category={event.category}
                favouriteButton={
                  <FavouriteButton
                    eventId={event.id}
                    isFavourite={event.isFavourite}
                  />
                }
              />
            </div>
          );
        })}
      </div>
      {isLoadingMore && <Caption>Загрузка...</Caption>}
      {!hasMore && events.length > 0 && (
        <Caption>Больше нет мероприятий</Caption>
      )}
    </div>
  );
};
