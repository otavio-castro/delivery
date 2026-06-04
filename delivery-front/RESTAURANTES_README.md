# Frontend - Restaurantes

Interface frontend completa para consumir a API de Restaurantes.

## ✅ Arquivos Implementados

### 1. Tipos TypeScript
- ✅ `src/types/entities.ts` — Interface `Restaurante` e outras entidades

### 2. Stores Zustand
- ✅ `src/stores/restaurantes.store.ts` — Gerenciamento de estado dos restaurantes
- ✅ `src/stores/loading.store.ts` — Gerenciamento de loading global

### 3. Configuração API
- ✅ `src/config/api.ts` — Cliente HTTP para consumir `/api/restaurantes`

### 4. Página de Restaurantes
- ✅ `src/pages/restaurantes-page/index.tsx` — Componente principal
- ✅ `src/pages/restaurantes-page/index.style.ts` — Estilos da página
- ✅ `src/pages/restaurantes-page/components/card-restaurante/index.tsx` — Card de restaurante
- ✅ `src/pages/restaurantes-page/components/card-restaurante/index.style.ts` — Estilos do card

### 5. Configuração Global
- ✅ `src/styles/global.ts` — Estilos globais e variáveis CSS
- ✅ `src/App.tsx` — Rotas com React Router

## 📦 Instalação de Dependências

O projeto requer as seguintes dependências que ainda não estão instaladas:

```bash
cd delivery-front

# Instalar dependências principais
npm install styled-components zustand react-router-dom

# Instalar tipos TypeScript
npm install -D @types/styled-components
```

## 🚀 Como Executar

1. Certifique-se de que o backend está rodando em `http://localhost:5000`
2. Instale as dependências (comando acima)
3. Execute o frontend:

```bash
npm run dev
```

## 🎯 Funcionalidades Implementadas

### Página de Restaurantes (`/restaurantes`)
- ✅ Listagem de todos os restaurantes ativos
- ✅ Cards com:
  - Imagem (ou placeholder se não houver)
  - Nome do restaurante
  - Categoria (badge destacado)
  - Nota com estrela
  - Descrição (limitada a 2 linhas)
  - Endereço com ícone de localização
- ✅ Estados de loading com skeleton cards
- ✅ Tratamento de erros
- ✅ Mensagem quando não há restaurantes
- ✅ Hover effects nos cards
- ✅ Design responsivo

### Store Zustand
- ✅ `setRestaurantes()` — Define lista completa
- ✅ `addRestaurante()` — Adiciona um restaurante
- ✅ `updateRestaurante()` — Atualiza dados de um restaurante
- ✅ `removeRestaurante()` — Remove um restaurante

### API Client
- ✅ `api.restaurantes.getAll(categoria?)` — Busca todos (com filtro opcional)
- ✅ `api.restaurantes.getById(id)` — Busca por ID
- ✅ Tratamento de erros com try/catch
- ✅ Tipagem completa com TypeScript

## 🎨 Design System

### Variáveis CSS Disponíveis
```css
--color-primary: #ff6b35          /* Laranja delivery */
--color-primary-dark: #e55a2b     /* Hover */
--color-background: #f8f9fa       /* Fundo da página */
--color-card: #ffffff             /* Fundo dos cards */
--color-text: #333333             /* Texto principal */
--color-text-muted: #6c757d       /* Texto secundário */
--color-heading: #1a1a1a          /* Títulos */
--border-radius-lg: 12px          /* Cards */
--shadow-sm: 0 2px 8px rgba(...)  /* Sombra padrão */
--shadow-md: 0 4px 16px rgba(...) /* Sombra hover */
```

## 📁 Estrutura de Arquivos

```
src/
├── config/
│   └── api.ts                    ← Cliente HTTP
├── pages/
│   └── restaurantes-page/
│       ├── index.tsx             ← Página principal
│       ├── index.style.ts        ← Estilos da página
│       └── components/
│           └── card-restaurante/
│               ├── index.tsx     ← Card component
│               └── index.style.ts ← Estilos do card
├── stores/
│   ├── restaurantes.store.ts    ← Estado dos restaurantes
│   └── loading.store.ts         ← Estado de loading
├── styles/
│   └── global.ts                ← Estilos globais
├── types/
│   └── entities.ts              ← Interfaces TypeScript
└── App.tsx                      ← Rotas
```

## ✅ Checklist de Implementação

- [x] Interface `Restaurante` em `types/entities.ts`
- [x] Store Zustand com todas as operações CRUD
- [x] Configuração da API com tipagem
- [x] Página de listagem responsiva
- [x] Card de restaurante com todos os dados
- [x] Loading state com skeleton
- [x] Tratamento de erros
- [x] Mensagem de lista vazia
- [x] Rota configurada no App.tsx
- [x] Estilos globais com variáveis CSS
- [x] Convenções do projeto seguidas:
  - [x] `import * as Styled from "./index.style.ts"`
  - [x] Named exports nos styled-components
  - [x] Store usando `create<Interface>()`
  - [x] Componentes filhos em `components/`
  
## 🔗 Próximos Passos

1. Implementar navegação para a página de detalhes do restaurante
2. Adicionar filtro por categoria
3. Implementar busca por nome
4. Criar página de cardápio do restaurante
5. Adicionar favoritos
