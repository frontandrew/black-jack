import React from 'react'
import { Helmet } from 'react-helmet'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate, useRouteError } from 'react-router'
import './style.css'

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError()

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Error</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Box className="error-page">
        <Typography variant="h1">{error.status || 'Opps...'}</Typography>
        <Typography variant="h5">
          {error.statusText || error.message}
        </Typography>
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
    </>
  )
}
