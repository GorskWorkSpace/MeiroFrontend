import type { Category } from "./types";

// id совпадает с названием, чтобы моковая фильтрация событий работала по event.category
export const categoryMocks: Category[] = [
  { categoryId: "Юмор", name: "Юмор" },
  { categoryId: "Концерт", name: "Концерт" },
  { categoryId: "Спектакль", name: "Спектакль" },
  { categoryId: "Еда", name: "Еда" },
];
