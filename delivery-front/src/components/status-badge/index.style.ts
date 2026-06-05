import styled from "styled-components";

export const Badge = styled.span<{ color: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  font-weight: 600;
  background-color: ${(props) => props.color};
  color: white;
`;
