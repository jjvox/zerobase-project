import styled from "@emotion/styled";
import { ProductsListType } from "../../API/ApiFetch";
import { breakPoints } from "../../styles/breakPoints";

import ItemCard from "./ItemCard";

interface ProductSectionProps {
  name: string;
  data: ProductsListType[];
}

const ProductSection = (props: ProductSectionProps) => {
  return (
    <Container>
      <Title>{props.name}</Title>
      <ListContainer>
        {props.data
          ? props.data.map((item, idx) => {
              if (idx < 4) {
                return <ItemCard key={item.id} detail={item} />;
              }
            })
          : ""}
      </ListContainer>
    </Container>
  );
};

const Container = styled.section`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1.5rem auto 0;
  padding: 1.5rem 1rem 1rem 1rem;
  width: 100%;

  ${breakPoints.px1025} {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
  ${breakPoints.px1280} {
    padding: 0 0.5rem;
    max-width: 1280px;
  }
  ${breakPoints.px1360} {
    max-width: 1360px;
  }
`;

const Title = styled.h2`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: bold;
  margin-bottom: 2.3rem;
  ${breakPoints.px1025} {
    font-size: 2.2rem;
  }
`;

const ListContainer = styled.div`
  display: grid;
  gap: 1.5rem;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-auto-flow: column;
    grid-auto-columns: minmax(320px, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    grid-auto-columns: minmax(220px, 1fr);
  }

  ${breakPoints.px768} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${breakPoints.px1025} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export default ProductSection;
