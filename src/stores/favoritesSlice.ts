import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFavoritesFromLocalStorage: () => void;
};

// export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter((fav) => fav.idDrink !== recipe.idDrink),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se eliminó de favoritos",
        error: false,
      });
    } else {
      set((state) => ({
        favorites: [...state.favorites, recipe],
        // favorites: [ ...get().favorites, recipe]
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se agregó a favoritos",
        error: false,
      });
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists(id) {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFavoritesFromLocalStorage: () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      set({ favorites: JSON.parse(favorites) });
    }
  },
});
