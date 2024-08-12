import { Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react'

import {
  LandingAbout,
  LandingBanner,
  LandingFooter,
  LandingGameFlow,
  LandingHeader,
} from './components'
import { loginInOAuth } from 'oauth'

export const LandingPage: FC = () => {
  useEffect(() => {
    loginInOAuth()
  }, [])

  return (
    <Grid
      container
      display={'flex'}
      flexDirection={'column'}
      flexWrap={'nowrap'}
      width={'100%'}
      height={'100%'}>
      <LandingHeader />

      <Grid item overflow={'hidden auto'}>
        <LandingBanner />
        <LandingAbout />
        <LandingGameFlow />
        <LandingFooter />
      </Grid>
    </Grid>
  )
}
