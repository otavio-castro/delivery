import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const HeroTitle = styled.h1`
  font-size: 3rem;
  color: var(--color-heading);
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--color-text-muted);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const FiltersSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
  background-color: var(--color-card);
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 500;
  min-width: 250px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: var(--color-primary);
  }

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
  }

  option {
    background-color: var(--color-card);
    color: var(--color-text);
    padding: 0.5rem;
  }

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const ClearFilter = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-primary);
    color: white;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

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
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
  font-size: 1.125rem;
`;

export const ResultsCount = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: var(--color-text-muted);
  font-weight: 500;
`;
