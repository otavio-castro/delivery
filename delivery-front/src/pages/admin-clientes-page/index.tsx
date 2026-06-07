import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { api } from "../../config/api";
import type { Cliente, Endereco } from "../../types/entities";
import Layout from "../../components/layout";
import Button from "../../components/button";
import Modal from "../../components/modal";
import * as Styled from "./index.style";

const AdminClientesPage = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      setLoading(true);
      const data = await api.clientes.getAll();
      setClientes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerEnderecos = async (clienteId: number) => {
    try {
      const data = await api.enderecos.getAll(clienteId);
      setEnderecos(data);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar endereços");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente excluir este cliente?")) return;
    try {
      await api.clientes.delete(id);
      setClientes((prev) => prev.filter((c) => c.clienteId !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir cliente");
    }
  };

  return (
    <Layout>
      <Styled.Container>
        <Styled.Header>
          <Styled.Title>Gerenciar Clientes</Styled.Title>
          <Styled.Actions>
            <Button onClick={() => navigate("/admin")}>← Voltar</Button>
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
                <th>Email</th>
                <th>Telefone</th>
                <th>CPF</th>
                <th>Data Cadastro</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.clienteId}>
                  <td>{cliente.clienteId}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefone || "-"}</td>
                  <td>{cliente.cpf || "-"}</td>
                  <td>
                    {cliente.dataCadastro
                      ? new Date(cliente.dataCadastro).toLocaleDateString("pt-BR")
                      : "-"}
                  </td>
                  <td>
                    <Styled.ActionButtons>
                      <Styled.ActionButton onClick={() => handleVerEnderecos(cliente.clienteId)}>
                        <FaMapMarkerAlt />
                      </Styled.ActionButton>
                      <Styled.ActionButton onClick={() => handleDelete(cliente.clienteId)}>
                        <FaTrash />
                      </Styled.ActionButton>
                    </Styled.ActionButtons>
                  </td>
                </tr>
              ))}
            </tbody>
          </Styled.Table>
        )}

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Endereços do Cliente">
          <div>
            {enderecos.length === 0 ? (
              <p>Nenhum endereço cadastrado</p>
            ) : (
              enderecos.map((endereco) => (
                <div
                  key={endereco.enderecoId}
                  style={{
                    padding: "1rem",
                    marginBottom: "1rem",
                    backgroundColor: "var(--color-background)",
                    borderRadius: "var(--border-radius-md)",
                  }}
                >
                  <strong>
                    {endereco.logradouro}, {endereco.numero}
                  </strong>
                  {endereco.complemento && <> - {endereco.complemento}</>}
                  <br />
                  {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                  <br />
                  CEP: {endereco.cep}
                </div>
              ))
            )}
          </div>
        </Modal>
      </Styled.Container>
    </Layout>
  );
};

export default AdminClientesPage;
