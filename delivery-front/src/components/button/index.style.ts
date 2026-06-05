import styled from "styled-components";

interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "success";
  fullWidth: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};

  background-color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "var(--color-primary)";
      case "secondary":
        return "var(--color-secondary)";
      case "danger":
        return "var(--color-error)";
      case "success":
        return "var(--color-success)";
      default:
        return "var(--color-primary)";
    }
  }};

  color: white;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
