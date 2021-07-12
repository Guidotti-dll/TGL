import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthPage from './pages/Auth'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import SignUpPage from './pages/SignUp'
import ResetPasswordPage from './pages/ResetPassword'
import RecentGames from './pages/RecentGames'
import NewBetPage from './pages/NewBet'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={AuthPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/reset-password' component={ResetPasswordPage} />
        <PrivateRoute path='/recent-games' component={RecentGames} />
        <PrivateRoute path='/new-bet' component={NewBetPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default Routes
