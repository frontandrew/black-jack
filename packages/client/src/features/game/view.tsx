/**
 * Компонент для рисования игрового процесса на <canvas>
 * drawGame рисует текущие руки игрока и дилера, а также значения рук и деньги игрока
 * drawCard рисует карту в руке игрока и дилера (в том числе закрытую отдельным цветом)
 */

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'
import { ICard, ICardCover } from './types'
import { calcHand, drawCard } from './utils'
import { DrawSprite } from './DrawSprite'
import { backBlack, backBlue, backRed, tableBlue, tableGreen } from 'images'

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const game = useSelector((state: RootState) => state.game)
  const [step, setStep] = useState({
    player: 0,
    dealer: 0,
  })
  const [sumDeck, setSumDeck] = useState(26)

  const deck = new DrawSprite(
    game.cardCover.back === 'red'
      ? backRed
      : game.cardCover.back === 'black'
      ? backBlack
      : backBlue,
    730,
    150
  )
  let cardPlayer = new DrawSprite(
    game.cardCover.back === 'red'
      ? backRed
      : game.cardCover.back === 'black'
      ? backBlack
      : backBlue,
    750,
    300
  )
  const table = new DrawSprite(
    game.tableSkin === 'green' ? tableGreen : tableBlue,
    -225,
    -220
  )

  // Перерисовывание игры (canvas) при каждом изменении состояния игры
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const animation = () => {
          drawGame(
            ctx,
            game.playerHand,
            game.dealerHand,
            game.playerMoney,
            game.cardCover
          )

          window.requestAnimationFrame(animation)
        }

        animation()
      }
    }
  }, [game.playerHand, game.dealerHand, game.playerMoney])

  useEffect(() => {
    if (game.playerHand.length > 0) {
      cardPlayer = drawCard(
        game.playerHand[game.playerHand.length - 1],
        750,
        150,
        game.cardCover
      )
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          if (step.player === 0) {
            setStep({
              player: game.playerHand.length,
              dealer: step.dealer,
            })
          }
          cardPlayer.moveCard(330, game.playerHand)
          setSumDeck(sumDeck - 1)
        }
      }
    }
  }, [game.playerHand])

  // useEffect(() => {
  //   const canvas = canvasRef.current
  //   if (canvas) {
  //     const ctx = canvas.getContext('2d')
  //     if (ctx) {
  //       if (step.dealer === 0) {
  //         setStep({
  //           player: step.player,
  //           dealer: game.dealerHand.length,
  //         })
  //       }
  //       cardPlayer.moveCard(235, game.dealerHand)
  //     }
  //   }
  // }, [game.dealerHand])

  const drawGame = (
    ctx: CanvasRenderingContext2D,
    playerHand: ICard[],
    dealerHand: ICard[],
    playerMoney: number,
    cardCover: ICardCover
  ) => {
    ctx.clearRect(0, 0, 1100, 650)
    table.drawTable(ctx, 1600, 950)
    cardPlayer.update(ctx)

    playerHand.forEach((card, index, array) => {
      if (index === array.length - 1) {
        return
      }
      drawCard(card, 300 + index * 70, 330, cardCover).draw(ctx)
    })

    dealerHand.forEach((card, index) => {
      drawCard(card, 300 + index * 70, 100, cardCover).draw(ctx)
    })

    deck.drawDeck(ctx, sumDeck)

    // Вычисление значений рук
    const playerHandValue = calcHand(playerHand)
    const dealerHandValue = calcHand(dealerHand.filter(card => !card.hidden))

    ctx.fillStyle = 'white'
    ctx.font = '22px Arial'

    // Рисование значений очков
    if (game.status === 'playing' || game.result !== null) {
      ctx.fillText('Player : ' + playerHandValue, 300, 320)
      ctx.fillText('Dealer: ' + dealerHandValue, 300, 90)
    }

    if (game.message !== '' && game.result !== null) {
      ctx.fillText(game.message, 520, 260)
    }

    // Рисование денег игрока
    ctx.fillText('Money: $' + playerMoney, 500, 540)
  }

  return <canvas ref={canvasRef} width={1100} height={550} />
}

export default GameCanvas
