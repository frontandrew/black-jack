import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  startGame,
  updatePlayerMoney,
} from '../../features/game-mechanics/gameSlice'
import './finish.css'

export const FinishPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRestart = () => {
    dispatch(updatePlayerMoney(100))
    dispatch(startGame())
    navigate('/game')
  }

  return (
    <Box className="finish-page">
      <Typography variant="h3">Конец игры</Typography>
      <Button variant="contained" onClick={handleRestart}>
        Играть снова
      </Button>
    </Box>
  )
}
