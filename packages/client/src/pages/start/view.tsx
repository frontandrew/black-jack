import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography, ToggleButton } from '@mui/material'
import { useFullscreen } from 'utils'
import { Fullscreen, FullscreenExit } from '@mui/icons-material'
import './style.css'

export const StartPage: React.FC = () => {
  const navigate = useNavigate()
  const [fullscreenElem, { toggle }] = useFullscreen()

  const onFullscreenChange = () => toggle(document.body)

  const handleStart = () => navigate('/game')

  return (
    <Box className="start">
      <Typography variant="h3">Welcome to Black Jack</Typography>
      <Button
        variant="contained"
        onClick={handleStart}
        size="large"
        sx={{ marginTop: 1, marginBottom: 1 }}>
        Play
      </Button>
      <ToggleButton
        onChange={onFullscreenChange}
        value={Boolean(fullscreenElem)}
        sx={{ marginTop: 1, marginBottom: 1 }}>
        {!fullscreenElem ? <Fullscreen /> : <FullscreenExit />}
      </ToggleButton>
    </Box>
  )
}
