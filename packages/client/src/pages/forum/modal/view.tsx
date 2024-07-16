import React, { useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Box, TextField, Button } from '@mui/material'
import { addTopic } from '../../../features/forum/model'

interface AddTopicModalProps {
  open: boolean
  onClose: () => void
}

export const AddTopicModal: FC<AddTopicModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const dispatch = useDispatch()

  const handleAdd = () => {
    dispatch(addTopic({ id: Date.now(), title, content, comments: [] }))
    setTitle('')
    setContent('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button onClick={handleAdd} variant="contained" color="primary">
          Add Topic
        </Button>
      </Box>
    </Modal>
  )
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
