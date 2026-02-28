export const saveToStorage = (cityId: string, cityName: string) => {
  localStorage.setItem("selectedCityId", cityId);
  localStorage.setItem("selectedCity", cityName);
};