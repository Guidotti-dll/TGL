import React from 'react'
import HeaderAuth from '../../components/HeaderAuth'
import ResetPasswordForm from '../../components/ResetPasswordForm'
import { AuthContainer } from '../../styles/AuthContainer'

const ResetPasswordPage: React.FC = () => {
  return (
    <AuthContainer>
      <HeaderAuth />
      <ResetPasswordForm />
    </AuthContainer>
  )
}

export default ResetPasswordPage
