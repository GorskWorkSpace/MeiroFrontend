import { AdsCarousel } from "../../../features/ads-carousel";
import { EventsList } from "../../../features/events-list";
import { SoonEventsList } from "../../../features/soon-events-list/";

import { Header } from "../../../widgets/header";
import { MainFooter } from "../../../widgets/main-footer";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <Header />
      <AdsCarousel autoPlay={true} infinite={true} limit={10} />
      <SoonEventsList />
      <EventsList listTitle="Мероприятия для вас" />
      <MainFooter />
    </div>
  );
};
