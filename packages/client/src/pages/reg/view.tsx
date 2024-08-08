import React from 'react'
import { useNavigate } from 'react-router'
import { Box, Button, Grid, Paper, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-final-form-hooks'
import { FieldText } from 'components'
import { validators } from 'validators'
import './style.css'

type LoginType = object

const config = {
  validateOnBlur: true,
  onSubmit: (formValues: LoginType) => {
    console.table(formValues)
  },
}

export const RegPage: React.FC = () => {
  const { spacing } = useTheme()
  const navigate = useNavigate()

  const { form, handleSubmit } = useForm(config)
  const { hasValidationErrors } = form.getState()

  return (
    <Box className="login-page">
      <Paper elevation={3} square={false}>
        <Grid
          padding={spacing(4, 4)}
          component={'form'}
          className="custom-text-error"
          width={'400px'}
          onSubmit={event => {
            handleSubmit(event)
          }}>
          <Typography variant="h5" align="center" paddingBottom={3}>
            Register
          </Typography>

          <FieldText
            form={form}
            name="first_name"
            label="Name"
            validator={validators.name}
            size="small"
            required
          />

          <FieldText
            form={form}
            name={'second_name'}
            label={'Last name'}
            validator={validators.name}
            size="small"
            required
          />

          <FieldText
            form={form}
            name="login"
            label="Login"
            size="small"
            validator={validators.login}
            required
          />

          <FieldText
            form={form}
            name="email"
            label="Email"
            size="small"
            validator={validators.email}
            required
          />

          <FieldText
            form={form}
            name="password"
            label="Password"
            size="small"
            validator={validators.password}
            type="password"
            required
          />

          <FieldText
            form={form}
            name={'phone'}
            label={'Phone'}
            validator={validators.phone}
            size="small"
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={hasValidationErrors}>
            SIGN UP
          </Button>
          <Button
            variant="text"
            sx={{ marginTop: 2, marginBottom: 2 }}
            fullWidth
            onClick={() => {
              navigate('/sign-in')
            }}>
            sign in
          </Button>
        </Grid>
      </Paper>
    </Box>
  )
}
