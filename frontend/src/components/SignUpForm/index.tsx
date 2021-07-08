import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../Input'
import { FormContainer } from '../../styles/FormContainer'
import { SignUpSchema } from '../../utils/schemas'

type LoginInfos = {
  name: string
  email: string
  password: string
}

const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfos>({ resolver: yupResolver(SignUpSchema) })

  const onSubmit: SubmitHandler<LoginInfos> = data => console.log(data)

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
