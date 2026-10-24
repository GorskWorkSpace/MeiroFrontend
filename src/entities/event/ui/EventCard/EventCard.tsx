import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, ImageIcon } from "../../../../shared/assets";
import { getEventDetailRoute } from "../../../../shared/config/routes";
import { useIsDesktop } from "../../../../shared/lib/hooks/useIsDesktop";
import { Caption } from "../../../../shared/ui/caption";
import { CategoryInfo } from "../../../../shared/ui/category-info";
import { Title } from "../../../../shared/ui/title";
import type { Event } from "../../model/types";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: Event;
  favouriteButton?: React.ReactNode;
}

export const EventCard = ({ event, favouriteButton }: EventCardProps) => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Картинка подгружается только когда карточка близко к viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "100px" },
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={() => navigate(getEventDetailRoute(event.id))}
      className={styles.cardContainer}
    >
      <div
        className={styles.cardWrapper}
        style={{
          backgroundImage:
            isVisible && event.img ? `url(${event.img})` : "none",
        }}
      >
        {!event.img && (
          <div className={styles.empty}>
            <ImageIcon />
          </div>
        )}

        <div className={styles.category}>
          <CategoryInfo>{event.category}</CategoryInfo>
        </div>
        <div className={styles.favourite}>{favouriteButton}</div>
      </div>

      <div className={styles.descriptionContainer}>
        <Caption className={styles.date} weight={400}>
          <CalendarIcon /> {event.date}
        </Caption>
        <Title size={isDesktop ? 16 : 15} weight={400} className={styles.title}>
          {event.title}
        </Title>
      </div>
    </div>
  );
};
