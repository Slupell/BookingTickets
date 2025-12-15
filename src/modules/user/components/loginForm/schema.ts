import * as Yup from 'yup'
import type { FormValues } from './types'

export const LoginFormSchema: Yup.ObjectSchema<FormValues> = Yup.object({
  login: Yup.string().required('Поле обязательное').min(8, 'Минимальное длина логина 8 символов'),
  password: Yup.string()
    .required('Поле обязательное')
    .min(8, 'Минимальное длина пароля 8 символов')
    .matches(
      /^(?=.*[A-ZА-Я])(?=.*\d).+$/,
      'Пароль должен содержать минимум 1 заглавную букву и 1 цифру',
    ),
})
