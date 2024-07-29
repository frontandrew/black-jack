import { Grid } from '@mui/material'
import { FC } from 'react'

import {
  LandingAbout,
  LandingBanner,
  LandingFooter,
  LandingGameFlow,
  LandingHeader,
} from './components'

export const LandingPage: FC = () => {
  return (
    <Grid
      container
      display={'flex'}
      flexDirection={'column'}
      flexWrap={'nowrap'}
      width={'100%'}
      height={'100%'}>
      <LandingHeader />

      <Grid
        container
        overflow={'hidden auto'}
        justifyContent={'space-between'}
        flexGrow={1}>
        <LandingBanner />
        <LandingAbout />
        <LandingGameFlow />
        <LandingFooter />
      </Grid>
    </Grid>
  )
}
