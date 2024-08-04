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
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]

function App() {
  const [gameStage, setGameStage] = useState(Stages[0].name);
  const [words] = useState(wordsList)

  const [palavraEscolhida, setPalavraEscolhida] = useState();
  const [categoriaEscolhida, setCategoriaEscolhida] = useState();
  const [letras, setLetras] = useState(); 

  const escolhaPalavraCategoria = () => {
    // escolha a categoria
    const categorias = Object.keys(words);
    const categoria = categorias[Math.floor(Math.random() * categorias.length)];

    console.log('Categoria escolhida:', categoria);

    // escolha a palavra
    const palavraArray = words[categoria];
    if (!palavraArray || palavraArray.length === 0) {
      console.error('Categoria não contém palavras ou é indefinida:', categoria);
      return;
    }

    const palavra = palavraArray[Math.floor(Math.random() * palavraArray.length)];
    console.log('Palavra escolhida:', palavra);

    return {palavra, categoria};
  }

  // start no secret word
  const startGame = () => {
    // pick word and pick category - escolha a palavra e escolha a categoria
    const { palavra, categoria } =  escolhaPalavraCategoria();

    // create an array of letters  
    let letrasPalavras = palavra.split("");
    letrasPalavras = letrasPalavras.map((l) => l.toLowerCase());

    console.log(palavra, categoria)
    console.log(letrasPalavras)

     // atualiza os estados
    setCategoriaEscolhida(categoria);
    setPalavraEscolhida(palavra);
    setLetras(letras);

    setGameStage(Stages[1].name);
  }

  // process the letter input - processar a entrada da letra
  const verifyLetter = () => {
    setGameStage(Stages[2].name);
  }

  // restarts the game
  const retry = () => {
    setGameStage(Stages[0].name);
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  )
}

export default App
