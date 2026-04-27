import { baseApi } from "../../../shared/api/baseApi";
import type { getCategoriesResponse } from "./dto";

export const getAllCategories = async () => {
  const response = await baseApi.get<getCategoriesResponse>("/category/all");

  return response.data;
};
