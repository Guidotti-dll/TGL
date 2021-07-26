import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../Input'
import { FormContainer } from '../../styles/FormContainer'
import { SignUpSchema } from '../../utils/schemas'
import api from '../../services/api'

type LoginInfos = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const SignUpForm: React.FC = () => {
  const { push } = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfos>({ resolver: yupResolver(SignUpSchema) })

  const onSubmit: SubmitHandler<LoginInfos> = async ({
    name,
    email,
    password,
    passwordConfirmation,
  }) => {
    try {
      await api.post('/users', {
        email,
        name,
        password,
        password_confirmation: passwordConfirmation,
      })

      toast.success(
        'Conta criada com sucesso!! Confirme sua conta no seu email',
      )
      push('/')
    } catch (error) {
      error.response.data.forEach((error: { message: string }) => {
        toast.error(error.message)
      })
      console.log()
    }
  }

  return (
    <FormContainer>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          placeholder='Name'
          {...register('name')}
          error={errors.name?.message}
        />
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
        <Input
          type='password'
          placeholder='Password Confirmation'
          {...register('passwordConfirmation')}
          error={errors.passwordConfirmation?.message}
        />
        <button className='button'>
          Register
          <HiOutlineArrowRight />
        </button>
      </form>
      <Link to='/' className='button action reverse'>
        Back <HiOutlineArrowRight />
      </Link>
    </FormContainer>
  )
}

export default SignUpForm
