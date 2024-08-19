import { DrawSprite } from './DrawSprite'
import { ICard, TCardSuit, TCardValue } from './types'
import * as sprites from 'images'

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

/**
 * Создание колоды карт
 */
export function createDeck(): ICard[] {
  const suitValues = ['Hearts', 'Diamonds', 'Spades', 'Clubs']
  const deck: ICard[] = []
  const suits = Object.entries(cards)
    .filter(([_, value]) => suitValues.includes(value))
    .map(([key]) => key as TCardSuit)
  const values = Object.entries(cards)
    .filter(([_, value]) => !suitValues.includes(value))
    .map(([key]) => key as TCardValue)

  // для каждой игры замешиваем 6 колод
  for (let i = 0; i < 6; i++) {
    for (const suit of suits) {
      for (const value of values) {
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

export function drawCard(card: ICard, x: number, y: number): DrawSprite {
  if (card.hidden) {
    return new DrawSprite(sprites.backRed, x, y)
  }

  const spriteName = `${cards[card.value]}${cards[card.suit]}`

  return new DrawSprite(
    sprites[spriteName as keyof typeof sprites] || sprites.backBlue,
    x,
    y
  )
}
