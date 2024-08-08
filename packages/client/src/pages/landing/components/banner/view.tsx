import { Button, Grid, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
import { LandBack } from 'images/index'
import { LandingSpacer } from '../spacer'

export const LandingBanner: FC = () => {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()

  const defaultBackgroundColor = palette.background.default
  const contrastBackgroundColor = palette.getContrastText(
    defaultBackgroundColor
  )
  const contrastTextColor = palette.getContrastText(contrastBackgroundColor)

  return (
    <Grid container>
      <Grid
        container
        bgcolor={contrastBackgroundColor}
        color={contrastTextColor}
        justifyContent={'center'}
        overflow={'hidden'}
        width={'100%'}
        minWidth={670}>
        <LandingSpacer position={'relative'}>
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
            padding={spacing(10, 8)}>
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
                color={'error'}
                variant={'contained'}
                onClick={() => {
                  navigate('/start')
                }}>
                <Typography variant="h6" noWrap>
                  PUSH TO WIN
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </LandingSpacer>
      </Grid>
    </Grid>
  )
}
