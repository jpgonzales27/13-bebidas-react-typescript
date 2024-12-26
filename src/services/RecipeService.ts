import axios from "axios";
import { CategoriesAPIResponseSchema, DrinksAPIResponse } from "../schemas/recipes-schema";
import { SearchFilter } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios.get(url);
  const result = CategoriesAPIResponseSchema.safeParse(data);
  if (result.success) {
    return result.data;
  }
}

export async function getRecipies(filters: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;
  const { data } = await axios(url);
  console.log(data);
  const result = DrinksAPIResponse.safeParse(data);
  console.log(result);
  if (result.success) {
    return result.data;
  }
}
