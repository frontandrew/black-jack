import { Box, Button, Typography } from '@mui/material'

import './style.css'
import { useNavigate } from 'react-router-dom'

export const FinishPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="finish-page">
      <Typography variant="h3">Finish Page</Typography>
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
