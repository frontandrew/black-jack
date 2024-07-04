import { useTheme, Button, Grid } from '@mui/material'
import { useForm } from 'react-final-form-hooks'

import type { FC } from 'react'

import { FieldText } from 'components'

/* TODO: need to use UserType */
type UserType = object

const user: Array = {
  email: 'some@email.it',
  login: 'Somelogin',
  first_name: 'First',
  second_name: 'Last',
  display_name: 'Nick',
  phone: '+45134543345',
}

const config = {
  validateOnBlur: true,
  onSubmit: (formValues: UserType) => {
    console.table(formValues)
  },
  initialValues: user,
}

/* TODO: need to use shared/validator */
const validator = (val: string) => {
  console.log(`%c VALID[value: ${val}]:`, 'color: white; background-color: red')
  return val !== 'aaa' ? '' : 'Ivalid value'
}

export const FormUser: FC = () => {
  const { spacing } = useTheme()
  const { form, handleSubmit } = useForm(config)

  return (
    <Grid
      component={'form'}
      width={'100%'}
      height={'min-content'}
      onSubmit={handleSubmit}>
      <FieldText
        form={form}
        name={'email'}
        label={'Email'}
        validator={validator}
        required
      />
      <FieldText
        form={form}
        name={'login'}
        label={'Login'}
        validator={validator}
        required
      />
      <FieldText
        form={form}
        name={'first_name'}
        label={'First name'}
        validator={validator}
        required
      />
      <FieldText
        form={form}
        name={'second_name'}
        label={'Last name'}
        validator={validator}
        required
      />
      <FieldText
        form={form}
        name={'display_name'}
        label={'Nickname'}
        validator={validator}
        required
      />
      <FieldText
        form={form}
        name={'phone'}
        label={'Phone'}
        validator={validator}
        required
      />
      <Grid container justifyContent={'flex-end'} gap={spacing(2)}>
        <Button
          type={'submit'}
          variant={'contained'}
          disabled={form.getState().hasValidationErrors}>
          SUBMIT
        </Button>
        <Button
          variant={'outlined'}
          onClick={() => {
            form.reset()
          }}>
          CANCEL
        </Button>
      </Grid>
    </Grid>
  )
}
