import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import caruselData from "../../data/caruselData";
import { breakPoints } from "../../styles/breakPoints";
import CaruselItem from "./CaruselItem";

const Carousel = () => {
  const [transCarusel, setTransCarusel] = useState(0);

  useEffect(() => {
    const caruselTime = setTimeout(() => {
      if (transCarusel === 2) {
        setTransCarusel(0);
      } else {
        setTransCarusel(transCarusel + 1);
      }
    }, 5000);

    return () => {
      clearTimeout(caruselTime);
    };
  }, [transCarusel]);

  const handleDotClick = (id: number) => {
    setTransCarusel(id);
  };
  const handleBtnClick = (e: string) => {
    if (e === "left") {
      transCarusel === 0
        ? setTransCarusel(caruselData.length - 1)
        : setTransCarusel(transCarusel - 1);
    } else if (e === "right") {
      transCarusel === caruselData.length - 1
        ? setTransCarusel(0)
        : setTransCarusel(transCarusel + 1);
    }
  };

  return (
    <Container>
      <ControlDotUl>
        {Array(caruselData.length)
          .fill(0)
          .map((item, idx) => {
            return (
              <DotLi
                key={idx}
                style={{ opacity: `${transCarusel === idx ? 1 : ""}` }}
                onClick={() => handleDotClick(idx)}
              />
            );
          })}
      </ControlDotUl>
      <SideBtn props="left" onClick={() => handleBtnClick("left")} />
      <CarouselDiv>
        <CarouselUl
          style={{ transform: `translate3d(-${transCarusel}00%, 0px, 0px)` }}
        >
          {caruselData.map((item) => {
            return <CaruselItem key={item.id} item={item} />;
          })}
        </CarouselUl>
      </CarouselDiv>
      <SideBtn onClick={() => handleBtnClick("right")} />
    </Container>
  );
};

const Container = styled.div`
  outline: none;
  display: block;
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
  z-index: 1;
`;

const ControlDotUl = styled.ul`
  position: absolute;
  bottom: 0;
  margin: 0.6rem 0;
  padding: 0;
  text-align: center;
  width: 100%;
  z-index: 1;
`;

const DotLi = styled.li`
  transition: opacity 0.25s ease-in;
  opacity: 0.3;
  filter: alpha(opacity=30);
  box-shadow: 1px 1px 2px #000000;
  background: #fff;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
  cursor: pointer;
  display: inline-block;
  margin: 0 0.5rem;
  &:hover {
    opacity: 1;
  }
`;

const SideBtn = styled.button<{ props?: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  ${(props) => (props.props === "left" ? "left : 0" : "right : 0")};
  font-size: 1.5rem;
  margin-top: 0;
  padding: 0.3rem;
  transition: all 0.25s ease-in;
  color: white;
  opacity: 0.4;
  z-index: 10;
  background: none;
  border: 0;
  cursor: pointer;
  ${breakPoints.px1025} {
  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
  }
  &::before {
    content: "";
    margin: 0 0.3rem;
    display: inline-block;
    border-top: 0.5rem solid transparent;
    border-bottom: 0.5rem solid transparent;
    ${(props) =>
      props.props === "left"
        ? "border-right: 0.5rem solid #fff"
        : "border-left: 0.5rem solid #fff"};
  }

    
`;

const CarouselDiv = styled.div`
  margin: auto;
  width: 100%;
`;

const CarouselUl = styled.ul`
  transition: all 0.35s ease-in-out;
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  display: flex;
`;

export default Carousel;
