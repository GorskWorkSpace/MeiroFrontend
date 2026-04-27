export interface Category {
  categoryId: string;
  name: string;
}

export interface getCategoriesResponse {
  categories: Category[];
}
