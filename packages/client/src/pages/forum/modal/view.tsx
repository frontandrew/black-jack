import { useDispatch } from 'react-redux'
import { useForm } from 'react-final-form-hooks'
import { Modal, Box, Button, Typography, Grid } from '@mui/material'
import { addTopic } from '../../../features/forum/model'
import { FieldText } from 'components'

interface AddTopicModalProps {
  open: boolean
  onClose: () => void
}

type newTopicType = object

const newTopic: newTopicType = {
  title: '',
  content: '',
}

export const AddTopicModal: React.FC<AddTopicModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch()
  const config = {
    // validate: false,
    onSubmit: (values: newTopicType) => {
      //@ts-ignore
      dispatch(addTopic(values.title, values.content))
      form.reset()
      onClose()
    },
    initialValues: newTopic,
  }
  const { form, handleSubmit } = useForm(config)

  return (
    <Modal open={open} onClose={onClose}>
      <Grid
        component={'form'}
        onSubmit={event => {
          handleSubmit(event)
        }}>
        <Box sx={modalStyle}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Add new topic
          </Typography>
          <FieldText
            form={form}
            name={'title'}
            label="Topic title"
            fullWidth
            margin="normal"
          />
          <FieldText
            form={form}
            name={'content'}
            label="Topic content"
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            type={'submit'}
            variant="contained"
            color="primary"
            sx={{ mt: 2, minWidth: '100%' }}>
            Create Topic
          </Button>
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
