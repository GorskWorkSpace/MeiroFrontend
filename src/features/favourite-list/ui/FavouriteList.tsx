import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  EventsGrid,
  fetchFavouriteEventsThunk,
  selectAllEvents,
} from "../../../entities/event";
import { Title } from "../../../shared/ui/title";
import { FavouriteButton } from "../../favourite";
import styles from "./FavouriteList.module.css";

export const FavouriteList = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);

  useEffect(() => {
    dispatch(fetchFavouriteEventsThunk());
  }, [dispatch]);

  return (
    <section className={styles.container}>
      <Title className={styles.head}>Избранные мероприятия</Title>
      <article>
        <EventsGrid
          events={events}
          renderFavourite={(event) => (
            <FavouriteButton
              eventId={event.id}
              isFavourite={event.isFavourite}
            />
          )}
        />
      </article>
    </section>
  );
};
