import { Box, Button, Grid, Typography } from '@mui/material'
import './style.css'
import { useNavigate } from 'react-router'

export const RegPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="reg-page">
      <Typography variant="h3">Registration Page</Typography>
      <Grid direction="column" display="flex" gap="1em">
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
    </Box>
  )
}
