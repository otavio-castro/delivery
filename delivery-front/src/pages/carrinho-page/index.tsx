import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { useCarrinhoStore } from "../../stores/carrinho.store";
import Layout from "../../components/layout";
import Button from "../../components/button";
import * as Styled from "./index.style";

const CarrinhoPage = () => {
  const navigate = useNavigate();
  const { itens, removeItem, updateQuantidade, getTotal, clear } = useCarrinhoStore();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (itens.length === 0) {
    return (
      <Layout>
        <Styled.Container>
          <Styled.EmptyState>
            <Styled.EmptyIcon><FaShoppingCart size={64} /></Styled.EmptyIcon>
            <Styled.EmptyTitle>Seu carrinho está vazio</Styled.EmptyTitle>
            <Styled.EmptyText>Adicione produtos para continuar</Styled.EmptyText>
            <Button onClick={() => navigate("/")}>Ver Restaurantes</Button>
          </Styled.EmptyState>
        </Styled.Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Styled.Container>
        <Styled.Header>
          <Styled.Title>Meu Carrinho</Styled.Title>
          <Styled.ClearButton onClick={clear}>Limpar Carrinho</Styled.ClearButton>
        </Styled.Header>

        <Styled.Content>
          <Styled.ItemsList>
            {itens.map((item) => (
              <Styled.Item key={item.produto.produtoId}>
                <Styled.ItemImage
                  src={item.produto.imagemUrl || "https://via.placeholder.com/100"}
                  alt={item.produto.nome}
                />
                <Styled.ItemInfo>
                  <Styled.ItemNome>{item.produto.nome}</Styled.ItemNome>
                  <Styled.ItemPreco>R$ {item.produto.preco.toFixed(2)}</Styled.ItemPreco>
                </Styled.ItemInfo>
                <Styled.ItemActions>
                  <Styled.QuantityControl>
                    <Styled.QuantityButton
                      onClick={() => updateQuantidade(item.produto.produtoId, item.quantidade - 1)}
                    >
                      -
                    </Styled.QuantityButton>
                    <Styled.Quantity>{item.quantidade}</Styled.Quantity>
                    <Styled.QuantityButton
                      onClick={() => updateQuantidade(item.produto.produtoId, item.quantidade + 1)}
                    >
                      +
                    </Styled.QuantityButton>
                  </Styled.QuantityControl>
                  <Styled.ItemSubtotal>R$ {(item.produto.preco * item.quantidade).toFixed(2)}</Styled.ItemSubtotal>
                  <Styled.RemoveButton onClick={() => removeItem(item.produto.produtoId)}>
                    <FaTrash />
                  </Styled.RemoveButton>
                </Styled.ItemActions>
              </Styled.Item>
            ))}
          </Styled.ItemsList>

          <Styled.Summary>
            <Styled.SummaryTitle>Resumo do Pedido</Styled.SummaryTitle>
            <Styled.SummaryRow>
              <span>Subtotal:</span>
              <span>R$ {getTotal().toFixed(2)}</span>
            </Styled.SummaryRow>
            <Styled.SummaryRow>
              <span>Taxa de entrega:</span>
              <span>R$ 5,00</span>
            </Styled.SummaryRow>
            <Styled.Divider />
            <Styled.SummaryTotal>
              <span>Total:</span>
              <span>R$ {(getTotal() + 5).toFixed(2)}</span>
            </Styled.SummaryTotal>
            <Button fullWidth onClick={handleCheckout}>
              Finalizar Pedido
            </Button>
          </Styled.Summary>
        </Styled.Content>
      </Styled.Container>
    </Layout>
  );
};

export default CarrinhoPage;
