let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;


const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

const resetGame = () => {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for (const resetPara of resetParas) {
    resetPara.textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  lastResult.style.backgroundColor = 'white';
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

const collect = () => {
  lastResult.textContent = 'Congratulations! You got it right!';
  lastResult.style.backgroundColor = 'green';
  lowOrHi.textContent = '';
  setGameOver();
}
const gameOver = () => {
  lastResult.textContent = '!!!GAME OVER!!!';
  lowOrHi.textContent = '';
  setGameOver();
}

const isLow = () => {
  lastResult.textContent = 'Wrong!';
  lastResult.style.backgroundColor = 'red';
  lowOrHi.textContent = 'Last guess was too low!';

}
const isHigh = () => {
  lastResult.textContent = 'Wrong!';
  lastResult.style.backgroundColor = 'red';
  lowOrHi.textContent = 'Last guess was too high!';
}

const checkGuess = () => {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }


  guesses.textContent += userGuess + ' ';
  // TODO 
  // 입력값에 따라 , isLow, isHigh, Collect 등의 함수를 호출 
  // guess Count가 10이 될 경우 game over
  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

