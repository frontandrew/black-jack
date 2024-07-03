import { Box, Button, Typography } from '@mui/material'

import './style.css'
import { useNavigate } from 'react-router-dom'

export const ForumPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="forum-page">
      <Typography variant="h3">Forum Page</Typography>
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
