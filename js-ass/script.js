let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi"); // 순서대로 이전 추측 리스트, 가장 최근 결과(정답 또는 오답), high or low 출력
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField"); //Form 부분.
let guessCount = 1;
let resetButton;

const setGameOver = () => {
  guessField.disabled = true;
  guessSubmit.disabled = true; //index에서 숫자 입력 form을 Disable
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.appendChild(resetButton); //createElement로 버튼 엘리멘트를 만들고 document의 body에 추가
  resetButton.addEventListener("click", resetGame); //click 이벤트를 인식하는 EventListener 추가 -> resetGame function 실행
};

const resetGame = () => {
  guessCount = 1;
  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }
  /*Count를 초기화한 뒤 resultParas class를 가진 p element를 resetParas에 대입함. querySelectorAll은 NodeList 객체 반환.
  querySelectorAll 내부에는 map 메서드가 존재하지 않아 map을 사용할 수는 없고, for ~ of로 순회 가능. forEach로도 순회가 가능.
  NodeList는 순수한 Array가 아니기에 map 메서드를 사용할 수는 없다. querySelectorAll로 반환되는 NodeList 내부에 메서드가 정의되어 있지 않다.
  */
  resetButton.parentNode.removeChild(resetButton); //초기화 이후에는 버튼 제거
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = ""; // 제출부 재활성화
  guessField.focus(); //제출부 포커싱
  lastResult.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * 100) + 1; // 수 재할당
};

const collect = () => {
  lastResult.textContent = "Congratulations! You got it right!";
  lastResult.style.backgroundColor = "green";
  lowOrHi.textContent = ""; // 정답
  setGameOver();
};
const gameOver = () => {
  lastResult.textContent = "!!!GAME OVER!!!";
  lowOrHi.textContent = ""; // 게임 오버
  setGameOver();
};

const isLow = () => {
  lastResult.textContent = "Wrong!";
  lastResult.style.backgroundColor = "red";
  lowOrHi.textContent = "Last guess was too low!";
};
const isHigh = () => {
  lastResult.textContent = "Wrong!";
  lastResult.style.backgroundColor = "red";
  lowOrHi.textContent = "Last guess was too high!";
};

const checkGuess = () => {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  //입력을 숫자로 형변환하고 대소 판단

  guesses.textContent += userGuess + " "; // 이전 guess에 추가
  if (userGuess < randomNumber) isLow();
  else if (userGuess > randomNumber) isHigh();
  else collect();
  //비교값에 따라 함수 호출

  if (guessCount == 10) gameOver();
  //게임 오버 호출

  guessCount++;
  guessField.value = "";
  guessField.focus();
};

guessSubmit.addEventListener("click", checkGuess); //제출되면 checkGuess 실행
