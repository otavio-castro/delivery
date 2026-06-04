export interface Restaurante {
  restauranteId: number;
  nome: string;
  descricao: string | null;
  categoria: string | null;
  imagemUrl: string | null;
  endereco: string | null;
  nota: number;
  ativo: boolean;
}

export interface Produto {
  produtoId: number;
  restauranteId: number;
  nome: string;
  descricao: string | null;
  preco: number;
  categoria: string | null;
  imagemUrl: string | null;
  disponivel: boolean;
}

export interface Cliente {
  clienteId: number;
  nome: string;
  email: string;
  telefone: string | null;
  cpf: string | null;
  dataCadastro: string;
}

export interface Pedido {
  pedidoId: number;
  clienteId: number;
  restauranteId: number;
  entregadorId: number | null;
  enderecoId: number;
  status: string;
  valorTotal: number;
  dataPedido: string;
  dataAtualizacao: string;
  observacoes: string | null;
}

export interface ItemPedido {
  itemPedidoId: number;
  pedidoId: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

export interface Endereco {
  enderecoId: number;
  clienteId: number;
  rua: string;
  numero: string;
  complemento: string | null;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export interface Entregador {
  entregadorId: number;
  nome: string;
  telefone: string;
  veiculo: string | null;
  placa: string | null;
  disponivel: boolean;
}

export interface Pagamento {
  pagamentoId: number;
  pedidoId: number;
  metodoPagamento: string;
  status: string;
  valor: number;
  dataPagamento: string | null;
}
