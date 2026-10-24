import { baseApi } from "../../../shared/api/baseApi";
import { USE_MOCKS } from "../../../shared/config/mocks";
import { delay } from "../../../shared/lib/delay";
import { categoryMocks } from "../model/mocks";
import type { GetCategoriesResponse } from "./dto";

export const getAllCategories = async (): Promise<GetCategoriesResponse> => {
  if (USE_MOCKS) {
    await delay(300);
    return { categories: categoryMocks };
  }

  const { data } = await baseApi.get<GetCategoriesResponse>("/category/all");
  return data;
};
