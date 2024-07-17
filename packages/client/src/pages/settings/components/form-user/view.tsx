import { useTheme, Button, Grid, Divider } from '@mui/material'
import { useForm } from 'react-final-form-hooks'

import { useState } from 'react'
import type { FC } from 'react'

import { FieldText } from 'components'
import type { FormUserType } from './type'
import { login } from '../../../../shared/validation/validators/login/login'
import { email } from '../../../../shared/validation/validators/email/email'
import { name } from '../../../../shared/validation/validators/name/name'
import { phone } from '../../../../shared/validation/validators/phone/phone'

/* TODO: need to use UserType */
type UserType = object

const user: UserType = {
  email: 'some@email.it',
  login: 'Somelogin',
  first_name: 'Firstname',
  second_name: 'Lastname',
  display_name: 'Nickname',
  phone: '+45134543345',
}

const config = {
  validateOnBlur: true,
  onSubmit: (formValues: UserType) => {
    console.table(formValues)
  },
  initialValues: user,
}

export const FormUser: FC<FormUserType> = ({ submit, reset }) => {
  const { spacing } = useTheme()
  const [isEditMode, setEditMode] = useState(false)

  const { form, handleSubmit } = useForm(config)
  const { hasValidationErrors } = form.getState()

  return (
    <Grid
      width={'100%'}
      component={'form'}
      onSubmit={event => {
        handleSubmit(event)
        if (submit) submit()
      }}>
      <Grid container width={'100%'} height={'min-content'} gap={spacing(2)}>
        <FieldText
          form={form}
          name={'email'}
          label={'Email'}
          disabled={!isEditMode}
          validator={email}
          required
        />
        <FieldText
          form={form}
          name={'login'}
          label={'Login'}
          validator={login}
          disabled={!isEditMode}
          required
        />
        <FieldText
          form={form}
          name={'first_name'}
          label={'First name'}
          validator={name}
          disabled={!isEditMode}
          required
        />
        <FieldText
          form={form}
          name={'second_name'}
          label={'Last name'}
          validator={name}
          disabled={!isEditMode}
          required
        />
        <FieldText
          form={form}
          name={'display_name'}
          label={'Nickname'}
          validator={login}
          disabled={!isEditMode}
          required
        />
        <FieldText
          form={form}
          name={'phone'}
          label={'Phone'}
          validator={phone}
          disabled={!isEditMode}
          required
        />
      </Grid>
      <Divider />
      <Grid
        container
        justifyContent={'flex-end'}
        gap={spacing(2)}
        pt={spacing(3)}>
        {isEditMode ? (
          <>
            <Button
              type={'submit'}
              variant={'contained'}
              disabled={hasValidationErrors}>
              SUBMIT
            </Button>
            <Button
              variant={'text'}
              onClick={() => {
                form.reset()
                setEditMode(!isEditMode)
                if (reset) reset()
              }}>
              CANCEL
            </Button>
          </>
        ) : (
          <Button
            variant={'outlined'}
            onClick={() => {
              setEditMode(!isEditMode)
            }}>
            EDIT INFORMATION
          </Button>
        )}
      </Grid>
    </Grid>
  )
}
