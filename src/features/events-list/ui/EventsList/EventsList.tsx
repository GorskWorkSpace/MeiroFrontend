import { useEffect, useRef, useState } from "react";
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
  const [showEmpty, setShowEmpty] = useState(false);
  const emptyTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const { preLastElementRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    isLoadingMore,
    onLoadMore: () => dispatch(fetchNextPageThunk()),
  });

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      dispatch(fetchAllEventsThunk({ page: 0 }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && events.length === 0) {
      emptyTimeoutRef.current = setTimeout(() => {
        setShowEmpty(true);
      }, 150);
    } else {
      setShowEmpty(false);
      if (emptyTimeoutRef.current) {
        clearTimeout(emptyTimeoutRef.current);
      }
    }

    return () => {
      if (emptyTimeoutRef.current) {
        clearTimeout(emptyTimeoutRef.current);
      }
    };
  }, [isLoading, events.length]);

  if (isLoading) {
    return <EventsListSkeleton />;
  }

  if (!isLoading && events.length === 0 && showEmpty) {
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

  if (events.length === 0) {
    return <EventsListSkeleton />;
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
