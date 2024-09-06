import type { TextFieldProps } from '@mui/material'
import { FormApi } from 'final-form'

export type FieldTextProps<T = Record<string, unknown>> = {
  form: FormApi<T>
  name: keyof T & string
  label?: string
  validator?: (value: string) => string | string[]
} & TextFieldProps
