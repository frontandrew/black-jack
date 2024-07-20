import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  useTheme,
} from '@mui/material'
import { FieldText } from 'components'
import { useForm } from 'react-final-form-hooks'
import { validators } from 'validators'
import { PropsChange } from './type'

type Password = object

const config = {
  validateOnBlur: true,
  onSubmit: (formValues: Password) => {
    console.table(formValues)
  },
}

export const Changes: React.FC<PropsChange> = props => {
  const { isOpen, handle, rest } = props
  const { type, title, lable, button } = rest

  const { form, handleSubmit } = useForm(config)
  const { hasValidationErrors } = form.getState()
  const { spacing } = useTheme()

  return (
    <Dialog
      open={isOpen}
      onClose={handle}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          if (type === 'file') {
            event.preventDefault()
            console.log('file')
          } else {
            handleSubmit(event)
          }
        },
      }}>
      <Grid
        container
        flexDirection={'column'}
        alignItems={'center'}
        padding={spacing(3, 4)}>
        <DialogTitle>{title}</DialogTitle>
        {type === 'file' ? (
          <FieldText
            form={form}
            name={type}
            label={lable}
            type={type}
            helperText={'Upload only JPEG or PNG images'}
            required
          />
        ) : (
          <FieldText
            form={form}
            name={type}
            label={lable}
            type={type}
            validator={validators.password}
            required
          />
        )}
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            type={'submit'}
            variant={'contained'}
            disabled={hasValidationErrors}>
            {button}
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  )
}
