import { Link } from "react-router-dom";
import { FaPizzaSlice, FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import { useCarrinhoStore } from "../../stores/carrinho.store";
import { useThemeStore } from "../../stores/theme.store";
import { useAuthStore } from "../../stores/auth.store";
import * as Styled from "./index.style";

const Header = () => {
  const quantidadeTotal = useCarrinhoStore((state) => state.getQuantidadeTotal());
  const { theme, toggleTheme } = useThemeStore();
  const { clienteLogado, logout } = useAuthStore();
  const isAdmin = !!clienteLogado?.isAdmin;

  return (
    <Styled.Header>
      <Styled.Container>
        <Link to="/">
          <Styled.Logo>
            <FaPizzaSlice size={24} /> GoDelivery
          </Styled.Logo>
        </Link>

        <Styled.Nav>
          <Link to="/">
            <Styled.NavLink>Home</Styled.NavLink>
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <Styled.NavLink>Admin</Styled.NavLink>
            </Link>
          )}

          {clienteLogado ? (
            <Styled.AuthArea>
              <Styled.AuthText>Ola, {clienteLogado.nome}</Styled.AuthText>
              <Styled.AuthButton onClick={logout}>Sair</Styled.AuthButton>
            </Styled.AuthArea>
          ) : (
            <Link to="/login">
              <Styled.NavLink>Entrar</Styled.NavLink>
            </Link>
          )}

          <Styled.ThemeToggle onClick={toggleTheme} title={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Styled.ThemeToggle>
          <Link to="/carrinho">
            <Styled.CarrinhoButton>
              <FaShoppingCart size={18} /> Carrinho
              {quantidadeTotal > 0 && <Styled.Badge>{quantidadeTotal}</Styled.Badge>}
            </Styled.CarrinhoButton>
          </Link>
        </Styled.Nav>
      </Styled.Container>
    </Styled.Header>
  );
};

export default Header;
