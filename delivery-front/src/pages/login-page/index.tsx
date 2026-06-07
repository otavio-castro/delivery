import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { api } from "../../config/api";
import { useAuthStore } from "../../stores/auth.store";
import Layout from "../../components/layout";
import Input from "../../components/input";
import Button from "../../components/button";
import * as Styled from "./index.style";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !senha) {
      setError("Informe email e senha.");
      return;
    }

    try {
      setLoading(true);
      const cliente = await api.clientes.login(email, senha);
      login(cliente);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Nao foi possivel autenticar. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Styled.Container>
        <Styled.Card>
          <Styled.Title>
            <FaSignInAlt /> Entrar
          </Styled.Title>
          <Styled.Subtitle>Autenticacao de usuarios (requisito da disciplina)</Styled.Subtitle>

          <Styled.Form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="nome@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            {error && <Styled.Error>{error}</Styled.Error>}

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </Styled.Form>
        </Styled.Card>
      </Styled.Container>
    </Layout>
  );
};

export default LoginPage;
