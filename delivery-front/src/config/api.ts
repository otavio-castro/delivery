import axios from "axios";
import type { 
  Restaurante, 
  Produto, 
  Cliente, 
  Pedido, 
  ItemPedido, 
  Endereco, 
  Entregador, 
  Pagamento 
} from "../types/entities";

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

  produtos: {
    getAll: async (restauranteId?: number): Promise<Produto[]> => {
      const { data } = await axiosInstance.get<Produto[]>("/api/produtos", {
        params: restauranteId ? { restauranteId } : undefined,
      });
      return data;
    },
    getById: async (id: number): Promise<Produto> => {
      const { data } = await axiosInstance.get<Produto>(`/api/produtos/${id}`);
      return data;
    },
    create: async (produto: Omit<Produto, "produtoId" | "disponivel">): Promise<Produto> => {
      const { data } = await axiosInstance.post<Produto>("/api/produtos", produto);
      return data;
    },
    update: async (id: number, produto: Omit<Produto, "produtoId" | "disponivel">): Promise<Produto> => {
      const { data } = await axiosInstance.put<Produto>(`/api/produtos/${id}`, produto);
      return data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/produtos/${id}`);
    },
    alterarDisponibilidade: async (id: number, disponivel: boolean): Promise<void> => {
      await axiosInstance.patch(`/api/produtos/${id}/disponibilidade`, { disponivel });
    },
  },

  clientes: {
    getAll: async (): Promise<Cliente[]> => {
      const { data } = await axiosInstance.get<Cliente[]>("/api/clientes");
      return data;
    },
    getById: async (id: number): Promise<Cliente> => {
      const { data } = await axiosInstance.get<Cliente>(`/api/clientes/${id}`);
      return data;
    },
    create: async (cliente: Omit<Cliente, "clienteId" | "dataCadastro">): Promise<Cliente> => {
      const { data } = await axiosInstance.post<Cliente>("/api/clientes", cliente);
      return data;
    },
    update: async (id: number, cliente: Omit<Cliente, "clienteId" | "dataCadastro">): Promise<Cliente> => {
      const { data } = await axiosInstance.put<Cliente>(`/api/clientes/${id}`, cliente);
      return data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/clientes/${id}`);
    },
  },

  enderecos: {
    getAll: async (clienteId?: number): Promise<Endereco[]> => {
      const { data } = await axiosInstance.get<Endereco[]>("/api/enderecos", {
        params: clienteId ? { clienteId } : undefined,
      });
      return data;
    },
    getById: async (id: number): Promise<Endereco> => {
      const { data } = await axiosInstance.get<Endereco>(`/api/enderecos/${id}`);
      return data;
    },
    create: async (endereco: Omit<Endereco, "enderecoId">): Promise<Endereco> => {
      const { data } = await axiosInstance.post<Endereco>("/api/enderecos", endereco);
      return data;
    },
    update: async (id: number, endereco: Omit<Endereco, "enderecoId">): Promise<Endereco> => {
      const { data } = await axiosInstance.put<Endereco>(`/api/enderecos/${id}`, endereco);
      return data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/enderecos/${id}`);
    },
  },

  pedidos: {
    getAll: async (params?: { status?: string; restauranteId?: number; clienteId?: number }): Promise<Pedido[]> => {
      const { data } = await axiosInstance.get<Pedido[]>("/api/pedidos", { params });
      return data;
    },
    getById: async (id: number): Promise<Pedido> => {
      const { data } = await axiosInstance.get<Pedido>(`/api/pedidos/${id}`);
      return data;
    },
    create: async (pedido: Omit<Pedido, "pedidoId" | "status" | "dataPedido" | "dataAtualizacao">): Promise<Pedido> => {
      const { data } = await axiosInstance.post<Pedido>("/api/pedidos", pedido);
      return data;
    },
    update: async (id: number, pedido: Partial<Pedido>): Promise<Pedido> => {
      const { data } = await axiosInstance.put<Pedido>(`/api/pedidos/${id}`, pedido);
      return data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/pedidos/${id}`);
    },
    atualizarStatus: async (id: number, status: string): Promise<void> => {
      await axiosInstance.patch(`/api/pedidos/${id}/status`, { status });
    },
    atribuirEntregador: async (id: number, entregadorId: number): Promise<void> => {
      await axiosInstance.patch(`/api/pedidos/${id}/entregador`, { entregadorId });
    },
  },

  itensPedido: {
    getAll: async (pedidoId?: number): Promise<ItemPedido[]> => {
      const { data } = await axiosInstance.get<ItemPedido[]>("/api/itenspedido", {
        params: pedidoId ? { pedidoId } : undefined,
      });
      return data;
    },
    getById: async (id: number): Promise<ItemPedido> => {
      const { data } = await axiosInstance.get<ItemPedido>(`/api/itenspedido/${id}`);
      return data;
    },
    create: async (item: Omit<ItemPedido, "itemPedidoId">): Promise<ItemPedido> => {
      const { data } = await axiosInstance.post<ItemPedido>("/api/itenspedido", item);
      return data;
    },
    update: async (id: number, item: Omit<ItemPedido, "itemPedidoId">): Promise<ItemPedido> => {
      const { data } = await axiosInstance.put<ItemPedido>(`/api/itenspedido/${id}`, item);
      return data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/itenspedido/${id}`);
    },
  },

  entregadores: {
    getAll: async (): Promise<Entregador[]> => {
      const { data } = await axiosInstance.get<Entregador[]>("/api/entregadores");
      return data;
    },
    getById: async (id: number): Promise<Entregador> => {
      const { data } = await axiosInstance.get<Entregador>(`/api/entregadores/${id}`);
      return data;
    },
    create: async (entregador: Omit<Entregador, "entregadorId" | "disponivel">): Promise<Entregador> => {
      const { data } = await axiosInstance.post<Entregador>("/api/entregadores", entregador);
      return data;
    },
    update: async (id: number, entregador: Omit<Entregador, "entregadorId" | "disponivel">): Promise<Entregador> => {
      const { data } = await axiosInstance.put<Entregador>(`/api/entregadores/${id}`, entregador);
      return data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/entregadores/${id}`);
    },
    alterarDisponibilidade: async (id: number, disponivel: boolean): Promise<void> => {
      await axiosInstance.patch(`/api/entregadores/${id}/disponibilidade`, { disponivel });
    },
  },

  pagamentos: {
    getAll: async (pedidoId?: number): Promise<Pagamento[]> => {
      const { data } = await axiosInstance.get<Pagamento[]>("/api/pagamentos", {
        params: pedidoId ? { pedidoId } : undefined,
      });
      return data;
    },
    getById: async (id: number): Promise<Pagamento> => {
      const { data } = await axiosInstance.get<Pagamento>(`/api/pagamentos/${id}`);
      return data;
    },
    create: async (pagamento: Omit<Pagamento, "pagamentoId" | "status" | "dataPagamento">): Promise<Pagamento> => {
      const { data } = await axiosInstance.post<Pagamento>("/api/pagamentos", pagamento);
      return data;
    },
    update: async (id: number, pagamento: Partial<Pagamento>): Promise<Pagamento> => {
      const { data } = await axiosInstance.put<Pagamento>(`/api/pagamentos/${id}`, pagamento);
      return data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/pagamentos/${id}`);
    },
    atualizarStatus: async (id: number, status: string): Promise<void> => {
      await axiosInstance.patch(`/api/pagamentos/${id}/status`, { status });
    },
  },
};
