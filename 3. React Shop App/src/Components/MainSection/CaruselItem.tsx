import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { caruselDataType } from "../../data/caruselData";
import { breakPoints } from "../../styles/breakPoints";

interface CaruselItemProps {
  item: caruselDataType;
}

const CaruselItem = (props: CaruselItemProps) => {
  return (
    <Container>
      <InnerContainer>
        <TextContainer>
          <TitleH2>{props.item.title}</TitleH2>
          <p>{props.item.description}</p>
          <LinkBtn to={`/${props.item.link}`}>
            바로가기
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </Svg>
          </LinkBtn>
        </TextContainer>
        <CarouselImage src={props.item.img} alt={`${props.item.link}`} />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.li`
  min-width: 100%;
  position: relative;
  z-index: 50;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 220px;
  ${breakPoints.px1025} {
    height: 700px;
  }
`;

const TextContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 2.5rem;
  text-align: left;
  padding: 0 1rem;
  color: white;
  box-sizing: border-box;

  ${breakPoints.px768} {
    padding: 0 2.5rem;
    max-width: 1025px;
  }
  ${breakPoints.px1025} {
    max-width: 1025px;
    bottom: 33%;
  }
  ${breakPoints.px1280} {
    max-width: 1280px;
  }
  ${breakPoints.px1360} {
    max-width: 1360px;
  }
`;

const TitleH2 = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  ${breakPoints.px1025} {
    font-size: 2.3rem;
  }
`;

const LinkBtn = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.caruselBtn};
  background-color: ${(props) => props.theme.backgroundColor.caruselBtnBg};
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  border-radius: 0.875rem;
  font-weight: 900;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation: button-pop 0.25s ease-out;
  font-size: 0.875rem;
  min-height: 2rem;
  padding: 0 0.75rem;
  height: 2rem;

  &:active {
    transform: scale(0.9, 0.9);
  }
  ${breakPoints.px1025} {
    min-height: 3rem;
    padding: 0.1rem 1rem 0 1rem;
    height: 3rem;
  }
`;

const Svg = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.25rem;
  padding-bottom: 0.15rem;
`;

const CarouselImage = styled.img`
  width: 100%;
  vertical-align: top;
  border: 0;
  display: block;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

export default CaruselItem;
