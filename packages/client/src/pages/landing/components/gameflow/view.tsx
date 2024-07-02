import { Grid, Typography, useTheme } from '@mui/material'
import { FC } from 'react'

import {
  EmojiEvents,
  Forum,
  Style,
  SupervisedUserCircle,
} from '@mui/icons-material'

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from '@mui/lab'
import { LandingSpacer } from '../spacer'

export const LandingGameFlow: FC = () => {
  const { spacing } = useTheme()
  const CustomTLC: FC = () => <TimelineConnector style={{ height: 70 }} />

  return (
    <Grid container justifyContent={'center'}>
      <LandingSpacer pr={spacing(40)}>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={'warning'}>
                <Style sx={{ transform: 'rotate(180deg)' }} />
              </TimelineDot>
              <CustomTLC />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" component="span">
                Play
              </Typography>
              <Typography>Show your skills on the board</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={'success'}>
                <EmojiEvents />
              </TimelineDot>
              <CustomTLC />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" component="span">
                Win
              </Typography>
              <Typography>Use strategies to gain high score</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={'info'}>
                <SupervisedUserCircle />
              </TimelineDot>
              <CustomTLC />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" component="span">
                Compete
              </Typography>
              <Typography>
                Match your progress with other players on the Leaderbord
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={'secondary'}>
                <Forum />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="h6" component="span">
                Study
              </Typography>
              <Typography>
                Discuss game tactics and strategies on the Forum
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </LandingSpacer>
    </Grid>
  )
}
