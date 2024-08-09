import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import './style.css'
import { CardCover } from 'features/card-cover/index'

export const StartPage: React.FC = () => {
  const navigate = useNavigate()
  const handleStart = () => navigate('/game')

  return (
    <Box className="start" sx={{ color: 'white' }}>
      <Typography variant="h3">Welcome to Black Jack</Typography>
      <Typography variant="h4">Choice Style Game</Typography>
      <CardCover />
      <Button
        variant="contained"
        onClick={handleStart}
        size="large"
        sx={{ marginTop: 1, marginBottom: 1 }}>
        Play
      </Button>
    </Box>
  )
}
