import * as Styled from "./index.style";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => {
  return (
    <Styled.Container>
      {label && <Styled.Label>{label}</Styled.Label>}
      <Styled.Input {...props} hasError={!!error} />
      {error && <Styled.Error>{error}</Styled.Error>}
    </Styled.Container>
  );
};

export default Input;
