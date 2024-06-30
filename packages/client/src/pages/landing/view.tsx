import { Button, Grid, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { LandingBanner, LandingGameFlow, LandingAbout } from './components'

export const LandingPage = () => {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()

  const defaultBackgroundColor = palette.background.default
  const contrastBackgroundColor = palette.getContrastText(
    defaultBackgroundColor
  )
  const contrastTextColor = palette.getContrastText(contrastBackgroundColor)

  return (
    <Grid
      container
      className={'landing'}
      display={'flex'}
      flexDirection={'column'}
      flexWrap={'nowrap'}
      width={'100%'}
      height={'100%'}
      bgcolor={defaultBackgroundColor}>
      <Grid
        item
        component={'header'}
        display={'flex'}
        alignItems={'center'}
        width={'100%'}
        gap={spacing(2)}
        padding={spacing(2)}
        borderBottom={1}
        borderColor={palette.divider}>
        <Typography variant="h4" flexGrow={1}>
          Black Jack
        </Typography>
        <Button
          variant={'text'}
          onClick={() => {
            navigate('/sign-in')
          }}>
          SIGN IN
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate('/sign-up')
          }}>
          SIGN UP
        </Button>
      </Grid>

      <Grid item overflow={'hidden auto'}>
        <LandingBanner />
        <LandingAbout />
        <LandingGameFlow />

        <Grid
          item
          component={'footer'}
          border={1}
          borderColor={palette.divider}
          width={'100%'}
          padding={spacing(2, 4)}
          bgcolor={palette.grey[800]}
          color={palette.getContrastText(palette.grey[800])}>
          <Typography variant="body1">Copyright @2024</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
