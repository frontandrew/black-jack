import { Grid, useTheme } from '@mui/material'

import { LeaderItem } from './components'

export const LeaderPage = () => {
  const { spacing } = useTheme()

  return (
    <Grid
      container
      width={'100%'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}>
      {/* TODO: place for app header nav */}
      <Grid
        container
        width={'100%'}
        height={'100%'}
        justifyContent={'center'}
        overflow={'hidden auto'}
        alignItems={'center'}>
        <Grid
          container
          padding={spacing(4, 0)}
          maxWidth={'1080px'}
          justifyContent={'center'}
          alignItems={'center'}>
          {renderLeaders()}
        </Grid>
      </Grid>
    </Grid>
  )
}

const leaders = [
  { id: 1, games: 145, cash: -1342 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 0, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
  { id: 1, games: 145, cash: 3146 },
]

function renderLeaders() {
  return leaders.map(lead => {
    const { id, cash, games } = lead

    if (id) return <LeaderItem {...lead} />
  })
}
