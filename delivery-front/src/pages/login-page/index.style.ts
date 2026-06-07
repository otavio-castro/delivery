import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: calc(100vh - 180px);
  display: grid;
  place-items: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 460px;
  background-color: var(--color-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
`;

export const Title = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.8rem;
  color: var(--color-heading);
`;

export const Subtitle = styled.p`
  margin: 0.5rem 0 1.5rem 0;
  color: var(--color-text-muted);
`;

export const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

export const Error = styled.p`
  margin: 0;
  color: var(--color-error);
  font-weight: 600;
`;
