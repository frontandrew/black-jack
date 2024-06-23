import { Box, Button, Typography } from '@mui/material'

import './style.css'
import { useNavigate } from 'react-router-dom'

export const GamePage = () => {
  const navigate = useNavigate()

  return (
    <Box className="game-page">
      <Typography variant="h3">Game Page</Typography>
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
