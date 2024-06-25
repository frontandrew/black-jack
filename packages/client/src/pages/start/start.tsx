import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './start.css'

export const StartPage: React.FC = () => {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/game')
  }

  return (
    <Box className="start-page">
      <Typography variant="h3">Добро пожаловать в Blackjack</Typography>
      <Button variant="contained" onClick={handleStart}>
        Играть
      </Button>
    </Box>
  )
}
