// CSS
import './App.css'

// React
import { useCallback, useEffect, useState } from 'react';

// data
import { wordsList } from "./data/words.js";

// components
import StartScreen from './components/StartScreen'
import Game from './components/Game.jsx';
import GameOver from './components/GameOver.jsx';

const Stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]


function App() {
  const [gameStage, setGameStage] = useState(Stages[0].name);
  const [words] = useState(wordsList)

  // start no secred word
  const startGame = () => {
    setGameStage(Stages[1].name);
  }

  // process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  // restarts the game
  const retry = () => {
    setGameStage(Stages[0].name)
  }
  
  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}/>}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  )
}

export default App
