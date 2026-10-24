import { AdsCarousel } from "../../../features/ads-carousel";
import { EventsList } from "../../../features/events-list";
import { SoonEventsList } from "../../../features/soon-events-list";
import { Seo } from "../../../shared/ui/seo";
import { Header } from "../../../widgets/header";
import { MainFooter } from "../../../widgets/main-footer";
import styles from "./MainPage.module.css";

export const MainPage = () => {
  return (
    <>
      <Seo title="Главная" description="" />
      <div className={styles.mainPage}>
        <Header />
        <main className={styles.content}>
          <AdsCarousel limit={10} />
          <SoonEventsList />
          <EventsList listTitle="Мероприятия для вас" />
        </main>
        <MainFooter />
      </div>
    </>
  );
};
