import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  clearEventDetail,
  EventInfo,
  fetchEventByIdThunk,
  selectAllEvents,
  selectEventDetail,
  selectEventsLoading,
} from "../../../entities/event";
import { FavouriteButton } from "../../../features/favourite";
import { ArrowLeftIcon } from "../../../shared/assets";
import { Carousel } from "../../../shared/ui/carousel/Carousel";
import styles from "./EventDetail.module.css";

export const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const eventDetail = useAppSelector(selectEventDetail);
  const allEvents = useAppSelector(selectAllEvents);
  const loading = useAppSelector(selectEventsLoading);

  const event = allEvents.find((e) => e.id === eventId);
  const isFavourite = event?.isFavourite || false;

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventByIdThunk(eventId));
    }

    return () => {
      dispatch(clearEventDetail());
    };
  }, [dispatch, eventId]);

  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (!eventDetail) {
    return <div className={styles.notFound}>Событие не найдено</div>;
  }

  const images = eventDetail.imgs || [];

  return (
    <div>
      <div className={styles.headerContainer}>
        <ArrowLeftIcon onClick={() => navigate("/")} />
        <p className={styles.logo}>MEIRO</p>
        <FavouriteButton eventId={eventId!} isFavourite={isFavourite} />
      </div>

      {images.length > 0 && (
        <Carousel
          items={images}
          renderItem={(img) => (
            <div className={styles.imageSlide}>
              <img src={img} alt={eventDetail.title} className={styles.image} />
            </div>
          )}
          spaceBetween={8}
          slidesPerView={1}
          loop={false}
          autoplay={false}
          slideClassName={styles.slide}
          className={styles.carouselContainer}
        />
      )}

      <EventInfo />
      <div className={styles.others}></div>
    </div>
  );
};
