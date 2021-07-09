import * as yup from 'yup'

export const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('Este campo é obrigatório')
    .email('Insira um email valido'),
})

export const AuthSchema = EmailSchema.shape({
  password: yup
    .string()
    .min(8, 'Este campo deve ter no mínimo 8 caracteres')
    .required('Este campo é obrigatório'),
})

export const SignUpSchema = AuthSchema.shape({
  name: yup.string().required('Este campo é obrigatório'),
})
