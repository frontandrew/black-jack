import { Helmet } from 'react-helmet'
import { Grid } from '@mui/material'

import {
  LandingAbout,
  LandingBanner,
  LandingFooter,
  LandingGameFlow,
  LandingHeader,
} from './components'
import { getUser } from '../../shared/api'
import { useEffect } from 'react'

const checkUser = async () => {
  try {
    const user = await getUser()
  } catch (error) {
    return error
  }
}

export const LandingPage: React.FC = () => {
  useEffect(() => {
    try {
      checkUser()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Landing</title>
        <meta name="description" content="Landing" />
      </Helmet>
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
    </>
  )
}
