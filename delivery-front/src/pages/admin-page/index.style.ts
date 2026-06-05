import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: var(--color-heading);
  margin: 0 0 2rem 0;
`;

export const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

export const MenuIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  
  svg {
    color: var(--color-primary);
  }
`;

export const MenuTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
`;

export const MenuDescription = styled.div`
  font-size: 0.875rem;
  color: var(--color-text-muted);
`;

export const Badge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--color-primary);
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.5rem 0.75rem;
  border-radius: var(--border-radius);
  min-width: 2.5rem;
  text-align: center;
`;

export const MenuItem = styled.div`
  background-color: var(--color-card);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    background-color: var(--color-primary);
    color: white;

    ${MenuIcon} {
      color: white;
      
      svg {
        color: white;
      }
    }

    ${MenuTitle}, ${MenuDescription}, ${Badge} {
      color: white;
    }

    ${Badge} {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;
