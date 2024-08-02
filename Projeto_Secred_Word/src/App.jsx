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
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)

  console.log(words)

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen />}
      {gameStage === "game" && <Game />}
      {gameStage === "end" && <GameOver />}
    </div>
  )
}

export default App
