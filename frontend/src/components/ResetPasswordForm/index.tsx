import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import { EmailSchema } from "../../utils/schemas";
import { FormContainer } from "../../styles/FormContainer";

type LoginInfos = {
  email: string;
};

const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfos>({ resolver: yupResolver(EmailSchema) });

  const onSubmit: SubmitHandler<LoginInfos> = (data) => console.log(data);

  return (
    <FormContainer>
      <h1>Reset password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <button className="button">
          Send Link <HiOutlineArrowRight />
        </button>
      </form>
      <Link to="/" className="button action reverse">
        Back <HiOutlineArrowRight />
      </Link>
    </FormContainer>
  );
};

export default ResetPasswordForm;
