import * as Styled from "./index.style";

const Footer = () => {
  return (
    <Styled.Footer>
      <Styled.Container>
        <Styled.Text>© 2026 GoDelivery - Todos os direitos reservados</Styled.Text>
        <Styled.Links>
          <Styled.Link href="#">Termos de Uso</Styled.Link>
          <Styled.Link href="#">Política de Privacidade</Styled.Link>
          <Styled.Link href="#">Contato</Styled.Link>
        </Styled.Links>
      </Styled.Container>
    </Styled.Footer>
  );
};

export default Footer;
