import { Grid, Typography, useTheme } from '@mui/material'

export const LandingAbout = () => {
  const { spacing, palette } = useTheme()

  return (
    <Grid item padding={spacing(2)}>
      <Grid
        container
        width={'100%'}
        flexDirection={'row'}
        flexWrap={'nowrap'}
        padding={spacing(2)}
        gap={spacing(4)}
        borderBottom={1}
        borderTop={1}
        borderColor={palette.divider}>
        <Typography color={palette.grey[400]} variant={'h2'}>
          {'\u275D'}
        </Typography>
        <Typography variant={'h4'}>
          Black Jack is a casino banking game. It is the most widely played
          casino banking game in the world. It uses decks of 52 cards and
          descends from a global family of casino banking games known as
          "twenty-one".
        </Typography>
      </Grid>
    </Grid>
  )
}
