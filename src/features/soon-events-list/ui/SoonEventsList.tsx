import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { SoonEventCardSkeleton } from "../../../entities/event";
import {
  selectEventsLoading,
  selectSoonEvents,
  selectSoonEventsCount,
} from "../../../entities/event/model/eventSlice";
import { fetchSoonEventsThunk } from "../../../entities/event/model/eventThunks";
import { SoonEventCard } from "../../../entities/event/ui/SoonEventCard/SoonEventCard";
import { ArrowDownRightIcon } from "../../../shared/assets";
import { Title } from "../../../shared/ui/title";
import styles from "./SoonEventsList.module.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../../shared/lib/hooks/useMediaQuery";
import { useHorizontalScroll } from "../../../shared/lib/hooks/useHorizontSckroll";

const EmptyCard: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
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

export const SoonEventsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectSoonEvents);
  const count = useAppSelector(selectSoonEventsCount);
  const loading = useAppSelector(selectEventsLoading);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { containerRef, handlers, isDragging } = useHorizontalScroll({
    speed: 20,
  });

  useEffect(() => {
    dispatch(fetchSoonEventsThunk());
  }, [dispatch]);

  if (loading) {
    return <SoonEventCardSkeleton />;
  }

  const firstFiveEvents = events.slice(0, 5);

  if (!firstFiveEvents.length) {
    return null;
  }

  const soonItems = [
    ...firstFiveEvents.map((event) => (
      <SoonEventCard key={event.id} event={event} />
    )),
    <EmptyCard key="empty-card" onClick={() => navigate("/event/my-events")} />,
  ];

  return (
    <section className={styles.section}>
      <article className={styles.title}>
        <Title size={isDesktop ? 20 : 18} weight={500}>
          Избранные
        </Title>
        <span
          onClick={() => navigate("/event/my-events")}
          style={{ cursor: "pointer" }}
        >
          <Title className={styles.all} variant="accent">
            Все ({count})
          </Title>
        </span>
      </article>

      <article
        ref={containerRef}
        className={`${styles.soonEvents} ${isDragging ? styles.dragging : ""}`}
        {...handlers}
      >
        {soonItems.map((item, idx) => (
          <div key={idx} className={styles.soonEventsElem}>
            {item}
          </div>
        ))}
      </article>
    </section>
  );
};
