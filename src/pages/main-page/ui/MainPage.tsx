import { AdsCarousel } from "../../../features/ads-carousel";
import { EventsList } from "../../../features/events-list";
import { SoonEventsList } from "../../../features/soon-events-list/";

import { Header } from "../../../widgets/header";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <Header />
      <AdsCarousel
        autoPlay={true}
        infinite={true}
        limit={10}
        onAdClick={(ad) => console.log("Ad clicked:", ad)}
      />
      <SoonEventsList />
      <EventsList />
    </div>
  );
};
