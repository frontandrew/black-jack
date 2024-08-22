import React from 'react'
import { Button, Grid } from '@mui/material'
import { oAuth } from '../../../../shared/api/index'

export const ButtonYandex: React.FC = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center">
      <Button variant="outlined" color="error" onClick={oAuth}>
        Log in with Yandex
      </Button>
    </Grid>
  )
}
