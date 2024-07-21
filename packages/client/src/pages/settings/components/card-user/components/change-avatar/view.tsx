import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  TextField,
  useTheme,
} from '@mui/material'
import { PropsChange } from './type'

export const ChangeAvatarModal: React.FC<PropsChange> = props => {
  const { isOpen, handle } = props

  const { spacing } = useTheme()

  return (
    <Dialog
      open={isOpen}
      onClose={handle}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault()
          console.log('file')
        },
      }}>
      <Grid
        container
        flexDirection={'column'}
        alignItems={'center'}
        padding={spacing(3, 4)}
        gap={4}>
        <DialogTitle>Change Avatar</DialogTitle>
        <TextField
          name={'file'}
          type={'file'}
          helperText={'Upload only JPEG or PNG images'}
          required
        />
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button type={'submit'} variant={'contained'}>
            upload
          </Button>
        </DialogActions>
      </Grid>
    </Dialog>
  )
}
