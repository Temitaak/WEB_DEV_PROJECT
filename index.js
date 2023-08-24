const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let score = 0;
let flippedCards = [];
let lockBoard = false;
let timer = 0;
let timerInterval;

const gameContainer = document.querySelector('.game-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

function startGame() {
  shuffleCards();
  createCards();
  startTimer();
}

function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

function createCards() {
  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = card;
    cardElement.addEventListener('click', () => flipCard(cardElement, card));
    gameContainer.appendChild(cardElement);
  });
}

function flipCard(cardElement, card) {
  if (lockBoard || flippedCards.length >= 2) return;

  cardElement.classList.add('flipped');
  flippedCards.push({ element: cardElement, value: card });

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  if (flippedCards[0].value === flippedCards[1].value) {
    score++;
    scoreElement.textContent = score;
    clearFlippedCards();
  } else {
    lockBoard = true;
    setTimeout(() => {
      flippedCards.forEach(card => card.element.classList.remove('flipped'));
      clearFlippedCards();
    }, 1000);
  }
}

function clearFlippedCards() {
  flippedCards = [];
  lockBoard = false;

  if (score === cards.length / 2) {
    clearInterval(timerInterval);
    alert(`Congratulations! You won in ${timer} seconds with ${score} moves.`);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerElement.textContent = timer;
  }, 1000);
}

startGame();

// At the beginning of your script.js
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', resetGame);

function resetGame() {
  score = 0;
  flippedCards = [];
  lockBoard = false;
  timer = 0;
  clearInterval(timerInterval);
  timerElement.textContent = timer;
  scoreElement.textContent = score;

  const cardElements = document.querySelectorAll('.card');
  cardElements.forEach(card => {
    card.classList.remove('flipped');
    card.remove();
  });

  startGame();
}