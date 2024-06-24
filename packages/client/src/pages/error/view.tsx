import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router'

import './style.css'

export const ErrorPage = () => {
  const navigate = useNavigate()
  const error: unknown = useRouteError()

  return (
    <Box className="error-page">
      <Typography variant="h1">{error.status}</Typography>
      <Typography variant="h5">{error.statusText || error.message}</Typography>
      <Typography variant="body2" mb={4}>
        {error.data}
      </Typography>
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
