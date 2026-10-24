import { useNavigate } from "react-router-dom";
import { getEventDetailRoute } from "../../../../shared/config/routes";
import { CategoryInfo } from "../../../../shared/ui/category-info";
import type { Ad } from "../../model/types";
import styles from "./AdCard.module.css";

export interface AdCardProps {
  ad: Ad;
}

export const AdCard = ({ ad }: AdCardProps) => {
  const navigate = useNavigate();

  const openAd = () => {
    if (ad.url) {
      window.open(ad.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(getEventDetailRoute(ad.id));
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openAd();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openAd();
    }
  };

  return (
    <article
      className={styles.blockWrapper}
      style={{ backgroundImage: ad.img ? `url(${ad.img})` : "none" }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.category}>
        <CategoryInfo>{ad.category}</CategoryInfo>
      </div>
      <div className={styles.adTitle}>{ad.title}</div>
    </article>
  );
};
