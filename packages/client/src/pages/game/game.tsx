import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import {
  drawPlayerCard,
  playerStand,
  startGame,
  updatePlayerMoney,
} from '../../features/game-mechanics/gameSlice'
import CanvasGame from '../../features/game-mechanics/canvasGame'
import GameControls from '../../features/game-mechanics/gameControls'
import { useNavigate } from 'react-router-dom'
import './game.css'

export const GamePage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const game = useSelector((state: RootState) => state.game)

  useEffect(() => {
    dispatch(startGame())
  }, [dispatch])

  useEffect(() => {
    if (game.gameStatus === 'gameover') {
      if (game.playerMoney <= 0) {
        navigate('/finish')
      } else {
        if (game.gameResult === 'win') {
          dispatch(updatePlayerMoney(10))
        }
        if (game.gameResult === 'lose') {
          dispatch(updatePlayerMoney(-10))
        }
        dispatch(startGame())
      }
    }
  }, [game.gameStatus, game.gameResult, game.playerMoney, dispatch, navigate])
  const handleHit = () => {
    if (game.gameStatus === 'playing') {
      dispatch(drawPlayerCard())
    }
  }

  const handleStand = () => {
    if (game.gameStatus === 'playing') {
      dispatch(playerStand())
    }
  }

  return (
    <div className="game-page">
      <CanvasGame />
      <GameControls onHit={handleHit} onStand={handleStand} />
    </div>
  )
}
