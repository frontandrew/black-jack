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
import { FC } from 'react'

import './style.css'

export const LoginPage: FC = () => {
  const { spacing } = useTheme()
  const navigate = useNavigate()

  return (
    <Box className="login-page">
      <Paper elevation={3} square={false}>
        <form>
          <Grid
            direction="column"
            display="flex"
            gap="2em"
            padding={spacing(2, 6)}>
            <Typography variant="h3" align="center" margin={spacing(2)}>
              Login
            </Typography>
            <TextField label="Login" type="text" size="small" />
            <TextField label="password" type="password" size="small" />
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
