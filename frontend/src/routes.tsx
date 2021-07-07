import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Footer from "./components/Footer";
import SignUpPage from "./pages/SignUp";
import ResetPasswordPage from "./pages/ResetPassword";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={AuthPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
