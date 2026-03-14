import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  CityBadge,
  CityBadgeSkeleton,
  fetchUserCityThunk,
  selectCityLoading,
  selectSelectedCity,
} from "../../../entities/city";
import { ChangeCityModal } from "../../../features/change-city";
import styles from "./Header.module.css";

export const Header = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedCity = useAppSelector(selectSelectedCity);
  const loading = useAppSelector(selectCityLoading);

  useEffect(() => {
    dispatch(fetchUserCityThunk());
  }, [dispatch]);

  const getCityDisplay = () => {
    if (selectedCity?.cityName) {
      return selectedCity.cityName;
    }
    return localStorage.getItem("selectedCity") || "Выберите город";
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <p className={styles.logo}>MEIRO</p>
        {loading && !selectedCity && !localStorage.getItem("selectedCity") ? (
          <CityBadgeSkeleton />
        ) : (
          <CityBadge onClick={() => setIsModalOpen(true)}>
            {getCityDisplay()}
          </CityBadge>
        )}
      </div>
      <ChangeCityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
