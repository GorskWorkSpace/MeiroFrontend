import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import {
  changeCityThunk,
  fetchAllCitiesThunk,
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
  const [searchTerm, setSearchTerm] = useState("");
  const { cities = [], loading } = useAppSelector((state) => state.city);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchAllCitiesThunk());
    }
  }, [isOpen, dispatch]);

  const filteredCities = useMemo(() => {
    if (!cities || !Array.isArray(cities)) {
      return [];
    }

    if (!searchTerm.trim()) return cities;

    return cities.filter((city) =>
      city?.cityName?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, cities]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleCitySelect = (cityId: string, cityName: string) => {
    if (cityId && cityName) {
      dispatch(changeCityThunk(cityId));
      localStorage.setItem("selectedCity", cityName);
      onClose();
    }
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
          onChange={handleSearchChange}
          onClear={clearSearch}
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
