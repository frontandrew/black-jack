import { Grid, useTheme } from '@mui/material'

import type { GridProps } from '@mui/material'
import type { FC } from 'react'

export const LandingSpacer: FC<GridProps> = ({ children, ...rest }) => {
  const { breakpoints } = useTheme()

  return (
    <Grid
      container
      maxWidth={breakpoints.values.lg}
      minWidth={breakpoints.values.sm}
      {...rest}>
      {children}
    </Grid>
  )
}
