import { Box, Button, Grid, Input, TextField, Typography } from '@mui/material'
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

  const handlerForms: HandlerForms = value => {
    const loginErrors = validators.login(value.login)
    const passwordErrors = validators.password(value.password)

    if (loginErrors.length > 0) {
      setErrorLogin(true)
      alert(`Login:\n ${loginErrors.join('\n')}`)
    }

    if (passwordErrors.length > 0) {
      setErrorPassword(true)
      alert(`Password:\n ${passwordErrors.join('\n')}`)
    }

    if (passwordErrors.length === 0) {
      setErrorPassword(false)
    }

    if (loginErrors.length === 0) {
      setErrorLogin(false)
    }

    if (passwordErrors.length === 0 && loginErrors.length === 0) {
      console.log(value)
    }
  }

  return (
    <Box className="login-page">
      <form>
        <Grid direction="column" display="flex" gap="1em">
          <Typography variant="h3" align="center">
            Login
          </Typography>
          <TextField
            error={errorLogin}
            label="Login"
            type="text"
            size="small"
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
            onChange={e => {
              setPassword(e.target.value)
            }}
            inputProps={{
              onBlur: () => {
                handlerForms({ password: password })
              },
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              handlerForms({
                login: value,
                password: password,
              })
            }}>
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
  )
}
