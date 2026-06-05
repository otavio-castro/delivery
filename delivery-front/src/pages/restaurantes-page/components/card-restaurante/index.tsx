import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import * as Styled from "./index.style";
import type { Restaurante } from "../../../../types/entities";

interface Props {
  restaurante: Restaurante;
}

const CardRestaurante = ({ restaurante }: Props) => {
  const {
    restauranteId,
    nome,
    descricao,
    categoria,
    imagemUrl,
    endereco,
    nota,
  } = restaurante;

  const handleClick = () => {
    // Navegar para a página do restaurante
    console.log("Navegando para restaurante:", restauranteId);
    // TODO: usar navigate(`/restaurante/${restauranteId}`)
  };

  return (
    <Styled.Card onClick={handleClick}>
      <Styled.ImagemWrapper>
        {imagemUrl ? (
          <Styled.Imagem src={imagemUrl} alt={nome} />
        ) : (
          <Styled.ImagemPlaceholder>
            <Styled.IconePlaceholder>🍽️</Styled.IconePlaceholder>
          </Styled.ImagemPlaceholder>
        )}
        {categoria && <Styled.Categoria>{categoria}</Styled.Categoria>}
      </Styled.ImagemWrapper>

      <Styled.ConteudoCard>
        <Styled.HeaderCard>
          <Styled.Nome>{nome}</Styled.Nome>
          <Styled.NotaWrapper>
            <Styled.Estrela><FaStar /></Styled.Estrela>
            <Styled.Nota>{nota.toFixed(1)}</Styled.Nota>
          </Styled.NotaWrapper>
        </Styled.HeaderCard>

        {descricao && <Styled.Descricao>{descricao}</Styled.Descricao>}

        {endereco && (
          <Styled.Endereco>
            <Styled.IconeEndereco><FaMapMarkerAlt /></Styled.IconeEndereco>
            {endereco}
          </Styled.Endereco>
        )}
      </Styled.ConteudoCard>
    </Styled.Card>
  );
};

export default CardRestaurante;
