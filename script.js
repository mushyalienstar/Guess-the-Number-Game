'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const again = document.querySelector('again');

// Set random number to 1-20
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
let playing = true;

// Initial level values
let level1 = true;
let level2 = false;
let level3 = false;

// Diplsay message functionality
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Opening the modal functionality
const openModal = function () {
  playing = false;
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Closing the modal functionality
const closeModal = function () {
  playing = true;
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Simplify the level change
const levelChange = function () {
  score = 20;
  highScore = 0;
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.highscore').textContent = highScore;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  closeModal();
};

// Check button functionality
document.querySelector('.check').addEventListener('click', function () {
  if (playing) {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    // When there is no input
    if (!guess) {
      displayMessage('⛔ No number!');

      // When player wins
    } else if (guess === secretNumber) {
      displayMessage('🥳 Correct number!');
      document.querySelector('.number').textContent = secretNumber;

      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';

      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
      }

      // When guess is wrong
    } else if (guess !== secretNumber) {
      if (score > 1) {
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        displayMessage('💥 You lost the game!');
        document.querySelector('.score').textContent = 0;
      }
    }
  }
});

// Restart button
document.querySelector('.again').addEventListener('click', function () {
  if (playing) {
    score = 20;
    if (level1) {
      secretNumber = Math.trunc(Math.random() * 20) + 1;
    } else if (level2) {
      secretNumber = Math.trunc(Math.random() * 50) + 1;
    } else if (level3) {
      secretNumber = Math.trunc(Math.random() * 100) + 1;
    }
    displayMessage('Start guessing...');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
  }
});

// Opening and closing modal
document.querySelector('.levels').addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Level change
document.querySelector('.level1').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  level1 = true;
  level2 = false;
  level3 = false;
  document.querySelector('.between').textContent = '(Between 1 and 20)';
  levelChange();
});

document.querySelector('.level2').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 50) + 1;
  level1 = false;
  level2 = true;
  level3 = false;
  document.querySelector('.between').textContent = '(Between 1 and 50)';
  levelChange();
});

document.querySelector('.level3').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 100) + 1;
  level1 = false;
  level2 = false;
  level3 = true;
  document.querySelector('.between').textContent = '(Between 1 and 100)';
  levelChange();
});
