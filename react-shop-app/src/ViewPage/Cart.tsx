import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemComp from "../Components/CartSection/CartItemComp";
import CartModal from "../Components/CartSection/CartModal";
import { RootState, useAppDispatch } from "../Store";
import { fetchProduct } from "../Store/ProductSlice";
import { breakPoints } from "../styles/breakPoints";
import { ButtonPurple } from "../util/Button";
import { loadCart, newCartItem } from "../util/CartStorage";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { product } = useSelector((state: RootState) => state.product);
  const titleRef = useRef<HTMLDivElement>(null);
  const [cartItem, setCartItem] = useState<newCartItem[]>(loadCart());
  const [toggleModal, setToggleModal] = useState("none");
  const [price, setPrice] = useState(
    cartItem.reduce((acc, cur) => {
      return (acc += cur.count * cur.price);
    }, 0)
  );

  const TotalPriceFnc = (item: { id: string; price: number }) => {
    setPrice(price + item.price);
  };

  const handleBuyButton = () => {
    setToggleModal("flex");
  };

  useEffect(() => {
    if (product.length === 0) {
      dispatch(fetchProduct());
    }

    if (cartItem.length !== 0 && titleRef.current) {
      titleRef.current.style.display = "none";
    }
    if (price <= 0 && titleRef.current) {
      titleRef.current.style.display = "block";
      setPrice(0);
    }
  }, [price, cartItem]);

  return (
    <Container>
      <div>{`홈 > 장바구니`}</div>
      <InnerContainer>
        <div ref={titleRef}>
          <TitleH1>장바구니에 물품이 없습니다.</TitleH1>
          <GetProductA to="/">담으러 가기</GetProductA>
        </div>
        <ProductListDiv>
          <div>
            {cartItem.length !== 0
              ? cartItem.map((item, idx) => {
                  return (
                    <CartItemComp
                      key={idx}
                      item={item}
                      price={TotalPriceFnc}
                      data={product}
                    />
                  );
                })
              : ""}
          </div>
          <PriceDiv>
            <TotalPrice>{`총 : $ ${Math.ceil(
              price
            ).toLocaleString()}`}</TotalPrice>
            <BuyBtn onClick={handleBuyButton}>구매하기</BuyBtn>
          </PriceDiv>
        </ProductListDiv>
        <CartModal
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          setPrice={setPrice}
          setCartItem={setCartItem}
        />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.section`
  margin: 5rem auto 9rem;
  width: 100%;
  box-sizing: border-box;

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
  margin-top: 4rem;
`;

const TitleH1 = styled.h1`
  margin: 0;
`;

const GetProductA = styled(Link)`
  display: inline-flex;
  text-decoration: none;
  ${ButtonPurple};
  margin-top: 2.5rem;
`;

const ProductListDiv = styled.div`
  justify-content: space-between;
  ${breakPoints.px1025} {
    display: flex;
  }
`;

const PriceDiv = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 2.5rem;
  margin-bottom: 5rem;
  flex-shrink: 0;
`;

const TotalPrice = styled.p`
  padding-top: 0.4rem;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const BuyBtn = styled.button`
  ${ButtonPurple};
  margin-left: 1.2rem;
`;

export default Cart;
