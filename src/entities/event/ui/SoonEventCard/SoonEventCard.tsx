import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, ImageIcon, PinIcon } from "../../../../shared/assets";
import { getEventDetailRoute } from "../../../../shared/config/routes";
import { Caption } from "../../../../shared/ui/caption";
import { Title } from "../../../../shared/ui/title";
import type { SoonEvent } from "../../model/types";
import styles from "./SoonEventCard.module.css";

interface SoonEventCardProps {
  event: SoonEvent;
}

export const SoonEventCard = ({ event }: SoonEventCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(event.img) && !imageError;

  return (
    <div
      onClick={() => navigate(getEventDetailRoute(event.id))}
      className={styles.cardContainer}
    >
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
        <Title size={15} weight={500} className={styles.title}>
          {event.title}
        </Title>
        <div className={styles.description}>
          <Caption className={styles.descriptionItem}>
            <CalendarIcon />
            <div className={styles.text}>{event.date}</div>
          </Caption>
          <Caption className={styles.descriptionItem}>
            <PinIcon />
            <div className={styles.text}>{event.address}</div>
          </Caption>
        </div>
      </div>
    </div>
  );
};
