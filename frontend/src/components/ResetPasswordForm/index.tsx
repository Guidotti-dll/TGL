import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link, useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Input from '../Input'
import { EmailSchema } from '../../utils/schemas'
import { FormContainer } from '../../styles/FormContainer'
import api from '../../services/api'

type LoginInfos = {
  email: string
}

const ResetPasswordForm: React.FC = () => {
  const { push } = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfos>({ resolver: yupResolver(EmailSchema) })

  const onSubmit: SubmitHandler<LoginInfos> = async ({ email }) => {
    try {
      await api.post('/forgot-password', {
        email,
        redirect_url: 'http://localhost:3000/reset-password',
      })

      toast.success(
        'Enviamos um link para o seu email para recuperar a sua senha!!',
      )
      push('/')
    } catch (error) {
      toast.error(error.response.data.error.message)
    }
  }

  return (
    <FormContainer>
      <h1>Reset password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          placeholder='Email'
          {...register('email')}
          error={errors.email?.message}
        />
        <button className='button'>
          Send Link <HiOutlineArrowRight />
        </button>
      </form>
      <Link to='/' className='button action reverse'>
        Back <HiOutlineArrowRight />
      </Link>
    </FormContainer>
  )
}

export default ResetPasswordForm
