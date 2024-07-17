export interface Card {
  suit: string
  value: string
  hidden?: boolean
}

export interface GameState {
  playerHand: Card[]
  dealerHand: Card[]
  deck: Card[]
  status: 'init' | 'playing' | 'gameover'
  playerBust: boolean
  dealerBust: boolean
  playerStand: boolean
  result: 'blackjack' | 'win' | 'lose' | 'tie' | null
  playerMoney: number
  message: string
}
