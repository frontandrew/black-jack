import { Button, Grid, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { LandBack } from '../../../../assets/imgs'

export const LandingBanner = () => {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()

  const defaultBackgroundColor = palette.background.default
  const contrastBackgroundColor = palette.getContrastText(
    defaultBackgroundColor
  )
  const contrastTextColor = palette.getContrastText(contrastBackgroundColor)

  return (
    <Grid container padding={spacing(2)}>
      <Grid
        container
        bgcolor={contrastBackgroundColor}
        color={contrastTextColor}
        borderRadius={'60px'}
        position={'relative'}
        overflow={'hidden'}
        width={'100%'}>
        <Grid
          item
          display={'flex'}
          alignItems={'center'}
          justifyContent={'flex-end'}
          width={'100%'}
          height={'100%'}
          position={'absolute'}>
          <img height={'200%'} src={LandBack} />
        </Grid>

        <Grid
          item
          display={'flex'}
          flexDirection={'column'}
          gap={spacing(8)}
          width={'100%'}
          padding={spacing(10, 16)}>
          <Grid
            container
            display={'flex'}
            flexDirection={'column'}
            // Костыль для отделения текста от фона
            sx={{ mixBlendMode: 'difference' }}>
            <Typography variant="h1" noWrap>
              Try your luck
            </Typography>
            <Typography variant="h4" noWrap>
              in world most popular card game
            </Typography>
          </Grid>

          <Grid container width={300}>
            <Button
              fullWidth
              size={'large'}
              variant={'contained'}
              onClick={() => {
                navigate('/sign-up')
              }}>
              <Typography variant={'h6'} noWrap>
                PUSH TO WIN
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
