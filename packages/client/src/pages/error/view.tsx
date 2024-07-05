import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router'

import './style.css'
import React, { ReactNode } from 'react'

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate()
  const error: any = useRouteError()

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
          navigate(-2)
        }}>
        BACK
      </Button>
    </Box>
  )
}

type Props = {
  children: ReactNode
}
type State = {
  hasError: boolean
  error: any
}
