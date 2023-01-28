import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../Store";
import { cartItemFunc } from "../Store/CartItemSlice";
import { fetchProduct } from "../Store/ProductSlice";
import { breakPoints } from "../styles/breakPoints";
import { ButtonPurple } from "../util/Button";

let categoryName: string;

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useSelector((state: RootState) => state.product);

  const pickProduct = product.filter((item) => item.id == id)[0];

  switch (pickProduct?.category) {
    case "men's clothing":
    case "women's clothing":
      categoryName = "패션";
      break;
    case "jewelery":
      categoryName = "액세서리";
      break;
    case "electronics":
      categoryName = "디지털";
      break;
  }

  const handleClick = () => {
    const item = {
      id: pickProduct.id,
      count: 1,
      price: pickProduct.price,
    };
    dispatch(cartItemFunc(item));
  };

  useEffect(() => {
    if (product.length !== 0) return;
    dispatch(fetchProduct());
  }, [product]);

  return (
    <Container>
      <InnerContainer>
        <div>{`${categoryName} > ${pickProduct?.title}`}</div>
        <ProductDiv>
          <ImageFigure>
            <Image src={pickProduct?.image} />
          </ImageFigure>
          <DiscriptionDiv>
            <TitleH2>
              {pickProduct?.title}
              <New>NEW</New>
            </TitleH2>
            <p>{pickProduct?.description}</p>
            <StarRatingDiv>
              <StarDiv>
                {Array(10)
                  .fill(0)
                  .map((item, idx) => {
                    return (
                      <Star
                        key={idx}
                        type="radio"
                        disabled
                        idx={idx}
                        rate={pickProduct?.rating.rate}
                      ></Star>
                    );
                  })}
              </StarDiv>
              <div>{`${pickProduct?.rating.rate} / ${pickProduct?.rating.count} 참여`}</div>
            </StarRatingDiv>
            <Price>{`$${pickProduct?.price.toLocaleString()}`}</Price>
            <BtnDiv>
              <Btn onClick={handleClick}>장바구니에 담기</Btn>
              <CartLink to="/cart">장바구니로 이동</CartLink>
            </BtnDiv>
          </DiscriptionDiv>
        </ProductDiv>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.section`
  margin: 5rem auto auto;

  padding-left: 1rem;
  padding-right: 1rem;

  ${breakPoints.px1280} {
    max-width: 1280px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  ${breakPoints.px1360} {
    max-width: 1360px;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  color: inherit;
`;

const ProductDiv = styled.div`
  width: 100%;
  margin-top: 3.5rem;
  align-items: center;
  ${breakPoints.px1025} {
    display: flex;
    align-items: center;
  }
`;

const ImageFigure = styled.figure`
  border-radius: 1rem;
  padding: 1rem;
  background-color: white;
  min-width: 18rem;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
`;

const Image = styled.img`
  height: 18rem;
  max-width: 100%;
`;

const DiscriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0 0.25rem;
  ${breakPoints.px1025} {
    padding: 2rem 3rem;
  }
`;

const TitleH2 = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
`;

const StarRatingDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const StarDiv = styled.div`
  display: inline-flex;
  margin-right: 1rem;
`;

const Star = styled.input<{ idx: number; rate: number }>`
  appearance: none;
  margin: 0;
  width: 0.8rem;
  height: 1.6rem;
  background-color: rgb(250 204 21);
  -webkit-mask-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTkycHgiIGhlaWdodD0iMTgwcHgiIHZpZXdCb3g9IjAgMCAxOTIgMTgwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA2MC4xICg4ODEzMykgLSBodHRwczovL3NrZXRjaC5jb20gLS0+CiAgICA8dGl0bGU+c3Rhci0yPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBvbHlnb24gaWQ9InN0YXItMiIgZmlsbD0iIzAwMDAwMCIgcG9pbnRzPSI5NiAxNTMuMDQzNjYxIDM3LjIyMTQ3NDggMTc5LjI4NjUwNiA0NC4yNDExOTA0IDExNS43NzQ0NDQgMC44OTQzNDgzNyA2OC40ODEzNTE1IDY0LjAxMTI5NjUgNTUuNDcxNTgyOCA5NiAwIDEyNy45ODg3MDQgNTUuNDcxNTgyOCAxOTEuMTA1NjUyIDY4LjQ4MTM1MTUgMTQ3Ljc1ODgxIDExNS43NzQ0NDQgMTU0Ljc3ODUyNSAxNzkuMjg2NTA2Ij48L3BvbHlnb24+CiAgICA8L2c+Cjwvc3ZnPg==);
  -webkit-mask-size: 200%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: ${(props) => (props.idx % 2 === 0 ? "left" : "right")};
  opacity: ${(props) =>
    Math.floor(props.rate / 0.5) - 1 >= props.idx ? "" : "0.2"};
`;

const New = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  background-color: hsl(175 70% 41%);
  color: white;
  border-radius: 1.9rem;
  height: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: fit-content;
  padding-left: 0.563rem;
  padding-right: 0.563rem;
`;

const Price = styled.p`
  font-size: 1.875rem;
  font-weight: bold;
  line-height: 2.25rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

const BtnDiv = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Btn = styled.button`
  ${ButtonPurple};
  &:hover {
    background-color: hsl(262 80% 40%);
    border: 1px solid hsl(262 80% 40%);
  }
`;

const CartLink = styled(Link)`
  display: inline-block;
  height: 100%;
  text-decoration: none;
  color: inherit;
  margin-left: 10px;
  border: 1px solid;
  border-radius: 15px;
  padding: 15px;
  font-size: 1rem;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    color: rgb(36, 41, 51);
    background-color: rgb(166, 173, 186);
  }
  &:active {
    transform: scale(0.9, 0.9);
  }
`;

export default ProductDetail;
