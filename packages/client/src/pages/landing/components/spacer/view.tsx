import { Grid, useTheme } from '@mui/material'
import type { GridProps } from '@mui/material'

export const LandingSpacer: React.FC<GridProps> = ({ children, ...rest }) => {
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
