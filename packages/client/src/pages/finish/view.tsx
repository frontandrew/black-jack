import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import './style.css'

export const FinishPage: React.FC = () => {
  const navigate = useNavigate()

  const handleRestart = () => {
    navigate('/start')
  }

  return (
    <Box className="finish">
      <Typography variant="h3">Конец игры</Typography>
      <Button
        variant="contained"
        onClick={handleRestart}
        size="large"
        sx={{ margin: 3 }}>
        Играть снова
      </Button>
    </Box>
  )
}
