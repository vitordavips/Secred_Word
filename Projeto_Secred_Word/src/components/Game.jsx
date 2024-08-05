import { useState, useRef } from 'react';
import './Game.css';

const Game = ({
  verifyLetter,  
  palavraEscolhida,
  categoriaEscolhida,
  letras,
  adivinhouLetras,
  letrasErradas,
  chances,
  pontuacao,
}) => {
  const [letra, setLetra] = useState("");
  const letrasInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letra);
    setLetra(""); // Clear the input field after submitting
    letrasInputRef.current.focus();
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {pontuacao}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className='Dica'>
        Dica sobre a palavra: <span>{categoriaEscolhida}</span>
      </h3>
      <p>Você ainda tem {chances} tentativas</p>
      <div className="palavraContainer">
        {letras.map((letra, i) => 
          adivinhouLetras.includes(letra) ? (
            <span key={i} className='letra'>{letra}</span>
          ) : (
            <span key={i} className='quadradoEmBranco'></span>
          )
        )}
      </div>
      <div className="letraContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name='letra' 
            maxLength="1" 
            required 
            value={letra}
            onChange={(e) => setLetra(e.target.value)}
            ref={letrasInputRef}
          />
          <button type="submit">jogar!</button>
        </form>
      </div>
      <div className="containerDeLetrasErradas">
        <p>Letras já utilizadas: </p>
        {letrasErradas.map((letraErrada, i) => (
          <span key={i}>{letraErrada}, </span>
        ))}
      </div>
    </div>
  )
}

export default Game;
