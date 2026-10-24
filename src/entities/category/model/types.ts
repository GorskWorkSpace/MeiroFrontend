import type { CategoryDto } from "../api/dto";

export type Category = CategoryDto;

export interface CategoryState {
  categories: Category[];
}
