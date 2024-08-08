import { Box, Button, Typography } from '@mui/material'
import './style.css'

export const TestSSRPage: React.FC = () => {
  return (
    <Box className="test">
      <Typography variant="h3">Welcome to TEST Black Jack</Typography>
      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: 1, marginBottom: 1 }}>
        Play
      </Button>
    </Box>
  )
}
