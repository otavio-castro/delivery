import styled from "styled-components";

export const Footer = styled.footer`
  background-color: var(--color-card);
  color: var(--color-text);
  margin-top: auto;
  border-top: 1px solid var(--color-border);
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const Text = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

export const Links = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const Link = styled.a`
  color: var(--color-text);
  font-size: 0.875rem;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }
`;
