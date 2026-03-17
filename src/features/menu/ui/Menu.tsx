import { MenuIcon } from "../../../shared/assets";
import styles from "./Menu.module.css";

interface MenuProps {
  onClick?: () => void;
}

export const Menu = ({ onClick }: MenuProps) => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <div className={styles.iconWrapper} onClick={handleClick}>
      <MenuIcon />
    </div>
  );
};
