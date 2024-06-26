import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import './style.css'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { validators } from '../../shared/validation'

type HandlerForms = (value: Record<string, string>) => void

export const RegPage = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [password, setPassword] = useState('')

  const [errorLogin, setErrorLogin] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)

  const [froms, setForms] = useState({
    value: '',
    password: '',
  })

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
    <Box className="reg-page">
      <form
        onSubmit={e => {
          e.preventDefault()
          handlerForms({ login: value, password: password })
        }}>
        <Grid direction="column" display="flex" gap="1em">
          <Typography variant="h3" align="center">
            Registration
          </Typography>
          <TextField label="Name" name="first_name" type="text" size="small" />
          <TextField
            label="Second Name"
            name="second_name"
            type="text"
            size="small"
          />
          <TextField label="Login" name="login" type="text" size="small" />
          <TextField label="Email" name="email" type="email" size="small" />
          <TextField
            label="Password"
            name="password"
            type="password"
            size="small"
          />
          <TextField label="Phone" name="phone" type="phone" size="small" />
          <Button
            variant="contained"
            onClick={() => {
              navigate('/sign-up')
            }}>
            sign up
          </Button>
          <Button
            variant="text"
            onClick={() => {
              navigate('/sign-in')
            }}>
            SIGN IN
          </Button>
        </Grid>
      </form>
    </Box>
  )
}
