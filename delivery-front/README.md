# 🍕 GoDelivery

**GoDelivery** - Plataforma completa de delivery de comida com gestão de restaurantes, pedidos e entregas.

## 🚀 Tecnologias

- **React 19** com TypeScript
- **Vite** - Build tool ultra-rápido
- **Styled Components** - CSS-in-JS com temas claro/escuro
- **Zustand** - Gerenciamento de estado com persistência
- **React Router v6** - Navegação SPA
- **React Icons** - Biblioteca de ícones
- **Axios** - Cliente HTTP

## ✨ Funcionalidades

### 👤 Cliente
- Navegação por restaurantes e categorias
- Filtro dinâmico de categorias
- Carrinho de compras com persistência
- Seleção de cliente existente ou cadastro no checkout
- Seleção de endereço ou cadastro de novo endereço
- Acompanhamento de pedido em tempo real
- Tema claro/escuro com persistência

### 🔧 Administrativo
- Gestão de restaurantes
- Gestão de produtos/cardápios
- Gestão de clientes e endereços
- Gestão de entregadores
- Gestão de pedidos com atualização de status
- Dashboard com estatísticas

## 📦 Instalação

```bash
cd delivery-front
npm install
```

## ▶️ Executar

```bash
npm run dev
```

Aplicação disponível em: `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── button/
│   ├── card-produto/
│   ├── card-restaurante/
│   ├── header/
│   ├── footer/
│   ├── input/
│   ├── select/
│   ├── modal/
│   ├── loading/
│   └── status-badge/
├── pages/              # Páginas da aplicação
│   ├── home-page/
│   ├── checkout-page/
│   ├── carrinho-page/
│   ├── admin-page/
│   └── ...
├── stores/             # Zustand stores
│   ├── carrinho.store.ts
│   ├── theme.store.ts
│   └── restaurantes.store.ts
├── types/              # TypeScript interfaces
│   └── entities.ts
├── config/             # Configurações
│   └── api.ts
└── index.css           # Estilos globais e variáveis CSS

```

## 🎨 Convenções do Projeto

### Styled Components
```tsx
// Todo arquivo de estilo: index.style.ts
import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// No componente: index.tsx
import * as Styled from "./index.style";

const Component = () => {
  return <Styled.Container>...</Styled.Container>;
};
```

### Ícones
- **SEMPRE** usar `react-icons`
- **NUNCA** usar emojis hardcoded

### Tema
- Variáveis CSS: `var(--color-primary)`, `var(--color-background)`, etc
- Atributo `data-theme="light"` ou `data-theme="dark"` no `:root`

## 🔗 Backend

Backend ASP.NET Core rodando em: `https://localhost:7007`

---

**© 2026 GoDelivery - Peça comida dos melhores restaurantes da cidade!** 🍕🍔🍣
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
