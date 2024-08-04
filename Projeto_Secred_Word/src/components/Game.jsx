import './Game.css';

const Game = ({verifyLetter}) => {
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className='Dica'>
        Dica sobre a palavra: <span>Dica...</span>
      </h3>
      <div className="palavraContainer">
        <span className="letra">A</span>
        <span className='quadradoEmBranco'></span>
      </div>
      <div className="letraContainer">
        <p>Tente advinhar uma letra da palavra:</p>
        <form>
          <input type="text" name='letra' maxLength="1" required />
          <button>jogar!</button>
        </form>
      </div>
      <div className="containerDeLetrasErradas">
        <p>Letras já utilizadas: </p>
        <span>a, </span>
        <span>b, </span>
      </div>
    </div>
  )
}

export default Game