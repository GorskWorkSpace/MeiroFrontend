import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  EVENTS_PAGE_SIZE,
  EventCardSkeleton,
  EventsGrid,
  fetchAllEventsThunk,
  fetchNextPageThunk,
  selectAllEvents,
  selectEventFilters,
  selectEventsLoading,
  selectEventsLoadingMore,
  selectHasMoreEvents,
} from "../../../../entities/event";
import { useIsDesktop } from "../../../../shared/lib/hooks/useIsDesktop";
import { Title } from "../../../../shared/ui/title";
import { FavouriteButton } from "../../../favourite";
import { useInfiniteScroll } from "../../lib/useInfiniteScroll";
import { EventsListSkeleton } from "../EventsListSkeleton";
import styles from "./EventsList.module.css";

const LOADING_MORE_SKELETONS = 2;

interface EventsListProps {
  listTitle: string;
}

export const EventsList = ({ listTitle }: EventsListProps) => {
  const dispatch = useAppDispatch();
  const isDesktop = useIsDesktop();
  const { eventId } = useParams();

  const events = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectEventsLoading);
  const isLoadingMore = useAppSelector(selectEventsLoadingMore);
  const hasMore = useAppSelector(selectHasMoreEvents);
  const { category, countPlace, priceFrom, priceTo, search } =
    useAppSelector(selectEventFilters);

  const loadMore = useCallback(() => dispatch(fetchNextPageThunk()), [dispatch]);

  const { triggerRef } = useInfiniteScroll({
    hasMore,
    isLoading,
    isLoadingMore,
    onLoadMore: loadMore,
  });

  // При изменении фильтров список загружается заново с первой страницы
  useEffect(() => {
    dispatch(
      fetchAllEventsThunk({
        page: 0,
        offset: EVENTS_PAGE_SIZE,
        category,
        countPlace,
        priceFrom,
        priceTo,
        search,
        eventId,
      }),
    );
  }, [dispatch, category, countPlace, priceFrom, priceTo, search, eventId]);

  if (isLoading) {
    return <EventsListSkeleton />;
  }

  // Подгрузку запускает предпоследняя карточка, чтобы следующая страница успела загрузиться
  const triggerIndex = events.length - 2;

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

      <EventsGrid
        events={events}
        getItemRef={(index) => (index === triggerIndex ? triggerRef : undefined)}
        renderFavourite={(event) => (
          <FavouriteButton eventId={event.id} isFavourite={event.isFavourite} />
        )}
      >
        {isLoadingMore &&
          Array.from({ length: LOADING_MORE_SKELETONS }, (_, index) => (
            <EventCardSkeleton key={`loading-more-${index}`} />
          ))}
      </EventsGrid>
    </article>
  );
};
