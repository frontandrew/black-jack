import React, { useEffect } from 'react'
import {
  useDispatch,
  useSelector,
  TRootState,
} from '../../../shared/store/store'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Box,
  CircularProgress,
} from '@mui/material'
import { AppHeader } from 'features/app-header'
import { AddTopicModal } from 'pages'
import {
  deleteTopic,
  fetchTopics,
} from '../../../shared/store/forum/topicsSlice'

export const ForumPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isModalOpen, setModalOpen] = React.useState(false)
  const { topics, loading, error } = useSelector(
    (state: TRootState) => state.topics
  )

  useEffect(() => {
    dispatch(fetchTopics())
  }, [dispatch])

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchTopics())
    }
  }, [isModalOpen, dispatch])

  const sortedTopics = [...topics].sort((a, b) => b.id - a.id)

  const handleDeleteTopic = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation()
    const isConfirmed = window.confirm(
      'Are you sure you want to delete the topic?'
    )
    if (isConfirmed) {
      try {
        await dispatch(deleteTopic(id))
        dispatch(fetchTopics())
      } catch (error) {
        console.error('Failed to delete topic:', error)
      }
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forum</title>
        <meta name="description" content="Forum" />
      </Helmet>
      <AppHeader />
      <Container maxWidth="md" sx={{ my: 5, overflow: 'auto' }}>
        {loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
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
              {sortedTopics.map(topic => (
                <ListItem
                  button
                  key={topic.id}
                  onClick={() => navigate(`/forum/${topic.id}`)}
                  sx={{
                    minHeight: '58px',
                    py: 1,
                    my: 2,
                    border: '1px dashed',
                  }}>
                  <ListItemText primary={topic.title} />
                  <Button
                    onClick={event => handleDeleteTopic(topic.id, event)}
                    variant="contained"
                    color="error"
                    size="small">
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <AddTopicModal open={isModalOpen} onClose={() => setModalOpen(false)} />
      </Container>
    </>
  )
}
