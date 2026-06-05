import styled from "styled-components";

export const WrapperPage = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
  text-align: center;
`;

export const Titulo = styled.h1`
  font-size: 2.5rem;
  color: var(--color-heading, #1a1a1a);
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

export const Subtitulo = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-muted, #666);
  font-weight: 400;
`;

export const GridRestaurantes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.125rem;
  color: var(--color-text-muted, #666);
  background: var(--color-card, #f9f9f9);
  border-radius: var(--border-radius-md, 8px);
  margin-top: 2rem;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  font-size: 1.125rem;
  color: var(--color-error, #dc3545);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--color-error, #dc3545);
  border-radius: var(--border-radius-md, 8px);
  margin-top: 2rem;
`;

export const SkeletonCard = styled.div`
  background: var(--color-card, #f9f9f9);
  border-radius: var(--border-radius-md, 8px);
  height: 350px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }
`;
