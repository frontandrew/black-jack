import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { LandBack } from '../../assets/imgs'

import './style.css'

export const LandingPage = () => {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()

  return (
    <Box>
      {/* <Box overflow="auto" height="100%"> */}
      <Grid
        container
        position="sticky"
        borderBottom={1}
        borderColor={palette.grey[300]}
        sx={{
          padding: spacing(2, 4),
        }}>
        <Grid item flexGrow={2}>
          <Typography variant="h4">Black Jack</Typography>
        </Grid>
        <Grid item gap={spacing(2)} alignContent="center" display="flex">
          <Button
            variant="text"
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
      </Grid>

      <Grid container overflow="auto">
        <Grid item>
          <Typography variant="h1">Try your luck</Typography>
          <Typography variant="h4">in world most popular card game</Typography>
        </Grid>
        <Grid item>
          <img height="30%" src={LandBack} />
        </Grid>
      </Grid>
    </Box>
  )
}
