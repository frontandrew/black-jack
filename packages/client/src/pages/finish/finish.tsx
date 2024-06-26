import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './finish.css'

export const FinishPage: React.FC = () => {
  const navigate = useNavigate()

  const handleRestart = () => {
    navigate('/start')
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
