import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { breakPoints } from "../../styles/breakPoints";

type DrawerSideBarProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

const DrawerSideBar = ({ active, setActive }: DrawerSideBarProps) => {
  const handleLayerClick = () => {
    setActive(!active);
  };
  const handleUlclick = (e: React.MouseEvent<HTMLUListElement>) => {
    if ((e.target as HTMLElement).tagName === "UL") return;
    setActive(!active);
  };

  return (
    <Container className={active ? "active" : ""}>
      <DimmedLayer
        className={active ? "active" : ""}
        onClick={handleLayerClick}
      />
      <SideUl
        className={active ? "active" : ""}
        onClick={(e) => handleUlclick(e)}
      >
        <li>
          <TextLink to="/fashion">패션</TextLink>
        </li>
        <li>
          <TextLink to="/accessory">액세서리</TextLink>
        </li>
        <li>
          <TextLink to="/digital">디지털</TextLink>
        </li>
      </SideUl>
    </Container>
  );
};

const Container = styled.div`
  box-sizing: border-box;
  position: absolute;
  max-height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  &.active {
    transform: translatex(0);
    width: 100%;
    z-index: 100;
  }
`;

const DimmedLayer = styled.label`
  position: absolute;
  height: 100vh;
  transition-property: all;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.3);
  &.active {
    width: 100%;
    opacity: 1;
  }
`;

const SideUl = styled.ul`
  display: flex;
  margin: 0;
  padding: 1rem;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor.mainBg};
  height: 100vh;
  transform: translatex(-100%);
  transition-property: all;
  transition-duration: 0.4s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &.active {
    width: 14rem;
    transform: translatex(0);
    ${breakPoints.px480} {
      width: 19rem;
    }
  }
`;

const TextLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  display: flex;
  padding: 0.8rem 1rem;
  color: ${(props) => props.theme.color.fontColor};
  border-radius: 0.7rem;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    background-color: rgba(250, 250, 250, 0.1);
  }
`;

export default DrawerSideBar;
