import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { showMessage } from 'react-native-flash-message'

import { AuthStackParamList } from '../../Routes/Auth'
import AuthContainer from '../../components/AuthContainer'
import Input from '../../components/Input'
import Loading from '../../components/Loading'
import { colors } from '../../constants/colors'
import api from '../../services/api'
import { SignUpSchema } from '../../utils/schemas'
import { Container, Button, ButtonText, Title } from '../SignIn/styles'
import { Form } from './styles'

type RegistrationInfos = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}
type SignUpScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignUp'
>

type Props = {
  navigation: SignUpScreenNavigationProp
}

const SignUp = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationInfos>({
    resolver: yupResolver(SignUpSchema),
  })

  const onSubmit: SubmitHandler<RegistrationInfos> = async ({
    name,
    email,
    password,
    passwordConfirmation,
  }) => {
    setIsLoading(true)
    try {
      await api.post('/users', {
        email,
        name,
        password,
        password_confirmation: passwordConfirmation,
      })

      showMessage({
        message: 'Success',
        type: 'success',
        description:
          'Conta criada com sucesso!! Confirme sua conta no seu email',
        icon: 'success',
      })
      setIsLoading(false)
      navigation.goBack()
    } catch (error) {
      setIsLoading(false)
      error.response.data.forEach((error: { message: string }) => {
        showMessage({
          message: 'Error',
          type: 'danger',
          description: error.message,
          icon: 'danger',
        })
      })
    }
  }
  return (
    <AuthContainer>
      {isLoading && <Loading />}
      <Container>
        <Title>Registration</Title>
        <Form>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
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
                value={value}
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
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                type='password'
                onChangeText={onChange}
                value={value}
                error={errors.passwordConfirmation?.message}
                placeholder='Password Confirmation'
              />
            )}
            name='passwordConfirmation'
            defaultValue=''
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            style={{ marginBottom: 30, marginTop: 21 }}
          >
            <ButtonText color={colors.green}>Register</ButtonText>
            <AntDesign
              name='arrowright'
              size={21}
              color={colors.green}
              style={{ marginLeft: 18 }}
            />
          </Button>
        </Form>
        <Button onPress={() => navigation.goBack()} style={{ marginTop: 38 }}>
          <AntDesign
            name='arrowleft'
            size={24}
            color={colors.gray}
            style={{ marginRight: 18 }}
          />
          <ButtonText>Back</ButtonText>
        </Button>
      </Container>
    </AuthContainer>
  )
}

export default SignUp
