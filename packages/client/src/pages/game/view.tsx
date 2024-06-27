/**
 * Компонент управляет логикой игры, отображает canvas и элементы управления
 * useEffect используется для запуска новой игры при монтировании компонента и для обработки состояния завершения раздачи (не игры)
 * handleHit и handleStand управляют действиями игрока
 * handleNewBet запускает новую раздачу после завершения текущей
 */

import React, { useEffect, useState } from 'react'
import { RootState } from '../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  drawPlayerCard,
  playerStand,
  startGame,
  updatePlayerMoney,
  resetGame,
  newGame,
} from '../../features/game/model'
import CanvasGame from '../../features/game/view'
import { calcHand } from '../../features/game/utils'
import { Button, Typography } from '@mui/material'
import './style.css'

export const GamePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    dispatch(newGame())
  }, [dispatch])

  // Обработка состояние завершения раздачи
  useEffect(() => {
    if (game.status === 'gameover') {
      setShowResult(true)
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
    setShowResult(false)
    dispatch(resetGame())
    dispatch(startGame())
    dispatch(updatePlayerMoney(-10))
  }

  return (
    <div className="game">
      <div className="game__message">
        {showResult && (
          <div className="game-page__message">
            <Typography variant="h5">
              {game.result === 'win' && 'Вы выиграли!'}
              {game.result === 'lose' && 'Вы проиграли!'}
              {game.result === 'tie' && 'Ничья!'}
            </Typography>
          </div>
        )}
      </div>

      <CanvasGame />

      <div className="game__controls">
        {game.playerMoney > 0 && game.status === 'init' && (
          <Button
            variant="contained"
            onClick={handleBet}
            size="large"
            sx={{ margin: 1 }}>
            Сделать ставку -10$
          </Button>
        )}

        {game.status === 'playing' && (
          <>
            <Button
              variant="contained"
              onClick={handleHit}
              size="large"
              sx={{ margin: 1 }}>
              Взять еще карту
            </Button>
            <Button
              variant="contained"
              onClick={handleStand}
              size="large"
              sx={{ margin: 1 }}>
              Остановиться
            </Button>
          </>
        )}

        {game.playerMoney <= 0 && game.status === 'init' && (
          <Button
            variant="contained"
            onClick={() => navigate('/finish')}
            size="large"
            sx={{ margin: 1 }}>
            У вас закончились деньги :(
          </Button>
        )}
      </div>
    </div>
  )
}
