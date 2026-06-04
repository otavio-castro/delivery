import { useEffect, useState } from "react";
import * as Styled from "./index.style.ts";
import { useRestaurantesStore } from "../../stores/restaurantes.store";
import { useLoadingStore } from "../../stores/loading.store";
import { api } from "../../config/api";
import CardRestaurante from "./components/card-restaurante";
import type { Restaurante } from "../../types/entities";

const RestaurantesPage = () => {
  const { restaurantes, setRestaurantes } = useRestaurantesStore();
  const { isLoading, setLoading } = useLoadingStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.restaurantes.getAll();
        setRestaurantes(data);
      } catch (err) {
        setError("Erro ao carregar restaurantes. Tente novamente.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantes();
  }, [setRestaurantes, setLoading]);

  if (isLoading) {
    return (
      <Styled.WrapperPage>
        <Styled.Header>
          <Styled.Titulo>Restaurantes</Styled.Titulo>
          <Styled.Subtitulo>Escolha seu restaurante favorito</Styled.Subtitulo>
        </Styled.Header>
        <Styled.GridRestaurantes>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Styled.SkeletonCard key={i} />
          ))}
        </Styled.GridRestaurantes>
      </Styled.WrapperPage>
    );
  }

  if (error) {
    return (
      <Styled.WrapperPage>
        <Styled.Header>
          <Styled.Titulo>Restaurantes</Styled.Titulo>
        </Styled.Header>
        <Styled.ErrorMessage>{error}</Styled.ErrorMessage>
      </Styled.WrapperPage>
    );
  }

  if (restaurantes.length === 0) {
    return (
      <Styled.WrapperPage>
        <Styled.Header>
          <Styled.Titulo>Restaurantes</Styled.Titulo>
        </Styled.Header>
        <Styled.EmptyMessage>
          Nenhum restaurante disponível no momento
        </Styled.EmptyMessage>
      </Styled.WrapperPage>
    );
  }

  return (
    <Styled.WrapperPage>
      <Styled.Header>
        <Styled.Titulo>Restaurantes</Styled.Titulo>
        <Styled.Subtitulo>
          {restaurantes.length}{" "}
          {restaurantes.length === 1 ? "restaurante" : "restaurantes"}{" "}
          disponíveis
        </Styled.Subtitulo>
      </Styled.Header>
      <Styled.GridRestaurantes>
        {restaurantes.map((restaurante: Restaurante) => (
          <CardRestaurante
            key={restaurante.restauranteId}
            restaurante={restaurante}
          />
        ))}
      </Styled.GridRestaurantes>
    </Styled.WrapperPage>
  );
};

export default RestaurantesPage;
