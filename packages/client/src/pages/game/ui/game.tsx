/**
 * Компонент управляет логикой игры, отображает canvas и элементы управления
 * useEffect используется для запуска новой игры при монтировании компонента и для обработки состояния завершения раздачи (не игры)
 * handleHit и handleStand управляют действиями игрока
 * handleNewBet запускает новую раздачу после завершения текущей
 */

import React, { useEffect, useState } from 'react'
import { RootState } from '../../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  drawPlayerCard,
  playerStand,
  startGame,
  updatePlayerMoney,
  resetGame,
} from '../../../features/gameSlice/ui/gameSlice'
import CanvasGame from '../../../features/gameCanvas/ui/gameCanvas'
import { calcHand } from '../../../shared/utils/cardUtils'
import { Button, Typography } from '@mui/material'
import './game.css'

export const GamePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)
  const [showResult, setShowResult] = useState(false)

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
  const handleNewBet = () => {
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
          <Button variant="contained" onClick={handleNewBet}>
            Сделать ставку
          </Button>
        )}

        {game.status === 'playing' && (
          <>
            <Button variant="contained" onClick={handleHit}>
              Взять еще карту
            </Button>
            <Button variant="contained" onClick={handleStand}>
              Остановиться
            </Button>
          </>
        )}

        {game.playerMoney <= 0 && game.status === 'init' && (
          <Button variant="contained" onClick={() => navigate('/finish')}>
            У вас закончились деньги :(
          </Button>
        )}
      </div>
    </div>
  )
}
