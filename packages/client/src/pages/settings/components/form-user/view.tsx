import { useTheme, Button } from '@mui/material'
import { useForm } from 'react-final-form-hooks'
import type { FC } from 'react'

import { FieldText } from '../../../../shared/components'

const config = {
  validateOnBlur: true,
  onSubmit: values => {
    console.table(values)
  },
  initialValues: { firstName: 'bbb', lastName: 'rrr' },
}

const validator = (val: string) => {
  console.log(`%c VALID[value: ${val}]:`, 'color: white; background-color: red')
  return val !== 'aaa' ? '' : 'Ivalid value'
}

export const FormUser: FC = () => {
  const { palette, spacing } = useTheme()
  const { form, handleSubmit } = useForm(config)

  // console.log(`FORM:`, { form });

  return (
    <form onSubmit={handleSubmit}>
      <FieldText
        form={form}
        name={'lastName'}
        label={'Last Name'}
        validator={validator}
      />
      <FieldText
        form={form}
        name={'firstName'}
        label={'First Name'}
        validator={validator}
        required
      />
      <Button type={'submit'} disabled={form.getState().hasValidationErrors}>
        SUBMIT
      </Button>
    </form>
  )
}
