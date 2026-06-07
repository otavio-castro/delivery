import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import { useThemeStore } from "./stores/theme.store";
import { useAuthStore } from "./stores/auth.store";

// Páginas Cliente
import HomePage from "./pages/home-page";
import CardapioPage from "./pages/cardapio-page";
import CarrinhoPage from "./pages/carrinho-page";
import CheckoutPage from "./pages/checkout-page";
import ConfirmacaoPage from "./pages/confirmacao-page";
import AcompanhamentoPage from "./pages/acompanhamento-page";
import LoginPage from "./pages/login-page";

// Páginas Admin
import AdminPage from "./pages/admin-page";
import AdminRestaurantesPage from "./pages/admin-restaurantes-page";
import AdminProdutosPage from "./pages/admin-produtos-page";
import AdminEntregadoresPage from "./pages/admin-entregadores-page";
import AdminClientesPage from "./pages/admin-clientes-page";
import AdminPedidosPage from "./pages/admin-pedidos-page";

function App() {
  const { theme } = useThemeStore();
  const { clienteLogado } = useAuthStore();
  const isAdmin = !!clienteLogado?.isAdmin;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {/* Rotas Cliente */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cardapio/:id" element={<CardapioPage />} />
        <Route path="/carrinho" element={<CarrinhoPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmacao/:id" element={<ConfirmacaoPage />} />
        <Route path="/acompanhamento/:id?" element={<AcompanhamentoPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas Admin */}
        <Route path="/admin" element={isAdmin ? <AdminPage /> : <Navigate to="/login" replace />} />
        <Route path="/admin/restaurantes" element={isAdmin ? <AdminRestaurantesPage /> : <Navigate to="/login" replace />} />
        <Route path="/admin/produtos" element={isAdmin ? <AdminProdutosPage /> : <Navigate to="/login" replace />} />
        <Route path="/admin/entregadores" element={isAdmin ? <AdminEntregadoresPage /> : <Navigate to="/login" replace />} />
        <Route path="/admin/clientes" element={isAdmin ? <AdminClientesPage /> : <Navigate to="/login" replace />} />
        <Route path="/admin/pedidos" element={isAdmin ? <AdminPedidosPage /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
