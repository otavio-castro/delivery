# Explicacao das Consultas SQL

## A) Consultas com JOIN

1. JOIN 1 (Pedidos + Cliente + Restaurante + Entregador)
- Objetivo: listar pedidos com contexto completo de quem pediu, onde pediu e quem entrega.
- Tabelas usadas: Pedidos, Clientes, Restaurantes, Entregadores.
- Tipo de join: inner join para cliente/restaurante e left join para entregador (pedido pode ainda nao ter entregador).

2. JOIN 2 (ItensPedido + Pedido + Produto + Restaurante)
- Objetivo: detalhar cada item de pedido e calcular subtotal por item.
- Tabelas usadas: ItensPedido, Pedidos, Produtos, Restaurantes.
- Resultado: visao analitica de composicao de pedidos.

## B) Operacoes de Conjunto

1. UNION (Clientes com pedido + clientes com endereco)
- Objetivo: montar um conjunto unico de clientes ativos no fluxo do sistema.
- Operacao: UNION remove duplicados automaticamente.

2. INTERSECT (Restaurantes com produtos e pedidos)
- Objetivo: identificar restaurantes efetivamente operando (tem cardapio e vendas).
- Operacao: INTERSECT retorna somente interseccao dos conjuntos.

3. EXCEPT (Clientes com endereco e sem pedidos)
- Objetivo: encontrar clientes potenciais para campanha de conversao.
- Operacao: EXCEPT faz diferenca entre conjuntos.

## C) Agregacoes

1. Faturamento por restaurante (GROUP BY + HAVING)
- Objetivo: somar valor total vendido por restaurante e filtrar faturamento acima de 100.

2. Ticket medio por cliente (GROUP BY + HAVING)
- Objetivo: medir valor medio gasto por cliente que fez mais de 1 pedido.

3. Estatisticas de preco de produtos (MAX, MIN, AVG)
- Objetivo: entender faixa de precos do cardapio.

4. Quantidade de pedidos por status (COUNT + GROUP BY)
- Objetivo: monitorar distribuicao do fluxo operacional (pendente, preparo, entrega etc.).
