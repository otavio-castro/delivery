# API de Pagamentos - Documentação

API REST para gerenciamento de pagamentos dos pedidos no sistema de delivery.

## Características

- **Relação 1:1 com Pedido**: Cada pedido pode ter apenas um pagamento
- **Validação de Valor**: Valor do pagamento deve corresponder ao valor total do pedido
- **Máquina de Estados**: Transições de status validadas e irreversíveis após aprovação/recusa
- **Métodos de Pagamento**: Cartão, PIX ou Dinheiro
- **Status**: Pendente → Aprovado | Recusado (transições bloqueadas após decisão)

---

## Endpoints

### 1. Listar Pagamentos (com filtros opcionais)

```http
GET /api/pagamentos?pedidoId={int?}&status={StatusPagamento?}&metodo={MetodoPagamento?}
```

**Query Parameters:**
- `pedidoId` (opcional): Filtrar por pedido específico
- `status` (opcional): Filtrar por status (0=Pendente, 1=Aprovado, 2=Recusado)
- `metodo` (opcional): Filtrar por método (0=Cartao, 1=PIX, 2=Dinheiro)

**Resposta 200 OK:**
```json
[
  {
    "pagamentoId": 1,
    "pedidoId": 5,
    "pedidoNumero": "#000005",
    "clienteNome": "João Silva",
    "metodo": 1,
    "status": 0,
    "valor": 75.50,
    "criadoEm": "2026-06-04T18:30:00Z"
  }
]
```

**Enums:**
- **MetodoPagamento**: `0=Cartao`, `1=PIX`, `2=Dinheiro`
- **StatusPagamento**: `0=Pendente`, `1=Aprovado`, `2=Recusado`

---

### 2. Buscar Pagamento por ID

```http
GET /api/pagamentos/{id}
```

**Resposta 200 OK:**
```json
{
  "pagamentoId": 1,
  "pedidoId": 5,
  "pedidoNumero": "#000005",
  "clienteNome": "João Silva",
  "metodo": 1,
  "status": 0,
  "valor": 75.50,
  "criadoEm": "2026-06-04T18:30:00Z"
}
```

**Resposta 404 Not Found:**
Pagamento não encontrado.

---

### 3. Criar Pagamento

```http
POST /api/pagamentos
Content-Type: application/json
```

**Body:**
```json
{
  "pedidoId": 5,
  "metodo": 1,
  "valor": 75.50
}
```

**Validações:**
- `pedidoId`: Obrigatório, deve existir no banco
- `metodo`: Obrigatório (0=Cartao, 1=PIX, 2=Dinheiro)
- `valor`: Obrigatório, deve ser > 0 e igual ao `ValorTotal` do pedido

**Regras de Negócio:**
1. ✅ Pedido deve existir
2. ✅ Pedido não pode ter outro pagamento (relação 1:1)
3. ✅ Valor deve ser igual ao `ValorTotal` do pedido
4. ✅ Status inicial é sempre `Pendente`

**Resposta 201 Created:**
```json
{
  "pagamentoId": 1,
  "pedidoId": 5,
  "pedidoNumero": "#000005",
  "clienteNome": "João Silva",
  "metodo": 1,
  "status": 0,
  "valor": 75.50,
  "criadoEm": "2026-06-04T18:30:00Z"
}
```

**Respostas de Erro:**
- **404 Not Found**: Pedido não encontrado
- **409 Conflict**: 
  - Pedido já possui pagamento
  - Valor não corresponde ao valor total do pedido

---

### 4. Atualizar Método de Pagamento

```http
PUT /api/pagamentos/{id}
Content-Type: application/json
```

**Body:**
```json
{
  "metodo": 0
}
```

**Observação**: Apenas o método de pagamento pode ser alterado. Valor e Status não são modificáveis via PUT.

**Resposta 200 OK:**
```json
{
  "pagamentoId": 1,
  "pedidoId": 5,
  "pedidoNumero": "#000005",
  "clienteNome": "João Silva",
  "metodo": 0,
  "status": 0,
  "valor": 75.50,
  "criadoEm": "2026-06-04T18:30:00Z"
}
```

**Resposta 404 Not Found:**
Pagamento não encontrado.

---

### 5. Atualizar Status de Pagamento (com validação de transição)

```http
PATCH /api/pagamentos/{id}/status
Content-Type: application/json
```

**Body:**
```json
{
  "novoStatus": 1
}
```

**Máquina de Estados (transições válidas):**

```
Pendente (0) ──→ Aprovado (1)  ✅
             ──→ Recusado (2)  ✅

Aprovado (1) ──→ [BLOQUEADO]   ❌

Recusado (2) ──→ [BLOQUEADO]   ❌
```

**Regras:**
- ✅ `Pendente` pode ir para `Aprovado` ou `Recusado`
- ❌ `Aprovado` **NÃO PODE** ser revertido
- ❌ `Recusado` **NÃO PODE** ser revertido

**Resposta 204 No Content:**
Status atualizado com sucesso.

**Resposta 404 Not Found:**
Pagamento não encontrado.

**Resposta 409 Conflict:**
```json
{
  "message": "Não é possível alterar o status de 'Aprovado' para 'Pendente'. Transição bloqueada."
}
```

---

### 6. Deletar Pagamento

```http
DELETE /api/pagamentos/{id}
```

**Resposta 204 No Content:**
Pagamento removido com sucesso.

**Resposta 404 Not Found:**
Pagamento não encontrado.

---

## Modelos de Dados

### Pagamento (Model)

```csharp
public class Pagamento
{
    public int PagamentoId { get; set; }
    public int PedidoId { get; set; }
    public Pedido? Pedido { get; set; }
    public MetodoPagamento Metodo { get; set; }
    public StatusPagamento Status { get; set; }
    public decimal Valor { get; set; }
    public DateTime CriadoEm { get; set; }
}
```

### Enums

```csharp
public enum MetodoPagamento 
{ 
    Cartao = 0, 
    PIX = 1, 
    Dinheiro = 2 
}

public enum StatusPagamento 
{ 
    Pendente = 0, 
    Aprovado = 1, 
    Recusado = 2 
}
```

---

## Exemplos de Uso

### Fluxo Completo: Criar e Aprovar Pagamento

**1. Criar pagamento para pedido #5:**
```http
POST /api/pagamentos
{
  "pedidoId": 5,
  "metodo": 1,
  "valor": 75.50
}
```

**2. Aprovar pagamento:**
```http
PATCH /api/pagamentos/1/status
{
  "novoStatus": 1
}
```

**3. Tentar reverter (BLOQUEADO):**
```http
PATCH /api/pagamentos/1/status
{
  "novoStatus": 0
}
```
❌ **409 Conflict**: "Não é possível alterar o status de 'Aprovado' para 'Pendente'. Transição bloqueada."

---

### Buscar Pagamentos Aprovados via PIX

```http
GET /api/pagamentos?status=1&metodo=1
```

---

## Tratamento de Exceções

Todas as exceções são tratadas pelo `ApiExceptionFilter`:

- **NotFoundException** → 404 Not Found
- **ConflictException** → 409 Conflict
- **ValidationException** → 400 Bad Request

---

## Dependências

- **AutoMapper**: Mapeamento Model ↔ DTO
- **Entity Framework Core**: Acesso a dados
- **PostgreSQL**: Banco de dados (Neon)

---

## Registro de Dependências (DIStartup.cs)

```csharp
builder.Services.AddScoped<IPagamentoRepository, PagamentoRepository>();
builder.Services.AddScoped<IPagamentoService, PagamentoService>();
```

---

## Observações Importantes

1. **Relação 1:1**: Um pedido só pode ter **um único pagamento**
2. **Validação de Valor**: Sistema valida se valor do pagamento == valor total do pedido
3. **Imutabilidade de Status**: Após aprovação ou recusa, não é possível reverter
4. **Include Automático**: Controller retorna dados do cliente via `Include(p => p.Pedido).ThenInclude(p => p.Cliente)`

---

**Última atualização**: 2026-06-04  
**Versão da API**: 1.0
