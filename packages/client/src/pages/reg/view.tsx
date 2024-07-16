import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import './style.css'
import { useNavigate } from 'react-router'
import { FC } from 'react'
import { FieldText } from 'components'
import { useForm } from 'react-final-form-hooks'
import { login } from '../../shared/validation/validators/login/login'
import { password } from '../../shared/validation/validators/password/password'
import { email } from '../../shared/validation/validators/email/email'
import { name } from '../../shared/validation/validators/name/name'
import { phone } from '../../shared/validation/validators/phone/phone'

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
            validator={name}
            size="small"
            required
          />

          <FieldText
            form={form}
            name={'second_name'}
            label={'Last name'}
            validator={name}
            size="small"
            required
          />

          <FieldText
            form={form}
            name="login"
            label="Login"
            size="small"
            validator={login}
            required
          />

          <FieldText
            form={form}
            name="email"
            label="Email"
            size="small"
            validator={email}
            required
          />

          <FieldText
            form={form}
            name="password"
            label="Password"
            size="small"
            validator={password}
            required
          />

          <FieldText
            form={form}
            name={'phone'}
            label={'Phone'}
            validator={phone}
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
