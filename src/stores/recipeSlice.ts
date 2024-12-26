import { StateCreator } from "zustand";
import { getCategories, getRecipies } from "../services/RecipeService";
import { Categories, Drinks, SearchFilter } from "../types";

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipies(filters);
    set({ drinks });
  },
});
