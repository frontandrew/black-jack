import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import './style.css'

export const StartPage: React.FC = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/game')
  }

  return (
    <Box className="start">
      <Typography variant="h3">Welcome to Blackjack</Typography>
      <Button
        variant="contained"
        onClick={handleStart}
        size="large"
        sx={{ margin: 3 }}>
        Play
      </Button>
    </Box>
  )
}
