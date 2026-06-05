import { create } from "zustand";
import type { Pedido } from "../types/entities";

export interface PedidoStore {
  pedidos: Pedido[];
  pedidoAtual: Pedido | null;
  setPedidos: (pedidos: Pedido[]) => void;
  setPedidoAtual: (pedido: Pedido | null) => void;
  addPedido: (pedido: Pedido) => void;
  updatePedido: (id: number, pedido: Partial<Pedido>) => void;
  removePedido: (id: number) => void;
}

export const usePedidoStore = create<PedidoStore>((set) => ({
  pedidos: [],
  pedidoAtual: null,
  
  setPedidos: (pedidos) => set({ pedidos }),
  
  setPedidoAtual: (pedido) => set({ pedidoAtual: pedido }),
  
  addPedido: (pedido) =>
    set((prev) => ({ pedidos: [...prev.pedidos, pedido] })),
  
  updatePedido: (id, pedido) =>
    set((prev) => ({
      pedidos: prev.pedidos.map((p) =>
        p.pedidoId === id ? { ...p, ...pedido } : p
      ),
      pedidoAtual:
        prev.pedidoAtual?.pedidoId === id
          ? { ...prev.pedidoAtual, ...pedido }
          : prev.pedidoAtual,
    })),
  
  removePedido: (id) =>
    set((prev) => ({
      pedidos: prev.pedidos.filter((p) => p.pedidoId !== id),
      pedidoAtual: prev.pedidoAtual?.pedidoId === id ? null : prev.pedidoAtual,
    })),
}));
