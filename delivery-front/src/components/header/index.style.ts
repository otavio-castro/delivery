import styled from "styled-components";

export const Header = styled.header`
  background-color: var(--color-card);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const NavLink = styled.span`
  color: var(--color-text);
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: var(--color-primary);
  }
`;

export const CarrinhoButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  transition: all 0.2s;
  position: relative;

  &:hover {
    opacity: 0.9;
  }
`;

export const Badge = styled.span`
  background-color: var(--color-error);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const ThemeToggle = styled.button`
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-card);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  svg {
    font-size: 1.25rem;
  }
`;

export const AuthArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AuthText = styled.span`
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

export const AuthButton = styled.button`
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: 0.35rem 0.7rem;
  color: var(--color-text);
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
`;
