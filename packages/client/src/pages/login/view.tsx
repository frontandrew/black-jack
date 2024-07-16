import { Box, Button, Grid, Paper, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router'
import { FC } from 'react'

import './style.css'
import { FieldText } from 'components'
import { useForm } from 'react-final-form-hooks'
import { login } from '../../shared/validation/validators/login/login'
import { password } from '../../shared/validation/validators/password/password'

type LoginType = object

const config = {
  validateOnBlur: true,
  onSubmit: (formValues: LoginType) => {
    console.table(formValues)
  },
}

export const LoginPage: FC = () => {
  const { spacing } = useTheme()
  const navigate = useNavigate()

  const { form, handleSubmit } = useForm(config)
  const { hasValidationErrors } = form.getState()

  return (
    <Box className="login-page">
      <Paper elevation={3} square={false}>
        <Grid
          container
          direction="column"
          display="flex"
          gap="2em"
          padding={spacing(2, 6)}
          component={'form'}
          onSubmit={event => {
            handleSubmit(event)
          }}>
          <Typography variant="h3" align="center" margin={spacing(2)}>
            Login
          </Typography>

          <FieldText
            form={form}
            name="login"
            label="Login"
            validator={login}
            required
          />

          <FieldText
            form={form}
            name="password"
            label="Password"
            validator={password}
            required
          />

          <Button
            type="submit"
            variant="contained"
            disabled={hasValidationErrors}>
            SIGN IN
          </Button>
          <Button
            variant="text"
            onClick={() => {
              navigate('/sign-up')
            }}>
            sign up
          </Button>
        </Grid>
      </Paper>
    </Box>
  )
}
