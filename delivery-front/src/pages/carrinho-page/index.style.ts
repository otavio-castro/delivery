import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: var(--color-heading);
  margin: 0;
`;

export const ClearButton = styled.button`
  color: var(--color-error);
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Item = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--color-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--border-radius-md);

  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ItemNome = styled.h3`
  font-size: 1.125rem;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
`;

export const ItemPreco = styled.span`
  color: var(--color-text-muted);
  font-size: 0.875rem;
`;

export const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: 0.25rem;
`;

export const QuantityButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background);
  font-weight: 700;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-border);
  }
`;

export const Quantity = styled.span`
  min-width: 30px;
  text-align: center;
  font-weight: 600;
`;

export const ItemSubtotal = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
`;

export const RemoveButton = styled.button`
  font-size: 1.25rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Summary = styled.div`
  background-color: var(--color-card);
  padding: 1.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  height: fit-content;
  position: sticky;
  top: 100px;
`;

export const SummaryTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--color-heading);
  margin: 0 0 1rem 0;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  color: var(--color-text-muted);
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 1rem 0;
`;

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1.5rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

export const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
`;

export const EmptyText = styled.p`
  color: var(--color-text-muted);
  margin: 0 0 2rem 0;
`;
