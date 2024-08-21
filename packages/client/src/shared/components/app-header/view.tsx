import { Button, Grid, Link, Typography, useTheme } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router'

export const AppHeader: FC = () => {
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
      padding={spacing(4, 2)}
      borderBottom={1}
      borderColor={palette.divider}>
      <Link
        flexGrow={1}
        href="/"
        sx={{ color: 'inherit', textDecoration: 'unset' }}>
        <Typography variant="h4" fontWeight={600}>
          🃏 Black Jack
        </Typography>
      </Link>
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
