import { Button, ButtonGroup, Grid } from '@mui/material'
import { backBlack, backBlue, backRed, twoClubs, twoClubsWhite } from 'images'
import React from 'react'

export const CardCover: React.FC = () => {
  return (
    <Grid direction="row" spacing={2}>
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button name="brown">
          <img src={twoClubs} />
        </Button>
        <Button>
          <img src={twoClubsWhite} />
        </Button>
        <Button>
          <img src={backRed} />
        </Button>
        <Button>
          <img src={backBlack} />
        </Button>
        <Button>
          <img src={backBlue} />
        </Button>
      </ButtonGroup>
    </Grid>
  )
}
