const startGameButton = document.getElementById('start-game')
const gameInfo = document.getElementById('game-info')

const suits = ['red', 'green', 'blue', 'yellow']
const values = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'Skip',
  'Reverse',
  'Draw Two'
]
const wilds = ['Wild', 'Wild Draw Four']

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  toString() {
    return `${this.suit} ${this.value}`
  }
}

function createDeck() {
  const deck = []

  for (const suit of suits) {
    for (const value of values) {
      deck.push(new Card(suit, value))
      // Add a duplicate for non-zero cards
      if (value !== '0') {
        deck.push(new Card(suit, value))
      }
    }
  }
  for (const wild of wilds) {
    // Add 4 Wild and Wild Draw Four cards
    for (let i = 0; i < 4; i++) {
      deck.push(new Card('wild', wild))
    }
  }

  return shuffle(deck)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function startGame() {
  const deck = createDeck()
  const players = createPlayers(4)
  dealCards(players, deck)
  const discardPile = [deck.pop()]
  const currentPlayer = 0

  displayGameState(players, discardPile, currentPlayer)
}

function createPlayers(numPlayers) {
  const players = []
  for (let i = 0; i < numPlayers; i++) {
    players.push({ id: i, hand: [] })
  }
  return players
}

function dealCards(players, deck) {
  for (let i = 0; i < 7; i++) {
    for (const player of players) {
      player.hand.push(deck.pop())
    }
  }
}

function displayGameState(players, discardPile, currentPlayer) {
  const discardTop = discardPile[discardPile.length - 1]
  let gameState = `Current Card: ${discardTop.toString()}<br><br>;`

  for (const player of players) {
    const isCurrent = player.id === currentPlayer
    gameState += `Player ${player.id + 1}${isCurrent ? ' (Current)' : ''}:<br>`
    gameState += player.hand
      .map((card, index) => `${index + 1}. ${card.toString()}`)
      .join('<br>')
    gameState += '<br><br>'
  }

  gameInfo.innerHTML = gameState
}

startGameButton.addEventListener('click', startGame)
