import { useNavigate } from "react-router-dom";
import { CategoryInfo } from "../../../../shared/ui/category-info";
import type { Ad } from "../../model/types";
import styles from "./AdCard.module.css";

export interface AdCardProps {
  ad: Ad;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (ad.url) {
      window.open(ad.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(`/event/${ad.id}`);
    }
  };

  return (
    <div
      className={styles.blockWrapper}
      style={{ backgroundImage: ad.img ? `url(${ad.img})` : "none" }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick(e as any);
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
