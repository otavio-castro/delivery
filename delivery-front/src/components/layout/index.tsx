import Header from "../header";
import Footer from "../footer";
import * as Styled from "./index.style";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Styled.Wrapper>
      <Header />
      <Styled.Main>{children}</Styled.Main>
      <Footer />
    </Styled.Wrapper>
  );
};

export default Layout;
