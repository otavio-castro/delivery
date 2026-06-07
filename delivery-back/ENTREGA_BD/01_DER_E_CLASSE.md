# Entrega Banco de Dados - DER e Diagrama de Classes

## 1) DER (Modelo Conceitual)

```mermaid
erDiagram
    CLIENTES ||--o{ ENDERECOS : possui
    CLIENTES ||--o{ PEDIDOS : realiza
    RESTAURANTES ||--o{ PRODUTOS : oferece
    RESTAURANTES ||--o{ PEDIDOS : recebe
    ENDERECOS ||--o{ PEDIDOS : entrega_em
    ENTREGADORES ||--o{ PEDIDOS : entrega
    PEDIDOS ||--|{ ITENS_PEDIDO : contem
    PRODUTOS ||--o{ ITENS_PEDIDO : compoe
    PEDIDOS ||--|| PAGAMENTOS : gera

    CLIENTES {
        int cliente_id PK
        string nome
        string email UK
        string senha_hash
        string telefone
        bool is_admin
    }

    ENDERECOS {
        int endereco_id PK
        string logradouro
        string numero
        string complemento
        string bairro
        string cidade
        string cep
        int cliente_id FK
    }

    RESTAURANTES {
        int restaurante_id PK
        string nome
        string descricao
        string categoria
        string imagem_url
        string endereco
        decimal nota
        bool ativo
    }

    PRODUTOS {
        int produto_id PK
        string nome
        string descricao
        decimal preco
        string imagem_url
        string categoria
        bool disponivel
        int restaurante_id FK
    }

    ENTREGADORES {
        int entregador_id PK
        string nome
        string cpf UK
        string telefone
        string veiculo
        bool disponivel
    }

    PEDIDOS {
        int pedido_id PK
        int cliente_id FK
        int restaurante_id FK
        int endereco_id FK
        int entregador_id FK
        int status
        decimal valor_total
        string observacao
        datetime criado_em
        datetime atualizado_em
    }

    ITENS_PEDIDO {
        int item_pedido_id PK
        int pedido_id FK
        int produto_id FK
        int quantidade
        decimal preco_unitario
        string observacao
    }

    PAGAMENTOS {
        int pagamento_id PK
        int pedido_id FK UK
        int metodo
        int status
        decimal valor
        datetime criado_em
    }
```

## 2) Diagrama de Classes (Modelo de Dominio)

```mermaid
classDiagram
    class Cliente {
        +int ClienteId
        +string Nome
        +string Email
        +string SenhaHash
        +string? Telefone
    }

    class Endereco {
        +int EnderecoId
        +string Logradouro
        +string Numero
        +string? Complemento
        +string Bairro
        +string Cidade
        +string CEP
        +int ClienteId
    }

    class Restaurante {
        +int RestauranteId
        +string Nome
        +string? Descricao
        +string? Categoria
        +string? ImagemUrl
        +string? Endereco
        +decimal Nota
        +bool Ativo
    }

    class Produto {
        +int ProdutoId
        +string Nome
        +string? Descricao
        +decimal Preco
        +string? ImagemUrl
        +string? Categoria
        +bool Disponivel
        +int RestauranteId
    }

    class Entregador {
        +int EntregadorId
        +string Nome
        +string CPF
        +string Telefone
        +string Veiculo
        +bool Disponivel
    }

    class Pedido {
        +int PedidoId
        +int ClienteId
        +int RestauranteId
        +int EnderecoId
        +int? EntregadorId
        +StatusPedido Status
        +decimal ValorTotal
        +string? Observacao
        +DateTime CriadoEm
        +DateTime? AtualizadoEm
    }

    class ItemPedido {
        +int ItemPedidoId
        +int PedidoId
        +int ProdutoId
        +int Quantidade
        +decimal PrecoUnitario
        +string? Observacao
    }

    class Pagamento {
        +int PagamentoId
        +int PedidoId
        +MetodoPagamento Metodo
        +StatusPagamento Status
        +decimal Valor
        +DateTime CriadoEm
    }

    Cliente "1" --> "0..*" Endereco
    Cliente "1" --> "0..*" Pedido
    Restaurante "1" --> "0..*" Produto
    Restaurante "1" --> "0..*" Pedido
    Endereco "1" --> "0..*" Pedido
    Entregador "1" --> "0..*" Pedido
    Pedido "1" --> "1..*" ItemPedido
    Produto "1" --> "0..*" ItemPedido
    Pedido "1" --> "0..1" Pagamento
```
