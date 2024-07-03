import { Grid, TextField } from '@mui/material'
import { useField } from 'react-final-form-hooks'

import type { FC } from 'react'

import { FieldTextProps } from './type'

export const FieldText: FC<FieldTextProps> = props => {
  const { name, label, form, validator, ...rest } = props
  const { input, meta } = useField(name, form, validator)

  const fieldLabel = label ?? ''
  const fieldHelp = (meta.dirty && meta.error) ?? ''
  const fieldError = !!meta.error
  const fieldHeight = validator ? '5em' : 'auto'

  console.log(
    `%c TextField[${name}]:`,
    'color: white; background-color: green',
    { form, input, meta }
  )

  return (
    <Grid container flexDirection={'column'} height={fieldHeight}>
      <TextField
        error={fieldError}
        helperText={fieldHelp}
        label={fieldLabel}
        {...{ ...rest, ...input }}
      />
    </Grid>
  )
}
