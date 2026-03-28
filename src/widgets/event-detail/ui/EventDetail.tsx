import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  clearEventDetail,
  EventInfo,
  fetchEventByIdThunk,
  selectAllEvents,
  selectEventDetail,
} from "../../../entities/event";
import { EventsList } from "../../../features/events-list";
import { FavouriteButton } from "../../../features/favourite";
import { ArrowLeftIcon } from "../../../shared/assets";
import { Carousel } from "../../../shared/ui/carousel/Carousel";
import styles from "./EventDetail.module.css";
import { Title } from "../../../shared/ui/title";
import { Text } from "../../../shared/ui/text";
import { Button } from "../../../shared/ui/button";
import { selectIsLoading } from "../../../entities/event/model/eventSlice";
import { EventDatailSkeleton } from "./skeleton/EventDatailSkeleton";

export const EventDetail = () => {
  const { eventId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const eventDetail = useAppSelector(selectEventDetail);
  const allEvents = useAppSelector(selectAllEvents);
  const isLoading = useAppSelector(selectIsLoading);

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

  if (isLoading) {
    return <EventDatailSkeleton />;
  }

  if (!eventDetail && !isLoading) {
    return (
      <div className={styles.notFound}>
        <Title size={16} weight={400}>
          Error 404
        </Title>{" "}
        <Text size={16} weight={400}>
          Событие не найдено
        </Text>
        <Button onClick={() => navigate("/")}>Вернуться на главную</Button>
      </div>
    );
  }

  const images = (eventDetail && eventDetail.imgs) || [];

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
              <img
                src={img}
                alt={(eventDetail && eventDetail.title) || ""}
                className={styles.image}
              />
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
      <div className={styles.others}>
        <EventsList listTitle="Другие мероприятия" />
      </div>
    </div>
  );
};
