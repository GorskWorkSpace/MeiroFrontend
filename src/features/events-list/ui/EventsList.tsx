import { useEffect } from "react";
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
import { Caption } from "../../../shared/ui/caption";
import { Title } from "../../../shared/ui/title";
import { useInfiniteScroll } from "../lib/useInfiniteScroll";
import styles from "./EventsList.module.css";

export const EventsList = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectEventsLoading);
  const isLoadingMore = useAppSelector(selectEventsLoadingMore);
  const hasMore = useAppSelector(selectHasMoreEvents);

  const { preLastElementRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    isLoadingMore,
    onLoadMore: () => dispatch(fetchNextPageThunk()),
  });

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
