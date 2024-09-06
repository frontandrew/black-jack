import { Helmet } from 'react-helmet'
import { Grid } from '@mui/material'
import { AppHeader } from 'features/app-header'

import {
  LandingAbout,
  LandingBanner,
  LandingFooter,
  LandingGameFlow,
} from './components'
import { HTTPTransport } from 'transport'

const http = new HTTPTransport('https://swapi.dev/api')

export const LandingPage: React.FC = () => {
  const handle = async () => {
    try {
      const result = await http.get('people/2')

      console.log(result)
    } catch (error) {
      console.log('error GET')
    }
  }

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
          <button onClick={handle}>GET</button>

          <LandingBanner />
          <LandingAbout />
          <LandingGameFlow />
          <LandingFooter />
        </Grid>
      </Grid>
    </>
  )
}
