# Trabalho Pratico - Banco de Dados (GoDelivery)

## 1. Introducao
O projeto GoDelivery foi desenvolvido para apoiar o processo de delivery, cobrindo cadastro de usuarios, autenticacao, cardapio, pedidos, entrega e pagamento. O problema principal e organizar o fluxo completo do pedido com integridade dos dados e rastreabilidade entre entidades.

Disponível: https://godelivery-flax.vercel.app

## 2. Objetivos do Trabalho
- Especificar e modelar um sistema de informacao para o dominio de delivery.
- Implementar o banco de dados com modelo conceitual, logico e fisico.
- Desenvolver consultas SQL para analise e suporte a decisao.
- Implementar funcionalidades da aplicacao integradas ao banco.

## 3. Solucao Adotada
A solucao usa arquitetura com frontend React + backend ASP.NET Core + PostgreSQL.

- Backend com Entity Framework Core, Repository Pattern e Service Layer.
- Entidades principais: Cliente, Endereco, Restaurante, Produto, Pedido, ItemPedido, Entregador e Pagamento.
- Integridade garantida por chaves primarias, estrangeiras e indices unicos.
- Regras de negocio (exemplo): email unico de cliente, cpf unico de entregador, 1 pagamento por pedido, validacoes de valor/quantidade.

Artefatos desta entrega:
- Modelo logico: 02_MODELO_LOGICO.md
- DDL fisico: 03_MODELO_FISICO_DDL.sql
- Consultas SQL: 04_CONSULTAS_SQL.sql + 04_CONSULTAS_EXPLICACAO.md

## 4. Algoritmo Principal (Fluxo de Criacao de Pedido)
Pseudocodigo simplificado:

```text
entrada: cliente, endereco, restaurante, itens, metodo_pagamento
saida: pedido criado com itens e pagamento

1. validar cliente (existe ou criar)
2. validar endereco (existe e pertence ao cliente)
3. para cada item:
   3.1 validar produto e disponibilidade
   3.2 calcular subtotal = quantidade * preco_unitario
4. somar subtotais e obter valor_total
5. inserir pedido(status = Pendente, valor_total)
6. inserir itens do pedido
7. inserir pagamento(status = Pendente, valor = valor_total)
8. retornar identificador do pedido
```

## 5. Funcionalidades Implementadas (minimo 3)
1. Cadastro de usuarios (clientes)
- API: POST /api/clientes
- Interface: checkout e area administrativa de clientes.

2. Autenticacao de usuarios
- API: POST /api/clientes/login
- Regra: validacao de email/senha com hash (BCrypt no backend).

3. Ciclo de pedido
- API: POST /api/pedidos, POST /api/itenspedido, POST /api/pagamentos
- Interface: carrinho, checkout e acompanhamento.

4. (Extra) Gestao administrativa
- CRUDs de restaurantes, produtos, entregadores, clientes e pedidos.

## 6. Testes Realizados e Resultados
Foram executados testes funcionais de API (Swagger/cliente HTTP) e testes de fluxo na interface:

- Teste de cadastro de cliente: sucesso, cliente persistido com email unico.
- Teste de login com credenciais validas: sucesso.
- Teste de login com senha invalida: retorno de erro de autenticacao.
- Teste de criacao de pedido completo: sucesso com itens e pagamento vinculados.
- Teste de integridade referencial: FKs impedem registros inconsistentes.

Resultado geral: os requisitos obrigatorios da disciplina foram atendidos no sistema implementado.

## 7. Conclusao
A modelagem permitiu representar o dominio de delivery com consistencia e normalizacao adequada. A implementacao no PostgreSQL e a integracao com a aplicacao demonstram o uso pratico dos conceitos da disciplina: modelagem conceitual, mapeamento logico/fisico e consultas SQL para analise operacional.

## 8. Referencias
- ELMASRI, R.; NAVATHE, S. B. Sistemas de Banco de Dados.
- Documentacao PostgreSQL: https://www.postgresql.org/docs/
- Documentacao Entity Framework Core: https://learn.microsoft.com/ef/core/
