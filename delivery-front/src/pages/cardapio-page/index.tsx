import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { api } from "../../config/api";
import { useProdutosStore } from "../../stores/produtos.store";
import type { Restaurante } from "../../types/entities";
import Layout from "../../components/layout";
import CardProduto from "../../components/card-produto";
import Loading from "../../components/loading";
import * as Styled from "./index.style";

const CardapioPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { produtos, setProdutos } = useProdutosStore();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("");

  useEffect(() => {
    if (id) {
      loadData(parseInt(id));
    }
  }, [id]);

  const loadData = async (restauranteId: number) => {
    try {
      setLoading(true);
      setError("");
      const [restauranteData, produtosData] = await Promise.all([
        api.restaurantes.getById(restauranteId),
        api.produtos.getAll(restauranteId),
      ]);
      setRestaurante(restauranteData);
      setProdutos(produtosData);
    } catch (err) {
      setError("Erro ao carregar cardápio");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categorias = Array.from(new Set(produtos.map((p) => p.categoria).filter(Boolean))) as string[];
  
  const produtosFiltrados = categoriaFiltro
    ? produtos.filter((p) => p.categoria === categoriaFiltro)
    : produtos;

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (error || !restaurante) {
    return (
      <Layout>
        <Styled.Container>
          <Styled.Error>{error || "Restaurante não encontrado"}</Styled.Error>
          <Styled.BackButton onClick={() => navigate("/")}>← Voltar</Styled.BackButton>
        </Styled.Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Styled.Container>
        <Styled.BackButton onClick={() => navigate("/")}>← Voltar</Styled.BackButton>

        <Styled.RestauranteHeader>
          {restaurante.imagemUrl && (
            <Styled.RestauranteImage src={restaurante.imagemUrl} alt={restaurante.nome} />
          )}
          <Styled.RestauranteInfo>
            <Styled.RestauranteNome>{restaurante.nome}</Styled.RestauranteNome>
            {restaurante.categoria && <Styled.Categoria>{restaurante.categoria}</Styled.Categoria>}
            {restaurante.descricao && <Styled.Descricao>{restaurante.descricao}</Styled.Descricao>}
            <Styled.Nota><FaStar style={{ marginRight: '0.25rem' }} />{restaurante.nota.toFixed(1)}</Styled.Nota>
          </Styled.RestauranteInfo>
        </Styled.RestauranteHeader>

        {categorias.length > 0 && (
          <Styled.FiltersSection>
            <Styled.FilterButton active={!categoriaFiltro} onClick={() => setCategoriaFiltro("")}>
              Todos
            </Styled.FilterButton>
            {categorias.map((cat) => (
              <Styled.FilterButton
                key={cat}
                active={categoriaFiltro === cat}
                onClick={() => setCategoriaFiltro(cat)}
              >
                {cat}
              </Styled.FilterButton>
            ))}
          </Styled.FiltersSection>
        )}

        {produtosFiltrados.length === 0 ? (
          <Styled.EmptyState>Nenhum produto disponível</Styled.EmptyState>
        ) : (
          <Styled.Grid>
            {produtosFiltrados.map((produto) => (
              <CardProduto key={produto.produtoId} produto={produto} />
            ))}
          </Styled.Grid>
        )}
      </Styled.Container>
    </Layout>
  );
};

export default CardapioPage;
