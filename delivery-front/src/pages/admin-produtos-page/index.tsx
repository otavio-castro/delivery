import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaCircle } from "react-icons/fa";
import { api } from "../../config/api";
import { useProdutosStore } from "../../stores/produtos.store";
import { useRestaurantesStore } from "../../stores/restaurantes.store";
import type { Produto } from "../../types/entities";
import Layout from "../../components/layout";
import Button from "../../components/button";
import Input from "../../components/input";
import Select from "../../components/select";
import Modal from "../../components/modal";
import * as Styled from "./index.style";

const AdminProdutosPage = () => {
  const navigate = useNavigate();
  const { produtos, setProdutos, addProduto, updateProduto, removeProduto } = useProdutosStore();
  const { restaurantes, setRestaurantes } = useRestaurantesStore();
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [filtroRestaurante, setFiltroRestaurante] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    restauranteId: 0,
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    imagemUrl: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [produtosData, restaurantesData] = await Promise.all([
        api.produtos.getAll(),
        api.restaurantes.getAll(),
      ]);
      setProdutos(produtosData);
      setRestaurantes(restaurantesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (produto?: Produto) => {
    if (produto) {
      setEditingId(produto.produtoId);
      setFormData({
        restauranteId: produto.restauranteId,
        nome: produto.nome,
        descricao: produto.descricao || "",
        preco: produto.preco.toString(),
        categoria: produto.categoria || "",
        imagemUrl: produto.imagemUrl || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        restauranteId: filtroRestaurante || restaurantes[0]?.restauranteId || 0,
        nome: "",
        descricao: "",
        preco: "",
        categoria: "",
        imagemUrl: "",
      });
    }
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        ...formData,
        preco: parseFloat(formData.preco),
      };

      if (editingId) {
        const updated = await api.produtos.update(editingId, data);
        updateProduto(editingId, updated);
      } else {
        const created = await api.produtos.create(data);
        addProduto(created);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar produto");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este produto?")) return;
    try {
      await api.produtos.delete(id);
      removeProduto(id);
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir produto");
    }
  };

  const handleToggleDisponibilidade = async (produto: Produto) => {
    try {
      await api.produtos.alterarDisponibilidade(produto.produtoId, !produto.disponivel);
      updateProduto(produto.produtoId, { disponivel: !produto.disponivel });
    } catch (err) {
      console.error(err);
      alert("Erro ao alterar disponibilidade");
    }
  };

  const produtosFiltrados = filtroRestaurante
    ? produtos.filter((p) => p.restauranteId === filtroRestaurante)
    : produtos;

  return (
    <Layout>
      <Styled.Container>
        <Styled.Header>
          <Styled.Title>Gerenciar Produtos</Styled.Title>
          <Styled.Actions>
            <Button onClick={() => navigate("/admin")}>← Voltar</Button>
            <Button onClick={() => handleOpenModal()}>+ Adicionar Produto</Button>
          </Styled.Actions>
        </Styled.Header>

        <div style={{ marginBottom: "1rem" }}>
          <Select
            label="Filtrar por Restaurante"
            value={filtroRestaurante || ""}
            onChange={(e) => setFiltroRestaurante(e.target.value ? parseInt(e.target.value) : null)}
            options={[
              { value: "", label: "Todos os Restaurantes" },
              ...restaurantes.map((r) => ({ value: r.restauranteId, label: r.nome })),
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
                <th>Nome</th>
                <th>Restaurante</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Disponível</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((produto) => {
                const restaurante = restaurantes.find((r) => r.restauranteId === produto.restauranteId);
                return (
                  <tr key={produto.produtoId}>
                    <td>{produto.produtoId}</td>
                    <td>{produto.nome}</td>
                    <td>{restaurante?.nome || "-"}</td>
                    <td>{produto.categoria || "-"}</td>
                    <td>R$ {produto.preco.toFixed(2)}</td>
                    <td>
                      <Styled.Status active={produto.disponivel}>
                        {produto.disponivel ? "Sim" : "Não"}
                      </Styled.Status>
                    </td>
                    <td>
                      <Styled.ActionButtons>
                        <Styled.ActionButton onClick={() => handleToggleDisponibilidade(produto)}>
                          <FaCircle style={{ color: produto.disponivel ? 'var(--color-success)' : 'var(--color-error)' }} />
                        </Styled.ActionButton>
                        <Styled.ActionButton onClick={() => handleOpenModal(produto)}><FaEdit /></Styled.ActionButton>
                        <Styled.ActionButton onClick={() => handleDelete(produto.produtoId)}><FaTrash /></Styled.ActionButton>
                      </Styled.ActionButtons>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Styled.Table>
        )}

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Editar Produto" : "Novo Produto"}>
          <Styled.ModalForm>
            <Select
              label="Restaurante *"
              value={formData.restauranteId}
              onChange={(e) => setFormData({ ...formData, restauranteId: parseInt(e.target.value) })}
              options={restaurantes.map((r) => ({ value: r.restauranteId, label: r.nome }))}
            />
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
              label="Preço *"
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
            />
            <Input
              label="Categoria"
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
            />
            <Input
              label="URL da Imagem"
              value={formData.imagemUrl}
              onChange={(e) => setFormData({ ...formData, imagemUrl: e.target.value })}
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

export default AdminProdutosPage;
