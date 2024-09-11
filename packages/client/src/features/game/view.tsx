import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { TRootState } from '../../shared/store/store'
import { ICard } from './types'
import { calcHand, drawCard } from './utils'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const game = useSelector((state: TRootState) => state.game)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        drawGame(ctx, game.playerHand, game.dealerHand, game.playerMoney)
      }
    }
  }, [game.playerHand, game.dealerHand, game.playerMoney])

  const drawTable = (ctx: CanvasRenderingContext2D) => {
    const width = 650
    const height = 375
    const radius = 200

    // Цвет стола
    ctx.fillStyle = '#076324'

    // Прямоугольная часть стола
    ctx.fillRect(0, 0, width, height - radius)

    // Полукруглая часть стола
    ctx.beginPath()
    ctx.moveTo(0, height - radius)
    ctx.arcTo(0, height, radius, height, radius)
    ctx.arcTo(width, height, width, height - radius, radius)
    ctx.lineTo(width, height - radius)
    ctx.fill()

    // Полукруг для дилера
    ctx.beginPath()
    ctx.arc(width / 2, 0, 150, 0, Math.PI, false)
    ctx.fillStyle = '#0c5d2e'
    ctx.fill()
    ctx.strokeStyle = '#8B4513'
    ctx.stroke()
  }

  const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerHand: ICard[],
    dealerHand: ICard[],
    playerMoney: number
  ) => {
    ctx.clearRect(0, 0, 650, 350)

    drawTable(ctx)

    playerHand.forEach((card, index) => {
      drawCard(ctx, card, 200 + index * 35, 230) // Немного ниже для игрока
    })

    dealerHand.forEach((card, index) => {
      drawCard(ctx, card, 200 + index * 35, 35)
    })

    const playerHandValue = calcHand(playerHand)
    const dealerHandValue = calcHand(dealerHand.filter(card => !card.hidden))

    ctx.fillStyle = 'white'
    ctx.font = '22px Arial'

    if (game.status === 'playing' || game.result !== null) {
      ctx.fillText('Player: ' + playerHandValue, 250, 220)
      ctx.fillText('Dealer: ' + dealerHandValue, 250, 25)
    }

    if (game.message !== '' && game.result !== null) {
      ctx.fillText(game.message, 250, 165)
    }

    ctx.fillText('Money: $' + playerMoney, 250, 355)
  }

  return <canvas ref={canvasRef} width={650} height={375} />
}

export default GameCanvas
