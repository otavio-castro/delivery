# API de Itens de Pedido

## Endpoints Implementados

### GET /api/itenspedido?pedidoId={int}
Lista todos os itens de um pedido específico.

**Query Parameters:**
- `pedidoId` (obrigatório): ID do pedido

**Response 200:**
```json
[
  {
    "itemPedidoId": 1,
    "pedidoId": 1,
    "produtoId": 5,
    "produtoNome": "Pizza Margherita",
    "quantidade": 2,
    "precoUnitario": 45.00,
    "subtotal": 90.00,
    "observacao": "Sem cebola"
  }
]
```

---

### GET /api/itenspedido/{id}
Obtém um item de pedido específico por ID.

**Response 200:**
```json
{
  "itemPedidoId": 1,
  "pedidoId": 1,
  "produtoId": 5,
  "produtoNome": "Pizza Margherita",
  "quantidade": 2,
  "precoUnitario": 45.00,
  "subtotal": 90.00,
  "observacao": "Sem cebola"
}
```

**Response 404:** Item não encontrado

---

### POST /api/itenspedido
Cria um novo item de pedido.

**Request Body:**
```json
{
  "pedidoId": 1,
  "produtoId": 5,
  "quantidade": 2,
  "precoUnitario": 45.00,  // Opcional - se não fornecido, usa o preço atual do produto
  "observacao": "Sem cebola"
}
```

**Validações:**
- PedidoId é obrigatório
- ProdutoId é obrigatório
- Quantidade mínima: 1
- PrecoUnitario >= 0 (se fornecido)
- Observacao: máximo 255 caracteres
- Pedido deve existir
- Produto deve existir
- Status do Pedido deve ser **Pendente**

**Response 201:**
```json
{
  "itemPedidoId": 1,
  "pedidoId": 1,
  "produtoId": 5,
  "produtoNome": "Pizza Margherita",
  "quantidade": 2,
  "precoUnitario": 45.00,
  "subtotal": 90.00,
  "observacao": "Sem cebola"
}
```

**Response 404:** Pedido ou Produto não encontrado  
**Response 409:** Pedido não está em status Pendente

---

### PUT /api/itenspedido/{id}
Atualiza um item de pedido existente (apenas Quantidade e Observacao).

**Request Body:**
```json
{
  "quantidade": 3,
  "observacao": "Sem cebola e sem azeitona"
}
```

**Validações:**
- Quantidade mínima: 1
- Observacao: máximo 255 caracteres
- Status do Pedido deve ser **Pendente**

**Campos NÃO editáveis:**
- ProdutoId (não pode mudar o produto)
- PrecoUnitario (mantém o preço original do pedido)

**Response 200:**
```json
{
  "itemPedidoId": 1,
  "pedidoId": 1,
  "produtoId": 5,
  "produtoNome": "Pizza Margherita",
  "quantidade": 3,
  "precoUnitario": 45.00,
  "subtotal": 135.00,
  "observacao": "Sem cebola e sem azeitona"
}
```

**Response 404:** Item não encontrado  
**Response 409:** Pedido não está em status Pendente

---

### DELETE /api/itenspedido/{id}
Remove um item de pedido.

**Validações:**
- Status do Pedido deve ser **Pendente**

**Response 204:** Item removido com sucesso  
**Response 404:** Item não encontrado  
**Response 409:** Pedido não está em status Pendente

---

## Regras de Negócio

1. **PrecoUnitario Automático**
   - Se não fornecido no POST, será preenchido com o preço atual do Produto
   - Garante snapshot do preço no momento do pedido

2. **Validação de Status**
   - Só é possível criar, atualizar ou deletar itens em pedidos com status **Pendente**
   - Evita alterações em pedidos já confirmados ou em processamento

3. **Subtotal Calculado**
   - Sempre calculado como `Quantidade * PrecoUnitario`
   - Retornado automaticamente no DTO

4. **Campos Imutáveis no Update**
   - ProdutoId e PrecoUnitario não podem ser alterados
   - Para mudar o produto, deve-se deletar o item e criar um novo

---

## Arquivos Criados

### DTOs
- `ItemPedidoDTO.cs` — Resposta com ProdutoNome e Subtotal
- `ItemPedidoCreateDTO.cs` — Criação com validações
- `ItemPedidoUpdateDTO.cs` — Atualização (apenas Quantidade e Observacao)

### Repository
- `Interfaces/IItemPedidoRepository.cs` — Interface do repositório
- `ItemPedidoRepository.cs` — Implementação com EF Core + includes

### Service
- `Interfaces/IItemPedidoService.cs` — Interface do serviço
- `ItemPedidoService.cs` — Lógica de negócio e validações

### Controller
- `ItensPedidoController.cs` — Endpoints REST

### Configurações
- `MappingProfile.cs` — Mapeamentos AutoMapper adicionados
- `DIStartup.cs` — Dependências registradas

---

## Exemplo de Fluxo Completo

```bash
# 1. Criar um pedido (assumindo que já existe)
# PedidoId = 1, Status = Pendente

# 2. Adicionar item ao pedido
POST /api/itenspedido
{
  "pedidoId": 1,
  "produtoId": 5,
  "quantidade": 2,
  "observacao": "Sem cebola"
}
# PrecoUnitario será preenchido automaticamente do produto

# 3. Listar itens do pedido
GET /api/itenspedido?pedidoId=1

# 4. Atualizar quantidade
PUT /api/itenspedido/1
{
  "quantidade": 3,
  "observacao": "Sem cebola e sem azeitona"
}

# 5. Remover item
DELETE /api/itenspedido/1
```

---

## Tratamento de Erros

Todas as exceções são tratadas pelo `ApiExceptionFilter`:

- **NotFoundException (404):** Pedido, Produto ou ItemPedido não encontrado
- **ConflictException (409):** Status do Pedido não permite a operação
- **ValidationException (400):** Dados inválidos no DTO
