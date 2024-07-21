import { CardHand } from './CardHand'
import { Card } from './types'
import {
  aceClubs,
  aceDiamonds,
  aceHearts,
  aceSpades,
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
export function makeCard(
  ctx: CanvasRenderingContext2D,
  card: Card,
  x: number,
  y: number
) {
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
