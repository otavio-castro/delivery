import { create } from "zustand";
import type { Produto } from "../types/entities";

export interface ProdutosStore {
  produtos: Produto[];
  setProdutos: (produtos: Produto[]) => void;
  addProduto: (produto: Produto) => void;
  updateProduto: (id: number, produto: Partial<Produto>) => void;
  removeProduto: (id: number) => void;
  getProdutosByRestaurante: (restauranteId: number) => Produto[];
}

export const useProdutosStore = create<ProdutosStore>((set, get) => ({
  produtos: [],
  
  setProdutos: (produtos) => set({ produtos }),
  
  addProduto: (produto) =>
    set((prev) => ({ produtos: [...prev.produtos, produto] })),
  
  updateProduto: (id, produto) =>
    set((prev) => ({
      produtos: prev.produtos.map((p) =>
        p.produtoId === id ? { ...p, ...produto } : p
      ),
    })),
  
  removeProduto: (id) =>
    set((prev) => ({
      produtos: prev.produtos.filter((p) => p.produtoId !== id),
    })),
  
  getProdutosByRestaurante: (restauranteId) => {
    return get().produtos.filter((p) => p.restauranteId === restauranteId);
  },
}));
