import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { Button } from 'react-native'

import AuthContainer from '../../components/AuthContainer'
import Input from '../../components/Input'
import { AuthSchema } from '../../utils/schemas'
import { Container, Form } from './styles'

type LoginInfos = {
  email: string
  password: string
}

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInfos>({
    resolver: yupResolver(AuthSchema),
  })

  const onSubmit: SubmitHandler<LoginInfos> = data => {
    alert(JSON.stringify(data))
  }
  return (
    <AuthContainer>
      <Container>
        <Form>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type='password'
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.password?.message}
                placeholder='Password'
              />
            )}
            name='password'
            defaultValue=''
          />
        </Form>
        <Button title='Submit' onPress={handleSubmit(onSubmit)} />
      </Container>
    </AuthContainer>
  )
}

export default SignIn
