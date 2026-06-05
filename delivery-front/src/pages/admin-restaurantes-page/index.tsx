import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { api } from "../../config/api";
import { useRestaurantesStore } from "../../stores/restaurantes.store";
import type { Restaurante } from "../../types/entities";
import Layout from "../../components/layout";
import Button from "../../components/button";
import Input from "../../components/input";
import Modal from "../../components/modal";
import * as Styled from "./index.style";

const AdminRestaurantesPage = () => {
  const navigate = useNavigate();
  const { restaurantes, setRestaurantes, addRestaurante, updateRestaurante, removeRestaurante } =
    useRestaurantesStore();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    imagemUrl: "",
    endereco: "",
  });

  useEffect(() => {
    loadRestaurantes();
  }, []);

  const loadRestaurantes = async () => {
    try {
      setLoading(true);
      const data = await api.restaurantes.getAll();
      setRestaurantes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (restaurante?: Restaurante) => {
    if (restaurante) {
      setEditingId(restaurante.restauranteId);
      setFormData({
        nome: restaurante.nome,
        descricao: restaurante.descricao || "",
        categoria: restaurante.categoria || "",
        imagemUrl: restaurante.imagemUrl || "",
        endereco: restaurante.endereco || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        nome: "",
        descricao: "",
        categoria: "",
        imagemUrl: "",
        endereco: "",
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const updated = await api.restaurantes.update(editingId, formData);
        updateRestaurante(editingId, updated);
      } else {
        const created = await api.restaurantes.create(formData);
        addRestaurante(created);
      }
      handleCloseModal();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar restaurante");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este restaurante?")) return;

    try {
      await api.restaurantes.delete(id);
      removeRestaurante(id);
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir restaurante");
    }
  };

  return (
    <Layout>
      <Styled.Container>
        <Styled.Header>
          <Styled.Title>Gerenciar Restaurantes</Styled.Title>
          <Styled.Actions>
            <Button onClick={() => navigate("/admin")}>← Voltar</Button>
            <Button onClick={() => handleOpenModal()}>+ Adicionar Restaurante</Button>
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
                <th>Categoria</th>
                <th>Nota</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {restaurantes.map((restaurante) => (
                <tr key={restaurante.restauranteId}>
                  <td>{restaurante.restauranteId}</td>
                  <td>{restaurante.nome}</td>
                  <td>{restaurante.categoria || "-"}</td>
                  <td><FaStar style={{ color: 'var(--color-warning)', marginRight: '0.25rem' }} />{restaurante.nota.toFixed(1)}</td>
                  <td>
                    <Styled.Status active={restaurante.ativo}>
                      {restaurante.ativo ? "Ativo" : "Inativo"}
                    </Styled.Status>
                  </td>
                  <td>
                    <Styled.ActionButtons>
                      <Styled.ActionButton onClick={() => handleOpenModal(restaurante)}>
                        <FaEdit />
                      </Styled.ActionButton>
                      <Styled.ActionButton onClick={() => handleDelete(restaurante.restauranteId)}>
                        <FaTrash />
                      </Styled.ActionButton>
                    </Styled.ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Styled.Table>
        )}

        <Modal isOpen={modalOpen} onClose={handleCloseModal} title={editingId ? "Editar Restaurante" : "Novo Restaurante"}>
          <Styled.ModalForm>
            <Input
              label="Nome *"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            />
            <Input
              label="Descrição"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            />
            <Input
              label="Categoria"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              placeholder="Ex: Pizzaria, Hamburgueria"
            />
            <Input
              label="URL da Imagem"
              value={formData.imagemUrl}
              onChange={(e) => setFormData({ ...formData, imagemUrl: e.target.value })}
            />
            <Input
              label="Endereço"
              value={formData.endereco}
              onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
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

export default AdminRestaurantesPage;
