import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--color-success);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-muted);
  margin: 0 0 2rem 0;
`;

export const Card = styled.div`
  background-color: var(--color-card);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  text-align: left;
  margin-bottom: 2rem;
`;

export const PedidoNumero = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 2rem;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1.125rem;
  color: var(--color-heading);
  margin: 0 0 1rem 0;
`;

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: var(--color-text-muted);
`;

export const Text = styled.p`
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 1.5rem 0;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
`;

export const Error = styled.div`
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  border: 1px solid var(--color-error);
  border-radius: var(--border-radius-md);
  text-align: center;
`;
