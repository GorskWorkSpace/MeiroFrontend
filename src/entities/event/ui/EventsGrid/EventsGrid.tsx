import type { Event } from "../../model/types";
import { EventCard } from "../EventCard";
import styles from "./EventsGrid.module.css";

interface EventsGridProps {
  events: Event[];
  renderFavourite?: (event: Event) => React.ReactNode;
  getItemRef?: (index: number) => React.Ref<HTMLDivElement> | undefined;
  /** Дополнительные элементы в конце сетки (например, скелетоны подгрузки) */
  children?: React.ReactNode;
}

export const EventsGrid = ({
  events,
  renderFavourite,
  getItemRef,
  children,
}: EventsGridProps) => {
  return (
    <div className={styles.flex}>
      <div className={styles.grid}>
        {events.map((event, index) => (
          <div
            key={event.id}
            ref={getItemRef?.(index)}
            className={styles.container}
          >
            <EventCard
              event={event}
              favouriteButton={renderFavourite?.(event)}
            />
          </div>
        ))}
        {children}
      </div>
    </div>
  );
};
