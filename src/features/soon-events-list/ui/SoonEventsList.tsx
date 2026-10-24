import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  fetchSoonEventsThunk,
  selectSoonEvents,
  selectSoonEventsCount,
  selectSoonEventsLoading,
  SOON_EVENTS_LIMIT,
  SoonEventCard,
  SoonEventCardSkeleton,
} from "../../../entities/event";
import { ArrowDownRightIcon } from "../../../shared/assets";
import { ROUTES } from "../../../shared/config/routes";
import { cn } from "../../../shared/lib/classNames";
import { useHorizontalScroll } from "../../../shared/lib/hooks/useHorizontalScroll";
import { useIsDesktop } from "../../../shared/lib/hooks/useIsDesktop";
import { Title } from "../../../shared/ui/title";
import styles from "./SoonEventsList.module.css";

const AllEventsCard = ({ onClick }: { onClick: () => void }) => {
  const isDesktop = useIsDesktop();

  return (
    <div className={styles.emptyCard} onClick={onClick}>
      <div className={styles.emptyTitle}>
        <Title size={isDesktop ? 20 : 18} weight={500}>
          Все мероприятия
        </Title>
      </div>
      <div className={styles.emptyIcon}>
        <ArrowDownRightIcon />
      </div>
    </div>
  );
};

export const SoonEventsList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();

  const events = useAppSelector(selectSoonEvents);
  const count = useAppSelector(selectSoonEventsCount);
  const loading = useAppSelector(selectSoonEventsLoading);

  const { containerRef, handlers, isDragging } = useHorizontalScroll({
    speed: 20,
  });

  useEffect(() => {
    dispatch(fetchSoonEventsThunk());
  }, [dispatch]);

  if (loading) {
    return <SoonEventCardSkeleton />;
  }

  const visibleEvents = events.slice(0, SOON_EVENTS_LIMIT);

  if (!visibleEvents.length) {
    return null;
  }

  const openMyEvents = () => navigate(ROUTES.myEvents);

  return (
    <section className={styles.section}>
      <article className={styles.title}>
        <Title size={isDesktop ? 20 : 18} weight={500}>
          Избранные
        </Title>
        <span onClick={openMyEvents} style={{ cursor: "pointer" }}>
          <Title className={styles.all} variant="accent">
            Все ({count})
          </Title>
        </span>
      </article>

      <article
        ref={containerRef}
        className={cn(styles.soonEvents, isDragging && styles.dragging)}
        {...handlers}
      >
        {visibleEvents.map((event) => (
          <div key={event.id} className={styles.soonEventsElem}>
            <SoonEventCard event={event} />
          </div>
        ))}
        <div className={styles.soonEventsElem}>
          <AllEventsCard onClick={openMyEvents} />
        </div>
      </article>
    </section>
  );
};
