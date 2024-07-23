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
  const [bet, setBet] = useState(1)
  const maxbet = game.playerMoney

  useEffect(() => {
    dispatch(newGame())
  }, [dispatch])

  // Обработка состояние завершения раздачи
  useEffect(() => {
    if (bet > game.playerMoney) {
      setBet(maxbet)
    }
    if (game.status === 'gameover') {
      dispatch(resetGame())
    }
  }, [game.status, dispatch, navigate])

  const onHit = () => {
    if (game.status === 'playing' && calcHand(game.playerHand) < 21) {
      dispatch(drawPlayerCard())
    }
  }

  const onStand = () => {
    if (game.status === 'playing') {
      dispatch(playerStand())
    }
  }

  const onBet = () => {
    dispatch(startGame(bet))
  }

  const getInputBet = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = e.target.value
    let betValue = parseInt(inputValue, 10)

    if (isNaN(betValue)) return
    if (inputValue === '') setBet(betValue)

    betValue = Math.max(1, Math.min(maxbet, betValue))
    setBet(betValue)
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
            inputProps={{ maxbet }}
            sx={{ m: 1, maxWidth: '80px' }}
            disabled={
              (game.status !== 'init' && game.playerMoney >= 0) ||
              (game.status !== 'gameover' && game.playerMoney <= 0)
            }
          />
          <Button
            variant="contained"
            onClick={onBet}
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
            onClick={onHit}
            size="large"
            sx={{ m: 1 }}
            disabled={game.status !== 'playing' && game.playerMoney >= 0}>
            Hit
          </Button>
          <Button
            variant="contained"
            onClick={onStand}
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
          <Button
            variant="contained"
            onClick={() => navigate('/finish')}
            size="large"
            sx={{ m: 1 }}
            disabled={
              (game.status !== 'init' && game.playerMoney >= 0) ||
              (game.status !== 'gameover' && game.playerMoney <= 0)
            }>
            Take the money and leave
          </Button>
          <FullscreenButton />
        </Box>

        {game.playerMoney <= 0 && game.status === 'init' && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: 1,
            }}>
            <Button
              variant="contained"
              onClick={() => navigate('/finish')}
              size="large"
              sx={{ m: 1 }}>
              You have lost all the money. Goodbye
            </Button>
          </Box>
        )}
      </div>
    </div>
  )
}
