import styled from "styled-components";

export const Card = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 1rem;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  color: var(--color-heading);
  margin: 0 0 0.5rem 0;
`;

export const Categoria = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--color-background);
  color: var(--color-text-muted);
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

export const Descricao = styled.p`
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin: 0.5rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

export const Nota = styled.span`
  font-weight: 600;
  color: var(--color-primary);
`;
