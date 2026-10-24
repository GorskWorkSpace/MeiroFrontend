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
import { Filter } from "../../../features/filter";
import { Menu } from "../../../features/menu";
import { SearchEvents } from "../../../features/search-events";
import { useMediaQuery } from "../../../shared/lib/hooks/useMediaQuery";
import styles from "./Header.module.css";

export const Header = () => {
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery("(min-width: 1020px)");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedCity = useAppSelector(selectSelectedCity);
  const loading = useAppSelector(selectCityLoading);

  useEffect(() => {
    dispatch(fetchUserCityThunk());
  }, [dispatch]);

  const Logo = isDesktop ? "h1" : "p";

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Logo className={styles.logo}>MEIRO</Logo>

        {/* На мобильных поиск, фильтр и меню находятся в нижней панели */}
        {isDesktop && (
          <div className={styles.search}>
            <SearchEvents />
          </div>
        )}

        <div className={styles.actions}>
          {loading && !selectedCity ? (
            <CityBadgeSkeleton />
          ) : (
            <CityBadge onClick={() => setIsModalOpen(true)}>
              {selectedCity?.cityName || "Выберите город"}
            </CityBadge>
          )}
          {isDesktop && (
            <>
              <Filter />
              <Menu />
            </>
          )}
        </div>
      </div>
      <ChangeCityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
};
