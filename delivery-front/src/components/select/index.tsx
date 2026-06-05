import * as Styled from "./index.style";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

const Select = ({ label, error, options, ...props }: SelectProps) => {
  return (
    <Styled.Container>
      {label && <Styled.Label>{label}</Styled.Label>}
      <Styled.Select {...props} hasError={!!error}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Styled.Select>
      {error && <Styled.Error>{error}</Styled.Error>}
    </Styled.Container>
  );
};

export default Select;
