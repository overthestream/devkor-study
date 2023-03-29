import ReactDOM from 'react-dom/client';
import './index.css';
import React, { useState }  from 'react';

const Square = ({value, onClick}) =>{

    return (
        <button className="square" onClick={onClick}>
        {value}
        </button>
    );
}

const Board = () => {
  const gameRestart = () => {
    setNext('X');//X가 둘 차례로 초기 상태 설정
    const sq = squares.slice()
    sq.fill('')
    setSquares(sq)//배열의 상태는 빈 칸으로 되돌린다.
    status = 'Next player: ' + next;//표시되는 state 역시 되돌린다.
  }
  const makeStartButton = () => {
    if(hasWinner() || isFilled)
        return (
            <button onClick={()=>{gameRestart()}}>Restart</button>//callback 함수로 onClick 에 restart 함수를 넘겨 준다.
        )
  }
  const hasWinner =() => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ]

    for(let i = 0;i < lines.length ; i++){
        const [f, s, t] = lines[i];
        if(squares[f] !== '' && squares[f] === squares[s] && squares[f] === squares[t]) return squares[f]
    }

    return false
  }
  const [next, setNext] = useState('X')
  const handleClick = (i) => {
    if(hasWinner() || squares[i] !== ''){
        return;
    }
    const sq = squares.slice()
    sq[i] = next
    if(next === 'X')    setNext('O')
    else    setNext('X')

    setSquares(sq)
  }
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={()=>{handleClick(i)}}/>;
  }
  const [squares, setSquares] = useState(Array(9).fill(''));
  let status = 'Next player: ' + next;
  let isFilled = true;
  
  for(let i = 0; i < 9; ++i){
    if(squares[i] === ''){
        isFilled = false;
        break
    }
  }//만약 한 칸이라도 비어 있다면 차 있지 않은 것으로 취급한다.

  if(hasWinner()){
    status = 'Winner: ' + hasWinner()
  }
  else if(!hasWinner() && isFilled){
    status = 'Draw'
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {makeStartButton()}
    </div>
  );
}

const Game = () =>  {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);