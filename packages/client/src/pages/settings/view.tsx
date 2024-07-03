import {
  Grid,
  TextField,
  Typography,
  useTheme,
  FormControl,
  useFormControl,
  Button,
} from '@mui/material'
import { useField, useForm } from 'react-final-form-hooks'
import { useNavigate } from 'react-router-dom'

import type { FC } from 'react'
import { FormUser } from './components'

export const SettingsPage: FC = () => {
  // const navigate = useNavigate()
  const { palette, spacing } = useTheme()

  return (
    <Grid container width={'100%'} height={'100%'} gap={spacing(2)}>
      <FormUser />
    </Grid>
  )
}
