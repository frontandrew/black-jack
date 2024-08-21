import { Helmet } from 'react-helmet'
import { Grid } from '@mui/material'
import { AppHeader } from 'components'

import {
  LandingAbout,
  LandingBanner,
  LandingFooter,
  LandingGameFlow,
} from './components'

export const LandingPage: React.FC = () => {
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
