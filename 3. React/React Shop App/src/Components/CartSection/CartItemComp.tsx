import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsListType } from "../../API/ApiFetch";
import { useAppDispatch } from "../../Store";
import { cartItemFunc, cartItemRemoveFunc } from "../../Store/CartItemSlice";
import { breakPoints } from "../../styles/breakPoints";
import { newCartItem } from "../../util/CartStorage";

interface CartItemCompProps {
  item: newCartItem;
  price: (price: { id: string; price: number }) => void;
  data: ProductsListType[];
}

export type CartItemDetail = Pick<
  ProductsListType,
  "image" | "title" | "price"
>;

const CartItemComp = (props: CartItemCompProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [pickProduct, setPickProduct] = useState(
    props.data.filter((item) => item.id === props.item.id)[0]
  );
  const [itemCount, setItemCount] = useState(props.item.count);
  const [itemPrice, setItemPrice] = useState<number>(
    props.item.price * props.item.count
  );

  useEffect(() => {
    const newData = props.data.filter((item) => item.id === props.item.id)[0];
    setPickProduct(newData);
    setItemPrice(newData?.price * props.item.count);
    setItemCount(props.item.count);
  }, [props.data, props.item]);

  const handleMinus = () => {
    setItemCount(itemCount - 1);
    setItemPrice(pickProduct.price * (itemCount - 1));

    props.price({
      id: props.item.id,
      price: -pickProduct.price,
    });

    dispatch(
      cartItemFunc({
        id: props.item.id,
        count: -1,
        price: -pickProduct.price,
      })
    );

    if (itemCount <= 1) {
      dispatch(cartItemRemoveFunc({ id: props.item.id }));
      containerRef.current?.remove();
    }
  };

  const handlePlus = () => {
    setItemCount(itemCount + 1);
    setItemPrice(pickProduct.price * (itemCount + 1));

    props.price({
      id: props.item.id,
      price: pickProduct.price,
    });

    dispatch(
      cartItemFunc({
        id: props.item.id,
        count: 1,
        price: pickProduct.price,
      })
    );
  };

  return (
    <Container ref={containerRef}>
      <ImageLink to={`/product/${props.item.id}`}>
        <ProductImage src={pickProduct?.image} />
      </ImageLink>
      <DescriptionDiv>
        <ProductTitle to={`/product/${props.item.id}`}>
          {pickProduct?.title}
        </ProductTitle>
        <PriceP>{`$ ${itemPrice.toLocaleString()}`}</PriceP>
        <div>
          <LeftBtn onClick={handleMinus}>-</LeftBtn>
          <CountNumber>{itemCount}</CountNumber>
          <RightBtn onClick={handlePlus}>+</RightBtn>
        </div>
      </DescriptionDiv>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
  padding: 0 0.2rem;
  ${breakPoints.px1025} {
    padding: 0;
    display: flex;
  }
`;

const ImageLink = styled(Link)`
  background-color: rgb(255 255 255);
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  max-width: 100%;
  ${breakPoints.px1025} {
    width: 13rem;
  }
`;

const ProductImage = styled.img`
  height: 12rem;
  width: 100%;
  object-fit: contain;
`;

const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
  padding: 2rem 0.2rem;
  ${breakPoints.px1025} {
    padding: 2rem 3rem;
  }
`;

const ProductTitle = styled(Link)`
  box-sizing: border-box;
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PriceP = styled.p`
  font-size: 1.875rem;
  line-height: 2.25rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
`;

const CountNumber = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 1.1rem;
  line-height: 1em;
  min-height: 3rem;
  font-weight: 600;
`;

const LeftBtn = styled.button`
  color: white;
  cursor: pointer;
  background-color: hsl(262 80% 50%);
  border: 1px solid hsl(262 80% 50%);
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  line-height: 1em;
  min-height: 3rem;
  font-weight: 600;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &:active {
    transform: scale(0.9, 0.9);
  }
`;

const RightBtn = styled.button`
  color: white;
  cursor: pointer;
  background-color: hsl(262 80% 50%);
  border: 1px solid hsl(262 80% 50%);
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  line-height: 1em;
  min-height: 3rem;
  font-weight: 600;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  &:active {
    transform: scale(0.9, 0.9);
  }
`;

export default CartItemComp;
