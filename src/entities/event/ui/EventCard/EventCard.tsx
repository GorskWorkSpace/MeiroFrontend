import { useEffect, useRef, useState } from "react";
import { CalendarIcon, ImageIcon } from "../../../../shared/assets";
import { Caption } from "../../../../shared/ui/caption";
import { CategoryInfo } from "../../../../shared/ui/category-info";
import { Title } from "../../../../shared/ui/title";
import type { Event } from "../../model/types";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: Event;
  category: string;
  favouriteButton?: React.ReactNode;
}

export const EventCard = ({
  event,
  category,
  favouriteButton,
}: EventCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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
    <div ref={cardRef} className={styles.cardContainer}>
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
          <CategoryInfo>{category}</CategoryInfo>
        </div>
        <div className={styles.favourite}>{favouriteButton}</div>
      </div>

      <div className={styles.descriptionContainer}>
        <Caption className={styles.date} size={12} weight={400}>
          <CalendarIcon /> {event.date}
        </Caption>
        <Title size={16} weight={500} className={styles.title}>
          {event.title}
        </Title>
      </div>
    </div>
  );
};
