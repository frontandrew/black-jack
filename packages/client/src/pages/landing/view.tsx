import { Helmet } from 'react-helmet'
import { Grid } from '@mui/material'
import { AppHeader } from 'features/app-header'

import {
  LandingAbout,
  LandingBanner,
  LandingFooter,
  LandingGameFlow,
} from './components'
import { loginInOAuth } from 'apis'
import { useEffect } from 'react'
import { userService } from 'services'

const loginWithYandex = async () => {
  await loginInOAuth()
  const result = await userService.getUser()
  console.log(result)
}

export const LandingPage: React.FC = () => {
  useEffect(() => {
    loginWithYandex()
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Black Jack</title>
        <meta name="description" content="Landing" />
      </Helmet>
      <Grid
        container
        display={'flex'}
        flexDirection={'column'}
        flexWrap={'nowrap'}
        width={'100%'}
        height={'100%'}>
        <AppHeader />
        <Grid item overflow={'hidden auto'}>
          <LandingBanner />
          <LandingAbout />
          <LandingGameFlow />
          <LandingFooter />
        </Grid>
      </Grid>
    </>
  )
}
