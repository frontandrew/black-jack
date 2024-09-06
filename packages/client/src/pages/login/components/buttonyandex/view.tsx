import React from 'react'
import { Button, Grid } from '@mui/material'
import { oAuth } from 'shared/api'

export const ButtonYandex: React.FC = () => {
  const onAuthYnadex = () => {
    oAuth()
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center">
      <Button variant="outlined" color="error" onClick={onAuthYnadex}>
        Log in with Yandex
      </Button>
    </Grid>
  )
}
