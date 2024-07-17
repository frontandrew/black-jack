/**
 * Файл содержит логику Redux для управления состоянием игры
 *
 * startGame - начало новой игры, создание и перемешивание колоды, а также инициализируя руки дилера и игрока
 * drawPlayerCard - добавление карты игроку (ход игрока)
 * revealDealerCard - открытие закрытой карты дилера
 * drawDealerCard - добавление карты дилеру (ход дилера)
 * playerStand - stand игрока (завершение хода игрока)
 * updatePlayerMoney - обновление баланса игрока
 * resultGame - подведение итогов игры
 * resetGame - сброс раздачи (начать новую раздачу)
 * newGame - новая игра (обнуление GameState)
 *
 * ToDo реализовать механику ставки любого номинала (не только 10$)
 * ToDo сделать дилера умнее
 * ToDo добавить несколько игроков (или несколько одновременных ставок на поле)
 * ToDo возможность выхода со стола с выигрышем и сообщением с суммой выигрыша
 * ToDo добавить переменную для вывода сообщения в игре "win, lose, tie, blackjack и др."
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createDeck, shuffle, calcHand } from './utils'
import { Card, GameState } from './types'

const initialState: GameState = {
  playerHand: [],
  dealerHand: [],
  deck: [],
  status: 'init',
  playerBust: false,
  dealerBust: false,
  playerStand: false,
  result: null,
  playerMoney: 100,
  message: '',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame(state) {
      state.playerHand = []
      state.dealerHand = []
      state.playerBust = false
      state.dealerBust = false
      state.playerStand = false
      state.status = 'playing'
      state.result = null
      state.playerHand.push(state.deck.pop() as Card)
      state.dealerHand.push({ ...(state.deck.pop() as Card), hidden: true })
      state.playerHand.push(state.deck.pop() as Card)
      state.dealerHand.push(state.deck.pop() as Card)
      // Сразу после раздачи проверяем на blackjack
      // Если у игрока сразу после раздачи набралось 21 очко, то такая ситуация называется блек-джек
      // Игроку сразу выплачивается выигрыш 3 к 2 (ToDo)
      // Ставка не выплачивает, если дилер тоже набрал 21
      if (calcHand(state.playerHand) === 21) {
        gameSlice.caseReducers.playerStand(state)
      }
    },
    drawPlayerCard(state) {
      if (!state.playerStand && state.status === 'playing') {
        state.playerHand.push(state.deck.pop() as Card)
        // Останавливаем ход игрока, если он уже набрал 21 и запускаем набор карт дилером
        if (calcHand(state.playerHand) === 21) {
          gameSlice.caseReducers.playerStand(state)
        }
        if (calcHand(state.playerHand) > 21) {
          gameSlice.caseReducers.resultGame(state)
        }
      }
    },
    revealDealerCard(state) {
      const hiddenCard = state.dealerHand.find(card => card.hidden)
      if (hiddenCard) {
        hiddenCard.hidden = false
      }
    },
    drawDealerCard(state) {
      // Добавление карты дилеру (минимум 16 очков у дилера)
      // В некоторых правилах дилер должен собрать больше 16 очков, если только двумя картами собрал меньше 16 очков
      if (state.status === 'playing') {
        while (calcHand(state.dealerHand) < 17) {
          state.dealerHand.push(state.deck.pop() as Card)
        }
      }
      // Попытка собрать дилером больше игрока, если игрок завершил ход
      // ToDo научить дилера добирать карту, если исход игры ничья, причем у игрока мало очков,
      // а у дилера "безопасная" рука, которая позволяет собрать больше очков и выиграть
      if (state.playerStand === true) {
        while (calcHand(state.dealerHand) < calcHand(state.playerHand)) {
          state.dealerHand.push(state.deck.pop() as Card)
        }
      }
      gameSlice.caseReducers.resultGame(state)
    },
    playerStand(state) {
      if (state.status === 'playing') {
        state.playerStand = true
        gameSlice.caseReducers.revealDealerCard(state)
        gameSlice.caseReducers.drawDealerCard(state)
      }
    },
    updatePlayerMoney(state, action: PayloadAction<number>) {
      state.playerMoney += action.payload
    },
    resultGame(state) {
      // Определение результата игры
      if (calcHand(state.dealerHand) > 21) {
        state.dealerBust = true
        state.result = 'win'
        state.message = 'You win!'
      } else if (calcHand(state.playerHand) > 21) {
        state.playerBust = true
        state.result = 'lose'
        state.message = 'You lose!'
      } else if (calcHand(state.dealerHand) > calcHand(state.playerHand)) {
        state.result = 'lose'
        state.message = 'You lose!'
      } else if (calcHand(state.dealerHand) < calcHand(state.playerHand)) {
        state.result = 'win'
        state.message = 'You win!'
      } else {
        state.result = 'tie'
        state.message = 'Tie!'
      }
      state.status = 'gameover'
    },
    resetGame(state) {
      state.status = 'init'
    },
    newGame(state) {
      state.result = null
      state.status = 'init'
      state.playerMoney = initialState.playerMoney
      state.message = ''
      state.deck = []
      state.playerHand = []
      state.dealerHand = []
      state.deck = shuffle(createDeck())
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
