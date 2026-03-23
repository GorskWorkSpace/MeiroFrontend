import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  EventCard,
  fetchAllEventsThunk,
  fetchNextPageThunk,
  selectAllEvents,
  selectEventsLoading,
  selectEventsLoadingMore,
  selectHasMoreEvents,
  EventCardSkeleton,
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

  // Показываем скелетон пока идет загрузка ИЛИ нет событий
  if (isLoading || events.length === 0) {
    return <EventsListSkeleton />;
  }

  return (
    <>
      <Title size={18} weight={500} className={styles.head}>
        Мероприятия для вас
      </Title>
      <div className={styles.flex}>
        <div className={styles.grid}>
          {events.map((event, index) => {
            const isPreLast = index === events.length - 2;

            return (
              <div
                key={event.id}
                ref={isPreLast ? preLastElementRef : undefined}
              >
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

          {/* Показываем скелетоны при загрузке следующей страницы */}
          {isLoadingMore && (
            <>
              {[...Array(2)].map((_, index) => (
                <EventCardSkeleton key={`loading-more-${index}`} />
              ))}
            </>
          )}
        </div>

        {!hasMore && events.length > 0 && (
          <Caption className={styles.endMessage}>
            Больше нет мероприятий
          </Caption>
        )}
      </div>
    </>
  );
};
