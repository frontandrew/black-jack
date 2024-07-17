/**
 * Компонент управляет логикой игры, отображает canvas и элементы управления
 * useEffect используется для запуска новой игры при монтировании компонента и для обработки состояния завершения раздачи (не игры)
 * handleHit и handleStand управляют действиями игрока
 * handleNewBet запускает новую раздачу после завершения текущей
 */

import React, { ChangeEvent, useEffect, useState } from 'react'
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
  const minbet = 1
  const maxbet = game.playerMoney
  const [bet, setBet] = useState(minbet)

  useEffect(() => {
    dispatch(newGame())
  }, [dispatch])

  // Обработка состояние завершения раздачи
  useEffect(() => {
    if (game.status === 'gameover') {
      if (game.result == 'blackjack') {
        dispatch(updatePlayerMoney(bet * 2.5)) // Blackjack pays 3:2
      }
      if (game.result == 'win') {
        dispatch(updatePlayerMoney(bet * 2)) // Normal win, 1:1 payout
      }
      if (game.result == 'tie') {
        dispatch(updatePlayerMoney(bet)) // Tie, bet is returned
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
    dispatch(updatePlayerMoney(-bet))
  }

  const getInputBet = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value
    if (inputValue === '') {
      setBet(minbet)
      return
    }

    let value = parseInt(inputValue, 10)
    if (isNaN(value)) return

    value = Math.max(minbet, Math.min(maxbet, value))
    setBet(value)
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
            my: 1,
          }}>
          <TextField
            name="bet"
            label="$"
            size="small"
            value={bet}
            type="number"
            onChange={e => getInputBet(e)}
            inputProps={{ minbet, maxbet }}
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
            my: 1,
          }}>
          {game.playerMoney <= 0 && game.status === 'init' && (
            <Button
              variant="contained"
              onClick={() => navigate('/finish')}
              size="large"
              sx={{ m: 1 }}>
              You have no money. Goodbye
            </Button>
          )}
          <FullscreenButton />
        </Box>
      </div>
    </div>
  )
}
