import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import { FieldText } from 'components'
import React from 'react'
import { useForm } from 'react-final-form-hooks'
import { validators } from 'validators'

type Password = object

type PropsChange = {
  isOpen: boolean
  handle: () => void
}

const config = {
  validateOnBlur: true,
  onSubmit: (formValues: Password) => {
    console.table(formValues)
  },
}

export const Changes: React.FC = props => {
  const { isOpen, handle, rest } = props
  const { type, title, lable, button } = rest

  const { form, handleSubmit } = useForm(config)
  const { hasValidationErrors } = form.getState()

  return (
    <Dialog open={isOpen} onClose={handle}>
      <Grid
        container
        flexDirection={'column'}
        alignItems={'center'}
        padding={2}>
        <DialogTitle>
          <Typography variant={'h4'}>{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <FieldText
            form={form}
            name={type}
            label={lable}
            type={type}
            // helperText={type === 'file' ? 'upload only a JPEG or PNG' : ''}
            validator={validators.password}
            required
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant={'contained'}>{button}</Button>
        </DialogActions>
      </Grid>
    </Dialog>
  )
}
