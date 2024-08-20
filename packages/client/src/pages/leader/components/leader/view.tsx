import { Helmet } from 'react-helmet'
import { Avatar, Divider, Grid, Typography, useTheme } from '@mui/material'
import { LandBack } from 'images'
import type { LeaderItemProps } from './type'

export const LeaderItem: React.FC<LeaderItemProps> = ({
  id,
  cash,
  games,
  avatar = LandBack,
  nickName = 'unknown',
}) => {
  const { spacing } = useTheme()

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Leader board</title>
        <meta name="description" content="Leader board" />
      </Helmet>
      <Grid key={id} width={'100%'}>
        <Grid
          container
          alignItems={'center'}
          padding={spacing(4, 0)}
          gap={spacing(8)}>
          <Avatar src={avatar} sx={{ width: 80, height: 80 }} />
          <Typography
            variant={'h4'}
            // fontWeight={600}
            flexGrow={1}>
            {nickName}
          </Typography>
          <Typography
            variant={'h4'}
            // fontWeight={600}
          >
            {games}
          </Typography>
          <Typography variant={'h4'} fontWeight={600}>
            $ {cash}
          </Typography>
        </Grid>
        <Divider />
      </Grid>
    </>
  )
}
