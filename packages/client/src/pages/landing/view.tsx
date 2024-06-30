import { Button, Grid, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LandBack } from '../../assets/imgs'

// import './style.css';

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
        className={'landing-header'}
        component={'header'}
        display={'flex'}
        alignItems={'center'}
        width={'100%'}
        gap={spacing(2)}
        padding={spacing(2)}
        borderBottom={1}
        borderColor={palette.divider}
        bgcolor={defaultBackgroundColor}>
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

      <Grid
        item
        className={'landing-content'}
        pt={spacing(1)}
        overflow={'hidden auto'}>
        <Grid container className={'banner'} padding={spacing(2)}>
          <Grid
            container
            className={'banner-container'}
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
              <Grid container display={'flex'} flexDirection={'column'}>
                <Typography variant="h1" noWrap>
                  Try your luck
                </Typography>
                <Typography variant="h4" noWrap>
                  in world most popular card game
                </Typography>
              </Grid>
              <Grid container width={'20%'}>
                <Button
                  fullWidth
                  size={'large'}
                  variant="contained"
                  onClick={() => {
                    navigate('/sign-up')
                  }}>
                  <Typography variant="h6" noWrap>
                    PUSH TO WIN
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid className={'timeline'}>
          <Grid
            container
            className={'timeline-container'}
            width={'100%'}></Grid>
        </Grid>

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
