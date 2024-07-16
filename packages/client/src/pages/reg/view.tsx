import { Box, Button, Grid, Paper, Typography, useTheme } from '@mui/material'
import './style.css'
import { useNavigate } from 'react-router'
import { FC } from 'react'
import { FieldText } from 'components'
import { useForm } from 'react-final-form-hooks'
import { validators } from 'validators'

type LoginType = object

const config = {
  validateOnBlur: true,
  onSubmit: (formValues: LoginType) => {
    console.table(formValues)
  },
}

export const RegPage: FC = () => {
  const { spacing } = useTheme()
  const navigate = useNavigate()

  const { form, handleSubmit } = useForm(config)
  const { hasValidationErrors } = form.getState()

  return (
    <Box className="login-page">
      <Paper elevation={3} square={false}>
        <Grid
          direction="column"
          display="flex"
          gap="0.5em"
          padding={spacing(2, 9)}
          component={'form'}
          onSubmit={event => {
            handleSubmit(event)
          }}>
          <Typography variant="h3" align="center">
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
            disabled={hasValidationErrors}>
            SIGN UP
          </Button>
          <Button
            variant="text"
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
