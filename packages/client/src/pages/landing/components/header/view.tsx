import { Button, Grid, Typography, useTheme, Link } from '@mui/material'
import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const LandingHeader: FC = () => {
  const navigate = useNavigate()
  const { spacing, palette } = useTheme()
  const isAuth = true

  const headerContent = () => {
    const location = useLocation()

    if (location.pathname === '/') {
      return (
        <>
          <Typography variant="h4" flexGrow={1} fontWeight={800}>
            <Link href="/" sx={{ color: 'black', textDecoration: 'unset' }}>
              🃏 Black Jack
            </Link>
          </Typography>
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
        </>
      )
    } else if (location.pathname !== '/') {
      return (
        <>
          <Typography variant="h4" flexGrow={1}>
            <Link
              href="/forum"
              sx={{ color: 'black', textDecoration: 'unset' }}>
              ♦️ Black Jack Forum ♣️
            </Link>
          </Typography>
          <Button
            variant={'text'}
            onClick={() => {
              navigate('/')
            }}>
            HOME
          </Button>
        </>
      )
    } else {
      ;<span>Page not found</span>
    }
  }

  return (
    <Grid
      item
      component={'header'}
      display={'flex'}
      alignItems={'center'}
      width={'100%'}
      gap={spacing(2)}
      padding={spacing(2, 5)}
      borderBottom={1}
      borderColor={palette.divider}>
      {headerContent()}

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
