import { colors, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { LightMode, DarkMode } from '@mui/icons-material'
import { FC, MouseEvent, useState } from 'react'

export const ThemeSwitch: FC = () => {
  const { amber, blue } = colors
  const [theme, setTheme] = useState('light')

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    currentTheme: string | null
  ) => {
    if (currentTheme !== null) setTheme(currentTheme)
  }

  const lightColor = theme === 'light' ? amber[300] : ''
  const darkColor = theme === 'dark' ? blue[300] : ''

  return (
    <ToggleButtonGroup
      size={'small'}
      value={theme}
      onChange={handleChange}
      exclusive={true}>
      <ToggleButton value="light" key="light">
        <LightMode htmlColor={lightColor} />
      </ToggleButton>
      <ToggleButton value="dark" key="dark">
        <DarkMode htmlColor={darkColor} />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
