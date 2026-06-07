import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cliente } from "../types/entities";

interface AuthStore {
  clienteLogado: Cliente | null;
  login: (cliente: Cliente) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      clienteLogado: null,
      login: (cliente) => set({ clienteLogado: cliente }),
      logout: () => set({ clienteLogado: null }),
    }),
    {
      name: "delivery-app:auth",
    }
  )
);
