import { useEffect, useState } from "react";
import { FaPizzaSlice, FaFilter } from "react-icons/fa";
import { api } from "../../config/api";
import { useRestaurantesStore } from "../../stores/restaurantes.store";
import Layout from "../../components/layout";
import CardRestaurante from "../../components/card-restaurante";
import Loading from "../../components/loading";
import * as Styled from "./index.style";

const HomePage = () => {
  const { restaurantes, setRestaurantes } = useRestaurantesStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("");
  const [todasCategorias, setTodasCategorias] = useState<string[]>([]);

  useEffect(() => {
    loadTodasCategorias();
  }, []);

  useEffect(() => {
    loadRestaurantes();
  }, [categoriaFiltro]);

  const loadTodasCategorias = async () => {
    try {
      // Busca TODOS os restaurantes para extrair categorias
      const data = await api.restaurantes.getAll();
      const categoriasUnicas = new Set<string>();
      data.forEach((r) => {
        if (r.categoria) {
          categoriasUnicas.add(r.categoria);
        }
      });
      setTodasCategorias(Array.from(categoriasUnicas).sort());
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
    }
  };

  const loadRestaurantes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await api.restaurantes.getAll(categoriaFiltro || undefined);
      setRestaurantes(data);
    } catch (err) {
      setError("Erro ao carregar restaurantes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Styled.Container>
        <Styled.Hero>
          <Styled.HeroTitle>
            GoDelivery <FaPizzaSlice size={48} style={{ verticalAlign: 'middle' }} />
          </Styled.HeroTitle>
          <Styled.HeroSubtitle>Peça comida dos melhores restaurantes da cidade!</Styled.HeroSubtitle>
        </Styled.Hero>

        <Styled.FiltersSection>
          <Styled.FilterLabel>
            <FaFilter style={{ marginRight: '0.5rem' }} />
            Filtrar por categoria:
          </Styled.FilterLabel>
          <Styled.FilterSelect 
            value={categoriaFiltro} 
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {todasCategorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Styled.FilterSelect>
          
          {categoriaFiltro && (
            <Styled.ClearFilter onClick={() => setCategoriaFiltro("")}>
              Limpar filtro
            </Styled.ClearFilter>
          )}
        </Styled.FiltersSection>

        {loading && <Loading />}

        {error && <Styled.Error>{error}</Styled.Error>}

        {!loading && !error && restaurantes.length === 0 && (
          <Styled.EmptyState>
            Nenhum restaurante encontrado
            {categoriaFiltro && ` na categoria "${categoriaFiltro}"`}
          </Styled.EmptyState>
        )}

        {!loading && !error && restaurantes.length > 0 && (
          <>
            <Styled.ResultsCount>
              {restaurantes.length} {restaurantes.length === 1 ? 'restaurante encontrado' : 'restaurantes encontrados'}
              {categoriaFiltro && ` em "${categoriaFiltro}"`}
            </Styled.ResultsCount>
            
            <Styled.Grid>
              {restaurantes.map((restaurante) => (
                <CardRestaurante key={restaurante.restauranteId} restaurante={restaurante} />
              ))}
            </Styled.Grid>
          </>
        )}
      </Styled.Container>
    </Layout>
  );
};

export default HomePage;
