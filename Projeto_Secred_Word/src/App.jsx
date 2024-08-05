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

const chancesQti = 3

function App() {
  const [gameStage, setGameStage] = useState(Stages[0].name);
  const [words] = useState(wordsList)

  const [palavraEscolhida, setPalavraEscolhida] = useState();
  const [categoriaEscolhida, setCategoriaEscolhida] = useState();
  const [letras, setLetras] = useState(); 

  const [adivinhouLetras, setAdivinhouLetras] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [chances, setChances] = useState(chancesQti);
  const [pontuacao, setPontuacao] = useState(0);

  const escolhaPalavraCategoria = useCallback(() => {
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
  }, [words])

  // start no secret word
  const startGame = useCallback(() => {
    // limpar todas as letras
    limparStadesLetras();

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
    setLetras(letrasPalavras);

    setGameStage(Stages[1].name);
  }, [escolhaPalavraCategoria])

  // process the letter input - processar a entrada da letra
  const verifyLetter = (letra) => {
    const normalizarLetra = letra.toLowerCase();

    //verifique se a letra já foi utilizada
    if(
      adivinhouLetras.includes(normalizarLetra) ||
      letrasErradas.includes(normalizarLetra)
    ) {
      return;
    }

    // push guessed letter or remove a guess
    if(letras.includes(normalizarLetra)){
      setAdivinhouLetras((actualAdivinhouLetras) => [
        ...actualAdivinhouLetras,
        normalizarLetra
      ])
    } else {
      setLetrasErradas((actualLetrasErradas) => [
        ...actualLetrasErradas,
        normalizarLetra,
      ]);

      setChances((actualChances) => actualChances - 1)
    }

    
  };

  const limparStadesLetras = () => {
    setAdivinhouLetras([]);
    setLetrasErradas([]);
  }
  
  // fim de jogo
  useEffect(() => {
    if (chances <= 0){
      // redefinir todos os estados
      limparStadesLetras();
      setGameStage(Stages[2].name);
    }
  }, [chances]);

  // check win
  useEffect(() => {
    const uniqueLetras = [... new Set(letras)]
    
    // win condition
    if (adivinhouLetras.length === uniqueLetras.length){
      // add pontuacao
      setPontuacao((actualPontuacao) => (actualPontuacao += 100))

      // restart game with new word
      startGame();
    }

  }, [adivinhouLetras, letras, startGame])

  // restarts the game
  const retry = () => {
    setPontuacao(0);
    setChances(chancesQti);

    setGameStage(Stages[0].name);
  }

  return (
    <div className='App'>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
      <Game 
        verifyLetter={verifyLetter}
        palavraEscolhida= {palavraEscolhida}
        categoriaEscolhida= {categoriaEscolhida}
        letras = {letras}
        adivinhouLetras = {adivinhouLetras}
        letrasErradas = {letrasErradas}
        chances = {chances}
        pontuacao = {pontuacao} 
      />
    )}
      {gameStage === "end" && <GameOver retry={retry} pontuacao={pontuacao} />}
    </div>
  )
}

export default App
