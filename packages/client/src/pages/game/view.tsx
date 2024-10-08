/**
 * Компонент управляет логикой игры, отображает canvas и элементы управления
 * useEffect используется для запуска новой игры при монтировании компонента и для обработки состояния завершения раздачи (не игры)
 * handleHit и handleStand управляют действиями игрока
 * handleNewBet запускает новую раздачу после завершения текущей
 */

import React, { ChangeEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { TRootState } from '../../shared/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  drawPlayerCard,
  playerStand,
  startGame,
  resetGame,
  newGame,
} from '../../shared/store/game/gameSlice'
import CanvasGame from 'features/game/view'
import { calcHand } from 'features/game/utils'
import { Button, TextField, Box } from '@mui/material'
import { FullscreenButton } from 'features/fullscreen'
import { hitSound, betSound } from 'sounds'
import { playMusicSound } from 'utils'
import './style.css'

export const GamePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector((state: TRootState) => state.game)
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
      playMusicSound(hitSound)
      dispatch(drawPlayerCard())
    }
  }

  const onStand = () => {
    if (game.status === 'playing') {
      dispatch(playerStand())
    }
  }

  const onBet = () => {
    playMusicSound(betSound)
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
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Game</title>
        <meta name="description" content="Game" />
      </Helmet>
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
                disabled={game.status === 'playing' || game.playerMoney === 0}
              />
              <Button
                variant="contained"
                onClick={onBet}
                size="large"
                sx={{ m: 1, minWidth: '105px' }}
                disabled={game.status === 'playing' || game.playerMoney === 0}>
                Bet
              </Button>
              <Button
                variant="contained"
                onClick={onHit}
                size="large"
                sx={{ m: 1, minWidth: '105px' }}
                disabled={game.status === 'init'}>
                Hit
              </Button>
              <Button
                variant="contained"
                onClick={onStand}
                size="large"
                sx={{ m: 1, minWidth: '105px' }}
                disabled={game.status === 'init'}>
                Stand
              </Button>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/finish')}
                size="large"
                sx={{ m: 1 }}
                disabled={game.status === 'playing'}>
                Leave table
              </Button>
              <FullscreenButton />
            </Box>
          </Box>
        </div>
      </div>
    </>
  )
}
