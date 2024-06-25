import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Card } from '../../shared/types'
import { calcHandValue } from '../../shared/utils/cardUtils'

const CanvasGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const game = useSelector((state: RootState) => state.game)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        drawGame(ctx, game.playerHand, game.dealerHand, game.playerMoney)
      }
    }
  }, [game.playerHand, game.dealerHand, game.playerMoney])

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

  const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerHand: Card[],
    dealerHand: Card[],
    playerMoney: number
  ) => {
    ctx.clearRect(0, 0, 800, 600)

    playerHand.forEach((card, index) => {
      drawCard(ctx, card, 100 + index * 60, 400)
    })

    dealerHand.forEach((card, index) => {
      drawCard(ctx, card, 100 + index * 60, 100)
    })

    const playerHandValue = calcHandValue(playerHand)
    const dealerHandValue = calcHandValue(
      dealerHand.filter(card => !card.hidden)
    )

    ctx.font = '20px Arial'
    ctx.fillText('Очки дилера: ' + dealerHandValue, 100, 80)
    ctx.fillText('Очки игрока: ' + playerHandValue, 100, 380)

    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.fillText('Деньги игрока: $' + playerMoney, 10, 580)
  }

  return <canvas ref={canvasRef} width={800} height={600} />
}

export default CanvasGame
