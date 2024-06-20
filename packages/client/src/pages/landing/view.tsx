import { Box, Button, Typography } from '@mui/material'

import './style.css'

export const LandingPage = () => {
  return (
    <Box className="landing-page">
      <Typography variant="h1">Landing Page</Typography>
      <Button variant="contained">SIGN IN</Button>
    </Box>
  )
}
