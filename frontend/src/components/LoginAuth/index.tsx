import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import { Container } from "./styles";
import { AuthSchema } from "../../utils/schemas";

type LoginInfos = {
  email: string;
  password: string;
};

const LoginAuth: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfos>({ resolver: yupResolver(AuthSchema) });

  const onSubmit: SubmitHandler<LoginInfos> = (data) => console.log(data);

  return (
    <Container>
      <h1>Authentication</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
        />
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
