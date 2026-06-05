import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Produto } from "../types/entities";

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

export interface CarrinhoStore {
  itens: ItemCarrinho[];
  restauranteId: number | null;
  addItem: (produto: Produto, quantidade?: number) => void;
  removeItem: (produtoId: number) => void;
  updateQuantidade: (produtoId: number, quantidade: number) => void;
  clear: () => void;
  getTotal: () => number;
  getQuantidadeTotal: () => number;
}

export const useCarrinhoStore = create<CarrinhoStore>()(
  persist(
    (set, get) => ({
      itens: [],
      restauranteId: null,

      addItem: (produto, quantidade = 1) => {
        set((state) => {
          // Se é de outro restaurante, limpa o carrinho
          if (state.restauranteId && state.restauranteId !== produto.restauranteId) {
            return {
              itens: [{ produto, quantidade }],
              restauranteId: produto.restauranteId,
            };
          }

          // Verifica se produto já existe
          const itemExistente = state.itens.find(
            (item) => item.produto.produtoId === produto.produtoId
          );

          if (itemExistente) {
            return {
              itens: state.itens.map((item) =>
                item.produto.produtoId === produto.produtoId
                  ? { ...item, quantidade: item.quantidade + quantidade }
                  : item
              ),
              restauranteId: produto.restauranteId,
            };
          }

          return {
            itens: [...state.itens, { produto, quantidade }],
            restauranteId: produto.restauranteId,
          };
        });
      },

      removeItem: (produtoId) => {
        set((state) => {
          const novosItens = state.itens.filter(
            (item) => item.produto.produtoId !== produtoId
          );
          return {
            itens: novosItens,
            restauranteId: novosItens.length > 0 ? state.restauranteId : null,
          };
        });
      },

      updateQuantidade: (produtoId, quantidade) => {
        if (quantidade <= 0) {
          get().removeItem(produtoId);
          return;
        }

        set((state) => ({
          itens: state.itens.map((item) =>
            item.produto.produtoId === produtoId
              ? { ...item, quantidade }
              : item
          ),
        }));
      },

      clear: () => {
        set({ itens: [], restauranteId: null });
      },

      getTotal: () => {
        return get().itens.reduce(
          (total, item) => total + item.produto.preco * item.quantidade,
          0
        );
      },

      getQuantidadeTotal: () => {
        return get().itens.reduce((total, item) => total + item.quantidade, 0);
      },
    }),
    {
      name: "carrinho-storage",
    }
  )
);
