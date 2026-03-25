import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "../../assets/icons/ArrowLeft";
import styles from "./ArrowBack.module.css";

interface ArrowBackProps {
  color?: string;
  size?: string;
  fallbackPath?: string;
}

export const ArrowBack = ({
  color = "var(--icon-color)",
  size = "24",
  fallbackPath = "/",
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
    <button className={styles.ArrowBack} onClick={handleBack}>
      <ArrowLeft color={color} size={size} />
    </button>
  );
};
