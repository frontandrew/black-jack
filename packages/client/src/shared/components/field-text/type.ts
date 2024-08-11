import type { TextFieldProps } from '@mui/material'
import { FormApi } from 'final-form'

export type FieldTextProps = {
  form: FormApi
  name: string
  label?: string
  validator?: (value: string) => string | string[]
} & TextFieldProps
