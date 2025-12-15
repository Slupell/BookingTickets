import type { InputHTMLAttributes } from 'react'
import { type FieldValues, type Path, useController, useFormContext } from 'react-hook-form'

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>

type FormInputBaseProps<FormValues extends FieldValues, Name extends Path<FormValues>> = {
  name: Name
  label: string
} & Omit<NativeInputProps, 'name'>

type FormInputProps<
  FormValues extends FieldValues,
  Name extends Path<FormValues>,
> = FormInputBaseProps<FormValues, Name>

export const InputField = <FormValues extends FieldValues, Name extends Path<FormValues>>({
  name,
  label,

  ...props
}: FormInputProps<FormValues, Name>) => {
  const { control } = useFormContext<FormValues>()
  const { field, fieldState } = useController<FormValues, Name>({ name, control })
  const { error } = fieldState

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        {...field}
        value={field.value || ''}
        {...props}
      />
      {typeof error !== 'undefined' && error?.message && <span>{error.message}</span>}
    </div>
  )
}
