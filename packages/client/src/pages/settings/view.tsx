import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'

import type { FC } from 'react'

import { SomeAvatar } from 'images'
import { FormUser } from './components'
import './style.css'

export const SettingsPage: FC = () => {
  const { palette, spacing } = useTheme()

  return (
    <Grid
      container
      overflow={'hidden auto'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}>
      <Box className={'settings-content'} maxWidth={1080} padding={spacing(4)}>
        <Grid item padding={spacing(4, 8)} minWidth={400}>
          <Grid
            className={'settings-user-card'}
            container
            width={'100%'}
            height={'100%'}
            flexDirection={'column'}
            alignItems={'center'}
            gap={spacing(6)}>
            <Avatar src={SomeAvatar} sx={{ width: 200, height: 200 }} />
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Typography variant={'h4'} fontWeight={800}>
                Nickname
              </Typography>
              <Typography variant={'overline'} color={'GrayText'}>
                Firstname Secondname
              </Typography>
            </Grid>
            <Grid
              container
              flexDirection={'column'}
              alignItems={'center'}
              gap={spacing(6)}
              flexGrow={1}>
              <Grid container flexDirection={'column'} alignItems={'center'}>
                <Grid container justifyContent={'space-between'}>
                  <Typography variant={'h5'}>PLAYED GAMES:</Typography>
                  <Typography
                    variant={'h5'}
                    fontWeight={600}
                    sx={{ color: palette.primary.light }}>
                    145
                  </Typography>
                </Grid>

                <Grid container justifyContent={'space-between'}>
                  <Typography variant={'h5'}>MAX CASH:</Typography>
                  <Typography
                    variant={'h5'}
                    fontWeight={600}
                    sx={{ color: palette.success.light }}>
                    $ 23423
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              className={'settings-user-card__actions'}
              width={'max-content'}
              alignItems={'flex-end'}
              justifyContent={'space-between'}
              gap={spacing(2)}>
              <Button variant={'outlined'}>change avatar</Button>
              <Button variant={'contained'} color={'error'}>
                sign out
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Divider orientation={'vertical'} flexItem />

        <Grid item minWidth={400}>
          <Grid
            className={'settings-user-form'}
            item
            width={'100%'}
            padding={spacing(4, 8)}>
            <FormUser />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
