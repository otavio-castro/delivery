import { create } from "zustand";
import type { Restaurante } from "../types/entities";

export interface RestaurantesStore {
  restaurantes: Restaurante[];
  setRestaurantes: (restaurantes: Restaurante[]) => void;
  addRestaurante: (restaurante: Restaurante) => void;
  updateRestaurante: (id: number, restaurante: Partial<Restaurante>) => void;
  removeRestaurante: (id: number) => void;
}

export const useRestaurantesStore = create<RestaurantesStore>((set) => ({
  restaurantes: [],
  setRestaurantes: (restaurantes) => set({ restaurantes }),
  addRestaurante: (restaurante) =>
    set((prev) => ({ restaurantes: [...prev.restaurantes, restaurante] })),
  updateRestaurante: (id, restaurante) =>
    set((prev) => ({
      restaurantes: prev.restaurantes.map((r) =>
        r.restauranteId === id ? { ...r, ...restaurante } : r
      ),
    })),
  removeRestaurante: (id) =>
    set((prev) => ({
      restaurantes: prev.restaurantes.filter((r) => r.restauranteId !== id),
    })),
}));
