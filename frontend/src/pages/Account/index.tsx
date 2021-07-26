import React from 'react'
import { AccountContainer } from './styles'
import Input from '../../components/Input'
import { useSelector } from 'react-redux'
import { AuthState } from '../../store/ducks/Auth'
import { AppStore } from '../../store'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProfileSchema } from '../../utils/schemas'
import { toast } from 'react-toastify'
import api from '../../services/api'

type UserInfos = {
  name: string
  email: string
  password: string
}

const AccountPage: React.FC = () => {
  const { user } = useSelector<AppStore, AuthState>(state => state.Auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfos>({ resolver: yupResolver(ProfileSchema) })

  const onSubmit: SubmitHandler<UserInfos> = async ({
    name,
    email,
    password,
  }) => {
    try {
      await api.patch(`/users/${user.id}`, {
        email,
        name,
        password,
      })

      toast.success('Informações atualizadas com sucesso!')
    } catch (error) {
      toast.error(error.response.data.error.message)
    }
  }
  return (
    <AccountContainer>
      <div className='profile'>
        <h1>My infos</h1>

        <div className='infos'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type='text'
              placeholder='Name'
              defaultValue={user.name}
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              type='text'
              placeholder='Email'
              defaultValue={user.email}
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              type='password'
              placeholder='Password'
              {...register('password')}
              error={errors.password?.message}
            />

            <button>Update</button>
          </form>
        </div>
      </div>
    </AccountContainer>
  )
}

export default AccountPage
