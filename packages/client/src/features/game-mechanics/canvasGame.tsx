/**
 * Компонент отвечает за рисование игрового процесса на <canvas>
 * drawGame рисует текущие руки игрока и дилера, а также значения рук и деньги игрока
 * drawCard рисует карту в руке игрока и дилера (в том числе закрытую отдельным цветом)
 */

import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Card } from '../../shared/types'
import { calcHandValue } from '../../shared/utils/cardUtils'

const CanvasGame: React.FC = () => {
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
      ctx.fillStyle = 'gray'
      ctx.fillRect(x, y, 50, 70)
      ctx.strokeRect(x, y, 50, 70)
    } else {
      ctx.fillStyle = 'white'
      ctx.fillRect(x, y, 50, 70)
      ctx.strokeRect(x, y, 50, 70)
      ctx.fillStyle = 'black'
      ctx.font = '20px Arial'
      ctx.fillText(`${card.value}${card.suit}`, x + 5, y + 45)
    }
  }

  // Функция рисования игры
  const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerHand: Card[],
    dealerHand: Card[],
    playerMoney: number
  ) => {
    ctx.clearRect(0, 0, 800, 600)

    // Рисование карт игрока
    playerHand.forEach((card, index) => {
      drawCard(ctx, card, 100 + index * 60, 400)
    })

    // Рисование карт дилера
    dealerHand.forEach((card, index) => {
      drawCard(ctx, card, 100 + index * 60, 100)
    })

    // Вычисление значений рук
    const playerHandValue = calcHandValue(playerHand)
    const dealerHandValue = calcHandValue(
      dealerHand.filter(card => !card.hidden)
    )

    // Рисование значений очков
    ctx.font = '20px Arial'
    ctx.fillText('Очки дилера: ' + dealerHandValue, 100, 80)
    ctx.fillText('Очки игрока: ' + playerHandValue, 100, 380)

    // Рисование денег игрока
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.fillText('Деньги игрока: $' + playerMoney, 10, 580)
  }

  return <canvas ref={canvasRef} width={800} height={600} />
}

export default CanvasGame
