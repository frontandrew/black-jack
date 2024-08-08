import { DrawSprite } from './DrawSprite'
import { ICard } from './types'
import * as sprites from 'images/index'

const cardSuits: string[] = ['♥️', '♦️', '♠️', '♣️']
const cardValues: string[] = [
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
  const deck: ICard[] = []

  // для каждой игры замешиваем 6 колод
  for (let i = 0; i < 6; i++) {
    cardSuits.forEach(suit => {
      cardValues.forEach(value => {
        deck.push({ suit, value })
      })
    })
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

//Создание карт, масти и номера карты

// export function drawCard(
//   card: Card,
//   x: number,
//   y: number
// ) {

//   const textSuits: string[] = ['Hearts', 'Diamonds', 'Spades', 'Clubs']
//   const textValues: string[] = [
//     'two',
//     'tree',
//     'four',
//     'five',
//     'six',
//     'seven',
//     'eight',
//     'nine',
//     'ten',
//     'jack',
//     'queen',
//     'king',
//     'ace',
//   ]

//   const valueIndex: number = cardValues.indexOf(card.value)
//   const suitIndex: number = cardSuits.indexOf(card.suit)

//   const sprite: string =
//     sprites[`${textValues[valueIndex]}${textSuits[suitIndex]}`] //ToDo типизировать импорт

//     if(card.hidden) {
//       return new DrawSprite(sprites.backBlue, x, y)
//     }
//   return new DrawSprite(sprite, x, y)
// }

export function drawCard(card: ICard, x: number, y: number): DrawSprite {
  if (card.hidden) {
    return new DrawSprite(sprites.backRed, x, y)
  }
  switch (card.value) {
    case '2':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.twoHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.twoDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.twoSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.twoClubs, x, y)
      }
      break

    case '3':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.threeHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.threeDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.threeSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.threeClubs, x, y)
      }
      break

    case '4':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.fourHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.fourDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.fourSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.fourClubs, x, y)
      }
      break

    case '5':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.fiveHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.fiveDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.fiveSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.fiveClubs, x, y)
      }
      break

    case '6':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.sixHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.sixDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.sixSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.sixClubs, x, y)
      }
      break

    case '7':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.sevenHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.sevenDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.sevenSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.sevenClubs, x, y)
      }
      break

    case '8':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.eightHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.eightDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.eightSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.eightClubs, x, y)
      }
      break

    case '9':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.nineHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.nineDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.nineSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.nineClubs, x, y)
      }
      break

    case '10':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.tenHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.tenDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.tenSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.tenClubs, x, y)
      }
      break

    case 'A':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.aceHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.aceDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.aceSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.aceClubs, x, y)
      }
      break

    case 'J':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.jackHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.jackDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.jackSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.jackClubs, x, y)
      }
      break

    case 'Q':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.queenHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.queenDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.queenSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.queenClubs, x, y)
      }
      break

    case 'K':
      if (card.suit === '♥️') {
        return new DrawSprite(sprites.kingHearts, x, y)
      }
      if (card.suit === '♦️') {
        return new DrawSprite(sprites.kingDiamonds, x, y)
      }
      if (card.suit === '♠️') {
        return new DrawSprite(sprites.kingSpades, x, y)
      }
      if (card.suit === '♣️') {
        return new DrawSprite(sprites.kingClubs, x, y)
      }
      break
  }
  return new DrawSprite(sprites.backBlue, x, y)
}
