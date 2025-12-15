import { yupResolver } from '@hookform/resolvers/yup'
import { type BaseSyntheticEvent, type ReactNode } from 'react'
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form'
import type { AnyObjectSchema } from 'yup'

export type SubmitValues<FormValues extends FieldValues> = {
  form: FormValues
  actions: Actions<FormValues>
}

type Actions<FormValues extends FieldValues> = Pick<
  UseFormReturn<FormValues>,
  'reset' | 'setError' | 'clearErrors' | 'getValues' | 'setValue'
>

type FormProps<FormValues extends FieldValues> = UseFormProps<FormValues> & {
  schema?: AnyObjectSchema
  children: (state: UseFormReturn<FormValues>) => ReactNode
  onSubmit?: SubmitHandler<{
    form: FormValues
    actions: Actions<FormValues>
  }>
  onSubmitError?: SubmitErrorHandler<FormValues>
} & { className?: string }

export const Form = <FormValues extends FieldValues>({
  children,
  defaultValues,
  mode,
  schema,
  reValidateMode = 'onChange',
  className,
  onSubmit = () => {},
}: FormProps<FormValues>) => {
  const methods = useForm<FormValues>({
    defaultValues,
    mode,
    reValidateMode,
    resolver: schema && yupResolver(schema),
  })

  const handleOnSubmit = (data: FormValues, event?: BaseSyntheticEvent) => {
    onSubmit(
      {
        form: data,
        actions: {
          reset: methods.reset,
          setError: methods.setError,
          clearErrors: methods.clearErrors,
          getValues: methods.getValues,
          setValue: methods.setValue,
        },
      },
      event,
    )
  }

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(handleOnSubmit)}
      >
        {children(methods)}
      </form>
    </FormProvider>
  )
}
