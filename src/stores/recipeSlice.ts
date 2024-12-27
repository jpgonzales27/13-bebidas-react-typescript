import { StateCreator } from "zustand";
import { getCategories, getRecipeById, getRecipies } from "../services/RecipeService";
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilter: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink["idDrink"]) => void;
};

export const createRecipesSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as Recipe,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipes: async (filters) => {
    const drinks = await getRecipies(filters);
    set({ drinks });
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);
    set({ selectedRecipe });
  },
});
