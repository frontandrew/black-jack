/**
 * Компонент управляет логикой игры, отображает canvas и элементы управления
 * useEffect используется для запуска новой игры при монтировании компонента и для обработки состояния завершения раздачи (не игры)
 * handleHit и handleStand управляют действиями игрока
 * handleNewBet запускает новую раздачу после завершения текущей
 */

import React, { useEffect, useState } from 'react'
import { RootState } from '../../shared/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  drawPlayerCard,
  playerStand,
  startGame,
  updatePlayerMoney,
  resetGame,
  newGame,
} from 'features/game/model'
import CanvasGame from 'features/game/view'
import { calcHand } from 'features/game/utils'
import { Button, TextField, Box } from '@mui/material'
import { FullscreenButton } from 'features/fullscreen'
import './style.css'

export const GamePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)
  const [bet, setBet] = useState<number>()

  useEffect(() => {
    dispatch(newGame())
  }, [dispatch])

  // Обработка состояние завершения раздачи
  useEffect(() => {
    if (game.status === 'gameover') {
      if (game.result == 'win') {
        dispatch(updatePlayerMoney(20))
      }
      if (game.result == 'tie') {
        dispatch(updatePlayerMoney(10))
      }
      dispatch(resetGame())
    }
  }, [game.status, game.result, game.playerMoney, dispatch, navigate])

  // Обработка действия "Hit" игрока
  const handleHit = () => {
    if (game.status === 'playing' && calcHand(game.playerHand) < 21) {
      dispatch(drawPlayerCard())
    }
  }

  // Обработка действие "Stand" игрока
  const handleStand = () => {
    if (game.status === 'playing') {
      dispatch(playerStand())
    }
  }

  // Обработка новой ставки
  const handleBet = () => {
    dispatch(resetGame())
    dispatch(startGame())
    dispatch(updatePlayerMoney(-10))
  }

  return (
    <div className="game">
      <CanvasGame />

      <div className="game__controls">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 2,
          }}>
          <TextField
            name="bet"
            label="$"
            size="small"
            value={bet}
            sx={{ m: 1, maxWidth: '80px' }}
            disabled={
              (game.status !== 'init' && game.playerMoney >= 0) ||
              (game.status !== 'gameover' && game.playerMoney <= 0)
            }
          />
          <Button
            variant="contained"
            onClick={handleBet}
            size="large"
            sx={{ m: 1 }}
            disabled={
              (game.status !== 'init' && game.playerMoney >= 0) ||
              (game.status !== 'gameover' && game.playerMoney <= 0)
            }>
            Bet
          </Button>

          <Button
            variant="contained"
            onClick={handleHit}
            size="large"
            sx={{ m: 1 }}
            disabled={game.status !== 'playing' && game.playerMoney >= 0}>
            Hit
          </Button>
          <Button
            variant="contained"
            onClick={handleStand}
            size="large"
            sx={{ m: 1 }}
            disabled={game.status !== 'playing' && game.playerMoney >= 0}>
            Stand
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            my: 2,
          }}>
          {game.playerMoney <= 0 && game.status === 'init' && (
            <Button
              variant="contained"
              onClick={() => navigate('/finish')}
              size="large"
              sx={{ m: 1 }}>
              You don't have money to bet
            </Button>
          )}

          <FullscreenButton />
        </Box>
      </div>
    </div>
  )
}
