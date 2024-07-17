import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Box,
} from '@mui/material'
import { AddTopicModal } from 'pages'
import { LandingHeader } from '../landing/components'

export const ForumPage: FC = () => {
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false)
  const topics = useSelector((state: RootState) => state.topics.topics)

  return (
    <>
      <LandingHeader />
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}>
            {topics.length === 0 ? (
              <Typography variant="h5">No topic has been created</Typography>
            ) : (
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Topics:
              </Typography>
            )}
            <Button
              onClick={() => setModalOpen(true)}
              variant="contained"
              color="primary"
              sx={{ minWidth: '180px', height: 'fit-content' }}>
              New Topic
            </Button>
          </Box>
          <List sx={{ p: 0 }}>
            {topics.map(topic => (
              <ListItem
                button
                key={topic.id}
                onClick={() => navigate(`/forum/${topic.id}`)}
                sx={{ minHeight: '58px', py: 1, my: 2, border: '1px dashed' }}>
                <ListItemText primary={topic.title} />
              </ListItem>
            ))}
          </List>
        </Box>
        <AddTopicModal open={isModalOpen} onClose={() => setModalOpen(false)} />
      </Container>
    </>
  )
}
