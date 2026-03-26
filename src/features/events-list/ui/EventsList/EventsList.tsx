// Без изменений, так как уже использует selectEventFilters
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  EventCard,
  EventCardSkeleton,
  fetchAllEventsThunk,
  fetchNextPageThunk,
  selectAllEvents,
  selectEventFilters,
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

interface EventsListProps {
  listTitle: string;
}

export const EventsList = ({ listTitle }: EventsListProps) => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectEventsLoading);
  const isLoadingMore = useAppSelector(selectEventsLoadingMore);
  const hasMore = useAppSelector(selectHasMoreEvents);
  const eventFilters = useAppSelector(selectEventFilters);

  const { preLastElementRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    isLoadingMore,
    onLoadMore: () => dispatch(fetchNextPageThunk()),
  });

  useEffect(() => {
    dispatch(fetchAllEventsThunk(eventFilters));
  }, [
    eventFilters.category,
    eventFilters.countPlace,
    eventFilters.priceFrom,
    eventFilters.priceTo,
    eventFilters.search,
  ]);

  if (isLoading || events.length === 0) {
    return <EventsListSkeleton />;
  }

  return (
    <>
      <Title size={18} weight={500} className={styles.head}>
        {listTitle}
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

          {isLoadingMore && (
            <>
              {[...Array(2)].map((_, index) => (
                <EventCardSkeleton key={`loading-more-${index}`} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
