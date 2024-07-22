import React, { useState } from 'react'
import {
  Alert,
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

type Password = Record<string, string>

export const ChangePasswordModal: React.FC<PropsChange> = ({
  isOpen,
  handle,
}) => {
  const { spacing } = useTheme()
  const [errorText, setErrorText] = useState('change password')
  const [error, setError] = useState(false)

  const formConfig = {
    validateOnBlur: true,
    onSubmit: (formValues: Password) => {
      if (formValues.currentPassword === formValues.password) {
        setError(true)
        setErrorText('Do not repeat')
      }

      if (
        formValues.password !== formValues.confirmPassword ||
        formValues.confirmPassword !== formValues.password
      ) {
        console.log('work')
        setError(true)
        setErrorText('Repeat the new password')
      }

      if (
        formValues.currentPassword !== formValues.password &&
        formValues.password === formValues.confirmPassword &&
        formValues.confirmPassword === formValues.password
      ) {
        setError(false)
        setErrorText('Done')
      }
    },
  }

  const { form, handleSubmit } = useForm(formConfig)
  const { hasValidationErrors } = form.getState()

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(event)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handle}
      PaperProps={{
        component: 'form',
        onSubmit: onSubmit,
      }}>
      <Grid
        container
        flexDirection={'column'}
        alignItems={'center'}
        padding={spacing(2, 8)}
        gap={4.5}>
        <DialogTitle>Change Password</DialogTitle>
        <FieldText
          form={form}
          name={'currentPassword'}
          label={'Current password'}
          type={'password'}
          validator={validators.password}
          size="small"
          required
        />
        <FieldText
          form={form}
          name={'password'}
          label={'New password'}
          type={'password'}
          validator={validators.password}
          size="small"
          required
        />
        <FieldText
          form={form}
          name={'confirmPassword'}
          label={'Confirm new password'}
          type={'password'}
          validator={validators.password}
          size="small"
          required
        />
        <Alert
          icon={false}
          variant="outlined"
          severity={error ? 'error' : 'info'}>
          {errorText}
        </Alert>
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
