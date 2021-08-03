import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { Button, Text, TextInput } from 'react-native'
import * as yup from 'yup'

import AuthContainer from '../../components/AuthContainer'
import { Container, Form } from './styles'

type LoginInfos = {
  email: string
  password: string
}

const SignIn = () => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginInfos>()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInfos>({
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .required('Este campo é obrigatório')
          .email('Insira um email valido'),
      }),
    ),
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
            // rules={{
            //   required: true,
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name='email'
            defaultValue=''
          />
          {errors.email && <Text>{errors.email.message}</Text>}
          {/* <Input
            text="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            name="firstName"
          /> */}
          {/* <Input
            placeholder='Password'
            {...register('password')}
            error={errors.password?.message}
          /> */}
          <Button title='Submit' onPress={handleSubmit(onSubmit)} />
        </Form>
      </Container>
    </AuthContainer>
  )
}

export default SignIn
