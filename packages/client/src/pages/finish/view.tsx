import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'shared/store/store'
import { Box, Button, Typography } from '@mui/material'
import './style.css'

export const FinishPage: React.FC = () => {
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)

  const handleRestart = () => {
    navigate('/start')
  }

  return (
    <Box className="finish">
      <Typography variant="h3">End Game</Typography>
      <Typography variant="h4" sx={{ my: 3 }}>
        {game.playerMoney > 0
          ? `You won $${game.playerMoney}`
          : 'You have lost all the money'}
      </Typography>
      <Button
        variant="contained"
        onClick={handleRestart}
        size="large"
        sx={{ margin: 3 }}>
        Play again
      </Button>
    </Box>
  )
}
