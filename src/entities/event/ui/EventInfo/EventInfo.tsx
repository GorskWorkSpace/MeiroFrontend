import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../../app/store/hooks";
import { CalendarIcon, InfoIcon, ShareIcon } from "../../../../shared/assets";
import { cn } from "../../../../shared/lib/classNames";
import { Caption } from "../../../../shared/ui/caption";
import { ProgressBar } from "../../../../shared/ui/progress-bar";
import { Tab } from "../../../../shared/ui/tab";
import { Text } from "../../../../shared/ui/text";
import { Title } from "../../../../shared/ui/title";
import { selectEventDetail } from "../../model/selectors";
import styles from "./EventInfo.module.css";

const ACCENT_COLOR = "#554FFD";
const FEW_PLACES_COLOR = "#F84A00";
const MANY_PLACES_COLOR = "#00A55E";

interface PlacesLeftProps {
  taken: number;
  total: number;
}

const PlacesLeft = ({ taken, total }: PlacesLeftProps) => {
  const left = total - taken;
  const isLessThanHalf = left < total / 2;
  const textColor = isLessThanHalf ? FEW_PLACES_COLOR : MANY_PLACES_COLOR;

  let label = `Осталось ${left} мест`;
  if (taken === total) {
    label = "Мест нет";
  } else if (isLessThanHalf) {
    label = `Осталось всего ${left} мест`;
  }

  return (
    <Text textColor={textColor} size={14} weight={500}>
      {label}
    </Text>
  );
};

interface EventInfoProps {
  /** Действие под описанием события, например кнопка записи */
  action?: React.ReactNode;
}

export const EventInfo = ({ action }: EventInfoProps) => {
  const eventDetail = useAppSelector(selectEventDetail);
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // Кнопка «Еще» нужна, только если описание не помещается в свернутый блок
  useEffect(() => {
    const el = descriptionRef.current;
    if (el) {
      setShowMore(el.scrollHeight > el.clientHeight);
    }
  }, [eventDetail?.description]);

  if (!eventDetail) {
    return null;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
        title: eventDetail.title,
        text: eventDetail.title,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Ссылка скопирована");
    }
  };

  const takenPlaces = eventDetail.countPlace || 0;
  const totalPlaces = eventDetail.countPlaceAll || 0;

  return (
    <div className={styles.detail}>
      {eventDetail.title && (
        <div className={styles.titleContainer}>
          <div className={styles.titleTab}>
            <Tab variant="usual" isActive={false}>
              {eventDetail.category}
            </Tab>
            <button
              type="button"
              className={styles.shareButton}
              onClick={handleShare}
              aria-label="Поделиться"
            >
              <ShareIcon />
            </button>
          </div>
          <Title size={24} weight={500}>
            {eventDetail.title}
          </Title>
        </div>
      )}

      {eventDetail.description && (
        <div className={styles.descriptionWrapper}>
          <div
            ref={descriptionRef}
            className={cn(
              styles.description,
              expanded ? styles.expanded : styles.clamped,
            )}
          >
            <Text size={16} weight={500}>
              {eventDetail.description}
            </Text>
          </div>

          {showMore && (
            <button
              type="button"
              className={styles.moreButton}
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? "Скрыть" : "Еще"}
            </button>
          )}
        </div>
      )}

      {eventDetail.startDate && eventDetail.finishRegDate && (
        <div className={styles.schedule}>
          <Title size={18} weight={500}>
            Расписание
          </Title>
          <div className={styles.startBefore}>
            <div className={styles.scheduleItem}>
              <div className={styles.iconWrapper}>
                <CalendarIcon size="24" />
              </div>
              <div className={styles.scheduleInfo}>
                <Caption>Начало</Caption>
                <Text size={16} weight={500}>
                  {eventDetail.startDate}
                </Text>
              </div>
            </div>
            <div className={styles.scheduleItem}>
              <div className={styles.iconWrapper}>
                <InfoIcon />
              </div>
              <div className={styles.scheduleInfo}>
                <Caption>Регистрация до</Caption>
                <Text size={16} weight={500}>
                  {eventDetail.finishRegDate}
                </Text>
              </div>
            </div>
          </div>
        </div>
      )}

      {eventDetail.price !== undefined && (
        <div className={styles.price}>
          <Title size={18} weight={500}>
            Стоимость участия
          </Title>
          {eventDetail.price === 0 ? (
            <Text size={24} weight={500} textColor={ACCENT_COLOR}>
              Бесплатно
            </Text>
          ) : (
            <Text size={24} weight={500}>
              {eventDetail.price} ₽ <span className={styles.caption}>\чел</span>
            </Text>
          )}
        </div>
      )}

      {totalPlaces > 0 && (
        <div className={styles.countPlaceСontainer}>
          <Title size={18} weight={500}>
            Количество мест
          </Title>
          <div className={styles.countPlace}>
            <div className={styles.placeLeft}>
              <p className={styles.caption}>Занято мест</p>
              <p className={styles.caption}>
                {takenPlaces} из {totalPlaces}
              </p>
            </div>
            <ProgressBar items={takenPlaces} itemsAll={totalPlaces} />
            <PlacesLeft taken={takenPlaces} total={totalPlaces} />
          </div>
        </div>
      )}

      {eventDetail.address && (
        <div className={styles.address}>
          <Title size={18} weight={500}>
            Адрес
          </Title>
          <a
            href={eventDetail.addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.addressLink}
          >
            {eventDetail.address}
          </a>
        </div>
      )}

      {action}
    </div>
  );
};
