import { Button, Grid, Typography } from '@mui/material'

import { useNavigate } from 'react-router-dom'

export const LeaderPage = () => {
  const navigate = useNavigate()

  return (
    <Grid
      container
      width={'100%'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}>
      <Grid
        container
        maxWidth={'1080px'}
        overflow={'auto hidden'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}>
        <Typography variant="h3">Leaderboard</Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate('/sign-in')
          }}>
          SIGN IN
        </Button>
      </Grid>
    </Grid>
  )
}
