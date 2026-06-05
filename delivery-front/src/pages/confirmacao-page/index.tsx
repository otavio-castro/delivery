import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../config/api";
import type { Pedido, ItemPedido, Produto, Endereco } from "../../types/entities";
import Layout from "../../components/layout";
import Button from "../../components/button";
import * as Styled from "./index.style";

const ConfirmacaoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [itens, setItens] = useState<(ItemPedido & { produto: Produto })[]>([]);
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadPedido(parseInt(id));
    }
  }, [id]);

  const loadPedido = async (pedidoId: number) => {
    try {
      const pedidoData = await api.pedidos.getById(pedidoId);
      setPedido(pedidoData);

      const itensData = await api.itensPedido.getAll(pedidoId);
      const itensComProdutos = await Promise.all(
        itensData.map(async (item) => {
          const produto = await api.produtos.getById(item.produtoId);
          return { ...item, produto };
        })
      );
      setItens(itensComProdutos);

      const enderecoData = await api.enderecos.getById(pedidoData.enderecoId);
      setEndereco(enderecoData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Styled.Container>
          <Styled.Loading>Carregando...</Styled.Loading>
        </Styled.Container>
      </Layout>
    );
  }

  if (!pedido) {
    return (
      <Layout>
        <Styled.Container>
          <Styled.Error>Pedido não encontrado</Styled.Error>
        </Styled.Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Styled.Container>
        <Styled.SuccessIcon>✓</Styled.SuccessIcon>
        <Styled.Title>Pedido Confirmado!</Styled.Title>
        <Styled.Subtitle>Seu pedido foi realizado com sucesso</Styled.Subtitle>

        <Styled.Card>
          <Styled.PedidoNumero>
            Pedido #{pedido.pedidoId.toString().padStart(4, "0")}
          </Styled.PedidoNumero>

          <Styled.Section>
            <Styled.SectionTitle>Itens do Pedido</Styled.SectionTitle>
            {itens.map((item) => (
              <Styled.ItemRow key={item.itemPedidoId}>
                <span>
                  {item.quantidade}x {item.produto.nome}
                </span>
                <span>R$ {(item.precoUnitario * item.quantidade).toFixed(2)}</span>
              </Styled.ItemRow>
            ))}
          </Styled.Section>

          <Styled.Divider />

          <Styled.Section>
            <Styled.SectionTitle>Endereço de Entrega</Styled.SectionTitle>
            {endereco && (
              <Styled.Text>
                {endereco.logradouro}, {endereco.numero}
                {endereco.complemento && ` - ${endereco.complemento}`}
                <br />
                {endereco.bairro} - {endereco.cidade}/{endereco.estado}
                <br />
                CEP: {endereco.cep}
              </Styled.Text>
            )}
          </Styled.Section>

          <Styled.Divider />

          <Styled.TotalRow>
            <span>Total:</span>
            <span>R$ {pedido.valorTotal.toFixed(2)}</span>
          </Styled.TotalRow>
        </Styled.Card>

        <Styled.Actions>
          <Button onClick={() => navigate(`/acompanhamento/${pedido.pedidoId}`)}>
            Acompanhar Pedido
          </Button>
          <Button variant="secondary" onClick={() => navigate("/")}>
            Voltar ao Início
          </Button>
        </Styled.Actions>
      </Styled.Container>
    </Layout>
  );
};

export default ConfirmacaoPage;
