import HeaderAuth from "../../components/HeaderAuth";
import LoginAuth from "../../components/LoginAuth";
import { Container } from "./styles";
const AuthPage = () => {
  return (
    <Container>
      <HeaderAuth />
      <LoginAuth />
    </Container>
  );
};

export default AuthPage;
