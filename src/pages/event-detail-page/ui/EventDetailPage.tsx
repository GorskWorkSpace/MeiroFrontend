import { DetailFooter } from "../../../widgets/detail-footer";
import { EventDetail } from "../../../widgets/event-detail";
import { Seo } from "../../../shared/ui/Seo/seo";
import { useAppSelector } from "../../../app/store/hooks";
import { selectEventDetail } from "../../../entities/event";
import { EventDatailSkeleton } from "../../../widgets/event-detail/ui/skeleton/EventDatailSkeleton";

import styles from "./EventDetailPage.module.css";

export const EventDetailPage = () => {
  const eventDetail = useAppSelector(selectEventDetail);

  if (!eventDetail) {
    return (
      <>
        <Seo
          title="Мероприятие"
          description="Загрузка информации о мероприятии"
        />
        <EventDatailSkeleton />
      </>
    );
  }

  const previewImage = eventDetail.imgs?.[0];

  return (
    <>
      <Seo
        title={eventDetail.title}
        description={eventDetail.description || eventDetail.title}
        image={previewImage}
      />
      <div className={styles.container}>
        <EventDetail />
        <DetailFooter />
      </div>
    </>
  );
};
