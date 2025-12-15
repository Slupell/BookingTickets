import { AxiosError } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, type SubmitValues } from 'src/components/form/form'
import { InputField } from 'src/components/form/inputField'
import { MY_TICKETS_ROUTE, REGISTRATION_ROUTE } from 'src/constants/routes'
import { sessionKey } from 'src/constants/sessions'
import { useFetchLoginMutation } from 'src/modules/user/api'
import { LoginFormSchema } from './schema'
import type { FormValues } from './types'

export const LoginForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const { mutate: loginMutation, isPending } = useFetchLoginMutation({
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
    loginMutation({
      username: form.login,
      password: form.password,
    })
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center text-black">
      <Form
        onSubmit={onSubmit}
        schema={LoginFormSchema}
      >
        {() => (
          <div className="flex w-full max-w-md flex-col items-center gap-8">
            <h1 className="mb-4 text-4xl font-normal tracking-wide">Вход</h1>

            <div className="w-full space-y-6">
              <InputField
                name="login"
                type="text"
                label="Логин"
                placeholder="Введите логин"
                className="w-full rounded-none border border-neutral-500 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-500"
              />
              <div className="relative">
                <InputField
                  name="password"
                  type="password"
                  label="Пароль"
                  placeholder="Введите пароль"
                  className={`w-full rounded-none border bg-neutral-50 px-4 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 ${
                    error
                      ? 'border-red-500 focus:border-red-500 focus:ring-0'
                      : 'border-neutral-500 focus:border-neutral-700 focus:ring-0'
                  }`}
                />
                {error && (
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full border border-red-400 text-[10px] text-red-400">
                      !
                    </div>
                  </div>
                )}
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
              </div>
            </div>
            <button
              disabled={isPending}
              type="submit"
              className="mt-4 inline-flex h-10 min-w-[140px] items-center justify-center rounded border border-neutral-700 px-10 text-sm text-neutral-900 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? 'Входим...' : 'Войти'}
            </button>
            <div className="mt-16 text-sm text-neutral-800">
              <span>Если у вас нет аккаунта&nbsp;</span>
              <Link
                to={REGISTRATION_ROUTE}
                className="border-b border-neutral-700 pb-0.5 transition hover:border-neutral-900"
              >
                зарегистрируйтесь
              </Link>
            </div>
          </div>
        )}
      </Form>
    </div>
  )
}
