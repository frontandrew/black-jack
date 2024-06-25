import { Box, Button, Typography } from '@mui/material'

import './style.css'
import { useNavigate } from 'react-router-dom'

export const LeaderPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="leader-page">
      <Typography variant="h3">Leaderboard</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate('/sign-in')
        }}>
        SIGN IN
      </Button>
    </Box>
  )
}