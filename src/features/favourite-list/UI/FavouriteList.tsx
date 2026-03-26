import { useEffect } from "react";
import { useAppDispatch } from "../../../app/store/hooks";
import { EventList } from "../../../entities/event/ui/EventList";
import { Title } from "../../../shared/ui/title";
import styles from "./FavouriteList.module.css";
import { fetchAllEventsFavouriteThunk } from "../../../entities/event/model/eventThunks";

export const FavouriteList = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllEventsFavouriteThunk());
  }, []);

  return (
    <div className={styles.container}>
      <Title className={styles.head}>Избранные мероприятия</Title>
      <EventList />
    </div>
  );
};
