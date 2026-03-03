import { AdsDisplay } from "../../../features/ads-display";
import { Header } from "../../../widgets/header";
import styles from './MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={styles.mainPage}>
      <Header />
      <AdsDisplay 
        autoPlay={true}
        infinite={true}
        limit={10}
        onAdClick={(ad) => console.log('Ad clicked:', ad)}
      />
    </div>
  );
};