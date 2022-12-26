import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../Store";
import { cartItemRemoveAllFunc } from "../../Store/CartItemSlice";
import { ButtonPurple } from "../../util/Button";
import { newCartItem } from "../../util/CartStorage";

interface CartModalProps {
  toggleModal: string;
  setToggleModal: Dispatch<SetStateAction<string>>;
  setPrice: Dispatch<SetStateAction<number>>;
  setCartItem: Dispatch<SetStateAction<newCartItem[]>>;
}

const CartModal = (props: CartModalProps) => {
  const dispatch = useAppDispatch();
  const handleYesClick = () => {
    props.setToggleModal("none");
    dispatch(cartItemRemoveAllFunc());
    props.setCartItem([]);
    props.setPrice(0);
  };

  const handleNoClick = () => {
    props.setToggleModal("none");
  };

  return (
    <Container style={{ display: `${props.toggleModal}` }}>
      <InnerContainer>
        <TextH3>정말로 구매 하시겠습니까?</TextH3>
        <p>장바구니의 모든 상품들이 삭제됩니다.</p>
        <ButtonDiv>
          <YesLabel onClick={handleYesClick}>네</YesLabel>
          <NoLabel onClick={handleNoClick}>아니오</NoLabel>
        </ButtonDiv>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  justify-content: center;
  align-items: flex-end;
  background-color: ${(props) => props.theme.backgroundColor.modalBg}
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 999;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: transform, opacity;
  pointer-events: auto;
  opacity: 1;
  @media (min-width:640px) {
    align-items: center;
  }
`;

const InnerContainer = styled.div`
  background-color: ${(props) => props.theme.backgroundColor.mainBg};
  padding: 1.5rem;
  max-height: calc(100vh - 5em);
  width: 100%;
  transition-duration: 0.2s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 25px 50px -12px #00000040;
  overscroll-behavior: contain;
  border-radius: 1.5rem 1.5rem 0 0;
  box-sizing: border-box;
  @media (min-width: 640px) {
    max-width: 32rem;
    border-radius: 1.5rem;
  }
`;

const TextH3 = styled.h3`
  margin: 0;
  margin-bottom: 1rem;
  padding-top: 0.2rem;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  padding: 0.1rem;
`;

const YesLabel = styled.label`
  ${ButtonPurple}
  margin-right: 0.4rem;
`;

const NoLabel = styled.label`
  ${ButtonPurple}
  background-color: inherit;
  color: inherit;
  border-color: inherit;
`;

export default CartModal;
