import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-heading);
`;

export const Input = styled.input<{ hasError: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.hasError ? "var(--color-error)" : "var(--color-border)")};
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  background-color: var(--color-card);
  color: var(--color-text);
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "var(--color-error)" : "var(--color-primary)")};
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
`;

export const Error = styled.span`
  font-size: 0.75rem;
  color: var(--color-error);
`;
