import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { View } from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useSelector } from 'react-redux'

import Header from '../../components/Header'
import Input from '../../components/Input'
import Loading from '../../components/Loading'
import { colors } from '../../constants/colors'
import api from '../../services/api'
import { AppStore } from '../../store'
import { AuthState } from '../../store/ducks/Auth'
import { ProfileSchema } from '../../utils/schemas'
import { Button, ButtonText } from '../SignIn/styles'
import { Container, Content, Form, Title } from './styles'

type ProfileInfos = {
  name: string
  email: string
  password: string
}

const Account = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileInfos>({
    resolver: yupResolver(ProfileSchema),
  })
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSelector<AppStore, AuthState>(state => state.Auth)

  const onSubmit: SubmitHandler<ProfileInfos> = async ({
    name,
    email,
    password,
  }) => {
    setIsLoading(true)
    try {
      await api.patch(`/users/${user.id}`, {
        email,
        name,
        password,
      })

      setIsLoading(false)
      showMessage({
        message: 'Success',
        type: 'success',
        description: 'Informações atualizadas com sucesso!',
        icon: 'success',
      })
    } catch (error) {
      setIsLoading(false)
      showMessage({
        message: 'Error',
        type: 'danger',
        description: error.response.data.error.message,
        icon: 'danger',
      })
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <Loading />}
      <Header />
      <Container>
        <Content>
          <Title>Account</Title>
          <Form>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value || user.name}
                  error={errors.email?.message}
                  placeholder='Name'
                  type='text'
                />
              )}
              name='name'
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={onChange}
                  value={value || user.email}
                  error={errors.email?.message}
                  placeholder='Email'
                  type='email'
                />
              )}
              name='email'
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type='password'
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                  placeholder='Password'
                />
              )}
              name='password'
              defaultValue=''
            />
            <Button
              onPress={handleSubmit(onSubmit)}
              style={{ marginBottom: 30, marginTop: 21 }}
            >
              <ButtonText color={colors.green}>Update</ButtonText>
              <AntDesign
                name='arrowright'
                size={21}
                color={colors.green}
                style={{ marginLeft: 18 }}
              />
            </Button>
          </Form>
        </Content>
      </Container>
    </View>
  )
}

export default Account
