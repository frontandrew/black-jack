/**
 * Компонент управляет логикой игры, отображает canvas и элементы управления
 * useEffect используется для запуска новой игры при монтировании компонента и для обработки состояния завершения раздачи (не игры)
 * handleHit и handleStand управляют действиями игрока
 * handleNewBet запускает новую раздачу после завершения текущей
 */

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

  // Запуск новой игры при монтировании компонента
  useEffect(() => {
    dispatch(startGame())
  }, [dispatch])

  // Обработка состояние завершения раздачи
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

  // Обработка действия "Hit" игрока
  const handleHit = () => {
    if (game.gameStatus === 'playing' && calcHandValue(game.playerHand) < 21) {
      dispatch(drawPlayerCard())
    }
  }

  // Обработка действие "Stand" игрока
  const handleStand = () => {
    // debugger
    if (game.gameStatus === 'playing') {
      dispatch(playerStand())
    }
  }

  // Обработка новой ставки
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
