import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  clearEventDetail,
  EventInfo,
  fetchEventByIdThunk,
  selectEventDetail,
  selectEventDetailLoading,
} from "../../../entities/event";
import { EventsList } from "../../../features/events-list";
import { FavouriteButton } from "../../../features/favourite";
import { SignUpEvent } from "../../../features/sign-up-event";
import { ArrowLeftIcon } from "../../../shared/assets";
import { ROUTES } from "../../../shared/config/routes";
import { Button } from "../../../shared/ui/button";
import { Carousel } from "../../../shared/ui/carousel";
import { Text } from "../../../shared/ui/text";
import { Title } from "../../../shared/ui/title";
import styles from "./EventDetail.module.css";
import { EventDetailSkeleton } from "./skeleton/EventDetailSkeleton";

export const EventDetail = () => {
  const { eventId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const eventDetail = useAppSelector(selectEventDetail);
  const isLoading = useAppSelector(selectEventDetailLoading);

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventByIdThunk(eventId));
    }

    return () => {
      dispatch(clearEventDetail());
    };
  }, [dispatch, eventId]);

  if (isLoading) {
    return <EventDetailSkeleton />;
  }

  if (!eventDetail) {
    return (
      <div className={styles.notFound}>
        <Title size={16} weight={400}>
          Error 404
        </Title>{" "}
        <Text size={16} weight={400}>
          Событие не найдено
        </Text>
        <Button onClick={() => navigate(ROUTES.main)}>
          Вернуться на главную
        </Button>
      </div>
    );
  }

  const images = eventDetail.imgs ?? [];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(ROUTES.main);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.headerContainer}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleGoBack}
          aria-label="Назад"
        >
          <ArrowLeftIcon />
        </button>
        <h1 className={styles.logo} onClick={() => navigate(ROUTES.main)}>
          MEIRO
        </h1>
        <div className={styles.favourite}>
          <FavouriteButton
            eventId={eventDetail.id}
            isFavourite={eventDetail.isFavourite ?? false}
          />
        </div>
      </header>
      <main>
        <div className={styles.content}>
          {images.length > 0 && (
            <figure className={styles.gallery}>
              <Carousel
                items={images}
                renderItem={(img) => (
                  <img
                    src={img}
                    alt={eventDetail.title}
                    className={styles.image}
                  />
                )}
                spaceBetween={8}
                slidesPerView={1}
                loop={false}
                autoplay={false}
                slideClassName={styles.slide}
                className={styles.carouselContainer}
              />
            </figure>
          )}
          <EventInfo action={<SignUpEvent />} />
        </div>
        <div className={styles.others}>
          <EventsList listTitle="Другие мероприятия" />
        </div>
      </main>
    </div>
  );
};
