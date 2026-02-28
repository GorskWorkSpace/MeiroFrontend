import { useState } from "react";

import { CityBadge } from "../../../entities/city";
import styles from "./Header.module.css";
import { ChangeCityModal } from "../../../features/change-city";
import { useAppSelector } from "../../../app/store/hooks";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedCity = useAppSelector((state) => state.city.selectedCity);

  return (
    <div>
      <div className={styles.headerContainer}>
        <p className={styles.logo}>MEIRO</p>
        <CityBadge onClick={() => setIsModalOpen(true)}>
          {selectedCity?.cityName || localStorage.getItem("selectedCity") || "Выберите город"}
        </CityBadge>
      </div>
      <ChangeCityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};