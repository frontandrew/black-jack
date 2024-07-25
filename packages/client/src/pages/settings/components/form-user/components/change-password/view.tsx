import React, { useCallback, useState } from 'react'
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
import { PropsChange, CheckRepeatPassword, Password } from './type'

export const ChangePasswordModal: React.FC<PropsChange> = ({
  isOpen,
  handle,
}) => {
  const { spacing } = useTheme()
  const [error, setError] = useState({
    text: 'Change password',
    error: false,
  })
  const checkRepeatPassword: CheckRepeatPassword = useCallback(values => {
    if (values.currentPassword === values.password) {
      return {
        text: 'Do not repeat',
        error: true,
      }
    }

    if (values.password !== values.confirmPassword) {
      return {
        text: 'Repeat the new password',
        error: true,
      }
    }

    return {
      text: 'Done',
      error: false,
    }
  }, [])

  const checkForm = useCallback(
    (formValues: Password) => {
      const result = checkRepeatPassword(formValues)
      setError(result)
    },
    [checkRepeatPassword]
  )

  const formConfig = {
    validateOnBlur: true,
    onSubmit: checkForm,
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
        {['currentPassword', 'password', 'confirmPassword'].map(name => (
          <FieldText
            key={name}
            form={form}
            name={name as string}
            label={
              name === 'currentPassword'
                ? 'Current password'
                : name === 'password'
                ? 'New password'
                : 'Confirm new password'
            }
            type="password"
            validator={validators.password}
            size="small"
            required
          />
        ))}
        <Alert
          icon={false}
          variant="outlined"
          severity={error.error ? 'error' : 'info'}>
          {error.text}
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
