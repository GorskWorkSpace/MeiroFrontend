import { useEffect, useMemo, useRef } from "react";
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
import { Caption } from "../../../shared/ui/caption";
import { Title } from "../../../shared/ui/title";
import styles from "./SoonEventsList.module.css";
import { shallowEqual } from "react-redux";

const EmptyCard: React.FC = () => {
  return (
    <div className={styles.emptyCard}>
      <div className={styles.emptyTitle}>
        <Title size={14} weight={500}>
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
  const events = useAppSelector(selectSoonEvents, shallowEqual);
  const count = useAppSelector(selectSoonEventsCount);
  const loading = useAppSelector(selectEventsLoading);
  
  const isFirstLoad = useRef(true);
  const firstItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      dispatch(fetchSoonEventsThunk());
    }
  }, [dispatch]);

  const firstFiveEvents = useMemo(() => {
    return events.slice(0, 5);
  }, [events]);

  const carouselItems = useMemo(() => {
    const items = firstFiveEvents.map((event) => (
      <SoonEventCard key={event.id} event={event} />
    ));
    
    if (items.length > 0) {
      items.push(<EmptyCard key="empty-card" />);
    }
    
    return items;
  }, [firstFiveEvents]);

  const handleSlideChange = useMemo(() => {
    return (index: number) => {
      console.log("Текущий слайд:", index);
    };
  }, []);

  if (loading && events.length === 0) {
    return <SoonEventCardSkeleton />;
  }

  if (firstFiveEvents.length === 0) {
    return (
      <div className={styles.empty}>
        <p>У вас пока нет избранных событий</p>
      </div>
    );
  }

  const soonItems = [
    ...firstFiveEvents.map((event) => (
      <SoonEventCard key={event.id} event={event} />
    )),
    <EmptyCard key="empty-card" />,
  ];

  return (
    <section className={styles.section}>
      <div className={styles.title}>
        <Title size={18} weight={500}>
          Вы идёте
        </Title>
        <Caption size={16} variant="accent">
          Все ({count})
        </Caption>
      </div>

      <div className={styles.soonEvents}>
        {soonItems.map((item, idx) => (
          <div
            key={idx}
            ref={idx === 0 ? firstItemRef : null}
            className={styles.soonEventsElem}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};