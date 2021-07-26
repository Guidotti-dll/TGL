import React from 'react'
import HeaderAuth from '../../components/HeaderAuth'
import ChangePasswordForm from '../../components/ChangePasswordForm'
import { AuthContainer } from '../../styles/AuthContainer'

const ChangePasswordPage: React.FC = () => {
  return (
    <AuthContainer>
      <HeaderAuth />
      <ChangePasswordForm />
    </AuthContainer>
  )
}

export default ChangePasswordPage
