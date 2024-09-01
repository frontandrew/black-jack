import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { TRootState } from '../../../shared/store/store'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, Button, Typography, Container } from '@mui/material'
import { addComment } from '../../../shared/store/forum/topicsSlice'
import { AppHeader } from 'features/app-header'
import { EmojiChoice } from '../emoji'

export const TopicPage: React.FC = () => {
  const [comment, setComment] = useState('')
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const topic = useSelector((state: TRootState) => {
    if (id) return state.topics.topics.find(t => t.id === id) // ToDo move in createSlice
  })
  const navigate = useNavigate()

  if (!topic)
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Topic</title>
          <meta name="description" content="Topic" />
        </Helmet>
        <AppHeader />
        <Container maxWidth="md" sx={{ my: 5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography variant="h5">Topic not found</Typography>
            <Button
              onClick={() => navigate('/forum')}
              variant="contained"
              color="primary"
              sx={{ minWidth: '180px', height: 'fit-content' }}>
              Back to forum
            </Button>
          </Box>
        </Container>
      </>
    )

  const handleAddComment = () => {
    if (!comment.length) return
    const newComment = { id: Date.now(), content: comment }
    dispatch(addComment({ topicId: topic.id, comment: newComment }))
    setComment('')
  }

  return (
    <>
      <AppHeader />
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {topic.title}
          </Typography>
          <Button
            onClick={() => navigate('/forum')}
            variant="contained"
            color="primary"
            sx={{ minWidth: '180px', height: 'fit-content' }}>
            Back to forum
          </Button>
        </Box>
        <Typography sx={{ py: 2, pl: 2, mb: 5, border: '1px dashed' }}>
          {topic.content}
        </Typography>
        <EmojiChoice />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
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
          {topic.comments.length > 0 && (
            <Typography variant="h6">User comments:</Typography>
          )}
          {topic.comments.map((cmt, index) => (
            <Box>
              <Typography key={cmt.id} sx={{ pt: 1, pl: 2 }}>
                {index + 1}: {cmt.content}
              </Typography>
              <EmojiChoice />
            </Box>
          ))}
        </Box>
      </Container>
    </>
  )
}
