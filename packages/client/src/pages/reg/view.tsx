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
import { FC, useState } from 'react'
import { validators } from '../../shared/validation/index'

type HandlerForms = (value: Record<string, string>) => void

export const RegPage: FC = () => {
  const { spacing } = useTheme()
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [second, setSecond] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [errorLogin, setErrorLogin] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorName, setErrorName] = useState(false)
  const [errorSecond, setErrorSecond] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)

  const [halperLogin, setHalperLogin] = useState('')
  const [halperPassword, setHalperPassword] = useState('')
  const [halperName, setHalperName] = useState('')
  const [halperSecond, setHalperSecond] = useState('')
  const [halperEmail, setHalperEmail] = useState('')
  const [halperPhone, setHalperPhone] = useState('')

  const handlerForms: HandlerForms = value => {
    const loginErrors = validators.login(value.login)
    const passwordErrors = validators.password(value.password)
    const nameErrors = validators.name(value.name)
    const secondErrors = validators.name(value.second)
    const emailErrors = validators.email(value.email)
    const phoneErrors = validators.phone(value.phone)

    if (loginErrors.length > 0) {
      setErrorLogin(true)
      setHalperLogin(loginErrors[0])
    }

    if (nameErrors.length > 0) {
      setErrorName(true)
      setHalperName(nameErrors[0])
    }

    if (secondErrors.length > 0) {
      setErrorSecond(true)
      setHalperSecond(secondErrors[0])
    }

    if (emailErrors.length > 0) {
      setErrorEmail(true)
      setHalperEmail(emailErrors[0])
    }

    if (phoneErrors.length > 0) {
      setErrorPhone(true)
      setHalperPhone(phoneErrors[0])
    }

    if (passwordErrors.length > 0) {
      setErrorPassword(true)
      setHalperPassword(passwordErrors[0])
    }

    if (passwordErrors.length === 0) {
      setHalperPassword('')
      setErrorPassword(false)
    }

    if (nameErrors.length === 0) {
      setErrorName(false)
      setHalperName('')
    }

    if (secondErrors.length === 0) {
      setErrorSecond(false)
      setHalperSecond('')
    }

    if (emailErrors.length === 0) {
      setErrorEmail(false)
      setHalperEmail('')
    }

    if (phoneErrors.length === 0) {
      setErrorPhone(false)
      setHalperPhone('')
    }

    if (loginErrors.length === 0) {
      setHalperLogin('')
      setErrorLogin(false)
    }

    if (
      passwordErrors.length === 0 &&
      loginErrors.length === 0 &&
      nameErrors.length === 0 &&
      secondErrors.length === 0 &&
      emailErrors.length === 0 &&
      phoneErrors.length === 0
    ) {
      console.log(value)
    }
  }
  return (
    <Box className="login-page">
      <Paper elevation={3} square={false}>
        <form
          onSubmit={e => {
            e.preventDefault() // Предотвращаем перезагрузку страницы
            handlerForms({
              login: login,
              password: password,
              email: email,
              name: name,
              second_name: second,
              phone: phone,
            })
          }}>
          <Grid
            direction="column"
            display="flex"
            gap="1em"
            padding={spacing(2, 6)}>
            <Typography variant="h3" align="center" margin={spacing(0.5)}>
              Register
            </Typography>

            <TextField
              error={errorName}
              label="Name"
              type="text"
              size="small"
              sx={{
                height: '50px',
              }}
              helperText={halperName}
              onChange={e => setName(e.target.value)}
              inputProps={{
                onBlur: () => {
                  handlerForms({ name: name })
                },
              }}
            />

            <TextField
              error={errorSecond}
              label="Second Name"
              type="text"
              size="small"
              sx={{
                height: '50px',
              }}
              helperText={halperSecond}
              onChange={e => setSecond(e.target.value)}
              inputProps={{
                onBlur: () => {
                  handlerForms({ second: second })
                },
              }}
            />

            <TextField
              error={errorLogin}
              name="login"
              label="Login"
              type="text"
              size="small"
              sx={{
                height: '50px',
              }}
              helperText={halperLogin}
              onChange={e => setLogin(e.target.value)}
              inputProps={{
                onBlur: () => {
                  handlerForms({ login: login })
                },
              }}
            />

            <TextField
              error={errorEmail}
              label="Email"
              type="text"
              size="small"
              sx={{
                height: '50px',
              }}
              helperText={halperEmail}
              onChange={e => setEmail(e.target.value)}
              inputProps={{
                onBlur: () => {
                  handlerForms({ email: email })
                },
              }}
            />

            <TextField
              error={errorPassword}
              name="password"
              label="password"
              type="password"
              size="small"
              sx={{
                height: '50px',
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

            <TextField
              error={errorPhone}
              label="Phone"
              type="text"
              size="small"
              sx={{
                height: '50px',
              }}
              helperText={halperPhone}
              onChange={e => setPhone(e.target.value)}
              inputProps={{
                onBlur: () => {
                  handlerForms({ phone: phone })
                },
              }}
            />

            <Button type="submit" variant="contained">
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
        </form>
      </Paper>
    </Box>
  )
}
