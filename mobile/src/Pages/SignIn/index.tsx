import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { showMessage } from 'react-native-flash-message'
import { useDispatch, useSelector } from 'react-redux'

import { AuthStackParamList } from '../../Routes/Auth'
import AuthContainer from '../../components/AuthContainer'
import Input from '../../components/Input'
import { colors } from '../../constants/colors'
import { AppStore } from '../../store'
import { AuthState, loginRequest } from '../../store/ducks/Auth'
import { AuthSchema } from '../../utils/schemas'
import {
  Container,
  Form,
  Button,
  ButtonText,
  ForgotText,
  Title,
} from './styles'

type LoginInfos = {
  email: string
  password: string
}
type SignScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignIn'
>

type Props = {
  navigation: SignScreenNavigationProp
}

const SignIn = ({ navigation }: Props) => {
  const { error, isLogged } = useSelector<AppStore, AuthState>(
    state => state.Auth,
  )
  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInfos>({
    resolver: yupResolver(AuthSchema),
  })

  const onSubmit: SubmitHandler<LoginInfos> = data => {
    dispatch(loginRequest(data.email, data.password))
  }

  useEffect(() => {
    if (error) {
      showMessage({
        message: 'Error',
        type: 'danger',
        description: error,
        icon: 'danger',
      })
    }
  }, [isLogged, error])
  return (
    <AuthContainer>
      <Container>
        <Title>Authentication</Title>
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
          <ForgotText onPress={() => navigation.push('ForgotPassword')}>
            I forget my password
          </ForgotText>
          <Button onPress={handleSubmit(onSubmit)} style={{ marginBottom: 33 }}>
            <ButtonText color={colors.green}>Log In</ButtonText>
            <AntDesign
              name='arrowright'
              size={21}
              color={colors.green}
              style={{ marginLeft: 18 }}
            />
          </Button>
        </Form>
        <Button
          onPress={() => navigation.push('SignUp')}
          style={{ marginTop: 38 }}
        >
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

export default SignIn
