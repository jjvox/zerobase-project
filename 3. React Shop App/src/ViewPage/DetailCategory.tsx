import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ErrorPage from "../Components/MainSection/ErrorPage";
import ItemCard from "../Components/MainSection/ItemCard";
import { RootState, useAppDispatch } from "../Store";
import { fetchProduct } from "../Store/ProductSlice";
import { breakPoints } from "../styles/breakPoints";

interface DetailCategoryProps {
  name: string;
  category: string;
}

const DetailCategory = (props: DetailCategoryProps) => {
  const dispatch = useAppDispatch();
  const { product } = useSelector((state: RootState) => state.product);
  const productData = product.filter((item) =>
    item.category.includes(props.category)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product.length !== 0) return;
    dispatch(fetchProduct());
  }, [props.category]);

  return (
    <>
      {productData.length !== 0 ? (
        <Container>
          <div>{`홈 > ${props.name}`}</div>
          <InnerContainArticle>
            <CateogyrlNameH2>{props.name}</CateogyrlNameH2>
            <ProductListDiv>
              {productData.map((item) => {
                return <ItemCard key={item.id} detail={item} />;
              })}
            </ProductListDiv>
          </InnerContainArticle>
        </Container>
      ) : (
        <Container>
          <ErrorPage />
        </Container>
      )}
    </>
  );
};

const Container = styled.section`
  max-width: 100%;
  padding: 20px 8px 32px;
  margin: 5rem auto;
  ${breakPoints.px1025} {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  ${breakPoints.px1280} {
    max-width: 1280px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  ${breakPoints.px1360} {
    max-width: 1360px;
  }
`;

const InnerContainArticle = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-left: 1rem;
  padding-right: 1rem;
`;

const CateogyrlNameH2 = styled.h2`
  font-size: 2.25rem;
  line-height: 2.5rem;
`;

const ProductListDiv = styled.div`
  display: grid;
  gap: 1.5rem;

  ${breakPoints.px768} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${breakPoints.px1025} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default DetailCategory;
