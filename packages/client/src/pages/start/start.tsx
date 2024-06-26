import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { newGame, startGame } from '../../features/game-mechanics/gameSlice'
import './start.css'

export const StartPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleStart = () => {
    dispatch(newGame())
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
