import { Box, Button, Typography } from '@mui/material'

import './style.css'
import { useNavigate } from 'react-router-dom'

export const StartPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="start-page">
      <Typography variant="h3">Start Page</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/sign-in')
        }}>
        SIGN IN
      </Button>
    </Box>
  )
}
