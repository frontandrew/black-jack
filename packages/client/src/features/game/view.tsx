/**
 * Компонент для рисования игрового процесса на <canvas>
 * drawGame рисует текущие руки игрока и дилера, а также значения рук и деньги игрока
 * drawCard рисует карту в руке игрока и дилера (в том числе закрытую отдельным цветом)
 */

import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { Card } from './types'
import { calcHand } from './utils'
import {
  aceClubs,
  aceDiamonds,
  aceHearts,
  aceSpades,
  backRed,
  eightClubs,
  eightDiamonds,
  eightHearts,
  eightSpades,
  fiveClubs,
  fiveDiamonds,
  fiveHearts,
  fiveSpades,
  fourClubs,
  fourDiamonds,
  fourHearts,
  fourSpades,
  jackClubs,
  jackDiamonds,
  jackHearts,
  jackSpades,
  kingClubs,
  kingDiamonds,
  kingHearts,
  kingSpades,
  nineClubs,
  nineDiamonds,
  nineHearts,
  nineSpades,
  queenClubs,
  queenDiamonds,
  queenHearts,
  queenSpades,
  sevenClubs,
  sevenDiamonds,
  sevenHearts,
  sevenSpades,
  sixClubs,
  sixDiamonds,
  sixHearts,
  sixSpades,
  tenClubs,
  tenDiamonds,
  tenHearts,
  tenSpades,
  threeClubs,
  threeDiamonds,
  threeHearts,
  threeSpades,
  twoClubs,
  twoDiamonds,
  twoHearts,
  twoSpades,
} from 'images'

class CardHand {
  x: number
  y: number
  sprites: HTMLImageElement
  constructor(src: string, x: number, y: number) {
    this.x = x
    this.y = y
    this.sprites = new Image()
    this.sprites.src = src
  }

  draw(c: CanvasRenderingContext2D) {
    this.sprites.onload = () => {
      c.drawImage(this.sprites, this.x, this.y)
    }
  }
}

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
      switch (card.value) {
        case '2':
          if (card.suit === '♥️') {
            const card = new CardHand(twoHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(twoDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(twoSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(twoClubs, x, y)
            card.draw(ctx)
          }
          break

        case '3':
          if (card.suit === '♥️') {
            const card = new CardHand(threeHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(threeDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(threeSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(threeClubs, x, y)
            card.draw(ctx)
          }
          break

        case '4':
          if (card.suit === '♥️') {
            const card = new CardHand(fourHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(fourDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(fourSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(fourClubs, x, y)
            card.draw(ctx)
          }
          break

        case '5':
          if (card.suit === '♥️') {
            const card = new CardHand(fiveHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(fiveDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(fiveSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(fiveClubs, x, y)
            card.draw(ctx)
          }
          break

        case '6':
          if (card.suit === '♥️') {
            const card = new CardHand(sixHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(sixDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(sixSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(sixClubs, x, y)
            card.draw(ctx)
          }
          break

        case '7':
          if (card.suit === '♥️') {
            const card = new CardHand(sevenHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(sevenDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(sevenSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(sevenClubs, x, y)
            card.draw(ctx)
          }
          break

        case '8':
          if (card.suit === '♥️') {
            const card = new CardHand(eightHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(eightDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(eightSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(eightClubs, x, y)
            card.draw(ctx)
          }
          break

        case '9':
          if (card.suit === '♥️') {
            const card = new CardHand(nineHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(nineDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(nineSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(nineClubs, x, y)
            card.draw(ctx)
          }
          break

        case '10':
          if (card.suit === '♥️') {
            const card = new CardHand(tenHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(tenDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(tenSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(tenClubs, x, y)
            card.draw(ctx)
          }
          break

        case 'A':
          if (card.suit === '♥️') {
            const card = new CardHand(aceHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(aceDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(aceSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(aceClubs, x, y)
            card.draw(ctx)
          }
          break

        case 'J':
          if (card.suit === '♥️') {
            const card = new CardHand(jackHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(jackDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(jackSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(jackClubs, x, y)
            card.draw(ctx)
          }
          break

        case 'Q':
          if (card.suit === '♥️') {
            const card = new CardHand(queenHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(queenDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(queenSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(queenClubs, x, y)
            card.draw(ctx)
          }
          break

        case 'K':
          if (card.suit === '♥️') {
            const card = new CardHand(kingHearts, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♦️') {
            const card = new CardHand(kingDiamonds, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♠️') {
            const card = new CardHand(kingSpades, x, y)
            card.draw(ctx)
          }
          if (card.suit === '♣️') {
            const card = new CardHand(kingClubs, x, y)
            card.draw(ctx)
          }
          break

        default:
          break
      }
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
      drawCard(ctx, card, 100 + index * 60, 285)
    })

    dealerHand.forEach((card, index) => {
      drawCard(ctx, card, 100 + index * 60, 75)
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
