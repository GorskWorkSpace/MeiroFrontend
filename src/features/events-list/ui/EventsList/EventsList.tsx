// Без изменений, так как уже использует selectEventFilters
import { use, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  EventCard,
  EventCardSkeleton,
  fetchAllEventsThunk,
  fetchNextPageThunk,
  resetFilters,
  selectAllEvents,
  selectEventFilters,
  selectEventsLoading,
  selectEventsLoadingMore,
  selectHasMoreEvents,
} from "../../../../entities/event";
import { Title } from "../../../../shared/ui/title";
import { FavouriteButton } from "../../../favourite";
import { useInfiniteScroll } from "../../lib/useInfiniteScroll";
import { EventsListSkeleton } from "../EventsListSkeleton/EventsListSkeleton";
import styles from "./EventsList.module.css";
import { useMediaQuery } from "../../../../shared/lib/hooks/useMediaQuery";
import { useParams } from "react-router-dom";

interface EventsListProps {
  listTitle: string;
}

export const EventsList = ({ listTitle }: EventsListProps) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectEventsLoading);
  const isLoadingMore = useAppSelector(selectEventsLoadingMore);
  const hasMore = useAppSelector(selectHasMoreEvents);
  const eventFilters = useAppSelector(selectEventFilters);

  const { eventId } = useParams();

  const { preLastElementRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    isLoadingMore,
    onLoadMore: () => dispatch(fetchNextPageThunk()),
  });

  useEffect(() => {
    dispatch(resetFilters());
  }, []);

  useEffect(() => {
    dispatch(fetchAllEventsThunk({ ...eventFilters, eventId }));
  }, [
    eventFilters.category,
    eventFilters.countPlace,
    eventFilters.priceFrom,
    eventFilters.priceTo,
    eventFilters.search,
  ]);

  if (isLoading) {
    return <EventsListSkeleton />;
  }

  return (
    <article>
      <Title size={isDesktop ? 20 : 18} weight={500} className={styles.head}>
        {listTitle}
      </Title>

      {events.length === 0 && (
        <div className={styles.noEvents}>
          <Title
            size={isDesktop ? 18 : 16}
            weight={400}
            className={styles.noEventsTitle}
          >
            Нет событий
          </Title>
        </div>
      )}
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

          {isLoadingMore && (
            <>
              {[...Array(2)].map((_, index) => (
                <EventCardSkeleton key={`loading-more-${index}`} />
              ))}
            </>
          )}
        </div>
      </div>
    </article>
  );
};
