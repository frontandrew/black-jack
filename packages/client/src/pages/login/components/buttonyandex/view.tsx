import React from 'react'
import { Button, Grid } from '@mui/material'

export const ButtonYandex: React.FC = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center">
      <Button variant="outlined" color="error">
        Log in with Yandex
      </Button>
    </Grid>
  )
}
