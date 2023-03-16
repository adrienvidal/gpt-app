const higherBtn = document.getElementById('higher');
const lowerBtn = document.getElementById('lower');
const resetBtn = document.getElementById('reset');
const currentCard = document.getElementById('current-card');
const nextCard = document.getElementById('next-card');
const message = document.getElementById('message');

let deck = [];

function startGame() {
    deck = generateDeck();
    currentCard.textContent = drawCard();
    nextCard.textContent = '';
    message.textContent = '';
    higherBtn.disabled = false;
    lowerBtn.disabled = false;
}

function generateDeck() {
    const suits = ['♣', '♦', '♥', '♠'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let deck = [];
    for (let suit of suits) {
      for (let value of values) {
          deck.push({ value: value, suit: suit });
      }
  }
  
  return shuffle(deck);

}

function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];
}
return array;
}

function drawCard() {
const card = deck.pop();
return `${card.value}${card.suit}`;
}

function compareCards(card1, card2) {
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const card1Value = values.indexOf(card1.slice(0, -1));
const card2Value = values.indexOf(card2.slice(0, -1));

if (card1Value < card2Value) {
  return 'lower';
} else if (card1Value > card2Value) {
  return 'higher';
} else {
  return 'equal';
}

}

function guess(guess) {
const nextCardValue = drawCard();
nextCard.textContent = nextCardValue;
const result = compareCards(currentCard.textContent, nextCardValue);

if (result === guess) {
  message.textContent = 'You win!';
} else {
  message.textContent = 'You lose!';
}

higherBtn.disabled = true;
lowerBtn.disabled = true;

}

higherBtn.addEventListener('click', () => guess('higher'));
lowerBtn.addEventListener('click', () => guess('lower'));
resetBtn.addEventListener('click', startGame);

startGame();