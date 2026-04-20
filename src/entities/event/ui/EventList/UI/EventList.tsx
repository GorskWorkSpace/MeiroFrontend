import { useAppSelector } from "../../../../../app/store/hooks";
import { FavouriteButton } from "../../../../../features/favourite";
import { selectAllEvents } from "../../../model/eventSlice";
import { EventCard } from "../../EventCard";
import styles from "./EventList.module.css";

export const EventList = () => {
  const events = useAppSelector(selectAllEvents);

  return (
    <article>
      <div className={styles.flex}>
        <div className={styles.grid}>
          {events.map((event) => {
            return (
              <div key={event.id}>
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
        </div>
      </div>
    </article>
  );
};
