import { useState } from "react";
import { CalendarIcon, ImageIcon, PinIcon } from "../../../../shared/assets";
import { Caption } from "../../../../shared/ui/caption";
import { Title } from "../../../../shared/ui/title";
import type { SoonEvent } from "../../model/types";
import styles from "./SoonEventCard.module.css";

interface SoonEventCardProps {
  event: SoonEvent;
}

export const SoonEventCard = ({ event }: SoonEventCardProps) => {
  const [imageError, setImageError] = useState(false);

  const hasImage = event.img && !imageError;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        {hasImage ? (
          <img
            src={event.img ?? undefined}
            alt={event.title}
            className={styles.image}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={styles.empty}>
            <ImageIcon />
          </div>
        )}
      </div>

      <div className={styles.info}>
        <Title size={14} weight={500}>
          {event.title}
        </Title>
        <div className={styles.description}>
          <Caption className={styles.descriptionItem}>
            <CalendarIcon />
            {event.date}
          </Caption>
          <Caption className={styles.descriptionItem}>
            <PinIcon />
            {event.address}
          </Caption>
        </div>
      </div>
    </div>
  );
};
