import { colors, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { FC, MouseEvent } from 'react'

import { TRootState } from 'shared/store/store'
import { Themes, themeSlice } from '../../../../shared/store/theme'

export const ThemeSwitch: FC = () => {
  const dispatch = useDispatch()
  const { actions } = themeSlice
  const { current } = useSelector((state: TRootState) => state.theme)
  const handleThemeChange = (
    event: MouseEvent<HTMLElement>,
    nextTheme: Themes
  ) => {
    dispatch(actions.setTheme(nextTheme))
  }

  const { amber, blue } = colors
  const lightColor = current === 'light' ? amber[300] : ''
  const darkColor = current === 'dark' ? blue[300] : ''

  return (
    <ToggleButtonGroup
      size={'small'}
      value={current}
      onChange={handleThemeChange}
      exclusive={true}>
      <ToggleButton
        disabled={Themes.Light === current}
        value={Themes.Light}
        key={Themes.Light}>
        <LightMode htmlColor={lightColor} />
      </ToggleButton>

      <ToggleButton
        disabled={Themes.Dark === current}
        value={Themes.Dark}
        key={Themes.Dark}>
        <DarkMode htmlColor={darkColor} />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
