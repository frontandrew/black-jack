import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import './style.css'
import { useNavigate } from 'react-router'

export const RegPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="reg-page">
      <form>
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
