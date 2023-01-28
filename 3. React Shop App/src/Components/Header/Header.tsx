import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { breakPoints } from "../../styles/breakPoints";
import SearchBar from "./SearchBar";

type HeaderProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ active, setActive }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClick = (name: string) => {
    navigate(`/${name}`);
  };

  const handleClickHambuger = () => {
    setActive(!active);
  };

  return (
    <Container>
      <InnerContainer>
        <TabDiv>
          <Hambuger onClick={handleClickHambuger}>
            <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </Svg>
          </Hambuger>
          <div>
            <StyledLink to="/">
              <H1>React Shop</H1>
            </StyledLink>
          </div>
          <Nav>
            <TabBtn onClick={() => handleClick("fashion")}>
              <LInkTab>패션</LInkTab>
            </TabBtn>
            <TabBtn onClick={() => handleClick("accessory")}>
              <LInkTab>악세서리</LInkTab>
            </TabBtn>
            <TabBtn onClick={() => handleClick("digital")}>
              <LInkTab>디지털</LInkTab>
            </TabBtn>
          </Nav>
        </TabDiv>
        <SearchBar />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  z-index: 99;
  background-color: ${(props) => props.theme.backgroundColor.headerBg};
  box-shadow: 0px 1px 12px 2px rgba(0, 0, 0, 0.2);
`;

const InnerContainer = styled.div`
  margin: auto;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${breakPoints.px480} {
    max-width: 768px;
  }
  ${breakPoints.px768} {
    max-width: 1025px;
  }
  ${breakPoints.px1025} {
    max-width: 1280px;
  }
  ${breakPoints.px1280} {
    max-width: 1280px;
  }
  ${breakPoints.px1360} {
    max-width: 1360px;
  }
`;

const TabDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hambuger = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 2.5rem;
  border-radius: 0.8rem;
  cursor: pointer;
  @media (min-width: 1025px) {
    display: none;
  }
  &:hover {
    background-color: rgba(166, 173, 186, 0.2);
  }
`;

const Svg = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  vertical-align: middle;
  stroke: ${(props) => props.theme.color.mainColor};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.fontColor};
`;

const H1 = styled.h1`
  font-size: 1.1rem;
  margin: 0 0.5rem;
  white-space: nowrap;
`;

const TabBtn = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const Nav = styled.nav`
  ${breakPoints.px768} {
    display: flex;
  }
  position: relative;
  left: 0.7rem;
  display: none;
  justify-content: flex-start;
`;

const LInkTab = styled.p`
  font-size: 0.875rem;
  font-weight: 800;
  margin-right: 0.7rem;
  padding: 0.75rem;
  color: ${(props) => props.theme.color.fontColor};
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation: button-pop 0.25s ease-out;
  &:hover {
    background-color: rgba(166, 173, 186, 0.2);
    border-radius: 0.5rem;
  }
  &:active {
    transform: scale(0.9, 0.9);
  }
`;

export default Header;
