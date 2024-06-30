import { Grid, Link, SvgIcon, Typography, useTheme } from '@mui/material'
import { GitHub } from '@mui/icons-material'

export const LandingFooter = () => {
  const { spacing, palette } = useTheme()

  const backgroundColor = palette.grey[800]
  const contrastColor = palette.getContrastText(backgroundColor)

  return (
    <Grid
      item
      component={'footer'}
      width={'100%'}
      padding={spacing(2)}
      borderTop={1}
      borderColor={palette.divider}
      bgcolor={backgroundColor}
      color={contrastColor}>
      <Grid
        container
        display={'flex'}
        alignItems={'center'}
        gap={spacing(1)}
        // Костыль для непонятной высоты элемента <a>
        sx={{ '& > a': { height: '1.5em' } }}>
        <Typography variant="body1" flexGrow={1}>
          Copyright {'\u00A9'} 2024
        </Typography>
        <Link
          rel={'noreferer'}
          href={'https://practicum.yandex.ru/'}
          target={'_blank'}
          underline={'none'}>
          <SvgIcon color={'error'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 692 692">
              <path
                fill={contrastColor}
                d="M0 692V0h692v692H0Zm223-192V234h-39v266h39Zm286 0V234h-39v266h39ZM245 213l202-1v-39l-202 1v39Z"
              />
            </svg>
          </SvgIcon>
        </Link>
        <Link
          rel={'noreferer'}
          href={'https://github.com/frontandrew/black-jack'}
          target={'_blank'}
          color={'inherit'}>
          <GitHub />
        </Link>
      </Grid>
    </Grid>
  )
}
