import { useEffect, useRef } from "react";
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
  const firstItemRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

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
      <article
        className={styles.title}
        onClick={() => navigate("/event/my-events")}
      >
        <Title size={isDesktop ? 20 : 18} weight={500}>
          Избранные
        </Title>
        <Title className={styles.all} variant="accent">
          Все ({count})
        </Title>
      </article>

      <article className={styles.soonEvents}>
        {soonItems.map((item, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? firstItemRef : null}
            className={styles.soonEventsElem}
          >
            {item}
          </div>
        ))}
      </article>
    </section>
  );
};
