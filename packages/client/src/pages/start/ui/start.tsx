import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { newGame } from '../../../features/gameSlice/ui/gameSlice'
import { Box, Button, Typography } from '@mui/material'
import './start.css'

export const StartPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleStart = () => {
    dispatch(newGame())
    navigate('/game')
  }

  return (
    <Box className="start">
      <Typography variant="h3">Добро пожаловать в Blackjack</Typography>
      <Button
        variant="contained"
        onClick={handleStart}
        size="large"
        sx={{ margin: 3 }}>
        Играть
      </Button>
    </Box>
  )
}
