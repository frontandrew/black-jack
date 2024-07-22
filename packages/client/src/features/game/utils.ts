import { DrawSprite } from './DrawSprite'
import { Card } from './types'
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
/**
 * Создание колоды карт
 */
export function createDeck(): Card[] {
  const suits = ['♠️', '♥️', '♦️', '♣️']
  const values = [
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
  const deck: Card[] = []

  // для каждой игры замешиваем 6 колод
  for (let i = 0; i < 6; i++) {
    suits.forEach(suit => {
      values.forEach(value => {
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
export function shuffle(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
  return deck
}

/**
 * Подсчет очков в руке
 * @param {Card[]} hand - массив карт текущей руки
 */
export function calcHand(hand: Card[]): number {
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

export function drawCard(
  ctx: CanvasRenderingContext2D,
  card: Card,
  x: number,
  y: number
): DrawSprite | undefined {
  let cardHand
  if (card.hidden) {
    return (cardHand = new DrawSprite(backRed, x, y))
  } else {
    switch (card.value) {
      case '2':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(twoHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(twoDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(twoSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(twoClubs, x, y))
        }
        break

      case '3':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(threeHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(threeDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(threeSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(threeClubs, x, y))
        }
        break

      case '4':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(fourHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(fourDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(fourSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(fourClubs, x, y))
        }
        break

      case '5':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(fiveHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(fiveDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(fiveSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(fiveClubs, x, y))
        }
        break

      case '6':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(sixHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(sixDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(sixSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(sixClubs, x, y))
        }
        break

      case '7':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(sevenHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(sevenDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(sevenSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(sevenClubs, x, y))
        }
        break

      case '8':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(eightHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(eightDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(eightSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(eightClubs, x, y))
        }
        break

      case '9':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(nineHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(nineDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(nineSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(nineClubs, x, y))
        }
        break

      case '10':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(tenHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(tenDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(tenSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(tenClubs, x, y))
        }
        break

      case 'A':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(aceHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(aceDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(aceSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(aceClubs, x, y))
        }
        break

      case 'J':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(jackHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(jackDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(jackSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(jackClubs, x, y))
        }
        break

      case 'Q':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(queenHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(queenDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(queenSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(queenClubs, x, y))
        }
        break

      case 'K':
        if (card.suit === '♥️') {
          return (cardHand = new DrawSprite(kingHearts, x, y))
        }
        if (card.suit === '♦️') {
          return (cardHand = new DrawSprite(kingDiamonds, x, y))
        }
        if (card.suit === '♠️') {
          return (cardHand = new DrawSprite(kingSpades, x, y))
        }
        if (card.suit === '♣️') {
          return (cardHand = new DrawSprite(kingClubs, x, y))
        }
        break

      default:
        break
    }
  }
}
