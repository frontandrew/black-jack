import { useState, FC } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Box, TextField, Button, Typography } from '@mui/material'
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
    dispatch(addTopic(title, content))
    setTitle('')
    setContent('')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Add new topic
        </Typography>
        <TextField
          label="Topic title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Topic content"
          value={content}
          onChange={e => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button
          onClick={handleAdd}
          variant="contained"
          color="primary"
          sx={{ mt: 2, minWidth: '100%' }}>
          Create Topic
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
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
}
