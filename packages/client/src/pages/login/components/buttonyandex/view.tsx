import { Button, Grid } from '@mui/material'
import { oAuth } from 'apis'
import React from 'react'

export const ButtonYandex: React.FC = () => {
  const handleYandexOAuth = async () => {
    oAuth()
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center">
      <Button onClick={handleYandexOAuth} variant="outlined" color="error">
        Log in with Yandex
      </Button>
    </Grid>
  )
}
