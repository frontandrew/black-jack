import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

import './style.css'

export const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="login-page">
      <Typography variant="h3">Login Page</Typography>
      <Grid direction="column" display="flex" gap="1em">
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
    </Box>
  )
}
