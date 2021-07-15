import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthPage from './pages/Auth'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import SignUpPage from './pages/SignUp'
import ResetPasswordPage from './pages/ResetPassword'
import RecentGames from './pages/RecentGames'
import NewBetPage from './pages/NewBet'
import AccountPage from './pages/Account'
import NotFoundPage from './pages/NotFound'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        <Route path='/' exact component={AuthPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/reset-password' component={ResetPasswordPage} />
        <PrivateRoute path='/recent-games' component={RecentGames} />
        <PrivateRoute path='/new-bet' component={NewBetPage} />
        <PrivateRoute path='/account' component={AccountPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default Routes
