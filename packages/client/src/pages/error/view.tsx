import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

import './style.css'

export const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <Box className="error-page">
      <Typography variant="h3">Oops!!</Typography>
      <Typography variant="h5">Something gose wrong...</Typography>
      <Typography variant="body2">Try to reload or comeback later.</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate(-1)
        }}>
        BACK
      </Button>
    </Box>
  )
}
