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

export const ChangePasswordModal: React.FC<PropsChange> = props => {
  const { isOpen, handle } = props
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
          handleSubmit(event)
        },
      }}>
      <Grid
        container
        flexDirection={'column'}
        alignItems={'center'}
        padding={spacing(3, 5)}
        gap={4}>
        <DialogTitle>Change Password</DialogTitle>
        <FieldText
          form={form}
          name={'password'}
          label={'Password'}
          type={'password'}
          validator={validators.password}
          required
        />
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            type={'submit'}
            variant={'contained'}
            disabled={hasValidationErrors}>
            change
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  )
}
