import type { Produto } from "../../types/entities";
import { useCarrinhoStore } from "../../stores/carrinho.store";
import Button from "../button";
import * as Styled from "./index.style";

interface CardProdutoProps {
  produto: Produto;
}

const CardProduto = ({ produto }: CardProdutoProps) => {
  const addItem = useCarrinhoStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(produto, 1);
  };

  return (
    <Styled.Card>
      <Styled.Image
        src={produto.imagemUrl || "https://via.placeholder.com/300x200?text=Sem+Imagem"}
        alt={produto.nome}
      />
      <Styled.Content>
        <Styled.Title>{produto.nome}</Styled.Title>
        {produto.categoria && <Styled.Categoria>{produto.categoria}</Styled.Categoria>}
        {produto.descricao && <Styled.Descricao>{produto.descricao}</Styled.Descricao>}
        <Styled.Footer>
          <Styled.Preco>R$ {produto.preco.toFixed(2)}</Styled.Preco>
          <Button onClick={handleAddToCart} disabled={!produto.disponivel}>
            {produto.disponivel ? "Adicionar" : "Indisponível"}
          </Button>
        </Styled.Footer>
      </Styled.Content>
    </Styled.Card>
  );
};

export default CardProduto;
