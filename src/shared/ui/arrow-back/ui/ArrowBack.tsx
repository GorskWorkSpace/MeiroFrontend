import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "../../../assets/icons/ArrowLeft";
import { ROUTES } from "../../../config/routes";
import styles from "./ArrowBack.module.css";

interface ArrowBackProps {
  color?: string;
  size?: string;
  fallbackPath?: string;
}

export const ArrowBack = ({
  color = "var(--icon-color)",
  size = "24",
  fallbackPath = ROUTES.main,
}: ArrowBackProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  };

  return (
    <button
      type="button"
      className={styles.backButton}
      onClick={handleBack}
      aria-label="Назад"
    >
      <ArrowLeft color={color} size={size} />
    </button>
  );
};
