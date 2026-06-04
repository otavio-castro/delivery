import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    /* Cores principais */
    --color-primary: #ff6b35;
    --color-primary-dark: #e55a2b;
    --color-secondary: #004e89;
    
    /* Cores de fundo */
    --color-background: #f8f9fa;
    --color-card: #ffffff;
    
    /* Cores de texto */
    --color-text: #333333;
    --color-text-muted: #6c757d;
    --color-heading: #1a1a1a;
    
    /* Cores de borda */
    --color-border: #dee2e6;
    
    /* Cores de estado */
    --color-success: #28a745;
    --color-error: #dc3545;
    --color-warning: #ffc107;
    
    /* Border radius */
    --border-radius-sm: 6px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    
    /* Sombras */
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--color-background);
    color: var(--color-text);
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
