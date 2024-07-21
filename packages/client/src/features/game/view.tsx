/**
 * Компонент для рисования игрового процесса на <canvas>
 * drawGame рисует текущие руки игрока и дилера, а также значения рук и деньги игрока
 * drawCard рисует карту в руке игрока и дилера (в том числе закрытую отдельным цветом)
 */

import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { Card } from './types'
import { calcHand, makeCard } from './utils'
import { backRed } from 'images'
import { CardHand } from './CardHand'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const game = useSelector((state: RootState) => state.game)

  // Перерисовывание игры (canvas) при каждом изменении состояния игры
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        drawGame(ctx, game.playerHand, game.dealerHand, game.playerMoney)
      }
    }
  }, [game.playerHand, game.dealerHand, game.playerMoney])

  // Функция рисования карты
  const drawCard = (
    ctx: CanvasRenderingContext2D,
    card: Card,
    x: number,
    y: number
  ) => {
    if (card.hidden) {
      const cardHand = new CardHand(backRed, x, y)
      cardHand.draw(ctx)
    } else {
      makeCard(ctx, card, x, y)
    }
  }

  const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerHand: Card[],
    dealerHand: Card[],
    playerMoney: number
  ) => {
    ctx.clearRect(0, 0, 800, 600)

    playerHand.forEach((card, index) => {
      drawCard(ctx, card, 100 + index * 70, 285)
    })

    dealerHand.forEach((card, index) => {
      drawCard(ctx, card, 100 + index * 70, 75)
    })

    // Вычисление значений рук
    const playerHandValue = calcHand(playerHand)
    const dealerHandValue = calcHand(dealerHand.filter(card => !card.hidden))

    ctx.fillStyle = 'black'
    ctx.font = '22px Arial'

    // Рисование значений очков
    if (game.status === 'playing' || game.result !== null) {
      ctx.fillText('Player : ' + playerHandValue, 100, 270)
      ctx.fillText('Dealer: ' + dealerHandValue, 100, 60)
    }

    if (game.message !== '' && game.result !== null) {
      ctx.fillText(game.message, 225, 210)
    }

    // Рисование денег игрока
    ctx.fillText('Money: $' + playerMoney, 215, 420)
  }

  return <canvas ref={canvasRef} width={550} height={450} />
}

export default GameCanvas
