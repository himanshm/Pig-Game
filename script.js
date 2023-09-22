'use strict';

// Selecting elements
const playerZeroEl = document.querySelector('.player--0');
const playerOneEl = document.querySelector('.player--1');
const scoreZeroEl = document.querySelector('#score--0');
const scoreOneEl = document.getElementById('score--1'); // a litle bit faster than querySelector
const curretZeroEl = document.getElementById('current--0');
const currentOneEl = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');
const winText = document.querySelector('.win-text');
const overlay = document.querySelector('.overlay');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreZeroEl.textContent = 0;
  scoreOneEl.textContent = 0;
  curretZeroEl.textContent = 0;
  currentOneEl.textContent = 0;

  // Hide the dice
  diceEl.classList.add('hidden');

  playerZeroEl.classList.remove('player--winner');
  playerOneEl.classList.remove('player--winner');

  playerZeroEl.classList.add('player--active'); // Make the first player active again
  playerOneEl.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerZeroEl.classList.toggle('player--active');
  playerOneEl.classList.toggle('player--active');
};

// Roll the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.  Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `/assets/dice-${dice}.png`;
    // 3. Check for rolled 1 : if not true, x
    if (dice !== 1) {
      // add the dice roll to the current score
      currentScore += dice;
      // 4. Update the score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
      // if yes: finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      winText.textContent = `Player ${activePlayer + 1} wins!`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      popup.style.display = 'block';
      overlay.classList.remove('hidden');
      popup.classList.add('active');
    } else {
      // if not: switch the player
      switchPlayer();
    }
    closePopupButton.addEventListener('click', () => {
      popup.style.display = 'none';
      popup.classList.remove('active');
      overlay.classList.add('hidden');
    });
  }
});

btnNew.addEventListener('click', init);
