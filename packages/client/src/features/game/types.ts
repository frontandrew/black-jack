export type TCardSuit = '♥️' | '♦️' | '♠️' | '♣️'
export type TCardValue =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K'
  | 'A'

export interface ICard {
  suit: TCardSuit
  value: TCardValue
  hidden?: boolean
}

interface ICardCover {
  front: string
  back: string
}

export interface IGameState {
  playerHand: ICard[]
  dealerHand: ICard[]
  deck: ICard[]
  status: 'init' | 'playing' | 'gameover'
  playerBust: boolean
  dealerBust: boolean
  playerStand: boolean
  result: 'blackjack' | 'win' | 'lose' | 'tie' | null
  playerMoney: number
  playerBet: number
  isPlayerBlackjack: boolean
  message: string
  cardCover: ICardCover
}
