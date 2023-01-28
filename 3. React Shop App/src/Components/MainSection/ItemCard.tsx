import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { ProductsListType } from "../../API/ApiFetch";

interface ItemCardProps {
  detail: ProductsListType;
}

const ItemCard = (props: ItemCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${props.detail.id}`);
  };

  return (
    <Container onClick={handleClick}>
      <Figure>
        <Image src={props.detail.image} />
      </Figure>
      <DetailContainer>
        <Title>{props.detail.title}</Title>
        <ItemPrice>{`$${props.detail.price.toLocaleString()}`}</ItemPrice>
      </DetailContainer>
    </Container>
  );
};

const Container = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.2rem;
  background-color: ${(props) => props.theme.backgroundColor.itemCardBg};
  border: solid 1px ${(props) => props.theme.color.borderColor};
  cursor: pointer;
  z-index: 1;
  &:hover img {
    transform: scale(120%);
  }
`;

const Figure = styled.figure`
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
`;

const Image = styled.img`
  max-width: 50%;
  max-height: 50%;
  transition-duration: 0.3s;
`;

const DetailContainer = styled.div`
  background-color: ${(props) => props.theme.itemCardBg};
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 1.8rem;
  box-sizing: border-box;
  font-weight: bold;
`;

const Title = styled.p`
  margin-bottom: 1.5rem;
`;

const ItemPrice = styled.p`
  font-weight: 400;
`;

export default ItemCard;
