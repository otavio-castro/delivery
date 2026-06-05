import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-background);
  }
`;

export const RestauranteHeader = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  background-color: var(--color-card);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const RestauranteImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: var(--border-radius-lg);

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

export const RestauranteInfo = styled.div`
  flex: 1;
`;

export const RestauranteNome = styled.h1`
  font-size: 2rem;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Categoria = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const Descricao = styled.p`
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 1rem 0;
`;

export const Nota = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
`;

export const FiltersSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  transition: all 0.2s;
  background-color: ${(props) => (props.active ? "var(--color-primary)" : "var(--color-card)")};
  color: ${(props) => (props.active ? "white" : "var(--color-text)")};
  border: 1px solid ${(props) => (props.active ? "var(--color-primary)" : "var(--color-border)")};

  &:hover {
    background-color: ${(props) => (props.active ? "var(--color-primary-dark)" : "var(--color-background)")};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const Error = styled.div`
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  border: 1px solid var(--color-error);
  border-radius: var(--border-radius-md);
  text-align: center;
  margin-bottom: 1rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
  font-size: 1.125rem;
`;
