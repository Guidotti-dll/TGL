import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Input from "../Input";
import { Container } from "./styles";

const LoginAuth: React.FC = () => {
  return (
    <Container>
      <h1>Authentication</h1>
      <form>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Link to="/reset-password">I forget my password</Link>
        <button>
          Log In <HiOutlineArrowRight />
        </button>
      </form>
      <button className="action">
        Sign Up <HiOutlineArrowRight />
      </button>
    </Container>
  );
};

export default LoginAuth;
