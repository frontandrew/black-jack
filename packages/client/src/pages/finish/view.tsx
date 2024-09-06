import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { TRootState } from '../../shared/store/store'
import { Box, Button, Typography } from '@mui/material'
import { AppHeader } from 'features/app-header'

import './style.css'

export const FinishPage: React.FC = () => {
  const navigate = useNavigate()
  const game = useSelector((state: TRootState) => state.game)

  const handleRestart = () => {
    navigate('/start')
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>End game</title>
        <meta name="description" content="End game" />
      </Helmet>
      <AppHeader />
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
    </>
  )
}
