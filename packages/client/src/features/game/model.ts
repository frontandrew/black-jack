/**
 * Файл содержит логику Redux для управления состоянием игры
 *
 * startGame - начало новой игры, создание и перемешивание колоды, а также инициализируя руки дилера и игрока
 * drawPlayerCard - добавление карты игроку (ход игрока)
 * revealDealerCard - открытие закрытой карты дилера
 * drawDealerCard - добавление карты дилеру (ход дилера)
 * playerStand - stand игрока (завершение хода игрока)
 * updatePlayerMoney - обновление баланса игрока
 * playerBust - перебор игрока
 * dealerBust - перебор дилера
 * compareHands - сравнение рук игрока и диллера для выявления результата
 * resultGame - определение результата игры
 * resetGame - сброс раздачи (начать новую раздачу)
 * newGame - новая игра (обнуление GameState)
 *
 * ToDo добавить несколько игроков (или несколько одновременных ставок на поле)
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createDeck, shuffle, calcHand } from './utils'
import { ICard, IGameState } from './types'

const initialState: IGameState = {
  playerHand: [],
  dealerHand: [],
  deck: [],
  status: 'init',
  playerBust: false,
  dealerBust: false,
  playerStand: false,
  result: null,
  playerMoney: 100,
  playerBet: 10,
  isPlayerBlackjack: false,
  message: '',
  cardCover: {
    front: 'brown',
    back: 'red',
  },
  tableSkin: 'green',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state, action: PayloadAction<number>) {
      state.playerHand = []
      state.dealerHand = []
      state.playerBust = false
      state.dealerBust = false
      state.playerStand = false
      state.isPlayerBlackjack = false
      state.playerBet = action.payload
      state.playerMoney -= state.playerBet
      state.status = 'playing'
      state.result = null
      state.playerHand.push(state.deck.pop() as ICard)
      state.dealerHand.push({ ...(state.deck.pop() as ICard), hidden: true })
      state.playerHand.push(state.deck.pop() as ICard)
      state.dealerHand.push(state.deck.pop() as ICard)
      // Если у игрока сразу после раздачи набралось 21 очко, то это blackjack
      // Игроку сразу выплачивается выигрыш 3 к 2. Ставка не выплачивает, если дилер тоже набрал 21
      if (calcHand(state.playerHand) === 21) {
        state.isPlayerBlackjack = true
        gameSlice.caseReducers.playerStand(state)
      }
    },
    drawPlayerCard(state: IGameState) {
      if (!state.playerStand && state.status === 'playing') {
        state.playerHand.push(state.deck.pop() as ICard)
        // Останавливаем ход игрока, если он уже набрал 21 и запускаем набор карт дилером
        if (calcHand(state.playerHand) === 21) {
          gameSlice.caseReducers.playerStand(state)
        }
        if (calcHand(state.playerHand) > 21) {
          gameSlice.caseReducers.resultGame(state)
        }
      }
    },
    revealDealerCard(state: IGameState) {
      const hiddenCard = state.dealerHand.find(card => card.hidden)
      if (hiddenCard) {
        hiddenCard.hidden = false
      }
    },
    drawDealerCard(state: IGameState) {
      // Добавление карты дилеру (минимум 16 очков у дилера)
      if (state.status === 'playing') {
        while (calcHand(state.dealerHand) < 17) {
          state.dealerHand.push(state.deck.pop() as ICard)
        }
      }
      // Попытка собрать дилером больше игрока, если игрок завершил ход
      // Дилера пытается добрать карту и выиграть, если исход игры ничья и у игрока <13 очков
      if (state.playerStand === true) {
        while (
          calcHand(state.dealerHand) < calcHand(state.playerHand) ||
          (calcHand(state.playerHand) < 13 &&
            calcHand(state.dealerHand) === calcHand(state.playerHand))
        ) {
          state.dealerHand.push(state.deck.pop() as ICard)
        }
      }
      gameSlice.caseReducers.resultGame(state)
    },
    playerStand(state: IGameState) {
      if (state.status === 'playing') {
        state.playerStand = true
        gameSlice.caseReducers.revealDealerCard(state)
        gameSlice.caseReducers.drawDealerCard(state)
      }
    },
    updatePlayerMoney(state: IGameState) {
      if (state.result == 'blackjack') {
        state.playerMoney += state.playerBet * 2.5 // Blackjack pays 3:2
      }
      if (state.result == 'win') {
        state.playerMoney += state.playerBet * 2 // Normal win, 1:1 payout
      }
      if (state.result == 'tie') {
        state.playerMoney += state.playerBet // Tie, bet is returned
      }
    },
    playerBust(state: IGameState) {
      state.playerBust = true
      state.result = 'lose'
      state.message = 'You lose!'
    },
    dealerBust(state: IGameState) {
      state.dealerBust = true
      state.result = state.isPlayerBlackjack ? 'blackjack' : 'win'
      state.message = state.isPlayerBlackjack ? 'Blackjack!' : 'You win!'
    },
    compareHands(state: IGameState) {
      if (calcHand(state.dealerHand) > calcHand(state.playerHand)) {
        state.result = 'lose'
        state.message = 'You lose!'
      } else if (calcHand(state.dealerHand) < calcHand(state.playerHand)) {
        state.result = state.isPlayerBlackjack ? 'blackjack' : 'win'
        state.message = state.isPlayerBlackjack ? 'Blackjack!' : 'You win!'
      } else {
        state.result = 'tie'
        state.message = 'Tie!'
      }
    },
    resultGame(state: IGameState) {
      const playerHand = calcHand(state.playerHand)
      const dealerHand = calcHand(state.dealerHand)
      if (dealerHand > 21) gameSlice.caseReducers.dealerBust(state)
      else if (playerHand > 21) gameSlice.caseReducers.playerBust(state)
      else gameSlice.caseReducers.compareHands(state)
      gameSlice.caseReducers.updatePlayerMoney(state)
      state.status = 'gameover'
    },
    resetGame(state: IGameState) {
      state.status = 'init'
    },
    newGame(state: IGameState) {
      state.result = null
      state.status = 'init'
      state.playerMoney = initialState.playerMoney
      state.message = ''
      state.deck = []
      state.playerHand = []
      state.dealerHand = []
      state.deck = shuffle(createDeck())
    },
    skinCards(state: IGameState, action: PayloadAction<string>) {
      state.cardCover = action.payload
    },
    skinTable(state: IGameState, action: PayloadAction<string>) {
      state.tableSkin = action.payload
    },
  },
})

export const {
  drawPlayerCard,
  playerStand,
  startGame,
  resetGame,
  newGame,
  skinCards,
  skinTable,
} = gameSlice.actions

export default gameSlice.reducer
