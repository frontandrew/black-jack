import { Box, Divider, Grid, useMediaQuery, useTheme } from '@mui/material'

import type { FC } from 'react'

import { CardUser, FormUser } from './components'

export const SettingsPage: FC = () => {
  const { spacing } = useTheme()
  const isLandscape = useMediaQuery('(min-width:900px)')

  const contentDirection = isLandscape ? 'row' : 'column'

  return (
    <Grid
      container
      overflow={'hidden auto'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}>
      <Box
        maxWidth={1080}
        display={'flex'}
        boxSizing={'border-box'}
        flexDirection={contentDirection}
        padding={spacing(4)}>
        <Grid item padding={spacing(4, 2)} minWidth={400}>
          <CardUser />
        </Grid>

        <Divider orientation={'vertical'} flexItem />

        <Grid item padding={spacing(4, 8)}>
          <FormUser />
        </Grid>
      </Box>
    </Grid>
  )
}
