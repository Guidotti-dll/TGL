import React from 'react'
import HeaderAuth from '../../components/HeaderAuth'
import LoginAuth from '../../components/LoginAuth'
import { AuthContainer } from '../../styles/AuthContainer'
const AuthPage = () => {
  return (
    <AuthContainer>
      <HeaderAuth />
      <LoginAuth />
    </AuthContainer>
  )
}

export default AuthPage
