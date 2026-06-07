# Entrega Banco de Dados - Modelo Logico (Relacional)

## Esquema Relacional

1. CLIENTES(
   cliente_id PK,
   nome,
   email UK,
   senha_hash,
   telefone,
   is_admin
)

2. ENDERECOS(
   endereco_id PK,
   logradouro,
   numero,
   complemento,
   bairro,
   cidade,
   cep,
   cliente_id FK -> CLIENTES(cliente_id)
)

3. RESTAURANTES(
   restaurante_id PK,
   nome,
   descricao,
   categoria,
   imagem_url,
   endereco,
   nota,
   ativo
)

4. PRODUTOS(
   produto_id PK,
   nome,
   descricao,
   preco,
   imagem_url,
   categoria,
   disponivel,
   restaurante_id FK -> RESTAURANTES(restaurante_id)
)

5. ENTREGADORES(
   entregador_id PK,
   nome,
   cpf UK,
   telefone,
   veiculo,
   disponivel
)

6. PEDIDOS(
   pedido_id PK,
   cliente_id FK -> CLIENTES(cliente_id),
   restaurante_id FK -> RESTAURANTES(restaurante_id),
   endereco_id FK -> ENDERECOS(endereco_id),
   entregador_id FK -> ENTREGADORES(entregador_id) NULL,
   status,
   valor_total,
   observacao,
   criado_em,
   atualizado_em
)

7. ITENS_PEDIDO(
   item_pedido_id PK,
   pedido_id FK -> PEDIDOS(pedido_id),
   produto_id FK -> PRODUTOS(produto_id),
   quantidade,
   preco_unitario,
   observacao
)

8. PAGAMENTOS(
   pagamento_id PK,
   pedido_id FK UK -> PEDIDOS(pedido_id),
   metodo,
   status,
   valor,
   criado_em
)

## Normalizacao (resumo)

- 1FN: tabelas com atributos atomicos.
- 2FN: nao ha dependencia parcial de chave composta (PKs simples por tabela).
- 3FN: atributos nao chave dependem apenas da PK da propria tabela.
- Integridade referencial com FKs e restricoes de unicidade (email cliente, cpf entregador, pedido_id em pagamentos).
