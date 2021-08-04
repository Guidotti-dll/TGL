import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { ToastAndroid } from 'react-native'

import { AuthStackParamList } from '../../Routes/Auth'
import AuthContainer from '../../components/AuthContainer'
import Input from '../../components/Input'
import { colors } from '../../constants/colors'
import api from '../../services/api'
import { EmailSchema } from '../../utils/schemas'
import { Button, ButtonText, Container, Title } from '../SignIn/styles'
import { Form } from './syles'

type SignScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>

type EmailProps = {
  email: string
}

type Props = {
  navigation: SignScreenNavigationProp
}

const ForgotPassword = ({ navigation }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EmailProps>({
    resolver: yupResolver(EmailSchema),
  })

  const onSubmit: SubmitHandler<EmailProps> = async ({ email }) => {
    try {
      await api.post('/forgot-password', {
        email,
        redirect_url: 'http://localhost:3000/reset-password',
      })

      alert('Enviamos um link para o seu email para recuperar a sua senha!!')
      navigation.goBack()
    } catch (error) {
      alert(error.response.data.error.message)
    }
  }

  return (
    <AuthContainer>
      <Container>
        <Title>Reset Password</Title>
        <Form>
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
          <Button
            onPress={handleSubmit(onSubmit)}
            style={{ marginBottom: 20, marginTop: 16 }}
          >
            <ButtonText color={colors.green}>Send Link</ButtonText>
            <AntDesign
              name='arrowright'
              size={21}
              color={colors.green}
              style={{ marginLeft: 18 }}
            />
          </Button>
        </Form>
        <Button
          onPress={() => navigation.push('SignIn')}
          style={{ marginTop: 45 }}
        >
          <AntDesign
            name='arrowleft'
            size={24}
            color={colors.gray}
            style={{ marginRight: 18 }}
          />
          <ButtonText>Back</ButtonText>
        </Button>
        <Button onPress={() => navigation.goBack()} style={{ marginTop: 65 }}>
          <ButtonText>Sign Up</ButtonText>
          <AntDesign
            name='arrowright'
            size={24}
            color={colors.gray}
            style={{ marginLeft: 17 }}
          />
        </Button>
      </Container>
    </AuthContainer>
  )
}

export default ForgotPassword
