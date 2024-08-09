export interface ICard {
  suit: string
  value: string
  hidden?: boolean
}

export interface ICardCover {
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
  tableSkin: string
}
