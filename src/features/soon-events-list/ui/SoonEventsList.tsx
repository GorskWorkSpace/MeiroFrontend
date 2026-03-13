import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";

import {
  selectEventsLoading,
  selectSoonEvents,
  selectSoonEventsCount,
} from "../../../entities/event/model/eventSlice";
import { fetchSoonEventsThunk } from "../../../entities/event/model/eventThunks";
import { SoonEventCard } from "../../../entities/event/ui/soon-event-card/SoonEventCard";
import { ArrowDownRightIcon } from "../../../shared/assets";
import { Caption } from "../../../shared/ui/caption";
import { Carousel } from "../../../shared/ui/carousel/Carousel";
import { Title } from "../../../shared/ui/title";
import styles from "./SoonEventsList.module.css";

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
  const events = useAppSelector(selectSoonEvents);
  const count = useAppSelector(selectSoonEventsCount);
  const loading = useAppSelector(selectEventsLoading);

  useEffect(() => {
    dispatch(fetchSoonEventsThunk());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Загрузка ближайших событий...</div>;
  }

  const firstFiveEvents = events.slice(0, 5);

  if (!firstFiveEvents.length) {
    return (
      <div className={styles.empty}>
        <p>У вас пока нет избранных событий</p>
      </div>
    );
  }

  const carouselItems = [
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

      <Carousel
        items={carouselItems}
        infinite={false}
        autoPlay={false}
        onSlideChange={(index) => {
          console.log("Текущий слайд:", index);
        }}
      />
    </section>
  );
};
