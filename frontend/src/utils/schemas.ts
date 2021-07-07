import * as yup from "yup";

export const AuthSchema = yup.object().shape({
  email: yup
    .string()
    .required("Este campo é obrigatório")
    .email("Insira um email valido"),
  password: yup
    .string()
    .min(8, "Este campo deve ter no mínimo 8 caracteres")
    .required("Este campo é obrigatório"),
});