/**
 * Компонент для рисования игрового процесса на <canvas>
 * drawGame рисует текущие руки игрока и дилера, а также значения рук и деньги игрока
 * drawCard рисует карту в руке игрока и дилера (в том числе закрытую отдельным цветом)
 */

import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { Card } from './types'
import { calcHand, drawCard } from './utils'
import { DrawSprite } from './DrawSprite'
import { backRed, tableGreen } from 'images'

const deck = new DrawSprite(backRed, 450, 150)
const table = new DrawSprite(tableGreen, -225, -100)

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const game = useSelector((state: RootState) => state.game)

  // Перерисовывание игры (canvas) при каждом изменении состояния игры
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // массивы для обьектов класса, с методом draw
        const playerCards: DrawSprite[] = []
        const dealerCards: DrawSprite[] = []

        game.playerHand.forEach((card, index) => {
          playerCards.push(drawCard(ctx, card, 100 + index * 70, 285)) //  закидуем в массив игрока созданый обьект карта
        })

        game.dealerHand.forEach((card, index) => {
          dealerCards.push(drawCard(ctx, card, 100 + index * 70, 75)) //  закидуем в массив дилера созданый обьект карта
        })

        const animation = () => {
          drawGame(
            ctx,
            playerCards,
            dealerCards,
            game.playerHand,
            game.dealerHand,
            game.playerMoney
          )

          window.requestAnimationFrame(animation)
        }

        animation()
      }
    }
  }, [game.playerHand, game.dealerHand, game.playerMoney])

  const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerCards: DrawSprite[],
    dealerCards: DrawSprite[],
    playerHand: Card[],
    dealerHand: Card[],
    playerMoney: number
  ) => {
    ctx.clearRect(0, 0, 800, 600)
    table.drawTable(ctx, 1300, 850)
    deck.draw(ctx)

    // проходимся по массивам карт(обьектов класса) игрока, и дилера, запускаем метод draw, для отрисовки
    playerCards.forEach(card => {
      card.draw(ctx)
    })

    dealerCards.forEach(card => {
      card.draw(ctx)
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

  return <canvas ref={canvasRef} width={850} height={650} />
}

export default GameCanvas
