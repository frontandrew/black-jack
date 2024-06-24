import { Box, Button, Typography } from '@mui/material'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router'

import './style.css'

export const ErrorPage = () => {
  const navigate = useNavigate()
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <Box className="error-page">
        <Typography variant="h1">{error.status}</Typography>
        <Typography variant="body2" mb={4}>
          {error.message || 'Something goes wrong!'}
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

  throw error
}
