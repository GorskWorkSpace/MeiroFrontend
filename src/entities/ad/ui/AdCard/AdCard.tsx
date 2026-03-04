import styles from './AdCard.module.css';
import type { Ad } from '../../model/types';
import { CategoryInfo } from '../../../../shared/ui/category-info';

export interface AdCardProps {
  ad: Ad;
  onClick?: (ad: Ad) => void;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(ad);
    } else if (ad.url) {
      window.open(ad.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div 
      className={styles.blockWrapper} 
      style={{ backgroundImage: `url(${ad.img})` }} 
      onClick={handleClick}
      role={ad.url ? "link" : "article"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className={styles.category}>
        <CategoryInfo>{ad.category}</CategoryInfo> 
      </div>
      <div className={styles.adTitle}>{ad.title}</div> 
    </div>
  );
};