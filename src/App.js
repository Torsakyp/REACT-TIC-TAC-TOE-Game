import logo from "./logo.svg";
import "./App.css";
import styled from "@emotion/styled";
import { Component, useState } from "react";

const Cell = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;
  border: 3px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  cursor: pointer;
  &:hover{
    background-color:brown
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 240px;
  //background-color: white;
  margin: auto;
  grid-row-gap: 16px;
  grid-column-gap: 16px;
`;

const GameButton = styled.button`
  width: 240px;
  margin: auto;
  height: 32px;
  margin-top: 16px;
`;
const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [0, 1, 2],

  [0, 4, 8],
  [2, 4, 6],
];

const calWinner = (gameState) => {
  let winner;
  //calculate
  for (let i = 0; i < winStates.length; i++) {
    const winState = winStates[i]; //[0,1,2]
    if (
      gameState[winState[0]] === gameState[winState[1]] &&
      gameState[winState[1]] === gameState[winState[2]] &&
      Boolean(gameState[winState[0]])
    ) {
      winner = gameState[winState[0]];
    }
  }

  return winner;
};

function App() {
  const [gameState, setGamestate] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [player, setPlayer] = useState("X");
  const winner = calWinner(gameState);
  const isTie =
    !winner && gameState.filter((state) => Boolean(state)).length == 9; //ไม่มีผู้ชนะ และ ใส่ครบทุก 9 ช่องใช่ไหม
  const onCellClick = (index) => {
    if (gameState[index] !== "" || Boolean(winner) || isTie) {
      //เงีื่อนไข ้ไม่สามารถกดช่องเดิมซ้ำได้ ถ้ากดไปแล้ว และ มีผู้ชนะแล้ว
      return;
    }
    const newGameState = [...gameState]; //copy array
    newGameState[index] = player;
    setGamestate(newGameState); //update ทับ gameState
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

  const restartGame = () => {
    setGamestate(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };
  return (
    <div
      className="App"
      style={{ backgroundColor: "grey", height: "100vh", padding: "16px" }}
    >
      <h1 style={{ margin: "0px" }}> Tic Tic Toe </h1>
      {winner ? (
        <h2> {winner} is winner </h2>
      ) : isTie ? (
        <h2> Game is Tie</h2>
      ) : (
        <h2> Player {player} It's your turn</h2>
      )}
      <Board>
        {gameState.map((cellnumber, index) => {
          return <Cell onClick={() => onCellClick(index)}>{cellnumber}</Cell>;
        })}
      </Board>
      <GameButton onClick={restartGame}> Restart </GameButton>
    </div>
  );
}

export default App;
