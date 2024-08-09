import { DrawSprite } from './DrawSprite'
import { ICard, ICardCover } from './types'
import * as sprites from 'images'

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

export function drawCard(
  card: ICard,
  x: number,
  y: number,
  cardCover: ICardCover
): DrawSprite {
  if (card.hidden) {
    return new DrawSprite(
      cardCover.back === 'red'
        ? sprites.backRed
        : cardCover.back === 'black'
        ? sprites.backBlack
        : sprites.backBlue,
      x,
      y
    )
  }
  switch (card.value) {
    case '2':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.twoHearts
            : sprites.twoHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.twoDiamonds
            : sprites.twoDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.twoSpades
            : sprites.twoSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.twoClubs
            : sprites.twoClubsWhite,
          x,
          y
        )
      }
      break

    case '3':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.threeHearts
            : sprites.threeHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.threeDiamonds
            : sprites.threeDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.threeSpades
            : sprites.threeSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.threeClubs
            : sprites.threeClubsWhite,
          x,
          y
        )
      }
      break

    case '4':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.fourHearts
            : sprites.fourHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.fourDiamonds
            : sprites.fourDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.fourSpades
            : sprites.fourSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.fourClubs
            : sprites.fourClubsWhite,
          x,
          y
        )
      }
      break

    case '5':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.fiveHearts
            : sprites.fiveHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.fiveDiamonds
            : sprites.fiveDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.fiveSpades
            : sprites.fiveSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.fiveClubs
            : sprites.fiveClubsWhite,
          x,
          y
        )
      }
      break

    case '6':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.sixHearts
            : sprites.sixHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.sixDiamonds
            : sprites.sixDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.sixSpades
            : sprites.sixSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.sixClubs
            : sprites.sixClubsWhite,
          x,
          y
        )
      }
      break

    case '7':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.sevenHearts
            : sprites.sevenHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.sevenDiamonds
            : sprites.sevenDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.sevenSpades
            : sprites.sevenSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.sevenClubs
            : sprites.sevenClubsWhite,
          x,
          y
        )
      }
      break

    case '8':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.eightHearts
            : sprites.eightHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.eightDiamonds
            : sprites.eightDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.eightSpades
            : sprites.eightSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.eightClubs
            : sprites.eightClubsWhite,
          x,
          y
        )
      }
      break

    case '9':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.nineHearts
            : sprites.nineHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.nineDiamonds
            : sprites.nineDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.nineSpades
            : sprites.nineSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.nineClubs
            : sprites.nineClubsWhite,
          x,
          y
        )
      }
      break

    case '10':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.tenHearts
            : sprites.tenHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.tenDiamonds
            : sprites.tenDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.tenSpades
            : sprites.tenSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.tenClubs
            : sprites.tenClubsWhite,
          x,
          y
        )
      }
      break

    case 'A':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.aceHearts
            : sprites.aceHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.aceDiamonds
            : sprites.aceDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.aceSpades
            : sprites.aceSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.aceClubs
            : sprites.aceClubsWhite,
          x,
          y
        )
      }
      break

    case 'J':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.jackHearts
            : sprites.jackHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.jackDiamonds
            : sprites.jackDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.jackSpades
            : sprites.jackSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.jackClubs
            : sprites.jackClubsWhite,
          x,
          y
        )
      }
      break

    case 'Q':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.queenHearts
            : sprites.queenHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.queenDiamonds
            : sprites.queenDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.queenSpades
            : sprites.queenSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.queenClubs
            : sprites.queenClubsWhite,
          x,
          y
        )
      }
      break

    case 'K':
      if (card.suit === '♥️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.kingHearts
            : sprites.kingHeartsWhite,
          x,
          y
        )
      }
      if (card.suit === '♦️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.kingDiamonds
            : sprites.kingDiamondsWhite,
          x,
          y
        )
      }
      if (card.suit === '♠️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.kingSpades
            : sprites.kingSpadesWhite,
          x,
          y
        )
      }
      if (card.suit === '♣️') {
        return new DrawSprite(
          cardCover.front === 'brown'
            ? sprites.kingClubs
            : sprites.kingClubsWhite,
          x,
          y
        )
      }
      break
  }
  return new DrawSprite(sprites.backBlue, x, y)
}
