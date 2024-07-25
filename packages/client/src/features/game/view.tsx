/**
 * Компонент для рисования игрового процесса на <canvas>
 * drawGame рисует текущие руки игрока и дилера, а также значения рук и деньги игрока
 * drawCard рисует карту в руке игрока и дилера (в том числе закрытую отдельным цветом)
 */

import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { ICard } from './types'
import { calcHand, drawCard } from './utils'
import { DrawSprite } from './DrawSprite'
import { backRed, tableGreen } from 'images'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const game = useSelector((state: RootState) => state.game)

  const deck = new DrawSprite(backRed, 800, 250)
  const table = new DrawSprite(tableGreen, -225, -100)

  // Перерисовывание игры (canvas) при каждом изменении состояния игры
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const animation = () => {
          drawGame(ctx, game.playerHand, game.dealerHand, game.playerMoney)

          window.requestAnimationFrame(animation)
        }

        animation()
      }
    }
  }, [game.playerHand, game.dealerHand, game.playerMoney])

  const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerHand: ICard[],
    dealerHand: ICard[],
    playerMoney: number
  ) => {
    ctx.clearRect(0, 0, 800, 600)
    table.drawTable(ctx, 1600, 950)
    deck.draw(ctx)

    playerHand.forEach((card, index) => {
      drawCard(card, 300 + index * 70, 430).draw(ctx)
    })

    dealerHand.forEach((card, index) => {
      drawCard(card, 300 + index * 70, 235).draw(ctx)
    })

    // Вычисление значений рук
    const playerHandValue = calcHand(playerHand)
    const dealerHandValue = calcHand(dealerHand.filter(card => !card.hidden))

    ctx.fillStyle = 'black'
    ctx.font = '22px Arial'

    // Рисование значений очков
    if (game.status === 'playing' || game.result !== null) {
      ctx.fillText('Player : ' + playerHandValue, 300, 420)
      ctx.fillText('Dealer: ' + dealerHandValue, 300, 225)
    }

    if (game.message !== '' && game.result !== null) {
      ctx.fillText(game.message, 500, 380)
    }

    // Рисование денег игрока
    ctx.fillText('Money: $' + playerMoney, 500, 550)
  }

  return <canvas ref={canvasRef} width={1100} height={650} />
}

export default GameCanvas
