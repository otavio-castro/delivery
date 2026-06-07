-- Entrega Banco de Dados - Consultas SQL
-- Requisito: 2 joins, 3 operacoes de conjunto, 4 agregacoes

-- ==========================================================
-- A) JOIN (2 consultas)
-- ==========================================================

-- JOIN 1: pedidos com dados de cliente, restaurante e entregador
SELECT
    p."PedidoId",
    c."Nome" AS cliente,
    r."Nome" AS restaurante,
    e."Nome" AS entregador,
    p."ValorTotal",
    p."Status",
    p."CriadoEm"
FROM "Pedidos" p
JOIN "Clientes" c ON c."ClienteId" = p."ClienteId"
JOIN "Restaurantes" r ON r."RestauranteId" = p."RestauranteId"
LEFT JOIN "Entregadores" e ON e."EntregadorId" = p."EntregadorId"
ORDER BY p."CriadoEm" DESC;

-- JOIN 2: itens de pedido com produto e restaurante
SELECT
    ip."ItemPedidoId",
    p."PedidoId",
    pr."Nome" AS produto,
    r."Nome" AS restaurante,
    ip."Quantidade",
    ip."PrecoUnitario",
    (ip."Quantidade" * ip."PrecoUnitario") AS subtotal
FROM "ItensPedido" ip
JOIN "Pedidos" p ON p."PedidoId" = ip."PedidoId"
JOIN "Produtos" pr ON pr."ProdutoId" = ip."ProdutoId"
JOIN "Restaurantes" r ON r."RestauranteId" = pr."RestauranteId"
ORDER BY p."PedidoId", ip."ItemPedidoId";

-- ==========================================================
-- B) OPERACOES DE CONJUNTO (UNION, INTERSECT, EXCEPT)
-- Cada consulta envolve no minimo 2 tabelas.
-- ==========================================================

-- CONJUNTO 1 (UNION): clientes que fizeram pedidos + clientes com endereco cadastrado
SELECT c."ClienteId", c."Nome", 'FEZ_PEDIDO' AS origem
FROM "Clientes" c
JOIN "Pedidos" p ON p."ClienteId" = c."ClienteId"
UNION
SELECT c."ClienteId", c."Nome", 'TEM_ENDERECO' AS origem
FROM "Clientes" c
JOIN "Enderecos" e ON e."ClienteId" = c."ClienteId"
ORDER BY 1;

-- CONJUNTO 2 (INTERSECT): restaurantes que tem produtos e tambem ja receberam pedidos
SELECT r."RestauranteId", r."Nome"
FROM "Restaurantes" r
JOIN "Produtos" p ON p."RestauranteId" = r."RestauranteId"
INTERSECT
SELECT r."RestauranteId", r."Nome"
FROM "Restaurantes" r
JOIN "Pedidos" pe ON pe."RestauranteId" = r."RestauranteId"
ORDER BY 1;

-- CONJUNTO 3 (EXCEPT): clientes com endereco, mas sem pedidos
SELECT c."ClienteId", c."Nome"
FROM "Clientes" c
JOIN "Enderecos" e ON e."ClienteId" = c."ClienteId"
EXCEPT
SELECT c."ClienteId", c."Nome"
FROM "Clientes" c
JOIN "Pedidos" p ON p."ClienteId" = c."ClienteId"
ORDER BY 1;

-- ==========================================================
-- C) AGREGACAO (4 consultas)
-- Pelo menos 2 com GROUP BY e HAVING.
-- ==========================================================

-- AGREGACAO 1 (GROUP BY + HAVING): faturamento por restaurante (> 100)
SELECT
    r."RestauranteId",
    r."Nome",
    SUM(pe."ValorTotal") AS faturamento_total,
    COUNT(pe."PedidoId") AS total_pedidos
FROM "Restaurantes" r
JOIN "Pedidos" pe ON pe."RestauranteId" = r."RestauranteId"
GROUP BY r."RestauranteId", r."Nome"
HAVING SUM(pe."ValorTotal") > 100
ORDER BY faturamento_total DESC;

-- AGREGACAO 2 (GROUP BY + HAVING): media de ticket por cliente com mais de 1 pedido
SELECT
    c."ClienteId",
    c."Nome",
    COUNT(pe."PedidoId") AS qtd_pedidos,
    AVG(pe."ValorTotal") AS ticket_medio
FROM "Clientes" c
JOIN "Pedidos" pe ON pe."ClienteId" = c."ClienteId"
GROUP BY c."ClienteId", c."Nome"
HAVING COUNT(pe."PedidoId") > 1
ORDER BY ticket_medio DESC;

-- AGREGACAO 3: valor maximo, minimo e medio de produtos
SELECT
    MAX(p."Preco") AS maior_preco,
    MIN(p."Preco") AS menor_preco,
    AVG(p."Preco") AS preco_medio
FROM "Produtos" p
JOIN "Restaurantes" r ON r."RestauranteId" = p."RestauranteId";

-- AGREGACAO 4: total de pedidos por status
SELECT
    pe."Status",
    COUNT(*) AS quantidade
FROM "Pedidos" pe
JOIN "Clientes" c ON c."ClienteId" = pe."ClienteId"
GROUP BY pe."Status"
ORDER BY pe."Status";
