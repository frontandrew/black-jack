import React, { useState, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useParams } from 'react-router-dom'
import { Box, TextField, Button, Typography } from '@mui/material'
import { addComment } from '../../../features/forum/model'

export const TopicPage: FC = () => {
  const [comment, setComment] = useState<string>('')
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const topic = useSelector((state: RootState) =>
    state.topics.topics.find(t => t.id === parseInt(id, 10))
  )

  if (!topic) return <div>Topic not found</div>

  const handleAddComment = () => {
    const newComment = { id: Date.now(), content: comment }
    dispatch(addComment({ topicId: topic.id, comment: newComment }))
    setComment('')
  }

  return (
    <Box>
      <Typography variant="h4">{topic.title}</Typography>
      <Typography variant="body1" paragraph>
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
        <Button onClick={handleAddComment} variant="contained" color="primary">
          Add Comment
        </Button>
      </Box>
      <Box>
        {topic.comments.map(cmt => (
          <Typography key={cmt.id} variant="body2">
            {cmt.content}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}
