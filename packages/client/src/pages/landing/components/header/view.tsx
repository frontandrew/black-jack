import { Button, Grid, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router'

export const LandingHeader = () => {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()

  return (
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
  )
}
