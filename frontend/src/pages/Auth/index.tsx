import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import HeaderAuth from '../../components/HeaderAuth'
import LoginAuth from '../../components/LoginAuth'
import { AuthContainer } from '../../styles/AuthContainer'
const AuthPage = () => {
  const { search } = useLocation()
  useEffect(() => {
    const confirm = new URLSearchParams(search).get('confirm')
    if (confirm === 'true') {
      toast.success('Olá! Sua conta está confirmada.')
    }
  }, [])
  return (
    <AuthContainer>
      <HeaderAuth />
      <LoginAuth />
    </AuthContainer>
  )
}

export default AuthPage
