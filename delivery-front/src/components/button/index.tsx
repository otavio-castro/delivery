import * as Styled from "./index.style";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = ({ variant = "primary", fullWidth = false, children, ...props }: ButtonProps) => {
  return (
    <Styled.Button variant={variant} fullWidth={fullWidth} {...props}>
      {children}
    </Styled.Button>
  );
};

export default Button;
