'use strict';

let score = 20;
let highScore = 0;
let checkForWin = false;

let secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = '?';

const secretNewNumber = function () {
  let newNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.number').textContent = '?';
  return newNumber;
};

const displayScore = function () {
  document.querySelector('.score').textContent = score;
};

const checkForLoss = function () {
  if (score > 1) {
    return true;
  }
};

const youLose = function () {
  document.querySelector('.message').textContent = 'Big L :(';
  document.querySelector('.score').textContent = 0;
};

// when the AGAIN BUTTON is clicked
document.querySelector('.again').addEventListener('click', function () {
  checkForWin = false;
  score = 20;
  displayScore();
  secretNumber = secretNewNumber();
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
});

// when the CHECK BUTTON is clicked
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value); // saving the value from the .guess element
  console.log(guess);

  // when you haven't won or lost yet
  if (checkForLoss() && !checkForWin) {
    // game will only run if checkForLoss is true -- i.e: score >= 1. and if the game hasn't been won yet

    // when no guess
    if (!guess) {
      document.querySelector('.message').textContent = 'No guess inputted 🤠';
    }

    // when guess out of bounds
    else if (guess > 20 || guess < 1) {
      document.querySelector('.message').textContent =
        'Guess within the range of 1-20 😒';
    }

    // when guess is correct -- YOU WIN
    else if (guess === secretNumber) {
      document.querySelector('.message').textContent = 'Correct number! 🥳';
      if (score > highScore) {
        highScore = score;
        document.querySelector('.highscore').textContent = highScore;
      }
      checkForWin = true;
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('body').style.backgroundColor = '#60b347'; // changes background color
      document.querySelector('.number').style.width = '30rem';
    }

    // when guess is higher
    else if (guess > secretNumber) {
      document.querySelector('.message').textContent =
        'Incorrect, guess lower... 🧐';
      score--;
      displayScore();
    }

    // when guess is lower
    else if (guess < secretNumber) {
      document.querySelector('.message').textContent =
        'Incorrect, guess higher... 🧐';
      score--;
      displayScore();
    }
  }

  // when you've lost
  else if (!checkForLoss()) {
    youLose();
  }
});
