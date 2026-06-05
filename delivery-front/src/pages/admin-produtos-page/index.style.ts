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
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: var(--color-heading);
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Table = styled.table`
  width: 100%;
  background-color: var(--color-card);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);

  th,
  td {
    padding: 1rem;
    text-align: left;
  }

  th {
    background-color: var(--color-background);
    color: var(--color-heading);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
  }

  tbody tr {
    border-bottom: 1px solid var(--color-border);

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      background-color: var(--color-background);
    }
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

export const Status = styled.span<{ active: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${(props) => (props.active ? "var(--color-success)" : "var(--color-error)")};
  color: white;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  font-size: 1.25rem;
  padding: 0.25rem 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
`;

export const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
