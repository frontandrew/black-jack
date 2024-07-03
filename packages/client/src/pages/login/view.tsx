import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

import './style.css'
import { useState } from 'react'
import { validators } from '../../shared/validation'

type HandlerForms = (value: Record<string, string>) => void

export const LoginPage = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
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
      console.log(loginErrors.join('\n'))
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
      <Box
        height={370}
        width={300}
        p={2}
        sx={{
          border: '2px solid black',
          borderRadius: '10px',
        }}>
        <div className="clubs">{String.fromCharCode(9827)}</div>
        <form
          onSubmit={e => {
            e.preventDefault() // Предотвращаем перезагрузку страницы
            handlerForms({ login: value, password: password })
          }}>
          <Grid direction="column" display="flex" gap="0.5em">
            <Typography
              variant="h3"
              align="center"
              sx={{ marginBottom: '20px' }}>
              Login
            </Typography>
            <TextField
              error={errorLogin}
              label="Login"
              type="text"
              size="small"
              sx={{
                height: '70px',
              }}
              helperText={halperLogin}
              onChange={e => setValue(e.target.value)}
              inputProps={{
                onBlur: () => {
                  handlerForms({ login: value })
                },
              }}
            />
            <TextField
              error={errorPassword}
              label="password"
              type="password"
              size="small"
              sx={{
                height: '70px',
              }}
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
      </Box>
    </Box>
  )
}
