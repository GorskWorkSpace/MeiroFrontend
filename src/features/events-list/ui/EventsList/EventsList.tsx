import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  EventCard,
  EventCardSkeleton,
  fetchAllEventsThunk,
  fetchNextPageThunk,
  selectAllEvents,
  selectEventsLoading,
  selectEventsLoadingMore,
  selectHasMoreEvents,
} from "../../../../entities/event";
import { Caption } from "../../../../shared/ui/caption";
import { Title } from "../../../../shared/ui/title";
import { FavouriteButton } from "../../../favourite";
import { useInfiniteScroll } from "../../lib/useInfiniteScroll";
import { EventsListSkeleton } from "../EventsListSkeleton/EventsListSkeleton";
import styles from "./EventsList.module.css";

export const EventsList = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectEventsLoading);
  const isLoadingMore = useAppSelector(selectEventsLoadingMore);
  const hasMore = useAppSelector(selectHasMoreEvents);

  const isFirstLoad = useRef(true);

  const { preLastElementRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    isLoadingMore,
    onLoadMore: () => dispatch(fetchNextPageThunk()),
  });

  useEffect(() => {
    dispatch(fetchAllEventsThunk({ page: 0 }));
  }, [dispatch]);

  if (isLoading || (isFirstLoad.current && events.length === 0)) {
    return <EventsListSkeleton />;
  }

  if (isFirstLoad.current && !isLoading) {
    isFirstLoad.current = false;
  }

  if (!isLoading && events.length === 0) {
    return (
      <div className={styles.flex}>
        <Title size={18} weight={500}>
          Мероприятия для вас
        </Title>
        <div className={styles.emptyState}>
          <p>Ничего не найдено</p>
        </div>
      </div>
    );
  }

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

        {isLoadingMore && (
          <>
            {[...Array(2)].map((_, index) => (
              <EventCardSkeleton key={`loading-more-${index}`} />
            ))}
          </>
        )}
      </div>

      {!hasMore && events.length > 0 && (
        <Caption className={styles.endMessage}>Больше нет мероприятий</Caption>
      )}
    </div>
  );
};
