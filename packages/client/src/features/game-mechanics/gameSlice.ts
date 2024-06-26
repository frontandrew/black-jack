/**
 * Файл содержит логику Redux для управления состоянием игры
 * startGame, drawPlayerCard, revealDealerCard, drawDealerCard, playerStand, updatePlayerMoney, и resetGameMessage - действия для управления игрой
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Card } from '../../shared/types'
import {
  createDeck,
  shuffle,
  calcHandValue,
} from '../../shared/utils/cardUtils'

interface GameState {
  playerHand: Card[]
  dealerHand: Card[]
  deck: Card[]
  gameStatus: 'init' | 'playing' | 'gameover'
  playerBust: boolean
  dealerBust: boolean
  playerStand: boolean
  gameResult: 'win' | 'lose' | 'tie' | null
  playerMoney: number
}

// Начальное состояние игры
const initialState: GameState = {
  playerHand: [],
  dealerHand: [],
  deck: [],
  gameStatus: 'init',
  playerBust: false,
  dealerBust: false,
  playerStand: false,
  gameResult: null,
  playerMoney: 100,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    // Начало новой игры, создание и перемешивание колоды, а также инициализируя руки дилера и игрока
    startGame(state) {
      state.playerHand = []
      state.dealerHand = []
      state.deck = shuffle(createDeck())
      state.playerBust = false
      state.dealerBust = false
      state.playerStand = false
      state.gameStatus = 'playing'
      state.gameResult = null
      state.playerHand.push(state.deck.pop() as Card)
      state.playerHand.push(state.deck.pop() as Card)
      state.dealerHand.push(state.deck.pop() as Card)
      state.dealerHand.push({ ...(state.deck.pop() as Card), hidden: true })
      // Blackjack! Если у игрока сразу после раздачи набралось 21 очко, то такая ситуация и называется блек-джек.
      // Игроку сразу выплачивается выигрыш 3 к 2 (ToDo)
      if (
        state.playerHand.length === 2 &&
        calcHandValue(state.playerHand) === 21
      ) {
        state.gameStatus = 'gameover'
        state.gameResult = 'win'
      }
    },
    // Добавление карты игроку
    drawPlayerCard(state) {
      if (!state.playerStand && state.gameStatus === 'playing') {
        state.playerHand.push(state.deck.pop() as Card)
        if (calcHandValue(state.playerHand) > 21) {
          state.playerBust = true
          state.gameStatus = 'gameover'
          state.gameResult = 'lose'
        }
      }
    },
    // Открытие закрытой карты дилера
    revealDealerCard(state) {
      const hiddenCard = state.dealerHand.find(card => card.hidden)
      if (hiddenCard) {
        hiddenCard.hidden = false
      }
    },
    // Добавление карты дилеру до выполнения условия (пока < 17 очков у дилера)
    drawDealerCard(state) {
      while (calcHandValue(state.dealerHand) < 17) {
        state.dealerHand.push(state.deck.pop() as Card)
      }
      if (calcHandValue(state.dealerHand) > 21) {
        state.dealerBust = true
        state.gameResult = 'win'
      } else if (
        calcHandValue(state.dealerHand) > calcHandValue(state.playerHand)
      ) {
        state.gameResult = 'lose'
      } else if (
        calcHandValue(state.dealerHand) < calcHandValue(state.playerHand)
      ) {
        state.gameResult = 'win'
      } else {
        state.gameResult = 'tie'
      }
      state.gameStatus = 'gameover'
    },
    // Завершение хода игрока
    playerStand(state) {
      if (state.gameStatus === 'playing') {
        state.playerStand = true
        gameSlice.caseReducers.revealDealerCard(state)
        gameSlice.caseReducers.drawDealerCard(state)
      }
    },
    updatePlayerMoney(state, action: PayloadAction<number>) {
      state.playerMoney += action.payload
    },
    resetGame(state) {
      state.gameStatus = 'init'
    },
    newGame(state) {
      state.gameResult = null
      state.gameStatus = 'init'
      state.playerMoney = initialState.playerMoney
      state.deck = []
      state.playerHand = []
      state.dealerHand = []
    },
  },
})

export const {
  startGame,
  drawPlayerCard,
  revealDealerCard,
  drawDealerCard,
  playerStand,
  updatePlayerMoney,
  resetGame,
  newGame,
} = gameSlice.actions

export default gameSlice.reducer
