import React, { useEffect, useState } from 'react'
import {
  useDispatch,
  useSelector,
  TRootState,
} from '../../../shared/store/store'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Typography,
  Button,
  Container,
  Box,
  CircularProgress,
  TextField,
} from '@mui/material'
import { AppHeader } from 'features/app-header'
import { EmojiChoice } from '../emoji'
import {
  fetchTopic,
  addComment,
  deleteTopic,
  deleteComment,
} from '../../../shared/store/forum/topicsSlice'
import { Comment } from '../../../shared/api'

export const TopicPage: React.FC = () => {
  const [comment, setComment] = useState('')
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentTopic, loading, error } = useSelector(
    (state: TRootState) => state.topics
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchTopic(parseInt(id, 10)))
    }
  }, [dispatch, id])

  const sortedComments = currentTopic
    ? [...currentTopic.comments].sort((a, b) => b.id - a.id)
    : []

  const handleAddComment = async () => {
    if (!comment.length || !currentTopic) return
    try {
      const newComment: Omit<Comment, 'id'> = {
        content: comment,
        topicId: currentTopic.id,
        userId: 'test-user-id',
        userName: 'Test User',
        userEmail: 'testuser@test.com',
      }
      await dispatch(addComment(newComment))
      setComment('')
      dispatch(fetchTopic(currentTopic.id))
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleDeleteTopic = async () => {
    if (currentTopic) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete the topic?'
      )
      if (isConfirmed) {
        try {
          await dispatch(deleteTopic(currentTopic.id))
          navigate('/forum')
        } catch (error) {
          console.error('Failed to delete topic:', error)
        }
      }
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (currentTopic) {
      const isConfirmed = window.confirm(
        'Are you sure you want to delete the comment?'
      )
      if (isConfirmed) {
        try {
          await dispatch(deleteComment({ topicId: currentTopic.id, commentId }))
          dispatch(fetchTopic(currentTopic.id))
        } catch (error) {
          console.error('Failed to delete comment:', error)
        }
      }
    }
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    )
  }

  if (!currentTopic) {
    return (
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Typography>Topic not found</Typography>
      </Container>
    )
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{currentTopic.title}</title>
        <meta name="description" content={currentTopic.content} />
      </Helmet>
      <AppHeader />
      <Container maxWidth="md" sx={{ my: 5, overflow: 'auto' }}>
        <Button
          onClick={() => navigate('/forum')}
          variant="contained"
          color="primary"
          sx={{ minWidth: '180px', height: 'fit-content' }}>
          Back to forum
        </Button>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 2,
          }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {currentTopic.title}
          </Typography>
          <Button
            onClick={handleDeleteTopic}
            variant="contained"
            color="error"
            sx={{ minWidth: '180px', height: 'fit-content' }}>
            Delete Topic
          </Button>
        </Box>
        <Typography sx={{ py: 2, pl: 2, border: '1px dashed' }}>
          {currentTopic.content}
        </Typography>
        <EmojiChoice />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 3,
          }}>
          <TextField
            label="Add a comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            size="small"
            fullWidth
            sx={{ mr: 1 }}
          />
          <Button
            onClick={handleAddComment}
            variant="contained"
            color="primary"
            sx={{ minWidth: '180px', height: 'fit-content' }}>
            Add Comment
          </Button>
        </Box>
        <Box>
          {sortedComments.length > 0 && (
            <Typography variant="h6">User comments:</Typography>
          )}
          {sortedComments.map(cmt => (
            <Box key={cmt.id}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Typography sx={{ pt: 1, pl: 2 }}>{cmt.content}</Typography>
                <Button
                  onClick={() => handleDeleteComment(cmt.id)}
                  variant="contained"
                  color="error"
                  size="small">
                  Delete
                </Button>
              </Box>
              <EmojiChoice />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  )
}
