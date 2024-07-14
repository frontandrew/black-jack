import { Fullscreen, FullscreenExit } from '@mui/icons-material'
import { Button, Grid, ToggleButton, Typography, useTheme } from '@mui/material'
import { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router'
import { useFullscreen } from 'utils'

export const LandingHeader: FC = () => {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()

  const [element, { toggle }] = useFullscreen()
  const onChange = (event: MouseEvent<HTMLElement>) => {
    toggle(document.body)
  }

  return (
    <Grid
      item
      component={'header'}
      display={'flex'}
      alignItems={'center'}
      width={'100%'}
      gap={spacing(2)}
      padding={spacing(4, 2)}
      borderBottom={1}
      borderColor={palette.divider}>
      <Typography variant="h4" flexGrow={1}>
        Black Jack
      </Typography>
      <ToggleButton onChange={onChange} value={Boolean(element)}>
        {!element ? <Fullscreen /> : <FullscreenExit />}
      </ToggleButton>
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
  )
}
