import styled from "styled-components";

export const Card = styled.article`
  background: var(--color-card, #ffffff);
  border-radius: var(--border-radius-lg, 12px);
  overflow: hidden;
  box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md, 0 4px 16px rgba(0, 0, 0, 0.15));
  }
`;

export const ImagemWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--color-background, #f5f5f5);
`;

export const Imagem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ImagemPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const IconePlaceholder = styled.span`
  font-size: 4rem;
`;

export const Categoria = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-primary, #ff6b35);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: var(--border-radius-sm, 6px);
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: capitalize;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const ConteudoCard = styled.div`
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

export const Nome = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading, #1a1a1a);
  margin: 0;
  flex: 1;
  line-height: 1.3;
`;

export const NotaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: var(--color-background, #f9f9f9);
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm, 6px);
`;

export const Estrela = styled.span`
  font-size: 1rem;
`;

export const Nota = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text, #333);
`;

export const Descricao = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-muted, #666);
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Endereco = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: var(--color-text-muted, #666);
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--color-border, #eee);
`;

export const IconeEndereco = styled.span`
  font-size: 1rem;
`;
