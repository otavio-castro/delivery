import styled from "styled-components";

export const Container = styled.div`
  max-width: 800px;
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
  text-align: center;
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

export const SearchButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: var(--color-primary);
  color: white;
  border-radius: var(--border-radius-md);
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const Card = styled.div`
  background-color: var(--color-card);
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const PedidoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

export const PedidoNumero = styled.h2`
  font-size: 1.5rem;
  color: var(--color-primary);
  margin: 0;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    color: var(--color-text-muted);
  }

  span:last-child {
    font-weight: 600;
    color: var(--color-heading);
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--color-heading);
  margin: 0 0 1.5rem 0;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 30px;
    bottom: 30px;
    width: 2px;
    background-color: var(--color-border);
  }
`;

export const TimelineItem = styled.div<{ completed: boolean }>`
  display: flex;
  gap: 1rem;
  position: relative;
`;

export const TimelineIcon = styled.div<{ completed: boolean; current: boolean; canceled?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
  z-index: 1;

  background-color: ${(props) => {
    if (props.canceled) return "var(--color-error)";
    if (props.completed) return "var(--color-success)";
    return "var(--color-background)";
  }};

  color: ${(props) => (props.completed || props.canceled ? "white" : "var(--color-text-muted)")};

  border: 2px solid ${(props) => {
    if (props.canceled) return "var(--color-error)";
    if (props.completed) return "var(--color-success)";
    return "var(--color-border)";
  }};

  ${(props) =>
    props.current &&
    !props.completed &&
    `
    animation: pulse 2s infinite;
  `}

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

export const TimelineContent = styled.div`
  flex: 1;
  padding-top: 0.5rem;
`;

export const TimelineStatus = styled.div<{ completed: boolean }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${(props) => (props.completed ? "var(--color-heading)" : "var(--color-text-muted)")};
`;

export const RefreshInfo = styled.div`
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.875rem;
  font-style: italic;
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
  margin-bottom: 2rem;
`;
