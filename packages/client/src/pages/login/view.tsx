import React from 'react'
import { useNavigate } from 'react-router'
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  SvgIcon,
  Typography,
  useTheme,
} from '@mui/material'
import { useForm } from 'react-final-form-hooks'
import { FieldText } from 'components'
import { validators } from 'validators'
import './style.css'
import { oAuth } from 'oauth'

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

  const handleYandexOAuth = async () => {
    oAuth()
  }

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
          <Divider variant="middle" />
          <Grid>
            <IconButton onClick={handleYandexOAuth} size="small">
              <SvgIcon viewBox="-3 -3 70 70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="70"
                  height="70"
                  fill="none">
                  <circle cx="32" cy="32" r="36" fill="#FC3F1D" />
                  <path
                    d="M37.02 52h6.977V12H33.842c-10.213 0-15.57 5.228-15.57 12.951 0 6.667 3.473 10.426 9.625 14.509l3.738 2.467-4.798-4.024L17.33 52h7.564L35.05 36.846l-3.532-2.35c-4.268-2.878-6.358-5.11-6.358-9.956 0-4.258 3.003-7.136 8.712-7.136h3.12V52h.03z"
                    fill="#fff"
                  />
                </svg>
              </SvgIcon>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}
