import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link, useHistory, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import Input from '../Input'
import { ResetPasswordSchema } from '../../utils/schemas'
import { FormContainer } from '../../styles/FormContainer'
import api from '../../services/api'

type Password = {
  password: string
  passwordConfirmation: string
}

const ChangePasswordForm: React.FC = () => {
  const { push } = useHistory()
  const token = window.location.search.split('token=')[1]
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Password>({ resolver: yupResolver(ResetPasswordSchema) })

  const onSubmit: SubmitHandler<Password> = async ({
    password,
    passwordConfirmation,
  }) => {
    try {
      await api.put('/reset-password', {
        password,
        password_confirmation: passwordConfirmation,
        token: token,
      })
      toast.success('Senha alterada con sucesso!!')
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
          type='password'
          placeholder='Password'
          {...register('password')}
          error={errors.password?.message}
        />
        <Input
          type='password'
          placeholder='Confirm password'
          {...register('passwordConfirmation')}
          error={errors.passwordConfirmation?.message}
        />
        <button className='button'>
          Save <HiOutlineArrowRight />
        </button>
      </form>
      <Link to='/' className='button action reverse'>
        Back <HiOutlineArrowRight />
      </Link>
    </FormContainer>
  )
}

export default ChangePasswordForm
