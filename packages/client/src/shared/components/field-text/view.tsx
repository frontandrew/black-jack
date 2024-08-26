import { FC } from 'react'
import { useField } from 'react-final-form-hooks'
import { Grid, TextField } from '@mui/material'
import { FieldTextProps } from './type'

export const FieldText: FC<FieldTextProps> = props => {
  const { name, label, form, validator, ...rest } = props
  const { input, meta } = useField(name, form, validator)

  const fieldLabel = label ?? ''
  const fieldHelp = (meta.dirty && meta.error) ?? ''
  const fieldError = !!meta.error
  const heightBySize = rest.size === 'small' ? '4em' : '5em'
  const fieldHeight = validator ? heightBySize : 'auto'

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
