import React from 'react'
import { Button } from '@mui/material'

interface GameControlsProps {
  onHit: () => void
  onStand: () => void
}

const GameControls: React.FC<GameControlsProps> = ({ onHit, onStand }) => {
  return (
    <div className="game-controls">
      <Button variant="contained" onClick={onHit}>
        Взять еще карту
      </Button>
      <Button variant="contained" onClick={onStand}>
        Остановиться
      </Button>
    </div>
  )
}

export default GameControls
