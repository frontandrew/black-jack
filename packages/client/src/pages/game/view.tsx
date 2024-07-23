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
  const [bet, setBet] = useState(game.playerBet)
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
            flexDirection: 'column',
            my: 1,
          }}>
          {game.status === 'init' && game.playerMoney > 0 && (
            <Box>
              <TextField
                name="bet"
                label="$"
                size="small"
                value={bet}
                type="number"
                onChange={e => getInputBet(e)}
                inputProps={{ maxbet }}
                sx={{ m: 1, maxWidth: '105px' }}
              />
              <Button
                variant="contained"
                onClick={onBet}
                size="large"
                sx={{ m: 1, minWidth: '105px' }}>
                Bet
              </Button>
            </Box>
          )}

          {game.status === 'playing' && (
            <Box>
              <Button
                variant="contained"
                onClick={onHit}
                size="large"
                sx={{ m: 1, minWidth: '105px' }}>
                Hit
              </Button>
              <Button
                variant="contained"
                onClick={onStand}
                size="large"
                sx={{ m: 1, minWidth: '105px' }}>
                Stand
              </Button>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            {game.status === 'init' && game.playerMoney > 0 && (
              <Button
                variant="contained"
                onClick={() => navigate('/finish')}
                size="large"
                sx={{ m: 1 }}>
                Leave table
              </Button>
            )}
            {game.status === 'init' && game.playerMoney <= 0 && (
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
        </Box>
      </div>
    </div>
  )
}
