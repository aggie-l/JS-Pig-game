'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing;
let scores;
let currentScore;
let activePlayer;

// starting conditions

const init = function() {
    playing = true;
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
}
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// rolling dice functionality

btnRoll.addEventListener('click', function() {

    if (playing) {
        // 1. generate random dice roll
        const diceNumber = Math.trunc(Math.random() * 6) + 1;

        // 2. display dice
        diceEl.classList.remove('hidden');
        diceEl.src =`dice-${diceNumber}.png`;

        // 3. check for rolled 1
        if (diceNumber !== 1) {
            // Add dice roll to current score
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            // if dice roll is 1, switch to other player
            switchPlayer();
        }
    }
});


btnHold.addEventListener('click', function() {

    if (playing) {

        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // example: scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. Check if player's score >= 100
    
        if (scores[activePlayer] >= 100) {
            // Finish game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
        } else {
            // 3. Switch to the other player
            switchPlayer();
        }
    }
})


btnNew.addEventListener('click', init);