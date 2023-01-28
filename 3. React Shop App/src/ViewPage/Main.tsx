import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Carousel from "../Components/MainSection/Carousel";
import ProductSection from "../Components/MainSection/ProductSection";
import { RootState, useAppDispatch } from "../Store";
import { fetchProduct } from "../Store/ProductSlice";

const Main = () => {
  const dispatch = useAppDispatch();
  const { product } = useSelector((state: RootState) => state.product);

  const categoryFunc = (name: string) => {
    const selected = product.filter((item) => item.category.includes(name));
    return selected;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product.length !== 0) return;
    dispatch(fetchProduct());
  }, []);

  return (
    <MainContainer>
      <Carousel />
      <ProductSection name={"패션"} data={categoryFunc("clothing")} />
      <ProductSection name={"액세서리"} data={categoryFunc("jewelery")} />
      <ProductSection name={"디지털"} data={categoryFunc("electronics")} />
    </MainContainer>
  );
};

const MainContainer = styled.section`
  margin: 4rem auto 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default Main;
