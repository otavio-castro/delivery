# GoDelivery - Frontend MVP

## 🚀 Tecnologias

- **React 18** com TypeScript
- **Vite** - Build tool
- **Styled Components** - Estilização
- **Zustand** - Gerenciamento de estado
- **React Router v6** - Navegação
- **Axios** - Cliente HTTP

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes compartilhados
│   ├── button/
│   ├── input/
│   ├── select/
│   ├── loading/
│   ├── modal/
│   ├── status-badge/
│   ├── header/
│   ├── footer/
│   ├── layout/
│   ├── card-restaurante/
│   └── card-produto/
├── pages/              # Páginas da aplicação
│   ├── home-page/
│   ├── cardapio-page/
│   ├── carrinho-page/
│   ├── checkout-page/
│   ├── confirmacao-page/
│   ├── acompanhamento-page/
│   ├── admin-page/
│   ├── admin-restaurantes-page/
│   ├── admin-produtos-page/
│   ├── admin-entregadores-page/
│   ├── admin-clientes-page/
│   └── admin-pedidos-page/
├── stores/             # Zustand stores
│   ├── carrinho.store.ts
│   ├── produtos.store.ts
│   ├── restaurantes.store.ts
│   ├── pedido.store.ts
│   └── loading.store.ts
├── types/
│   └── entities.ts     # Interfaces TypeScript
├── config/
│   └── api.ts         # Configuração Axios + endpoints
└── styles/
    └── global.ts      # Estilos globais
```

## 🎯 Convenções do Projeto

### Estrutura de Componentes/Páginas

Cada componente/página DEVE ter:
- `index.tsx` - Lógica e JSX
- `index.style.ts` - Styled components

### Importação de Estilos

**SEMPRE** usar:
```tsx
import * as Styled from "./index.style";
```

### Styled Components

```tsx
// index.style.ts
import styled from "styled-components";

export const Container = styled.div`
  // estilos
`;

export const Title = styled.h1`
  // estilos
`;
```

### Stores Zustand

```tsx
import { create } from "zustand";

export interface MyStore {
  items: Item[];
  setItems: (items: Item[]) => void;
}

export const useMyStore = create<MyStore>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
}));
```

## 🌐 Rotas

### Área Cliente
- `/` - HomePage (lista restaurantes)
- `/cardapio/:id` - Cardápio do restaurante
- `/carrinho` - Carrinho de compras
- `/checkout` - Finalização do pedido
- `/confirmacao/:id` - Confirmação do pedido
- `/acompanhamento/:id?` - Rastreamento do pedido

### Área Admin
- `/admin` - Dashboard administrativo
- `/admin/restaurantes` - CRUD Restaurantes
- `/admin/produtos` - CRUD Produtos
- `/admin/entregadores` - CRUD Entregadores
- `/admin/clientes` - Visualizar Clientes
- `/admin/pedidos` - Gerenciar Pedidos (status, entregador)

## 🎨 Variáveis CSS

```css
--color-primary: #ff6b35       /* Laranja principal */
--color-primary-dark: #e55a2b
--color-secondary: #004e89
--color-background: #f8f9fa
--color-card: #ffffff
--color-text: #333333
--color-text-muted: #6c757d
--color-heading: #1a1a1a
--color-border: #dee2e6
--color-success: #28a745
--color-error: #dc3545
--color-warning: #ffc107
--border-radius-sm: 6px
--border-radius-md: 8px
--border-radius-lg: 12px
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15)
```

## 🔌 API Endpoints

Base URL: `https://localhost:7007`

### Restaurantes
- `GET /api/restaurantes` - Listar todos
- `GET /api/restaurantes/{id}` - Buscar por ID
- `POST /api/restaurantes` - Criar
- `PUT /api/restaurantes/{id}` - Atualizar
- `DELETE /api/restaurantes/{id}` - Deletar

### Produtos
- `GET /api/produtos?restauranteId={id}` - Listar por restaurante
- `POST /api/produtos` - Criar
- `PUT /api/produtos/{id}` - Atualizar
- `PATCH /api/produtos/{id}/disponibilidade` - Alterar disponibilidade
- `DELETE /api/produtos/{id}` - Deletar

### Clientes
- `GET /api/clientes` - Listar todos
- `POST /api/clientes` - Criar
- `DELETE /api/clientes/{id}` - Deletar

### Endereços
- `GET /api/enderecos?clienteId={id}` - Listar por cliente
- `POST /api/enderecos` - Criar

### Pedidos
- `GET /api/pedidos?status={status}` - Listar com filtros
- `GET /api/pedidos/{id}` - Buscar por ID
- `POST /api/pedidos` - Criar
- `PATCH /api/pedidos/{id}/status` - Atualizar status
- `PATCH /api/pedidos/{id}/entregador` - Atribuir entregador

### Itens Pedido
- `GET /api/itenspedido?pedidoId={id}` - Listar por pedido
- `POST /api/itenspedido` - Criar

### Entregadores
- `GET /api/entregadores` - Listar todos
- `POST /api/entregadores` - Criar
- `PUT /api/entregadores/{id}` - Atualizar
- `PATCH /api/entregadores/{id}/disponibilidade` - Alterar disponibilidade
- `DELETE /api/entregadores/{id}` - Deletar

### Pagamentos
- `POST /api/pagamentos` - Criar

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## ✅ Features Implementadas

### Fluxo Cliente
- ✅ Lista de restaurantes com filtro por categoria
- ✅ Visualização de cardápio com filtro por categoria de produto
- ✅ Adicionar produtos ao carrinho
- ✅ Gestão do carrinho (alterar quantidade, remover itens)
- ✅ Checkout completo (dados cliente + endereço + pagamento)
- ✅ Criação automática de cliente, endereço, pedido, itens e pagamento
- ✅ Página de confirmação com resumo do pedido
- ✅ Acompanhamento de pedido em tempo real (polling 10s)
- ✅ Timeline visual de status
- ✅ Dados do entregador quando atribuído

### Área Admin
- ✅ Dashboard com estatísticas
- ✅ CRUD completo de Restaurantes
- ✅ CRUD completo de Produtos com filtro por restaurante
- ✅ CRUD completo de Entregadores
- ✅ Alternar disponibilidade de produtos e entregadores
- ✅ Visualização de clientes e endereços
- ✅ Gerenciamento de pedidos:
  - ✅ Filtrar por status
  - ✅ Atualizar status do pedido
  - ✅ Atribuir entregador disponível
  - ✅ Visualizar detalhes

## 📱 Responsividade

Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Todos os componentes e páginas são responsivos e mobile-first.

## 🔒 Observações

- **Sem autenticação**: MVP focado em funcionalidades core
- **Persist do carrinho**: Armazenado no localStorage via Zustand
- **Validações básicas**: Campos obrigatórios e formatos simples
- **Feedback visual**: Loading states, mensagens de erro, confirmações

## 🎯 Próximos Passos

- Implementar autenticação (JWT)
- Adicionar testes unitários e E2E
- Integrar com API de mapas para rastreamento real
- Notificações em tempo real (WebSocket)
- Upload de imagens para restaurantes e produtos
- Avaliações e comentários
- Sistema de cupons/promoções
