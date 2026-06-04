import axios from "axios";
import type { Restaurante } from "../types/entities";

export const API_BASE_URL = "https://localhost:7007";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  restaurantes: {
    getAll: async (categoria?: string): Promise<Restaurante[]> => {
      const { data } = await axiosInstance.get<Restaurante[]>("/api/restaurantes", {
        params: categoria ? { categoria } : undefined,
      });
      return data;
    },
    getById: async (id: number): Promise<Restaurante> => {
      const { data } = await axiosInstance.get<Restaurante>(`/api/restaurantes/${id}`);
      return data;
    },
    create: async (restaurante: Omit<Restaurante, "restauranteId" | "nota" | "ativo">): Promise<Restaurante> => {
      const { data } = await axiosInstance.post<Restaurante>("/api/restaurantes", restaurante);
      return data;
    },
    update: async (id: number, restaurante: Omit<Restaurante, "restauranteId" | "nota" | "ativo">): Promise<Restaurante> => {
      const { data } = await axiosInstance.put<Restaurante>(`/api/restaurantes/${id}`, restaurante);
      return data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/restaurantes/${id}`);
    },
  },
};
