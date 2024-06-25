import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

import './style.css'
import { useState } from 'react'
import { validators } from '../../shared/validation'

type HandlerForms = (value: Record<string, string>) => void

const handlerForms: HandlerForms = value => {
  const loginErrors = validators.login(value.login)
  const passwordErrors = validators.password(value.password)

  if (loginErrors.length > 0) {
    alert(`Login:\n ${loginErrors.join('\n')}`)
  }

  if (passwordErrors.length > 0) {
    alert(`Password:\n ${passwordErrors.join('\n')}`)
  }

  console.log(value)
}

export const LoginPage = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box className="login-page">
      <form>
        <Grid direction="column" display="flex" gap="1em">
          <Typography variant="h3" align="center">
            Login
          </Typography>
          <TextField
            label="Login"
            type="text"
            size="small"
            onChange={e => setValue(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            onChange={e => setPassword(e.target.value)}
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
