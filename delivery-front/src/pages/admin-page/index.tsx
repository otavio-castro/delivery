import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStore, FaPizzaSlice, FaMotorcycle, FaBox, FaUsers } from "react-icons/fa";
import { api } from "../../config/api";
import Layout from "../../components/layout";
import * as Styled from "./index.style";

const AdminPage = () => {
  const [stats, setStats] = useState({
    restaurantes: 0,
    produtos: 0,
    entregadores: 0,
    clientes: 0,
    pedidosAtivos: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [restaurantes, produtos, entregadores, clientes, pedidos] = await Promise.all([
        api.restaurantes.getAll(),
        api.produtos.getAll(),
        api.entregadores.getAll(),
        api.clientes.getAll(),
        api.pedidos.getAll({ status: "Pendente" }),
      ]);

      setStats({
        restaurantes: restaurantes.length,
        produtos: produtos.length,
        entregadores: entregadores.length,
        clientes: clientes.length,
        pedidosAtivos: pedidos.length,
      });
    } catch (err) {
      console.error("❌ Erro ao carregar stats:", err);
    }
  };

  return (
    <Layout>
      <Styled.Container>
        <Styled.Title>Painel Administrativo</Styled.Title>

        <Styled.MenuGrid>
          <Link to="/admin/restaurantes">
            <Styled.MenuItem>
              <Styled.Badge>{stats.restaurantes}</Styled.Badge>
              <Styled.MenuIcon>
                <FaStore size={48} />
              </Styled.MenuIcon>
              <Styled.MenuTitle>Restaurantes</Styled.MenuTitle>
              <Styled.MenuDescription>Gerenciar restaurantes</Styled.MenuDescription>
            </Styled.MenuItem>
          </Link>

          <Link to="/admin/produtos">
            <Styled.MenuItem>
              <Styled.Badge>{stats.produtos}</Styled.Badge>
              <Styled.MenuIcon>
                <FaPizzaSlice size={48} />
              </Styled.MenuIcon>
              <Styled.MenuTitle>Produtos</Styled.MenuTitle>
              <Styled.MenuDescription>Gerenciar cardápios</Styled.MenuDescription>
            </Styled.MenuItem>
          </Link>

          <Link to="/admin/entregadores">
            <Styled.MenuItem>
              <Styled.Badge>{stats.entregadores}</Styled.Badge>
              <Styled.MenuIcon>
                <FaMotorcycle size={48} />
              </Styled.MenuIcon>
              <Styled.MenuTitle>Entregadores</Styled.MenuTitle>
              <Styled.MenuDescription>Gerenciar entregadores</Styled.MenuDescription>
            </Styled.MenuItem>
          </Link>

          <Link to="/admin/clientes">
            <Styled.MenuItem>
              <Styled.Badge>{stats.clientes}</Styled.Badge>
              <Styled.MenuIcon>
                <FaUsers size={48} />
              </Styled.MenuIcon>
              <Styled.MenuTitle>Clientes</Styled.MenuTitle>
              <Styled.MenuDescription>Gerenciar clientes</Styled.MenuDescription>
            </Styled.MenuItem>
          </Link>

          <Link to="/admin/pedidos">
            <Styled.MenuItem>
              <Styled.Badge>{stats.pedidosAtivos}</Styled.Badge>
              <Styled.MenuIcon>
                <FaBox size={48} />
              </Styled.MenuIcon>
              <Styled.MenuTitle>Pedidos</Styled.MenuTitle>
              <Styled.MenuDescription>Gerenciar pedidos</Styled.MenuDescription>
            </Styled.MenuItem>
          </Link>
        </Styled.MenuGrid>
      </Styled.Container>
    </Layout>
  );
};

export default AdminPage;
