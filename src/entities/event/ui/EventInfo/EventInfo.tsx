import { useAppSelector } from "../../../../app/store/hooks";
import { CalendarIcon, InfoIcon } from "../../../../shared/assets";
import { ShareIcon } from "../../../../shared/assets/icons/ShareIcon";
import { Caption } from "../../../../shared/ui/caption";
import { ProgressBar } from "../../../../shared/ui/progress-bar";
import { Tab } from "../../../../shared/ui/tab";
import { Text } from "../../../../shared/ui/text";
import { Title } from "../../../../shared/ui/title";
import { selectEventDetail } from "../../model/eventSlice";
import { SignUpEvent } from "../../../../features/sign-up-event/ui/SignUpEvent";
import styles from "./EventInfo.module.css";

export const EventInfo = () => {
  const eventDetail = useAppSelector(selectEventDetail);
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        url: window.location.href,
        title: eventDetail?.title,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Ссылка скопирована");
    }
  };
  if (!eventDetail) {
    return null;
  }

  return (
    <div className={styles.detail}>
      {eventDetail.title && (
        <div className={styles.titleContainer}>
          <div className={styles.titleTab}>
            <Tab
              variant="usual"
              isActive={false}
              children={eventDetail.category}
            />

            <ShareIcon onClick={handleShare} />
          </div>
          <Title size={24} weight={500}>
            {eventDetail.title}
          </Title>
        </div>
      )}

      {eventDetail.description && (
        <Text size={16} weight={500}>
          {eventDetail.description}
        </Text>
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

      {eventDetail.price !== 0 && (
        <div className={styles.price}>
          <Title size={18} weight={500}>
            Стоимость участия
          </Title>
          <Text size={24} weight={500}>
            {eventDetail.price} ₽ <span className={styles.caption}>\чел</span>
          </Text>
        </div>
      )}

      {eventDetail.price === 0 && (
        <div className={styles.price}>
          <Title size={18} weight={500}>
            Стоимость участия
          </Title>
          <Text size={24} weight={500} textColor="#554FFD">
            Бесплатно
          </Text>
        </div>
      )}

      {eventDetail.countPlaceAll !== 0 && (
        <div className={styles.countPlaceСontainer}>
          <Title size={18} weight={500}>
            Количество мест
          </Title>
          <div className={styles.countPlace}>
            <div className={styles.placeLeft}>
              <p className={styles.caption}>Занято мест</p>
              <p className={styles.caption}>
                {eventDetail.countPlace} из {eventDetail.countPlaceAll}
              </p>
            </div>
            <ProgressBar
              items={eventDetail.countPlace || 0}
              itemsAll={eventDetail.countPlaceAll || 0}
            />
            {(() => {
              const left =
                (eventDetail.countPlaceAll || 0) -
                (eventDetail.countPlace || 0);
              const isLessThanHalf =
                left < (eventDetail.countPlaceAll || 0) / 2;
              const textColor = isLessThanHalf ? "#F84A00" : "#00A55E";
              const equal =
                eventDetail.countPlace === eventDetail.countPlaceAll;

              if (equal) {
                return (
                  <Text textColor={textColor} size={14} weight={500}>
                    Мест нет
                  </Text>
                );
              }
              return (
                <Text textColor={textColor} size={14} weight={500}>
                  {isLessThanHalf
                    ? `Осталось всего ${left} мест`
                    : `Осталось ${left} мест`}
                </Text>
              );
            })()}
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
      <SignUpEvent />
    </div>
  );
};
