export interface CategoryDto {
  categoryId: string;
  name: string;
}

export interface GetCategoriesResponse {
  categories: CategoryDto[];
}
