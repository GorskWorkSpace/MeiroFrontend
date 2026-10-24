import { useEffect } from "react";
import { fetchAllCategories } from "../../entities/category";
import { useAppDispatch } from "../store/hooks";

interface InitialProjectProviderProps {
  children: React.ReactNode;
}

/** Загружает справочники, нужные всему приложению */
export const InitialProjectProvider = ({
  children,
}: InitialProjectProviderProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return <>{children}</>;
};
