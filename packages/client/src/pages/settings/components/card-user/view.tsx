import {
  Avatar,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import { useState, type FC } from 'react'
import { SomeAvatar } from 'images'
import { ChangeAvatarModal } from './components'

export const CardUser: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { palette, spacing } = useTheme()
  const isLandscape = useMediaQuery('(min-width:900px)')

  const actionsAlign = isLandscape ? 'center' : 'flex-end'

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Grid
      className={'settings-user-card'}
      container
      width={'100%'}
      height={'100%'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={spacing(6)}>
      <ChangeAvatarModal isOpen={isOpen} handle={handleModal} />
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
        width={'max-content'}
        alignSelf={actionsAlign}
        gap={spacing(2)}>
        <Button variant={'outlined'} onClick={handleModal}>
          change avatar
        </Button>
        <Button variant={'contained'} color={'error'}>
          sign out
        </Button>
      </Grid>
    </Grid>
  )
}
