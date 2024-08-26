import { Button, Grid, Link, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router'
import { FC } from 'react'

import { ThemeSwitch } from './components'

export const AppHeader: FC = () => {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()

  return (
    <Grid
      item
      component={'header'}
      display={'flex'}
      width={'100%'}
      gap={spacing(2)}
      padding={spacing(4, 2)}
      borderBottom={1}
      borderColor={palette.divider}>
      <Typography variant={'h4'} fontWeight={600} flexGrow={1}>
        <Link href="/" sx={{ color: 'inherit', textDecoration: 'unset' }}>
          🃏 Black Jack
        </Link>
      </Typography>
      <ThemeSwitch />
      <Button
        variant={'outlined'}
        color={'error'}
        onClick={() => {
          navigate('/start')
        }}>
        PLAY
      </Button>
      <Button
        variant={'text'}
        onClick={() => {
          navigate('/forum')
        }}>
        FORUM
      </Button>
      <Button
        variant={'text'}
        onClick={() => {
          navigate('/leaderboard')
        }}>
        LEADERS
      </Button>
      <Button
        variant={'text'}
        onClick={() => {
          navigate('/settings')
        }}>
        PROFILE
      </Button>
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
