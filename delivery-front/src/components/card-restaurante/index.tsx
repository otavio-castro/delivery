import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import type { Restaurante } from "../../types/entities";
import * as Styled from "./index.style";

interface CardRestauranteProps {
  restaurante: Restaurante;
}

const CardRestaurante = ({ restaurante }: CardRestauranteProps) => {
  const navigate = useNavigate();

  return (
    <Styled.Card onClick={() => navigate(`/cardapio/${restaurante.restauranteId}`)}>
      <Styled.Image
        src={restaurante.imagemUrl || "https://via.placeholder.com/300x200?text=Sem+Imagem"}
        alt={restaurante.nome}
      />
      <Styled.Content>
        <Styled.Title>{restaurante.nome}</Styled.Title>
        {restaurante.categoria && <Styled.Categoria>{restaurante.categoria}</Styled.Categoria>}
        {restaurante.descricao && <Styled.Descricao>{restaurante.descricao}</Styled.Descricao>}
        <Styled.Footer>
          <Styled.Nota><FaStar /> {restaurante.nota.toFixed(1)}</Styled.Nota>
        </Styled.Footer>
      </Styled.Content>
    </Styled.Card>
  );
};

export default CardRestaurante;
