import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCircle } from "react-icons/fa";
import { api } from "../../config/api";
import type { Entregador } from "../../types/entities";
import Layout from "../../components/layout";
import Button from "../../components/button";
import Input from "../../components/input";
import Modal from "../../components/modal";
import * as Styled from "./index.style";

const AdminEntregadoresPage = () => {
  const navigate = useNavigate();
  const [entregadores, setEntregadores] = useState<Entregador[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    veiculo: "",
    placa: "",
  });

  useEffect(() => {
    loadEntregadores();
  }, []);

  const loadEntregadores = async () => {
    try {
      setLoading(true);
      const data = await api.entregadores.getAll();
      setEntregadores(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (entregador?: Entregador) => {
    if (entregador) {
      setEditingId(entregador.entregadorId);
      setFormData({
        nome: entregador.nome,
        telefone: entregador.telefone,
        veiculo: entregador.veiculo || "",
        placa: entregador.placa || "",
      });
    } else {
      setEditingId(null);
      setFormData({ nome: "", telefone: "", veiculo: "", placa: "" });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const updated = await api.entregadores.update(editingId, formData);
        setEntregadores((prev) => prev.map((e) => (e.entregadorId === editingId ? updated : e)));
      } else {
        const created = await api.entregadores.create(formData);
        setEntregadores((prev) => [...prev, created]);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar entregador");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este entregador?")) return;
    try {
      await api.entregadores.delete(id);
      setEntregadores((prev) => prev.filter((e) => e.entregadorId !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir entregador");
    }
  };

  const handleToggleDisponibilidade = async (entregador: Entregador) => {
    try {
      await api.entregadores.alterarDisponibilidade(entregador.entregadorId, !entregador.disponivel);
      setEntregadores((prev) =>
        prev.map((e) =>
          e.entregadorId === entregador.entregadorId ? { ...e, disponivel: !e.disponivel } : e
        )
      );
    } catch (err) {
      console.error(err);
      alert("Erro ao alterar disponibilidade");
    }
  };

  return (
    <Layout>
      <Styled.Container>
        <Styled.Header>
          <Styled.Title>Gerenciar Entregadores</Styled.Title>
          <Styled.Actions>
            <Button onClick={() => navigate("/admin")}>← Voltar</Button>
            <Button onClick={() => handleOpenModal()}>+ Adicionar Entregador</Button>
          </Styled.Actions>
        </Styled.Header>

        {loading ? (
          <Styled.Loading>Carregando...</Styled.Loading>
        ) : (
          <Styled.Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Veículo</th>
                <th>Placa</th>
                <th>Disponível</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {entregadores.map((entregador) => (
                <tr key={entregador.entregadorId}>
                  <td>{entregador.entregadorId}</td>
                  <td>{entregador.nome}</td>
                  <td>{entregador.telefone}</td>
                  <td>{entregador.veiculo || "-"}</td>
                  <td>{entregador.placa || "-"}</td>
                  <td>
                    <Styled.Status active={entregador.disponivel}>
                      {entregador.disponivel ? "Sim" : "Não"}
                    </Styled.Status>
                  </td>
                  <td>
                    <Styled.ActionButtons>
                      <Styled.ActionButton onClick={() => handleToggleDisponibilidade(entregador)}>
                        <FaCircle style={{ color: entregador.disponivel ? 'var(--color-success)' : 'var(--color-error)' }} />
                      </Styled.ActionButton>
                      <Styled.ActionButton onClick={() => handleOpenModal(entregador)}><FaEdit /></Styled.ActionButton>
                      <Styled.ActionButton onClick={() => handleDelete(entregador.entregadorId)}>
                        <FaTrash />
                      </Styled.ActionButton>
                    </Styled.ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Styled.Table>
        )}

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Editar Entregador" : "Novo Entregador"}>
          <Styled.ModalForm>
            <Input
              label="Nome *"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
            <Input
              label="Telefone *"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            />
            <Input
              label="Veículo"
              value={formData.veiculo}
              onChange={(e) => setFormData({ ...formData, veiculo: e.target.value })}
            />
            <Input
              label="Placa"
              value={formData.placa}
              onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
            />
            <Button fullWidth onClick={handleSave}>
              Salvar
            </Button>
          </Styled.ModalForm>
        </Modal>
      </Styled.Container>
    </Layout>
  );
};

export default AdminEntregadoresPage;
