import { AxiosError } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, type SubmitValues } from 'src/components/form/form'
import { InputField } from 'src/components/form/inputField'
import { LOGIN_ROUTE, MY_TICKETS_ROUTE } from 'src/constants/routes'
import { sessionKey } from 'src/constants/sessions'
import { useFetchRegistationMutation } from 'src/modules/user/api'
import { registrationFormSchema } from './schema'
import type { FormValues } from './types'

export const RegistrationForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const { mutate: registrationMutation, isPending } = useFetchRegistationMutation({
    onSuccess: (data) => {
      navigate(MY_TICKETS_ROUTE)
      localStorage.setItem(sessionKey, data.token)
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.message) {
        setError(error.response?.data.message)
      }
    },
  })
  const onSubmit = ({ form }: SubmitValues<FormValues>) => {
    registrationMutation({
      username: form.login,
      password: form.password,
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      schema={registrationFormSchema}
    >
      {() => (
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center text-black">
          <div className="w-full max-w-md space-y-6">
            <InputField
              className="w-full rounded-none border border-neutral-500 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-500"
              name="login"
              type="text"
              label="Логин"
              placeholder="Введите свой логин"
            />

            <InputField
              className="w-full rounded-none border border-neutral-500 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-500"
              name="password"
              type="password"
              label="Пароль"
              placeholder="Введите свой пароль"
            />

            <InputField
              className="w-full rounded-none border border-neutral-500 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-500"
              name="confirmationPassword"
              type="password"
              label="Подтверждение пароля"
              placeholder="Подтвердите пароль"
            />

            <button
              disabled={isPending}
              type="submit"
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded border border-neutral-700 px-4 text-sm text-neutral-900 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Зарегистрироваться
            </button>

            <div className="mt-6 text-sm text-neutral-800">
              <span>Если вы уже зарегистрированы&nbsp;</span>
              <Link
                to={LOGIN_ROUTE}
                className="border-b border-neutral-700 pb-0.5 transition hover:border-neutral-900"
              >
                Войдите
              </Link>
            </div>

            <div className="text-xs text-red-500">{error}</div>
          </div>
        </div>
      )}
    </Form>
  )
}
