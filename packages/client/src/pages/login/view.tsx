import React from 'react'
import { useNavigate } from 'react-router'
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'
import { useForm } from 'react-final-form-hooks'
import { FieldText } from 'components'
import { validators } from 'validators'
import './style.css'
import { ButtonYandex } from './components'

type LoginType = object

const config = {
  validateOnBlur: true,
  onSubmit: (formValues: LoginType) => {
    console.table(formValues)
  },
}

export const LoginPage: React.FC = () => {
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
          padding={spacing(4, 4)}
          component={'form'}
          className="custom-text-error"
          width={'400px'}
          onSubmit={event => {
            handleSubmit(event)
          }}>
          <Typography variant="h5" align="center" paddingBottom={3}>
            Login
          </Typography>

          <FieldText
            form={form}
            name="login"
            label="Login"
            validator={validators.login}
            size="small"
            required
          />

          <FieldText
            form={form}
            name="password"
            label="Password"
            validator={validators.password}
            size="small"
            type="password"
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
        <Divider variant="middle" />
        <ButtonYandex />
      </Paper>
    </Box>
  )
}
