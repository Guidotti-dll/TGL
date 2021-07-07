import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthPage from "./pages/Auth";
import Footer from "./components/Footer";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={AuthPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
