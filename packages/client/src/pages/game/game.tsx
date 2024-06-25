import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import {
  drawPlayerCard,
  playerStand,
  startGame,
  updatePlayerMoney,
  resetGameMessage,
} from '../../features/game-mechanics/gameSlice'
import CanvasGame from '../../features/game-mechanics/canvasGame'
import GameControls from '../../features/game-mechanics/gameControls'
import { useNavigate } from 'react-router-dom'
import { calcHandValue } from '../../shared/utils/cardUtils'
import { Button, Typography } from '@mui/material'
import './game.css'

export const GamePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    dispatch(startGame())
  }, [dispatch])

  useEffect(() => {
    if (game.gameStatus === 'gameover') {
      setShowResult(true)
      if (game.gameResult === 'win') {
        dispatch(updatePlayerMoney(10))
      }
      if (game.gameResult === 'lose') {
        dispatch(updatePlayerMoney(-10))
      }
      dispatch(resetGameMessage())
    }
  }, [game.gameStatus, game.gameResult, game.playerMoney, dispatch, navigate])

  const handleHit = () => {
    if (game.gameStatus === 'playing' && calcHandValue(game.playerHand) < 21) {
      dispatch(drawPlayerCard())
    }
  }

  const handleStand = () => {
    // debugger
    if (game.gameStatus === 'playing') {
      dispatch(playerStand())
    }
  }

  const handleNewBet = () => {
    setShowResult(false)
    dispatch(resetGameMessage())
    dispatch(startGame())
  }

  return (
    <div className="game-page">
      {showResult && (
        <div className="game-page__message">
          <Typography variant="h5">
            {game.gameResult === 'win' ? 'Вы выиграли!' : 'Вы проиграли!'}
          </Typography>
          {game.playerMoney > 0 ? (
            <Button variant="contained" onClick={handleNewBet}>
              Сделать ставку
            </Button>
          ) : (
            <Button variant="contained" onClick={() => navigate('/finish')}>
              Вы проиграли
            </Button>
          )}
        </div>
      )}
      <CanvasGame />
      {!showResult && <GameControls onHit={handleHit} onStand={handleStand} />}
    </div>
  )
}
