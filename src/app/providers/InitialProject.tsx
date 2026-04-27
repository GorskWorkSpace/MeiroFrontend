import { useEffect } from "react";
import { fetchAllCategories } from "../../entities/Category/model/categoryThunks";
import { useAppDispatch } from "../store/hooks";

interface InitialProjectProviderProps {
  children: React.ReactNode;
}

export const InitialProjectProvider = ({
  children,
}: InitialProjectProviderProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  return <>{children}</>;
};
