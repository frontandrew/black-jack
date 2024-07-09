import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { useNavigate } from 'react-router'
import { FC, useState } from 'react'

import './style.css'
import { validators } from '../../shared/validation/index'

type HandlerForms = (value: Record<string, string>) => void

export const LoginPage: FC = () => {
  const { spacing } = useTheme()
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [errorLogin, setErrorLogin] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)

  const [halperLogin, setHalperLogin] = useState('')
  const [halperPassword, setHalperPassword] = useState('')

  const handlerForms: HandlerForms = value => {
    const loginErrors = validators.login(value.login)
    const passwordErrors = validators.password(value.password)

    if (loginErrors.length > 0) {
      setErrorLogin(true)
      setHalperLogin(loginErrors[0])
    }

    if (passwordErrors.length > 0) {
      setErrorPassword(true)
      setHalperPassword(passwordErrors[0])
    }

    if (passwordErrors.length === 0) {
      setHalperPassword('')
      setErrorPassword(false)
    }

    if (loginErrors.length === 0) {
      setHalperLogin('')
      setErrorLogin(false)
    }

    if (passwordErrors.length === 0 && loginErrors.length === 0) {
      console.log(value)
    }
  }

  return (
    <Box className="login-page">
      <Paper elevation={3} square={false}>
        <form
          onSubmit={e => {
            e.preventDefault() // Предотвращаем перезагрузку страницы
            handlerForms({ login: login, password: password })
          }}>
          <Grid
            direction="column"
            display="flex"
            gap="2em"
            padding={spacing(2, 6)}>
            <Typography variant="h3" align="center" margin={spacing(2)}>
              Login
            </Typography>

            <TextField
              error={errorLogin}
              name="login"
              label="Login"
              type="text"
              size="small"
              helperText={halperLogin}
              onChange={e => setLogin(e.target.value)}
              inputProps={{
                onBlur: () => {
                  handlerForms({ login: login })
                },
              }}
            />

            <TextField
              error={errorPassword}
              name="password"
              label="password"
              type="password"
              size="small"
              helperText={halperPassword}
              onChange={e => {
                setPassword(e.target.value)
              }}
              inputProps={{
                onBlur: () => {
                  handlerForms({ password: password })
                },
              }}
            />

            <Button type="submit" variant="contained">
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
        </form>
      </Paper>
    </Box>
  )
}
