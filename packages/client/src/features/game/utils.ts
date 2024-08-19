import { DrawSprite } from './DrawSprite'
import { ICard, TCardSuit, TCardValue } from './types'
// import * as sprites from 'images'

const cardSuits: TCardSuit[] = ['♥️', '♦️', '♠️', '♣️']
const cardValues: TCardValue[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
]

/**
 * Создание колоды карт
 */
export function createDeck(): ICard[] {
  // для каждой игры замешиваем 6 колод
  const deck: ICard[] = []
  for (let i = 0; i < 6; i++) {
    for (const suit of cardSuits) {
      for (const value of cardValues) {
        deck.push({ suit, value })
      }
    }
  }

  return deck
}

/**
 * Алгоритм Фишера-Йетса (Fisher-Yates shuffle), известный как алгоритм Саттоло (Sattolo),
 * для эффективного перемешивания элементов массива
 * @param {Card[]} deck - массив карт для перемешивания
 */
export function shuffle(deck: ICard[]): ICard[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

/**
 * Подсчет очков в руке
 * @param {ICard[]} hand - массив карт текущей руки
 */
export function calcHand(hand: ICard[]): number {
  let value = 0
  let aceCount = 0

  for (const card of hand) {
    if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      value += 10
    } else if (card.value === 'A') {
      value += 11
      aceCount++
    } else {
      value += +card.value
    }
  }

  while (value > 21 && aceCount > 0) {
    value -= 10
    aceCount--
  }

  return value
}

/**
 * Draw cards with sprites
 */
export function drawCard(
  ctx: CanvasRenderingContext2D,
  card: ICard,
  x: number,
  y: number
) {
  if (card.hidden) {
    ctx.fillStyle = 'gray'
    ctx.fillRect(x, y, 50, 70)
    ctx.strokeRect(x, y, 50, 70)
  } else {
    ctx.fillStyle = 'white'
    ctx.fillRect(x, y, 50, 70)
    ctx.strokeRect(x, y, 50, 70)
    if (card.suit === '♥️' || card.suit === '♦️') {
      ctx.fillStyle = 'red'
    }
    if (card.suit === '♠️' || card.suit === '♣️') {
      ctx.fillStyle = 'black'
    }
    ctx.font = '18px Arial'
    ctx.fillText(`${card.value}${card.suit}`, x + 5, y + 45)
  }
}

/**
 * Draw cards with sprites
 */
const cards: Record<TCardSuit | TCardValue, string> = {
  '♥️': 'Hearts',
  '♦️': 'Diamonds',
  '♠️': 'Spades',
  '♣️': 'Clubs',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '10': 'ten',
  J: 'jack',
  Q: 'queen',
  K: 'king',
  A: 'ace',
}

// export function drawSpriteCard(card: ICard, x: number, y: number): DrawSprite {
//   if (card.hidden) {
//     return new DrawSprite(sprites.backRed, x, y)
//   }

//   const spriteName = `${cards[card.value]}${cards[card.suit]}`

//   return new DrawSprite(
//     sprites[spriteName as keyof typeof sprites] || sprites.backBlue,
//     x,
//     y
//   )
// }
