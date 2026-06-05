# 🚀 Guia Rápido - Testar Frontend GoDelivery

## ✅ Pré-requisitos

1. **Backend rodando** em `https://localhost:7007`
2. **Banco de dados** com migrations aplicadas
3. **Node.js** instalado (v16+)

## 📦 Instalação

```bash
cd delivery-front
npm install
```

## ▶️ Executar

```bash
npm run dev
```

Acesse: `http://localhost:5173`

## 🧪 Fluxo de Teste Completo

### 1️⃣ Área Admin - Preparar Dados

**Acesse:** `http://localhost:5173/admin`

#### Criar Restaurante
1. Clique em **"Restaurantes"**
2. Clique em **"+ Adicionar Restaurante"**
3. Preencha:
   - Nome: "Pizzaria do Zé"
   - Descrição: "As melhores pizzas da cidade"
   - Categoria: "Pizzaria"
   - Imagem URL: `https://via.placeholder.com/300x200?text=Pizzaria`
   - Endereço: "Rua das Flores, 123"
4. Clique em **"Salvar"**

#### Criar Produtos
1. Vá em **Admin → Produtos**
2. Selecione o restaurante criado no filtro
3. Clique em **"+ Adicionar Produto"**
4. Crie alguns produtos:

**Produto 1:**
- Nome: "Pizza Margherita"
- Descrição: "Molho, queijo e manjericão"
- Preço: 45.90
- Categoria: "Pizzas"
- Imagem: `https://via.placeholder.com/300x200?text=Pizza+Margherita`

**Produto 2:**
- Nome: "Pizza Calabresa"
- Descrição: "Molho, queijo, calabresa e cebola"
- Preço: 49.90
- Categoria: "Pizzas"
- Imagem: `https://via.placeholder.com/300x200?text=Pizza+Calabresa`

**Produto 3:**
- Nome: "Refrigerante"
- Descrição: "Coca-Cola 2L"
- Preço: 10.00
- Categoria: "Bebidas"

#### Criar Entregador
1. Vá em **Admin → Entregadores**
2. Clique em **"+ Adicionar Entregador"**
3. Preencha:
   - Nome: "João da Silva"
   - Telefone: "(11) 99999-9999"
   - Veículo: "Moto"
   - Placa: "ABC-1234"
4. Clique em **"Salvar"**
5. **Certifique-se que está DISPONÍVEL** (botão verde 🟢)

---

### 2️⃣ Área Cliente - Fazer Pedido

#### Ver Restaurantes
1. Vá para **Home** (`http://localhost:5173/`)
2. Veja o card do restaurante criado
3. Clique no card

#### Adicionar ao Carrinho
1. Na página do cardápio, veja os produtos
2. Use os filtros de categoria (Pizzas, Bebidas)
3. Clique em **"Adicionar"** em alguns produtos
4. Veja o badge do carrinho atualizando no header

#### Finalizar Pedido
1. Clique no botão **"🛒 Carrinho"** no header
2. Revise os itens
3. Ajuste quantidades com +/- se necessário
4. Clique em **"Finalizar Pedido"**

#### Checkout
1. Preencha os dados:

**Dados Pessoais:**
- Nome: Seu nome
- Email: seu@email.com
- Telefone: (11) 98888-8888
- CPF: (opcional)

**Endereço:**
- CEP: 01234-567
- Rua: Rua Teste
- Número: 100
- Bairro: Centro
- Cidade: São Paulo
- Estado: SP

**Pagamento:**
- Método: PIX (ou outro)

2. Clique em **"Confirmar Pedido"**

#### Confirmação
1. Veja a mensagem de sucesso
2. Veja o número do pedido
3. Clique em **"Acompanhar Pedido"**

#### Acompanhamento
1. Veja a timeline de status (começará em "Pendente")
2. Deixe a página aberta (atualização automática a cada 10s)

---

### 3️⃣ Área Admin - Processar Pedido

**Abra uma nova aba:** `http://localhost:5173/admin`

#### Gerenciar Pedido
1. Clique em **"Pedidos"**
2. Veja o pedido criado na lista
3. Clique no botão **⚙️** (Gerenciar)

#### Atualizar Status
1. Selecione status: **"Confirmado"**
2. Clique em **"Atualizar Status"**
3. Volte para a aba de acompanhamento → veja o status atualizar!

#### Atribuir Entregador
1. Volte para Admin → Pedidos → ⚙️
2. Selecione o entregador criado
3. Clique em **"Atribuir Entregador"**
4. Na aba de acompanhamento, veja os dados do entregador aparecerem!

#### Continuar Atualizando
1. Mude para **"Em Preparo"**
2. Depois **"Em Entrega"**
3. Por fim **"Entregue"**
4. Veja a timeline completando na página de acompanhamento!

---

## 🎯 Checklist de Funcionalidades

### Área Cliente ✅
- [ ] Visualizar restaurantes
- [ ] Filtrar por categoria
- [ ] Ver cardápio
- [ ] Filtrar produtos por categoria
- [ ] Adicionar ao carrinho
- [ ] Ver badge de quantidade no header
- [ ] Editar quantidades no carrinho
- [ ] Remover itens do carrinho
- [ ] Ver total calculado
- [ ] Preencher dados de checkout
- [ ] Criar pedido com sucesso
- [ ] Ver confirmação do pedido
- [ ] Acompanhar pedido em tempo real
- [ ] Ver timeline de status
- [ ] Ver dados do entregador

### Área Admin ✅
- [ ] Ver dashboard com estatísticas
- [ ] Criar restaurante
- [ ] Editar restaurante
- [ ] Deletar restaurante
- [ ] Criar produto
- [ ] Editar produto
- [ ] Deletar produto
- [ ] Alterar disponibilidade de produto
- [ ] Filtrar produtos por restaurante
- [ ] Criar entregador
- [ ] Editar entregador
- [ ] Deletar entregador
- [ ] Alterar disponibilidade de entregador
- [ ] Ver clientes
- [ ] Ver endereços de cliente
- [ ] Ver pedidos
- [ ] Filtrar pedidos por status
- [ ] Atualizar status do pedido
- [ ] Atribuir entregador ao pedido

---

## 🐛 Troubleshooting

### Erro de CORS
Se aparecer erro de CORS no console:
- Verifique se o backend está rodando
- Verifique se o backend tem CORS habilitado para `http://localhost:5173`

### Carrinho vazio após refresh
- Normal! O carrinho usa localStorage e deve persistir
- Se não persistir, verifique o console para erros

### API retorna 404
- Verifique se a URL base está correta em `src/config/api.ts`
- Backend deve estar em `https://localhost:7007`

### Pedido não atualiza automaticamente
- O polling acontece a cada 10 segundos
- Aguarde ou force refresh da página

---

## 📸 Screenshots Esperados

1. **Home** - Grid de restaurantes com filtros
2. **Cardápio** - Header do restaurante + grid de produtos
3. **Carrinho** - Lista de itens + resumo lateral
4. **Checkout** - Formulário em 2 colunas + resumo
5. **Confirmação** - Ícone de sucesso + card com detalhes
6. **Acompanhamento** - Timeline vertical com status
7. **Admin Dashboard** - Cards com estatísticas + menu
8. **Admin Tabelas** - Tabelas responsivas com ações

---

## 🎉 Pronto!

Você testou todo o fluxo do MVP! 

**Próximos testes:**
- Teste em mobile (abra DevTools → Toggle Device Toolbar)
- Teste com múltiplos restaurantes
- Teste cancelamento de pedido
- Teste produtos indisponíveis
