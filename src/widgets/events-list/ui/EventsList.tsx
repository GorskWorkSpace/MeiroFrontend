import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  EventCard,
  fetchAllEventsThunk,
  selectAllEvents,
  selectEventsLoading,
} from "../../../entities/event";
import { FavouriteButton } from "../../../features/favourite";
import styles from "./EventsList.module.css";
import { Title } from "../../../shared/ui/title";

export const EventsList = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectEventsLoading);

  useEffect(() => {
    dispatch(fetchAllEventsThunk({}));
  }, [dispatch]);

  if (isLoading && events.length === 0) return <div>Загрузка...</div>;

  return (
    <div className={styles.flex}>
      <Title size={18} weight={500}>
        Мероприятия для вас
      </Title>
      <div className={styles.grid}>
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            category={event.category}
            favouriteButton={
              <FavouriteButton
                eventId={event.id}
                isFavourite={event.isFavourite}
              />
            }
          />
        ))}
      </div>
    </div>
  );
};
