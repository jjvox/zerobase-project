import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { ButtonPurple } from "../../util/Button";

const ErrorPage = () => {
  return (
    <Container>
      <ErrorP>404</ErrorP>
      <DesP>페이지를 찾을 수 없습니다.</DesP>
      <ButtonLink to="/">메인으로</ButtonLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorP = styled.p`
  font-size: 8rem;
  fon-weight: 900;
  margin-top: 10rem;
`;

const DesP = styled.p`
  font-size: 2rem;
  margin-top: 5rem;
`;

const ButtonLink = styled(Link)`
  text-decoration: none;
  ${ButtonPurple}
  font-size: 1rem;
  padding: 1.2rem 2.5rem;
  margin-top: 3rem;
`;

export default ErrorPage;
