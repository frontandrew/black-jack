import React, { useState } from 'react'
import { useDispatch } from '../../../shared/store/store'
import { useForm } from 'react-final-form-hooks'
import {
  Modal,
  Box,
  Button,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material'
import { FieldText } from 'components'
import { createTopic } from '../../../shared/store/forum/topicsSlice'
import { Topic } from '../../../shared/api'

interface AddTopicModalProps {
  open: boolean
  onClose: () => void
}

type NewTopic = Omit<Topic, 'id' | 'comments'>

const initialValues: Partial<NewTopic> = {
  title: '',
  content: '',
}

export const AddTopicModal: React.FC<AddTopicModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: Partial<NewTopic>) => {
    setIsSubmitting(true)
    try {
      const topicWithUser = {
        ...values,
        userId: 'test-user-id',
        userName: 'Test User',
        userEmail: 'testuser@test.com',
      } as NewTopic
      await dispatch(createTopic(topicWithUser))
      form.reset()
      onClose()
    } catch (error) {
      console.error('Failed to create topic:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const { form, handleSubmit } = useForm({ onSubmit, initialValues })

  return (
    <Modal open={open} onClose={onClose}>
      <Grid component="form" onSubmit={handleSubmit}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Add new topic
          </Typography>
          <FieldText
            form={form}
            name="title"
            label="Topic title"
            fullWidth
            margin="normal"
          />
          <FieldText
            form={form}
            name="content"
            label="Topic content"
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} /> : 'Create Topic'}
            </Button>
          </Box>
        </Box>
      </Grid>
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
