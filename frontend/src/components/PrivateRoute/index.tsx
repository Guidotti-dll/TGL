import React from 'react'
import { useSelector } from 'react-redux'
import { AppStore } from '../../store'
import { AuthState } from '../../store/ducks/Auth'
import { Redirect, Route } from 'react-router-dom'
import NavBar from '../NavBar'

interface IProps {
  exact?: boolean
  path: string
  component: React.ComponentType<any>
}

const PrivateRoute = ({ component: Component, ...rest }: IProps) => {
  const { isLogged } = useSelector<AppStore, AuthState>(state => state.Auth)

  return (
    <Route
      {...rest}
      render={() => {
        return isLogged ? (
          <>
            <NavBar />
            {<Component />}
          </>
        ) : (
          <Redirect to={{ pathname: '/' }} />
        )
      }}
    />
  )
}

export default PrivateRoute
