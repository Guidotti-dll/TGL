import React from 'react'
import { useDispatch } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../Input'
import { FormContainer } from '../../styles/FormContainer'
import { AuthSchema } from '../../utils/schemas'
import { loginRequest } from '../../store/ducks/Auth'

type LoginInfos = {
  email: string
  password: string
}

const LoginAuth: React.FC = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfos>({ resolver: yupResolver(AuthSchema) })

  const onSubmit: SubmitHandler<LoginInfos> = data => {
    dispatch(loginRequest(data.email, data.password))
  }

  return (
    <FormContainer>
      <h1>Authentication</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          placeholder='Email'
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          type='password'
          placeholder='Password'
          {...register('password')}
          error={errors.password?.message}
        />
        <Link to='/reset-password'>I forget my password</Link>
        <button className='button'>
          Log In <HiOutlineArrowRight />
        </button>
      </form>
      <Link to='/signup' className='button action'>
        Sign Up <HiOutlineArrowRight />
      </Link>
    </FormContainer>
  )
}

export default LoginAuth
