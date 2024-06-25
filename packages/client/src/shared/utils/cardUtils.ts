import { Card } from '../types'

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

  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({ suit, value })
    })
  })

  return deck
}

/**
 * Алгоритм Фишера-Йетса (Fisher-Yates shuffle), известный как алгоритм Саттоло (Sattolo),
 * для эффективного перемешивания элементов массива
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
 */
export function calcHandValue(hand: Card[]): number {
  let value = 0
  let aceCount = 0

  for (const card of hand) {
    if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
      value += 10
    } else if (card.value === 'A') {
      value += 11
      aceCount++
    } else {
      value += parseInt(card.value)
    }
  }

  while (value > 21 && aceCount > 0) {
    value -= 10
    aceCount--
  }

  return value
}
