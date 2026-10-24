import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  changeCityThunk,
  fetchAllCitiesThunk,
  selectAllCities,
  selectCityLoading,
} from "../../../../entities/city";
import { Input } from "../../../../shared/ui/input";
import { Modal } from "../../../../shared/ui/modal";
import { CityList } from "../CityList/CityList";
import { CityListSkeleton } from "../CityListSkeleton/CityListSkeleton";
import styles from "./ChangeCityModal.module.css";

interface ChangeCityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeCityModal = ({ isOpen, onClose }: ChangeCityModalProps) => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector(selectAllCities);
  const loading = useAppSelector(selectCityLoading);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchAllCitiesThunk());
    }
  }, [isOpen, dispatch]);

  const filteredCities = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return cities;

    return cities.filter((city) =>
      city.cityName?.toLowerCase().includes(query),
    );
  }, [searchTerm, cities]);

  const handleCitySelect = (cityId: string) => {
    dispatch(changeCityThunk(cityId));
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Выберите город"
      component={
        <Input
          placeholder="Поиск..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className={styles.innerWrapper}>
        {loading ? (
          <CityListSkeleton />
        ) : (
          <CityList onCitySelect={handleCitySelect} cities={filteredCities} />
        )}
      </div>
    </Modal>
  );
};
