import { Box, Button, Typography } from '@mui/material'

import './style.css'
import { useNavigate } from 'react-router-dom'

export const SettingsPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="settings-page">
      <Typography variant="h3">Settings(profile) Page</Typography>
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
