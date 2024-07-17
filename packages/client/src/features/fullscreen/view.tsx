import React from 'react'
import { useFullscreen } from 'utils'
import { Fullscreen, FullscreenExit } from '@mui/icons-material'
import { ToggleButton } from '@mui/material'

export const FullscreenButton: React.FC = () => {
  const [fullscreenElem, { toggle }] = useFullscreen()
  const onFullscreenChange = () => toggle(document.body)

  return (
    <ToggleButton
      onChange={onFullscreenChange}
      value={Boolean(fullscreenElem)}
      sx={{ margin: 1 }}>
      {!fullscreenElem ? <Fullscreen /> : <FullscreenExit />}
    </ToggleButton>
  )
}
