import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

import './style.css'

export const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="login-page">
      <form>
        <Grid direction="column" display="flex" gap="1em">
          <Typography variant="h3" align="center">
            Login
          </Typography>
          <TextField label="Login" type="text" size="small" />
          <TextField label="Password" type="password" size="small" />
          <Button
            variant="contained"
            onClick={() => {
              navigate('/sign-in')
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
