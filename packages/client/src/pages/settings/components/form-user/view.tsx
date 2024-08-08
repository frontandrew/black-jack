import { useTheme, Button, Grid, Divider } from '@mui/material'
import { useForm } from 'react-final-form-hooks'

import React, { useState } from 'react'

import { FieldText } from 'components/field-text'
import type { FormUserType } from './type'
import { validators } from 'validators/index'

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

export const FormUser: React.FC<FormUserType> = ({ submit, reset }) => {
  const { spacing } = useTheme()
  const [isEditMode, setEditMode] = useState(false)

  const { form, handleSubmit } = useForm(config)
  const { hasValidationErrors } = form.getState()

  return (
    <Grid
      width={'400px'}
      component={'form'}
      className="custom-text-error"
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
          validator={validators.email}
          required
        />
        <FieldText
          form={form}
          name={'login'}
          label={'Login'}
          validator={validators.login}
          disabled={!isEditMode}
          required
        />
        <FieldText
          form={form}
          name={'first_name'}
          label={'First name'}
          validator={validators.name}
          disabled={!isEditMode}
          required
        />
        <FieldText
          form={form}
          name={'second_name'}
          label={'Last name'}
          validator={validators.name}
          disabled={!isEditMode}
          required
        />
        <FieldText
          form={form}
          name={'display_name'}
          label={'Nickname'}
          validator={validators.login}
          disabled={!isEditMode}
          required
        />
        <FieldText
          form={form}
          name={'phone'}
          label={'Phone'}
          validator={validators.phone}
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
