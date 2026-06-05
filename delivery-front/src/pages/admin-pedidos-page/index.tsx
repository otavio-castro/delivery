import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCog, FaEye } from "react-icons/fa";
import { api } from "../../config/api";
import type { Pedido, Entregador } from "../../types/entities";
import Layout from "../../components/layout";
import Button from "../../components/button";
import Select from "../../components/select";
import StatusBadge from "../../components/status-badge";
import Modal from "../../components/modal";
import * as Styled from "./index.style";

const STATUS_OPTIONS = ["Pendente", "Confirmado", "Em Preparo", "Em Entrega", "Entregue", "Cancelado"];

const AdminPedidosPage = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [entregadores, setEntregadores] = useState<Entregador[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [novoStatus, setNovoStatus] = useState("");
  const [entregadorId, setEntregadorId] = useState<number | null>(null);
  const [filtroStatus, setFiltroStatus] = useState("");

  useEffect(() => {
    loadData();
  }, [filtroStatus]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pedidosData, entregadoresData] = await Promise.all([
        api.pedidos.getAll(filtroStatus ? { status: filtroStatus } : undefined),
        api.entregadores.getAll(),
      ]);
      setPedidos(pedidosData);
      setEntregadores(entregadoresData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setNovoStatus(pedido.status);
    setEntregadorId(pedido.entregadorId);
    setModalOpen(true);
  };

  const handleAtualizarStatus = async () => {
    if (!selectedPedido) return;

    try {
      await api.pedidos.atualizarStatus(selectedPedido.pedidoId, novoStatus);
      setPedidos((prev) =>
        prev.map((p) => (p.pedidoId === selectedPedido.pedidoId ? { ...p, status: novoStatus } : p))
      );
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar status");
    }
  };

  const handleAtribuirEntregador = async () => {
    if (!selectedPedido || !entregadorId) return;

    try {
      await api.pedidos.atribuirEntregador(selectedPedido.pedidoId, entregadorId);
      setPedidos((prev) =>
        prev.map((p) => (p.pedidoId === selectedPedido.pedidoId ? { ...p, entregadorId } : p))
      );
      alert("Entregador atribuído com sucesso");
    } catch (err) {
      console.error(err);
      alert("Erro ao atribuir entregador");
    }
  };

  const entregadoresDisponiveis = entregadores.filter((e) => e.disponivel);

  return (
    <Layout>
      <Styled.Container>
        <Styled.Header>
          <Styled.Title>Gerenciar Pedidos</Styled.Title>
          <Styled.Actions>
            <Button onClick={() => navigate("/admin")}>← Voltar</Button>
          </Styled.Actions>
        </Styled.Header>

        <div style={{ marginBottom: "1rem" }}>
          <Select
            label="Filtrar por Status"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            options={[
              { value: "", label: "Todos os Status" },
              ...STATUS_OPTIONS.map((s) => ({ value: s, label: s })),
            ]}
          />
        </div>

        {loading ? (
          <Styled.Loading>Carregando...</Styled.Loading>
        ) : (
          <Styled.Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Restaurante</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.pedidoId}>
                  <td>{pedido.pedidoId}</td>
                  <td>{pedido.clienteNome}</td>
                  <td>{pedido.restauranteNome}</td>
                  <td>R$ {pedido.valorTotal.toFixed(2)}</td>
                  <td>
                    <StatusBadge status={pedido.status} />
                  </td>
                  <td>{new Date(pedido.dataPedido).toLocaleString("pt-BR")}</td>
                  <td>
                    <Styled.ActionButtons>
                      <Styled.ActionButton onClick={() => handleOpenModal(pedido)}>
                        <FaCog />
                      </Styled.ActionButton>
                      <Styled.ActionButton onClick={() => navigate(`/acompanhamento/${pedido.pedidoId}`)}>
                        <FaEye />
                      </Styled.ActionButton>
                    </Styled.ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Styled.Table>
        )}

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Gerenciar Pedido">
          {selectedPedido && (
            <Styled.ModalForm>
              <div style={{ marginBottom: "1rem" }}>
                <strong>Pedido #{selectedPedido.pedidoId}</strong>
                <br />
                Valor: R$ {selectedPedido.valorTotal.toFixed(2)}
              </div>

              <Select
                label="Atualizar Status"
                value={novoStatus}
                onChange={(e) => setNovoStatus(e.target.value)}
                options={STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
              />
              <Button fullWidth onClick={handleAtualizarStatus}>
                Atualizar Status
              </Button>

              <hr style={{ margin: "1.5rem 0" }} />

              <Select
                label="Atribuir Entregador"
                value={entregadorId || ""}
                onChange={(e) => setEntregadorId(e.target.value ? parseInt(e.target.value) : null)}
                options={[
                  { value: "", label: "Selecione um entregador" },
                  ...entregadoresDisponiveis.map((e) => ({
                    value: e.entregadorId,
                    label: `${e.nome} - ${e.telefone}`,
                  })),
                ]}
              />
              <Button fullWidth onClick={handleAtribuirEntregador} variant="secondary">
                Atribuir Entregador
              </Button>
            </Styled.ModalForm>
          )}
        </Modal>
      </Styled.Container>
    </Layout>
  );
};

export default AdminPedidosPage;
