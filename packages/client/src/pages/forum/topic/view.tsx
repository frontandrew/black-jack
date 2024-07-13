import React, { useState, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, TextField, Button, Typography, Container } from '@mui/material'
import { addComment } from '../../../features/forum/model'

export const TopicPage: FC = () => {
  const [comment, setComment] = useState<string>('')
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const topic = useSelector((state: RootState) =>
    state.topics.topics.find(t => t.id === parseInt(id, 10))
  )
  const navigate = useNavigate()

  if (!topic)
    return (
      <Container maxWidth="md" className="mt-5 text-center">
        <Box>
          <Typography variant="h4">Topic not found</Typography>
          <Button
            onClick={() => navigate('/forum')}
            variant="contained"
            color="primary"
            className="mt-5">
            Go to forum
          </Button>
        </Box>
      </Container>
    )

  const handleAddComment = () => {
    if (!comment.length) return
    const newComment = { id: Date.now(), content: comment }
    dispatch(addComment({ topicId: topic.id, comment: newComment }))
    setComment('')
  }

  return (
    <Container maxWidth="md" className="mt-5">
      <Box>
        <div className="flex justify-between mb-5">
          <Typography variant="h4">{topic.title}</Typography>
          <Button
            onClick={() => navigate('/forum')}
            variant="contained"
            color="primary">
            Back to forum
          </Button>
        </div>
        <Typography paragraph className="mt-5">
          {topic.content}
        </Typography>
        <Box>
          <TextField
            label="Add a comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleAddComment}
            variant="contained"
            color="primary">
            Add Comment
          </Button>
        </Box>
        <Box>
          {topic.comments.length > 0 && (
            <div className="mt-4">User comments:</div>
          )}
          {topic.comments.map((cmt, index) => (
            <Typography key={cmt.id} className="mt-2 ml-4">
              {++index}: {cmt.content}
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
