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

export const RegPage = () => {
  const { spacing } = useTheme()
  const navigate = useNavigate()

  return (
    <Box className="login-page">
      <Paper elevation={3} square={false}>
        <form>
          <Grid
            direction="column"
            display="flex"
            gap="1.7em"
            padding={spacing(2, 6)}>
            <Typography variant="h3" align="center">
              Register
            </Typography>

            <TextField label="Name" type="text" size="small" />

            <TextField label="Second Name" type="text" size="small" />

            <TextField label="Login" type="text" size="small" />

            <TextField label="Email" type="text" size="small" />

            <TextField label="password" type="password" size="small" />

            <TextField label="Phone" type="text" size="small" />

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
