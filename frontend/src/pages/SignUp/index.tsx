import HeaderAuth from "../../components/HeaderAuth";
import SignUpForm from "../../components/SignUpForm";
import { AuthContainer } from "../../styles/AuthContainer";
const SignUpPage: React.FC = () => {
  return (
    <AuthContainer>
      <HeaderAuth />
      <SignUpForm />
    </AuthContainer>
  );
};

export default SignUpPage;
