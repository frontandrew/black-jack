import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Box, Button, Typography } from '@mui/material'
import { AppHeader } from 'features/app-header'

import './style.css'

export const StartPage: React.FC = () => {
  const navigate = useNavigate()
  const handleStart = () => navigate('/game')

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Start game</title>
        <meta name="description" content="Start game" />
      </Helmet>
      <AppHeader />
      <Box className="start">
        <Typography variant="h3">Welcome to Black Jack</Typography>
        <Button
          variant="contained"
          onClick={handleStart}
          size="large"
          sx={{ margin: 3 }}>
          Play
        </Button>
      </Box>
    </>
  )
}
